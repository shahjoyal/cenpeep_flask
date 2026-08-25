/* ════════════════════════════════════════════════════════════════════
   Boiler Efficiency — ASME-PTC 4.1 — script2.js
   Field detection (upload → auto-populate) — reuses the exact same upload
   endpoint, field ids, and detection logic as CENPEEP (see public/
   script.js) — PLUS the ASME PTC 4.1 (Abbreviated Efficiency Test / Losses
   Method, HHV basis) calculation itself (calculate()/runCalculation()/
   renderOutput()), reference: "ASME PTC 4.1 — Boiler Efficiency" workbook,
   sheet "PTC 4.1 Calculator", Items 22–72.

   ── Why this reuses the CENPEEP/BEE field set ──────────────────────────
   Items 37–41 (as-fired proximate: Moisture/VM/FC/Ash/HHV), Item 47
   (Sulfur), Items 32–34 (dry flue-gas O₂/CO/CO₂ at the point the gas
   leaves the boiler — same physical location as CENPEEP's APH-out
   reading), Items 13/14 (flue-gas temps) and the refuse/unburnt-carbon
   inputs (Cba/Cfa/Pfa/Pba) are the SAME physical quantities CENPEEP and
   BEE already detect from an uploaded sheet — so this tab's Excel upload
   (initUpload() below) reuses them as-is via the shared field ids/
   REQUIRED_FIELDS in routes/upload.py. The Ultimate Analysis (Items
   43–46, Carbon/Hydrogen/Nitrogen/Oxygen) is derived from the Proximate
   Analysis with the same regression CENPEEP already uses — no separate
   detection needed. Only two ASME-specific loss terms have no CENPEEP/BEE
   equivalent and stay manual, entered directly on the Results page
   exactly like CENPEEP's own Radiation Loss box: Item 69 (Radiation) and
   Item 70 (Unmeasured Losses).

   Items 1–21/26/27/29–31/48/50–59/60/63/64 (steam pressures/temperatures,
   enthalpies, steam/blowdown flow, heat input/output, ash-softening temp)
   feed the workbook's separate heat-input/output energy balance, not the
   Item-72 efficiency % itself — CENPEEP/BEE don't compute that energy
   balance either (only the efficiency + loss breakdown), so it's left out
   here for the same reason, keeping this tab consistent with the other
   two.
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

// ── Excel upload → auto-populate (field detection only) ─────────────────────
window._uploadedFilename = null;

// Mirrors routes/upload.py's REQUIRED_FIELDS — same field ids as CENPEEP,
// since ASME-PTC 4.1 reuses the identical input-field set for now. Used only to
// reset detected/missing coloring across uploads.
const ALL_FIELD_IDS = [
  'Cba', 'Cfa',
  'M', 'A', 'VM', 'FC', 'GCV',
  'O2out', 'COout', 'Tgo',
];

// ── Persist for the Summary tab ──────────────────────────────────────────
// See script.js for the full explanation — same idea, same sessionStorage
// key, so any tab's upload (this one included) feeds the Summary tab
// without a second upload there.
function stashForSummary(data, sourceTab) {
  try {
    sessionStorage.setItem('cenpeep_lastUpload', JSON.stringify({
      filename: data.filename,
      primarySheet: data.primarySheet,
      sheetNameBS2885: data.sheetNameBS2885,
      extracted: data.extracted || {},
      extractedBS2885: data.extractedBS2885 || {},
      sourceTab,
      savedAt: Date.now(),
    }));
  } catch (e) { /* storage full/unavailable — Summary just won't auto-populate */ }
}

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
      stashForSummary(data, 'ASME PTC 4.1');

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

// ── ASME PTC 4.1 — calculation ───────────────────────────────────────────────
// Field ids this calculation reads, all pre-existing on this form and already
// populated by the CENPEEP-shared upload/detection above.
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

