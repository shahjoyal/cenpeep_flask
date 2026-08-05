"""
upload.py — Flask upload route for CENPEEP
==========================================
Accepts .xlsx / .xls files and does two things:

1. SMART MULTI-SHEET PARSE (new):
   • Reads every sheet in the workbook.
   • For each sheet, tries to identify CENPEEP input fields by scanning:
       – the standard "CenPeep Corrected" column layout (col A=particulars,
         col B=UOM, col C=symbol, col D=formula/INPUT, col E=value)
       – a "raw / field-name header" layout where the first row contains
         field names and subsequent rows are data rows (handles multiple
         load readings → averages them).
   • Returns per-sheet metadata + a merged `extracted` dict (last-wins
     for conflicts; the CenPeep sheet always wins if present).

2. LEGACY SINGLE-SHEET PARSE (kept for backward compat).
"""

"""
upload.py — Flask upload route for CENPEEP  (v2: ML detection + chunked parsing)
==================================================================================
Accepts .xlsx / .xls files and does three things:

1. SMART MULTI-SHEET PARSE — reads every sheet, tries the strict CenPeep
   column layout first, then a generic raw-tabular layout.

2. ML FIELD DETECTION (new) — for any column NOT matched by the rule-based
   symbol/label lookup, a basic trainable TF-IDF + cosine-similarity model
   (see ml/field_classifier.py) scores the header text against known
   CENPEEP field phrasings and assigns a field id if confident enough.
   This is what lets a sheet with totally different header wording (e.g.
   "MAIN STM TEMP-L", "Primary Air APH Temp I/L A") still get its columns
   identified, instead of relying only on exact alias matches.

3. CHUNKED / STREAMED PARSING (new) — large sheets (many rows and/or wide
   column counts) are read via openpyxl's read_only streaming mode and
   processed in fixed-size row chunks, so we never hold the full sheet plus
   multiple copies of it in memory at once. This is what allows bigger
   files (the route's max upload size has also been raised) to be parsed
   without timing out or exhausting memory.

Multiple load/data readings for the same field → averaged automatically
(unchanged from v1, now chunk-aware).
"""

import io
import os
import re
import time
import statistics
from flask import Blueprint, request, jsonify

try:
    import python_calamine
    HAS_CALAMINE = True
except ImportError:
    HAS_CALAMINE = False

try:
    import openpyxl
    HAS_OPENPYXL = True
except ImportError:
    HAS_OPENPYXL = False

try:
    import xlrd
    HAS_XLRD = True
except ImportError:
    HAS_XLRD = False

from ml.field_classifier import get_classifier, DEFAULT_CONFIDENCE_THRESHOLD
from ml.training_data import is_non_field_header

upload_bp = Blueprint('upload', __name__)

# ─── Chunking config ───────────────────────────────────────────────────────────
CHUNK_ROWS = 300          # rows processed per chunk for large sheets
LARGE_SHEET_ROW_THRESHOLD = 500   # sheets bigger than this use chunked streaming
HEADER_SCAN_ROWS = 5      # how many leading rows we scan to find the header row

# ─── Symbol → CENPEEP field-id map ────────────────────────────────────────────
SYM_MAP = {
    'L': 'L', 'Ffw': 'Ffw', 'Fin': 'Fin',
    'Cba': 'Cba', 'Cfa': 'Cfa', 'Pfa': 'Pfa', 'Pba': 'Pba',
    'M': 'M', 'A': 'A', 'VM': 'VM', 'FC': 'FC', 'GCV': 'GCV', 'S': 'S',
    'O2in': 'O2in', 'COin': 'COin', 'O2out': 'O2out', 'COout': 'COout',
    'Tgi': 'Tgi', 'Tgo': 'Tgo',
    'Tpai': 'Tpai', 'Tpao': 'Tpao', 'Tsai': 'Tsai', 'Tsao': 'Tsao',
    'Fsa': 'Fsa', 'Fpa': 'Fpa', 'Tref': 'Tref',
    # Design — proximate
    'Md': 'Md', 'Ad': 'Ad', 'VMd': 'VMd', 'FCd': 'FCd',
    # Design — ultimate
    'Cd': 'Cd', 'Sd': 'Sd', 'Hd': 'Hd', 'Nd': 'Nd', 'Od': 'Od',
    'Gcvd': 'GCVd', 'GCVd': 'GCVd', 'Trad': 'Trad', 'Mwvd': 'Mwvd',
}

# Also accept case-insensitive & common variants
SYM_MAP_LOWER = {k.lower(): v for k, v in SYM_MAP.items()}

# Fields that are ALWAYS manual entry — never auto-detected from an upload,
# by any strategy (CenPeep-layout symbol match, rule-based header alias, or
# ML fallback), and never flagged as "missing" or colored red/green. Pfa/Pba
# ("% of Fly/Bottom Ash in Total Ash") are plant-specific split ratios that
# don't reliably show up as their own column on real sheets — treating them
# as always-manual avoids both false "detected" guesses and noisy "missing"
# flags for a field that was never expected to be found anyway.
# Sd/GCVd/Trad/Mwvd (Design Conditions — Ultimate Analysis: Sulfur, GCV,
# Ref. Air Temp, Moisture in Air) have no proximate-side equivalent to
# derive from — same as As-Fired Sulfur/GCV, they're always typed in by
# hand — so they get the same always-manual treatment here.
# Md/Ad/VMd/FCd (Design — Proximate) carry the same "MANUAL" tag on the
# calculator form and the same "never auto-filled from an upload" intent
# (see the comment above the Design — Proximate section in
# public/calculator.html) — added here so that intent is actually
# enforced, instead of only being true in the UI copy. Previously these
# could still be picked up from the strict CenPeep column layout (a sheet
# listing the symbol "Md"/"Ad" twice — once as-fired, once design) via the
# duplicate-symbol handling in _parse_cenpeep_layout(); that handling still
# runs (so the second occurrence still correctly resolves to the AUTO/
# readonly Md2/Ad2 slot for the summary table), but the first occurrence
# no longer auto-fills or colors the manual Md/Ad inputs.
# S (As-Fired Sulfur), COin (Avg. Flue Gas CO — APH In), and Tref (Design
# Ambient / Ref Air Temp) are also now always-manual — same reasoning as
# Sd/GCVd/Trad/Mwvd above: these are typed in by hand from a lab report or
# a fixed plant design value rather than reliably reported as their own
# DCS/log column, so they get the same "never auto-detected, never
# colored detected/missing" treatment. Mirrored on the calculator form with
# the "MANUAL" tag (see public/calculator.html) and removed from
# REQUIRED_FIELDS below, same as every other NEVER_AUTO_DETECT field.
NEVER_AUTO_DETECT = {
    'Pfa', 'Pba', 'Sd', 'GCVd', 'Trad', 'Mwvd', 'Md', 'Ad', 'VMd', 'FCd',
    'S', 'COin', 'Tref',
}

# ─── Full list of CENPEEP input fields the calculator needs ──────────────────
# This is every editable (non-auto-computed) field on the calculator form —
# used only to report, after a file is parsed, which required fields were
# NOT found on the selected sheet (CO2in/CO2out and Cd/Hd/Md2/Nd/Od/Ad2 are
# excluded: those are AUTO/readonly fields computed by the app — the latter
# client-side from Md/Ad/VMd/FCd — never read from an upload).
# Pfa/Pba/Sd/GCVd/Trad/Mwvd/Md/Ad/VMd/FCd are deliberately excluded — see
# NEVER_AUTO_DETECT above. Being always-manual, they should never show up
# as either "detected" (green) or "missing" (red) — in the upload summary,
# the field coloring on the calculator form, or the r.py Word report.
REQUIRED_FIELDS = [
    'L', 'Ffw', 'Fin', 'Cba', 'Cfa',
    'M', 'A', 'VM', 'FC', 'GCV',
    'O2in', 'O2out', 'COout',
    'Tgi', 'Tgo', 'Tpai', 'Tpao', 'Tsai', 'Tsao', 'Fsa', 'Fpa',
]

