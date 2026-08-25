# ════════════════════════════════════════════════════════════════════
# routes/upload_bs2885.py — BS-2885 (1974) field detection
#
# A plain, self-contained extraction module — NOT its own Flask route.
# Its one public function, extract_bs2885(file_bytes), is called from
# inside routes/upload.py's existing /api/upload handler (see the
# `_bs2885` block there) so CENPEEP, BEE, and BS-2885 all share the same
# upload endpoint and the same uploaded file. This module still doesn't
# share any state (dicts, helper functions) with upload.py's CENPEEP/BEE
# detection — it only contributes an extra key to that route's JSON
# response — so none of the existing CENPEEP/BEE detection logic is
# touched or risked.
#
# Detection strategy (deliberately simpler than CENPEEP/BEE's ML-based
# pipeline, since a BS-2885 test sheet has a fixed, well-known shape):
#   1. The official BS-2885 (1974) worksheet lists every input on its
#      own row, keyed by a "Sl. No." (Item NNN) in one column, with the
#      entered value a few columns over. We scan every sheet for cells
#      that hold one of our known item numbers, then read the nearest
#      numeric cell in that row as the value.
#   2. As a fallback (for a differently-laid-out upload), we also match
#      each row's label text against a short alias list per field.
# ════════════════════════════════════════════════════════════════════
import io
import re

try:
    import openpyxl
except ImportError:
    openpyxl = None

