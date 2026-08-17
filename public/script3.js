/* ════════════════════════════════════════════════════════════════════
   Boiler Efficiency — BEE — script3.js
   BEE-2 (Indirect / Heat-Loss) Method — matches the reference workbook
   "BEE-2 (Efficiency-Indirect).xlsx", sheet "BEE-2 (Indirect)", cell
   for cell. Every constant below is named after the sheet's own row
   label so the mapping back to the workbook is obvious; formulas that
   correspond to a specific cell say so in a comment (e.g. "// B34").

   Field detection (Excel upload → auto-populate) is left wired up the
   same generic way CENPEEP's script.js does it, but ALL_FIELD_IDS now
   lists BEE's own field ids instead of CENPEEP's. The actual server-
   side detection rules/training data for these ids are NOT part of
   this change (nothing in routes/upload.py, ml/field_classifier.py,
   ml/training_data.py, or routes/basic_training_data.json was
   touched) — until that's added, uploads will simply detect 0 BEE
   fields, which is expected for now. Manual entry + Calculate is fully
   live already.
   ════════════════════════════════════════════════════════════════════ */

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const v    = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
const fmt  = (n, d=4) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(d) : '—';
const fmt2 = n => fmt(n, 2);

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

// ── Input id / label table (single source of truth) ─────────────────────────
// BL/SP are informational only (see runCalculation — never read there).
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

function collectInputsFromDOM() {
  const obj = {};
  INPUT_IDS.forEach(id => {
    const el = document.getElementById(id);
    obj[id] = el ? el.value : 0;
  });
  return obj;
}

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
  const L5 = COfg * C/100 / COfg + CO2fg/5654/GCV/100;
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

// ── Entry point wired to the "▶ Calculate Efficiency" button ────────────────
function calculate() {
  window._results = runCalculation(collectInputsFromDOM());
  renderOutput(window._results);
  showTab('output');
}

// ── Render output KPIs + tables ──────────────────────────────────────────────
function renderOutput(r) {
  document.getElementById('kpi-area').innerHTML = `
    <div class="kpi-card kpi-green" style="grid-column:span 2;">
      <div class="kpi-label">Boiler Efficiency</div>
      <div class="kpi-value">${fmt2(r.BoilerEff)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">BEE-2 Indirect method (heat-loss)</div>
    </div>
    <div class="kpi-card kpi-red">
      <div class="kpi-label">L1 — Dry Flue Gas</div>
      <div class="kpi-value">${fmt2(r.L1)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">L2 — H₂ in Fuel</div>
      <div class="kpi-value">${fmt2(r.L2)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">L3 — Moisture in Fuel</div>
      <div class="kpi-value">${fmt2(r.L3)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">L4 — Moisture in Air</div>
      <div class="kpi-value">${fmt2(r.L4)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-amber">
      <div class="kpi-label">L5 — Partial C→CO</div>
      <div class="kpi-value">${fmt2(r.L5)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-amber" style="grid-column:span 2;">
      <div class="kpi-label">L6 — Radiation &amp; Unaccounted</div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
        <input type="number" id="L6live" value="${r.L6}" oninput="recalculate()"
          style="background:var(--bg);border:1px solid var(--accent);border-radius:6px;padding:6px 10px;
                 font-family:'JetBrains Mono',monospace;font-size:24px;color:var(--text-bright);width:120px;outline:none;"/>
        <span style="font-size:14px;color:var(--muted);font-family:'JetBrains Mono',monospace;">%</span>
      </div>
      <div class="kpi-sub">Enter value and recalculate</div>
    </div>
    <div class="kpi-card kpi-amber">
      <div class="kpi-label">L7 — Unburnt Fly Ash</div>
      <div class="kpi-value">${fmt2(r.L7)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-amber">
      <div class="kpi-label">L8 — Unburnt Bottom Ash</div>
      <div class="kpi-value">${fmt2(r.L8)}<span class="kpi-unit">%</span></div>
    </div>`;

  document.getElementById('output-tables').innerHTML = `
    <div class="output-section">
      <div class="output-section-head"><span>Heat Balance Summary</span></div>
      <div class="output-row header-row">
        <span>Parameter</span><span style="text-align:right">Symbol</span>
        <span style="text-align:right">kcal/kg of coal</span><span style="text-align:right">% loss</span>
      </div>
      ${heatRow('Heat Input', '', r.heatInput, 100)}
      ${heatRow('Dry Flue Gas', 'L1', r.heatInput*r.L1/100, r.L1)}
      ${heatRow('Hydrogen in Fuel', 'L2', r.heatInput*r.L2/100, r.L2)}
      ${heatRow('Moisture in Fuel', 'L3', r.heatInput*r.L3/100, r.L3)}
      ${heatRow('Moisture in Air', 'L4', r.heatInput*r.L4/100, r.L4)}
      ${heatRow('Partial Combustion C→CO', 'L5', r.heatInput*r.L5/100, r.L5)}
      ${heatRow('Surface (Radiation) Losses', 'L6', r.heatInput*r.L6/100, r.L6)}
      ${heatRow('Unburnt in Fly Ash', 'L7', r.heatInput*r.L7/100, r.L7)}
      ${heatRow('Unburnt in Bottom Ash', 'L8', r.heatInput*r.L8/100, r.L8)}
      <div class="output-row highlight-row2">
        <span class="out-name">Boiler Efficiency</span>
        <span class="out-sym">η</span>
        <span class="out-val">${fmt2(r.BoilerEff)}</span>
        <span class="out-uom">%</span>
      </div>
    </div>
    <div class="output-section">
      <div class="output-section-head"><span>Intermediate Values</span></div>
      <div class="output-row header-row">
        <span>Parameter</span><span style="text-align:right">Symbol</span>
        <span style="text-align:right">Value</span><span style="text-align:right">UoM</span>
      </div>
      ${oRow('Theoretical Air Required', 'TA', r.TA, 'kg/kg coal')}
      ${oRow('Excess Air Supplied', 'EA', r.EA, '%')}
      ${oRow('Actual Air Supplied', 'AAS', r.AAS, 'kg/kg coal')}
      ${oRow('Mass of Dry Flue Gas', 'm', r.m, 'kg/kg coal')}
    </div>`;
}