# Full human-readable name for each field id, taken verbatim from the
# "field-name" label next to each input on the calculator form (public/
# calculator.html) — used anywhere a field is shown to a person (reports,
# the upload summary) instead of the bare symbol/abbreviation.
FIELD_LABELS = {
    'L': 'Unit Load', 'Ffw': 'Steam Flow', 'Fin': 'Total Coal Flow',
    'Cba': 'Unburnt Carbon in Bottom Ash', 'Cfa': 'Unburnt Carbon in Fly Ash',
    'Pfa': '% of Fly Ash in Total Ash', 'Pba': '% of Bottom Ash in Total Ash',
    'M': 'Moisture', 'A': 'Ash', 'VM': 'Volatile Matter', 'FC': 'Fixed Carbon',
    'GCV': 'Gross Calorific Value (GCV)', 'S': 'Sulfur',
    'O2in': 'Avg. Flue Gas O\u2082 \u2014 APH In', 'COin': 'Avg. Flue Gas CO \u2014 APH In',
    'O2out': 'Avg. Flue Gas O\u2082 \u2014 APH Out', 'COout': 'Avg. Flue Gas CO \u2014 APH Out',
    'Tgi': 'Avg. Flue Gas Temp \u2014 APH In', 'Tgo': 'Avg. Flue Gas Temp \u2014 APH Out',
    'Tpai': 'Primary Air to APH Temp In', 'Tpao': 'Primary Air from APH Temp Out',
    'Tsai': 'Secondary Air to APH Temp In', 'Tsao': 'Secondary Air from APH Temp Out',
    'Fsa': 'Total Secondary Air Flow', 'Fpa': 'Total Primary Air Flow',
    'Tref': 'Design Ambient / Ref Air Temp',
    'Md': 'Moisture \u2014 Design', 'Ad': 'Ash \u2014 Design',
    'VMd': 'Volatile Matter \u2014 Design', 'FCd': 'Fixed Carbon \u2014 Design',
    'Cd': 'Carbon \u2014 Design', 'Sd': 'Sulfur \u2014 Design', 'Hd': 'Hydrogen \u2014 Design',
    'Md2': 'Moisture \u2014 Design (Ultimate)', 'Nd': 'Nitrogen \u2014 Design',
    'Od': 'Oxygen \u2014 Design', 'Ad2': 'Ash \u2014 Design (Ultimate)',
    'GCVd': 'GCV \u2014 Design', 'Trad': 'Ref. Air Temp \u2014 Design',
    'Mwvd': 'Moisture in Air \u2014 Design',
}

# Human-readable label guesses for unknown-layout headers
LABEL_ALIASES = {
    'load': 'L', 'unit load': 'L', 'mw': 'L',
    'steam flow': 'Ffw', 'steamflow': 'Ffw',
    'coal flow': 'Fin', 'coalflow': 'Fin', 'fuel flow': 'Fin',
    'moisture': 'M', 'ash': 'A',
    'volatile matter': 'VM', 'vm': 'VM',
    'fixed carbon': 'FC', 'fc': 'FC',
    'gcv': 'GCV', 'gross calorific value': 'GCV',
    'sulphur': 'S', 'sulfur': 'S',
    'o2 in': 'O2in', 'o2in': 'O2in',
    'o2 out': 'O2out', 'o2out': 'O2out',
    'co in': 'COin', 'coin': 'COin',
    'co out': 'COout', 'coout': 'COout',
    'fg temp in': 'Tgi', 'flue gas temp in': 'Tgi',
    'fg temp out': 'Tgo', 'flue gas temp out': 'Tgo',
    'pa temp in': 'Tpai', 'sa temp in': 'Tsai',
    'pa temp out': 'Tpao', 'sa temp out': 'Tsao',
    'pa flow': 'Fpa', 'sa flow': 'Fsa',
    # Exact real-sheet DCS tag: "TEMP AT APH O/L MEDIAN" — on its own this
    # phrasing is ambiguous with Tgo (Flue Gas Temp APH Out also gets
    # called "APH O/L ... Temp"), so it's handled as a hard-coded exact
    # alias rather than left to the ML classifier's fuzzy similarity,
    # which was pulling it toward Tgo. Confirmed against the actual
    # workbook this represents Primary Air from APH Temp Out (Tpao).
    'temp at aph ol median': 'Tpao',
    # Exact real-sheet DCS tags: "OXYGEN IN FLUE GAS(L)-AH O/L" and
    # "OXYGEN IN FLUE GAS(R)-AH O/L" — Left/Right duct O2 sensors at the
    # APH OUTLET (the trailing "AH O/L" = "Air Heater Outlet"). The ML
    # classifier was matching these to O2in instead (score ~0.63, above
    # threshold) because the word "IN" in "OXYGEN IN FLUE GAS" reads as
    # "inlet" out of context, when it's actually just "oxygen [found] in
    # [the] flue gas" — the real inlet/outlet qualifier is the "AH O/L"
    # suffix, which means outlet. Hard-coded here as exact aliases (rather
    # than left to the fuzzy ML match) so both L/R columns resolve to
    # O2out deterministically and both get picked up by
    # MULTI_COLUMN_AVERAGE_FIELDS / _dedupe_columns_per_field, which
    # averages the two sensor readings together instead of keeping only
    # one.
    'oxygen in flue gaslah ol': 'O2out',
    'oxygen in flue gasrah ol': 'O2out',
    'unburnt bottom': 'Cba', 'unburnt fly': 'Cfa',
    'unburnts in bottom ash': 'Cba', 'unburnts in fly ash': 'Cfa',
    'unburnt in bottom ash': 'Cba', 'unburnt in fly ash': 'Cfa',
    'bottom ash unburnts': 'Cba', 'fly ash unburnts': 'Cfa',
    # NOTE: bare "Bottom Ash"/"Fly Ash" (%) used to be hard-mapped straight
    # to Pba/Pfa ("% of ash in total ash") right here. That was wrong for
    # real lab-report / LOI / boiler-efficiency sheets, where a bare
    # "Bottom Ash (%)" or "Fly Ash %" column is actually the loss-on-
    # ignition / unburnt-carbon test result (Cba/Cfa), not the ash-split
    # percentage — and because this was an exact-string RULE match it ran
    # before ML ever got a chance, so it silently stole the column and
    # left Cba/Cfa undetected every single time. Disambiguation between
    # the two now lives in _match_tag_patterns() below (keyed on whether
    # "total" appears in the header), since both phrasings otherwise look
    # identical.
}


# ─── Highlighted-column detection ─────────────────────────────────────────────
# Real plant sheets often have the engineer manually highlight (yellow-fill,
# usually) exactly the columns that matter for the CENPEEP efficiency calc,
# out of dozens/hundreds of DCS tag columns on the sheet. That's a strong
# human-provided signal we were previously throwing away entirely — only
# header TEXT was ever used to decide a column's field. Two failure modes
# this caused in practice:
#   1. A highlighted column with unusual/abbreviated wording scored just
#      under the ML confidence threshold and was silently skipped, while a
#      differently-worded but WRONG column elsewhere matched confidently.
#   2. When two columns (one highlighted, one not) both matched the same
#      field (e.g. "TM(ARB)" and "IM(ADB)" both loosely mean "moisture"),
#      their readings were averaged TOGETHER — quietly blending the
#      engineer's chosen reading with an unrelated one and corrupting the
#      value, with no visible sign anything had gone wrong.
# The functions below read (once per upload, cheaply — only the first few
# header rows, not the whole sheet) which header cells carry a real fill
# color, so that signal can be used to (a) prefer the highlighted column
# whenever it conflicts with a non-highlighted one mapped to the same
# field, and (b) retry unmatched highlighted columns at a lower confidence
# threshold before giving up on them.
HIGHLIGHT_SCAN_ROWS = HEADER_SCAN_ROWS  # only need the header-row candidates
# A relaxed threshold used ONLY for header cells we already know were
# deliberately highlighted by a human — still requires real similarity
# (this is not "accept anything"), just less margin than the default.
HIGHLIGHTED_ML_THRESHOLD = 0.30