# ── Item catalog: BS-2885 "Sl. No." → (field id, label) ──────────────────────
# Keep in sync with FIELD_ROW_MAP in public/script1.js (same field ids,
# same "Item NNN" numbers straight from the standard).
ITEM_CATALOG = {
    203: ('bs203', 'Feedwater Quantity'),
    206: ('bs206', 'Feedwater Enthalpy'),
    211: ('bs211', 'Drum Water Enthalpy'),
    215: ('bs215', 'Drum Level — Rate of Increase'),
    216: ('bs216', 'Blow-down Rate'),
    217: ('bs217', 'Main Steam Spray Water Quantity'),
    220: ('bs220', 'Main Steam Spray Water Enthalpy'),
    221: ('bs221', 'Reheater-1 Spray Water Quantity'),
    224: ('bs224', 'Reheater-1 Spray Water Enthalpy'),
    225: ('bs225', 'Reheater-2 Spray Water Quantity'),
    228: ('bs228', 'Reheater-2 Spray Water Enthalpy'),
    246: ('bs246', 'Steam Leaving Unit — Enthalpy'),
    247: ('bs247', 'Reheater-1 Inlet Steam Quantity'),
    250: ('bs250', 'Reheater-1 Inlet Steam Enthalpy'),
    251: ('bs251', 'Reheater-1 Outlet Steam Quantity'),
    254: ('bs254', 'Reheater-1 Outlet Steam Enthalpy'),
    255: ('bs255', 'Reheater-2 Inlet Steam Quantity'),
    258: ('bs258', 'Reheater-2 Inlet Steam Enthalpy'),
    259: ('bs259', 'Reheater-2 Outlet Steam Quantity'),
    262: ('bs262', 'Reheater-2 Outlet Steam Enthalpy'),
    271: ('bs271', 'Moisture (Ultimate, As Fired)'),
    272: ('bs272', 'Ash (Ultimate, As Fired)'),
    273: ('bs273', 'Carbon (Ultimate, As Fired)'),
    274: ('bs274', 'Hydrogen (Ultimate, As Fired)'),
    275: ('bs275', 'Nitrogen (Ultimate, As Fired)'),
    276: ('bs276', 'Sulphur (Ultimate, As Fired)'),
    278: ('bs278', 'GCV of Coal — Gross'),
    279: ('bs279', 'GCV of Coal — Net'),
    280: ('bs280', 'Mechanical Stoker Firing Rate'),
    291: ('bs291', 'Pulverized Fuel — Total Weighed'),
    295: ('bs295', 'Pulverized Fuel — Mill Rejects (Total)'),
    301: ('bs301', 'Calorific Value of Mill Rejects — Gross'),
    323: ('bs323', 'Heat Expended in Drying Fuel'),
    325: ('bs325', 'Dryer Gas Analysis — CO2'),
    326: ('bs326', 'Dryer Gas Analysis — CO'),
    328: ('bs328', 'Ashpit Refuse Quantity'),
    329: ('bs329', 'Ashpit Refuse — % Combustible'),
    332: ('bs332', 'Moisture (Oil, Ultimate)'),
    333: ('bs333', 'Ash (Oil, Ultimate)'),
    334: ('bs334', 'Carbon (Oil, Ultimate)'),
    335: ('bs335', 'Hydrogen (Oil, Ultimate)'),
    336: ('bs336', 'Sulphur (Oil, Ultimate)'),
    343: ('bs343', 'Specific Heat of Oil'),
    344: ('bs344', 'GCV of Oil — Gross'),
    345: ('bs345', 'GCV of Oil — Net'),
    349: ('bs349', 'Oil Firing Rate'),
    350: ('bs350', 'Temperature of Oil as Weighed'),
    352: ('bs352', 'Temperature of Oil Delivered to Burner'),
    357: ('bs357', 'Atomizing Air/Steam Quantity'),
    360: ('bs360', 'Heat Used in Atomizing Oil'),
    362: ('bs362', 'Gas Firing Rate — Volume'),
    363: ('bs363', 'Gas Firing Rate — Mass'),
    390: ('bs390', 'GCV of Gas — Gross (Volume basis)'),
    391: ('bs391', 'GCV of Gas — Net (Volume basis)'),
    392: ('bs392', 'GCV of Gas — Gross (Mass basis)'),
    393: ('bs393', 'GCV of Gas — Net (Mass basis)'),
    397: ('bs397', 'Ambient Air Humidity'),
    398: ('bs398', 'Temperature at Entry to Air Intakes'),
    399: ('bs399', 'Moisture per Unit Mass of Dry Air'),
    427: ('bs427', 'Flue Gas Exit Temperature (LTAH/Economizer Outlet)'),
    450: ('bs450', 'Bottom Ash — Proportion of Fuel (Dry Basis)'),
    451: ('bs451', 'Bottom Ash — Combustible Content'),
    453: ('bs453', 'Bottom Ash — Temperature as Discharged'),
    454: ('bs454', 'Bottom Ash — Specific Heat'),
    460: ('bs460', 'Coarse Dust — Proportion of Fuel (Dry Basis)'),
    461: ('bs461', 'Coarse Dust — Combustible Content'),
    463: ('bs463', 'Coarse Dust — Temperature as Discharged'),
    464: ('bs464', 'Coarse Dust — Specific Heat'),
    466: ('bs466', 'Fine Dust (Fly Ash) — Proportion of Fuel (Dry Basis)'),
    467: ('bs467', 'Fine Dust (Fly Ash) — Combustible Content'),
    469: ('bs469', 'Fine Dust (Fly Ash) — Temperature as Discharged'),
    470: ('bs470', 'Fine Dust (Fly Ash) — Specific Heat'),
    472: ('bs472', 'Riddlings — Proportion of Fuel (Dry Basis)'),
    473: ('bs473', 'Riddlings — Combustible Content'),
    475: ('bs475', 'Hopper Water Inlet Temperature'),
    476: ('bs476', 'Hopper Water Inlet Quantity'),
    477: ('bs477', 'Hopper Water Outlet Temperature'),
    478: ('bs478', 'Hopper Water Outlet Quantity'),
    479: ('bs479', 'Quenching Spray Water Temperature'),
    480: ('bs480', 'Quenching Spray Water Quantity'),
    519: ('bs519', 'Heat Added from Separate External Air Source'),
    601: ('bs601', 'Calorific Value of Carbon'),
    701: ('bs701', 'CO in Flue Gases per Unit Mass of Fuel'),
    702: ('bs702', 'Calorific Value of CO'),
    704: ('bs704', 'Hydrocarbons in Flue Gases per Unit Mass of Fuel'),
    705: ('bs705', 'Calorific Value of Hydrocarbons'),
    708: ('bs708', 'Dry Flue Gases per Unit Mass of Fuel'),
    807: ('bs807', 'Combustion Air per Unit Mass of Fuel'),
    907: ('bs907', 'Loss in Heating Fuel up to Air Supply Temp'),
    909: ('bs909', 'Radiation & Convection Loss (Method B)'),
    910: ('bs910', 'Heat Equivalent of Auxiliary Power (Method B)'),
}