function collectInputsFromDOM() {
  const obj = {};
  ASME_INPUT_IDS.forEach(id => { const el = document.getElementById(id); obj[id] = el ? el.value : 0; });
  // Radiation (Item 69) / Unmeasured Losses (Item 70) live as editable boxes
  // on the Results page itself (see renderOutput), same UX as CENPEEP's own
  // Radiation & Unaccounted Loss box — undefined until first Calculate.
  obj.Lrad = document.getElementById('Lrad') ? v('Lrad') : undefined;
  obj.Lunm = document.getElementById('Lunm') ? v('Lunm') : undefined;
  return obj;
}

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

// ── Entry point wired to the "▶ Calculate Efficiency" button ────────────────
function calculate() {
  window._results = runCalculation(collectInputsFromDOM());
  renderOutput(window._results);
  showTab('output');
}

// ── Render output KPIs + loss breakdown ──────────────────────────────────────
function renderOutput(r) {
  document.getElementById('kpi-area').innerHTML = `
    <div class="kpi-card kpi-green">
      <div class="kpi-label">Boiler Efficiency</div>
      <div class="kpi-value boiler-eff-val">${fmt2(r.BoilerEff)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">ASME PTC 4.1 — Losses Method, HHV basis</div>
    </div>
    <div class="kpi-card kpi-red">
      <div class="kpi-label">Dry Flue Gas Loss <span style="opacity:.6">(Item 65)</span></div>
      <div class="kpi-value">${fmt2(r.L65)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">Moisture in Fuel Loss <span style="opacity:.6">(Item 66)</span></div>
      <div class="kpi-value">${fmt2(r.L66)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-green">
      <div class="kpi-label">H\u2082 Combustion Loss <span style="opacity:.6">(Item 67)</span></div>
      <div class="kpi-value">${fmt2(r.L67)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-amber">
      <div class="kpi-label">Combustibles in Refuse <span style="opacity:.6">(Item 68)</span></div>
      <div class="kpi-value">${fmt2(r.L68)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-red">
      <div class="kpi-label">Radiation Loss <span style="opacity:.6">(Item 69)</span></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
        <input type="number" id="Lrad" value="${r.Lrad}" oninput="recalculate()"
          style="background:var(--bg);border:1px solid var(--accent);border-radius:6px;padding:6px 10px;
                 font-family:'JetBrains Mono',monospace;font-size:20px;color:var(--text-bright);width:90px;outline:none;"/>
        <span style="font-size:14px;color:var(--muted);font-family:'JetBrains Mono',monospace;">%</span>
      </div>
      <div class="kpi-sub">ABMA curve / measured — enter &amp; recalculate</div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">Unmeasured Losses <span style="opacity:.6">(Item 70)</span></div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
        <input type="number" id="Lunm" value="${r.Lunm}" oninput="recalculate()"
          style="background:var(--bg);border:1px solid var(--accent);border-radius:6px;padding:6px 10px;
                 font-family:'JetBrains Mono',monospace;font-size:20px;color:var(--text-bright);width:90px;outline:none;"/>
        <span style="font-size:14px;color:var(--muted);font-family:'JetBrains Mono',monospace;">%</span>
      </div>
      <div class="kpi-sub">Mutually agreed value — enter &amp; recalculate</div>
    </div>`;

  document.getElementById('output-tables').innerHTML = `
    <div class="output-section">
      <div class="output-section-head"><span>Heat-Loss Efficiency — Items 65\u201372</span></div>
      <div class="output-row header-row">
        <span>Parameter</span><span style="text-align:right">Item</span>
        <span style="text-align:right">Value</span><span style="text-align:right">UoM</span>
      </div>
      ${oRow('Dry Flue Gas Loss',        '65', r.L65, '%')}
      ${oRow('Moisture in Fuel',         '66', r.L66, '%')}
      ${oRow('Water from H\u2082 Combustion', '67', r.L67, '%')}
      ${oRow('Combustibles in Refuse',   '68', r.L68, '%')}
      ${oRow('Radiation',                '69', r.L69, '%')}
      ${oRow('Unmeasured Losses',        '70', r.L70, '%')}
      <div class="output-row highlight-row2">
        <span class="out-name">Total Losses</span>
        <span class="out-sym">71</span>
        <span class="out-val">${fmt2(r.TotalLosses)}</span>
        <span class="out-uom">%</span>
      </div>
      <div class="output-row highlight-row2">
        <span class="out-name">Boiler Efficiency</span>
        <span class="out-sym">72</span>
        <span class="out-val">${fmt2(r.BoilerEff)}</span>
        <span class="out-uom">%</span>
      </div>
    </div>
    <div class="output-section">
      <div class="output-section-head"><span>Intermediate Values</span></div>
      <div class="output-row header-row">
        <span>Parameter</span><span style="text-align:right">Item</span>
        <span style="text-align:right">Value</span><span style="text-align:right">UoM</span>
      </div>
      ${oRow('CO\u2082, dry',                     '32', r.CO2,           '%')}
      ${oRow('N\u2082, dry (by difference)',      '35', r.N2,            '%')}
      ${oRow('Excess Air',                        '36', r.ExcessAir,     '%')}
      ${oRow('Carbon, as fired (ultimate)',       '43', r.Ca,            '%')}
      ${oRow('Hydrogen, as fired (ultimate)',     '44', r.H,             '%')}
      ${oRow('Dry Refuse per Unit Fuel',          '22', r.DryRefuse,     '\u2014')}
      ${oRow('Carbon Burned per Unit Fuel',       '24', r.CarbonBurned,  '%')}
      ${oRow('Dry Flue Gas per Unit Fuel',        '25', r.MassDFG,       '\u2014')}
    </div>`;
}