def _is_highlighted_fill(cell):
    """
    True if a cell has a real (non-white/none) solid fill color.
    Guards every attribute access - openpyxl fill/color objects raise on
    some malformed theme-color entries (e.g. a cell with a theme tint but
    an unreadable rgb value, seen on real exports).
    """
    try:
        fill = cell.fill
        if fill is None or fill.patternType != 'solid':
            return False
        fg = fill.fgColor
        if fg is None:
            return False
        if getattr(fg, 'type', None) == 'rgb':
            rgb = fg.rgb
            if not isinstance(rgb, str):
                return False
            # Treat pure white / fully transparent as "not highlighted" -
            # a solid-white fill is usually just a formatting artifact,
            # not an intentional highlight.
            return rgb.upper() not in ('00000000', 'FFFFFFFF', 'FFFFFF')
        if getattr(fg, 'type', None) == 'theme':
            # A theme color WAS explicitly set on this cell (as opposed to
            # no fill at all) - treat that as "highlighted" too, since some
            # workbooks use a theme-based accent color instead of a raw RGB
            # yellow.
            return True
        return False
    except Exception:
        return False


def _scan_header_highlights(file_bytes):
    """
    Returns {sheetName: {rowIdx: {colIdx, ...}}} - for each sheet, the set
    of column indices that carry a highlighted fill, for each of the first
    HIGHLIGHT_SCAN_ROWS rows (0-indexed). Only openpyxl exposes cell style
    info (calamine reads values only, for speed), so this always does a
    second, SEPARATE, lightweight openpyxl read_only pass restricted to a
    handful of rows - cheap even on very large workbooks, since read_only
    iteration is lazy and we never touch a data row.
    Returns {} (feature silently disabled) if openpyxl isn't available or
    the file can't be opened a second time this way - highlight detection
    is a bonus signal, never a requirement for a successful parse.
    """
    if not HAS_OPENPYXL:
        return {}
    try:
        wb = openpyxl.load_workbook(io.BytesIO(file_bytes), read_only=True, data_only=True)
    except Exception:
        return {}

    result = {}
    try:
        for name in wb.sheetnames:
            ws = wb[name]
            if not hasattr(ws, 'iter_rows'):
                continue
            sheet_map = {}
            try:
                for r_idx, row in enumerate(
                    ws.iter_rows(min_row=1, max_row=HIGHLIGHT_SCAN_ROWS)
                ):
                    cols = {c_idx for c_idx, cell in enumerate(row) if _is_highlighted_fill(cell)}
                    if cols:
                        sheet_map[r_idx] = cols
            except Exception:
                # A malformed row/style shouldn't take down highlight
                # detection for the rest of the sheet or other sheets.
                pass
            if sheet_map:
                result[name] = sheet_map
    finally:
        try:
            wb.close()
        except Exception:
            pass
    return result


def _apply_highlight_signal(col_map, col_source, col_confidence, headers,
                             highlighted_cols, use_ml=True):
    """
    Adjusts a column->field mapping using the set of highlighted column
    indices for this sheet's header row:

      1. Conflict resolution - if a field id is currently backed by more
         than one column and at least one (but not all) of them is
         highlighted, drop the non-highlighted column(s) for that field
         entirely. The engineer's marked column wins outright rather than
         being averaged together with a look-alike column.
      2. Recovery - any highlighted column that matched NO field at all
         (rule or ML) is retried through the ML classifier at a lower,
         highlight-only confidence threshold, since we already know a
         human flagged this column as relevant.

    Returns (col_map, col_source, col_confidence, highlighted_field_ids,
             unmatched_highlighted_headers) - the last is a list of
    {colIdx, header} for highlighted columns that STILL couldn't be
    mapped to any field even after the relaxed retry, for surfacing back
    to the user rather than silently dropping them.
    """
    col_map = dict(col_map)
    col_source = dict(col_source)
    col_confidence = dict(col_confidence)
    highlighted_field_ids = set()

    if not highlighted_cols:
        return col_map, col_source, col_confidence, highlighted_field_ids, []

    # 1. Conflict resolution
    by_field = {}
    for col_idx, fid in col_map.items():
        by_field.setdefault(fid, []).append(col_idx)

    for fid, cols in by_field.items():
        if fid in MULTI_COLUMN_AVERAGE_FIELDS:
            # These fields (e.g. O2out's Left/Right APH columns) are meant
            # to be averaged together deliberately (see
            # MULTI_COLUMN_AVERAGE_FIELDS / _dedupe_columns_per_field) —
            # don't drop one side just because the engineer only
            # highlighted the other. Still count the field as
            # "highlighted" if either column was, for the
            # highlighted-field bookkeeping below.
            if any(c in highlighted_cols for c in cols):
                highlighted_field_ids.add(fid)
            continue
        hi_cols = [c for c in cols if c in highlighted_cols]
        if hi_cols:
            highlighted_field_ids.add(fid)
        if hi_cols and len(hi_cols) < len(cols):
            for c in cols:
                if c not in hi_cols:
                    col_map.pop(c, None)
                    col_source.pop(c, None)
                    col_confidence.pop(c, None)

    # 2. Recovery for still-unmatched highlighted columns
    unmatched_highlighted = []
    retry_idx, retry_text = [], []
    for col_idx in sorted(highlighted_cols):
        if col_idx in col_map:
            continue
        hdr = headers[col_idx] if col_idx < len(headers) else None
        if hdr is None or not str(hdr).strip():
            continue
        if is_non_field_header(hdr):
            continue
        retry_idx.append(col_idx)
        retry_text.append(str(hdr))

    if use_ml and retry_text:
        clf = get_classifier()
        preds = clf.predict_batch(retry_text, threshold=HIGHLIGHTED_ML_THRESHOLD)
        for col_idx, hdr, pred in zip(retry_idx, retry_text, preds):
            fid, score, _ = pred
            if fid and fid not in NEVER_AUTO_DETECT:
                col_map[col_idx] = fid
                col_source[col_idx] = 'ml_highlighted'
                col_confidence[col_idx] = round(score, 3)
                highlighted_field_ids.add(fid)
            else:
                unmatched_highlighted.append({'colIdx': col_idx, 'header': hdr})
    else:
        for col_idx, hdr in zip(retry_idx, retry_text):
            unmatched_highlighted.append({'colIdx': col_idx, 'header': hdr})

    return col_map, col_source, col_confidence, highlighted_field_ids, unmatched_highlighted


def _to_num(val):
    """Safely convert a cell value to float, or return None."""
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return float(val)
    try:
        return float(str(val).strip().replace(',', ''))
    except (ValueError, TypeError):
        return None


def _sym_to_field(sym):
    """Map a symbol string to a CENPEEP field id."""
    s = str(sym).strip()
    return SYM_MAP.get(s) or SYM_MAP_LOWER.get(s.lower())


def _match_tag_patterns(norm):
    """
    Secondary rule-based matcher for common plant/DCS tag phrasings that
    don't exactly match a LABEL_ALIASES entry verbatim but follow a
    recognizable token pattern (APH side-A/B tags, L_SIDE/R_SIDE, IN/OUT
    qualifiers, etc). Runs after the exact-alias lookup and before the ML
    fallback, so these well-known tag shapes resolve deterministically
    instead of depending on TF-IDF similarity (or a retrain) to catch them.

    `norm` is already lowercased and stripped of punctuation (see
    _label_to_field) — this only tokenizes on whitespace and checks for
    known word combinations.
    """
    tokens = set(norm.split())
    if not tokens:
        return None

    # Unburnt-carbon-in-ash fields: "bottom ash"/"fly ash" (%), optionally
    # qualified with "unburnt(s)" — deliberately excludes phrasings that
    # also contain "total", since those mean the % that ash type makes up
    # of the TOTAL ash (Pba/Pfa) — a different field with near-identical
    # wording. See the LABEL_ALIASES note above for why this can't just be
    # a plain exact-string alias.
    if 'total' not in tokens:
        if {'bottom', 'ash'} <= tokens:
            return 'Cba'
        if {'fly', 'ash'} <= tokens:
            return 'Cfa'
    elif 'ash' in tokens:
        if 'bottom' in tokens:
            return 'Pba'
        if 'fly' in tokens:
            return 'Pfa'

    # O2 / CO at the APH inlet or outlet, in the "<reading> ... APH ...
    # <direction>" tag shape real DCS exports use (e.g. "O2 APH O/L",
    # "APH A OUTL GAS O2 CT", "APH B INL GAS O2 CT").
    if 'aph' in tokens:
        is_out = bool(tokens & {'ol', 'out', 'outl', 'outlet'})
        is_in = bool(tokens & {'il', 'in', 'inl', 'inlet'})
        if 'o2' in tokens and is_out and not is_in:
            return 'O2out'
        if 'o2' in tokens and is_in and not is_out:
            return 'O2in'
        if 'co' in tokens and is_out and not is_in:
            return 'COout'
        if 'co' in tokens and is_in and not is_out:
            return 'COin'

    # Secondary air arriving at the furnace after the APH — real plant tags
    # sometimes name this from the furnace's point of view ("FURNACE L_SIDE
    # INL SA T" / "FURNACE R_SIDE INL SA T") rather than the APH's point of
    # view, but it's the same physical reading CENPEEP calls "SA Temp Out"
    # (Tsao) — the secondary air has already passed through the APH by the
    # time it reaches the furnace inlet.
    if {'furnace', 'inl', 'sa'} <= tokens and ({'t', 'temp'} & tokens):
        return 'Tsao'

    return None


