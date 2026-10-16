// Copied VERBATIM from public/summary.js — per-method fallback defaults and
// "auto-detectable" field lists.
// ── Per-method fallback defaults ─────────────────────────────────────────
// Mirrors each tab's own "Reset to Defaults" sample values exactly. Only
// used to fill in whatever this upload doesn't detect FOR THAT METHOD, so
// a partial extraction still produces a real number instead of a stack of
// zeros — same behavior as opening that tab fresh and only overwriting
// the fields the upload actually found.
const CENPEEP_DEFAULTS = {
  L:210, Ffw:615, Fin:140, Cba:1.2, Cfa:0.4, Pfa:80, Pba:20,
  M:12.2, A:40, VM:22.9, FC:24.9, GCV:3320, S:0.6,
  O2in:3.5, COin:39, O2out:5, COout:50,
  Tgi:350, Tgo:135, Tpai:40, Tpao:325, Tsai:34, Tsao:325,
  Fsa:450, Fpa:250, Tref:30,
  Md:13, Ad:40, VMd:24, FCd:23,
  Sd:0.3,
  GCVd:3300, Trad:38, Mwvd:0.013,
};

const ASME_DEFAULTS = {
  Cba:1.2, Cfa:0.4, Pfa:80, Pba:20,
  M:12.2, A:40, VM:22.9, FC:24.9, GCV:3320, S:0.6,
  O2out:5, COout:50,
  Tgo:135, Tref:30,
};

const BEE_DEFAULTS = {
  BL:20, SP:66,
  O2fg:9, COfg:800, CO2fg:10.67, Tfg:180, Tamb:29.3, Hum:0.1977,
  C:53.65, H2:3.25, N2:1.11, O2f:8.68, S:0.34, M:14.43, A:18.54, GCV:4291,
  Cba:0.11, Cfa:4.89, GCVba:0, GCVfa:0,
  L6:1,
};

// Mirrors script1.js's own DEFAULTS object (BS-2885 field ids, bsNNN).
const BS2885_DEFAULTS = {
  bs203:45, bs206:950, bs211:1650, bs215:0, bs216:0, bs217:0, bs220:0, bs221:0,
  bs224:0, bs225:0, bs228:950, bs246:3400, bs247:0, bs250:0, bs251:0, bs254:0,
  bs255:0, bs258:0, bs259:0, bs262:0,
  bs271:12, bs272:38, bs273:38, bs274:2.5, bs275:1.0, bs276:0.4, bs278:13900,
  bs279:13300, bs280:0, bs291:9.2, bs295:0.05, bs301:2000, bs323:0, bs325:0,
  bs326:0, bs328:0.05, bs329:5,
  bs332:0, bs333:0, bs334:0, bs335:0, bs336:0, bs343:2.1, bs344:0, bs345:0,
  bs349:0, bs350:0, bs352:0, bs357:0, bs360:0,
  bs362:0, bs363:0, bs390:0, bs391:0, bs392:0, bs393:0,
  bs397:60, bs398:30, bs399:0.018, bs427:135,
  bs450:8, bs451:1.2, bs453:200, bs454:0.84, bs460:0, bs461:0, bs463:0,
  bs464:0.84, bs466:30, bs467:0.4, bs469:135, bs470:0.84, bs472:0, bs473:0,
  bs475:0, bs476:0, bs477:0, bs478:0, bs479:0, bs480:0,
  bs519:0, bs601:33820, bs701:0, bs702:10120, bs704:0, bs705:0, bs708:0.35,
  bs807:10.2, bs907:0, bs909:1.2, bs910:0.3,
};

import { DEFAULTS as IS13890_DEFAULTS, IS13890_INPUT_IDS as IS13890_DETECTABLE } from './calc/is13890.js';

// ── Per-method "auto-detectable" field lists ─────────────────────────────
// Mirrors each tab's own ALL_FIELD_IDS — used only to show a coverage
// note ("8/10 fields detected from your file"), never for calculation.
const CENPEEP_DETECTABLE = ['L','Ffw','Fin','Cba','Cfa','M','A','VM','FC','GCV',
  'O2in','O2out','COout','Tgi','Tgo','Tpai','Tpao','Tsai','Tsao','Fsa','Fpa'];
const ASME_DETECTABLE = ['M','A','VM','FC','GCV','Cba','Cfa','O2out','COout','Tgo'];
const BEE_DETECTABLE = ['O2fg','COfg','CO2fg','Tfg','Tamb','Hum','C','H2','N2','O2f',
  'M','A','GCV','Cba','Cfa'];

export { IS13890_DEFAULTS, IS13890_DETECTABLE };
export { CENPEEP_DEFAULTS, ASME_DEFAULTS, BEE_DEFAULTS, BS2885_DEFAULTS, CENPEEP_DETECTABLE, ASME_DETECTABLE, BEE_DETECTABLE };
