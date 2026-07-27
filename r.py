"""
generate_model_report.py — CENPEEP field-detection model report generator
============================================================================
One-off script: runs the SAME parsing/detection pipeline used by
routes/upload.py against a real Excel file, with full decision tracing
turned on (which stage matched each column, why, with what confidence,
against which training phrase), and writes a Word document explaining:

  1. What model is actually being used (plain language + the technical name)
  2. The decision pipeline, stage by stage
  3. How multi-reading averaging works
  4. A worked example against the file you point it at — a real column-by-
     column decision trace, so a colleague can see exactly why each field
     was (or wasn't) picked up.

USAGE
-----
    python generate_model_report.py path/to/your_workbook.xlsx

Produces "Model_Decision_Report.docx" in the same folder as this script.

This is a reporting/documentation tool, not part of the running app —
nothing here is imported by app.py or routes/upload.py. Once you've
generated the report you want, you can leave this file in the repo (it
does nothing unless run directly) or just stop running it. The bottom of
the file has a single guarded entry point:

    if __name__ == "__main__":
        main()

Comment out the body of main() (or the call inside it) if you want to keep
the file around purely for reference without ever re-running it.
"""

import sys
import os
import io
import statistics

import openpyxl

# Reuse the REAL production internals so this report reflects exactly what
# the running app does — not a re-description of it.
from routes.upload import (
    _is_readable_worksheet,
    _find_header_row,
    _label_to_field,
    _sym_to_field,
    _to_num,
    _parse_cenpeep_layout,
    HEADER_SCAN_ROWS,
    SYM_MAP,
    LABEL_ALIASES,
)
from ml.training_data import (
    get_training_data,
    get_field_ids,
    is_non_field_header,
    TRAINING_EXAMPLES,
    OUT_OF_SCOPE_EXAMPLES,
    NON_FIELD_HEADERS,
)
from ml.field_classifier import get_classifier, DEFAULT_CONFIDENCE_THRESHOLD


# ── Step 1: run the pipeline with full tracing ──────────────────────────────
def trace_workbook(path):
    """
    Same job as routes.upload.parse_workbook(), but every column's decision
    is recorded (not just the final extracted values), for reporting.
    """
    filename = os.path.basename(path)
    with open(path, "rb") as f:
        file_bytes = f.read()

    wb = openpyxl.load_workbook(io.BytesIO(file_bytes), read_only=True, data_only=True)
    clf = get_classifier()

    sheet_traces = []
    for name in wb.sheetnames:
        ws = wb[name]
        if not _is_readable_worksheet(ws):
            sheet_traces.append({
                "sheetName": name,
                "skipped": True,
                "reason": "Not a data worksheet (e.g. a chart sheet) — no rows to read.",
                "columns": [],
            })
            continue

        rows = [list(r) for r in ws.iter_rows(values_only=True)]

        # Strategy 1: strict CenPeep column layout — check first, same
        # priority as production.
        ext1, raw1 = _parse_cenpeep_layout(rows)
        if len(ext1) >= 5:
            sheet_traces.append({
                "sheetName": name,
                "skipped": False,
                "strategy": "cenpeep_column",
                "columns": [
                    {
                        "header": r["particulars"] or r["symbol"],
                        "decision": "matched",
                        "method": "cenpeep_column_layout",
                        "fieldId": _sym_to_field(r["symbol"]),
                        "confidence": 1.0,
                        "matchedPhrase": None,
                        "readings": 1,
                        "average": r["value"],
                    }
                    for r in raw1
                ],
            })
            continue

        # Strategy 2: raw tabular layout — find header row, trace every column.
        sample = rows[:HEADER_SCAN_ROWS]
        header_row_idx = _find_header_row(sample)
        if header_row_idx is None:
            sheet_traces.append({
                "sheetName": name, "skipped": True,
                "reason": "No header row could be identified in the first "
                          f"{HEADER_SCAN_ROWS} rows.",
                "columns": [],
            })
            continue

        headers = rows[header_row_idx]
        data_rows = rows[header_row_idx + 1:]

        col_traces = []
        unmatched_idx, unmatched_text = [], []

        for col_idx, hdr in enumerate(headers):
            if hdr is None or not str(hdr).strip():
                continue
            if is_non_field_header(hdr):
                col_traces.append({
                    "header": str(hdr), "decision": "excluded",
                    "method": "structural_header_list",
                    "fieldId": None, "confidence": None, "matchedPhrase": None,
                })
                continue

            fid = _label_to_field(str(hdr))
            if fid:
                col_traces.append({
                    "header": str(hdr), "decision": "matched",
                    "method": "rule_based_alias", "fieldId": fid,
                    "confidence": 1.0, "matchedPhrase": None,
                    "colIdx": col_idx,
                })
            else:
                unmatched_idx.append(col_idx)
                unmatched_text.append(str(hdr))
                col_traces.append({
                    "header": str(hdr), "decision": "pending_ml",
                    "method": None, "fieldId": None, "confidence": None,
                    "matchedPhrase": None, "colIdx": col_idx,
                })

        if unmatched_text:
            preds = clf.predict_batch(unmatched_text, threshold=DEFAULT_CONFIDENCE_THRESHOLD)
            pred_by_text = dict(zip(unmatched_text, preds))
            for ct in col_traces:
                if ct["decision"] != "pending_ml":
                    continue
                fid, score, matched_example = pred_by_text[ct["header"]]
                if fid:
                    ct.update(decision="matched", method="ml_tfidf_cosine",
                              fieldId=fid, confidence=round(score, 3),
                              matchedPhrase=matched_example)
                elif matched_example is not None:
                    ct.update(decision="rejected_out_of_scope", method="ml_tfidf_cosine",
                              confidence=round(score, 3), matchedPhrase=matched_example)
                else:
                    ct.update(decision="rejected_low_confidence", method="ml_tfidf_cosine",
                              confidence=round(score, 3))

        # Accumulate values + averages per matched field, same as production.
        field_values = {}
        for ct in col_traces:
            if ct["decision"] != "matched":
                continue
            fid, col_idx = ct["fieldId"], ct["colIdx"]
            vals = []
            for row in data_rows:
                v = row[col_idx] if col_idx < len(row) else None
                num = _to_num(v)
                if num is not None:
                    vals.append(num)
            ct["readings"] = len(vals)
            ct["average"] = round(statistics.mean(vals), 4) if vals else None
            if not vals:
                ct["decision"] = "matched_but_no_numeric_data"

        sheet_traces.append({
            "sheetName": name, "skipped": False,
            "strategy": "raw_tabular_ml", "columns": col_traces,
        })

    wb.close()
    return {"filename": filename, "sheets": sheet_traces}


