// ════════════════════════════════════════════════════════════════════
// IS-13890 — Boiler efficiency by the HEAT-LOSS method.
//
// Pure calculation logic, a cell-for-cell port of the reference workbook
// "IS - 13980 original" (the sheet's own title has the 13980/13890 typo):
// every formula below carries the workbook cell it comes from, so the output
// can be checked against the Excel sheet row by row. Nothing here touches the DOM.
//
// ORANGE cells in the workbook = inputs (the 19 ids in IS13890_INPUT_IDS)
// GREEN  cells in the workbook = calculations (everything computed below)
//
// Two places where the workbook departs from the textbook method are
// reproduced AS-IS by default (so results match the sheet), and can be
// switched with `opts`:
//
//   includeRadiation (default false)
//       Workbook E55 "Total Loss kcal/kg" sums E36+E41+E45+E49+E50+E51+E52+E53 —
//       it does NOT include E54 "Loss due to radiation & convection" (Lβ).
//       true => Lβ is added to the total.
//
//   hfFromTemp (default false)
//       Workbook E48 "Enthalpy of saturated liquid at t" is "=E46", i.e. the
//       moisture fraction (0.505 kg/kg) is used as if it were an enthalpy in
//       kcal/kg. A saturated-liquid enthalpy at t ≈ 22 °C is ≈ 22 kcal/kg.
//       true => hf ≈ t (kcal/kg per °C ≈ 1), which is what the label says.
// ════════════════════════════════════════════════════════════════════

const sdiv = (a, b) => (b === 0 || !isFinite(b)) ? 0 : a / b;
const num = (obj, id) => { const n = parseFloat(obj[id]); return isNaN(n) ? 0 : n; };

// The 19 detectable inputs (ids match routes/upload_is13890.py FIELDS)
export const IS13890_INPUT_IDS = [
  'A', 'VM', 'M', 'FC', 'SUC', 'GCV', 'S',
  'T', 'Tdb', 'Twb', 'O2', 'CO2', 'CO', 'N2', 'BL', 'ER', 'Wze',
  'UBA', 'UFA',
];

// Sample values from the reference workbook (E7:E34) — reproduces its 68.32 %
export const DEFAULTS = {
  A: 1.914014, VM: 1.877117, M: 50.5, FC: 45.70887, SUC: 2.34, GCV: 2248.92, S: 0,
  T: 182.83, Tdb: 26, Twb: 18, O2: 8.97, CO2: 11.7649, CO: 0.0651, N2: 79.2, BL: 32000, ER: 2, Wze: 0,
  UBA: 84.78369, UFA: 78.84464,
};

export const DEFAULT_OPTS = { includeRadiation: false, hfFromTemp: false };

