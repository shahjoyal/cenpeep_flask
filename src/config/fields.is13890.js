// IS-13890 form fields — ids/labels/units follow the reference workbook ("IS - 13980 original",
// orange cells = inputs). Ids must match routes/upload_is13890.py FIELDS and
// ml/training_data_is13890.py (tests/test_is13890_extract.py checks this).
const f = (id, name, sym, uom, value, extra = {}) => ({ id, name, sym, uom, kind: '', value, readonly: false, step: 'any', ...extra });

export const cards = [
  { target: 'grid-is-prox', icon: 'PA', title: 'Proximate Analysis — As Fired', sub: '7 parameters' },
  { target: 'grid-is-boiler', icon: 'BP', title: 'Boiler Parameters', sub: '10 parameters' },
  { target: 'grid-is-loi', icon: 'LO', title: 'LOI — Unburnts in Ash', sub: '2 parameters' },
];

export const grids = {
  'grid-is-prox': [
    f('A', 'Ash', 'A', '%', '1.914014'),
    f('VM', 'Volatile Matter', 'VM', '%', '1.877117'),
    f('M', 'Moisture', 'M', '%', '50.5'),
    f('FC', 'Fixed Carbon', 'FC', '%', '45.70887'),
    f('SUC', 'Sucrose (information only)', '', '%', '2.34'),
    f('GCV', 'Gross Calorific Value', 'GCV', 'kcal/kg', '2248.92'),
    f('S', 'Sulphur', 'S', '%', '0'),
  ],
  'grid-is-boiler': [
    f('T', 'Avg Flue Gas Outlet Temp (APH outlet)', 'T', '°C', '182.83'),
    f('Tdb', 'Ambient Temp (Dry bulb)', 'Tdb', '°C', '26'),
    f('Twb', 'Ambient Temp (Wet bulb)', 'Twb', '°C', '18'),
    f('O2', 'O₂ at APH Inlet', 'O2', '%', '8.97'),
    f('CO2', 'CO₂ at APH Inlet', 'CO2', '%', '11.7649'),
    f('CO', 'CO at APH Inlet', 'CO', '%', '0.0651'),
    f('N2', 'N₂ at APH Inlet', 'N2', '%', '79.2'),
    f('BL', 'Boiler Load', 'BL', 'kg/h', '32000'),
    f('ER', 'Evaporation Ratio', 'ER', 'kg/kg', '2'),
    f('Wze', 'Quantity of Atomizing Steam', 'Wze', 'kg/h', '0'),
  ],
  'grid-is-loi': [
    f('UBA', 'Unburnts in Bottom Ash', 'UBA', '%', '84.78369'),
    f('UFA', 'Unburnts in Fly Ash', 'UFA', '%', '78.84464'),
  ],
};