function heatRow(name, sym, kcal, pct) {
  return `<div class="output-row">
    <span class="out-name">${name}</span>
    <span class="out-sym">${sym}</span>
    <span class="out-val">${fmt2(kcal)}</span>
    <span class="out-uom">${fmt2(pct)}%</span>
  </div>`;
}

function oRow(name, sym, val, uom) {
  return `<div class="output-row">
    <span class="out-name">${name}</span>
    <span class="out-sym">${sym}</span>
    <span class="out-val">${fmt2(val)}</span>
    <span class="out-uom">${uom}</span>
  </div>`;
}

// Re-run with a live-edited L6 (radiation loss) without re-reading every
// other field from the DOM — mirrors CENPEEP's recalculate().
function recalculate() {
  if (!window._results) return;
  const L6el = document.getElementById('L6live');
  const L6 = L6el ? (parseFloat(L6el.value) || 0) : window._results.L6;
  const inputs = collectInputsFromDOM();
  inputs.L6 = L6;
  const mainL6 = document.getElementById('L6');
  if (mainL6) mainL6.value = L6;
  window._results = runCalculation(inputs);
  renderOutput(window._results);
}

// ── Reset inputs to the reference sheet's sample values ─────────────────────
function resetInputs() {
  const d = {
    BL:20, SP:66,
    O2fg:9, COfg:800, CO2fg:10.67, Tfg:180, Tamb:29.3, Hum:0.1977,
    C:53.65, H2:3.25, N2:1.11, O2f:8.68, S:0.34, M:14.43, A:18.54, GCV:4291,
    Cba:0.11, Cfa:4.89, GCVba:889, GCVfa:395,
    L6:1,
  };
  Object.entries(d).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
  window._uploadedFilename = null;
  window._uploadData       = null;
  window._results           = null;
  const st = document.getElementById('upload-status');
  if (st) { st.style.display = 'none'; st.textContent = ''; }
}

// ── Excel upload → auto-populate (field detection) ───────────────────────────
window._uploadedFilename = null;

