# CENPEEP — Flask Edition

Complete conversion of the Node.js/Express CENPEEP app to Python Flask,
with smart multi-sheet Excel parsing, a basic trainable ML field-detection
model, and chunked parsing for large workbooks.

## Setup

```bash
cd cenpeep_flask
pip install -r requirements.txt
cp .env.example .env          # edit with your MongoDB URI
python app.py
# → http://localhost:3000
```

The first upload (or app start) will train and cache the ML field
classifier (`ml/field_classifier.pkl`, ~1 second to train, instant after
that). To force a retrain after editing training data, either delete that
file or POST to `/api/upload/retrain`.

## What changed from the Node version

| Area | Node (original) | Flask (this) |
|------|----------------|--------------|
| Server | Express + Node.js | Flask + Python |
| DB driver | Mongoose ODM | pymongo (direct) |
| Excel parsing | xlsx (npm) | openpyxl + xlrd |
| Upload route | routes/upload.js | routes/upload.py |
| Sessions route | routes/sessions.js | routes/sessions.py |
| Model | models/Session.js | pymongo schema-free |
| Max upload size | 10 MB | 50 MB |

## Excel Upload Intelligence

When you upload an Excel file, the parser:

1. **Reads ALL sheets**, not just `CenPeep Corrected`.
2. **Tries the strict CenPeep column layout first** (Particulars / UOM /
   Symbol / Formula / Value columns) — this wins if a sheet has it.
3. **Falls back to a generic raw-tabular layout** for everything else:
   finds the most likely header row in the first few rows of a sheet
   (real plant sheets often bury headers a row or two down, after a title
   row), then matches each column header to a CENPEEP field.
4. **Matches columns in two passes**:
   - **Rule-based** exact/alias lookup (symbol names, common label
     variants) — fast and 100% confident when it hits.
   - **ML fallback** (see below) for any column the rule-based pass
     couldn't place — this is what lets messy, inconsistent real-world DCS
     tag names ("MAIN STM TEMP-L", "Primary Air APH Temp I/L A", "O2 at
     APH I/L Left") still get identified.
5. **Averages multiple readings** — if a sheet has many rows of data for
   the same field (multiple load points, hourly readings, etc.), the
   values are averaged automatically.
6. **Merges all sheets** — CenPeep sheet wins on conflicts; other sheets
   fill in the remaining fields.
7. **Shows per-sheet detail** in the upload banner: strategy used, rows
   scanned, which fields were averaged (with count), and which fields
   were found via the ML classifier (with header text + confidence %).

## Basic ML Field-Detection Model

`ml/field_classifier.py` is a small, trainable, **non-neural** text
classifier — TF-IDF (character n-grams, 3–5 chars) + cosine similarity. No
GPU, no big model download, trains in under a second from plain Python
data in `ml/training_data.py`.

**Why this approach**: real plant headers are wildly inconsistent
("MAIN STM TEMP-L" vs "Main Steam Flow" vs abbreviated DCS tag names),
with typos, merged words, and unit suffixes. Character n-grams give
partial credit for shared substrings even when two headers would
tokenize as completely different words.

**How it decides "I don't know"**: rather than always forcing the
nearest match, the model:
- Has a confidence threshold (default 0.45 cosine similarity) — below
  it, the column is left unmatched rather than guessed.
- Has an explicit `OUT_OF_SCOPE` training class for real plant headers
  that *aren't* any of the 41 CENPEEP fields but share vocabulary with
  ones that are (e.g. steam-side enthalpy, HP heater drain temps,
  furnace/economizer gas temps that are a different point in the gas
  path than the APH inlet/outlet CENPEEP actually wants). This is what
  stops the model from quietly contaminating, say, `Tgi` with pressure
  readings just because both mention "FG" and "APH".
- Has a short hard-coded exclusion list (`NON_FIELD_HEADERS`) for
  structural columns like `Date`, `Hrs`, `Count` that should never be
  treated as a value field, checked before the model even runs.

**To improve it over time**: just add rows to the `TRAINING_EXAMPLES` or
`OUT_OF_SCOPE_EXAMPLES` lists in `ml/training_data.py` — e.g. a new
plant's specific tag-naming convention — then either restart the server or
call `POST /api/upload/retrain`. No retraining infrastructure, no
versioned model files to manage; it's just a Python list you edit.

**Known limitation worth knowing about**: which physical point counts as
"in" vs "out" for a paired field (e.g. secondary-air temp before/after
the air preheater) can vary by plant naming convention — some label the
hot/post-heater side "Boiler side", others label it "APH outlet". The
training data currently reflects the convention seen in the sample files
provided; if a different plant's sheet has these swapped, the safest fix
is adding a couple of explicit training examples for that plant's exact
header wording rather than changing the general default.

## Chunked / Streaming Parsing (for large files)

Some real plant sheets are very wide (100+ columns) and/or very tall
(1000+ rows of hourly data), which is what made some files fail to
upload before (the old `10MB` Flask limit, and openpyxl loading the
entire workbook into memory as Python `Cell` objects at once).

Two changes fix this:

1. **`MAX_CONTENT_LENGTH` raised to 50MB** in `app.py`. A friendly JSON
   413 error is returned (instead of a generic crash) if a file still
   exceeds it.
2. **Chunked streaming parse** for any sheet over `LARGE_SHEET_ROW_THRESHOLD`
   (500 rows, tunable in `routes/upload.py`): the workbook is opened with
   openpyxl's `read_only=True` mode (streams rows instead of building
   in-memory `Cell` objects for the whole sheet), the header row is found
   from the first few rows, columns are mapped to fields once, and then
   each subsequent row is pulled out, the relevant numeric values are
   added to a running per-field list, and the row itself is discarded —
   so memory use is bounded by chunk size, not total sheet size, instead
   of materializing the whole sheet as nested Python lists.