# ── Step 2: build the Word document ─────────────────────────────────────────
def build_report(trace, output_path):
    from docx import Document
    from docx.shared import Pt, Inches, RGBColor
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    from docx.enum.table import WD_TABLE_ALIGNMENT
    from docx.oxml.ns import qn

    doc = Document()

    # -- base style
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(10.5)

    def shade_cell(cell, hex_color):
        tcPr = cell._tc.get_or_add_tcPr()
        shd = tcPr.makeelement(qn("w:shd"), {
            qn("w:val"): "clear", qn("w:color"): "auto", qn("w:fill"): hex_color,
        })
        tcPr.append(shd)

    # ── Title ────────────────────────────────────────────────────────────
    title = doc.add_heading("CENPEEP Field-Detection Model", level=0)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub = doc.add_paragraph("How automatic column-to-field detection works, and a worked example")
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub.runs[0].italic = True
    sub.runs[0].font.size = Pt(12)
    doc.add_paragraph()

    # ── 1. What model is this ───────────────────────────────────────────
    doc.add_heading("1. What model are we using?", level=1)
    doc.add_paragraph(
        "This is a classic (non-deep-learning) text-classification model, not a neural "
        "network and not an LLM. Concretely, it's a TF-IDF vectorizer over character "
        "n-grams, paired with cosine-similarity nearest-neighbour matching — implemented "
        "with scikit-learn's TfidfVectorizer and cosine_similarity."
    )
    p = doc.add_paragraph()
    p.add_run("In plain terms: ").bold = True
    p.add_run(
        "the model has a library of known header phrasings for each CENPEEP field "
        "(e.g. \"Steam Flow\", \"FW Flow\", \"MAIN STEAM Flow\" all mean the Ffw field). "
        "When it sees a new, unfamiliar column header, it breaks the text into small "
        "overlapping chunks of letters (3-5 characters, so it can handle abbreviations, "
        "merged words and typos), does the same to every phrase in its library, and finds "
        "the closest match by similarity. If nothing is close enough, it says \"I don't "
        "know\" instead of guessing."
    )
    doc.add_paragraph(
        "This approach was chosen over a deep-learning model deliberately: it trains in "
        "well under a second, needs no GPU, and — most importantly — is easy for a human "
        "to extend. Adding support for a new plant's header wording is a one-line addition "
        "to a training-data file, not a retraining pipeline."
    )

    # ── 2. Decision pipeline ────────────────────────────────────────────
    doc.add_heading("2. The decision pipeline", level=1)
    doc.add_paragraph(
        "Every column header goes through the same four-stage pipeline, in this order. "
        "Each stage can either resolve the column or hand it to the next stage:"
    )

    stages = [
        ("Stage 0 — Structural exclusion",
         f"Headers that are clearly not data fields (Date, Sr No, Time, Remarks, Shift, "
         f"etc. — {len(NON_FIELD_HEADERS)} known variants) are dropped immediately. "
         "No field is ever forced onto these."),
        ("Stage 1 — Rule-based exact match",
         f"The header is checked against a hand-built lookup: {len(SYM_MAP)} known "
         f"CENPEEP symbols (e.g. \"Ffw\", \"GCV\") and {len(LABEL_ALIASES)} known plain-"
         "English label variants. If it matches exactly (case/punctuation-insensitive), "
         "the field is assigned immediately with 100% confidence — no ML involved. This "
         "is the fast, deterministic path."),
        ("Stage 2 — ML fallback (TF-IDF + cosine similarity)",
         f"Anything Stage 1 couldn't place is scored against a labelled training set of "
         f"{len(TRAINING_EXAMPLES)} example header phrasings covering "
         f"{len(get_field_ids())} CENPEEP fields, plus {len(OUT_OF_SCOPE_EXAMPLES)} "
         "\"OUT_OF_SCOPE\" examples — real plant headers that look similar (share words "
         "like \"steam\", \"temp\", \"flow\") but are NOT one of the fields the app needs. "
         "The header is assigned the field of its closest match, with a similarity score "
         "(confidence) attached."),
        ("Stage 3 — Confidence gate",
         f"A match is only accepted if its similarity score is at least "
         f"{DEFAULT_CONFIDENCE_THRESHOLD} (on a 0–1 scale), AND the closest match isn't "
         "itself an OUT_OF_SCOPE example. Below that, or if the nearest neighbour is "
         "OUT_OF_SCOPE, the column is left unmapped rather than guessed."),
    ]
    for name, desc in stages:
        h = doc.add_paragraph()
        h.add_run(name).bold = True
        doc.add_paragraph(desc)

    # ── 3. Averaging ─────────────────────────────────────────────────────
    doc.add_heading("3. Multiple readings → automatic averaging", level=1)
    doc.add_paragraph(
        "Once a column is mapped to a field, every numeric value in that column (across "
        "all data rows in that sheet — e.g. hourly readings for a month) is collected. "
        "The field's final value is the plain arithmetic mean of all collected readings. "
        "Non-numeric or blank cells (including sensor-fault strings like "
        "\"No Good Data For Calculation\") are ignored rather than treated as zero."
    )
    doc.add_paragraph(
        "Large sheets (more than 500 rows) are streamed and processed in fixed-size "
        "chunks rather than being loaded fully into memory, so the same averaging logic "
        "works the same way regardless of file size."
    )

    # ── 4. Worked example ───────────────────────────────────────────────
    doc.add_heading(f"4. Worked example: {trace['filename']}", level=1)
    doc.add_paragraph(
        "The table below is the actual, live decision trace produced by running this "
        "file through the pipeline above — not a simulated example."
    )

    total_cols = matched = rejected = excluded = 0
    for sh in trace["sheets"]:
        for c in sh["columns"]:
            total_cols += 1
            if c["decision"] in ("matched", "matched_but_no_numeric_data"):
                matched += 1
            elif c["decision"] == "excluded":
                excluded += 1
            elif c["decision"].startswith("rejected"):
                rejected += 1

    summary = doc.add_paragraph()
    summary.add_run(
        f"Sheets scanned: {len(trace['sheets'])}   |   "
        f"Columns considered: {total_cols}   |   "
        f"Mapped to a field: {matched}   |   "
        f"Structural/excluded: {excluded}   |   "
        f"Seen but rejected (low confidence / out-of-scope): {rejected}"
    ).italic = True

    for sh in trace["sheets"]:
        doc.add_heading(f"Sheet: {sh['sheetName']}", level=2)
        if sh.get("skipped"):
            doc.add_paragraph(f"Skipped — {sh['reason']}")
            continue
        if not sh["columns"]:
            doc.add_paragraph("No fields detected in this sheet.")
            continue

        table = doc.add_table(rows=1, cols=7)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.style = "Light Grid Accent 1"
        hdr_cells = table.rows[0].cells
        for i, txt in enumerate(["Column Header", "Decision", "Method", "Field", "Confidence",
                                  "Matched Against", "Avg (readings)"]):
            hdr_cells[i].text = txt
            hdr_cells[i].paragraphs[0].runs[0].bold = True

        decision_colors = {
            "matched": "D9EAD3",
            "matched_but_no_numeric_data": "FFF2CC",
            "excluded": "F3F3F3",
            "rejected_out_of_scope": "F4CCCC",
            "rejected_low_confidence": "FCE5CD",
        }

        for c in sh["columns"]:
            row = table.add_row().cells
            row[0].text = str(c["header"])[:60]
            row[1].text = c["decision"].replace("_", " ")
            row[2].text = (c.get("method") or "—").replace("_", " ")
            row[3].text = c.get("fieldId") or "—"
            row[4].text = f"{c['confidence']:.2f}" if c.get("confidence") is not None else "—"
            # For rule-based matches there's no "closest training phrase" —
            # the header matched a hand-built alias/symbol exactly, so show
            # that instead of leaving it blank. For ML matches, this is the
            # actual training-set example whose similarity score won/lost
            # the confidence gate — i.e. exactly what the header was
            # compared against to reach this decision.
            if c.get("method") == "rule_based_alias":
                row[5].text = "exact alias/symbol lookup"
            elif c.get("matchedPhrase"):
                row[5].text = str(c["matchedPhrase"])[:60]
            else:
                row[5].text = "—"
            if c.get("readings") is not None and c.get("average") is not None:
                row[6].text = f"{c['average']:.3g}  (n={c['readings']})"
            else:
                row[6].text = "—"
            fill = decision_colors.get(c["decision"], "FFFFFF")
            for cell in row:
                shade_cell(cell, fill)
        doc.add_paragraph()

    # ── 5. Legend ────────────────────────────────────────────────────────
    doc.add_heading("5. How to read the decision column", level=1)
    p = doc.add_paragraph()
    p.add_run("Matched Against: ").bold = True
    p.add_run(
        "for rule-based matches, the header hit a hand-built alias/symbol exactly, "
        "no comparison needed. For ML matches (and out-of-scope/low-confidence "
        "rejections), this is the specific training-set example the header was "
        "closest to — i.e. the actual phrase whose similarity score produced the "
        "confidence value shown. If a header should have matched but didn't, or "
        "matched something it shouldn't have, this column tells you exactly which "
        "training example to add, fix, or move to OUT_OF_SCOPE."
    )
    legend = [
        ("matched", "Column was confidently mapped to a CENPEEP field and used."),
        ("matched_but_no_numeric_data", "Field was recognised, but every value in that "
         "column was blank/non-numeric (e.g. a faulty-sensor string), so nothing could "
         "be averaged."),
        ("excluded", "Recognised as a structural column (Date, Time, Sr No, ...) and "
         "intentionally skipped."),
        ("rejected_out_of_scope", "The model recognised the vocabulary as boiler/plant "
         "language, but matched it to a header that is explicitly NOT a CENPEEP field "
         "(e.g. a pressure or metal-temperature tag) — so it was correctly left unmapped."),
        ("rejected_low_confidence", "No close enough match was found in the training "
         "data at all; the column is unrecognised."),
    ]
    for name, desc in legend:
        p = doc.add_paragraph(style="List Bullet")
        p.add_run(f"{name}: ").bold = True
        p.add_run(desc)

    doc.save(output_path)


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_model_report.py path/to/workbook.xlsx")
        sys.exit(1)

    excel_path = sys.argv[1]
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Model_Decision_Report.docx")

    print(f"Tracing decisions for: {excel_path}")
    trace = trace_workbook(excel_path)

    print(f"Building report: {output_path}")
    build_report(trace, output_path)

    print("Done.")


if __name__ == "__main__":
    main()