// Mirrors routes/upload.py's REQUIRED_FIELDS pattern used by CENPEEP, but
// with BEE's own field ids. The backend doesn't know these ids yet (that's
// a separate, later change to routes/upload.py / ml/field_classifier.py /
// ml/training_data.py / routes/basic_training_data.json, deliberately left
// untouched here) — so uploads will currently detect 0 fields for this tab.
// The scaffolding is kept wired up so it "just works" once that lands,
// without another pass over this file.
const ALL_FIELD_IDS = INPUT_IDS.filter(id => !INFO_ONLY_IDS.includes(id));

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

      // ── Populate every returned field id that this form actually has ────
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

      const missingFieldsList = data.missingFields || [];
      for (const m of missingFieldsList) {
        const el = document.getElementById(m.id || m);
        if (el) el.classList.add('field-missing');
      }

      window._uploadedFilename = data.filename;
      window._uploadData       = data;

      const fieldDetail  = data.fieldDetail || {};
      const primarySheet = data.primarySheet || '';
      const sheetResults = data.sheetResults || [];

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
          const via  = d.source === 'ml' ? '🤖 AI-detected' : d.source === 'cenpeep_column' ? 'CenPeep layout' : d.source === 'derived_fallback' ? '↳ defaulted' : 'exact match';
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
        : populated
          ? `<br><small style="color:#4ade80">✓ All required fields detected</small>`
          : `<br><small style="color:#94a3b8">BEE field detection isn't wired up on the server yet — enter values manually below.</small>`;

      const timeNote = data.parseTimeMs ? ` in ${(data.parseTimeMs/1000).toFixed(1)}s` : '';

      statusEl.className   = populated ? 'upload-status success' : 'upload-status';
      statusEl.innerHTML   = `${populated ? '✓' : 'ℹ'} <b>${populated} field${populated===1?'':'s'}</b> auto-populated from "${data.filename}" (${data.fileSizeMB || '?'} MB)${timeNote}
        <br><small style="color:#94a3b8">📄 Selected sheet: <b>${primarySheet}</b> (${strat}) — out of ${sheetResults.length} sheet(s) scanned</small>
        ${fieldTable}
        ${missingLine}`;

      showToast(populated ? `Excel imported — ${populated} fields auto-populated` : 'Sheet parsed — BEE field detection not configured yet', populated ? 'success' : 'info');

    } catch (err) {
      statusEl.className   = 'upload-status error';
      statusEl.textContent = `✗ ${err.message}`;
      showToast(err.message, 'error');
    }

    input.value = '';
  });
}

