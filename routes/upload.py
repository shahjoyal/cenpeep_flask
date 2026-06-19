"""
upload.py — Flask upload route for CENPEEP
==========================================

This version uses:
- chunk-friendly workbook parsing
- a lightweight TF-IDF + cosine matcher for header detection
- editable starter training data in basic_training_data.json
- larger file uploads via MAX_CONTENT_LENGTH in app.py
"""

from __future__ import annotations

import io
import json
import math
import os
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field as dc_field
from itertools import chain
from datetime import date, datetime, time
from typing import Dict, Iterable, Iterator, List, Optional, Sequence, Tuple

from flask import Blueprint, jsonify, request

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

upload_bp = Blueprint("upload", __name__)

MAX_PREVIEW_ROWS = int(os.getenv("UPLOAD_PREVIEW_ROWS", "60"))
HEADER_SCAN_ROWS = int(os.getenv("UPLOAD_HEADER_SCAN_ROWS", "8"))
CHUNK_SIZE = int(os.getenv("UPLOAD_CHUNK_ROWS", "500"))
SIMILARITY_THRESHOLD = float(os.getenv("UPLOAD_SIMILARITY_THRESHOLD", "0.18"))

ALLOWED_EXTS = {".xlsx", ".xls", ".xlsm"}


# ---------------------------------------------------------------------------
# JSON safety
# ---------------------------------------------------------------------------

