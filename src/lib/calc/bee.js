// ════════════════════════════════════════════════════════════════════
// Pure calculation logic — copied VERBATIM from public/script3.js (lines 67-100, 308-421).
// Nothing in here touches the DOM; only the `export` lines were added.
// ════════════════════════════════════════════════════════════════════
const INPUT_IDS = [
  'BL', 'SP',
  'O2fg', 'COfg', 'CO2fg', 'Tfg', 'Tamb', 'Hum',
  'C', 'H2', 'N2', 'O2f', 'S', 'M', 'A', 'GCV',
  'Cba', 'Cfa', 'GCVba', 'GCVfa',
  'L6',
];
const INPUT_LABELS = {
  BL:'Boiler Load (TPH)', SP:'Steam Pressure (kg/cm²)',
  O2fg:'O2 in Flue Gas (%)', COfg:'CO in Flue Gas (ppm)', CO2fg:'CO2 in Flue Gas (%)',
  Tfg:'Avg. Flue Gas Temperature (°C)', Tamb:'Ambient Temperature (°C)',
  Hum:'Humidity in Ambient Air (kg/kg dry air)',
  C:'Carbon (%)', H2:'Hydrogen (%)', N2:'Nitrogen (%)', O2f:'Oxygen (%)',
  S:'Sulphur (%)', M:'Moisture (%)', A:'Ash Content (%)', GCV:'GCV of Coal (kcal/kg)',
  Cba:'Unburnt in Bottom Ash (%)', Cfa:'Unburnt in Fly Ash (%)',
  GCVba:'GCV of Bottom Ash (kcal/kg)', GCVfa:'GCV of Fly Ash (kcal/kg)',
  L6:'Radiation & Unaccounted Losses (%)',
};

// Fields the sheet defines but the BEE-2 Indirect formula never actually
// reads (kept only so the report header can show them). Excluded from
// runCalculation()'s inputs on purpose — see the "General Data" note.
const INFO_ONLY_IDS = ['BL', 'SP'];



const g = (obj, id) => { const n = parseFloat(obj[id]); return isNaN(n) ? 0 : n; };