def _label_to_field(label):
    """Map a header label string to a CENPEEP field id."""
    norm = re.sub(r'[^a-z0-9 ]', '', str(label).lower().strip())
    # Direct symbol match first
    fid = _sym_to_field(label.strip())
    if fid:
        return fid
    fid = LABEL_ALIASES.get(norm)
    if fid:
        return fid
    return _match_tag_patterns(norm)


# ─── Strategy 1: Standard CENPEEP column layout ───────────────────────────────
def _parse_cenpeep_layout(rows):
    """
    Expects rows like:
      col0=Particulars, col1=UOM, col2=Symbol, col3=Formula/INPUT, col4=Value
    Returns (extracted_dict, raw_rows_list).
    """
    extracted = {}
    raw_rows = []
    design_md_seen = False
    design_ad_seen = False

    for row in rows:
        if len(row) < 5:
            continue
        particulars = row[0]
        uom = row[1]
        symbol = row[2]
        formula = row[3]
        value = row[4]

        if not symbol or value is None:
            continue

        is_input = isinstance(formula, str) and formula.strip().lower() == 'input'
        is_plain = (formula is None) and isinstance(value, (int, float))

        if not is_input and not is_plain:
            continue

        sym = str(symbol).strip()
        num = _to_num(value)
        if num is None:
            continue

        # Handle duplicate Md / Ad design symbols
        field_id = _sym_to_field(sym)
        if sym == 'Md':
            field_id = 'Md2' if design_md_seen else 'Md'
            design_md_seen = True
        if sym == 'Ad':
            field_id = 'Ad2' if design_ad_seen else 'Ad'
            design_ad_seen = True

        if not field_id or field_id in NEVER_AUTO_DETECT:
            continue

        extracted[field_id] = num
        raw_rows.append({
            'particulars': str(particulars) if particulars else sym,
            'uom': str(uom) if uom else '',
            'symbol': sym,
            'value': num,
        })

    return extracted, raw_rows


# ─── Header row detection (real sheets often bury the header a few rows down) ─
def _find_header_row(sample_rows, use_ml=True):
    """
    Scans the first few rows of a sheet and picks the one most likely to be
    a header row.

    Some real plant exports stack MULTIPLE header-shaped rows on top of each
    other before the data starts — e.g. row0 = human-readable description
    ("Main Steam Flow"), row1 = an aggregation label repeated across every
    column ("Hourly Average"), row2 = the raw PI/DCS tag code
    ("U6_MN_STM_TOT_FL"). All three are "mostly text, few numbers", so a
    pure text-density heuristic can't tell them apart — and can easily pick
    the least useful one (a tag-code row scores just as high on density as
    the readable row, sometimes higher if it has fewer blank/merged cells).

    So: first shortlist rows that look header-shaped (mostly text, few
    numbers), then, among the shortlist, actually try mapping each one to
    CENPEEP fields and pick whichever row yields the most matched fields.
    This directly optimizes for what the header row is FOR, instead of a
    proxy heuristic. Text-density score is only used as a tie-breaker.
    """
    candidates = []
    for i, row in enumerate(sample_rows):
        str_cells = sum(1 for c in row if isinstance(c, str) and c.strip())
        num_cells = sum(1 for c in row if isinstance(c, (int, float)))
        score = str_cells - num_cells
        if str_cells >= 3:
            candidates.append((i, score, row))

    if not candidates:
        return None

    best_idx, best_field_count, best_score = None, -1, -10 ** 9
    for i, score, row in candidates:
        col_map, _, _ = _map_columns_to_fields(row, use_ml=use_ml)
        field_count = len(set(col_map.values()))
        if field_count > best_field_count or (
            field_count == best_field_count and score > best_score
        ):
            best_idx, best_field_count, best_score = i, field_count, score

    return best_idx


# ─── Column → field mapping (rule-based alias lookup + ML fallback) ──────────
def _map_columns_to_fields(headers, use_ml=True, ml_threshold=DEFAULT_CONFIDENCE_THRESHOLD):
    """
    Given a list of header strings (one per column), returns:
      col_map: {col_idx: field_id}
      col_source: {col_idx: 'rule' | 'ml'}
      col_confidence: {col_idx: float}   (1.0 for rule matches)
    Rule-based alias lookup runs first (cheap, exact); any column it can't
    place is handed to the ML classifier as a batch (fast — single vectorized
    call rather than one call per column).
    """
    col_map = {}
    col_source = {}
    col_confidence = {}
    unmatched_idx = []
    unmatched_text = []

    for col_idx, hdr in enumerate(headers):
        if hdr is None or not str(hdr).strip():
            continue
        if is_non_field_header(hdr):
            continue
        fid = _label_to_field(str(hdr))
        if fid and fid in NEVER_AUTO_DETECT:
            # Always-manual field (see NEVER_AUTO_DETECT) — treat the column
            # as unrecognized rather than auto-mapping it, and don't hand it
            # to the ML fallback either (a rule already matched it, just not
            # one we act on).
            continue
        if fid:
            col_map[col_idx] = fid
            col_source[col_idx] = 'rule'
            col_confidence[col_idx] = 1.0
        else:
            unmatched_idx.append(col_idx)
            unmatched_text.append(str(hdr))

    if use_ml and unmatched_text:
        clf = get_classifier()
        preds = clf.predict_batch(unmatched_text, threshold=ml_threshold)
        for col_idx, (fid, score, matched_example) in zip(unmatched_idx, preds):
            if fid and fid not in NEVER_AUTO_DETECT:
                col_map[col_idx] = fid
                col_source[col_idx] = 'ml'
                col_confidence[col_idx] = round(score, 3)

    col_map, col_source, col_confidence = _dedupe_columns_per_field(
        col_map, col_source, col_confidence
    )

    return col_map, col_source, col_confidence


# Fields where two columns legitimately both belong to the same field id
# and should be AVERAGED together, rather than deduped down to one. This is
# the real-world "Left duct / Right duct" instrumentation pattern many
# plants use for APH readings — e.g. a sheet with BOTH
# "OXYGEN IN FLUE GAS(L)-AH O/L" and "OXYGEN IN FLUE GAS(R)-AH O/L" columns
# for Avg. Flue Gas O2 — APH Out (O2out): these are two separate physical
# sensors (left/right side of the air preheater), not a strict-vs-fuzzy
# duplicate match on the same reading, so both readings should be blended
# into the field's value instead of one being silently discarded by
# _dedupe_columns_per_field below.
MULTI_COLUMN_AVERAGE_FIELDS = {'O2out'}


