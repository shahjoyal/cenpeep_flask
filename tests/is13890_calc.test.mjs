// node tests/is13890_calc.test.mjs  — checks the JS port against the workbook's cached results
import { runIS13890Calculation } from '../src/lib/calc/is13890.js';
import assert from 'node:assert/strict';
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} != ${b}`);

const IN = { A: 1.9140136577858815, VM: 1.87711659409782, M: 50.5, FC: 45.7088697481163, SUC: 2.34, GCV: 2248.92, S: 0,
  T: 182.83, Tdb: 26, Twb: 18, O2: 8.97, CO2: 11.7649, CO: 0.0651, N2: 79.2, BL: 32000, ER: 2, Wze: 0,
  UBA: 84.78368970661371, UFA: 78.84463722397473 };
const r = runIS13890Calculation(IN);
const cells = { E36: 2.3860026912560035, E37: 0.019140136577858815, E38: 306.24218524574104, E39: 16000, E40: 124.65964814567289,
  E41: 287.3383358332983, E42: 0.3476873763537607, E43: 7.404647018579894, E44: 0.24128045867176304, E45: 342.9326964524606,
  E46: 0.505, E47: 679.5796464405161, E48: 0.505, E49: 69.00932297322473, E50: 0, E51: 10.798717298762021, E52: 0, E53: 0,
  E54: 33.7338 };
for (const row of r.tabulation) near(row.value, cells[row.cell]);
near(r.derived.C, 34.79827468280434); near(r.derived.H, 1.1372268121790174); near(r.derived.N, 2.0774746008708265);
near(r.derived.O, 9.573010246359935); near(r.derived.t, 22); near(r.derived.bagasse, 16000);
near(r.totalKcal, 712.4650752490016); near(r.totalPct, 31.68032100959579); near(r.efficiency, 68.31967899040421);
assert.deepEqual(r.warnings, []);
// options
const rad = runIS13890Calculation(IN, { includeRadiation: true });
near(rad.totalKcal, 712.4650752490016 + 33.7338);
const hf = runIS13890Calculation(IN, { hfFromTemp: true });
assert.ok(hf.efficiency > r.efficiency);   // larger hf => smaller moisture losses
// degenerate inputs never produce NaN
const z = runIS13890Calculation({});
assert.ok(Object.values(z.losses).every(Number.isFinite) && z.warnings.length >= 3);
console.log('is13890 calc OK — efficiency', r.efficiency.toFixed(4), '| with Lβ', rad.efficiency.toFixed(4), '| hf≈t', hf.efficiency.toFixed(4));