export function runIS13890Calculation(rawInputs, opts = {}) {
  const o = { ...DEFAULT_OPTS, ...opts };
  const v = (id) => num(rawInputs, id);
  const warnings = [];

  const A = v('A'), VM = v('VM'), M = v('M'), FC = v('FC'), GCV = v('GCV'), S = v('S');
  const T = v('T'), Tdb = v('Tdb'), Twb = v('Twb');
  const O2 = v('O2'), CO2 = v('CO2'), CO = v('CO'), N2 = v('N2');
  const BL = v('BL'), ER = v('ER'), Wze = v('Wze');
  const UBA = v('UBA'), UFA = v('UFA');

  // ── Ultimate analysis (calculated from the proximate analysis) ─────────────
  const C = FC + 0.9 * (VM - 14);                              // E15
  const H = VM * (7.35 / (VM + 10) - 0.013);                   // E16
  const N = 2.1 - 0.012 * VM;                                  // E17
  const Ox = 100 - C - H - S - N - A - M;                      // E18

  // ── Boiler parameters ──────────────────────────────────────────────────────
  const t = (Tdb + Twb) / 2;                                   // E23  mean ambient (dry + wet)/2
  const bagasse = sdiv(BL, ER);                                // E30  fuel consumption kg/h

  // ── Efficiency tabulation ──────────────────────────────────────────────────
  const Wfe = bagasse;                                         // E39  measured fuel rate
  const Wdpe = bagasse * A / 100;                              // E38  dry refuse collected  kg/h
  const Wdp = sdiv(Wdpe, Wfe);                                 // E37  dry refuse per kg fuel
  const Hdp = (70 / 100 * A / 100 * UFA / 100 * 8078)          // E40  HHV of total dry refuse
            + (A / 100 * 30 / 100 * UBA / 100 * 8078);
  const Luc = Wdp * Hdp;                                       // E36  unburned carbon loss
  const Cb = C / 100 - sdiv(Wdp * Hdp, 8078);                  // E42  carbon burnt per kg fuel
  const WG = sdiv(44.01 * CO2 + 32 * O2 + 28.02 * N2 + 28.01 * CO, 12.01 * (CO2 + CO)) * (Cb + S / 267);  // E43
  const CpG = 1.01 / 4.186;                                    // E44
  const Lg = WG * CpG * (T - t);                               // E41  dry flue gas loss
  const mf = M / 100;                                          // E46  kg moisture / kg fuel
  const Hv = (2501 + 1.88 * T) / 4.186;                        // E47  vapour enthalpy (symbol shown as "Wfe" in the sheet — typo)
  const HRw = o.hfFromTemp ? t : mf;                           // E48  (workbook: =E46)
  const Lmf = mf * (Hv - HRw);                                 // E45  moisture-in-fuel loss
  const Lh = 8.936 * H / 100 * (Hv - HRw);                     // E49  moisture from hydrogen loss
  const Lz = sdiv(Wze * (Hv - HRw), bagasse);                  // E50  atomizing steam loss
  const Lco = sdiv(CO, CO2 + CO) * 5644 * Cb;                  // E51  CO formation loss
  const Luh = 0;                                               // E52  unburned hydrogen   (fixed 0 in the workbook)
  const Luhc = 0;                                              // E53  unburned hydrocarbons (fixed 0 in the workbook)
  const Lrad = 1.5 * GCV / 100;                                // E54  radiation & convection

  const totalKcal = Luc + Lg + Lmf + Lh + Lz + Lco + Luh + Luhc + (o.includeRadiation ? Lrad : 0);   // E55
  const totalPct = sdiv(totalKcal, GCV) * 100;                 // E56
  const efficiency = 100 - totalPct;                           // E58

  if (GCV <= 0) warnings.push('Gross calorific value is 0 — efficiency cannot be calculated.');
  if (ER <= 0) warnings.push('Evaporation ratio is 0 — bagasse consumption (Boiler load ÷ ER) cannot be calculated.');
  if (CO2 + CO <= 0) warnings.push('CO₂ + CO at APH inlet is 0 — dry flue gas weight cannot be calculated.');
  const sumGas = CO2 + O2 + N2 + CO;
  if (sumGas > 0 && Math.abs(sumGas - 100) > 3) {
    warnings.push(`CO₂ + O₂ + N₂ + CO at APH inlet adds up to ${sumGas.toFixed(1)} % (expected ≈ 100 %).`);
  }
  if (Ox < 0) warnings.push('Calculated oxygen in fuel is negative — check the proximate analysis (Ash, Moisture, VM, FC).');
  if (GCV > 0 && (efficiency < 0 || efficiency > 100)) warnings.push('Efficiency is outside 0–100 % — check the inputs.');

  // Rows in the same order as the workbook's "Efficiency Tabulation" (rows 36-58)
  const tabulation = [
    { sym: 'Luc',    label: 'Loss due to unburned carbon',                       uom: 'kcal/kg',   value: Luc,   cell: 'E36', loss: true },
    { sym: "Wd'p'",  label: 'kg of total dry refuse per kg of AF fuel',          uom: 'kg/kg',     value: Wdp,   cell: 'E37' },
    { sym: "Wd'p'e", label: 'Weight of dry refuse collected',                    uom: 'kg/h',      value: Wdpe,  cell: 'E38' },
    { sym: 'Wfe',    label: 'Measured fuel rate',                                uom: 'kg/h',      value: Wfe,   cell: 'E39' },
    { sym: "Hd'p'",  label: 'HHV of total dry refuse',                           uom: 'kcal/kg',   value: Hdp,   cell: 'E40' },
    { sym: 'Lg',     label: 'Loss due to dry flue gas',                          uom: 'kcal/kg',   value: Lg,    cell: 'E41', loss: true },
    { sym: 'Cb',     label: 'kg of carbon burnt per kg of AF fuel',              uom: 'kg/kg',     value: Cb,    cell: 'E42' },
    { sym: "WG'",    label: 'Weight of dry gas leaving unit per kg of AF fuel',  uom: 'kg/kg',     value: WG,    cell: 'E43' },
    { sym: "CpG'",   label: 'Mean specific heat of dry flue gas',                uom: 'kcal/kg°C', value: CpG,   cell: 'E44' },
    { sym: 'Lmf',    label: 'Loss due to moisture in fuel',                      uom: 'kcal/kg',   value: Lmf,   cell: 'E45', loss: true },
    { sym: 'mf',     label: 'kg of moisture per kg of AF fuel',                  uom: 'kg/kg',     value: mf,    cell: 'E46' },
    { sym: 'Hv',     label: 'Vapour enthalpy at 0.07 kgf/cm² at APH o/l',        uom: 'kcal/kg',   value: Hv,    cell: 'E47' },
    { sym: 'HRw',    label: 'Enthalpy of saturated liquid at t',                 uom: 'kcal/kg',   value: HRw,   cell: 'E48' },
    { sym: 'Lh',     label: 'Loss due to moisture from hydrogen',                uom: 'kcal/kg',   value: Lh,    cell: 'E49', loss: true },
    { sym: 'Lz',     label: 'Loss due to atomizing steam',                       uom: 'kcal/kg',   value: Lz,    cell: 'E50', loss: true },
    { sym: 'Lco',    label: 'Loss due to formation of CO',                       uom: 'kcal/kg',   value: Lco,   cell: 'E51', loss: true },
    { sym: 'Luh',    label: 'Loss due to unburned hydrogen',                     uom: 'kcal/kg',   value: Luh,   cell: 'E52', loss: true },
    { sym: 'Luhc',   label: 'Loss due to unburned hydrocarbons',                 uom: 'kcal/kg',   value: Luhc,  cell: 'E53', loss: true },
    { sym: 'Lβ',     label: 'Loss due to radiation & convection',               uom: 'kcal/kg',   value: Lrad,  cell: 'E54', loss: true, optional: true },
  ];

  return {
    opts: o,
    derived: { C, H, N, O: Ox, t, bagasse },
    ultimate: { C, H, N, O: Ox, S, A, M, sum: C + H + N + Ox + S + A + M },
    losses: {
      Luc, Lg, Lmf, Lh, Lz, Lco, Luh, Luhc, Lrad,
    },
    tabulation,
    totalKcal, totalPct, efficiency,
    includedRadiation: o.includeRadiation,
    warnings,
  };
}