ALL_FIELD_IDS = [fid for (fid, _label) in ITEM_CATALOG.values()]


def _norm_label(text):
    return re.sub(r'[^a-z0-9]+', ' ', str(text).lower()).strip()


# Label keywords, built once from ITEM_CATALOG's own labels (lower-cased,
# stripped of punctuation) — used only as the fallback path when a sheet
# doesn't carry recognizable "Sl. No." values in any column.
LABEL_KEYWORDS = {
    item: _norm_label(label)
    for item, (fid, label) in ITEM_CATALOG.items()
}


def _to_num(val):
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return float(val)
    if isinstance(val, str):
        s = val.strip().replace(',', '')
        if s == '' or s.startswith('='):
            return None
        try:
            return float(s)
        except ValueError:
            return None
    return None


def _extract_from_sheet(ws):
    """Scan one worksheet, return {field_id: value} found on it.

    Uses ws.iter_rows(values_only=True) — openpyxl's fast bulk-read path —
    rather than per-cell ws.cell(row=, column=) lookups. The latter is a
    known slow pattern in read_only mode: on a workbook that also happens
    to contain large, unrelated sheets (e.g. thousands of rows of hourly
    logger data sitting alongside a filled-in test-sheet tab, which is
    common for real plant workbooks), doing it cell-by-cell can make a
    single upload take minutes instead of a fraction of a second.

    max_row is capped at 600 (comfortably above the official BS-2885
    worksheet's 523 rows) — a sheet with a BS-2885-style form on it will
    never need more, and this keeps a bad match against some large
    unrelated sheet in the same workbook cheap rather than a timeout.
    """
    found = {}

    max_row = min(ws.max_row or 0, 600)
    max_col = min(ws.max_column or 0, 20)
    if max_row == 0 or max_col == 0:
        return found

    rows = list(ws.iter_rows(min_row=1, max_row=max_row, min_col=1, max_col=max_col, values_only=True))
    total_fields = len(ITEM_CATALOG)

    # ── Pass 1: match by "Sl. No." (item number) in any column ────────────
    # A bare item-number match is weak evidence on its own — plenty of
    # unrelated sheets (chemical dosing logs, consumption tallies, running
    # totals, ...) contain plain numbers that happen to equal one of our
    # ~90 item numbers purely by coincidence, sometimes even alongside
    # innocent-looking repeated caption text that could pass a naive
    # "has a label" check. The one thing that's genuinely specific to the
    # real BS-2885 worksheet is that its "Sl. No." column strictly
    # INCREASES top-to-bottom (203, 206, 211, 215, ... all the way to
    # 910) — that's how the standard itself lays the form out, and it's
    # very unlikely for coincidental matches in an unrelated sheet to
    # reproduce that ordering. So: collect every (row position, item
    # number) sighting first, then keep only the ones that lie on the
    # longest non-decreasing run in row order — this both validates the
    # sheet AND quietly drops any stray coincidental hits even on a sheet
    # that's otherwise a real match.
    sightings = []  # (row_idx, item_no, fid, value)
    seen_fids = set()
    for row_idx, row in enumerate(rows):
        item_no = None
        item_col = None
        for c, cell in enumerate(row):
            if isinstance(cell, (int, float)) and not isinstance(cell, bool) and float(cell).is_integer() and int(cell) in ITEM_CATALOG:
                item_no = int(cell)
                item_col = c
                break
        if item_no is None:
            continue
        fid, _label = ITEM_CATALOG[item_no]
        if fid in seen_fids:
            continue  # first sighting wins if an item number appears twice
        seen_fids.add(fid)

        # Value: prefer the cell furthest right that parses as a plain
        # number (the sheet's own "Value" column is normally the last
        # populated column on the row; formula text in "Formula"/"Symbol"
        # columns won't parse as a number so it's naturally skipped).
        candidates = [n for n in (_to_num(row[c]) for c in range(item_col + 1, len(row))) if n is not None]
        if candidates:
            sightings.append((row_idx, item_no, fid, candidates[-1]))

    found = {}
    MIN_CORROBORATED_HITS = 12
    if len(sightings) >= MIN_CORROBORATED_HITS:
        item_seq = [s[1] for s in sightings]
        n = len(item_seq)
        # Longest non-decreasing subsequence (n is at most ~90, O(n^2) is fine).
        lengths = [1] * n
        prev = [-1] * n
        for i in range(n):
            for j in range(i):
                if item_seq[j] <= item_seq[i] and lengths[j] + 1 > lengths[i]:
                    lengths[i] = lengths[j] + 1
                    prev[i] = j
        end = max(range(n), key=lambda i: lengths[i]) if n else -1
        kept_indices = set()
        while end != -1:
            kept_indices.add(end)
            end = prev[end]

        if len(kept_indices) >= MIN_CORROBORATED_HITS:
            for i in kept_indices:
                _row_idx, _item_no, fid, value = sightings[i]
                found[fid] = value

    if len(found) == total_fields:
        return found

    # ── Pass 2: label-text fallback for anything Pass 1 didn't find ───────
    # Only worth attempting on sheets that actually look like a label/value
    # FORM (few columns, one label per row) rather than a wide tabular data
    # dump (many numeric columns, one header row) — the latter is what
    # CENPEEP/BEE hourly-parameter logs look like, and scanning every one
    # of their rows against 80+ label keywords adds real cost for a match
    # that essentially never fires (their row labels are timestamps/hour
    # numbers, not BS-2885 particulars). A quick heuristic: a genuine
    # label/value form has at most a handful of numeric columns per row.
    numeric_cols_seen = max((sum(1 for c in row if isinstance(c, (int, float))) for row in rows[:30]), default=0)
    if numeric_cols_seen > 8:
        return found

    remaining_items = {n: kw for n, kw in LABEL_KEYWORDS.items() if ITEM_CATALOG[n][0] not in found}
    for row in rows:
        if not remaining_items:
            break
        label_cell = None
        label_col = None
        for c, cell in enumerate(row):
            if isinstance(cell, str) and len(cell.strip()) > 3:
                label_cell = cell
                label_col = c
                break
        if not label_cell:
            continue
        norm = _norm_label(label_cell)
        matched_item = None
        for item_no, keywords in remaining_items.items():
            if keywords and keywords in norm:
                matched_item = item_no
                break
        if matched_item is not None:
            fid, _label = ITEM_CATALOG[matched_item]
            # Skip any cell holding the "Sl. No." item number itself (it can
            # sit before OR after the label cell depending on layout) so a
            # blank value cell can never be misread as the item number.
            nums = [
                n for c, cell in enumerate(row)
                if c != label_col and not (
                    isinstance(cell, (int, float)) and not isinstance(cell, bool)
                    and float(cell).is_integer() and int(cell) == matched_item
                )
                for n in (_to_num(cell),) if n is not None
            ]
            if nums:
                found[fid] = nums[-1]
                del remaining_items[matched_item]

    return found