function oRow(name, item, val, uom) {
  return `<div class="output-row">
    <span class="out-name">${name}</span>
    <span class="out-sym">${item}</span>
    <span class="out-val">${fmt2(val)}</span>
    <span class="out-uom">${uom}</span>
  </div>`;
}

// Live-recalculate when the Radiation (Item 69) / Unmeasured Losses
// (Item 70) boxes on the Results page are edited — same pattern as
// CENPEEP's own Radiation & Unaccounted Loss box (public/script.js
// recalculate()) — re-derives just the total/efficiency without a full
// re-run, then refreshes the KPI + table numbers in place.
function recalculate() {
  if (!window._results) return;
  const r = window._results;
  r.Lrad = parseFloat(document.getElementById('Lrad').value) || 0;
  r.Lunm = parseFloat(document.getElementById('Lunm').value) || 0;
  r.L69  = r.Lrad;
  r.L70  = r.Lunm;
  r.TotalLosses = r.L65+r.L66+r.L67+r.L68+r.L69+r.L70;
  r.BoilerEff   = 100 - r.TotalLosses;
  document.querySelectorAll('.boiler-eff-val').forEach(el => {
    el.innerHTML = fmt2(r.BoilerEff) + '<span class="kpi-unit">%</span>';
  });
  const totalRow = document.querySelector('#output-tables .highlight-row2:nth-of-type(1) .out-val');
  const effRow   = document.querySelector('#output-tables .highlight-row2:nth-of-type(2) .out-val');
  if (totalRow) totalRow.textContent = fmt2(r.TotalLosses);
  if (effRow)   effRow.textContent   = fmt2(r.BoilerEff);
}

// ── Tab switching (Input Parameters / Results & Losses) ─────────────────────
function showTab(tab) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-'+tab).classList.add('active');
  document.querySelectorAll('.tab-btn')[tab === 'input' ? 0 : 1].classList.add('active');
}

// ── Reset inputs ──────────────────────────────────────────────────────────────
function resetInputs() {
  const d={Cba:1.2,Cfa:0.4,Pfa:80,Pba:20,
    M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:0.6,
    O2out:5,COout:50,
    Tgo:135,Tref:30};
  Object.entries(d).forEach(([id,val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
  for (const fid of ALL_FIELD_IDS) {
    const el = document.getElementById(fid);
    if (el) el.classList.remove('field-detected', 'field-missing');
  }
  window._uploadedFilename = null;
  window._results = null;
  const st = document.getElementById('upload-status');
  if (st) { st.style.display='none'; st.textContent=''; }
}

// ── Event listeners + init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initUpload();
  checkDB();
});