def _dedupe_columns_per_field(col_map, col_source, col_confidence):
    """
    Keeps only the SINGLE best column for each field id, instead of letting
    every column that happens to map to the same field survive together —
    EXCEPT for fields listed in MULTI_COLUMN_AVERAGE_FIELDS (see above),
    where every matched column is deliberately kept so its readings get
    averaged together in _finalize_field_values.

    Real DCS/plant sheets routinely have one column with the exact/strict
    header (e.g. "MAIN STM FLOW COMP") AND one or more other columns whose
    wording is loosely/fuzzily similar (e.g. "T-FEED-FLOW", which just
    shares the words "feed"/"flow" with training phrasings like "Feed
    Water Flow"). Previously ALL such columns were kept, which corrupted
    results two ways: their values got averaged together in
    _finalize_field_values (blending a correct reading with an unrelated
    one), and whichever column happened to come LAST in column order won
    the "detected from" display — regardless of which one was actually the
    strict/confident match.

    Selection rule per field id, in order (fields in
    MULTI_COLUMN_AVERAGE_FIELDS skip this and keep every matched column):
      1. An exact rule match always beats an ML (fuzzy) match.
      2. Among same-source matches, higher confidence wins.
      3. Ties broken by earliest column index, for determinism.

    Highlight-based conflict resolution (_apply_highlight_signal) still
    runs after this and can still override toward a human-highlighted
    column even if it isn't the strict winner here — that's a stronger,
    human-provided signal than header-text matching alone.
    """
    by_field = {}
    for col_idx, fid in col_map.items():
        by_field.setdefault(fid, []).append(col_idx)

    def rank(col_idx):
        # Lower is better: rule (0) beats ml (1); within a tier, higher
        # confidence is better (negated so sort ascending = best first);
        # earliest column index is the final tiebreaker.
        source_rank = 0 if col_source[col_idx] == 'rule' else 1
        return (source_rank, -col_confidence[col_idx], col_idx)

    new_map, new_source, new_confidence = {}, {}, {}
    for fid, cols in by_field.items():
        if fid in MULTI_COLUMN_AVERAGE_FIELDS and len(cols) > 1:
            for col_idx in cols:
                new_map[col_idx] = fid
                new_source[col_idx] = col_source[col_idx]
                new_confidence[col_idx] = col_confidence[col_idx]
            continue
        best = min(cols, key=rank)
        new_map[best] = fid
        new_source[best] = col_source[best]
        new_confidence[best] = col_confidence[best]

    return new_map, new_source, new_confidence


# ─── Row-count helpers (used to pick the right sheet when a field shows up
#     in more than one — e.g. an "Hourly" sheet AND a "Day Avg" sheet) ────────
_DATE_COL_HINTS = {'date', 'time', 'day', 'hour', 'hrs', 'hr', 'timestamp'}


def _find_date_col_idx(headers):
    """
    Locate a date/time-like column among the headers, purely to gauge how
    many real data rows a sheet has. This is NOT used for field extraction
    (date/time columns are never mapped to a CENPEEP field — see
    NON_FIELD_HEADERS) — it's only a row-counting yardstick so we can tell
    a genuine hourly log sheet (many populated date rows) apart from a
    daily/monthly summary sheet (few rows) when both sheets happen to
    produce a value for the same field.
    """
    for idx, h in enumerate(headers):
        if h is None:
            continue
        norm = re.sub(r'[^a-z0-9]+', ' ', str(h).lower()).strip()
        if set(norm.split()) & _DATE_COL_HINTS:
            return idx
    return None


def _row_has_data(row, date_col_idx, col_map):
    """
    True if this row should count as a real reading, not a blank/spacer row.

    If we found a date/time column, a row only counts if that cell is
    actually populated — this is the direct implementation of "skip blank
    rows, don't count them, and don't treat them as a reading of 0".
    If no date column was found on this sheet, fall back to "does any
    mapped field column have a real number in this row".
    """
    if date_col_idx is not None:
        val = row[date_col_idx] if date_col_idx < len(row) else None
        return val is not None and str(val).strip() != ''
    for col_idx in col_map:
        val = row[col_idx] if col_idx < len(row) else None
        if _to_num(val) is not None:
            return True
    return False


def _count_populated_data_rows(data_rows, date_col_idx, col_map):
    """Counts real (non-blank) data rows in a sheet — see _row_has_data."""
    return sum(1 for row in data_rows if _row_has_data(row, date_col_idx, col_map))


# ─── Strategy 2: Raw tabular layout (header row + data rows), ML-augmented ───
def _parse_raw_layout(rows, use_ml=True, highlight_map=None):
    """
    Handles sheets where some early row is a header row with field names /
    symbols / free-text labels, and subsequent rows are data.

    Multiple data rows = multiple readings → averaged automatically.
    Unmatched headers are sent through the ML classifier as a fallback.
    `highlight_map`, if given, is {rowIdx: {colIdx, ...}} for this sheet's
    highlighted header cells (see _scan_header_highlights) — used to prefer
    highlighted columns on a field conflict and to recover highlighted
    columns the rule/ML pass missed (see _apply_highlight_signal).
    Returns (extracted_dict, raw_rows_list, sheet_summary, col_meta,
             data_row_count, unmatched_highlighted).
    """
    sample = rows[:HEADER_SCAN_ROWS]
    header_row_idx = _find_header_row(sample, use_ml=use_ml)

    if header_row_idx is None:
        return {}, [], {}, {}, 0, []

    headers = rows[header_row_idx]
    data_rows = rows[header_row_idx + 1:]

    col_map, col_source, col_confidence = _map_columns_to_fields(headers, use_ml=use_ml)

    highlighted_cols = (highlight_map or {}).get(header_row_idx, set())
    col_map, col_source, col_confidence, highlighted_field_ids, unmatched_highlighted = (
        _apply_highlight_signal(col_map, col_source, col_confidence, headers,
                                 highlighted_cols, use_ml=use_ml)
    )

    if not col_map:
        return {}, [], {}, {}, 0, unmatched_highlighted

    date_col_idx = _find_date_col_idx(headers)
    data_row_count = _count_populated_data_rows(data_rows, date_col_idx, col_map)

    # Collect numeric values per field across all data rows. Blank / non-
    # numeric cells (_to_num returns None for these) are skipped outright —
    # they are never counted as 0, so they can't drag the average down.
    field_values = {fid: [] for fid in col_map.values()}
    for row in data_rows:
        for col_idx, fid in col_map.items():
            val = row[col_idx] if col_idx < len(row) else None
            num = _to_num(val)
            if num is not None:
                field_values[fid].append(num)

    extracted, raw_rows, sheet_summary = _finalize_field_values(field_values)
    col_meta = {
        col_idx: {
            'fieldId': fid,
            'header': str(headers[col_idx]),
            'source': col_source[col_idx],
            'confidence': col_confidence[col_idx],
            'highlighted': col_idx in highlighted_cols,
        }
        for col_idx, fid in col_map.items()
    }
    return extracted, raw_rows, sheet_summary, col_meta, data_row_count, unmatched_highlighted


def _finalize_field_values(field_values):
    """Average collected numeric readings per field; build raw_rows + summary."""
    extracted = {}
    raw_rows = []
    sheet_summary = {}
    for fid, vals in field_values.items():
        if not vals:
            continue
        avg = statistics.mean(vals)
        extracted[fid] = avg
        sheet_summary[fid] = {'count': len(vals), 'values': vals[:50], 'average': avg}
        raw_rows.append({
            'particulars': fid, 'uom': '', 'symbol': fid,
            'value': avg, 'readings': len(vals),
        })
    return extracted, raw_rows, sheet_summary


# ─── Per-sheet parser (tries both strategies) ─────────────────────────────────
def _parse_sheet_rows(rows, sheet_name, use_ml=True, highlight_map=None):
    """
    Tries CenPeep column layout first, then raw tabular layout (ML-augmented).
    Returns a dict with keys: extracted, rawRows, strategy, summary, columns.
    """
    # Strategy 1: standard CENPEEP layout
    ext1, raw1 = _parse_cenpeep_layout(rows)
    if len(ext1) >= 5:
        return {
            'sheetName': sheet_name,
            'strategy': 'cenpeep_column',
            'extracted': ext1,
            'rawRows': raw1,
            'summary': {},
            'columns': {},
            'dataRowCount': len(rows),
            'unmatchedHighlighted': [],
        }

    # Strategy 2: raw tabular, with ML fallback for unrecognized headers
    ext2, raw2, summary, col_meta, data_row_count, unmatched_hi = _parse_raw_layout(
        rows, use_ml=use_ml, highlight_map=highlight_map
    )
    if ext2:
        ml_used = any(c['source'] in ('ml', 'ml_highlighted') for c in col_meta.values())
        return {
            'sheetName': sheet_name,
            'strategy': 'raw_tabular_ml' if ml_used else 'raw_tabular',
            'extracted': ext2,
            'rawRows': raw2,
            'summary': summary,
            'columns': col_meta,
            'dataRowCount': data_row_count,
            'unmatchedHighlighted': unmatched_hi,
        }

    return {
        'sheetName': sheet_name,
        'strategy': 'unrecognized',
        'extracted': {},
        'rawRows': [],
        'summary': {},
        'columns': {},
        'dataRowCount': 0,
        'unmatchedHighlighted': unmatched_hi,
    }


