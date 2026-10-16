# CENPEEP boiler efficiency calculator (Flask + React)

Tabs: CENPEEP · BS-2885 · **IS-13890** · ASME-PTC 4.1 · BEE · Summary · Sessions

## IS-13890 (heat-loss method) — what was added
| Piece | File |
|---|---|
| Field detection by the **trained ML model** (no colour logic) · rule safety-net · formula-cell skip · sanity ranges | `routes/upload_is13890.py` |
| `/api/upload` returns `extractedIS13890`, `missingFieldsIS13890`, `sheetNameIS13890`, `fieldDetailIS13890`, `legendIS13890`, `warningsIS13890` | `routes/upload.py` |
| ML training data (positives + `OUT_OF_SCOPE` negatives, conflict checker) | `ml/training_data_is13890.py` |
| Separate classifier + model file (`ml/field_classifier_is13890.pkl`, auto-retrained if stale) | `ml/field_classifier.py` |
| Calculation (cell-for-cell port of the workbook) | `src/lib/calc/is13890.js` |
| UI tab, route `#/is-13890`, navbar link, Summary card | `src/pages/Is13890.jsx`, `src/config/fields.is13890.js`, `App.jsx`, `Navbar.jsx`, `Summary.jsx` |

### Retraining the IS-13890 model
Edit `ml/training_data_is13890.py`, then `POST /api/upload/retrain` (or delete `ml/field_classifier_is13890.pkl`; it retrains on next use).

### Tests
```
python -m unittest discover -s tests -v      # detection, colours, gate, ML, id sync
node tests/is13890_calc.test.mjs             # JS calc == workbook cached results
```

### Rebuilding the frontend
`npm install && npm run build`, then copy `dist/assets/*` into `public/assets/` and point `public/index.html` at the new hashed file.