# ── Method B (heat-loss / indirect method) fallback ───────────────────
# The official BS-2885 "Sl. No." grid above (Passes 1–2) only matches
# workbooks laid out as the standard's own Method A (heat-balance) form.
# Plenty of real plant workbooks instead run their own heat-loss-method
# efficiency calc — dry flue gas loss, H2/moisture losses, radiation
# loss, etc. — as a plain "Parameter | Symbol | UoM | Value..." table.
# Same underlying BS-2885 quantities, different sheet shape, and no
# item numbers to key off at all, so it needs its own row-label match
# against the subset of ITEM_CATALOG fields Method B actually carries.
#
# Real plant sheets don't all spell a row the same way ("Total
# Moisture" vs "Moisture (Proximate)" vs "Moisture, Total"), so each
# field below carries a list of alias phrases rather than one fixed
# string, plus a symbol-column alias (TM, GCV, C, H2 ...) as a second,
# independent way to hit the same field when the label wording is one
# we haven't seen. A short-label field (e.g. "Ash", "Carbon") also
# carries an EXCLUDE list — words that, if present anywhere in that
# same row's label, veto the match — so "Ash" doesn't also grab "Bottom
# Ash" / "Fly ash", and "Carbon" doesn't grab "Carbon dioxide at APH
# O/L". Matching itself is substring-based (normalized, whitespace/
# punctuation-insensitive) rather than exact-equality, specifically so
# trailing units, footnotes, or extra qualifying words on a label don't
# break the match — the exclude list is what keeps that loose enough
# without also picking up the wrong row.
METHODB_ALIASES = {
    271: (['total moisture', 'moisture proximate', 'moisture ultimate', 'moisture total', 'moisture'], []),
    272: (['ash'], ['bottom', 'fly', 'coarse', 'pit', 'dust', 'riddling']),
    273: (['carbon'], ['dioxide', 'monoxide', 'fixed']),
    274: (['hydrogen'], []),
    275: (['nitrogen'], ['aph', 'inlet', 'outlet', 'i l', 'o l']),
    276: (['sulphur', 'sulfur'], []),
    278: (['gross calorific value', 'gcv gross', 'gcv as fired'], ['net']),
    279: (['net calorific value', 'ncv'], []),
    397: (['ambient air humidity', 'relative humidity', 'air humidity'], []),
    398: (['air temp at aph i l', 'ambient air temperature', 'design air temperature',
           'air temperature at entry', 'air temp at entry'], ['outlet', 'o l']),
    427: (['corrected aph o l temp to design ambient', 'flue gas exit temperature',
           'flue gas exit temp', 'aph outlet temperature'], []),
    708: (['mass of dry flue gas', 'dry flue gas per kg', 'dry flue gas mass',
           'dry flue gases per unit mass'], []),
    807: (['actual mass of air supplied', 'combustion air per unit mass',
           'mass of air supplied'], ['theoretical']),
    909: (['radiation unaccounted loss', 'radiation loss', 'radiation convection loss',
           'radiation surface loss'], []),
    910: (['heat equivalent of auxiliary power', 'auxiliary power loss'], []),
}
METHODB_SYMBOLS = {
    271: ['tm'], 272: ['a'], 273: ['c'], 274: ['h2'], 275: ['n2'],
    276: ['s'], 278: ['gcv'], 279: ['ncv'],
}
METHODB_ITEM_NOS = set(METHODB_ALIASES)


