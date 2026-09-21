/* ════════════════════════════════════════════════════════════════════
   Boiler Efficiency — Summary — summary.js

   One Excel upload → efficiency from all four methods (CENPEEP, BS-2885,
   ASME-PTC 4.1, BEE), each computed using ONLY its own respective input
   fields — no cross-contamination between methods.

   ── How this avoids duplicating (and drifting from) each method's math ──
   Every method's calculation already exists as a pure function on its own
   tab: runCalculation() in script.js (CENPEEP), script2.js (ASME), and
   script3.js (BEE), and runBS2885Calculation() in script1.js. "Pure"
   means: plain {id: value} object in, results object out — no DOM reads,
   no side effects. This page loads each tab (calculator.html/tab1.html/
   tab2.html/tab3.html) in its own hidden iframe purely so that pure
   function can be called directly (frame.contentWindow.runCalculation(...)
   etc.) — the exact same formulas the standalone tabs use, guaranteed to
   stay in sync with them since nothing is copy-pasted. summary.js only
   does two things: (1) turn this page's single upload into the right
   {id:value} object for each method, and (2) read back the resulting
   .BoilerEff / .methodB off each frame's return value.
   ════════════════════════════════════════════════════════════════════ */

const fmt2 = n => (typeof n === 'number' && isFinite(n)) ? n.toFixed(2) : '—';