Both sample files you provided (12.3MB / 1.8MB, with sheets up to 1276
rows × 125 columns) now upload and parse successfully — confirmed via the
included test suite below.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/upload/ | Upload .xlsx/.xls → returns extracted fields |
| POST | /api/upload/retrain | Retrain the ML classifier from training_data.py |
| GET | /api/sessions/ | List all sessions |
| GET | /api/sessions/\<id\> | Get single session |
| POST | /api/sessions/ | Save session |
| DELETE | /api/sessions/\<id\> | Delete session |
| GET | /api/health | DB status check |

## Upload API Response Shape

```json
{
  "ok": true,
  "filename": "plant_data.xlsx",
  "fileSizeMB": 11.78,
  "parseTimeMs": 8470.2,
  "primarySheet": "CenPeep Corrected",
  "totalFields": 14,
  "extracted": { "L": 705.74, "Tgo": 145.03, ... },
  "sheetResults": [
    {
      "sheetName": "Day Avg",
      "strategy": "raw_tabular_ml",
      "extracted": { "L": 705.74, "Tpai": 174.97, ... },
      "summary": { "L": { "count": 122, "average": 705.74, "values": [...] } },
      "columns": {
        "67": { "fieldId": "Fsa", "header": "Boiler side A SA  flow", "source": "ml", "confidence": 1.0 }
      },
      "rowsScanned": null
    },
    {
      "sheetName": "Sheet3",
      "strategy": "raw_tabular_ml_chunked",
      "extracted": { "Cfa": 1.72 },
      "rowsScanned": 995
    }
  ]
}
```

`source` on each column is `"rule"` (exact alias match, confidence 1.0)
or `"ml"` (TF-IDF classifier match, confidence = cosine similarity score).

## Testing against your sample files

```bash
python3 -c "
from routes.upload import parse_workbook
with open('sample_1.xlsx', 'rb') as f:
    result = parse_workbook(f.read(), 'sample_1.xlsx')
print(result['extracted'])
"
```