def _methodb_match(norm_label, norm_symbol, remaining):
    """Return the item number `norm_label` (plus its neighbouring
    symbol cell, if any) matches among `remaining`, or None."""
    for item_no, (aliases, excludes) in remaining.items():
        if norm_symbol and norm_symbol in METHODB_SYMBOLS.get(item_no, []):
            return item_no
        for alias in aliases:
            if alias in norm_label:
                if any(bad in norm_label for bad in excludes):
                    continue
                return item_no
    return None


def _extract_methodb_from_sheet(ws):
    """Scan one worksheet for a 'Parameter | Symbol | UoM | Value...'
    Method B table. Same row cap and 'is this a form, not a wide data
    dump' guard as Pass 2 above, for the same reason: without it, every
    wide hourly-logger sheet in the same workbook gets scanned row-by-
    row against these labels for nothing.
    """
    found = {}
    max_row = min(ws.max_row or 0, 600)
    max_col = min(ws.max_column or 0, 20)
    if max_row == 0 or max_col == 0:
        return found

    rows = list(ws.iter_rows(min_row=1, max_row=max_row, min_col=1, max_col=max_col, values_only=True))

    numeric_cols_seen = max((sum(1 for c in row if isinstance(c, (int, float))) for row in rows[:30]), default=0)
    if numeric_cols_seen > 8:
        return found

    remaining = dict(METHODB_ALIASES)
    for row in rows:
        if not remaining:
            break
        label_cell = None
        label_col = None
        for c, cell in enumerate(row):
            if isinstance(cell, str) and len(cell.strip()) > 1:
                label_cell = cell
                label_col = c
                break
        if not label_cell:
            continue
        norm = _norm_label(label_cell)
        symbol_norm = None
        if label_col + 1 < len(row) and isinstance(row[label_col + 1], str):
            symbol_norm = _norm_label(row[label_col + 1])

        matched_item = _methodb_match(norm, symbol_norm, remaining)
        if matched_item is None:
            continue

        fid, _label = ITEM_CATALOG[matched_item]
        # First numeric cell strictly after the label — on this layout
        # that's the Symbol/UoM columns (text, skipped automatically)
        # then the first data column (the baseline/primary value).
        nums = [n for n in (_to_num(cell) for cell in row[label_col + 1:]) if n is not None]
        if nums:
            found[fid] = nums[0]
            del remaining[matched_item]

    return found