// Same key every tab's stashForSummary() writes to (script.js, script1.js,
// script2.js, script3.js) — whichever tab you last uploaded a file on,
// its parsed data (filename + both field keysets) lands here so this page
// can compute all four methods without asking for a second upload.
const SUMMARY_STORAGE_KEY = 'cenpeep_lastUpload';

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent  = msg;
  t.className    = `toast toast-${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 3200);
}

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
  Cba:0.11, Cfa:4.89, GCVba:889, GCVfa:395,
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

// ── Per-method "auto-detectable" field lists ─────────────────────────────
// Mirrors each tab's own ALL_FIELD_IDS — used only to show a coverage
// note ("8/10 fields detected from your file"), never for calculation.
const CENPEEP_DETECTABLE = ['L','Ffw','Fin','Cba','Cfa','M','A','VM','FC','GCV',
  'O2in','O2out','COout','Tgi','Tgo','Tpai','Tpao','Tsai','Tsao','Fsa','Fpa'];
const ASME_DETECTABLE = ['M','A','VM','FC','GCV','Cba','Cfa','O2out','COout','Tgo'];
const BEE_DETECTABLE = ['O2fg','COfg','CO2fg','Tfg','Tamb','Hum','C','H2','N2','O2f',
  'M','A','GCV','Cba','Cfa','GCVba','GCVfa'];

// ── Hidden calculation-engine iframes — wait for each to finish loading
//    (each is a full existing tab page) before calling into it. ─────────
const FRAME_IDS = ['frame-cenpeep', 'frame-bs2885', 'frame-asme', 'frame-bee'];
const allFramesReady = Promise.all(FRAME_IDS.map(id => new Promise(resolve => {
  const el = document.getElementById(id);
  if (!el) { resolve(null); return; }
  el.addEventListener('load', () => resolve(el), { once: true });
})));

function frameWin(id) {
  const el = document.getElementById(id);
  if (!el || !el.contentWindow) throw new Error('Calculation engine not ready yet — try again in a moment.');
  return el.contentWindow;
}

function coverageOf(extracted, ids) {
  const found = ids.filter(id => extracted && Object.prototype.hasOwnProperty.call(extracted, id)).length;
  return { found, total: ids.length };
}

// ── Run all four methods off ONE upload's extracted data — each using
//    only its own field set, exactly like using that tab standalone. ────
function computeAllEfficiencies(data) {
  const extracted   = data.extracted || {};       // shared CENPEEP/ASME/BEE keyset
  const extractedBS = data.extractedBS2885 || {};  // BS-2885's own keyset (bsNNN ids)

  const out = {};

  // CENPEEP — indirect / heat-loss method
  try {
    const raw = { ...CENPEEP_DEFAULTS, ...extracted };
    const r = frameWin('frame-cenpeep').runCalculation(raw);
    out.cenpeep = { ok: true, eff: r.BoilerEff, coverage: coverageOf(extracted, CENPEEP_DETECTABLE) };
  } catch (e) {
    out.cenpeep = { ok: false, error: e.message };
  }

  // ASME PTC 4.1 — Losses Method, HHV basis
  try {
    const raw = { ...ASME_DEFAULTS, ...extracted };
    const r = frameWin('frame-asme').runCalculation(raw);
    out.asme = { ok: true, eff: r.BoilerEff, coverage: coverageOf(extracted, ASME_DETECTABLE) };
  } catch (e) {
    out.asme = { ok: false, error: e.message };
  }

  // BEE-2 — Indirect Method
  try {
    const raw = { ...BEE_DEFAULTS, ...extracted };
    const r = frameWin('frame-bee').runCalculation(raw);
    out.bee = { ok: true, eff: r.BoilerEff, coverage: coverageOf(extracted, BEE_DETECTABLE) };
  } catch (e) {
    out.bee = { ok: false, error: e.message };
  }

  // BS-2885 (1974) — Method B (indirect/heat-loss) is the figure
  // comparable to the other three methods; Method A (direct) is shown
  // alongside it since the standard reports both.
  try {
    const raw = { ...BS2885_DEFAULTS, ...extractedBS };
    const r = frameWin('frame-bs2885').runBS2885Calculation(raw);
    out.bs2885 = {
      ok: true,
      effB: r.methodB.gross, effBnet: r.methodB.net,
      effA: r.methodA.gross, effAnet: r.methodA.net,
      coverage: { found: Object.keys(extractedBS).length, total: Object.keys(BS2885_DEFAULTS).length },
    };
  } catch (e) {
    out.bs2885 = { ok: false, error: e.message };
  }

  return out;
}

// ── Render ────────────────────────────────────────────────────────────────
function kpiCard(cls, label, sub, valueHtml) {
  return `<div class="kpi-card ${cls}">
    <div class="kpi-label">${label}</div>
    <div class="kpi-value">${valueHtml}</div>
    <div class="kpi-sub">${sub}</div>
  </div>`;
}

function renderSummary(results, data) {
  document.getElementById('summary-empty').style.display = 'none';
  document.getElementById('summary-results').style.display = '';

  const c  = results.cenpeep;
  const bs = results.bs2885;
  const a  = results.asme;
  const b  = results.bee;

  const cards = [
    kpiCard('kpi-green', 'CENPEEP',
      c.ok ? `${c.coverage.found}/${c.coverage.total} fields detected` : (c.error || 'Could not calculate'),
      c.ok ? `${fmt2(c.eff)}<span class="kpi-unit">%</span>` : '—'),

    kpiCard('kpi-blue', 'BS-2885 — Method B (indirect)',
      bs.ok ? `Method A (direct): ${fmt2(bs.effA)}% · ${bs.coverage.found}/${bs.coverage.total} fields`
            : (bs.error || 'Could not calculate'),
      bs.ok ? `${fmt2(bs.effB)}<span class="kpi-unit">%</span>` : '—'),

    kpiCard('kpi-amber', 'ASME PTC 4.1',
      a.ok ? `${a.coverage.found}/${a.coverage.total} fields detected` : (a.error || 'Could not calculate'),
      a.ok ? `${fmt2(a.eff)}<span class="kpi-unit">%</span>` : '—'),

    kpiCard('kpi-red', 'BEE-2 Indirect',
      b.ok ? `${b.coverage.found}/${b.coverage.total} fields detected` : (b.error || 'Could not calculate'),
      b.ok ? `${fmt2(b.eff)}<span class="kpi-unit">%</span>` : '—'),
  ];
  document.getElementById('summary-kpi-area').innerHTML = cards.join('');

  const effs = [
    c.ok  ? c.eff   : null,
    bs.ok ? bs.effB : null,
    a.ok  ? a.eff   : null,
    b.ok  ? b.eff   : null,
  ].filter(v => typeof v === 'number' && isFinite(v));
  const spread = effs.length > 1 ? Math.max(...effs) - Math.min(...effs) : null;


}

function timeAgo(ms) {
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return `${Math.round(h / 24)} day(s) ago`;
}

function showSourceNote(text) {
  const el = document.getElementById('summary-source-note');
  if (!el) return;
  el.textContent = text;
  el.style.display = text ? '' : 'none';
}

// Shared by both paths — a fresh upload right here, and an auto-restore
// from whatever tab was last uploaded to. `data` has the same shape
// either way: {filename, primarySheet, sheetNameBS2885, extracted,
// extractedBS2885}.
async function computeAndRender(data) {
  await allFramesReady;
  const results = computeAllEfficiencies(data);
  renderSummary(results, data);
  return results;
}

// ── Upload → calculate ────────────────────────────────────────────────────
async function handleUpload(file) {
  const statusEl = document.getElementById('upload-status');
  statusEl.style.display = 'inline-block';
  statusEl.className     = 'upload-status loading';
  statusEl.textContent   = '⏳ Parsing sheet and running all four methods…';

  const form = new FormData();
  form.append('file', file);

  try {
    const res  = await Auth.authFetch('/api/upload', { method: 'POST', body: form });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Upload failed');

    stashForSummary(data, 'Summary');
    showSourceNote('');
    const results = await computeAndRender(data);

    const okCount = ['cenpeep', 'bs2885', 'asme', 'bee'].filter(k => results[k].ok).length;
    statusEl.className   = 'upload-status success';
    statusEl.textContent = `✓ ${okCount}/4 methods calculated from "${data.filename}"`;
    showToast(`Summary updated — ${okCount}/4 methods calculated`, okCount === 4 ? 'success' : 'error');
  } catch (err) {
    statusEl.className   = 'upload-status error';
    statusEl.textContent = `✗ ${err.message}`;
    showToast(err.message, 'error');
  } finally {
    const input = document.getElementById('upload-file-input');
    if (input) input.value = '';
  }
}

// Same sessionStorage stash every other tab writes to, so a fresh upload
// made right here also becomes "the last upload" if you go check another
// tab afterwards.
function stashForSummary(data, sourceTab) {
  try {
    sessionStorage.setItem(SUMMARY_STORAGE_KEY, JSON.stringify({
      filename: data.filename,
      primarySheet: data.primarySheet,
      sheetNameBS2885: data.sheetNameBS2885,
      extracted: data.extracted || {},
      extractedBS2885: data.extractedBS2885 || {},
      sourceTab,
      savedAt: Date.now(),
    }));
  } catch (e) { /* storage full/unavailable — harmless, just no auto-restore next visit */ }
}

// ── Auto-restore: if any tab (this one included) uploaded a file earlier
//    in this browser tab's session, show its results immediately — no
//    second upload needed to see the Summary. ───────────────────────────
async function tryAutoRestore() {
  let stored;
  try {
    const raw = sessionStorage.getItem(SUMMARY_STORAGE_KEY);
    if (!raw) return;
    stored = JSON.parse(raw);
  } catch (e) { return; }
  if (!stored || !stored.extracted) return;

  try {
    const results = await computeAndRender(stored);
    const okCount = ['cenpeep', 'bs2885', 'asme', 'bee'].filter(k => results[k].ok).length;
    showSourceNote(
      `Auto-loaded from your last upload on the ${stored.sourceTab || 'another'} tab ` +
      `("${stored.filename || 'file'}", ${timeAgo(stored.savedAt)}) — ${okCount}/4 methods calculated. ` +
      `Upload a new file above to recalculate.`
    );
  } catch (e) {
    // Calculation engines not ready or bad stored data — just fall back
    // to the empty state; the upload banner still works normally.
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('upload-file-input');
  if (input) {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleUpload(file);
    });
  }
  tryAutoRestore();
});