// The two auto-calc routines from public/script.js (autoCalcCO2 and
// autoCalcDesignUltimate), same formulas, but on a plain {id: string} values
// object instead of the DOM. The page derives the readonly "AUTO" fields from
// these on every render — equivalent to the original re-running them on each
// input event / upload / reset.
import { fmt2, num } from './format.js';

export function cenpeepDerived(values) {
  const O2in = num(values, 'O2in'), O2out = num(values, 'O2out');
  const Md = num(values, 'Md'), Ad = num(values, 'Ad'), VMd = num(values, 'VMd'), FCd = num(values, 'FCd'), Sd = num(values, 'Sd');

  const FcDc = FCd / (1 - (1.1 * Ad / 100) - (Md / 100));
  const VmDf = 100 - FcDc;
  const Cdf = FcDc + 0.9 * (VmDf - 14);
  const Hdf = VmDf * ((7.35 / (VmDf + 10)) - 0.013);
  const Ndf = 2.1 - (0.012 * VmDf);
  const k = (VMd + FCd) / (VmDf + FcDc);

  const Cd = Cdf * k;
  const Hd = Hdf * k;
  const Nd = Ndf * k;
  const Md2 = Md;
  const Ad2 = Ad;
  const Od = 100 - Cd - Sd - Hd - Md2 - Nd - Ad2;

  return {
    CO2in: (19.3 - O2in).toFixed(2),
    CO2out: (19.3 - O2out).toFixed(2),
    Cd: fmt2(Cd), Hd: fmt2(Hd), Nd: fmt2(Nd), Od: fmt2(Od), Md2: fmt2(Md2), Ad2: fmt2(Ad2),
  };
}
