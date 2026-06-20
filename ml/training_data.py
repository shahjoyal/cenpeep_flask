"""
training_data.py — Labeled training examples for the CENPEEP field classifier
================================================================================
Each entry maps a *header phrase a real plant sheet might use* to the CENPEEP
field id it represents. This is intentionally generous with variants — the
TF-IDF classifier learns which words/n-grams correlate with which field, so
more (realistic) phrasings per field = better generalization.

This file is the "training data" the user asked for. It's plain Python data,
easy to hand-edit/extend later (that's the point — basic now, refine over
time). To add a new field or new plant-specific phrasing, just append rows.

Format: list of (text, field_id) tuples.
"""

TRAINING_EXAMPLES = [
    # ── L — Unit Load ──────────────────────────────────────────────────────
    ("Load", "L"), ("Unit Load", "L"), ("Load MW", "L"), ("Generation Load", "L"),
    ("MW Load", "L"), ("Gross Load", "L"), ("Unit Load MW", "L"), ("Generation", "L"),
    ("Power Generation", "L"), ("Load (MW)", "L"),

    # ── Ffw — Steam Flow / Feed water flow ────────────────────────────────
    ("Steam Flow", "Ffw"), ("Main Steam Flow", "Ffw"), ("Feed water Flow", "Ffw"),
    ("Feedwater Flow", "Ffw"), ("FW Flow", "Ffw"), ("MS Flow", "Ffw"),
    ("Feed Water Flow TPH", "Ffw"), ("Boiler Feed Water Flow", "Ffw"),

    # ── Fin — Total Coal Flow ──────────────────────────────────────────────
    ("Total Coal consumption", "Fin"), ("Coal Flow", "Fin"), ("Total Coal Flow", "Fin"),
    ("Coal Consumption", "Fin"), ("Total Coal consumption TPH", "Fin"),
    ("Coal Feed Rate", "Fin"), ("Fuel Flow", "Fin"), ("Total Fuel Flow", "Fin"),
    ("Coal Rate", "Fin"), ("Total Coal Firing Rate", "Fin"),

    # ── Cba — Unburnt C Bottom Ash ────────────────────────────────────────
    ("Unburnt Carbon Bottom Ash", "Cba"), ("Bottom Ash Unburnt Carbon", "Cba"),
    ("Unburnt carbon in Bottom Ash", "Cba"), ("Bottom Ash UBC", "Cba"),
    ("Bottom Ash (%) Unburnt Carbon", "Cba"), ("LOI Bottom Ash", "Cba"),

    # ── Cfa — Unburnt C Fly Ash ────────────────────────────────────────────
    ("Unburnt Carbon Fly Ash", "Cfa"), ("Fly Ash Unburnt Carbon", "Cfa"),
    ("Unburnt carbon in Fly Ash ESP", "Cfa"), ("Fly Ash UBC", "Cfa"),
    ("Fly Ash - ESP (%)", "Cfa"), ("LOI Fly Ash", "Cfa"), ("Economizer Unburnt Carbon", "Cfa"),

    # ── Pfa — % Fly Ash ─────────────────────────────────────────────────────
    ("% Fly Ash", "Pfa"), ("Fly Ash Percentage", "Pfa"), ("Fly Ash Fraction", "Pfa"),
    ("Fly Ash Ratio", "Pfa"), ("Percent Fly Ash", "Pfa"),

    # ── Pba — % Bottom Ash ──────────────────────────────────────────────────
    ("% Bottom Ash", "Pba"), ("Bottom Ash Percentage", "Pba"), ("Bottom Ash Fraction", "Pba"),
    ("Bottom Ash Ratio", "Pba"), ("Percent Bottom Ash", "Pba"),

    # ── M — Moisture (coal proximate, "as fired") ─────────────────────────
    ("Moisture", "M"), ("Moisture %", "M"), ("IM %", "M"), ("Inherent Moisture", "M"),
    ("Total Moisture", "M"), ("TM %", "M"), ("Moisture As Received", "M"),
    ("Coal Moisture", "M"), ("M %", "M"),

    # ── A — Ash ──────────────────────────────────────────────────────────────
    ("Ash", "A"), ("Ash %", "A"), ("Ash Content", "A"), ("ASH  %", "A"),
    ("Coal Ash Percentage", "A"), ("Ash as Fired", "A"),

    # ── VM — Volatile Matter ───────────────────────────────────────────────
    ("Volatile Matter", "VM"), ("Volatile Matter %", "VM"), ("VM %", "VM"),
    ("VOLATILE MATTER  %", "VM"), ("Volatiles", "VM"),

    # ── FC — Fixed Carbon ────────────────────────────────────────────────────
    ("Fixed Carbon", "FC"), ("Fixed Carbon %", "FC"), ("FC %", "FC"),
    ("FIXED CARBON  %", "FC"),

    # ── GCV — Gross Calorific Value (as fired) ────────────────────────────
    ("GCV", "GCV"), ("Gross Calorific Value", "GCV"), ("GCV kcal/kg", "GCV"),
    ("G.C.V. (KCal/Kg)", "GCV"), ("Calorific Value", "GCV"), ("GCV As Received", "GCV"),
    ("Coal GCV", "GCV"),

    # ── S — Sulfur ────────────────────────────────────────────────────────────
    ("Sulfur", "S"), ("Sulphur", "S"), ("Sulfur %", "S"), ("S %", "S"),
    ("Total Sulphur", "S"),

    # ── O2in — O2 APH In ────────────────────────────────────────────────────
    ("O2 at APH Inlet", "O2in"), ("O2 APH In", "O2in"), ("O2 at APH I/L Left", "O2in"),
    ("O2 at APH I/L Right", "O2in"), ("O2 APH Inlet %", "O2in"), ("Oxygen APH Inlet", "O2in"),
    ("O2 Air Preheater Inlet", "O2in"),

    # ── CO2in — CO2 APH In ──────────────────────────────────────────────────
    ("CO2 at APH Inlet", "CO2in"), ("CO2 APH In", "CO2in"), ("CO2 Air Preheater Inlet", "CO2in"),

    # ── COin — CO APH In ──────────────────────────────────────────────────────
    ("CO at APH Inlet", "COin"), ("CO APH In", "COin"), ("CO Air Preheater Inlet ppm", "COin"),

    # ── O2out — O2 APH Out ───────────────────────────────────────────────────
    ("O2 at APH Outlet", "O2out"), ("O2 APH Out", "O2out"), ("O2 at APH O/L Left", "O2out"),
    ("O2 at APH O/L Right", "O2out"), ("O2 APH Outlet %", "O2out"), ("Oxygen APH Outlet", "O2out"),
    ("O2 Air Preheater Outlet", "O2out"),

    # ── CO2out — CO2 APH Out ─────────────────────────────────────────────────
    ("CO2 at APH Outlet", "CO2out"), ("CO2 APH Out", "CO2out"), ("CO2 Air Preheater Outlet", "CO2out"),

    # ── COout — CO APH Out ───────────────────────────────────────────────────
    ("CO at APH Outlet", "COout"), ("CO APH Out", "COout"), ("CO", "COout"),
    ("CO mg/Nm3", "COout"), ("CO Emission", "COout"),

    # ── Tgi — FG Temp APH In ─────────────────────────────────────────────────
    # Note: deliberately restricted to phrasing that explicitly says
    # "APH" inlet/in. "Furnace exit" and "Economizer/ECO outlet" gas temps
    # are real readings but are a DIFFERENT, upstream point in the gas path
    # — they are not interchangeable with the APH-inlet reading CENPEEP
    # expects, so they're listed under OUT_OF_SCOPE instead of mapped here.
    ("Flue Gas Temp APH Inlet", "Tgi"), ("FG Temp APH In", "Tgi"),
    ("Primary APH I/L FG Temp", "Tgi"),
    ("Secondary APH I/L FG Temp", "Tgi"),
    ("APH I/L FG Temp", "Tgi"), ("Air Preheater Inlet Gas Temp", "Tgi"),
    ("Secondary Air Preheater Inlet Flue Gas Temp", "Tgi"),
    ("Secondary APH Inlet FG Temp Left", "Tgi"), ("Secondary APH Inlet FG Temp Right", "Tgi"),
    ("APH I/L FG Temp 1 Left", "Tgi"), ("APH I/L FG Temp 1 Right", "Tgi"),
    ("APH I/L FG Temp 2 Left", "Tgi"), ("APH I/L FG Temp 2 Right", "Tgi"),
    ("APH Inlet FG Temperature Left side", "Tgi"), ("APH Inlet FG Temperature Right side", "Tgi"),

    # ── Tgo — FG Temp APH Out ────────────────────────────────────────────────
    ("Flue Gas Temp APH Outlet", "Tgo"), ("FG Temp APH Out", "Tgo"),
    ("APH O/L FG Temp", "Tgo"), ("Primary APH O/L FG Temp", "Tgo"),
    ("Secondary APH O/L FG Temp", "Tgo"), ("Air Preheater Outlet Gas Temperature", "Tgo"),
    ("Secondary Air Preheater Outlet Flue Gas Temp", "Tgo"),
    ("Secondary APH Outlet FG Temp Left", "Tgo"), ("Secondary APH Outlet FG Temp Right", "Tgo"),
    ("APH Outlet Flue Gas Temperature Left", "Tgo"), ("APH Outlet Flue Gas Temperature Right", "Tgo"),
    ("APH O/L FG Temp 1 Left", "Tgo"), ("APH O/L FG Temp 1 Right", "Tgo"),
    ("APH O/L FG Temp 2 Left", "Tgo"), ("APH O/L FG Temp 2 Right", "Tgo"),
    ("APH O/L FG Temp 3 Left", "Tgo"), ("APH O/L FG Temp 3 Right", "Tgo"),
    ("APH Outlet FG Temperature Left side", "Tgo"), ("APH Outlet FG Temperature Right side", "Tgo"),

    # ── Boiler outlet main steam temp has no dedicated CENPEEP symbol in
    #    this field set — it stays unmatched by design (see OUT_OF_SCOPE
    #    examples below, which actively teach the model to reject it
    #    rather than guess Ffw/Tgo just because words overlap).

    # ── Tpai — PA Temp In (APH inlet / fan-outlet side, COLD) ───────────────
    ("Primary Air Temp In", "Tpai"), ("PA Temp In", "Tpai"),
    ("Primary Air APH Temp I/L A", "Tpai"), ("Primary Air APH Temp I/L B", "Tpai"),
    ("Coal Mill PA Temp", "Tpai"),
    ("Primary Air Inlet Temperature", "Tpai"), ("Coal Mill Outlet Temp PA In", "Tpai"),
    # NOTE: in some plant DCS naming, "PAF O/L PA Temp" (Primary Air Fan
    # outlet) is the COLD/pre-APH reading — confirmed against real plant
    # data where this column reads ~30-40°C vs ~380°C for the windbox side.
    ("PAF-A O/L PA Temp", "Tpai"), ("PAF O/L PA Temp", "Tpai"),
    ("Primary Air Fan Outlet Temperature", "Tpai"),

    # ── Tpao — PA Temp Out (APH outlet / boiler windbox side, HOT) ──────────
    ("Primary Air Temp Out", "Tpao"), ("PA Temp Out", "Tpao"),
    ("Primary Air APH Temp O/L A", "Tpao"), ("Primary Air APH Temp O/L B", "Tpao"),
    ("Primary Air Outlet Temperature", "Tpao"),
    # NOTE: "Boiler side PA Temp" is the HOT/post-APH reading in real plant
    # data (~380°C, entering the mills/furnace) — confirmed against sample data.
    ("Boiler side A PA Temp", "Tpao"), ("Boiler side B PA Temp", "Tpao"),
    ("Boiler side PA Temperature", "Tpao"),

    # ── Tsai — SA Temp In (APH inlet / fan-outlet side, COLD) ────────────────
    ("Secondary Air Temp In", "Tsai"), ("SA Temp In", "Tsai"),
    ("Secondary Air APH Temp I/L A", "Tsai"), ("Secondary Air APH Temp I/L B", "Tsai"),
    ("Secondary Air Inlet Temperature", "Tsai"),
    # NOTE: "FDF O/L SA Temp" (Forced Draft Fan outlet) is the COLD/pre-APH
    # reading in real plant data (~30°C) — confirmed against sample data.
    ("FDF-A O/L SA Temp", "Tsai"), ("FDF O/L SA Temp", "Tsai"),
    ("Forced Draft Fan Outlet Temperature", "Tsai"),

    # ── Tsao — SA Temp Out (APH outlet / boiler windbox side, HOT) ──────────
    ("Secondary Air Temp Out", "Tsao"), ("SA Temp Out", "Tsao"),
    ("Secondary Air APH Temp O/L A", "Tsao"), ("Secondary Air APH Temp O/L B", "Tsao"),
    ("Secondary Air Outlet Temperature", "Tsao"),
    # NOTE: "Boiler side SA Temp" is the HOT/post-APH reading in real plant
    # data (~370°C, entering the windbox) — confirmed against sample data.
    ("Boiler side A SA Temp", "Tsao"), ("Boiler side B SA Temp", "Tsao"),
    ("Boiler side SA Temperature", "Tsao"),

    # ── Fsa — SA Flow ──────────────────────────────────────────────────────────
    ("Secondary Air Flow", "Fsa"), ("SA Flow", "Fsa"), ("SA air flow", "Fsa"),
    ("Boiler side A SA flow", "Fsa"), ("Boiler side B SA flow", "Fsa"),
    ("Total Secondary Air Flow", "Fsa"),

    # ── Fpa — PA Flow ──────────────────────────────────────────────────────────
    ("Primary Air Flow", "Fpa"), ("PA Flow", "Fpa"), ("PA air flow", "Fpa"),
    ("Coal Mill A PA Flow", "Fpa"), ("Coal Mill PA Flow", "Fpa"),
    ("Total Primary Air Flow", "Fpa"),

    # ── Tref — Ambient / Reference Temp ─────────────────────────────────────
    ("Ambient Temperature", "Tref"), ("Reference Temperature", "Tref"),
    ("Ambient Temp", "Tref"), ("Atmospheric Temp", "Tref"),

    # ── Design proximate: Md, Ad, VMd, FCd ──────────────────────────────────
    ("Design Moisture", "Md"), ("Moisture Design", "Md"), ("Design Coal Moisture", "Md"),
    ("Design Ash", "Ad"), ("Ash Design", "Ad"), ("Design Coal Ash", "Ad"),
    ("Design Volatile Matter", "VMd"), ("VM Design", "VMd"),
    ("Design Fixed Carbon", "FCd"), ("FC Design", "FCd"),

    # ── Design ultimate: Cd, Sd, Hd, Md2, Nd, Od, Ad2, GCVd, Trad, Mwvd ────
    ("Design Carbon", "Cd"), ("Carbon Design", "Cd"), ("Design Carbon Ultimate", "Cd"),
    ("Design Sulfur", "Sd"), ("Sulfur Design", "Sd"), ("Design Sulphur Ultimate", "Sd"),
    ("Design Hydrogen", "Hd"), ("Hydrogen Design", "Hd"), ("Design Hydrogen Ultimate", "Hd"),
    ("Design Moisture Ultimate", "Md2"), ("Moisture Design Ultimate", "Md2"),
    ("Design Nitrogen", "Nd"), ("Nitrogen Design", "Nd"),
    ("Design Oxygen", "Od"), ("Oxygen Design", "Od"),
    ("Design Ash Ultimate", "Ad2"), ("Ash Design Ultimate", "Ad2"),
    ("Design GCV", "GCVd"), ("GCV Design", "GCVd"), ("Design Calorific Value", "GCVd"),
    ("Design Reference Air Temp", "Trad"), ("Ref Air Temp Design", "Trad"),
    ("Design Moisture in Air", "Mwvd"), ("Moisture in Air Design", "Mwvd"),
]