# ─── Workbook reader (chunked / streaming) ────────────────────────────────────
def _iter_sheet_rows_streamed(ws, ext_xls=False, xlrd_sheet=None):
    """
    Yields rows one at a time from a worksheet without materializing the
    whole sheet in memory. Works for openpyxl read_only worksheets,
    xlrd sheets (legacy .xls fallback), and calamine sheets.
    """
    if ext_xls:
        for r in range(xlrd_sheet.nrows):
            yield [xlrd_sheet.cell_value(r, c) for c in range(xlrd_sheet.ncols)]
    elif HAS_CALAMINE and isinstance(ws, python_calamine.CalamineSheet):
        for row in ws.iter_rows():
            yield row
    else:
        for row in ws.iter_rows(values_only=True):
            yield list(row)


def _parse_sheet_chunked(row_iter, sheet_name, use_ml=True, highlight_map=None):
    """
    Chunked version of sheet parsing for large sheets: reads CHUNK_ROWS rows
    at a time, identifies the header row from the first chunk, maps columns
    to fields once, then streams remaining chunks through the field-value
    accumulator and discards each chunk immediately after — so memory stays
    bounded by chunk size, not total sheet size.

    `highlight_map`, if given, is {rowIdx: {colIdx, ...}} for this sheet
    (see _scan_header_highlights) — applied right after the header row is
    identified, before any data rows are accumulated, so highlighted
    columns get the same conflict-resolution/recovery treatment as the
    non-chunked path (see _apply_highlight_signal).

    Falls back cleanly to "unrecognized" if no header / no fields found.
    Returns the same shape as _parse_sheet_rows().
    """
    chunk = []
    header_row_idx = None
    headers = None
    col_map = col_source = col_confidence = None
    field_values = {}
    cenpeep_check_rows = []  # first rows, used to check for CenPeep column layout
    row_count = 0
    date_col_idx = None
    data_row_count = 0
    unmatched_hi = []

    for row in row_iter:
        row_count += 1
        cenpeep_check_rows_cap = 200  # CenPeep layout is always near the top
        if len(cenpeep_check_rows) < cenpeep_check_rows_cap:
            cenpeep_check_rows.append(row)

        if headers is None:
            # Still hunting for the header row in the first few rows
            chunk.append(row)
            if len(chunk) >= HEADER_SCAN_ROWS:
                idx = _find_header_row(chunk, use_ml=use_ml)
                if idx is not None:
                    header_row_idx = idx
                    headers = chunk[header_row_idx]
                    col_map, col_source, col_confidence = _map_columns_to_fields(
                        headers, use_ml=use_ml
                    )
                    highlighted_cols = (highlight_map or {}).get(header_row_idx, set())
                    col_map, col_source, col_confidence, _, unmatched_hi = (
                        _apply_highlight_signal(col_map, col_source, col_confidence,
                                                 headers, highlighted_cols, use_ml=use_ml)
                    )
                    field_values = {fid: [] for fid in set(col_map.values())}
                    date_col_idx = _find_date_col_idx(headers)
                    # Process any data rows already buffered after the header
                    for data_row in chunk[header_row_idx + 1:]:
                        _accumulate_row(data_row, col_map, field_values)
                        if _row_has_data(data_row, date_col_idx, col_map):
                            data_row_count += 1
                    chunk = []
                elif len(chunk) > HEADER_SCAN_ROWS * 4:
                    # Header never found in a reasonable window — give up
                    # gracefully rather than buffering the whole sheet.
                    break
            continue

        # Header already known — accumulate this row directly, no buffering
        _accumulate_row(row, col_map, field_values)
        if _row_has_data(row, date_col_idx, col_map):
            data_row_count += 1

    # First, check whether this is actually a strict CenPeep column-layout
    # sheet (Particulars/UOM/Symbol/Formula/Value) — that strategy wins if
    # it finds enough fields, same priority as the non-chunked path.
    ext1, raw1 = _parse_cenpeep_layout(cenpeep_check_rows)
    if len(ext1) >= 5:
        return {
            'sheetName': sheet_name,
            'strategy': 'cenpeep_column',
            'extracted': ext1,
            'rawRows': raw1,
            'summary': {},
            'columns': {},
            'rowsScanned': row_count,
            'dataRowCount': row_count,
            'unmatchedHighlighted': [],
        }

    if not col_map:
        return {
            'sheetName': sheet_name,
            'strategy': 'unrecognized',
            'extracted': {},
            'rawRows': [],
            'summary': {},
            'columns': {},
            'rowsScanned': row_count,
            'dataRowCount': 0,
            'unmatchedHighlighted': unmatched_hi,
        }

    extracted, raw_rows, summary = _finalize_field_values(field_values)
    ml_used = any(col_source.get(i) in ('ml', 'ml_highlighted') for i in col_map)
    highlighted_cols_final = (highlight_map or {}).get(header_row_idx, set())
    col_meta = {
        col_idx: {
            'fieldId': fid,
            'header': str(headers[col_idx]),
            'source': col_source[col_idx],
            'confidence': col_confidence[col_idx],
            'highlighted': col_idx in highlighted_cols_final,
        }
        for col_idx, fid in col_map.items()
    }

    return {
        'sheetName': sheet_name,
        'strategy': 'raw_tabular_ml_chunked' if ml_used else 'raw_tabular_chunked',
        'extracted': extracted,
        'rawRows': raw_rows,
        'summary': summary,
        'columns': col_meta,
        'rowsScanned': row_count,
        'dataRowCount': data_row_count,
        'unmatchedHighlighted': unmatched_hi,
    }


def _accumulate_row(row, col_map, field_values):
    """Pull numeric values for mapped columns out of one data row."""
    for col_idx, fid in col_map.items():
        val = row[col_idx] if col_idx < len(row) else None
        num = _to_num(val)
        if num is not None:
            field_values.setdefault(fid, []).append(num)


def _is_readable_worksheet(ws):
    """
    True if `ws` is a normal cell-grid worksheet (openpyxl Worksheet or
    ReadOnlyWorksheet) rather than a Chartsheet/Dialogsheet or other
    non-worksheet type with no cell grid to read.

    Checked by capability (has iter_rows) rather than isinstance, since
    read_only=True workbooks use ReadOnlyWorksheet, not the normal
    Worksheet class.
    """
    return hasattr(ws, 'iter_rows')


def _sheet_row_estimate(ws):
    """Best-effort row count for an openpyxl worksheet (read_only safe)."""
    try:
        return ws.max_row or 0
    except Exception:
        return 0


def _parse_with_calamine(file_bytes, use_ml=True, highlight_map=None):
    """
    calamine (Rust) reads the workbook's shared strings/values directly
    without building openpyxl's Python style-object graph. This matters
    a lot in practice: real plant/historian exports often carry tens of
    thousands of near-duplicate per-cell styles, and openpyxl's style
    resolution during load_workbook() can dominate parse time — e.g. a
    ~5MB sheet with ~46,000 named styles took ~26s to even open with
    openpyxl vs ~0.1s with calamine. This is what makes parsing
    100MB-class uploads practical within a normal request timeout.

    NOTE: calamine can raise pyo3_runtime.PanicException (a BaseException,
    not an Exception) if its Rust parser trips on an unusual/malformed
    file. Callers must be prepared to catch BaseException around this
    call, not just Exception — see parse_workbook().
    """
    sheet_results = []
    wb = python_calamine.CalamineWorkbook.from_filelike(io.BytesIO(file_bytes))
    for meta in wb.sheets_metadata:
        name = meta.name
        # Skip chart sheets / dialog sheets / macro sheets — they carry
        # no tabular cell data. Checked via explicit sheet-type metadata
        # (robust) rather than trying to read them and catching the
        # resulting AttributeError.
        if meta.typ != python_calamine.SheetTypeEnum.WorkSheet:
            sheet_results.append({
                'sheetName': name,
                'strategy': 'skipped_non_worksheet',
                'extracted': {},
                'rawRows': [],
                'summary': {},
                'columns': {},
                'rowsScanned': 0,
            })
            continue
        ws = wb.get_sheet_by_name(name)
        est_rows = ws.height or 0
        row_iter = _iter_sheet_rows_streamed(ws)
        sheet_hi_map = (highlight_map or {}).get(name, {})
        if est_rows > LARGE_SHEET_ROW_THRESHOLD:
            result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml, highlight_map=sheet_hi_map)
        else:
            rows = list(row_iter)
            result = _parse_sheet_rows(rows, name, use_ml=use_ml, highlight_map=sheet_hi_map)
        sheet_results.append(result)
    return sheet_results


