"""
generate_model_report.py — CENPEEP selected-sheet field report
============================================================================
One-off script: runs the SAME parsing/selection pipeline used by
routes/upload.py (routes.upload.parse_workbook) against a real Excel file,
and writes a Word document scoped to ONLY the sheet that was actually
selected for import — not a dump of every sheet/column in the workbook.

The report has exactly two things:
  1. A table of the fields that were pulled from the selected sheet —
     field id, what header text (or layout) it came from, whether it was
     a rule/exact match or an AI (ML) match, and the confidence.
  2. A "Fields Not Detected" list — required CENPEEP input fields that
     were not found anywhere in the workbook, so they still need to be
     entered manually.

No title page, no per-column reject/exclude audit trail, no methodology
sections, no summary counts, no legend — just the selected sheet's
decisions and what's missing.

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

# Reuse the REAL production pipeline so this report reflects exactly what
# the running app does — not a re-description of it. parse_workbook()
# already does the sheet SELECTION (most populated date rows wins, CenPeep
# column layout overrides), the rule/ML field mapping, and returns
# 'fieldDetail' (per-field: which sheet/header/method/confidence) and
# 'missingFields' (required fields not found anywhere) — this script just
# renders that straight into a document.
from routes.upload import parse_workbook, REQUIRED_FIELDS


# ── Step 1: run the real pipeline ───────────────────────────────────────────
def trace_workbook(path):
    """Runs parse_workbook() against a file on disk and returns its result
    dict plus the filename, ready for build_report()."""
    filename = os.path.basename(path)
    with open(path, "rb") as f:
        file_bytes = f.read()
    result = parse_workbook(file_bytes, filename, use_ml=True)
    result["filename"] = filename
    return result


# ── Step 2: build the Word document ─────────────────────────────────────────
def build_report(result, output_path):
    from docx import Document
    from docx.shared import Pt
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

    method_colors = {
        "cenpeep_column": "D9EAD3",
        "rule": "D9EAD3",
        "ml": "D6E4F0",
    }
    method_labels = {
        "cenpeep_column": "CenPeep layout (exact)",
        "rule": "Exact alias/symbol match",
        "ml": "AI (ML) match",
    }

    primary_sheet = result.get("primarySheet", "")
    field_detail = result.get("fieldDetail", {})
    missing_fields = result.get("missingFields", [])
    extracted = result.get("extracted", {})

    doc.add_heading(primary_sheet or "No sheet selected", level=2)

    if not field_detail:
        doc.add_paragraph("No fields could be detected on the selected sheet.")
    else:
        table = doc.add_table(rows=1, cols=5)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.style = "Light Grid Accent 1"
        hdr_cells = table.rows[0].cells
        for i, txt in enumerate(["Field", "Detected From", "Method", "Confidence", "Value"]):
            hdr_cells[i].text = txt
            hdr_cells[i].paragraphs[0].runs[0].bold = True

        for fid in sorted(field_detail.keys()):
            d = field_detail[fid]
            row = table.add_row().cells
            row[0].text = fid
            row[1].text = d.get("header") or "—"
            method = d.get("source", "rule")
            row[2].text = method_labels.get(method, method)
            conf = d.get("confidence")
            row[3].text = f"{conf:.2f}" if conf is not None else "—"
            val = extracted.get(fid)
            row[4].text = f"{val:.4g}" if isinstance(val, (int, float)) else str(val or "—")
            fill = method_colors.get(method, "FFFFFF")
            for cell in row:
                shade_cell(cell, fill)

    doc.add_paragraph()
    doc.add_heading("Fields Not Detected", level=2)
    if missing_fields:
        doc.add_paragraph(
            "The following required CENPEEP input fields were not found on "
            "any sheet in this workbook and must be entered manually:"
        )
        for fid in missing_fields:
            doc.add_paragraph(fid, style="List Bullet")
    else:
        doc.add_paragraph("All required CENPEEP input fields were detected.")

    doc.save(output_path)


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_model_report.py path/to/workbook.xlsx")
        sys.exit(1)

    excel_path = sys.argv[1]
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Model_Decision_Report.docx")

    print(f"Running selection pipeline for: {excel_path}")
    result = trace_workbook(excel_path)
    print(f"Selected sheet: {result.get('primarySheet')}")

    print(f"Building report: {output_path}")
    build_report(result, output_path)

    print("Done.")


if __name__ == "__main__":
    main()