// ── Core calculation (pure — takes a plain {id: value} object, returns the
//    results object; no DOM reads/writes). Mirrors "BEE-2 (Indirect)" sheet
//    exactly, cell by cell. ───────────────────────────────────────────────
function runCalculation(rawInputs) {
  const gv = id => g(rawInputs, id);

  const O2fg=gv('O2fg'), COfg=gv('COfg'), CO2fg=gv('CO2fg');
  const Tfg=gv('Tfg'), Tamb=gv('Tamb'), Hum=gv('Hum');
  const C=gv('C'), H2=gv('H2'), N2=gv('N2'), O2f=gv('O2f'), S=gv('S'), M=gv('M'), A=gv('A'), GCV=gv('GCV');
  const Cba=gv('Cba'), Cfa=gv('Cfa'), GCVba=gv('GCVba'), GCVfa=gv('GCVfa');
  const L6=gv('L6');

  // Step 1 — Theoretical air required for combustion (sheet B34)
  //   ((11.6*C)+(34.8*(H2-O2/8))+(4.35*S))/100   kg/kg of coal
  const TA = ((11.6*C) + (34.8*(H2 - O2f/8)) + (4.35*S)) / 100;

  // Step 2 — Excess Air supplied, EA (sheet B42)
  //   O2% / (21 - O2%) * 100
  const EA = O2fg / (21 - O2fg) * 100;

  // Step 3 — Actual Air Supplied, AAS (sheet B47)
  //   (1 + EA/100) * theoretical air
  const AAS = (1 + EA/100) * TA;

  // Step 4 — Mass of dry flue gas, m (sheet B52)
  //   mass CO2 + mass N2(fuel) + mass N2(air) + mass O2(excess) + mass SO2
  // NOTE: the reference sheet's own B52 formula bakes in the *rounded*
  // snapshot values of AAS (12.3) and TA (7) as literal numbers instead of
  // referencing B47/B34 — meaning it only happens to be correct for the
  // sheet's own sample inputs and silently goes stale for any other input
  // set. Per "don't hardcode anything", this implementation uses the live
  // AAS/TA (and the fuel's actual N2/S, which the sheet's B52 also bypasses
  // in favor of fixed 0.0111/0.0034) computed above instead. For the
  // sheet's own default sample inputs this yields m ≈ 12.6123 vs the
  // sheet's own cached ≈ 12.6751 — a ~0.06 percentage-point difference in
  // final Boiler Efficiency (see chat for the full number). Swap in the
  // commented block below if you need a byte-for-byte match to the sheet
  // instead of a formula that stays correct as inputs change.
  const m = (C/100)*(44/12) + (N2/100) + AAS*(77/100) + (AAS-TA)*(23/100) + (S/100)*(64/32);
  // const m = 0.5365*44/12 + 0.0111 + 12.3*77/100 + (12.3-7)*23/100 + 0.0034*64/32; // sheet's literal hardcoded version

  // Step 5 — Losses
  const Cp = 0.24;      // dry flue gas specific heat, kcal/kg°C
  const CpW = 0.45;     // superheated steam specific heat, kcal/kg°C

  // L1 — % loss in dry flue gas (sheet B56): m*Cp*(Tf-Ta)/GCV*100
  const L1 = m * Cp * (Tfg - Tamb) / GCV * 100;

  // L2 — heat loss due to formation of water from H2 in fuel (sheet B59):
  //   9*H2*(584+Cp(Tf-Ta))/GCV*100   (H2 as %, so /100 inside)
  const L2 = 9 * (H2/100) * (584 + CpW*(Tfg-Tamb)) / GCV * 100;

  // L3 — heat loss due to moisture in fuel (sheet B62):
  //   M*(584+Cp(Tf-Ta))/GCV*100
  const L3 = (M/100) * (584 + CpW*(Tfg-Tamb)) / GCV * 100;

  // L4 — heat loss due to moisture in air (sheet B65):
  //   AAS*Humidity*Cp*(Tf-Ta)/GCV*100
  // NOTE: the reference sheet divides Humidity by 10 here (B65 = B47*B11/10*
  // 0.45*(B8-B10)/B21*100), which is not what the sheet's own written
  // description in B64 says. Reproduced exactly as the sheet computes it —
  // flagging it rather than silently "fixing" it, since you may be matching
  // this calculator against that sheet's numbers.
  const L4 = AAS * (Hum/10) * CpW * (Tfg-Tamb) / GCV * 100;

  // L5 — heat loss due to partial conversion of C to CO (sheet B68):
  //   Sheet's stated formula (B67 label): %CO*C/(%CO+%CO2)*5654/GCV*100
  //   Sheet's ACTUAL formula (B68):        =B6*B14/100/B6 + B7/5654/B21/100
  //   which, algebraically, reduces to ≈ C/100 (COfg cancels out) plus a
  //   negligible CO2 term — i.e. it does NOT behave like the stated
  //   formula, and doesn't meaningfully respond to the CO/CO2 readings at
  //   all. This looks like an operator-precedence typo in the sheet (a
  //   stray "/" where a "*(...)" grouping was probably intended). Kept
  //   here EXACTLY as the sheet computes it, per "match what's in the
  //   sheet" — the likely-intended corrected version is included below,
  //   commented out, for when you're ready to fix the source data/formula.
  //
  // Written as the already-cancelled C/100 (not the literal
  // "COfg * C/100 / COfg") — those two are mathematically identical for
  // every COfg the sheet was ever tested with (x/x = 1 for any x ≠ 0), but
  // the literal form divides by COfg first and blows up to NaN (0/0)
  // whenever the actual CO reading is legitimately 0 ppm — a real, common
  // case (complete/good combustion), not an edge case to guard against
  // with a special-case check. The sheet's own formula has no real
  // discontinuity at COfg=0, only an accidental one from how it's typed —
  // this removes that without changing the result for any other reading.
  const L5 = (C/100) + CO2fg/5654/GCV/100;
  // Likely-intended version (uses CO/CO2 in % — convert COfg ppm→% first):
  // const COfgPct = COfg / 10000;
  // const L5 = (COfgPct / (COfgPct + CO2fg)) * (C/100) * 5654 / GCV * 100;

  // L6 — radiation & unaccounted losses: manual input (sheet B71, default 1%)

  // L7 — % heat loss due to unburnt in fly ash (sheet B74–B79)
  const flyAshAmount = (Cfa/100) * (A/100);      // B77 = B75*B74/10000
  const flyAshHeat   = flyAshAmount * GCVfa;      // B78
  const L7 = flyAshHeat * 100 / GCV;              // B79

  // L8 — % heat loss due to unburnt in bottom ash (sheet B82–B86)
  const bottomAshAmount = (Cba/100) * (A/100);    // B84 = B83*B74/10000
  const bottomAshHeat   = bottomAshAmount * GCVba; // B85
  const L8 = bottomAshHeat * 100 / GCV;            // B86

  // Boiler Efficiency by indirect method (sheet B89)
  const BoilerEff = 100 - (L1 + L2 + L3 + L4 + L5 + L6 + L7 + L8);

  return {
    TA, EA, AAS, m,
    L1, L2, L3, L4, L5, L6, L7, L8, BoilerEff,
    heatInput: GCV,
    inputs: INPUT_IDS.map(id => ({ id, label: INPUT_LABELS[id] || id, value: rawInputs[id] })),
  };
}

export { INPUT_IDS, INPUT_LABELS, INFO_ONLY_IDS, g, runCalculation };