def convert_json_safe(obj):
    """Recursively convert datetime/time/date objects into JSON-safe values."""
    if isinstance(obj, dict):
        return {k: convert_json_safe(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [convert_json_safe(x) for x in obj]
    if isinstance(obj, tuple):
        return [convert_json_safe(x) for x in obj]
    if isinstance(obj, datetime):
        return obj.strftime("%Y-%m-%d %H:%M:%S")
    if isinstance(obj, date):
        return obj.isoformat()
    if isinstance(obj, time):
        return obj.strftime("%H:%M:%S")
    return obj


# ---------------------------------------------------------------------------
# Training data / vocabulary
# ---------------------------------------------------------------------------

def _normalize_text(value: object) -> str:
    if value is None:
        return ""
    text = str(value).lower().strip()
    # split camelCase / PascalCase
    text = re.sub(r"([a-z])([A-Z])", r"\1 \2", text)
    text = text.replace("/", " ").replace("-", " ")
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _tokenize(text: object) -> List[str]:
    norm = _normalize_text(text)
    if not norm:
        return []
    tokens = norm.split()
    expanded: List[str] = []
    for tok in tokens:
        # break very long concatenations if they exist
        if len(tok) > 18 and tok.isalpha():
            expanded.extend(re.findall(r"[a-z]+|[0-9]+", tok))
        else:
            expanded.append(tok)
    return expanded


def _to_num(val):
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return float(val)
    if isinstance(val, str):
        txt = val.strip().replace(",", "")
        if not txt:
            return None
        try:
            return float(txt)
        except ValueError:
            return None
    try:
        return float(val)
    except (ValueError, TypeError):
        return None


def _looks_like_header_cell(val: object) -> bool:
    if val is None:
        return False
    if isinstance(val, (int, float)):
        return False
    txt = _normalize_text(val)
    return len(txt) >= 2 and any(ch.isalpha() for ch in txt)


def _iter_nonempty_texts(row: Sequence[object]) -> List[str]:
    out = []
    for cell in row:
        if cell is None:
            continue
        txt = str(cell).strip()
        if txt:
            out.append(txt)
    return out


@dataclass
class TFIDFExample:
    text: str
    field: str
    tokens: List[str]
    vector: Dict[str, float] = dc_field(default_factory=dict)


class BasicTFIDFClassifier:
    def __init__(self, examples: List[Dict[str, str]], negative_phrases: List[str]):
        self.examples: List[TFIDFExample] = [
            TFIDFExample(text=e["text"], field=e["field"], tokens=_tokenize(e["text"]))
            for e in examples
            if e.get("text") and e.get("field")
        ]
        self.negative_phrases = [_normalize_text(x) for x in negative_phrases if x]
        self.idf: Dict[str, float] = {}
        self.field_aliases: Dict[str, List[str]] = defaultdict(list)
        self._fit()

    def _fit(self):
        doc_freq = Counter()
        for ex in self.examples:
            for tok in set(ex.tokens):
                doc_freq[tok] += 1
            self.field_aliases[ex.field].append(ex.text)

        n_docs = max(len(self.examples), 1)
        self.idf = {
            tok: math.log((1 + n_docs) / (1 + df)) + 1.0
            for tok, df in doc_freq.items()
        }
        for ex in self.examples:
            ex.vector = self._vectorize_tokens(ex.tokens)

    def _vectorize_tokens(self, tokens: List[str]) -> Dict[str, float]:
        if not tokens:
            return {}
        counts = Counter(tokens)
        total = sum(counts.values())
        vec: Dict[str, float] = {}
        for tok, cnt in counts.items():
            tf = cnt / total
            idf = self.idf.get(tok, 1.0)
            vec[tok] = tf * idf
        return vec

    @staticmethod
    def _cosine(a: Dict[str, float], b: Dict[str, float]) -> float:
        if not a or not b:
            return 0.0
        dot = 0.0
        for tok, av in a.items():
            bv = b.get(tok)
            if bv is not None:
                dot += av * bv
        norm_a = math.sqrt(sum(v * v for v in a.values()))
        norm_b = math.sqrt(sum(v * v for v in b.values()))
        if not norm_a or not norm_b:
            return 0.0
        return dot / (norm_a * norm_b)

    def _blocked(self, text: str) -> bool:
        norm = _normalize_text(text)
        if not norm:
            return True
        if len(norm) <= 1:
            return True

        blocked_exact = {
            "date", "time", "shift", "count", "remarks", "sample", "analysis",
            "report", "unit", "boiler", "operator", "status", "average", "total",
            "value", "values", "temperature", "pressure", "flow rate", "flow",
            "column", "row", "sheet"
        }
        if norm in blocked_exact:
            return True

        for p in self.negative_phrases:
            if p and p == norm:
                return True
        return False

    def predict(self, text: str, sheet_name: str = "") -> Tuple[Optional[str], float]:
        if self._blocked(text):
            return None, 0.0

        norm = _normalize_text(text)
        tokens = _tokenize(norm)
        if not tokens:
            return None, 0.0

        sheet_norm = _normalize_text(sheet_name)
        hint = self._sheet_hint(norm, sheet_norm)
        if hint:
            return hint, 1.0

        query_vec = self._vectorize_tokens(tokens)

        best_field = None
        best_score = 0.0
        for ex in self.examples:
            score = self._cosine(query_vec, ex.vector)
            overlap = len(set(tokens) & set(ex.tokens)) / max(len(set(tokens) | set(ex.tokens)), 1)
            score = score * 0.8 + overlap * 0.2
            if score > best_score:
                best_score = score
                best_field = ex.field

        if sheet_norm and any(k in sheet_norm for k in ("coal", "avg", "day", "hr", "loi")):
            best_score += 0.02

        if best_score >= SIMILARITY_THRESHOLD:
            return best_field, min(best_score, 0.99)
        return None, 0.0

    @staticmethod
    def _sheet_hint(norm_text: str, sheet_norm: str) -> Optional[str]:
        hint_pairs = [
            ("load", "L"),
            ("mw", "L"),
            ("main steam flow", "Ffw"),
            ("feed water flow", "Ffw"),
            ("feedwater flow", "Ffw"),
            ("coal consumption", "Fin"),
            ("total coal consumption", "Fin"),
            ("coal flow", "Fin"),
            ("g c v", "GCV"),
            ("gcv", "GCV"),
            ("gross calorific value", "GCV"),
            ("volatile matter", "VM"),
            ("fixed carbon", "FC"),
            ("moisture", "M"),
            ("im", "M"),
            ("tm", "M"),
            ("ash", "A"),
            ("sulphur", "S"),
            ("sulfur", "S"),
            ("fly ash", "Pfa"),
            ("bottom ash", "Pba"),
            ("unburnt carbon fly ash", "Cfa"),
            ("unburnt carbon bottom ash", "Cba"),
            ("flue gas temp in", "Tgi"),
            ("fg temp in", "Tgi"),
            ("flue gas temp out", "Tgo"),
            ("fg temp out", "Tgo"),
            ("primary air temp in", "Tpai"),
            ("primary air temp out", "Tpao"),
            ("secondary air temp in", "Tsai"),
            ("secondary air temp out", "Tsao"),
            ("primary air flow", "Fpa"),
            ("secondary air flow", "Fsa"),
            ("ambient temp", "Tref"),
            ("ref air temp", "Tref"),
        ]

        if sheet_norm:
            if "tp 24" in sheet_norm or "coal analysis" in sheet_norm:
                if "generation" in norm_text or "load" in norm_text:
                    return "L"
                if "coal consumption" in norm_text or "coal flow" in norm_text:
                    return "Fin"
                if "im" in norm_text or "tm" in norm_text:
                    return "M"
                if "ash" in norm_text:
                    return "A"
                if "volatile" in norm_text:
                    return "VM"
                if "fixed carbon" in norm_text:
                    return "FC"
                if "gcv" in norm_text or "calorific" in norm_text:
                    return "GCV"

            if "hr avg" in sheet_norm or "day avg" in sheet_norm:
                if "load" in norm_text:
                    return "L"
                if "coal" in norm_text:
                    return "Fin"
                if "steam flow" in norm_text or "feed water" in norm_text:
                    return "Ffw"
                if "main stm temp" in norm_text or "ms temp" in norm_text:
                    return "Tgo"

            if "loi" in sheet_norm:
                if "bottom ash" in norm_text:
                    return "Pba"
                if "fly ash" in norm_text:
                    return "Pfa"

        for phrase, field in hint_pairs:
            if phrase in norm_text:
                return field
        return None


def _load_training_data() -> Tuple[List[Dict[str, str]], List[str]]:
    here = os.path.dirname(__file__)
    path = os.path.join(here, "basic_training_data.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("examples", []), data.get("negative_phrases", [])
    except Exception:
        return [], []


EXAMPLES, NEGATIVE_PHRASES = _load_training_data()
CLASSIFIER = BasicTFIDFClassifier(EXAMPLES, NEGATIVE_PHRASES)

FIELD_ALIASES = {
    "L": ["load", "unit load", "mw", "generation", "power output"],
    "Ffw": ["feed water flow", "feedwater flow", "steam flow", "main steam flow", "main stm flow"],
    "Fin": ["coal flow", "total coal consumption", "total coal flow", "coal consumption", "fuel flow"],
    "M": ["moisture", "im %", "tm %", "total moisture"],
    "A": ["ash", "ash %", "ash percentage"],
    "VM": ["volatile matter", "vm", "volatile"],
    "FC": ["fixed carbon", "fc", "carbon fixed"],
    "GCV": ["gcv", "gross calorific value", "calorific value", "kcal kg"],
    "S": ["sulphur", "sulfur", "s %"],
    "Pfa": ["fly ash", "fly ash esp", "fa"],
    "Pba": ["bottom ash", "ba"],
    "Cfa": ["unburnt carbon fly ash", "unburnt carbon in fly ash"],
    "Cba": ["unburnt carbon bottom ash", "unburnt carbon in bottom ash"],
    "Tgi": ["flue gas temp in", "fg temp in", "gas temp in"],
    "Tgo": ["flue gas temp out", "fg temp out", "boiler outlet temp"],
    "Tpai": ["pa temp in", "primary air temp in"],
    "Tpao": ["pa temp out", "primary air temp out"],
    "Tsai": ["sa temp in", "secondary air temp in"],
    "Tsao": ["sa temp out", "secondary air temp out"],
    "Fpa": ["pa flow", "primary air flow"],
    "Fsa": ["sa flow", "secondary air flow"],
    "Tref": ["ambient temp", "ref air temp", "room temp"],
}
FIELD_ALIASES_NORMALIZED = {
    field: [_normalize_text(alias) for alias in aliases]
    for field, aliases in FIELD_ALIASES.items()
}


# ---------------------------------------------------------------------------
# Workbook readers
# ---------------------------------------------------------------------------

def _collect_rows_from_openpyxl(ws) -> Iterable[List[object]]:
    for row in ws.iter_rows(values_only=True):
        yield list(row)


def _collect_rows_from_xlrd(ws) -> Iterable[List[object]]:
    for r in range(ws.nrows):
        yield [ws.cell_value(r, c) for c in range(ws.ncols)]


def _read_all_sheets(file_bytes, filename):
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if ext == "xls":
        if not HAS_XLRD:
            raise RuntimeError("xlrd not installed; cannot read .xls files")
        wb = xlrd.open_workbook(file_contents=file_bytes)
        sheets = []
        for name in wb.sheet_names():
            ws = wb.sheet_by_name(name)
            sheets.append((name, lambda ws=ws: _collect_rows_from_xlrd(ws), ws.nrows, ws.ncols))
        return sheets

    if not HAS_OPENPYXL:
        raise RuntimeError("openpyxl not installed")

    wb = openpyxl.load_workbook(io.BytesIO(file_bytes), data_only=True, read_only=True)
    sheets = []
    for name in wb.sheetnames:
        ws = wb[name]
        sheets.append((name, lambda ws=ws: _collect_rows_from_openpyxl(ws), ws.max_row or 0, ws.max_column or 0))
    return sheets


# ---------------------------------------------------------------------------
# Parsing helpers
# ---------------------------------------------------------------------------

@dataclass
class FieldBucket:
    count: int = 0
    total: float = 0.0
    preview_values: List[float] = dc_field(default_factory=list)

    def add(self, value: float):
        self.count += 1
        self.total += value
        if len(self.preview_values) < 10:
            self.preview_values.append(value)

    @property
    def average(self) -> float:
        return self.total / self.count if self.count else 0.0


def _parse_standard_cenpeep(rows: List[List[object]], sheet_name: str):
    extracted: Dict[str, float] = {}
    raw_rows = []
    md_seen = False
    ad_seen = False

    for row in rows:
        if len(row) < 5:
            continue
        particulars, uom, symbol, formula, value = row[:5]
        if not symbol or value is None:
            continue

        is_input = isinstance(formula, str) and formula.strip().lower() == "input"
        is_plain = (formula is None) and isinstance(value, (int, float))
        if not is_input and not is_plain:
            continue

        num = _to_num(value)
        if num is None:
            continue

        sym_norm = _normalize_text(symbol).replace(" ", "")
        field_id = None

        for field, aliases in FIELD_ALIASES.items():
            if sym_norm == _normalize_text(field).replace(" ", ""):
                field_id = field
                break
            if any(_normalize_text(alias).replace(" ", "") == sym_norm for alias in aliases):
                field_id = field
                break

        if sym_norm == "md":
            field_id = "Md2" if md_seen else "Md"
            md_seen = True
        elif sym_norm == "ad":
            field_id = "Ad2" if ad_seen else "Ad"
            ad_seen = True

        if not field_id:
            continue

        extracted[field_id] = num
        raw_rows.append({
            "particulars": str(particulars) if particulars else str(symbol),
            "uom": str(uom) if uom else "",
            "symbol": str(symbol),
            "value": num,
        })

    return extracted, raw_rows, {}


def _guess_data_start(rows: List[List[object]]) -> int:
    """Return index of first likely data row among buffered rows."""
    for idx, row in enumerate(rows):
        numeric = sum(1 for c in row if _to_num(c) is not None)
        text = sum(1 for c in row if _looks_like_header_cell(c))
        if numeric >= 2:
            return idx
        if numeric >= 1 and text <= 2 and idx >= 1:
            return idx
    return len(rows)


def _build_column_context(rows: List[Sequence[object]], max_cols: int) -> List[str]:
    context: List[str] = []
    for col_idx in range(max_cols):
        parts: List[str] = []
        for row in rows:
            if col_idx < len(row):
                cell = row[col_idx]
                if cell is None:
                    continue
                txt = str(cell).strip()
                if txt and _looks_like_header_cell(txt):
                    parts.append(txt)
        context.append(" ".join(parts))
    return context


def _merge_alias_and_model_prediction(text: str, sheet_name: str) -> Tuple[Optional[str], float]:
    norm = _normalize_text(text)
    if not norm:
        return None, 0.0

    for field, aliases in FIELD_ALIASES_NORMALIZED.items():
        for alias in aliases:
            if not alias:
                continue
            if alias == norm:
                return field, 0.99
            if len(alias.split()) > 1 and alias in norm:
                return field, 0.96
            if len(alias.split()) == 1 and alias in norm.split():
                return field, 0.96

    return CLASSIFIER.predict(text, sheet_name=sheet_name)


def _parse_tabular_sheet(sheet_name: str, row_iter: Iterator[List[object]]):
    buffered: List[List[object]] = []
    for _ in range(HEADER_SCAN_ROWS):
        try:
            buffered.append(next(row_iter))
        except StopIteration:
            break

    if not buffered:
        return {}, [], {}

    data_start = _guess_data_start(buffered)
    header_rows = buffered[:max(data_start, 1)]
    max_cols = max((len(r) for r in header_rows), default=0)
    _ = _build_column_context(header_rows, max_cols)

    col_map: Dict[int, str] = {}
    confidence: Dict[int, float] = {}

    # First pass: try combined header context row by row.
    for col_idx in range(max_cols):
        parts: List[str] = []
        for row in header_rows:
            if col_idx < len(row):
                cell = row[col_idx]
                if cell is None:
                    continue
                txt = str(cell).strip()
                if txt and _looks_like_header_cell(txt):
                    parts.append(txt)
        header_text = " ".join(parts)

        field_id, conf = _merge_alias_and_model_prediction(header_text, sheet_name)
        if field_id:
            col_map[col_idx] = field_id
            confidence[col_idx] = conf

    # Second pass: if not enough matches, try each header cell independently.
    if len(col_map) < 2:
        for col_idx in range(max_cols):
            for row in header_rows:
                if col_idx >= len(row):
                    continue
                cell = row[col_idx]
                field_id, conf = _merge_alias_and_model_prediction(cell, sheet_name)
                if field_id:
                    col_map[col_idx] = field_id
                    confidence[col_idx] = conf
                    break

    if not col_map:
        return {}, [], {}

    field_stats: Dict[str, FieldBucket] = defaultdict(FieldBucket)
    raw_rows = []

    data_rows = chain(buffered[data_start:], row_iter)
    for row_index, row in enumerate(data_rows, start=data_start):
        if not any(cell is not None and str(cell).strip() for cell in row):
            continue

        for col_idx, field_id in col_map.items():
            if col_idx >= len(row):
                continue
            num = _to_num(row[col_idx])
            if num is None:
                continue
            field_stats[field_id].add(num)

        if len(raw_rows) < MAX_PREVIEW_ROWS:
            preview = []
            for col_idx, field_id in col_map.items():
                val = row[col_idx] if col_idx < len(row) else None
                preview.append({
                    "col": col_idx,
                    "field": field_id,
                    "value": convert_json_safe(val),
                })
            raw_rows.append({"rowIndex": row_index + 1, "preview": preview})

        if CHUNK_SIZE > 0 and (row_index - data_start + 1) % CHUNK_SIZE == 0:
            pass

    extracted = {fid: bucket.average for fid, bucket in field_stats.items()}
    summary = {
        fid: {
            "count": bucket.count,
            "values": bucket.preview_values,
            "average": bucket.average,
        }
        for fid, bucket in field_stats.items()
    }
    return extracted, raw_rows, summary


def _parse_sheet_rows_stream(sheet_name: str, row_iter: Iterator[List[object]]):
    buffered: List[List[object]] = []
    for _ in range(min(HEADER_SCAN_ROWS, 30)):
        try:
            buffered.append(next(row_iter))
        except StopIteration:
            break

    ext1, raw1, summary1 = _parse_standard_cenpeep(buffered, sheet_name)
    if len(ext1) >= 2:
        return {
            "sheetName": sheet_name,
            "strategy": "cenpeep_column",
            "extracted": ext1,
            "rawRows": raw1,
            "summary": summary1,
        }

    full_iter = iter(buffered + list(row_iter))
    ext2, raw2, summary2 = _parse_tabular_sheet(sheet_name, full_iter)
    if ext2:
        return {
            "sheetName": sheet_name,
            "strategy": "tfidf_tabular_stream",
            "extracted": ext2,
            "rawRows": raw2,
            "summary": summary2,
        }

    return {
        "sheetName": sheet_name,
        "strategy": "unrecognized",
        "extracted": {},
        "rawRows": [],
        "summary": {},
    }


def parse_workbook(file_bytes, filename):
    sheets = _read_all_sheets(file_bytes, filename)
    sheet_results = []
    merged_extracted: Dict[str, float] = {}
    primary_sheet = sheets[0][0] if sheets else ""

    for sheet_name, rows_factory, _, _ in sheets:
        result = _parse_sheet_rows_stream(sheet_name, rows_factory())
        sheet_results.append(result)

    preferred_order = []
    for sr in sheet_results:
        name = _normalize_text(sr["sheetName"])
        if "cenpeep" in name:
            preferred_order.insert(0, sr)
        else:
            preferred_order.append(sr)

    for sr in preferred_order:
        merged_extracted.update(sr["extracted"])
        if sr["extracted"] and not primary_sheet:
            primary_sheet = sr["sheetName"]

    if any("cenpeep" in _normalize_text(sr["sheetName"]) for sr in sheet_results):
        primary_sheet = next(
            sr["sheetName"]
            for sr in sheet_results
            if "cenpeep" in _normalize_text(sr["sheetName"])
        )

    result = {
        "sheetResults": sheet_results,
        "extracted": merged_extracted,
        "primarySheet": primary_sheet,
        "totalFields": len(merged_extracted),
        "detectionModel": {
            "type": "tfidf_header_matcher",
            "trainingExamples": len(EXAMPLES),
            "threshold": SIMILARITY_THRESHOLD,
        },
    }
    return convert_json_safe(result)


@upload_bp.route("/", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"ok": False, "error": "No file uploaded"}), 400

    f = request.files["file"]
    if not f.filename:
        return jsonify({"ok": False, "error": "Empty filename"}), 400

    ext = "." + f.filename.rsplit(".", 1)[-1].lower() if "." in f.filename else ""
    if ext not in ALLOWED_EXTS:
        return jsonify({"ok": False, "error": "Only .xlsx / .xls / .xlsm files are accepted"}), 400

    try:
        file_bytes = f.read()
        result = parse_workbook(file_bytes, f.filename)

        first_sheet_rows = result["sheetResults"][0]["rawRows"] if result["sheetResults"] else []

        response = {
            "ok": True,
            "filename": f.filename,
            **result,
            "sheetName": result["primarySheet"],
            "rawRows": first_sheet_rows,
        }
        return jsonify(convert_json_safe(response))
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500