# ── Out-of-scope examples ────────────────────────────────────────────────────
# These are REAL plant-sheet headers that are NOT any of the 41 CENPEEP
# fields, but share vocabulary with fields that are (steam, temp, flow,
# pressure...). Without these as a labeled class, the classifier has no way
# to say "I recognize boiler/plant language here, but it isn't one of my
# fields" — it just falls back to the nearest (wrong) field by leftover
# cosine similarity. Labeling them "OUT_OF_SCOPE" lets the model actively
# compete that hypothesis against the real fields, which is far more
# accurate than relying on a similarity-score cutoff alone.
OUT_OF_SCOPE_EXAMPLES = [
    "MS TEMP boiler outlet", "Main Steam Temp boiler outlet",
    "MAIN STM TEMP-L", "MAIN STM TEMP-R", "MS Temp.", "MS Pressure",
    "MS Press-L", "MS Press-R",
    "Primary SH O/L Steam Temp", "Divi SH O/L Steam Temp", "PLN SH O/L Steam Temp",
    "CRH Steam Press", "CRH Steam Temp", "CRH Temp", "CRH Pressure",
    "HRH Steam Temp", "HRH Steam Press", "HRH Temp", "HRH Pressure",
    "SH Spray Flow", "RH Spray Flow", "RH Spray Temp", "Total SH Spray", "Total RH Spray",
    "Feedwater HP HTR inlet temp", "Feed water Eco inlet temp", "Feed water Eco outlet Temp",
    "HPH Ext STM pressure", "HPH Ext STM temp", "HPH Drain Temp",
    "HPH I/L Feedwater Temp", "HPH O/L Feedwater Temp",
    "Enthalpy FW HPH O/L", "Enthalpy FW HPH I/L", "Extraction Enthalpy HPH",
    "Drip Enthalpy HPH", "Extraction Flow HPH", "MS Enthalpy", "HRH Enthalpy",
    "CRH Enthalpy", "FW Enthalpy", "RH Flow", "Attemperation Enthalpy", "THR",
    "Mill Coal Flow", "Mill A Coal Flow", "Mill B Coal Flow",
    "Turbine Side Condenser Vacuum", "Generator Side Condenser Vacuum",
    "Soot Blower Steam Flow", "Soot Blower Steam Press",
    "WTR SEP MET TEMP", "SOFA SA CTL DMP POS", "SSC PWR PACK PRESS",
    "FW SHORT SB CURR", "FDF Current", "IDF Current", "VACUUM",
    "Coal A", "Coal B", "HEAT RATE", "DATE OF COLLECTION",
    "Sample Collection Date", "Lab Test Number",
    # Pressure / draft readings that share "FG"/"APH"/"inlet"/"outlet"
    # vocabulary with the Tgi/Tgo temperature fields but are NOT
    # temperatures — must not be averaged into a temperature field.
    "FURNACE DRAFT", "ECO inlet FG pressure", "APH inlet FG pressure",
    "APH O/L FG pressure", "ECO outlet FG pressure", "Draft pressure",
    "Furnace pressure", "APH differential pressure", "Gas side draft",
    "ECO O/L FG Temp",  # ambiguous short form — direction unclear without
                        # Left/Right/In/Out qualifiers; better to skip than guess
    # Furnace-exit and economizer-outlet gas temps are real plant readings
    # but are a DIFFERENT, upstream point in the flue-gas path than the
    # APH inlet/outlet that Tgi/Tgo represent — do not substitute.
    "Furnace exit FG temp", "Furnace exit gas temperature",
    "ECO Outlet FG Temp", "Economizer Outlet Gas Temp",
    "Economizer Outlet Flue Gas Temperature", "ECO O/L FG Temp Left",
    "ECO O/L FG Temp Right", "Economizer exit temperature",
]

