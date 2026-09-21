/* ════════════════════════════════════════════════════════════════════
   Boiler Efficiency — BEE — script3.js
   BEE-2 (Indirect / Heat-Loss) Method — matches the reference workbook
   "BEE-2 (Efficiency-Indirect).xlsx", sheet "BEE-2 (Indirect)", cell
   for cell. Every constant below is named after the sheet's own row
   label so the mapping back to the workbook is obvious; formulas that
   correspond to a specific cell say so in a comment (e.g. "// B34").

   Field detection (Excel upload → auto-populate) is wired up the same
   generic way CENPEEP's script.js does it — ALL_FIELD_IDS lists BEE's
   own field ids, and routes/upload.py has matching SYM_MAP/LABEL_ALIASES
   entries for them. It also has a 4th parsing strategy (label_value_layout)
   for the exact shape the reference "BEE-2 (Efficiency-Indirect).xlsx"
   sheet uses — a plain label/value form with no header row at all — which
   is what the first three CENPEEP-oriented strategies couldn't match.
   Manual entry + Calculate is fully live already.
   ════════════════════════════════════════════════════════════════════ */

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const v    = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
const fmt  = (n, d=4) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(d) : '—';
const fmt2 = n => fmt(n, 2);
// Signed variant for delta values — always shows a leading + or −.
const fmtSigned = (n, d=2) => (typeof n === 'number' && !isNaN(n)) ? (n >= 0 ? '+' : '') + n.toFixed(d) : '—';