def extract_bs2885(file_bytes):
    """
    Given the raw bytes of an uploaded workbook, return:
        { 'extracted': {field_id: value, ...},
          'missingFields': [{'id':..., 'label':...}, ...],
          'sheetName': <matching sheet name(s) or None>,
          'fieldDetail': {field_id: {label, item, header, source}, ...} }
    Never raises for a workbook that simply doesn't contain BS-2885 data —
    it just returns an empty extraction in that case. Only genuinely
    unreadable files raise, and the caller (routes/upload.py) already
    wraps this in its own try/except so a BS-2885 detection problem can
    never break the CENPEEP/BEE parts of the same upload response.

    Tries the official Method A ("Sl. No." grid) layout first, on each
    sheet, and keeps whichever single sheet matches the most fields —
    a real BS-2885 form is self-contained on one sheet, so Method A
    stays a single-sheet, single-method match exactly as before.

    If that doesn't find every field, falls back to the Method B
    (heat-loss-method) label-based scan for whatever's still missing —
    scanning EVERY sheet and merging (union) what each contributes,
    since a plant's own heat-loss workbook commonly spreads inputs
    across more than one tab (e.g. coal analysis on one sheet, flue-gas
    and loss figures on another). Method A's result always wins where
    both would otherwise supply the same field.

    'fieldDetail' is additive bookkeeping only — every item in
    ITEM_CATALOG (detected or not), with which sheet it was matched on
    and which pass matched it ('grid' for the Method A Sl.-No. grid,
    'label' for the Method B alias/symbol scan; None for a field that
    wasn't found on any sheet). It doesn't change 'extracted',
    'missingFields', or 'sheetName' in any way — it exists purely so a
    report (routes/report.py) can show a Field/Detected-From/Method/
    Value table for BS-2885, the same way it already does for CENPEEP.
    """
    if openpyxl is None:
        return {'extracted': {}, 'missingFields': [], 'sheetName': None, 'fieldDetail': {}}

    wb = openpyxl.load_workbook(io.BytesIO(file_bytes), data_only=True, read_only=True)

    best_extracted = {}
    best_sheet = None
    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        extracted = _extract_from_sheet(ws)
        if len(extracted) > len(best_extracted):
            best_extracted = extracted
            best_sheet = sheet_name

    matched_sheets = [best_sheet] if best_sheet else []

    # field_source tracks, per detected field id, which sheet and which
    # pass (grid / label) supplied it — used only to build 'fieldDetail'.
    field_source = {}
    if best_sheet:
        for fid in best_extracted:
            field_source[fid] = {'sheet': best_sheet, 'method': 'grid'}

    if len(best_extracted) < len(ITEM_CATALOG):
        for sheet_name in wb.sheetnames:
            ws = wb[sheet_name]
            methodb_found = _extract_methodb_from_sheet(ws)
            new_fields = {fid: v for fid, v in methodb_found.items() if fid not in best_extracted}
            if new_fields:
                best_extracted.update(new_fields)
                matched_sheets.append(sheet_name)
                for fid in new_fields:
                    field_source[fid] = {'sheet': sheet_name, 'method': 'label'}

    missing_fields = [
        {'id': fid, 'label': label}
        for item_no, (fid, label) in sorted(ITEM_CATALOG.items())
        if fid not in best_extracted
    ]

    field_detail = {}
    for item_no, (fid, label) in sorted(ITEM_CATALOG.items()):
        src = field_source.get(fid)
        field_detail[fid] = {
            'label': label,
            'item': item_no,
            'header': src['sheet'] if src else None,
            'source': src['method'] if src else None,
        }

    return {
        'extracted': best_extracted,
        'missingFields': missing_fields,
        'sheetName': ', '.join(dict.fromkeys(matched_sheets)) if matched_sheets else None,
        'fieldDetail': field_detail,
    }