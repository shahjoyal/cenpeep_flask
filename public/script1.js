/* ════════════════════════════════════════════════════════════════════
   Boiler Efficiency — BS-2885 — script1.js
   Field detection ONLY (upload → auto-populate). No formula / output yet
   — that's added later, once the BS-2885 method is defined. Reuses the
   exact same upload endpoint, field ids, and detection logic as CENPEEP
   (see public/script.js), just without calculate()/renderOutput()/
   saveSession()/downloadCSV()/downloadPDF().
   ════════════════════════════════════════════════════════════════════ */

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const v    = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
const fmt2 = n => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(2) : '—';

// ── DB health pill (kept for parity with CENPEEP page; harmless if absent) ──
async function checkDB() {
  const pill = document.getElementById('db-pill');
  if (!pill) return;
  try {
    const res  = await fetch('/api/health');
    const data = await res.json();
    if (data.db === 'connected') {
      pill.textContent = 'DB Online';
      pill.className   = 'db-pill online';
    } else {
      pill.textContent = 'DB Offline';
      pill.className   = 'db-pill offline';
    }
  } catch {
    pill.textContent = 'DB Offline';
    pill.className   = 'db-pill offline';
  }
}

// ── Toast notification ────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent  = msg;
  t.className    = `toast toast-${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 3200);
}

// ── Excel upload → auto-populate (field detection only) ─────────────────────
window._uploadedFilename = null;

// Mirrors routes/upload.py's REQUIRED_FIELDS — same field ids as CENPEEP,
// since BS-2885 reuses the identical input-field set for now. Used only to
// reset detected/missing coloring across uploads.
const ALL_FIELD_IDS = [
  'L', 'Ffw', 'Fin', 'Cba', 'Cfa',
  'M', 'A', 'VM', 'FC', 'GCV',
  'O2in', 'O2out', 'COout',
  'Tgi', 'Tgo', 'Tpai', 'Tpao', 'Tsai', 'Tsao', 'Fsa', 'Fpa',
];

function initUpload() {
  const input = document.getElementById('upload-file-input');
  if (!input) return;
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('upload-status');
    statusEl.style.display = 'inline-block';
    statusEl.className      = 'upload-status loading';
    statusEl.textContent    = '⏳ Parsing all sheets…';

    const form = new FormData();
    form.append('file', file);

    try {
      const res  = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();

      if (!data.ok) throw new Error(data.error || 'Upload failed');

      // ── Reset previous upload's coloring before applying the new one ─────
      for (const fid of ALL_FIELD_IDS) {
        const el = document.getElementById(fid);
        if (el) el.classList.remove('field-detected', 'field-missing');
      }

      // ── Populate every returned field id ────────────────────────────────
      const extracted = data.extracted || {};
      let   populated = 0;
      for (const [fieldId, val] of Object.entries(extracted)) {
        const el = document.getElementById(fieldId);
        if (el && !el.readOnly) {
          el.value = typeof val === 'number' ? parseFloat(val.toFixed(6)) : val;
          el.classList.add('field-detected');
          populated++;
        }
      }

      // Mark required-but-undetected fields so they're easy to spot and fill in.
      const missingFieldsList = data.missingFields || [];
      for (const m of missingFieldsList) {
        const el = document.getElementById(m.id || m);
        if (el) el.classList.add('field-missing');
      }

      // Recalc CO2 + Design Ultimate Analysis auto-fields (these are input-
      // side derived fields, same as CENPEEP — not the efficiency formula).
      autoCalcCO2();
      autoCalcDesignUltimate();
      window._uploadedFilename = data.filename;

      // ── Build "selected sheet" AI summary panel ──────────────────────────
      const sheetResults  = data.sheetResults || [];
      const fieldDetail   = data.fieldDetail || {};
      const primarySheet  = data.primarySheet || '';

      const strategyLabel = {
        cenpeep_column:          'CenPeep layout',
        raw_tabular:             'raw data, averaged',
        raw_tabular_ml:          'raw data + AI field detection',
        raw_tabular_chunked:     'large sheet, chunked',
        raw_tabular_ml_chunked:  'large sheet, chunked + AI field detection',
        unrecognized:            'no fields found',
      };
      const selectedSr = sheetResults.find(sr => sr.sheetName === primarySheet);
      const strat = selectedSr ? (strategyLabel[selectedSr.strategy] || selectedSr.strategy) : '';

      const fieldRows = Object.entries(fieldDetail)
        .sort(([, a], [, b]) => (a.label || '').localeCompare(b.label || ''))
        .map(([fid, d]) => {
          const conf = typeof d.confidence === 'number' ? `${Math.round(d.confidence * 100)}%` : '—';
          const via  = d.source === 'ml' ? '🤖 AI-detected' : d.source === 'cenpeep_column' ? 'CenPeep layout' : d.source === 'derived_fallback' ? '↳ defaulted from Secondary Air' : 'exact match';
          const from = d.header ? `"${d.header}"` : (d.label || fid);
          return `<tr><td>${d.label || fid}</td><td>${from}</td><td>${via}</td><td>${conf}</td></tr>`;
        }).join('');

      const fieldTable = fieldRows
        ? `<table style="width:100%;font-size:12px;border-collapse:collapse;margin-top:4px">
             <thead><tr style="color:#94a3b8;text-align:left">
               <th>Field</th><th>Detected From</th><th>Method</th><th>Confidence</th>
             </tr></thead>
             <tbody>${fieldRows}</tbody>
           </table>`
        : '';

      const missingNames = missingFieldsList.map(m => m.label || m.id || m);
      const missingLine = missingNames.length
        ? `<br><small style="color:#f87171">⚠ Not detected — enter manually: ${missingNames.join(', ')}</small>`
        : `<br><small style="color:#4ade80">✓ All required fields detected</small>`;

      const timeNote = data.parseTimeMs ? ` in ${(data.parseTimeMs/1000).toFixed(1)}s` : '';

      statusEl.className   = 'upload-status success';
      statusEl.innerHTML   = `✓ <b>${populated} fields</b> auto-populated from "${data.filename}" (${data.fileSizeMB || '?'} MB)${timeNote}
        <br><small style="color:#94a3b8">📄 Selected sheet: <b>${primarySheet}</b> (${strat}) — out of ${sheetResults.length} sheet(s) scanned</small>
        ${fieldTable}
        ${missingLine}`;

      showToast(`Excel imported — ${populated} fields auto-populated from "${primarySheet}"`, 'success');

    } catch (err) {
      statusEl.className   = 'upload-status error';
      statusEl.textContent = `✗ ${err.message}`;
      showToast(err.message, 'error');
    }

    // Reset the file input so the same file can be re-uploaded
    input.value = '';
  });
}

// ── Reset inputs ──────────────────────────────────────────────────────────────
function resetInputs() {
  const d={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:0.4,Pfa:80,Pba:20,
    M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:0.6,
    O2in:3.5,COin:39,O2out:5,COout:50,
    Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,
    Fsa:450,Fpa:250,Tref:30,
    Md:13,Ad:40,VMd:24,FCd:23,
    Sd:0.3,
    GCVd:3300,Trad:38,Mwvd:0.013};
  Object.entries(d).forEach(([id,val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
  for (const fid of ALL_FIELD_IDS) {
    const el = document.getElementById(fid);
    if (el) el.classList.remove('field-detected', 'field-missing');
  }
  window._uploadedFilename = null;
  const st = document.getElementById('upload-status');
  if (st) { st.style.display='none'; st.textContent=''; }
  autoCalcCO2();
  autoCalcDesignUltimate();
}

// ── CO₂ auto-calc (input-side derived field, same as CENPEEP) ───────────────
function autoCalcCO2() {
  const O2in  = v('O2in'),  O2out = v('O2out');
  const co2in = document.getElementById('CO2in');
  const co2out= document.getElementById('CO2out');
  if (co2in)  co2in.value  = (19.3 - O2in).toFixed(2);
  if (co2out) co2out.value = (19.3 - O2out).toFixed(2);
}

// ── Design — Ultimate Analysis auto-calc (input-side derived field, same
//    formula chain as CENPEEP's Ultimate Analysis — As Fired) ───────────────
function autoCalcDesignUltimate() {
  const Md = v('Md'), Ad = v('Ad'), VMd = v('VMd'), FCd = v('FCd'), Sd = v('Sd');

  const FcDc = FCd / (1 - (1.1 * Ad / 100) - (Md / 100));
  const VmDf = 100 - FcDc;
  const Cdf  = FcDc + 0.9 * (VmDf - 14);
  const Hdf  = VmDf * ((7.35 / (VmDf + 10)) - 0.013);
  const Ndf  = 2.1 - (0.012 * VmDf);
  const k    = (VMd + FCd) / (VmDf + FcDc);

  const Cd  = Cdf * k;
  const Hd  = Hdf * k;
  const Nd  = Ndf * k;
  const Md2 = Md;
  const Ad2 = Ad;
  const Od  = 100 - Cd - Sd - Hd - Md2 - Nd - Ad2;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = fmt2(val); };
  set('Cd', Cd); set('Hd', Hd); set('Nd', Nd); set('Od', Od);
  set('Md2', Md2); set('Ad2', Ad2);
}

// ── Event listeners + init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const o2in  = document.getElementById('O2in');
  const o2out = document.getElementById('O2out');
  if (o2in)  o2in.addEventListener('input',  autoCalcCO2);
  if (o2out) o2out.addEventListener('input', autoCalcCO2);
  autoCalcCO2();

  ['Md', 'Ad', 'VMd', 'FCd', 'Sd'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', autoCalcDesignUltimate);
  });
  autoCalcDesignUltimate();
  initUpload();
  checkDB();
});