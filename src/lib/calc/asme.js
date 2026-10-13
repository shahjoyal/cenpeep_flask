// ════════════════════════════════════════════════════════════════════
// Pure calculation logic — copied VERBATIM from public/script2.js (lines 434-548).
// Nothing in here touches the DOM; only the `export` lines were added.
// ════════════════════════════════════════════════════════════════════
const ASME_INPUT_IDS = [
  'M', 'A', 'VM', 'FC', 'GCV', 'S',
  'Cba', 'Cfa', 'Pfa', 'Pba',
  'O2out', 'COout', 'Tgo', 'Tref',
];
const ASME_INPUT_LABELS = {
  M: 'Moisture — Item 37', A: 'Ash — Item 40', VM: 'Volatile Matter — Item 38',
  FC: 'Fixed Carbon — Item 39', GCV: 'HHV, as fired — Item 41', S: 'Sulfur — Item 47',
  Cba: 'Unburnt Carbon — Bottom Ash', Cfa: 'Unburnt Carbon — Fly Ash',
  Pfa: '% Fly Ash in Total Ash', Pba: '% Bottom Ash in Total Ash',
  O2out: 'O\u2082, dry — Item 33',
  COout: 'CO, dry — Item 34',
  Tgo: 'Flue-Gas Temp Leaving Boiler — Item 13', Tref: 'Reference Air Temp — Items 10/11',
};
const g = (obj, id) => { const n = parseFloat(obj[id]); return isNaN(n) ? 0 : n; };



// Ultimate Analysis (Items 43/44/45/46 — Carbon/Hydrogen/Nitrogen/Oxygen) via
// the same empirical regression from Proximate Analysis CENPEEP already uses
// (public/script.js runCalculation) — Items 48/49 (Ash/Moisture) are the
// as-fired Ash/Moisture directly (Items 40/37). Also derives the weighted
// combustibles-in-refuse % (Item 61) from the same Cba/Cfa/Pfa/Pba fields
// CENPEEP collects.
function computeDerivedInputs(raw) {
  const inputs = { ...raw };
  const M = g(inputs,'M'), A = g(inputs,'A'), VM = g(inputs,'VM'), FC = g(inputs,'FC'), S = g(inputs,'S');

  inputs.Ca = 0.97*FC + 0.7*(VM+0.1*A) - M*(0.6-0.01*M);
  inputs.H  = 0.036*FC + 0.086*(VM-0.1*A) - 0.0035*M*M*(1-0.02*M);
  inputs.N  = 2.1 - 0.02*VM;
  inputs.O  = 100 - M - A - inputs.Ca - S - inputs.H - inputs.N;

  const Pfa = g(inputs,'Pfa') || 80, Pba = g(inputs,'Pba') || 20;
  inputs.Cash = Pfa/100*g(inputs,'Cfa') + Pba/100*g(inputs,'Cba');   // Item 61
  return inputs;
}

// ── Core calculation (pure — takes a plain {id: value} object, returns the
//    results object; no DOM reads/writes) ────────────────────────────────────
// Follows the ASME PTC 4.1 Abbreviated Efficiency Test — Losses (Heat-Loss)
// Method, HHV basis, Items 22–72 of the reference "PTC 4.1 Calculator"
// workbook, kept in consistent metric units throughout (Btu/lb-°F and
// kcal/kg-°C are numerically the same specific-heat value, so no unit
// conversion is needed for the % loss results — °C temperature differences
// and kcal/kg GCV can be used directly in place of °F/Btu-lb).
function runCalculation(rawInputs) {
  const inputs = computeDerivedInputs(rawInputs);
  const gv = id => g(inputs, id);

  const GCV = gv('GCV'), S = gv('S');
  const O2out = gv('O2out'), COout = gv('COout');
  const Tgo = gv('Tgo'), Tref = gv('Tref');
  const A = gv('A'), M = gv('M');
  const Ca = gv('Ca'), H = gv('H'), Cash = gv('Cash');
  const Lrad = (inputs.Lrad === undefined || isNaN(inputs.Lrad)) ? 1.0 : inputs.Lrad;  // Item 69 — ABMA/measured, manual
  const Lunm = (inputs.Lunm === undefined || isNaN(inputs.Lunm)) ? 0.5 : inputs.Lunm;  // Item 70 — mutually agreed, manual

  // Dry flue-gas analysis (Items 32–35) — CO2 by the same 19.3−O₂ relation
  // CENPEEP already uses (same APH-out / "leaving boiler" sampling point
  // as Item 13).
  const COoutp = (COout/1000000)*100;         // Item 34, ppm → % vol
  const CO2    = 19.3 - O2out;                // Item 32
  const N2     = 100 - CO2 - O2out - COoutp;  // Item 35, by difference
  const ExcessAir = (0.2682*N2 - (O2out - COoutp/2)) !== 0
    ? 100*(O2out - COoutp/2)/(0.2682*N2 - (O2out - COoutp/2))
    : 0;                                      // Item 36 (informational)

  // Refuse / unburnt-carbon chain (Items 22/24/61) — dry refuse per unit
  // fuel estimated from Ash (Item 40) and combustibles-in-refuse % (Item 61,
  // from Cba/Cfa/Pfa/Pba), same fallback the workbook itself uses when
  // Item 22 isn't directly measured (Item 25 formula: Ash/(100−Item61)).
  const DryRefuse   = (100 - Cash) !== 0 ? A/(100 - Cash) : 0;    // Item 22
  const U           = A/100 * (Cash/(100-Cash || 1));             // unburnt-carbon fraction
  const CarbonBurned= Ca - 100*U;                                 // Item 24

  // Dry flue gas per unit as-fired fuel (Item 25/28) from the measured
  // flue-gas analysis directly (rather than a theoretical-air estimate).
  const denom = 3*(CO2+COoutp);
  const MassDFG = denom !== 0
    ? ((11*CO2 + 8*O2out + 7*(N2+COoutp))/denom) * (CarbonBurned/100 + S/267)
    : 0;

  const dT = Tgo - Tref;   // Item 13 − Item 11
  const CVc = 8077.8;      // HHV of pure unburnt carbon, kcal/kg (matches CENPEEP's own constant)

  // Heat-loss components (Items 65–70), HHV basis.
  const L65 = MassDFG*0.24*dT/GCV*100;                              // Dry flue-gas sensible heat
  const L66 = M/100*(584+0.45*dT)/GCV*100;                          // Moisture in fuel
  const L67 = 9*(H/100)*(584+0.45*dT)/GCV*100;                      // Water from combustion of H2
  const L68 = (100-Cash) !== 0 ? (A/(100-Cash))*(Cash/100*CVc)/GCV*100 : 0;  // Combustibles in refuse
  const L69 = Lrad;                                                 // Radiation
  const L70 = Lunm;                                                 // Unmeasured losses

  const TotalLosses = L65+L66+L67+L68+L69+L70;   // Item 71
  const BoilerEff   = 100 - TotalLosses;         // Item 72

  return {
    CO2, N2, COoutp, ExcessAir,
    Ca, H, N: gv('N'), O: gv('O'),
    Cash, DryRefuse, U, CarbonBurned, MassDFG, dT,
    L65, L66, L67, L68, L69, L70, TotalLosses, BoilerEff,
    Lrad, Lunm,
    inputs: ASME_INPUT_IDS.map(id => ({ id, label: ASME_INPUT_LABELS[id] || id, value: inputs[id] })),
  };
}
export { ASME_INPUT_IDS, ASME_INPUT_LABELS, g, computeDerivedInputs, runCalculation };
