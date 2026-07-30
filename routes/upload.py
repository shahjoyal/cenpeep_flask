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
    'unburnt bottom': 'Cba', 'unburnt fly': 'Cfa',
    'fly ash': 'Pfa', 'bottom ash': 'Pba',
}


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


def _label_to_field(label):
    """Map a header label string to a CENPEEP field id."""
    norm = re.sub(r'[^a-z0-9 ]', '', str(label).lower().strip())
    # Direct symbol match first
    fid = _sym_to_field(label.strip())
    if fid:
        return fid
    return LABEL_ALIASES.get(norm)


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

        if not field_id:
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
            if fid:
                col_map[col_idx] = fid
                col_source[col_idx] = 'ml'
                col_confidence[col_idx] = round(score, 3)

    return col_map, col_source, col_confidence


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
def _parse_raw_layout(rows, use_ml=True):
    """
    Handles sheets where some early row is a header row with field names /
    symbols / free-text labels, and subsequent rows are data.

    Multiple data rows = multiple readings → averaged automatically.
    Unmatched headers are sent through the ML classifier as a fallback.
    Returns (extracted_dict, raw_rows_list, sheet_summary, col_meta).
    """
    sample = rows[:HEADER_SCAN_ROWS]
    header_row_idx = _find_header_row(sample, use_ml=use_ml)

    if header_row_idx is None:
        return {}, [], {}, {}, 0

    headers = rows[header_row_idx]
    data_rows = rows[header_row_idx + 1:]

    col_map, col_source, col_confidence = _map_columns_to_fields(headers, use_ml=use_ml)

    if not col_map:
        return {}, [], {}, {}, 0

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
        }
        for col_idx, fid in col_map.items()
    }
    return extracted, raw_rows, sheet_summary, col_meta, data_row_count


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
def _parse_sheet_rows(rows, sheet_name, use_ml=True):
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
        }

    # Strategy 2: raw tabular, with ML fallback for unrecognized headers
    ext2, raw2, summary, col_meta, data_row_count = _parse_raw_layout(rows, use_ml=use_ml)
    if ext2:
        ml_used = any(c['source'] == 'ml' for c in col_meta.values())
        return {
            'sheetName': sheet_name,
            'strategy': 'raw_tabular_ml' if ml_used else 'raw_tabular',
            'extracted': ext2,
            'rawRows': raw2,
            'summary': summary,
            'columns': col_meta,
            'dataRowCount': data_row_count,
        }

    return {
        'sheetName': sheet_name,
        'strategy': 'unrecognized',
        'extracted': {},
        'rawRows': [],
        'summary': {},
        'columns': {},
        'dataRowCount': 0,
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


def _parse_sheet_chunked(row_iter, sheet_name, use_ml=True):
    """
    Chunked version of sheet parsing for large sheets: reads CHUNK_ROWS rows
    at a time, identifies the header row from the first chunk, maps columns
    to fields once, then streams remaining chunks through the field-value
    accumulator and discards each chunk immediately after — so memory stays
    bounded by chunk size, not total sheet size.

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
        }

    extracted, raw_rows, summary = _finalize_field_values(field_values)
    ml_used = any(col_source.get(i) == 'ml' for i in col_map)
    col_meta = {
        col_idx: {
            'fieldId': fid,
            'header': str(headers[col_idx]),
            'source': col_source[col_idx],
            'confidence': col_confidence[col_idx],
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


def _parse_with_calamine(file_bytes, use_ml=True):
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
        if est_rows > LARGE_SHEET_ROW_THRESHOLD:
            result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml)
        else:
            rows = list(row_iter)
            result = _parse_sheet_rows(rows, name, use_ml=use_ml)
        sheet_results.append(result)
    return sheet_results


def _parse_with_xlrd(file_bytes, use_ml=True):
    """Legacy .xls reader (calamine/openpyxl don't handle old binary .xls)."""
    sheet_results = []
    wb = xlrd.open_workbook(file_contents=file_bytes)
    for name in wb.sheet_names():
        ws = wb.sheet_by_name(name)
        row_iter = _iter_sheet_rows_streamed(None, ext_xls=True, xlrd_sheet=ws)
        if ws.nrows > LARGE_SHEET_ROW_THRESHOLD:
            result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml)
        else:
            rows = list(row_iter)
            result = _parse_sheet_rows(rows, name, use_ml=use_ml)
        sheet_results.append(result)
    return sheet_results


def _parse_with_openpyxl(file_bytes, use_ml=True):
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
        if est_rows > LARGE_SHEET_ROW_THRESHOLD:
            result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml)
        else:
            rows = list(row_iter)
            result = _parse_sheet_rows(rows, name, use_ml=use_ml)
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

    use_calamine = HAS_CALAMINE
    if use_calamine:
        try:
            sheet_results = _parse_with_calamine(file_bytes, use_ml=use_ml)
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
            sheet_results = _parse_with_xlrd(file_bytes, use_ml=use_ml)
        else:
            if not HAS_OPENPYXL:
                raise RuntimeError('Neither python-calamine nor openpyxl is installed')
            sheet_results = _parse_with_openpyxl(file_bytes, use_ml=use_ml)

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
        # Take every field this sheet has, but only if the field hasn't
        # already been filled by a higher-ranked (more date rows) sheet.
        for fid, val in sr['extracted'].items():
            if fid in merged_extracted:
                continue
            merged_extracted[fid] = val
            merged_field_source[fid] = (sr['sheetName'], sr_rows)

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
        for fid in cenpeep_result['extracted']:
            merged_field_source[fid] = (cenpeep_result['sheetName'], None)
        merged_extracted.update(cenpeep_result['extracted'])
        primary_sheet = cenpeep_result['sheetName']

    return {
        'sheetResults': sheet_results,
        'extracted': merged_extracted,
        # Which sheet each field's final value was actually taken from —
        # use this to sanity-check that (e.g.) Load came from the Hourly
        # sheet and not the Day Avg sheet.
        'fieldSource': {fid: src[0] for fid, src in merged_field_source.items()},
        'primarySheet': primary_sheet,
        'totalFields': len(merged_extracted),
        'parseTimeMs': round((time.time() - t_start) * 1000, 1),
    }


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