def get_training_data():
    """Returns (texts, labels) as parallel lists for sklearn, including the
    OUT_OF_SCOPE class used to actively reject look-alike-but-unmapped
    plant tags instead of forcing them onto the nearest real field."""
    texts = [t for t, _ in TRAINING_EXAMPLES] + list(OUT_OF_SCOPE_EXAMPLES)
    labels = [l for _, l in TRAINING_EXAMPLES] + ["OUT_OF_SCOPE"] * len(OUT_OF_SCOPE_EXAMPLES)
    return texts, labels


def get_field_ids():
    """All distinct real CENPEEP field ids covered by training data
    (excludes the OUT_OF_SCOPE bucket)."""
    return sorted(set(l for _, l in TRAINING_EXAMPLES))


# ── Explicit exclusion list ──────────────────────────────────────────────────
# Headers that should NEVER be matched to a CENPEEP field, even if cosine
# similarity is high (e.g. "Date" vs "Coal Rate" can share characters).
# Checked as an exact (normalized, lowercased) match before the classifier
# even runs, so these short-circuit to "no match" regardless of confidence.
NON_FIELD_HEADERS = {
    'date', 'hrs', 'hr', 'hour', 'hours', 'count', 'sr no', 'sr. no', 'sl no',
    's no', 'time', 'shift', 'remarks', 'remark', 'notes', 'note',
    'id', 'unit', 'unit no', 'plant', 'particulars', 'description',
    'sample no', 'sample', 'test no', 'reading no', 'day', 'month', 'year',
    'total air flow', 'sox fgd i/l', 'sox', 'nox', 'sox fgd inlet',
    'ssc current', 'burner tilt corner 1', 'burner tilt',
}


def is_non_field_header(text):
    """True if text is a known structural/non-data column header."""
    norm = str(text).strip().lower()
    norm = norm.replace('.', '').replace('-', ' ').strip()
    norm = ' '.join(norm.split())
    return norm in NON_FIELD_HEADERS
