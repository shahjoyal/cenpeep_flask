import { runIS13890Calculation, IS_DEFAULTS } from '../src/lib/calc/is13890.js';
const r = runIS13890Calculation(IS_DEFAULTS);
// cached values from the workbook ("IS - 13980 original")
const xl = { C:34.79827468280434,H:1.1372268121790174,N:2.0774746008708265,O:9.573010246359935,t:22,Bagasse:16000,
 Luc:2.3860026912560035,Wdp:0.019140136577858815,Wdpe:306.24218524574104,Hdp:124.65964814567289,Lg:287.3383358332983,
 Cb:0.3476873763537607,WG:7.404647018579894,CpG:0.24128045867176304,Lmf:342.9326964524606,mf:0.505,Hv:679.5796464405161,
 HRw:0.505,Lh:69.00932297322473,Lz:0,Lco:10.798717298762021,Lbeta:33.7338,TotalLossKcal:712.4650752490016,
 TotalLossPct:31.68032100959579,BoilerEff:68.31967899040421 };
let worst=0; for (const [k,e] of Object.entries(xl)) { const d=Math.abs(r[k]-e); worst=Math.max(worst,d/Math.max(1,Math.abs(e))); if (d>1e-9) console.log('MISMATCH',k,r[k],e); }
console.log('cells checked:',Object.keys(xl).length,'| max rel diff:',worst,'| efficiency',r.BoilerEff.toFixed(4));
const alt = runIS13890Calculation(IS_DEFAULTS,{radiationInTotal:true,hrwFromMoisture:false});
console.log('with radiation + physical h_f:', alt.BoilerEff.toFixed(2));
console.log('ER=0 ->', runIS13890Calculation({...IS_DEFAULTS,ER:0}).ok);
