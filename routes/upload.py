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
import re
import time
import statistics
from flask import Blueprint, request, jsonify

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
def _find_header_row(sample_rows):
    """
    Scans the first few rows of a sheet and picks the one most likely to be
    a header row: most non-empty string cells, few/no numeric cells.
    Returns the row index (0-based, relative to sample_rows) or None.
    """
    best_idx, best_score = None, 0
    for i, row in enumerate(sample_rows):
        str_cells = sum(1 for c in row if isinstance(c, str) and c.strip())
        num_cells = sum(1 for c in row if isinstance(c, (int, float)))
        # A header row should be mostly text, not numbers
        score = str_cells - num_cells
        if str_cells >= 3 and score > best_score:
            best_score = score
            best_idx = i
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
    header_row_idx = _find_header_row(sample)

    if header_row_idx is None:
        return {}, [], {}, {}

    headers = rows[header_row_idx]
    data_rows = rows[header_row_idx + 1:]

    col_map, col_source, col_confidence = _map_columns_to_fields(headers, use_ml=use_ml)

    if not col_map:
        return {}, [], {}, {}

    # Collect numeric values per field across all data rows
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
    return extracted, raw_rows, sheet_summary, col_meta


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
        }

    # Strategy 2: raw tabular, with ML fallback for unrecognized headers
    ext2, raw2, summary, col_meta = _parse_raw_layout(rows, use_ml=use_ml)
    if ext2:
        ml_used = any(c['source'] == 'ml' for c in col_meta.values())
        return {
            'sheetName': sheet_name,
            'strategy': 'raw_tabular_ml' if ml_used else 'raw_tabular',
            'extracted': ext2,
            'rawRows': raw2,
            'summary': summary,
            'columns': col_meta,
        }

    return {
        'sheetName': sheet_name,
        'strategy': 'unrecognized',
        'extracted': {},
        'rawRows': [],
        'summary': {},
        'columns': {},
    }


# ─── Workbook reader (chunked / streaming) ────────────────────────────────────
def _iter_sheet_rows_streamed(ws, ext_xls=False, xlrd_sheet=None):
    """
    Yields rows one at a time from a worksheet without materializing the
    whole sheet in memory. Works for both openpyxl read_only worksheets
    and xlrd sheets (legacy .xls).
    """
    if ext_xls:
        for r in range(xlrd_sheet.nrows):
            yield [xlrd_sheet.cell_value(r, c) for c in range(xlrd_sheet.ncols)]
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

    for row in row_iter:
        row_count += 1
        cenpeep_check_rows_cap = 200  # CenPeep layout is always near the top
        if len(cenpeep_check_rows) < cenpeep_check_rows_cap:
            cenpeep_check_rows.append(row)

        if headers is None:
            # Still hunting for the header row in the first few rows
            chunk.append(row)
            if len(chunk) >= HEADER_SCAN_ROWS:
                idx = _find_header_row(chunk)
                if idx is not None:
                    header_row_idx = idx
                    headers = chunk[header_row_idx]
                    col_map, col_source, col_confidence = _map_columns_to_fields(
                        headers, use_ml=use_ml
                    )
                    field_values = {fid: [] for fid in set(col_map.values())}
                    # Process any data rows already buffered after the header
                    for data_row in chunk[header_row_idx + 1:]:
                        _accumulate_row(data_row, col_map, field_values)
                    chunk = []
                elif len(chunk) > HEADER_SCAN_ROWS * 4:
                    # Header never found in a reasonable window — give up
                    # gracefully rather than buffering the whole sheet.
                    break
            continue

        # Header already known — accumulate this row directly, no buffering
        _accumulate_row(row, col_map, field_values)

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
    }


def _accumulate_row(row, col_map, field_values):
    """Pull numeric values for mapped columns out of one data row."""
    for col_idx, fid in col_map.items():
        val = row[col_idx] if col_idx < len(row) else None
        num = _to_num(val)
        if num is not None:
            field_values.setdefault(fid, []).append(num)


def _sheet_row_estimate(ws):
    """Best-effort row count for an openpyxl worksheet (read_only safe)."""
    try:
        return ws.max_row or 0
    except Exception:
        return 0


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

    if ext == 'xls':
        if not HAS_XLRD:
            raise RuntimeError('xlrd not installed; cannot read .xls files')
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

    else:
        if not HAS_OPENPYXL:
            raise RuntimeError('openpyxl not installed')
        # read_only=True streams the worksheet instead of materializing
        # the whole workbook as Cell objects — this is the key change that
        # lets large files (10MB+, wide sheets, 1000+ rows) parse without
        # blowing up memory the way the original full-load approach did.
        wb = openpyxl.load_workbook(io.BytesIO(file_bytes), read_only=True, data_only=True)
        for name in wb.sheetnames:
            ws = wb[name]
            est_rows = _sheet_row_estimate(ws)
            row_iter = _iter_sheet_rows_streamed(ws)
            if est_rows > LARGE_SHEET_ROW_THRESHOLD:
                result = _parse_sheet_chunked(row_iter, name, use_ml=use_ml)
            else:
                rows = list(row_iter)
                result = _parse_sheet_rows(rows, name, use_ml=use_ml)
            sheet_results.append(result)
        wb.close()

    # Merge: generic sheets first, CenPeep sheet last (wins conflicts)
    merged_extracted = {}
    cenpeep_result = None
    for sr in sheet_results:
        if 'cenpeep' in sr['sheetName'].lower():
            cenpeep_result = sr
        else:
            merged_extracted.update(sr['extracted'])

    primary_sheet = sheet_results[0]['sheetName'] if sheet_results else ''
    if cenpeep_result:
        merged_extracted.update(cenpeep_result['extracted'])
        primary_sheet = cenpeep_result['sheetName']

    return {
        'sheetResults': sheet_results,
        'extracted': merged_extracted,
        'primarySheet': primary_sheet,
        'totalFields': len(merged_extracted),
        'parseTimeMs': round((time.time() - t_start) * 1000, 1),
    }


# ─── Route ────────────────────────────────────────────────────────────────────
ALLOWED_EXTS = {'.xlsx', '.xls'}


@upload_bp.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'ok': False, 'error': 'No file uploaded'}), 400

    f = request.files['file']
    if not f.filename:
        return jsonify({'ok': False, 'error': 'Empty filename'}), 400

    ext = '.' + f.filename.rsplit('.', 1)[-1].lower() if '.' in f.filename else ''
    if ext not in ALLOWED_EXTS:
        return jsonify({'ok': False, 'error': 'Only .xlsx / .xls files are accepted'}), 400

    try:
        file_bytes = f.read()
        result = parse_workbook(file_bytes, f.filename, use_ml=True)
        return jsonify({
            'ok': True,
            'filename': f.filename,
            'fileSizeMB': round(len(file_bytes) / (1024 * 1024), 2),
            **result,
            # Keep legacy fields for backward compat with existing frontend
            'sheetName': result['primarySheet'],
            'rawRows': result['sheetResults'][0]['rawRows'] if result['sheetResults'] else [],
        })
    except MemoryError:
        return jsonify({
            'ok': False,
            'error': 'File is too large to process even with chunked parsing. '
                     'Try splitting it into smaller sheets/files.',
        }), 413
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


@upload_bp.route('/retrain', methods=['POST'])
def retrain_model():
    """
    Retrains the ML field classifier from the current contents of
    ml/training_data.py and persists it to disk. Call this after editing
    training_data.py (adding new header phrasings, fixing a mislabeled
    example, etc.) so changes take effect without restarting the server.
    """
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