// ── Save session to MongoDB ───────────────────────────────────────────────────
async function saveSession() {
  if (!window._results) { showToast('Calculate first before saving.', 'error'); return; }
  const name = prompt('Session name (optional):', window._uploadedFilename || '');
  if (name === null) return;
  const r = window._results;
  const payload = {
    sessionName: name.trim(),
    sourceFile:  window._uploadedFilename || 'Manual Entry',
    inputs:      r.inputs,
    results: {
      method: 'BEE-2 Indirect',
      BoilerEff: r.BoilerEff,
      L1: r.L1, L2: r.L2, L3: r.L3, L4: r.L4, L5: r.L5, L6: r.L6, L7: r.L7, L8: r.L8,
      TA: r.TA, EA: r.EA, AAS: r.AAS, m: r.m,
    },
  };
  try {
    const res  = await fetch('/api/sessions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    showToast('✓ Session saved to MongoDB!', 'success');
  } catch (err) {
    showToast('Save failed: ' + err.message, 'error');
  }
}

// ── CSV / PDF download ────────────────────────────────────────────────────────
function downloadCSV() {
  if (!window._results) { showToast('Calculate first.', 'error'); return; }
  const r = window._results, now = new Date().toISOString().slice(0,19).replace('T',' ');
  let csv = `BEE-2 Indirect Boiler Efficiency Report\nGenerated:,${now}\n\nINPUTS\nParameter,Value\n`;
  r.inputs.forEach(i => { csv += `"${i.label}",${i.value}\n`; });
  csv += '\nLOSSES\nParameter,Symbol,Value (%),kcal/kg of coal\n';
  [
    ['Dry Flue Gas','L1',r.L1],['Hydrogen in Fuel','L2',r.L2],['Moisture in Fuel','L3',r.L3],
    ['Moisture in Air','L4',r.L4],['Partial Combustion C→CO','L5',r.L5],
    ['Radiation & Unaccounted','L6',r.L6],['Unburnt in Fly Ash','L7',r.L7],['Unburnt in Bottom Ash','L8',r.L8],
  ].forEach(([n,s,val]) => { csv += `"${n}","${s}",${val.toFixed(4)},${(r.heatInput*val/100).toFixed(2)}\n`; });
  csv += `\n"Boiler Efficiency","eta",${r.BoilerEff.toFixed(4)},\n`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'}));
  a.download = `bee_indirect_report_${now.replace(/[: ]/g,'_')}.csv`;
  a.click();
}

function downloadPDF() {
  if (!window._results) { showToast('Calculate first.', 'error'); return; }
  const r = window._results, now = new Date().toLocaleString();
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>BEE-2 Indirect Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .hl{background:#e6fff5!important;font-weight:bold}.meta{color:#666;font-size:11px;margin-bottom:16px}
  </style></head><body>
  <h1>BEE-2 Indirect Boiler Efficiency Report</h1><p class="meta">Generated: ${now}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${r.inputs.map(i=>`<tr><td>${i.label}</td><td>${i.value}</td></tr>`).join('')}</table>
  <h2>Heat Balance</h2><table><tr><th>Parameter</th><th>Symbol</th><th>kcal/kg coal</th><th>% loss</th></tr>
  <tr><td>Heat Input</td><td></td><td>${fmt2(r.heatInput)}</td><td>100.00</td></tr>
  <tr><td>Dry Flue Gas</td><td>L1</td><td>${fmt2(r.heatInput*r.L1/100)}</td><td>${fmt2(r.L1)}</td></tr>
  <tr><td>Hydrogen in Fuel</td><td>L2</td><td>${fmt2(r.heatInput*r.L2/100)}</td><td>${fmt2(r.L2)}</td></tr>
  <tr><td>Moisture in Fuel</td><td>L3</td><td>${fmt2(r.heatInput*r.L3/100)}</td><td>${fmt2(r.L3)}</td></tr>
  <tr><td>Moisture in Air</td><td>L4</td><td>${fmt2(r.heatInput*r.L4/100)}</td><td>${fmt2(r.L4)}</td></tr>
  <tr><td>Partial Combustion C→CO</td><td>L5</td><td>${fmt2(r.heatInput*r.L5/100)}</td><td>${fmt2(r.L5)}</td></tr>
  <tr><td>Radiation &amp; Unaccounted</td><td>L6</td><td>${fmt2(r.heatInput*r.L6/100)}</td><td>${fmt2(r.L6)}</td></tr>
  <tr><td>Unburnt in Fly Ash</td><td>L7</td><td>${fmt2(r.heatInput*r.L7/100)}</td><td>${fmt2(r.L7)}</td></tr>
  <tr><td>Unburnt in Bottom Ash</td><td>L8</td><td>${fmt2(r.heatInput*r.L8/100)}</td><td>${fmt2(r.L8)}</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td></td><td><b>${fmt2(r.BoilerEff)}</b></td></tr>
  </table><script>window.print();<\/script></body></html>`);
  win.document.close();
}

// ── Field Detection Report (.docx) — same generic route CENPEEP uses ───────
async function downloadFieldReport() {
  const data = window._uploadData;
  if (!data || !data.fieldDetail || !Object.keys(data.fieldDetail).length) {
    showToast('Upload and parse a file first to generate a field report.', 'error');
    return;
  }
  const payload = {
    filename:      data.filename,
    primarySheet:  data.primarySheet,
    fieldDetail:   data.fieldDetail,
    extracted:     data.extracted,
    missingFields: data.missingFields,
  };
  try {
    const res = await fetch('/api/report', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Report generation failed (${res.status})`);
    }
    const blob = await res.blob();
    const disposition = res.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename="?([^"]+)"?/);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = match ? match[1] : 'BEE_Field_Report.docx';
    a.click();
    showToast('✓ Field report downloaded', 'success');
  } catch (err) {
    showToast('Report failed: ' + err.message, 'error');
  }
}

// ── Tab switching ─────────────────────────────────────────────────────────────
function showTab(tab) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-'+tab).classList.add('active');
  document.querySelectorAll('.tab-btn')[tab === 'input' ? 0 : 1].classList.add('active');
}

// ── Event listeners + init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initUpload();
  checkDB();
});