// "YYYY-MM-DD" -> "18 August 2026" (date month year), used on the Results
// tab (kpi cards, comparison table) — same as CENPEEP / ASME-PTC 4.1.
function fmtDateDMY(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

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

// ── Date-wise Processes ─────────────────────────────────────────────────────
// Optional feature: instead of one whole-file average, the person can name
// one or more "processes", each with its own start/end date, and get a
// separate result (+ side-by-side comparison) for each. A process with no
// date range picked, or no processes added at all, falls straight back to
// today's plain behavior — the whole file's overall average, one result.
// Same mechanism as CENPEEP (public/script.js) / ASME-PTC 4.1
// (public/script2.js) — kept independent here since this page loads its
// own script, not theirs.
window._uploadData        = null;
window._processes         = [];
window._comparisonResults = null;
let   _processSeq = 0;

function addProcess() {
  _processSeq++;
  window._processes.push({
    id: 'proc' + _processSeq,
    title: `Process ${window._processes.length + 1}`,
    start: null,
    end: null,
  });
  renderProcessList();
}

function removeProcess(id) {
  window._processes = window._processes.filter(p => p.id !== id);
  renderProcessList();
}

function updateProcessTitle(id, title) {
  const p = window._processes.find(p => p.id === id);
  if (p) p.title = title;
}

function setProcessDate(id, which, iso) {
  const p = window._processes.find(p => p.id === id);
  if (!p) return;
  p[which] = iso;   // which is 'start' or 'end'
  renderProcessList();
}

// Rows from the uploaded file's dated log that fall inside [start, end]
// (inclusive; an unset bound is open-ended on that side). `extra` is an
// optional second list of rows to fold in alongside the main dated log —
// used for beeOverridesDated (e.g. Ash from the LAB sheet), which is a
// separate per-field series from the main sheet's datedRows (see the
// beeOverridesDated comment in routes/upload.py).
function _rowsInRange(start, end, extra) {
  const rows = ((window._uploadData && window._uploadData.datedRows) || [])
    .concat(extra || []);
  return rows.filter(r => r.date
    && (!start || r.date >= start)
    && (!end   || r.date <= end));
}

function _averageFieldsInRange(start, end) {
  // beeOverridesDated fields (currently just Ash) are a separate per-date
  // series from the main sheet's datedRows — e.g. Ash comes from a once-
  // a-day LAB sheet while the rest of the log is hourly readings from a
  // different sheet. Folding every field's series into one flat list
  // before filtering means Ash gets re-averaged over the SAME chosen
  // date range as everything else, instead of always showing the whole
  // LAB sheet's average regardless of which dates are picked.
  const extraRows = Object.values(
    (window._uploadData && window._uploadData.beeOverridesDated) || {}
  ).flat();
  const rows = _rowsInRange(start, end, extraRows);
  const sums = {}, counts = {};
  rows.forEach(r => Object.entries(r.values).forEach(([fid, val]) => {
    sums[fid]   = (sums[fid]   || 0) + val;
    counts[fid] = (counts[fid] || 0) + 1;
  }));
  const avg = {};
  Object.keys(sums).forEach(fid => { avg[fid] = sums[fid] / counts[fid]; });
  // rowCount reflects the main dated log only (not the extra per-field
  // series folded in above), same as before this change.
  return { avg, rowCount: _rowsInRange(start, end).length };
}

function renderProcessList() {
  const list = document.getElementById('process-list');
  if (!list) return;
  if (!window._processes.length) {
    list.innerHTML = `<div class="process-empty">No processes added — Calculate will use the whole file's average, same as today.</div>`;
    return;
  }
  list.innerHTML = window._processes.map(p => {
    const rowCount = _rowsInRange(p.start, p.end).length;
    return `
    <div class="process-row" data-id="${p.id}">
      <input type="text" class="process-title-input" value="${escapeHtml(p.title)}"
             placeholder="Process title"
             oninput="updateProcessTitle('${p.id}', this.value)">
      <button type="button" class="process-date-btn" data-role="start" data-id="${p.id}">
        ${p.start || 'Start date'}
      </button>
      <span class="process-date-sep">→</span>
      <button type="button" class="process-date-btn" data-role="end" data-id="${p.id}">
        ${p.end || 'End date'}
      </button>
      <span class="process-row-count">${rowCount} row${rowCount===1?'':'s'} in range</span>
      <button type="button" class="process-remove-btn" onclick="removeProcess('${p.id}')" title="Remove process">✕</button>
    </div>`;
  }).join('');

  list.querySelectorAll('.process-date-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id   = btn.dataset.id;
      const role = btn.dataset.role;
      const p    = window._processes.find(p => p.id === id);
      openDatePicker(btn, {
        selected: p ? p[role] : null,
        onSelect: iso => setProcessDate(id, role, iso),
      });
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ── Calendar popup (red dot = a date the uploaded file actually has data
//    for) — shared by every process's Start/End date button. ────────────────
let _calendarPopup = null;
let _calendarOutsideHandler = null;

function closeDatePicker() {
  if (_calendarPopup) { _calendarPopup.remove(); _calendarPopup = null; }
  if (_calendarOutsideHandler) {
    document.removeEventListener('mousedown', _calendarOutsideHandler);
    _calendarOutsideHandler = null;
  }
}

function openDatePicker(anchorEl, { selected, onSelect }) {
  closeDatePicker();
  const availableDates = (window._uploadData && window._uploadData.availableDates) || [];
  const availSet = new Set(availableDates);

  const base = selected ? new Date(selected + 'T00:00:00')
    : availableDates.length ? new Date(availableDates[availableDates.length - 1] + 'T00:00:00')
    : new Date();
  let viewYear  = base.getFullYear();
  let viewMonth = base.getMonth();

  const pop = document.createElement('div');
  pop.className = 'date-picker-popup';
  document.body.appendChild(pop);
  _calendarPopup = pop;

  function render() {
    const first        = new Date(viewYear, viewMonth, 1);
    const startWeekday = first.getDay();
    const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
    const monthLabel   = first.toLocaleString('default', { month: 'long' });

    let cells = '';
    for (let i = 0; i < startWeekday; i++) cells += `<span class="dp-cell dp-empty"></span>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const hasData = availSet.has(iso);
      const isSelected = selected === iso;
      cells += `<span class="dp-cell${hasData?' dp-has-data':''}${isSelected?' dp-selected':''}" data-date="${iso}">
                   ${d}${hasData ? '<i class="dp-dot"></i>' : ''}
                 </span>`;
    }

    pop.innerHTML = `
      <div class="dp-head">
        <button type="button" class="dp-nav" data-nav="-1">&lsaquo;</button>
        <span class="dp-month">${monthLabel} ${viewYear}</span>
        <button type="button" class="dp-nav" data-nav="1">&rsaquo;</button>
      </div>
      <div class="dp-grid dp-dow"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
      <div class="dp-grid">${cells}</div>
      <div class="dp-foot">
        <span class="dp-legend"><i class="dp-dot"></i> data available</span>
        <button type="button" class="dp-clear">Clear</button>
      </div>`;

    pop.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', e => {
      viewMonth += parseInt(e.currentTarget.dataset.nav, 10);
      if (viewMonth < 0)  { viewMonth = 11; viewYear--; }
      if (viewMonth > 11) { viewMonth = 0;  viewYear++; }
      render();
    }));
    pop.querySelectorAll('.dp-cell[data-date]').forEach(c => c.addEventListener('click', e => {
      onSelect(e.currentTarget.dataset.date);
      closeDatePicker();
    }));
    pop.querySelector('.dp-clear').addEventListener('click', () => { onSelect(null); closeDatePicker(); });
  }
  render();

  const rect = anchorEl.getBoundingClientRect();
  pop.style.top  = (window.scrollY + rect.bottom + 6) + 'px';
  pop.style.left = (window.scrollX + rect.left) + 'px';

  _calendarOutsideHandler = e => {
    if (_calendarPopup && !_calendarPopup.contains(e.target) && e.target !== anchorEl) closeDatePicker();
  };
  setTimeout(() => document.addEventListener('mousedown', _calendarOutsideHandler), 0);
}

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
  //
  // Written as the already-cancelled C/100 (not the literal
  // "COfg * C/100 / COfg") — those two are mathematically identical for
  // every COfg the sheet was ever tested with (x/x = 1 for any x ≠ 0), but
  // the literal form divides by COfg first and blows up to NaN (0/0)
  // whenever the actual CO reading is legitimately 0 ppm — a real, common
  // case (complete/good combustion), not an edge case to guard against
  // with a special-case check. The sheet's own formula has no real
  // discontinuity at COfg=0, only an accidental one from how it's typed —
  // this removes that without changing the result for any other reading.
  const L5 = (C/100) + CO2fg/5654/GCV/100;
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
  const activeProcesses = window._processes.filter(p => p.start || p.end);

  if (!activeProcesses.length) {
    // No date ranges chosen anywhere — exactly today's behavior.
    window._comparisonResults = null;
    window._results = runCalculation(collectInputsFromDOM());
    renderOutput(window._results);
    showTab('output');
    return;
  }

  const baseInputs = collectInputsFromDOM();
  const comparison = activeProcesses.map(p => {
    const { avg, rowCount } = _averageFieldsInRange(p.start, p.end);
    const result = runCalculation({ ...baseInputs, ...avg });
    return { title: p.title || 'Process', start: p.start, end: p.end, rowCount, result };
  });

  window._comparisonResults = comparison;
  window._results = comparison[0].result;   // keeps save/download working off the first process
  renderComparison(comparison);
  showTab('output');
}

// UI state for the collapsible process-comparison sections — persists
// across re-renders (Calculate, L6 edits, etc.) until a fresh upload. Same
// pattern as CENPEEP / ASME-PTC 4.1.
window._uiState = window._uiState || {
  processInputsOpen: false, processComparisonOpen: false,
};

function toggleResultsSection(key) {
  window._uiState[key] = !window._uiState[key];
  if (window._comparisonResults) {
    renderComparison(window._comparisonResults);
  } else if (window._results) {
    renderOutput(window._results);
  }
}

// ── Render a side-by-side comparison of multiple date-range processes ──────
const _COMPARISON_METRIC_ROWS = [
  ['Date Range',                      p => `${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}`],
  ['Rows Used',                       p => String(p.rowCount)],
  ['Boiler Efficiency (%)',           p => fmt2(p.result.BoilerEff)],
  ['Dry Flue Gas (%) — L1',           p => fmt2(p.result.L1)],
  ['H\u2082 in Fuel (%) — L2',        p => fmt2(p.result.L2)],
  ['Moisture in Fuel (%) — L3',       p => fmt2(p.result.L3)],
  ['Moisture in Air (%) — L4',        p => fmt2(p.result.L4)],
  ['Partial C\u2192CO (%) — L5',      p => fmt2(p.result.L5)],
  ['Radiation & Unaccounted (%) — L6', p => fmt2(p.result.L6)],
  ['Unburnt Fly Ash (%) — L7',        p => fmt2(p.result.L7)],
  ['Unburnt Bottom Ash (%) — L8',     p => fmt2(p.result.L8)],
];

function renderComparison(list) {
  const kpiCards = list.map(p => `
    <div class="kpi-card kpi-green">
      <div class="kpi-label">${escapeHtml(p.title)}</div>
      <div class="kpi-value">${fmt2(p.result.BoilerEff)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)} · ${p.rowCount} row${p.rowCount===1?'':'s'}</div>
    </div>`).join('');

  // Delta Difference only makes sense — and only appears — with exactly
  // two processes on screen, same as CENPEEP / ASME-PTC 4.1.
  const extras = (list.length === 2) ? _renderDeltaCard(list[0], list[1]) : '';

  document.getElementById('kpi-area').innerHTML = kpiCards + extras;

  document.getElementById('output-tables').innerHTML = `
    ${_renderProcessInputsSection(list)}
    ${_renderProcessComparisonSection(list)}`;
}

// ── Delta Difference — Process 2's Boiler Efficiency minus Process 1's. ────
function _renderDeltaCard(p1, p2) {
  const delta = p2.result.BoilerEff - p1.result.BoilerEff;
  const cls   = delta >= 0 ? 'kpi-green' : 'kpi-red';
  return `
    <div class="kpi-card ${cls}">
      <div class="kpi-label">Delta Difference</div>
      <div class="kpi-value">${fmtSigned(delta)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">${escapeHtml(p2.title)} − ${escapeHtml(p1.title)} (Boiler Eff.)</div>
    </div>`;
}

// ── Process Inputs — the per-process portion of what already splits results
//    (Process Comparison) by process. Only fields the dated log actually
//    varies by process are shown here. Collapsible — click the header to
//    expand/collapse. ───────────────────────────────────────────────────────
function _renderProcessInputsSection(list) {
  const dateAveragedIds = new Set();
  list.forEach(p => {
    const { avg } = _averageFieldsInRange(p.start, p.end);
    Object.keys(avg).forEach(fid => dateAveragedIds.add(fid));
  });
  const perProcessIds = INPUT_IDS.filter(id => dateAveragedIds.has(id));
  const open = window._uiState.processInputsOpen;

  const headerCells = list.map(p => `
    <th>${escapeHtml(p.title)}
      <div class="cmp-th-date">${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}</div>
    </th>`).join('');

  const perProcessRows = perProcessIds.map(id => {
    const cells = list.map(p => {
      const entry = p.result.inputs.find(i => i.id === id);
      return `<td>${fmt(entry ? entry.value : 0, 3)}</td>`;
    }).join('');
    return `<tr><td class="cmp-metric">${INPUT_LABELS[id] || id}</td>${cells}</tr>`;
  }).join('');

  return `
    <div class="output-section">
      <div class="output-section-head collapsible-head${open ? ' open' : ''}" onclick="toggleResultsSection('processInputsOpen')">
        <span>Process Inputs</span>
        <span class="collapse-chevron">${open ? '▾' : '▸'}</span>
      </div>
      ${open ? `
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead><tr><th>From the dated log — varies per process</th>${headerCells}</tr></thead>
          <tbody>${perProcessRows || `<tr><td colspan="${list.length + 1}">No date-based input fields — every process is using the same manual inputs.</td></tr>`}</tbody>
        </table>
      </div>
      <div class="cmp-note">Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.</div>
      ` : ''}
    </div>`;
}

// ── Process Comparison — every output metric, side by side, one column per
//    process (already includes its own "Date Range" row). Collapsible —
//    click the header to expand/collapse. ───────────────────────────────────
function _renderProcessComparisonSection(list) {
  const open = window._uiState.processComparisonOpen;
  const headerCells = list.map(p => `<th>${escapeHtml(p.title)}</th>`).join('');
  const bodyRows = _COMPARISON_METRIC_ROWS.map(([label, fn]) => `
    <tr><td class="cmp-metric">${label}</td>${list.map(p => `<td>${fn(p)}</td>`).join('')}</tr>
  `).join('');

  return `
    <div class="output-section">
      <div class="output-section-head collapsible-head${open ? ' open' : ''}" onclick="toggleResultsSection('processComparisonOpen')">
        <span>Process Comparison</span>
        <span class="collapse-chevron">${open ? '▾' : '▸'}</span>
      </div>
      ${open ? `
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead><tr><th></th>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      <div class="cmp-note">Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.</div>
      ` : ''}
    </div>`;
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
  window._uploadedFilename  = null;
  window._uploadData        = null;
  window._processes         = [];
  window._comparisonResults = null;
  window._results           = null;
  window._uiState = { processInputsOpen: false, processComparisonOpen: false };
  const st = document.getElementById('upload-status');
  if (st) { st.style.display = 'none'; st.textContent = ''; }
  const procSection = document.getElementById('process-section');
  if (procSection) procSection.style.display = 'none';
  renderProcessList();
}

// ── Excel upload → auto-populate (field detection) ───────────────────────────
window._uploadedFilename = null;

// BEE's own field ids are now registered server-side too (SYM_MAP,
// FIELD_LABELS, LABEL_ALIASES, and ml/training_data.py in routes/upload.py
// / ml/ all know about O2fg, COfg, CO2fg, Tfg, Tamb, Hum, C, H2, N2, O2f,
// GCVba, GCVfa, BL, SP — see the comments there. M/A/GCV/Cba/Cfa already
// existed as CENPEEP ids for the exact same quantities, so uploads were
// always able to fill those five; the fix registers the rest.
const ALL_FIELD_IDS = INPUT_IDS.filter(id => !INFO_ONLY_IDS.includes(id));

// Fields that are intentionally NEVER auto-detected from an upload (same
// "MANUAL" intent as the tag on their form input) — excluded from the
// "not detected — enter manually" callout below, since flagging them as
// missing would just be noise for a field that isn't meant to come from a
// file. L6 (Radiation & Unaccounted Losses) carries the MANUAL tag on
// tab3.html itself; S (Sulphur) is treated as always-manual server-side
// (routes/upload.py's NEVER_AUTO_DETECT) for every calculator, not just
// this one, since lab-report sulphur figures aren't reliably a sheet
// column.
const MANUAL_FIELD_IDS = ['L6', 'S'];

// The backend's `missingFields` response is scoped to CENPEEP's own
// required-field list (routes/upload.py's REQUIRED_FIELDS) and doesn't
// know BEE's field ids, so — same as CENPEEP not knowing BEE's ids would
// be a mismatch either way — the "not detected" list here is computed
// locally instead, straight from what this tab actually asked for
// (ALL_FIELD_IDS) versus what the upload actually returned.
function computeMissingFields(extracted) {
  return ALL_FIELD_IDS
    .filter(id => !MANUAL_FIELD_IDS.includes(id) && !(id in extracted))
    .map(id => ({ id, label: INPUT_LABELS[id] || id }));
}

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
      const res  = await Auth.authFetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();

      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'BEE');

      // ── Reset previous upload's coloring before applying the new one ─────
      for (const fid of ALL_FIELD_IDS) {
        const el = document.getElementById(fid);
        if (el) el.classList.remove('field-detected', 'field-missing');
      }

      // ── Populate every returned field id that this form actually has ────
      // BEE-2 Indirect-only overrides (see comment on the 'target' param
      // above) take priority over the shared extraction for the same
      // field id — applied here, on a local copy, so the shared
      // `data.extracted` / `data.fieldDetail` this response also carries
      // (and that any future cross-tab logic might read) stay exactly as
      // the backend returned them.
      const extracted = { ...(data.extracted || {}), ...(data.beeOverrides || {}) };
      let   populated = 0;
      for (const [fieldId, val] of Object.entries(extracted)) {
        const el = document.getElementById(fieldId);
        if (el && !el.readOnly) {
          el.value = typeof val === 'number' ? parseFloat(val.toFixed(6)) : val;
          el.classList.add('field-detected');
          populated++;
        }
      }

      const missingFieldsList = computeMissingFields(extracted);
      for (const m of missingFieldsList) {
        const el = document.getElementById(m.id || m);
        if (el) el.classList.add('field-missing');
      }
      // Overwrite the backend's CENPEEP-scoped missingFields with BEE's own
      // locally-computed list so downloadFieldReport() (which reads
      // window._uploadData.missingFields) reports against the right field
      // set too, instead of CENPEEP's.
      data.missingFields = missingFieldsList;

      window._uploadedFilename = data.filename;

      // ── Date-wise processes: keep the full parsed payload around ─────────
      // (extracted + datedRows + availableDates) so "Add Process" can slice
      // it by date range entirely client-side, with no re-upload. A fresh
      // upload always clears any processes from a previous file. Same
      // mechanism as CENPEEP (public/script.js) / ASME-PTC 4.1
      // (public/script2.js).
      window._uploadData        = data;
      window._processes         = [];
      window._comparisonResults = null;
      const procSection = document.getElementById('process-section');
      if (procSection) {
        if (data.dateFilteringAvailable && data.availableDates.length) {
          procSection.style.display = '';
          const hint = document.getElementById('process-hint');
          if (hint) {
            const first = data.availableDates[0], last = data.availableDates[data.availableDates.length - 1];
            hint.textContent = `Dated data found from ${first} to ${last} (${data.availableDates.length} day${data.availableDates.length===1?'':'s'} with readings) on "${data.primarySheet || ''}".`;
          }
        } else {
          procSection.style.display = 'none';
        }
      }
      renderProcessList();

      // Same override precedence as `extracted` above, so the "Detected
      // From" summary table matches what actually landed in the form
      // instead of describing the pre-override shared value.
      const fieldDetail = { ...(data.fieldDetail || {}) };
      for (const fid of Object.keys(data.beeOverrides || {})) {
        fieldDetail[fid] = {
          label: INPUT_LABELS[fid] || fid,
          header: 'LAB sheet (lab-tested reading)',
          source: 'rule',
          confidence: 1.0,
        };
      }
      const primarySheet = data.primarySheet || '';
      const sheetResults = data.sheetResults || [];

      const strategyLabel = {
        cenpeep_column:          'CenPeep layout',
        raw_tabular:             'raw data, averaged',
        raw_tabular_ml:          'raw data + AI field detection',
        raw_tabular_chunked:     'large sheet, chunked',
        raw_tabular_ml_chunked:  'large sheet, chunked + AI field detection',
        generic_row_layout:      'labeled-row layout',
        label_value_layout:      'label/value form layout',
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
    boilerType:  sessionStorage.getItem('boilerType') || '',
    inputs:      r.inputs,
    results: {
      method: 'BEE-2 Indirect',
      BoilerEff: r.BoilerEff,
      L1: r.L1, L2: r.L2, L3: r.L3, L4: r.L4, L5: r.L5, L6: r.L6, L7: r.L7, L8: r.L8,
      TA: r.TA, EA: r.EA, AAS: r.AAS, m: r.m,
    },
  };
  try {
    const res  = await Auth.authFetch('/api/sessions', {
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
    const res = await Auth.authFetch('/api/report', {
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