def _parse_with_xlrd(file_bytes, use_ml=True, highlight_map=None):
    """Legacy .xls reader (calamine/openpyxl don't handle old binary .xls)."""
    sheet_results = []
    wb = xlrd.open_workbook(file_contents=file_bytes)
    for name in wb.sheet_names():
        ws = wb.sheet_by_name(name)
        row_iter = _iter_sheet_rows_streamed(None, ext_xls=True, xlrd_sheet=ws)
        sheet_hi_map = (highlight_map or {}).get(name, {})
        if ws.nrows > LARGE_SHEET_ROW_THRESHOLD:
            result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml, highlight_map=sheet_hi_map)
        else:
            rows = list(row_iter)
            result = _parse_sheet_rows(rows, name, use_ml=use_ml, highlight_map=sheet_hi_map)
        sheet_results.append(result)
    return sheet_results


def _parse_with_openpyxl(file_bytes, use_ml=True, highlight_map=None):
    """
    Pure-Python fallback reader. Slower than calamine on files with heavy
    style bloat, but more lenient — used both when calamine isn't installed
    and when calamine fails to read a particular file (see parse_workbook()).
    """
    sheet_results = []
    # read_only=True streams the worksheet instead of materializing
    # the whole workbook as Cell objects — this is the key change that
    # lets large files (10MB+, wide sheets, 1000+ rows) parse without
    # blowing up memory the way the original full-load approach did.
    wb = openpyxl.load_workbook(io.BytesIO(file_bytes), read_only=True, data_only=True)
    for name in wb.sheetnames:
        ws = wb[name]
        # Chartsheets (and other non-worksheet sheet types, e.g. dialogsheets)
        # have no cell grid and no iter_rows() — attempting to read them the
        # same way as a normal worksheet raises
        # "'Chartsheet' object has no attribute 'iter_rows'". Skip them
        # instead of crashing the whole upload. Checked by capability
        # (has iter_rows) rather than isinstance, since read_only=True
        # workbooks use ReadOnlyWorksheet, not the normal Worksheet class.
        if not _is_readable_worksheet(ws):
            sheet_results.append({
                'sheetName': name,
                'strategy': 'skipped_non_worksheet',
                'extracted': {},
                'rawRows': [],
                'summary': {},
                'columns': {},
                'rowsScanned': 0,
            })
            continue
        est_rows = _sheet_row_estimate(ws)
        row_iter = _iter_sheet_rows_streamed(ws)
        sheet_hi_map = (highlight_map or {}).get(name, {})
        if est_rows > LARGE_SHEET_ROW_THRESHOLD:
            result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml, highlight_map=sheet_hi_map)
        else:
            rows = list(row_iter)
            result = _parse_sheet_rows(rows, name, use_ml=use_ml, highlight_map=sheet_hi_map)
        sheet_results.append(result)
    wb.close()
    return sheet_results


# ─── Main parse entry-point ───────────────────────────────────────────────────
def parse_workbook(file_bytes, filename, use_ml=True):
    """
    Parse all sheets, automatically choosing chunked streaming for large
    sheets (row count above LARGE_SHEET_ROW_THRESHOLD) and the simpler
    in-memory path for small ones. Returns:
      {
        sheetResults: [ { sheetName, strategy, extracted, rawRows, summary, columns }, … ],
        extracted:    { merged field dict — CenPeep sheet wins },
        primarySheet: str,
        totalFields:  int,
        parseTimeMs:  float,
      }
    """
    t_start = time.time()
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    sheet_results = []

    # Highlighted-column detection is a separate, lightweight pass (only
    # openpyxl exposes cell styles; calamine/xlrd don't). Computed once up
    # front regardless of which reader ends up doing the actual data parse,
    # and passed down so every sheet gets the same treatment. Never fatal —
    # falls back to {} (no highlight signal, unchanged prior behavior) if
    # anything about the file trips up this second read.
    highlight_map = _scan_header_highlights(file_bytes) if ext != 'xls' else {}

    use_calamine = HAS_CALAMINE
    if use_calamine:
        try:
            sheet_results = _parse_with_calamine(file_bytes, use_ml=use_ml, highlight_map=highlight_map)
        except BaseException as e:
            # calamine is a compiled Rust extension. When its parser hits
            # something it can't handle it doesn't raise a normal Python
            # Exception — it raises pyo3_runtime.PanicException, which is
            # deliberately made to inherit from BaseException (not
            # Exception) specifically so a bare `except Exception` anywhere
            # upstream (e.g. this route's error handler) will NOT catch it.
            # Left alone, that blows straight through Flask's request
            # handling and the client gets a dead connection with no
            # response at all, instead of a normal error. Let real
            # interpreter-shutdown signals through; treat everything else
            # (including PanicException) as "this file broke calamine" and
            # fall back to the openpyxl/xlrd reader instead of taking the
            # whole upload down.
            if isinstance(e, (KeyboardInterrupt, SystemExit)):
                raise
            use_calamine = False
            sheet_results = []

    if not use_calamine:
        if ext == 'xls':
            if not HAS_XLRD:
                raise RuntimeError('xlrd not installed; cannot read .xls files')
            sheet_results = _parse_with_xlrd(file_bytes, use_ml=use_ml, highlight_map=highlight_map)
        else:
            if not HAS_OPENPYXL:
                raise RuntimeError('Neither python-calamine nor openpyxl is installed')
            sheet_results = _parse_with_openpyxl(file_bytes, use_ml=use_ml, highlight_map=highlight_map)

    # Merge: pick ONE "best" sheet among the generic (non-CenPeep) sheets —
    # whichever has the most real (non-blank) date rows — and take ALL of
    # its extracted fields as-is. A field's average/sum must never be mixed
    # across sheets; it always comes wholly from one sheet's rows.
    #
    # Only fields the best sheet doesn't have at all are backfilled from the
    # next-best sheet (2nd-most date rows), then the next, and so on. This
    # is deliberately a SHEET-level choice, not a per-field one — e.g. an
    # "Hourly" log sheet (many date rows) should be used wholesale over a
    # "Day Avg" summary sheet (few rows, itself just an average of the
    # hourly sheet), rather than comparing row counts field by field.
    #
    # The CenPeep column-layout sheet, if present, still wins over both
    # (it's a distinct, authoritative single-value layout, not a log).
    merged_extracted = {}
    merged_field_source = {}   # field_id -> (sheetName, dataRowCount) chosen
    merged_field_detail = {}   # field_id -> {sheet, header, source, confidence}
    cenpeep_result = None
    generic_sheets = []
    for sr in sheet_results:
        if 'cenpeep' in sr['sheetName'].lower():
            cenpeep_result = sr
            continue
        generic_sheets.append(sr)

    # Rank generic sheets by date-row count, most rows first.
    ranked_sheets = sorted(generic_sheets, key=lambda sr: sr.get('dataRowCount', 0), reverse=True)

    best_generic_sheet = None
    for sr in ranked_sheets:
        if not sr['extracted']:
            continue
        sr_rows = sr.get('dataRowCount', 0)
        if best_generic_sheet is None:
            best_generic_sheet = sr
        field_details = _sheet_field_details(sr)
        # Take every field this sheet has, but only if the field hasn't
        # already been filled by a higher-ranked (more date rows) sheet.
        for fid, val in sr['extracted'].items():
            if fid in merged_extracted:
                continue
            merged_extracted[fid] = val
            merged_field_source[fid] = (sr['sheetName'], sr_rows)
            detail = field_details.get(fid, {})
            merged_field_detail[fid] = {
                'sheet': sr['sheetName'],
                'label': FIELD_LABELS.get(fid, fid),
                'header': detail.get('header'),
                'source': detail.get('source', 'rule'),
                'confidence': detail.get('confidence', 1.0),
            }

    # Fallback primary sheet: the best-ranked generic sheet if one produced
    # fields; otherwise whichever sheet produced the most fields at all, so
    # a chart sheet / empty cover sheet can't "win" despite contributing
    # nothing.
    if best_generic_sheet is not None:
        primary_sheet = best_generic_sheet['sheetName']
    elif sheet_results:
        primary_sheet = max(sheet_results, key=lambda sr: len(sr['extracted']))['sheetName']
    else:
        primary_sheet = ''
    if cenpeep_result:
        cenpeep_details = _sheet_field_details(cenpeep_result)
        for fid in cenpeep_result['extracted']:
            merged_field_source[fid] = (cenpeep_result['sheetName'], None)
            merged_field_detail[fid] = {
                'sheet': cenpeep_result['sheetName'],
                'label': FIELD_LABELS.get(fid, fid),
                'header': None,
                'source': 'cenpeep_column',
                'confidence': cenpeep_details.get(fid, {}).get('confidence', 1.0),
            }
        merged_extracted.update(cenpeep_result['extracted'])
        primary_sheet = cenpeep_result['sheetName']

    # Fallback: Primary Air to APH Temp In (Tpai) very often has no column
    # of its own on real plant sheets — only the Secondary Air In (Tsai)
    # reading is logged. Physically, ambient air entering the APH is drawn
    # from the same source for both the primary- and secondary-air ducts,
    # so when Tpai genuinely wasn't found anywhere but Tsai WAS, default
    # Tpai to the same value as Tsai instead of leaving it blank/missing.
    # This only fires when Tpai is absent from every sheet — it never
    # overrides an actually-detected Tpai value.
    if 'Tpai' not in merged_extracted and 'Tsai' in merged_extracted:
        merged_extracted['Tpai'] = merged_extracted['Tsai']
        tsai_source = merged_field_source.get('Tsai')
        if tsai_source:
            merged_field_source['Tpai'] = tsai_source
        tsai_detail = merged_field_detail.get('Tsai', {})
        merged_field_detail['Tpai'] = {
            'sheet': tsai_detail.get('sheet'),
            'label': FIELD_LABELS.get('Tpai', 'Tpai'),
            'header': f"defaulted = Secondary Air In ({tsai_detail.get('header') or 'Tsai'})",
            'source': 'derived_fallback',
            'confidence': tsai_detail.get('confidence', 1.0),
        }

    missing_fields = [
        {'id': fid, 'label': FIELD_LABELS.get(fid, fid)}
        for fid in REQUIRED_FIELDS if fid not in merged_extracted
    ]

    # Highlighted header cells that never resolved to any CENPEEP field on
    # their sheet, even after the relaxed highlight-only retry — these are
    # exactly the columns a person marked as important that the parser
    # genuinely couldn't place, so they're worth a human glance rather than
    # being silently dropped like every other unmatched column.
    unmatched_highlighted = [
        {'sheet': sr['sheetName'], 'header': item['header']}
        for sr in sheet_results
        for item in sr.get('unmatchedHighlighted', [])
    ]

    return {
        'sheetResults': sheet_results,
        'extracted': merged_extracted,
        # Highlighted columns that still couldn't be mapped to a field —
        # surface these explicitly instead of letting them disappear into
        # the general "unrecognized column" pile.
        'unmatchedHighlighted': unmatched_highlighted,
        # Which sheet each field's final value was actually taken from —
        # use this to sanity-check that (e.g.) Load came from the Hourly
        # sheet and not the Day Avg sheet.
        'fieldSource': {fid: src[0] for fid, src in merged_field_source.items()},
        # Per-field detail on the SELECTED sheet's decision: which sheet,
        # which header text (if any), rule vs ML, and confidence — this is
        # what the "selected field + confidence" summary is built from,
        # instead of re-deriving it from every sheet's raw column list.
        'fieldDetail': merged_field_detail,
        'primarySheet': primary_sheet,
        'totalFields': len(merged_extracted),
        # Required CENPEEP input fields that were NOT found on any sheet —
        # i.e. still need to be entered manually.
        'missingFields': missing_fields,
        'parseTimeMs': round((time.time() - t_start) * 1000, 1),
    }


