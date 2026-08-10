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
    ("Power Generation", "L"), ("Load (MW)", "L"), ("GENERATION", "L"), ("Net Generation", "L"),
    ("Total Unit Generation", "L"), ("Unit Generation", "L"), ("Total Generation", "L"),
    # "Generator" (the equipment) is real plant-tag shorthand for the same
    # MW reading as "Generation" — e.g. "GENERATOR MW" on DCS-style hourly
    # exports. Without an explicit anchor, this drifted onto the unrelated
    # OUT_OF_SCOPE example "Generator Side Condenser Vacuum" purely on
    # "Generator" word/char overlap, since no L example previously used
    # that spelling (only "Generation").
    ("Generator MW", "L"), ("GENERATOR MW", "L"), ("Generator Load", "L"),
    ("Gen MW", "L"), ("GEN MW", "L"), ("Gen-MW", "L"), ("Generator Output", "L"),
    ("Generator Output MW", "L"),

    # ── Ffw — Steam Flow / Feed water flow ────────────────────────────────
    ("Steam Flow", "Ffw"), ("Main Steam Flow", "Ffw"), ("Feed water Flow", "Ffw"),
    ("Feedwater Flow", "Ffw"), ("FW Flow", "Ffw"), ("MS Flow", "Ffw"),
    ("Feed Water Flow TPH", "Ffw"), ("Boiler Feed Water Flow", "Ffw"), ("MAIN STEAM Flow", "Ffw"),
    ("FW FLOW", "Ffw"), ("FEED WATER FLOW", "Ffw"),
    # "STM"/"FLW" abbreviated DCS-tag spelling of "Steam"/"Flow" — e.g.
    # "MAIN STM FLOW COMP" (main steam flow, compensated) on real hourly
    # exports. Without a Ffw example using "STM", this drifted onto the
    # OUT_OF_SCOPE "MAIN STM TEMP-L/-R" examples instead, since those were
    # the closest char n-gram match on the abbreviated spelling — even
    # though this column is a FLOW reading, not a temperature. Keep this
    # narrowly scoped to "STM ... FLOW/FLW" so it doesn't start pulling in
    # the (deliberately unmapped) "MAIN STM TEMP" family.
    ("MAIN STM FLOW COMP", "Ffw"), ("MAIN STM FLOW", "Ffw"), ("MAIN STM FLW COMP", "Ffw"),
    ("MN STM FLOW", "Ffw"), ("STM FLOW", "Ffw"), ("STM FLW", "Ffw"), ("Total STM Flow", "Ffw"),
    # "M S FLOW" -- the exact real CSTPS header for Main Steam Flow, with a
    # space between "M" and "S" instead of "MS". Without this, it was
    # losing to the (wrong) Fpa/Fsa "PA Flow"/"SA Flow" training examples
    # on char n-gram overlap -- "M S FLOW" and "PA Flow"/"SA Flow" happen
    # to share more substring structure once there's a space in the middle
    # than "M S FLOW" does with the correctly-spelled "MS Flow" example.
    ("M S FLOW", "Ffw"),

    # ── Fin — Total Coal Flow ──────────────────────────────────────────────
    ("Total Coal consumption", "Fin"), ("Coal Flow", "Fin"), ("Total Coal Flow", "Fin"),
    ("Coal Consumption", "Fin"), ("Total Coal consumption TPH", "Fin"),
    ("Coal Feed Rate", "Fin"), ("Fuel Flow", "Fin"), ("Total Fuel Flow", "Fin"),
    ("Coal Rate", "Fin"), ("Total Coal Firing Rate", "Fin"), ("Feeder A Coal flow rate", "Fin"),
    ("Feeder B Coal flow rate", "Fin"), ("Feeder C Coal flow rate", "Fin"),
    ("Feeder D Coal flow rate", "Fin"), ("Feeder E Coal flow rate", "Fin"),
    ("Feeder F Coal flow rate", "Fin"), ("Feeder G Coal flow rate", "Fin"),
    # Per-mill coal flow readings (as opposed to per-feeder) are the same
    # physical quantity — total coal input — just measured at the mill
    # rather than the feeder. Real plant sheets report these instead of
    # (or alongside) feeder flows, so they must feed into Fin too, not be
    # rejected as OUT_OF_SCOPE (was previously mislabeled — see below).
    ("Mill A Coal Flow", "Fin"), ("Mill B Coal Flow", "Fin"), ("Mill C Coal Flow", "Fin"),
    ("Mill D Coal Flow", "Fin"), ("Mill E Coal Flow", "Fin"), ("Mill F Coal Flow", "Fin"),
    ("Mill G Coal Flow", "Fin"), ("Mill H Coal Flow", "Fin"), ("Mill Coal Flow", "Fin"),

    # ── Cba — Unburnt C Bottom Ash ────────────────────────────────────────
    ("Unburnt Carbon Bottom Ash", "Cba"), ("Bottom Ash Unburnt Carbon", "Cba"),
    ("Unburnt carbon in Bottom Ash", "Cba"), ("Bottom Ash UBC", "Cba"),
    ("Bottom Ash (%) Unburnt Carbon", "Cba"), ("LOI Bottom Ash", "Cba"),
    ("UBC IN BOTTOM ASH", "Cba"), ("UBC Bottom Ash", "Cba"),
    # Bare "Bottom Ash (%)" / "Bottom Ash %" and "Unburnts in Bottom ash" —
    # real header text as seen on Lab Report / Previous LOI / Boiler
    # Efficiency sheets, where this column IS the loss-on-ignition /
    # unburnt-carbon reading, not the ash-split percentage (see the
    # LABEL_ALIASES note in routes/upload.py for the Cba/Pba ambiguity this
    # was previously losing to).
    ("Bottom Ash (%)", "Cba"), ("Bottom Ash %", "Cba"), ("Bottom Ash", "Cba"),
    ("Unburnts in Bottom ash", "Cba"), ("Unburnts in Bottom Ash", "Cba"),
    ("Unburnt in Bottom Ash", "Cba"),

    # ── Cfa — Unburnt C Fly Ash ────────────────────────────────────────────
    ("Unburnt Carbon Fly Ash", "Cfa"), ("Fly Ash Unburnt Carbon", "Cfa"),
    ("Unburnt carbon in Fly Ash ESP", "Cfa"), ("Fly Ash UBC", "Cfa"),
    ("Fly Ash - ESP (%)", "Cfa"), ("LOI Fly Ash", "Cfa"), ("Economizer Unburnt Carbon", "Cfa"),
    ("UBC IN FLY ASH", "Cfa"), ("UBC Fly Ash", "Cfa"),
    # Bare "Fly Ash (%)" / "Fly Ash %" and "Unburnts in Fly ash" — same
    # reasoning as the bare Bottom Ash entries above.
    ("Fly Ash (%)", "Cfa"), ("Fly Ash %", "Cfa"), ("Fly Ash", "Cfa"),
    ("Unburnts in Fly ash", "Cfa"), ("Unburnts in Fly Ash", "Cfa"),
    ("Unburnt in Fly Ash", "Cfa"),

    # ── Pfa — % Fly Ash (of TOTAL ash — distinct from the Cfa unburnt-
    #    carbon reading above; always explicitly qualified with "total"
    #    in real sheets so it isn't confused with bare "Fly Ash %") ───────
    ("% Fly Ash", "Pfa"), ("Fly Ash Percentage", "Pfa"), ("Fly Ash Fraction", "Pfa"),
    ("Fly Ash Ratio", "Pfa"), ("Percent Fly Ash", "Pfa"),
    ("% of Fly Ash in Total Ash", "Pfa"), ("Fly Ash in Total Ash", "Pfa"),
    ("Fly Ash % of Total Ash", "Pfa"),

    # ── Pba — % Bottom Ash (of TOTAL ash) ───────────────────────────────────
    ("% Bottom Ash", "Pba"), ("Bottom Ash Percentage", "Pba"), ("Bottom Ash Fraction", "Pba"),
    ("Bottom Ash Ratio", "Pba"), ("Percent Bottom Ash", "Pba"),
    ("% of Bottom Ash in Total Ash", "Pba"), ("Bottom Ash in Total Ash", "Pba"),
    ("Bottom Ash % of Total Ash", "Pba"),

    # ── M — Moisture (coal proximate, "as fired") ─────────────────────────
    # CENPEEP's "M" field is specifically TOTAL Moisture (TM) — the figure
    # the boiler-efficiency formula actually uses. Inherent Moisture (IM)
    # is a DIFFERENT lab quantity (moisture retained inside the coal
    # matrix itself, always smaller than TM) reported alongside TM on the
    # same Coal Analysis sheet — not interchangeable with it. "IM %" /
    # "Inherent Moisture" used to be listed here as if they were the same
    # field, so a sheet with BOTH columns matched "IM %" as well as
    # "T.M. %" for M, and both survived into the result (their headers
    # got joined together in the "detected from" display, e.g.
    # "IM % + T.M. %") instead of TM alone. See the explicit IM rejection
    # in OUT_OF_SCOPE_EXAMPLES below.
    ("Moisture", "M"), ("Moisture %", "M"),
    ("Total Moisture", "M"), ("TM %", "M"), ("Moisture As Received", "M"),
    ("Coal Moisture", "M"), ("M %", "M"), ("T.M. %", "M"), ("TM%", "M"),
    ("% Moist ( TM)", "M"), ("% Moist (TM)", "M"), ("Percent Moisture TM", "M"),

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
    ("Coal GCV", "GCV"), ("G.C.V. (KCal/Kg)", "GCV"),

    # ── S — Sulfur ────────────────────────────────────────────────────────────
    ("Sulfur", "S"), ("Sulphur", "S"), ("Sulfur %", "S"), ("S %", "S"),
    ("Total Sulphur", "S"),

    # ── O2in — O2 APH In ────────────────────────────────────────────────────
    ("O2 at APH Inlet", "O2in"), ("O2 APH In", "O2in"), ("O2 at APH I/L Left", "O2in"),
    ("O2 at APH I/L Right", "O2in"), ("O2 APH Inlet %", "O2in"), ("Oxygen APH Inlet", "O2in"),
    ("O2 Air Preheater Inlet", "O2in"), ("O2 IN FG BEFORE APH", "O2in"), 
    ("O2 BEFORE APH", "O2in"), ("O2 IN FG BEFORE  APH", "O2in"),
    # "GAH" = Gas Air Heater, this is simply an alternate plant naming for
    # the air preheater (APH) — same physical equipment, different acronym.
    ("GAH I/L O2 Left", "O2in"), ("GAH I/L O2 Right", "O2in"), ("GAH Inlet O2", "O2in"),
    ("GAH I/L O2", "O2in"), ("GAH I/L O2 average", "O2in"),
    # Real DCS-tag ordering puts "GAS" between the APH side and "O2%"
    # ("APH-A I/L GAS O2%") rather than "O2 ... APH Inlet". Without an
    # example in this exact word order, this was losing on char n-gram
    # overlap to the Tgi ("...GAS TEMP AH I/L...") examples below, which
    # share "GAS"/"APH"/"I/L" with this header but are a totally different
    # reading (temperature, not O2) — it was being detected as flue gas
    # temperature instead of O2.
    ("APH-A I/L GAS O2%", "O2in"), ("APH-B I/L GAS O2%", "O2in"),
    ("APH I/L GAS O2%", "O2in"), ("APH-A INLET GAS O2", "O2in"),
    ("APH-B INLET GAS O2", "O2in"), ("APH INLET GAS O2 PERCENT", "O2in"),
    # "O2 AT ECO OUTLET" / "O2 AT OUTLET" (LHS/RHS split) -- real CSTPS
    # hourly-log headers. Same reasoning as the "FG Temp After Eco" -> Tgi
    # entries above: on this plant's gas path the economizer sits directly
    # upstream of the APH with nothing in between, so the O2 reading at the
    # ECO OUTLET is physically the same point as the APH-inlet O2 reading
    # CENPEEP wants -- it's just named for where the gas is leaving (the
    # economizer) rather than where it's arriving (the APH). "O2 AT OUTLET"
    # (no "ECO") is the same tag with the middle word dropped, seen on a
    # sibling unit's sheet from the same plant. Previously this drifted
    # onto O2out instead (via "O2 at APH Outlet", sharing the word
    # "OUTLET"), which is backwards: an ECO-outlet reading is UPSTREAM of
    # the APH, i.e. the inlet side, not the outlet side.
    ("O2 AT ECO OUTLET", "O2in"), ("O2 AT ECO OUTLET LHS", "O2in"),
    ("O2 AT ECO OUTLET RHS", "O2in"), ("O2 AT OUTLET", "O2in"),
    ("O2 AT OUTLET LHS", "O2in"), ("O2 AT OUTLET RHS", "O2in"),

    # ── CO2in — CO2 APH In ──────────────────────────────────────────────────
    ("CO2 at APH Inlet", "CO2in"), ("CO2 APH In", "CO2in"), ("CO2 Air Preheater Inlet", "CO2in"),

    # ── COin — CO APH In ──────────────────────────────────────────────────────
    ("CO at APH Inlet", "COin"), ("CO APH In", "COin"), ("CO Air Preheater Inlet ppm", "COin"),

    # ── O2out — O2 APH Out ───────────────────────────────────────────────────
    ("O2 at APH Outlet", "O2out"), ("O2 APH Out", "O2out"), ("O2 at APH O/L Left", "O2out"),
    ("O2 at APH O/L Right", "O2out"), ("O2 APH Outlet %", "O2out"), ("Oxygen APH Outlet", "O2out"),
    ("O2 Air Preheater Outlet", "O2out"),
    ("GAH O/L O2 Left", "O2out"), ("GAH O/L O2 Right", "O2out"), ("GAH Outlet O2", "O2out"),
    ("GAH O/L O2", "O2out"),
    # Real DCS tag phrasing seen on "dayly data" / "Hourly data" exports —
    # aggregated column and raw per-side columns for the same reading.
    ("O2 APH O/L", "O2out"), ("APH A OUTL GAS O2 CT", "O2out"), ("APH B OUTL GAS O2 CT", "O2out"),

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
    ("Primary APH I/L FG Temp (L)", "Tgi"), ("Primary APH I/L FG Temp (R)", "Tgi"),
    # Full-word "(left)"/"(Right)" parenthetical forms, mirroring the ones
    # already present for Tgo below. Without these, a header like "Primary
    # APH I/L FG Temp (left)" was landing on Tgo instead of Tgi: the only
    # near-identical training example with that exact "(left)"/"(Right)"
    # wording was the Tgo one differing by a single I/O character, so it
    # won on char n-gram similarity over the abbreviated Tgi "(L)"/"(R)" forms.
    ("Primary APH I/L FG Temp (left)", "Tgi"), ("Primary APH I/L FG Temp (Right)", "Tgi"),
    ("Secondry APH I/L FG Temp (Left)", "Tgi"), ("Secondry APH I/L FG Temp (Right)", "Tgi"),
    ("Secondry APH I/L FG Temp  (Left)", "Tgi"), ("Secondry APH I/L FG Temp  (Right)", "Tgi"),
    ("GAH I/L Temp (left)", "Tgi"), ("GAH I/L Temp (Right)", "Tgi"), ("GAH Inlet FG Temp", "Tgi"),
    ("GAH I/L Temp", "Tgi"), ("GAH I/L Temp average", "Tgi"),
    # "FG temp after economiser/ECO" — on this plant's gas path the economizer
    # is immediately upstream of the APH (nothing else in between), so this
    # reading IS the APH-inlet flue-gas temp, just named for where the gas is
    # coming FROM instead of where it's arriving TO. Confirmed against a real
    # plant report that labels this exact header pair "Flue gas temperature
    # at APH I/L". Includes the merged-word DCS-export form ("TEMPAFTERECO")
    # seen on real sheets, with and without a space before "AFTERECO".
    ("FG Temp After Eco", "Tgi"), ("FG Temp After Eco Left", "Tgi"),
    ("FG Temp After Eco Right", "Tgi"), ("FG TEMPAFTERECO- L", "Tgi"),
    ("FG TEMP AFTERECO- R", "Tgi"), ("FG TEMPAFTERECO L", "Tgi"),
    ("FG TEMPAFTERECO R", "Tgi"), ("FG Temp After Economiser", "Tgi"),
    ("FG Temp After Economiser Left", "Tgi"), ("FG Temp After Economiser Right", "Tgi"),
    ("Flue Gas Temp After Economiser", "Tgi"), ("Flue Gas Temperature After Economiser", "Tgi"),
    ("ECO Outlet FG Temp", "Tgi"), ("ECO O/L FG Temp", "Tgi"),
    ("ECO O/L FG Temp Left", "Tgi"), ("ECO O/L FG Temp Right", "Tgi"),
    ("Economizer Outlet Gas Temp", "Tgi"), ("Economizer Outlet Flue Gas Temperature", "Tgi"),
    ("Economizer exit temperature", "Tgi"),
    ("GAS ECO O/L Temp average", "Tgi"), ("GAS ECO O/L Temp (Left)", "Tgi"),
    ("GAS ECO O/L Temp (Right)", "Tgi"),
    # "FG GAS TEMP AH I/L" -- real DCS-tag form using bare "AH" (Air Heater)
    # instead of "APH"/"GAH", plus the redundant "FG GAS" wording seen on
    # real hourly exports. Without an explicit anchor here, this drifted
    # onto Tsai (Secondary Air Temp In) instead: the existing Tsai examples
    # "AH A SA I/L TEMP" etc. share the same "AH I/L TEMP" tail, and with
    # no Tgi example using bare "AH", those won on char n-gram overlap --
    # even though this is a FLUE GAS reading, not an air reading. Keep the
    # "FG"/"GAS" word present so it doesn't start competing with the real
    # (air-side) "AH I/L TEMP" columns.
    ("FG GAS TEMP AH I/L", "Tgi"), ("FG GAS TEMP AH I/L (L)", "Tgi"),
    ("FG GAS TEMP AH I/L (R)", "Tgi"), ("FG GAS TEMP AH I/L Left", "Tgi"),
    ("FG GAS TEMP AH I/L Right", "Tgi"), ("FG TEMP AH I/L", "Tgi"),
    ("FG TEMP AH INLET", "Tgi"), ("FG GAS TEMP AH Inlet", "Tgi"),
    # A dedicated "APH-<side> I/L GAS TEMP" sensor tag (side spelled out as
    # A/B rather than Left/Right, "GAS TEMP" instead of "FG Temp") is a
    # DIRECT APH-inlet reading — the most on-the-nose Tgi wording there is,
    # and should win over the (intentionally looser) economiser-outlet
    # proxy examples above whenever a real plant has both. Previously the
    # closest match here was the generic "FG GAS TEMP AH I/L" example,
    # scoring lower than "ECO O/L FG Temp" on a real plant sheet that had
    # both an economiser-outlet AND a dedicated APH-inlet column — so the
    # proxy reading was selected over the direct one.
    ("APH-A I/L GAS TEMP", "Tgi"), ("APH-B I/L GAS TEMP", "Tgi"),
    ("APH I/L GAS TEMP", "Tgi"), ("APH-A INLET GAS TEMP", "Tgi"),
    ("APH-B INLET GAS TEMP", "Tgi"), ("APH INLET GAS TEMPERATURE", "Tgi"),
    # Bare "FLUE GAS TEMP BEFORE APH" (LHS/RHS split, real CSTPS hourly-log
    # header) -- plain-English "before APH" wording with no APH-I/L/AH-tag
    # abbreviation at all. Without a direct anchor, this drifted hard onto
    # O2in via the "O2 BEFORE APH" example (cosine ~0.65): both share the
    # long literal substring " BEFORE APH", and since the model scores
    # char n-grams only, that shared tail dominated over the fact that
    # "FLUE GAS TEMP" vs "O2" are completely different physical quantities.
    # Anchoring the exact real phrasing here (rather than relying on the
    # existing "APH I/L"-style examples) is what actually wins the match.
    ("FLUE GAS TEMP BEFORE APH", "Tgi"), ("FLUE GAS TEMP BEFORE APH LHS", "Tgi"),
    ("FLUE GAS TEMP BEFORE APH RHS", "Tgi"), ("FLUE GAS TEMP BEFORE APH LEFT", "Tgi"),
    ("FLUE GAS TEMP BEFORE APH RIGHT", "Tgi"),

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
    ("Primary APH O/L FG Temp (left)", "Tgo"), ("Primary APH O/L FG Temp (Right)", "Tgo"),
    ("Secondry APH O/L FG Temp  (Left)", "Tgo"), ("Secondry APH O/L FG Temp  (Right)", "Tgo"),
    # "GAH" = Gas Air Heater (this plant's alternate name for APH). Multiple
    # numbered probes per side (1/2/3) are all the same physical outlet
    # reading — averaged in the same way the Left/Right pairs already are.
    ("GAH O/L Temp 1 (Left)", "Tgo"), ("GAH O/L Temp 2 (Left)", "Tgo"), ("GAH O/L Temp 3 (Left)", "Tgo"),
    ("GAH O/L Temp 1 (Right)", "Tgo"), ("GAH O/L Temp 2 (Right)", "Tgo"), ("GAH O/L Temp 3 (Right)", "Tgo"),
    ("GAH O/L Temp average", "Tgo"), ("GAH Outlet FG Temp", "Tgo"), ("GAH O/L Temp", "Tgo"),
    # "FG temp after APH" — the merged-word DCS-export counterpart to the
    # "FG temp after ECO" Tgi examples above. Needed as an explicit anchor:
    # "AFTERECO" and "AFTERAPH" differ by only a few characters, so without
    # a close Tgo match of its own, this header drifts onto Tgi purely on
    # char n-gram overlap with the "after ECO" wording.
    ("FG Temp After APH", "Tgo"), ("FG Temp After APH Left", "Tgo"),
    ("FG Temp After APH Right", "Tgo"), ("FG TEMP AFTERAPH - L", "Tgo"),
    ("FG TEMP AFTERAPH - R", "Tgo"), ("FG TEMPAFTERAPH- L", "Tgo"),
    ("FG TEMPAFTERAPH- R", "Tgo"),
    # "FG GAS TEMP AH O/L" -- bare-"AH" DCS-tag counterpart to the Tgi "AH
    # I/L" fix above, for the outlet side. Was drifting onto Tsao
    # (Secondary Air Temp Out) via the near-identical "AH O/L TEMP" tail
    # shared with Tsao's "AH A SA O/L TEMP" examples -- same root cause,
    # mirrored for the hot/outlet side.
    ("FG GAS TEMP AH O/L", "Tgo"), ("FG GAS TEMP AH O/L (L)", "Tgo"),
    ("FG GAS TEMP AH O/L (R)", "Tgo"), ("FG GAS TEMP AH O/L Left", "Tgo"),
    ("FG GAS TEMP AH O/L Right", "Tgo"), ("FG TEMP AH O/L", "Tgo"),
    ("FG TEMP AH O/L (R)", "Tgo"), ("FG TEMP AH O/L (L)", "Tgo"),
    ("FG TEMP AH OUTLET", "Tgo"), ("FG GAS TEMP AH Outlet", "Tgo"),
    # Bare "FLUE GAS TEMP AFTER APH" (LHS/RHS split) -- same real CSTPS
    # header pattern as the Tgi "BEFORE APH" fix above, mirrored for the
    # outlet/hot side. Was previously landing on Tgi itself (via "Flue Gas
    # Temp APH Inlet") or on Tpao (via "FG Temp After APH", which shares
    # "TEMP AFTER APH" with this but is a Primary-Air example) -- direct
    # anchor removes the ambiguity.
    ("FLUE GAS TEMP AFTER APH", "Tgo"), ("FLUE GAS TEMP AFTER APH LHS", "Tgo"),
    ("FLUE GAS TEMP AFTER APH RHS", "Tgo"), ("FLUE GAS TEMP AFTER APH LEFT", "Tgo"),
    ("FLUE GAS TEMP AFTER APH RIGHT", "Tgo"),

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
    ("Primary Air Fan Outlet Temperature", "Tpai"), ("AH A PA I/L TEMP", "Tpai"),
    ("AH B PA I/L TEMP", "Tpai"), ("AH A PA I/L Temp", "Tpai"), ("AH B PA I/L Temp", "Tpai"),
    # A bare "Primary Air Temp" column (no explicit in/out qualifier) paired
    # with separate "APH A/B O/L PA Air Temp" columns for the hot side means
    # the bare column is the cold, pre-APH reading — confirmed against real
    # plant data (~30-40°C vs ~350-500°C for the APH-outlet columns).
    ("Primary Air Temp", "Tpai"), ("GAH I/L Prim Air Temp", "Tpai"),
    # "APH. <side> INLET PA. TMP" — this plant's own DCS-tag wording
    # ("PA." abbreviated with a trailing period, "TMP" instead of "Temp").
    # Without a direct match here, this drifted onto O2in: the abbreviated
    # "INLET"/"APH" overlap with "O2 APH Inlet %" scored higher than any
    # existing Tpai example, even though this is a TEMPERATURE reading.
    ("APH. A INLET PA. TMP", "Tpai"), ("APH. B INLET PA. TMP", "Tpai"),
    ("APH A INLET PA TMP", "Tpai"), ("APH B INLET PA TMP", "Tpai"),
    ("APH INLET PA TMP", "Tpai"),
    # Bare "PA TEMP BEFORE APH" (no L/R split -- a single shared cold-side
    # PA temp reading, as seen on real CSTPS hourly-log sheets). This was
    # previously the single worst mismatch found in practice: it matched
    # O2in via "O2 BEFORE APH" at cosine ~0.89 (higher than almost any
    # correct match anywhere else in the model), purely because "TEMP
    # BEFORE APH" and "BEFORE APH" share such a long character run that it
    # swamped the completely different leading quantity words ("PA" vs
    # "O2"). A temperature column was silently feeding a flue-gas-O2 input.
    ("PA TEMP BEFORE APH", "Tpai"),

    # ── Tpao — PA Temp Out (APH outlet / boiler windbox side, HOT) ──────────
    ("Primary Air Temp Out", "Tpao"), ("PA Temp Out", "Tpao"),
    ("Primary Air APH Temp O/L A", "Tpao"), ("Primary Air APH Temp O/L B", "Tpao"),
    ("Primary Air Outlet Temperature", "Tpao"),
    # NOTE: "Boiler side PA Temp" is the HOT/post-APH reading in real plant
    # data (~380°C, entering the mills/furnace) — confirmed against sample data.
    ("Boiler side A PA Temp", "Tpao"), ("Boiler side B PA Temp", "Tpao"),
    ("Boiler side PA Temperature", "Tpao"), ("AH A PA O/L TEMP", "Tpao"),
    ("AH B PA O/L TEMP", "Tpao"), ("AH A PA O/L Temp", "Tpao"),
    ("AH B PA O/L Temp", "Tpao"),
    ("APH A O/L PA AIR TEMP", "Tpao"), ("APH B O/L PA AIR TEMP", "Tpao"),
    # This plant calls the hot, post-APH primary air reading "<side> SIDE
    # HOT PA. TMP." — no explicit "APH"/"O/L" wording at all, just "HOT PA
    # TMP", which previously had no anchor and fell through to Tgi (flue
    # gas temp) at just-above-threshold confidence purely via generic
    # "side"/"temp" overlap.
    ("LEFT SIDE HOT PA. TMP.", "Tpao"), ("RIGHT SIDE HOT PA. TMP.", "Tpao"),
    ("LEFT SIDE HOT PA TMP", "Tpao"), ("RIGHT SIDE HOT PA TMP", "Tpao"),
    ("HOT PA TMP", "Tpao"), ("HOT PRIMARY AIR TEMP", "Tpao"),
    # Bare "PA TEMP AFTER APH" (LHS/RHS split) -- real CSTPS header,
    # mirrors the "PA TEMP BEFORE APH" -> Tpai fix above for the hot/
    # outlet side. Was previously landing on Tgo via "FG Temp After APH"
    # (shared "TEMP AFTER APH" tail) -- a Primary Air temperature reading
    # was being used as the flue-gas-outlet temperature.
    ("PA TEMP AFTER APH", "Tpao"), ("PA TEMP AFTER APH LHS", "Tpao"),
    ("PA TEMP AFTER APH RHS", "Tpao"), ("PA TEMP AFTER APH LEFT", "Tpao"),
    ("PA TEMP AFTER APH RIGHT", "Tpao"),

    # ── Tsai — SA Temp In (APH inlet / fan-outlet side, COLD) ────────────────
    ("Secondary Air Temp In", "Tsai"), ("SA Temp In", "Tsai"),
    ("Secondary Air APH Temp I/L A", "Tsai"), ("Secondary Air APH Temp I/L B", "Tsai"),
    ("Secondary Air Inlet Temperature", "Tsai"),
    # NOTE: "FDF O/L SA Temp" (Forced Draft Fan outlet) is the COLD/pre-APH
    # reading in real plant data (~30°C) — confirmed against sample data.
    ("FDF-A O/L SA Temp", "Tsai"), ("FDF O/L SA Temp", "Tsai"),
    ("Forced Draft Fan Outlet Temperature", "Tsai"), ("AH A SA I/L TEMP", "Tsai"),
    ("AH B SA I/L TEMP", "Tsai"), ("AH A SA I/L Temp", "Tsai"), ("AH B SA I/L Temp", "Tsai"),
    # Same logic as the bare "Primary Air Temp" case above.
    ("Secondary Air Temp", "Tsai"), ("GAH I/L Sec Air Temp", "Tsai"),
    # "Secondry" (misspelling of "Secondary") plant-tag variant. Without this,
    # a header like "Secondry Air APH Temp I/L A" lost to the Tgi training
    # example "Secondry APH I/L FG Temp (Left)" — both share the same
    # "Secondry" typo, so char n-grams favored that over the correctly
    # spelled "Secondary Air APH Temp I/L A" Tsai example — even though this
    # column is an air temperature, not a flue-gas temperature.
    ("Secondry Air APH Temp I/L A", "Tsai"), ("Secondry Air APH Temp I/L B", "Tsai"),
    # Bare "AIR TEMP AH I/L" (no PA/SA qualifier, bare "AH" abbreviation) --
    # real plant tag naming with the qualifier dropped. Explicit anchor so
    # this doesn't get pulled toward the new Tgi "FG TEMP AH I/L" examples
    # above (which share the same "TEMP AH I/L" tail, differing only in
    # "AIR" vs "FG"/"GAS") -- this is still an AIR reading, not flue gas.
    ("AIR TEMP AH I/L", "Tsai"), ("AIR TEMP AH I/L (L)", "Tsai"), ("AIR TEMP AH I/L (R)", "Tsai"),
    # This plant's own DCS-tag wording: "APH. <side> INLET SEC AIR TMP. <n>"
    # (numbered probes 1/3 at the same reading point). Without a direct
    # match, this form was drifting onto O2in (shared abbreviated
    # "APH ... INLET" wording).
    ("APH. A INLET SEC AIR TMP.", "Tsai"), ("APH. B INLET SEC AIR TMP.", "Tsai"),
    ("APH A INLET SEC AIR TMP", "Tsai"), ("APH B INLET SEC AIR TMP", "Tsai"),
    ("APH INLET SEC AIR TMP", "Tsai"),
    ("SEC AIR BOX INLET TEMP", "Tsai"), ("SECONDARY AIR BOX INLET TEMP", "Tsai"),
    # Bare "SA TEMP BEFORE APH" -- same real CSTPS header pattern as "PA
    # TEMP BEFORE APH" above, for Secondary Air. Same failure mode: was
    # matching O2in via "O2 BEFORE APH" at cosine ~0.88.
    ("SA TEMP BEFORE APH", "Tsai"),

    # ── Tsao — SA Temp Out (APH outlet / boiler windbox side, HOT) ──────────
    ("Secondary Air Temp Out", "Tsao"), ("SA Temp Out", "Tsao"),
    ("Secondary Air APH Temp O/L A", "Tsao"), ("Secondary Air APH Temp O/L B", "Tsao"),
    ("Secondary Air Outlet Temperature", "Tsao"),
    # NOTE: "Boiler side SA Temp" is the HOT/post-APH reading in real plant
    # data (~370°C, entering the windbox) — confirmed against sample data.
    ("Boiler side A SA Temp", "Tsao"), ("Boiler side B SA Temp", "Tsao"),
    ("Boiler side SA Temperature", "Tsao"), ("AH A SA O/L TEMP", "Tsao"),
    ("AH B SA O/L TEMP", "Tsao"), ("AH A SA O/L Temp", "Tsao"),
    ("AH B SA O/L Temp", "Tsao"),
    ("APH A O/L SA AIR TEMP", "Tsao"), ("APH B O/L SA AIR TEMP", "Tsao"),
    # "Secondry" typo variant -- same reasoning as the Tsai fix above, for
    # the outlet/hot side.
    ("Secondry Air APH Temp O/L A", "Tsao"), ("Secondry Air APH Temp O/L B", "Tsao"),
    # Real plant tag naming this from the FURNACE's point of view instead
    # of the APH's — "secondary air arriving at the furnace inlet" is the
    # same physical hot/post-APH reading, just named for where it lands
    # rather than where it left.
    ("FURNACE L_SIDE INL SA T", "Tsao"), ("FURNACE R_SIDE INL SA T", "Tsao"),
    ("Furnace L Side Inlet SA Temp", "Tsao"), ("Furnace R Side Inlet SA Temp", "Tsao"),
    # This plant's own DCS-tag wording for the same "air arriving at the
    # furnace/boiler after the APH" reading as the FURNACE examples just
    # above: "BLR <side> SEC AR BX ILT 2 AR TEMP <n>" ("boiler <side>
    # secondary air box inlet, level 2, air temp" -- numbered probes 1/2 at
    # the same reading point). This was previously mislabeled as Tsai
    # (cold/pre-APH side) purely because it shares "SEC AIR"/"INLET"
    # wording with the Tsai APH-inlet tags -- but "SEC AR BX ILT" is the
    # boiler's windbox inlet, i.e. hot secondary air that has ALREADY
    # passed through the APH on its way to the furnace, same as
    # "FURNACE L_SIDE INL SA T" above. Confirmed against real plant data.
    ("BLR LS SEC AR BX ILT 2 AR TEMP", "Tsao"), ("BLR RS SEC AR BX ILT 2 AR TEMP", "Tsao"),
    # "APH O/L SEC AIR TEMPERATURE" -- explicit "O/L" (outlet) direction
    # with the fuller "SEC AIR"/"TEMPERATURE" spelling. Was previously
    # drifting onto Tsai (the INLET/cold-side field) purely because "SEC
    # AIR TEMPERATURE" as a phrase is more common among Tsai's training
    # examples than Tsao's -- the "O/L" direction marker was losing that
    # tug-of-war. Anchoring it here fixes the direction.
    ("APH O/L SEC AIR TEMPERATURE", "Tsao"), ("APH O/L SEC AIR TEMPERATURE RHS", "Tsao"),
    ("APH O/L SEC AIR TEMPERATURE LHS", "Tsao"),
    # Bare "SA TEMP AFTER APH" (LHS/RHS split) -- real CSTPS header,
    # mirrors the "PA TEMP AFTER APH" -> Tpao fix above for Secondary Air.
    # Was previously landing on Tgo via "FG Temp After APH".
    ("SA TEMP AFTER APH", "Tsao"), ("SA TEMP AFTER APH LHS", "Tsao"),
    ("SA TEMP AFTER APH RHS", "Tsao"), ("SA TEMP AFTER APH LEFT", "Tsao"),
    ("SA TEMP AFTER APH RIGHT", "Tsao"),

    # ── Fsa — SA Flow ──────────────────────────────────────────────────────────
    ("Secondary Air Flow", "Fsa"), ("SA Flow", "Fsa"), ("SA air flow", "Fsa"),
    ("Boiler side A SA flow", "Fsa"), ("Boiler side B SA flow", "Fsa"),
    ("Total Secondary Air Flow", "Fsa"), ("SA FLOW TO FURNACE - L", "Fsa"),
    ("SA FLOW TO FURNACE - R", "Fsa"), ("SA FLOW TO FURNACE", "Fsa"),
    # "SA ... FLOW COMP" (compensated flow reading) -- real DCS-tag form.
    # Explicit anchor needed: after adding the new Ffw "MAIN STM FLOW COMP"
    # examples (for the "STM"-abbreviation fix), this started drifting onto
    # Ffw purely via the shared "FLOW COMP" tail -- even though it's a
    # Secondary Air flow reading, not steam/feedwater flow.
    ("SA (L) FLOW COMP", "Fsa"), ("SA (R) FLOW COMP", "Fsa"), ("SA FLOW COMP", "Fsa"),

    # ── Fpa — PA Flow ──────────────────────────────────────────────────────────
    ("Primary Air Flow", "Fpa"), ("PA Flow", "Fpa"), ("PA air flow", "Fpa"),
    ("Coal Mill A PA Flow", "Fpa"), ("Coal Mill PA Flow", "Fpa"),
    ("Total Primary Air Flow", "Fpa"), ("TOTAL PA FLOW", "Fpa"),
    ("Total PA Flow", "Fpa"),
    # Same "... FLOW COMP" fix as SA above, for Primary Air.
    ("PA-A FLOW COMP", "Fpa"), ("PA-B FLOW COMP", "Fpa"), ("PA FLOW COMP", "Fpa"),

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
    # "HPT EXHAUST STEAM TEMP" -- turbine HP-exhaust steam temperature,
    # real CSTPS header. Same family as the HRH/CRH Steam Temp entries
    # just above (a steam TEMPERATURE reading with no dedicated CENPEEP
    # field), but without its own anchor it was drifting onto Ffw (Steam
    # Flow) purely via the shared word "STEAM" -- a temperature column
    # would otherwise get used as the flow input.
    "HPT Exhaust Steam Temp", "HPT EXHAUST STEAM TEMP",
    "HRH Steam Temp", "HRH Steam Press", "HRH Temp", "HRH Pressure",
    "SH Spray Flow", "RH Spray Flow", "RH Spray Temp", "Total SH Spray", "Total RH Spray",
    "Feedwater HP HTR inlet temp", "Feed water Eco inlet temp", "Feed water Eco outlet Temp",
    # Real DCS-export wording for the same feedwater-side readings — these
    # are WATER temperatures, not flue-gas temperatures, and must not be
    # pulled into Tgi just because they also say "after economiser".
    "FW TEMPERATURE BEFORE ECONOMISER", "FW TEMPERATURE AFTER ECONOMISER",
    "FW Temp Before Economiser", "FW Temp After Economiser",
    "Feed Water Temperature Before Economiser", "Feed Water Temperature After Economiser",
    "HPH Ext STM pressure", "HPH Ext STM temp", "HPH Drain Temp",
    "HPH I/L Feedwater Temp", "HPH O/L Feedwater Temp",
    "Enthalpy FW HPH O/L", "Enthalpy FW HPH I/L", "Extraction Enthalpy HPH",
    "Drip Enthalpy HPH", "Extraction Flow HPH", "MS Enthalpy", "HRH Enthalpy",
    "CRH Enthalpy", "FW Enthalpy", "RH Flow", "Attemperation Enthalpy", "THR",
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
    # Abbreviated form seen on real DCS exports ("FURNACE PR") — without this,
    # the "PR" abbreviation loses enough char-gram overlap with "pressure"
    # that it drifted onto Fsa (Secondary Air Flow) instead, purely because
    # both share the word "FURNACE". Windbox DP is the same kind of
    # pressure/draft reading, also abbreviated.
    "FURNACE PR", "Furnace Pr", "WINDBOX DP", "Windbox Differential Pressure",
    # Furnace-exit gas temp is a real plant reading but a DIFFERENT, further
    # upstream point in the flue-gas path (before the economizer) than the
    # APH inlet reading Tgi represents — do not substitute.
    "Furnace exit FG temp", "Furnace exit gas temperature",
    "MAIN STEAM Pressure",
    "MAIN STEAM Temp", "CRH STEAM", "HRH STEAM TEMP", "CONDENSOR VACCUM",
    "SH SPARY FLOW(L)", "SH SPARY FLOW(R)", "RH SPARY FLOW(L)", "RH SPARY FLOW(R)",
    "HPH-5A EXTRACTION STEAM PRESSURE", "HPH -5A EXTRACTION STEAM TEMPERATURE",
    "PA Fan-A MTR CURRENT", "PA Fan-B MTR CURRENT", "FDF-A MTR CURRENT",
    "FDF-B MTR CURRENT", "SCC",
    # A pressure reading at the same location as the Feedwater Eco inlet
    # temp (Ffw's neighboring column on many sheets) — same location, but a
    # pressure, not a flow, so it must not be pulled into Ffw just because
    # the location wording overlaps.
    "Feedwater Eco inlet Press", "Feed water Eco inlet Press", "ECON FD WTR INLT PRESS",
    # "O2 AT ECO INLET" (LHS/RHS split) -- real CSTPS header. This is a
    # DIFFERENT, further-upstream reading than "O2 AT ECO OUTLET"/"O2 AT
    # OUTLET" (mapped to O2in above): the ECO inlet is right at the
    # furnace/superheater exit, well before the economizer, not the
    # APH-inlet point CENPEEP's O2in wants. Explicitly rejecting it here
    # (rather than leaving it to fall through) stops it from being pulled
    # into O2in and averaged together with the correct ECO-outlet reading
    # -- which would silently blend two different physical locations into
    # one "average" instead of keeping the correct one.
    "O2 AT ECO INLET", "O2 AT ECO INLET LHS", "O2 AT ECO INLET RHS",
    # "FLUE GAS TEMP BEFORE ECO" (LHS/RHS split) -- real CSTPS header, a
    # further-upstream reading (furnace/superheater exit) than "FLUE GAS
    # TEMP BEFORE APH", which is the real, dedicated APH-inlet column
    # already present on the same sheet (see the bare-phrasing Tgi anchor
    # above). Rejecting this explicitly stops the two from being averaged
    # together as if they were the same reading -- same reasoning as the
    # "O2 AT ECO INLET" rejection just above.
    "FLUE GAS TEMP BEFORE ECO", "FLUE GAS TEMP BEFORE ECO LHS", "FLUE GAS TEMP BEFORE ECO RHS",
    "MS pressure boiler outlet(Left)", "MS pressure boiler outlet(Right)",
    "MS TEMP (left) boiler outlet", "MS TEMP (Right) boiler outlet",
    "HRH temp left boiler outlet", "HRH temp right boiler outlet",
    "CRH Press left", "CRH Press Right",
    "Primary SH Inlet Steam Temp Left", "Primary SH Inlet Steam Temp Right",
    "Primary SH Inlet Steam Press Left", "Primary SH Inlet Steam Press Right",
    # Metal/tube temperatures — real readings, but not a CENPEEP input field.
    "FSH Metal Temp", "PSH Metal Temp", "DIVISH Metal Temp", "RH Metal Temp",
    "LTSH Metal Temp", "LTRH Metal Temp",
    # Hydraulic system pressure — unrelated to any CENPEEP field.
    "SSC HYD PR", "SSC HYD PR Hourly average", "SSC HYD PR hourly maximum",
    "SSC PWR PACK PRESS",
    # "GAH" = this plant's alternate name for APH; these are draft/pressure
    # readings (not temperatures), same rejection reasoning as the "APH
    # inlet/outlet FG pressure" entries above.
    "GAH inlet pressure (Left)", "GAH inlet pressure (Right)",
    "GAH O/L pressure (Left)", "GAH O/L pressure (Right)",
    "FDF A CURRENT", "FDF B CURRENT", "IDF A CURRENT", "IDF B CURRENT",
    "FURNACE DRAFT",
    # Text-valued column naming which coal grade is blended in (e.g. "GAR
    # 4200"), not a numeric percentage reading — shares "blend"/"ratio"
    # vocabulary with Pfa/Pba but is not interchangeable with either.
    "Coal blend ratio", "Coal Blend Grade", "GRADE 1", "GRADE 2",
    # "Total Air Flow" is a real sensor reading, not a structural/ID column
    # (previously it was wrongly hard-coded into NON_FIELD_HEADERS below,
    # which silently dropped it before it was ever scored). It also isn't
    # one of the 42 CENPEEP fields — Fpa/Fsa cover primary/secondary air
    # flow separately, but there's no "total air flow" field id — so
    # forcing a guess (it was landing on Fpa via "TOTAL PA FLOW") would be
    # wrong too. OUT_OF_SCOPE correctly reports it as "recognised, but not
    # a mappable field" rather than either silently excluding it or
    # mismatching it. Flag to the business team: either add a field id for
    # it, or confirm it should stay unmapped.
    "Total Air flow", "Total Air Flow", "TOTAL AIR FLOW",
    # ── Abbreviated real DCS/hourly-export headers that were being pulled
    #    into a real field by leftover char n-gram overlap. Each is a real
    #    plant reading, just not one of the 42 CENPEEP fields (or not the
    #    field it was landing on) -- see the inline reasons.
    # Hot Reheat steam pressure before the Intercept Valve -- a pressure
    # reading, not O2; was drifting onto O2in via "before"/"IL"-style
    # abbreviation overlap with the O2-at-APH-inlet examples.
    "HR STM PR. BEFORE IV(L)", "HR STM PR. BEFORE IV(R)", "HR STM PR BEFORE IV",
    "HR STM PR. BEFORE IV",
    # Main steam temp before the Emergency Stop Valve (ESV) -- same family
    # as the existing "MS TEMP (Left/Right) boiler outlet" OUT_OF_SCOPE
    # entries, just a different abbreviated wording ("TEM 42/43 ... BEF/
    # BEFORE ESV") that wasn't covered and was drifting onto O2in.
    "TEM 42 MS TEMP BEFORE ESV RHS", "TEM 43 MS TEMP BEF ESV (LHS)",
    "MS TEMP BEFORE ESV", "MS TEMP BEF ESV",
    # Feedwater temperature before/after the economiser -- abbreviated
    # ("FW ECO I/L TEMP") counterpart to the full-word "Feed water Eco
    # inlet/outlet temp" entries already above; the abbreviated form was
    # slipping past those and drifting onto Tgi (flue-gas temp) since it
    # also says "ECO"/"TEMP".
    "FW ECO I/L TEMP", "FW ECO O/L TEMP", "FW ECO IL TEMP", "FW ECO OL TEMP",
    # Superheater/reheater attemperator (spray) water flow -- same physical
    # quantity as the existing "SH Spray Flow"/"RH Spray Flow"/"Total SH
    # Spray"/"Total RH Spray" entries, just using the "ATT."/"ATTAMP"
    # plant-tag abbreviation for "attemperator", which wasn't covered and
    # was drifting onto Ffw (steam/feedwater flow) via the word "FLOW".
    "SH ATT. WATER FLOW (LHS)", "SH ATT. WATER FLOW (RHS)", "SH ATT WATER FLOW",
    "RH ATT. WATER FLOW (LHS)", "RH ATT. WATER FLOW (RHS)", "RH ATT WATER FLOW",
    "SH 2ND STG ATTAMP FLOW LHS", "SH 2ND STG ATTAMP FLOW RHS", "SH ATTAMP FLOW",
    "RH ATTEM FLOW", "RH ATTEM TEMP", "SH ATTEM FLOW",
    # Boiler Feed Pump suction/discharge pressure -- a pump-side pressure
    # reading, not a temperature; "BFP-A SUC PR AFTER BSTR PMP 2X OUT" was
    # drifting onto Tgo via shared "2X OUT" wording with real Tgo examples.
    "BFP-A SUC PR AFTER BSTR PMP 2X OUT", "BFP-B SUC PR AFTER BSTR PMP 2X OUT",
    "BFP-C SUC PR AFT BSTR PMP 2X OUT", "BFP SUC PR AFTER BSTR PMP",
    "BFP DISC. HDR PR 1O2", "BFP DISCHARGE TEMP",
    # Boiler Feed Pump suction/discharge TEMPERATURE -- same BFP family as
    # the pressure entries above, but the temperature side. This is the
    # feedwater temperature at the pump, not an air/gas temperature -- it
    # was previously drifting onto Tsao (Secondary Air Temp Out) via
    # incidental "...2X OUT"/"TEMP" overlap with real Tsao examples.
    # Explicit anchor makes the rejection deliberate rather than a side
    # effect of the pressure fix above.
    "BFP-A SUC TEMP 2X OUT", "BFP-B SUC TEMP 2X OUT", "BFP-C SUC TEMP 2X OUT",
    "BFP-A DIS TEMP 2X OUT", "BFP-B DIS TEMP 2X SEL", "BFP-C DIS TEMP 2X SEL",
    # Flue gas PRESSURE (draft) at the air heater, abbreviated "AH" form --
    # a pressure/draft reading, not O2 or temperature; the existing
    # "APH inlet FG pressure"/"APH O/L FG pressure" OUT_OF_SCOPE entries
    # used the full "APH" spelling, so the bare-"AH" plant-tag form wasn't
    # covered and was drifting onto O2in / Tgo respectively.
    "FG PR. AT AH-A INLET", "FG PR. AT AH-B INLET", "FG PR AT AH INLET",
    "FG PR. AFTER AH-A", "FG PR. AFTER AH-B", "FG PR AFTER AH",
    "DP ACROSS AH-A 1O2", "DP ACROSS AH-B 1O2",
    # Induced Draft (ID) fan inlet draught -- same draft/pressure family as
    # the existing "Draft pressure"/"Furnace pressure" entries; was
    # drifting onto O2in via the word "inlet".
    "ID A INLET DRAUGHT", "ID B INLET DRAUGHT", "ID INLET DRAUGHT",
    # Coal feeder motor current (amps) -- an electrical reading, not coal
    # flow; shares the word "FEEDER" with the real Fin feeder-flow
    # examples, which was enough to pull it onto Fin.
    "FEEDER A AMPS", "FEEDER B AMPS", "FEEDER C AMPS", "FEEDER D AMPS",
    "FEEDER E AMPS", "FEEDER F AMPS", "FEEDER AMPS",
    # Truncated/ambiguous PA fan reading -- not enough context to be any
    # specific field; siblings "PA FAN C/D/E/F COMP 2XSEL" already reject
    # correctly, this one (missing the word "FAN") was borderline-matching
    # Tpao instead.
    "PA B COMP 2X SEL", "PA FAN B COMP 2X SEL", "PA A COMP 2X SEL",
    # Text-valued "which mills are in service" columns (e.g. cell values
    # like "ABDEF") -- not a numeric reading at all, but the word "Mill"
    # was pulling these toward Fin's "Mill X Coal Flow" examples (or, before
    # that fix, toward Tpai). Neither is right: this column doesn't carry a
    # coal-flow or temperature number.
    "Mill Running", "Mill Service", "Mill Combination", "Mill in Service",
    # ── Primary/Secondary air PRESSURE readings at the APH inlet/outlet ──
    # These share almost all of their wording with the real Tpai/Tpao/
    # Tsai/Tsao TEMPERATURE examples ("APH-<side> I/L/O/L ... AIR", "HOT
    # ... AIR") differing only in the trailing "PR" vs "TMP"/"TEMP" — on a
    # real plant sheet with both a pressure and a temperature column at
    # the same duct location, the pressure column was winning the
    # temperature field (e.g. "APH-B I/L PRIMARY AIR PR" scored higher for
    # Tpai than the actual temperature column) purely on that bulk overlap.
    # Same reasoning as the existing "FG PR. AT AH-<side> INLET" / "APH
    # inlet FG pressure" rejections above, just for the air (not flue-gas)
    # side of the APH.
    "APH-A I/L PRIMARY AIR PR", "APH-B I/L PRIMARY AIR PR",
    "APH-A O/L HOT PRIMARY AIR PR", "APH-B O/L HOT PRIMARY AIR PR",
    "APH-A I/L SEC AIR PR", "APH-B I/L SEC AIR PR",
    "APH-A O/L HOT SEC AIR PR", "APH-B O/L HOT SEC AIR PR",
    "BLR RHS HOT SEC AIR PR-1", "BLR RHS HOT SEC AIR PR-2",
    "BLR LHS HOT SEC AIR PR-1", "BLR LHS HOT SEC AIR PR-2",
    "PA-A O/L PR", "PA-B O/L PR", "FD-A O/L PR", "FD-B O/L PR",
    "HOT PA HDR PRESSURE",
    # Gas temperature measured behind the furnace rear-wall gas damper --
    # a real flue-gas reading, but at a DIFFERENT point in the gas path
    # than any Tgi/Tgo/Tsao duct, and it shares "FURNACE"/"REAR"/"SIDE"
    # wording with the real Tsao "Furnace <side> Side Inlet SA Temp"
    # examples even though it is a GAS temperature, not an AIR temperature.
    "GAS TEMP BEHIND FURNACE REAR SIDE GAS DAMPER (R.W)",
    "GAS TEMP BEHIND FURNACE REAR SIDE GAS DAMPER (F.W)",
    "GAS TEMP BEHIND FURNACE FRONT SIDE GAS DAMPER (R.W)",
    "GAS TEMP BEHIND FURNACE FRONT SIDE GAS DAMPER (F.W)",
    # Boiler drum metal/steam temperature and pressure -- shares the word
    # "BOTTOM"/"TOP" with the Cba/Pba "Bottom Ash" examples purely by
    # coincidence (drum bottom/top vs ash bottom/top are unrelated
    # physical locations), was drifting a drum temperature reading onto
    # Cba (Unburnt Carbon in Bottom Ash) on a real plant sheet.
    "DRUM RHS BOTTOM TEMP", "DRUM LHS BOTTOM TEMP",
    "DRUM RHS TOP TEMP", "DRUM LHS TOP TEMP", "DRUM PRESSURE",
    # Inherent Moisture (IM) -- a real lab reading, reported alongside
    # Total Moisture (TM) on the same Coal Analysis sheet, but a smaller,
    # different quantity that CENPEEP's "M" field must not be filled from
    # (see the M/Moisture training-data note above).
    "IM %", "IM%", "Inherent Moisture", "Inherent Moisture %",
    # TDBFP (Turbine-Driven Boiler Feed Pump) suction inlet temperature --
    # feedwater temperature at the pump, not Primary Air temperature. This
    # is the same BFP family already excluded above ("BFP-A SUC TEMP 2X
    # OUT" etc), but that entry used the "BFP-<side> SUC/DIS TEMP 2X ..."
    # DCS tag shape; a real plant sheet using the plainer "TDBFP-<side>
    # I/L TEMP" / "TD BFP-<side> I/L TEMP" wording wasn't covered by it and
    # was drifting onto Tpai (Primary Air Temp In) purely via shared
    # "<side> I/L TEMP" wording with the real "AH A/B PA I/L TEMP"
    # examples -- averaging a ~150 C feedwater-pump-suction reading
    # together with the genuine ~35 C primary-air-inlet reading and
    # silently corrupting the Tpai value.
    "TDBFP-A I/L TEMP", "TDBFP-B I/L TEMP", "TDBFP-C I/L TEMP",
    "TDBFP A I/L TEMP", "TDBFP B I/L TEMP", "TDBFP C I/L TEMP",
    "TD BFP-A I/L TEMP", "TD BFP-B I/L TEMP", "TD BFP-C I/L TEMP",
    "TDBFP A I/L PRESS", "TDBFP B I/L PRESS", "TDBFP C I/L PRESS",
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
    # NOTE: 'total air flow' was removed from this exclusion list — it is a
    # real sensor reading (not a structural/ID column like Date or Sr No)
    # that a plant sheet may require; it was previously force-excluded here
    # by mistake, silently dropping it before the classifier ever saw it.
    # No CENPEEP field id currently corresponds to it, so for now it will
    # fall through to 'rejected_low_confidence' instead of 'excluded' —
    # flag to the business team so a target field/aggregation rule can be
    # defined for it.
    'sox fgd i/l', 'sox', 'nox', 'sox fgd inlet',
    'ssc current', 'burner tilt corner 1', 'burner tilt',
    # Bare generic column-header words carry NO information about which
    # physical quantity they hold -- "Value"/"Reading"/"Amount"/"Data"/
    # "Result"/"Figure" show up as a column header on all kinds of
    # completely unrelated small reference tables (e.g. a
    # "Particulars/UOM/Formula/Value" cost-savings sheet), and letting the
    # ML fallback confidently guess a specific field for one of these
    # (seen: a bare "Value" column scoring GCV at ~0.55 confidence, then
    # averaging together Unit Capacity/Coal Cost/THERMACT dosing kg -- all
    # completely unrelated numbers -- into a garbage "GCV" figure) is worse
    # than leaving it unmatched. Exact match only, so a real header that
    # merely CONTAINS one of these words (e.g. "MS Flow Value") is
    # unaffected.
    'value', 'reading', 'amount', 'data', 'result', 'figure', 'qty', 'quantity',
}


def is_non_field_header(text):
    """True if text is a known structural/non-data column header."""
    norm = str(text).strip().lower()
    norm = norm.replace('.', '').replace('-', ' ').strip()
    norm = ' '.join(norm.split())
    return norm in NON_FIELD_HEADERS