# ─── Field-level confidence lookup (for the "selected sheet" summary) ───────
def _sheet_field_details(sr):
    """
    Returns {fieldId: {'header': str|None, 'source': str, 'confidence': float}}
    for one sheet's result — regardless of which strategy produced it.

    'cenpeep_column' rows are an exact Particulars/Symbol/Value layout match,
    so every field from it is confidence 1.0 with no header-guessing involved.
    'raw_tabular*' sheets carry per-column metadata (rule match vs ML match,
    with the ML confidence score) in sr['columns'], keyed by column index —
    this re-keys that by field id instead, which is what a "what was picked,
    and how sure were we" summary actually needs.
    """
    if sr['strategy'] == 'cenpeep_column':
        return {
            fid: {'header': None, 'source': 'cenpeep_column', 'confidence': 1.0}
            for fid in sr['extracted']
        }
    details = {}
    for meta in sr.get('columns', {}).values():
        fid = meta['fieldId']
        if fid in details:
            # Multiple columns mapped to the same field id — this only
            # happens for MULTI_COLUMN_AVERAGE_FIELDS (e.g. O2out's
            # Left/Right APH columns, see _dedupe_columns_per_field), so
            # combine both headers into one "Detected From" string instead
            # of letting whichever column came last silently overwrite the
            # other in this fid-keyed summary.
            existing = details[fid]
            details[fid] = {
                'header': f"{existing['header']} + {meta['header']}" if existing['header'] else meta['header'],
                'source': meta['source'],
                'confidence': max(existing['confidence'] or 0, meta['confidence'] or 0),
            }
        else:
            details[fid] = {
                'header': meta['header'],
                'source': meta['source'],
                'confidence': meta['confidence'],
            }
    return details


# ─── Route ────────────────────────────────────────────────────────────────────
ALLOWED_EXTS = {'.xlsx', '.xls', '.xlsm'}


@upload_bp.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'ok': False, 'error': 'No file uploaded'}), 400

    f = request.files['file']
    if not f.filename:
        return jsonify({'ok': False, 'error': 'Empty filename'}), 400

    ext = '.' + f.filename.rsplit('.', 1)[-1].lower() if '.' in f.filename else ''
    if ext not in ALLOWED_EXTS:
        return jsonify({'ok': False, 'error': 'Only .xlsx / .xls / .xlsm files are accepted'}), 400

    try:
        file_bytes = f.read()
        result = parse_workbook(file_bytes, f.filename, use_ml=True)
        primary_sheet_result = next(
            (sr for sr in result['sheetResults'] if sr['sheetName'] == result['primarySheet']),
            result['sheetResults'][0] if result['sheetResults'] else None,
        )
        return jsonify({
            'ok': True,
            'filename': f.filename,
            'fileSizeMB': round(len(file_bytes) / (1024 * 1024), 2),
            **result,
            # Keep legacy fields for backward compat with existing frontend
            'sheetName': result['primarySheet'],
            'rawRows': primary_sheet_result['rawRows'] if primary_sheet_result else [],
        })
    except MemoryError:
        return jsonify({
            'ok': False,
            'error': 'File is too large to process even with chunked parsing. '
                     'Try splitting it into smaller sheets/files.',
        }), 413
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500
    except BaseException as e:
        # Defense-in-depth: parse_workbook() already falls back to openpyxl
        # if calamine panics (see _parse_with_calamine), but if some other
        # BaseException-derived error (e.g. a pyo3 PanicException from a
        # different native call) slips through, catch it here too rather
        # than letting it kill the request with no response at all.
        if isinstance(e, (KeyboardInterrupt, SystemExit)):
            raise
        return jsonify({'ok': False, 'error': f'Unexpected parser failure: {e}'}), 500


@upload_bp.route('/retrain', methods=['POST'])
def retrain_model():
    """
    Retrains the ML field classifier from the current contents of
    ml/training_data.py and persists it to disk. Call this after editing
    training_data.py (adding new header phrasings, fixing a mislabeled
    example, etc.) so changes take effect without restarting the server.
    """
    # Vercel's filesystem is read-only under /var/task. Retraining and saving
    # to disk is therefore disabled there. The API still works because the
    # classifier can train in memory and/or use /tmp via ml/field_classifier.py.
    if os.getenv("VERCEL", "").lower() in {"1", "true", "yes"}:
        return jsonify({
            'ok': False,
            'error': 'Retraining is disabled on Vercel because the filesystem is read-only.',
        }), 400

    try:
        from ml.field_classifier import retrain_and_save
        clf = retrain_and_save()
        return jsonify({
            'ok': True,
            'trainingExamples': len(clf.train_labels),
            'message': 'Field classifier retrained successfully.',
        })
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500