/* ════════════════════════════════════════════════════════════════════
   CENPEEP  —  script.js
   Handles: calculation · Excel upload → auto-populate · DB save · toast
   ════════════════════════════════════════════════════════════════════ */

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const v    = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
const fmt  = (n, d=4) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(d) : '—';
const fmt2 = n => fmt(n, 2);
// Signed variant for delta values — always shows a leading + or −.
const fmtSigned = (n, d=2) => (typeof n === 'number' && !isNaN(n)) ? (n >= 0 ? '+' : '') + n.toFixed(d) : '—';

// "YYYY-MM-DD" -> "18 August 2026" (date month year), used everywhere a
// date is shown on the Results tab (kpi cards, comparison table, CSV/PDF).
function fmtDateDMY(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── DB health pill ────────────────────────────────────────────────────────────
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

// ── Excel upload → auto-populate ─────────────────────────────────────────────
window._uploadedFilename = null;

// Mirrors routes/upload.py's REQUIRED_FIELDS — every real CENPEEP input
// field id on the calculator form. Used only to reset detected/missing
// coloring across uploads (so a field marked red on upload #1 doesn't stay
// red forever if upload #2 doesn't mention it at all).
// Pfa/Pba ("% of Fly/Bottom Ash in Total Ash"), Sd/GCVd/Trad/Mwvd (Design
// Conditions — Ultimate Analysis: Sulfur, GCV, Ref. Air Temp, Moisture in
// Air), Md/Ad/VMd/FCd (Design — Proximate), and S/COin/Tref (As-Fired
// Sulfur, Avg. Flue Gas CO — APH In, Design Ambient / Ref Air Temp) are
// deliberately excluded — always-manual fields, never auto-detected,
// never colored (see NEVER_AUTO_DETECT in routes/upload.py). Listing them
// here would be harmless (nothing ever puts field-detected/field-missing
// on them), but they're left out to keep this list an honest mirror of
// what the backend actually reports.
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

      // Recalc CO2 + Design Ultimate Analysis auto-fields
      autoCalcCO2();
      autoCalcDesignUltimate();
      window._uploadedFilename = data.filename;

      // ── Date-wise processes: keep the full parsed payload around ─────────
      // (extracted + datedRows + availableDates) so "Add Process" can slice
      // it by date range entirely client-side, with no re-upload. A fresh
      // upload always clears any processes from a previous file — a date
      // range/title chosen against sheet A means nothing against sheet B.
      window._uploadData      = data;
      window._processes       = [];
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

      // ── Build "selected sheet" AI summary panel ──────────────────────────
      // Only the sheet that was actually chosen (data.primarySheet) is shown
      // here — not every sheet in the workbook — since that's the one whose
      // values were actually used. Per-field confidence comes from
      // data.fieldDetail (built server-side in parse_workbook()).
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

      // One row per field that was actually populated, in a stable order —
      // shown by its full name (e.g. "Steam Flow"), not the bare symbol.
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

      // Inject summary into status element (allow HTML)
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

// ── Date-wise Processes ─────────────────────────────────────────────────────
// Optional feature: instead of one whole-file average, the person can name
// one or more "processes", each with its own start/end date, and get a
// separate result (+ side-by-side comparison) for each. A process with no
// date range picked, or no processes added at all, falls straight back to
// today's plain behavior — the whole file's overall average, one result.
window._processes         = [];
window._comparisonResults = null;
window._gcvCorrection     = null;   // { target, source, targetTitle, sourceTitle } once "Apply GCV Correction" is clicked
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
// (inclusive; an unset bound is open-ended on that side).
function _rowsInRange(start, end) {
  const rows = (window._uploadData && window._uploadData.datedRows) || [];
  return rows.filter(r => r.date
    && (!start || r.date >= start)
    && (!end   || r.date <= end));
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

// ── Input id / label table (single source of truth for both the plain
//    DOM-snapshot path and the per-process pure-math path below) ────────────
const INPUT_IDS = ['L','Ffw','Fin','Cba','Cfa','Pfa','Pba','M','A','VM','FC','GCV','S',
  'O2in','CO2in','COin','O2out','CO2out','COout','Tgi','Tgo','Tpai','Tpao',
  'Tsai','Tsao','Fsa','Fpa','Tref',
  'Md','Ad','VMd','FCd','Cd','Sd','Hd','Md2','Nd','Od','Ad2','GCVd','Trad','Mwvd'];
const INPUT_LABELS = {
  L:'Unit Load (MW)',Ffw:'Steam Flow (T/hr)',Fin:'Total Coal Flow (T/hr)',
  Cba:'Unburnt C Bottom Ash (%)',Cfa:'Unburnt C Fly Ash (%)',
  Pfa:'% Fly Ash',Pba:'% Bottom Ash',
  M:'Moisture (%)',A:'Ash (%)',VM:'Volatile Matter (%)',
  FC:'Fixed Carbon (%)',GCV:'GCV (kcal/kg)',S:'Sulfur (%)',
  O2in:'O2 APH In (%)',CO2in:'CO2 APH In (%)',COin:'CO APH In (ppm)',
  O2out:'O2 APH Out (%)',CO2out:'CO2 APH Out (%)',COout:'CO APH Out (ppm)',
  Tgi:'FG Temp APH In (°C)',Tgo:'FG Temp APH Out (°C)',
  Tpai:'PA Temp In (°C)',Tpao:'PA Temp Out (°C)',
  Tsai:'SA Temp In (°C)',Tsao:'SA Temp Out (°C)',
  Fsa:'SA Flow (TPH)',Fpa:'PA Flow (TPH)',Tref:'Ambient Temp (°C)',
  Md:'Moisture Design (%)',Ad:'Ash Design (%)',VMd:'VM Design (%)',FCd:'FC Design (%)',
  Cd:'Carbon Design (%)',Sd:'Sulfur Design (%)',Hd:'Hydrogen Design (%)',
  Md2:'Moisture Design Ultimate (%)',Nd:'Nitrogen Design (%)',Od:'Oxygen Design (%)',
  Ad2:'Ash Design Ultimate (%)',GCVd:'GCV Design (kcal/kg)',
  Trad:'Ref Air Temp Design (°C)',Mwvd:'Moisture in Air Design (kg/kg)'
};
const g = (obj, id) => { const n = parseFloat(obj[id]); return isNaN(n) ? 0 : n; };

// Plain object snapshot of every input currently sitting in the form
// (used by the no-process / "normal" path — identical to what collectInputs()
// used to read straight off the DOM).
function collectInputsFromDOM() {
  const obj = {};
  INPUT_IDS.forEach(id => {
    const el = document.getElementById(id);
    obj[id] = el ? el.value : 0;
  });
  obj.Lrad = document.getElementById('Lrad') ? v('Lrad') : 1.2;
  return obj;
}

// Mirrors autoCalcCO2() + autoCalcDesignUltimate() below, but on a plain
// {id: value} object instead of the DOM — this is what lets a per-process
// result be computed without repeatedly overwriting the shared form fields.
function computeDerivedInputs(raw) {
  const inputs = { ...raw };
  const O2in = g(inputs,'O2in'), O2out = g(inputs,'O2out');
  inputs.CO2in  = 19.3 - O2in;
  inputs.CO2out = 19.3 - O2out;

  const Md = g(inputs,'Md'), Ad = g(inputs,'Ad'), VMd = g(inputs,'VMd'),
        FCd = g(inputs,'FCd'), Sd = g(inputs,'Sd');
  const FcDc = FCd / (1 - (1.1*Ad/100) - (Md/100));
  const VmDf = 100 - FcDc;
  const Cdf  = FcDc + 0.9*(VmDf - 14);
  const Hdf  = VmDf * ((7.35/(VmDf+10)) - 0.013);
  const Ndf  = 2.1 - (0.012*VmDf);
  const k    = (VMd + FCd) / (VmDf + FcDc);

  inputs.Cd  = Cdf * k;
  inputs.Hd  = Hdf * k;
  inputs.Nd  = Ndf * k;
  inputs.Md2 = Md;
  inputs.Ad2 = Ad;
  inputs.Od  = 100 - inputs.Cd - Sd - inputs.Hd - inputs.Md2 - inputs.Nd - inputs.Ad2;
  return inputs;
}

// ── Core calculation (pure — takes a plain {id: value} object, returns the
//    results object; no DOM reads/writes) ────────────────────────────────────
// NOTE: this follows the CENPEEP / IS 8753 "indirect (heat loss) method" —
// O2-based excess air, empirical proximate→ultimate regression, fixed
// 1.09% radiation loss, fixed 20/80 bottom/fly ash split — matching the
// reference "Boiler Efficiency Calculation by Heat Loss Method" workbook
// (Efficiency overall / Effi. >570 sheets) formula-for-formula, so results
// reproduce the workbook to the same input data. This replaced an earlier
// CO2/Ostwald-based formulation that used a different (non-CENPEEP) loss
// methodology and did not reconcile with the workbook.
function runCalculation(rawInputs) {
  const inputs = computeDerivedInputs(rawInputs);
  const gv = id => g(inputs, id);

  const M=gv('M'),A=gv('A'),VM=gv('VM'),FC=gv('FC'),GCV=gv('GCV');
  const S=gv('S') || 0.3;                 // workbook fixes Sulphur at 0.3% (D13/E13)
  const O2in=gv('O2in'),O2out=gv('O2out'),COout=gv('COout'),COin=gv('COin');
  const Tgi=gv('Tgi'),Tgo=gv('Tgo'),Tpai=gv('Tpai'),Tpao=gv('Tpao');
  const Tsai=gv('Tsai'),Tsao=gv('Tsao'),Fsa=gv('Fsa'),Fpa=gv('Fpa');
  const Cba=gv('Cba'),Cfa=gv('Cfa');
  const Pfa=gv('Pfa') || 80, Pba=gv('Pba') || 20;   // workbook's fixed fly/bottom ash split (0.8 / 0.2)
  const Lrad=gv('Lrad') || 1.09;          // workbook fixes Radiation & Unaccounted Loss at 1.09% (D41/E41)
  const Trad=gv('Trad') || 35;            // design/reference ambient air temp (D27/E27, fixed 35°C)
  const Cp=30.6, CVc=8077.8, Mwv=0.0166;
  const COoutp=(COout/1000000)*100;       // convert ppm -> % (workbook's CO term is a %)

  // Ultimate analysis — empirical regression from Proximate Analysis (AFB),
  // matching Efficiency overall!D11:D15 exactly.
  const Ca=0.97*FC+0.7*(VM+0.1*A)-M*(0.6-0.01*M);
  const H =0.036*FC+0.086*(VM-0.1*A)-0.0035*M*M*(1-0.02*M);
  const N =2.1-0.02*VM;
  const O =100-M-A-Ca-H-S-N;

  // Reference/ambient air temp = SA-inlet temp reading directly (no PA blend) — matches D28/E28.
  const Trai=Tsai;

  // CO2 at APH outlet from the workbook's O2-based relation (D17='18.5-O2out').
  const CO2in=19.3-O2in;   // kept for the design-correction branch below (unchanged there)
  const CO2out=18.5-O2out;
  const N2out=100-(O2out+CO2out+COoutp);

  // Ash & carbon — unburnt-in-ash uses the fixed 20% bottom / 80% fly split.
  const Cash=Pfa/100*Cfa+Pba/100*Cba, U=A/100*Cash/(100-Cash);

  // Air Heater Leakage & corrected APH-outlet gas temperature (D23:D25).
  const AL=(O2out-O2in)/(21-O2out)*0.9*100;
  const Tc0=(AL*0.24*(Tgo-Trai))/(100*0.13286)+Tgo;
  const Tgc=(Trad*(Tgi-Tc0)+Tgi*(Tc0-Trai))/(Tgi-Trai);
  const dT=Tgc-Trad;

  // Theoretical Air Requirement & Actual Air Supplied (D32:D35).
  const TAR=((11.6*Ca)+(34.8*(H-O/8))+(4.35*S))/100;
  const EA=O2out/(21-O2out)*100;
  const AAS=(1+EA/100)*TAR;
  const MassDFG=(Ca/100)*44/12+(N/100)+AAS*77/100+(AAS-TAR)*23/100;

  // Losses L1..L7 (D36:D42) — kept under the app's existing Ldg/Luc/Lmf/Lhf/Lco/Lma/Lrad names.
  const Ldg=MassDFG*0.24*dT/GCV*100;                              // L1 Dry Flue Gas
  const Lhf=9*(H/100)*(584+0.45*dT)/GCV*100;                      // L2 Hydrogen in Fuel
  const Lmf=(M/100)*(584+0.45*dT)/GCV*100;                        // L3 Moisture in Fuel
  const Lma=AAS*0.01765*0.45*dT/GCV*100;                          // L4 Moisture in Air
  const Lco=(CO2out+COoutp)>0 ? (COoutp*Ca/100/(COoutp+CO2out))*5744/GCV*100 : 0; // L5 CO
  const Luc=((A*Pba/100*Cba)/(100*(100-Cba))+(A*Pfa/100*Cfa)/(100*(100-Cfa)))*8084*100/GCV; // L7 Unburnt combustibles
  const BoilerEff=100-(Ldg+Lhf+Lmf+Lma+Lco+Lrad+Luc);

  // Kept for the "Intermediate Values" panel and the design-correction branch below.
  const Sa=(2.66*(Ca-U*100)+7.937*H+0.996*S-O)/23.2;
  const Ea=1+(O2out-COoutp/2)/(0.2682*N2out-(O2out-COoutp));
  const Ma=Sa*Ea*Mwv;
  const Wd=(Ca+S/2.67-100*U)/(12*CO2out);
  const Sh=Wd*Cp*(Tgo-Trai), Sw=1.88*(Tgo-25)+2442+4.2*(25-Trai);
  const Tgnl=Tc0;

  // Design conditions (separate "correct-to-design-coal" branch, unrelated to
  // the workbook's Corrected column — see comment on BoilerEffCorr below).
  const Cd=gv('Cd'),Sd=gv('Sd'),Hd=gv('Hd'),Od=gv('Od');
  const Ad2=gv('Ad2'),GCVd=gv('GCVd'),Mwvd=gv('Mwvd');
  const Md=gv('Md2');
  const CVco=2415;

  // Corrected gas temp
  const ALd=(CO2in-CO2out)*0.9*100/CO2out;
  const Tgcd=(Trad*(Tgi-Tgo)+Tgi*(Tgo-Trai))/(Tgi-Trai);

  // Corrected losses
  const Wdc=(Cd+Sd/2.67-100*U)/(12*CO2out);
  const Shc=Wdc*Cp*(Tgcd-Trad);
  const Ldgc=Shc*100/(GCVd*4.186);

  const Kc=Math.exp(0.225*Cd/Hd)-Math.exp(0.225*Ca/H);
  const V_corr=(gv('VMd')<17)?0.013*(Ad2*GCV/(A*GCVd))*Kc:0;
  const Lucc=Luc*((Ad2*GCV)/(A*GCVd))+V_corr;

  const Swd=1.88*(Tgcd-25)+2442+4.2*(25-Trad);
  const Lmfc=Swd*Md/(GCVd*4.186);
  const Lhfc=9*Hd*Swd/(GCVd*4.186);
  const Lcoc=COoutp*7*CVco*(Cd-100*U)/3/(CO2out+COoutp)/GCVd;

  const Sad=(2.66*(Cd-U*100)+7.937*Hd+0.996*Sd-Od)/23.2;
  const Ead=1+(O2out-COoutp/2)/(0.2682*N2out-(O2out-COoutp));
  const Mad=Sad*Ead*Mwvd;
  const Lmac=Mad*1.88*(Tgcd-Trad)*100/(GCVd*4.186);

  const BoilerEffCorr=100-(Ldgc+Lucc+Lmfc+Lhfc+Lcoc+Lmac+Lrad);

  return {
    CO2in,CO2out,COoutp,Trai,Cash,U,
    N2out,Sa,Ea,Ma,Wd,Sh,Sw,
    Ldg,Luc,Lmf,Lhf,Lco,Lma,Lrad,BoilerEff,
    AL,Tgnl,Tgc,ALd,Tgcd,Ldgc,Lucc,Lmfc,Lhfc,Lcoc,Lmac,BoilerEffCorr,
    inputs: INPUT_IDS.map(id => ({ id, label: INPUT_LABELS[id] || id, value: inputs[id] })),
  };
}

// Average every field the dated log actually has readings for, across just
// the rows inside [start, end]. Fields the log doesn't carry (manual-only
// ones like S, COin, Tref, Pfa/Pba, the whole Design block, ...) simply
// aren't in `avg` and fall through to whatever's currently in the form —
// same shared value for every process, exactly like today.
function _averageFieldsInRange(start, end) {
  const rows = _rowsInRange(start, end);
  const sums = {}, counts = {};
  rows.forEach(r => Object.entries(r.values).forEach(([fid, val]) => {
    sums[fid]   = (sums[fid]   || 0) + val;
    counts[fid] = (counts[fid] || 0) + 1;
  }));
  const avg = {};
  Object.keys(sums).forEach(fid => { avg[fid] = sums[fid] / counts[fid]; });
  return { avg, rowCount: rows.length };
}

// ── Entry point wired to the "▶ Calculate Efficiency" button ────────────────
function calculate() {
  const activeProcesses = window._processes.filter(p => p.start || p.end);
  window._gcvCorrection = null;   // fresh Calculate — any prior correction no longer applies

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

// ── Render output KPIs ────────────────────────────────────────────────────────
function renderOutput(r) {
  document.getElementById('kpi-area').innerHTML = `
    <div class="kpi-card kpi-green">
      <div class="kpi-label">Boiler Efficiency</div>
      <div class="kpi-value boiler-eff-val">${fmt2(r.BoilerEff)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">Indirect method — as-tested</div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">Boiler Efficiency Corrected</div>
      <div class="kpi-value boiler-eff-corr-val">${fmt2(r.BoilerEffCorr)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">Corrected to design conditions</div>
    </div>
    <div class="kpi-card kpi-red">
      <div class="kpi-label">Dry Gas Loss</div>
      <div class="kpi-value">${fmt2(r.Ldg)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-amber">
      <div class="kpi-label">Loss — Unburnt Carbon</div>
      <div class="kpi-value">${fmt2(r.Luc)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">Loss — Moisture in Fuel</div>
      <div class="kpi-value">${fmt2(r.Lmf)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-green">
      <div class="kpi-label">Loss — Hydrogen in Fuel</div>
      <div class="kpi-value">${fmt2(r.Lhf)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-amber">
      <div class="kpi-label">Loss — Carbon Monoxide</div>
      <div class="kpi-value">${fmt(r.Lco)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-blue">
      <div class="kpi-label">Loss — Moisture in Air</div>
      <div class="kpi-value">${fmt2(r.Lma)}<span class="kpi-unit">%</span></div>
    </div>
    <div class="kpi-card kpi-red" style="grid-column:span 2;">
      <div class="kpi-label">Radiation &amp; Unaccounted Loss</div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
        <input type="number" id="Lrad" value="${r.Lrad||1.09}" oninput="recalculate()"
          style="background:var(--bg);border:1px solid var(--accent);border-radius:6px;padding:6px 10px;
                 font-family:'JetBrains Mono',monospace;font-size:24px;color:var(--text-bright);width:120px;outline:none;"/>
        <span style="font-size:14px;color:var(--muted);font-family:'JetBrains Mono',monospace;">%</span>
      </div>
      <div class="kpi-sub">Enter value and recalculate</div>
    </div>`;

  document.getElementById('output-tables').innerHTML = `
    <div class="output-section">
      <div class="output-section-head"><span>Corrected Losses</span></div>
      <div class="output-row header-row">
        <span>Parameter</span><span style="text-align:right">Symbol</span>
        <span style="text-align:right">Value</span><span style="text-align:right">UoM</span>
      </div>
      ${oRow('Dry Gas Loss (Corrected)',         'Ldgc',  r.Ldgc,  '%')}
      ${oRow('Unburnt Carbon Loss (Corrected)',  'Lucc',  r.Lucc,  '%')}
      ${oRow('Moisture Fuel Loss (Corrected)',   'Lmfc',  r.Lmfc,  '%')}
      ${oRow('Hydrogen Fuel Loss (Corrected)',   'Lhfc',  r.Lhfc,  '%')}
      ${oRow('CO Loss (Corrected)',              'Lcoc',  r.Lcoc,  '%')}
      ${oRow('Moisture Air Loss (Corrected)',    'Lmac',  r.Lmac,  '%')}
      <div class="output-row highlight-row2">
        <span class="out-name">Boiler Efficiency — Corrected</span>
        <span class="out-sym">η<sub>corr</sub></span>
        <span class="out-val">${fmt2(r.BoilerEffCorr)}</span>
        <span class="out-uom">%</span>
      </div>
    </div>
    <div class="output-section">
      <div class="output-section-head"><span>Intermediate Values</span></div>
      <div class="output-row header-row">
        <span>Parameter</span><span style="text-align:right">Symbol</span>
        <span style="text-align:right">Value</span><span style="text-align:right">UoM</span>
      </div>
      ${oRow('CO₂ — APH In',               'CO₂in',  r.CO2in,  '%')}
      ${oRow('CO₂ — APH Out',              'CO₂out', r.CO2out, '%')}
      ${oRow('Weighted Air Temp In',        'Trai',   r.Trai,   '°C')}
      ${oRow('AH Leakage',                 'AL',     r.AL,     '%')}
      ${oRow('Gas Temp — Corrected',       'Tgc',    r.Tgc,   '°C')}
      ${oRow('Stoichiometric Air',          'Sa',     r.Sa,     'kg/kg')}
      ${oRow('Excess Air',                 'Ea',     r.Ea,     '—')}
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

// ── Render a side-by-side comparison of multiple date-range processes ───────
const _COMPARISON_METRIC_ROWS = [
  ['Date Range',                       p => `${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}`],
  ['Rows Used',                        p => String(p.rowCount)],
  ['Boiler Efficiency (%)',            p => fmt2(p.result.BoilerEff)],
  ['Boiler Efficiency Corrected (%)',  p => fmt2(p.result.BoilerEffCorr)],
  ['Dry Gas Loss (%)',                 p => fmt2(p.result.Ldg)],
  ['Unburnt Carbon Loss (%)',          p => fmt2(p.result.Luc)],
  ['Moisture Fuel Loss (%)',           p => fmt2(p.result.Lmf)],
  ['Hydrogen Fuel Loss (%)',           p => fmt2(p.result.Lhf)],
  ['CO Loss (%)',                      p => fmt(p.result.Lco)],
  ['Moisture Air Loss (%)',            p => fmt2(p.result.Lma)],
  ['Radiation & Unaccounted Loss (%)', p => fmt2(p.result.Lrad)],
  ['CO₂ — APH In (%)',                 p => fmt2(p.result.CO2in)],
  ['CO₂ — APH Out (%)',                p => fmt2(p.result.CO2out)],
];

// UI state for the two collapsible Results-tab sections — persists across
// re-renders (Calculate, GCV correction toggle, etc.) until a fresh upload.
window._uiState = window._uiState || { processInputsOpen: false, processComparisonOpen: false };
function toggleResultsSection(key) {
  window._uiState[key] = !window._uiState[key];
  if (window._comparisonResults) renderComparison(window._comparisonResults);
}

function renderComparison(list) {
  const kpiCards = list.map(p => `
    <div class="kpi-card kpi-green">
      <div class="kpi-label">${escapeHtml(p.title)}${p.gcvCorrected ? ' <span class="cmp-badge">GCV corrected</span>' : ''}</div>
      <div class="kpi-value">${fmt2(p.result.BoilerEff)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)} · ${p.rowCount} row${p.rowCount===1?'':'s'}</div>
    </div>`).join('');

  // Delta Difference + the two correction buttons only make sense — and
  // only appear — with exactly two processes on screen; all three sit in
  // the same row as the Boiler Efficiency cards above.
  const extras = (list.length === 2)
    ? _renderDeltaCard(list[0], list[1]) + _renderCorrectionButtons()
    : '';

  document.getElementById('kpi-area').innerHTML = kpiCards + extras;

  document.getElementById('output-tables').innerHTML = `
    ${_renderProcessInputsSection(list)}
    ${_renderProcessComparisonSection(list)}`;
}

// ── Delta Difference — Process 2's Boiler Efficiency minus Process 1's.
//    Always shown for a two-process comparison (not gated behind clicking
//    a correction) — can be negative or positive, colored accordingly. If a
//    GCV correction has been applied, the processes' own results already
//    reflect it, so this updates automatically. ──────────────────────────
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

// ── "Apply GCV / APH Correction" — rendered as clickable cards in the same
//    row as the Boiler Efficiency + Delta Difference cards. ─────────────────
function _renderCorrectionButtons() {
  const corr = window._gcvCorrection;
  return `
    <button type="button" class="kpi-card kpi-action${corr ? ' applied' : ''}" onclick="applyGCVCorrection()">
      <div class="kpi-label">GCV Correction${corr ? ' <span class="cmp-badge">Applied</span>' : ''}</div>
      <div class="kpi-value kpi-action-value">${corr ? 'Click to undo' : 'Apply GCV Correction'}</div>
      <div class="kpi-sub">${corr
        ? `"${escapeHtml(corr.targetTitle)}" ← Proximate As-Fired from "${escapeHtml(corr.sourceTitle)}"`
        : `Uses the later-dated process's Proximate As-Fired data for the earlier one.`}</div>
    </button>
    <button type="button" class="kpi-card kpi-action" onclick="applyAPHCorrection()">
      <div class="kpi-label">APH Correction</div>
      <div class="kpi-value kpi-action-value">Apply APH Correction</div>
      <div class="kpi-sub">Coming soon.</div>
    </button>`;
}

// ── GCV Correction ───────────────────────────────────────────────────────
// Only meaningful with exactly two active processes. The process with the
// LATER date "donates" its Proximate Analysis — As Fired readings
// (Moisture, Ash, Volatile Matter, Fixed Carbon, GCV) to the process with
// the EARLIER date; every other input of the earlier process is untouched,
// and the later process's own data is untouched too. Both efficiencies are
// then recomputed so the update is visible on both cards.
const PROXIMATE_AS_FIRED_IDS = ['M', 'A', 'VM', 'FC', 'GCV'];

// Best single date to sort a process by — start if set, else end.
function _processDateKey(p) { return p.start || p.end || null; }

function applyGCVCorrection() {
  const list = window._comparisonResults;
  if (!list || list.length !== 2) {
    showToast('GCV correction needs exactly two active processes.', 'error');
    return;
  }
  if (window._gcvCorrection) { undoGCVCorrection(); return; }

  const [p0, p1] = list;
  const k0 = _processDateKey(p0), k1 = _processDateKey(p1);
  if (!k0 || !k1) {
    showToast('Both processes need at least one date set to apply GCV correction.', 'error');
    return;
  }
  if (k0 === k1) {
    showToast('Both processes resolve to the same date — cannot tell which is later.', 'error');
    return;
  }
  const later   = k1 > k0 ? p1 : p0;   // process whose date comes after
  const earlier = k1 > k0 ? p0 : p1;   // process whose date comes before — gets corrected

  const baseInputs          = collectInputsFromDOM();
  const { avg: avgEarlier } = _averageFieldsInRange(earlier.start, earlier.end);
  const { avg: avgLater   } = _averageFieldsInRange(later.start,   later.end);

  // Earlier process: same as it was, except Proximate As-Fired comes from
  // the later process (falling back to the shared form value if the log
  // doesn't carry that field, same as the normal per-process averaging).
  const correctedInputs = { ...baseInputs, ...avgEarlier };
  PROXIMATE_AS_FIRED_IDS.forEach(id => {
    correctedInputs[id] = (avgLater[id] !== undefined) ? avgLater[id] : baseInputs[id];
  });

  earlier._originalResult = earlier.result;         // keep the "without correction" result for the Delta card
  earlier.result          = runCalculation(correctedInputs);
  earlier.gcvCorrected    = true;

  // Later process's data is untouched — re-run it anyway so both numbers
  // on screen come from the same fresh calculation pass.
  later.result = runCalculation({ ...baseInputs, ...avgLater });

  window._gcvCorrection = { target: earlier, source: later, targetTitle: earlier.title, sourceTitle: later.title };

  renderComparison(window._comparisonResults);
  showToast(`GCV correction applied — "${earlier.title}" now uses "${later.title}"'s Proximate As-Fired data.`, 'success');
}

function undoGCVCorrection() {
  const corr = window._gcvCorrection;
  if (!corr) return;
  corr.target.result = corr.target._originalResult;
  delete corr.target._originalResult;
  corr.target.gcvCorrected = false;
  window._gcvCorrection = null;
  renderComparison(window._comparisonResults);
  showToast('GCV correction removed.', 'success');
}

// APH correction — logic to follow later; button already in place.
function applyAPHCorrection() {
  showToast('APH correction is coming soon.', 'success');
}

// ── Input bifurcation — the per-process portion of what today already
//    splits results (Process Comparison) by process. Only the fields the
//    dated log actually varies by process are shown here — manual-only /
//    Design-block fields are the same everywhere and are covered by the
//    Process Comparison table's "Date Range" row instead of a separate
//    table. Collapsible — click the header to expand/collapse. ─────────────
function _renderProcessInputsSection(list) {
  const dateAveragedIds = new Set();
  list.forEach(p => {
    const { avg } = _averageFieldsInRange(p.start, p.end);
    Object.keys(avg).forEach(fid => dateAveragedIds.add(fid));
  });
  const perProcessIds = INPUT_IDS.filter(id => dateAveragedIds.has(id));

  const corr = window._gcvCorrection;
  const open = window._uiState.processInputsOpen;

  const headerCells = list.map(p => `
    <th>${escapeHtml(p.title)}${p.gcvCorrected ? ' <span class="cmp-badge">GCV corrected</span>' : ''}
      <div class="cmp-th-date">${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}</div>
    </th>`).join('');

  const perProcessRows = perProcessIds.map(id => {
    const cells = list.map(p => {
      const entry = p.result.inputs.find(i => i.id === id);
      const fromCorrection = corr && p === corr.target && PROXIMATE_AS_FIRED_IDS.includes(id);
      const flag = fromCorrection
        ? ` <small style="color:var(--accent2)" title="From &quot;${escapeHtml(corr.sourceTitle)}&quot;">↺</small>`
        : '';
      return `<td>${fmt(entry ? entry.value : 0, 3)}${flag}</td>`;
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
          <tbody>${perProcessRows || `<tr><td colspan="${list.length + 1}">No date-based input fields — every process is using the same manual/Design inputs.</td></tr>`}</tbody>
        </table>
      </div>
      <div class="cmp-note">Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, Design conditions, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.</div>
      ` : ''}
    </div>`;
}

// ── Process Comparison — every output metric, side by side, one column per
//    process (already includes its own "Date Range" row). Collapsible —
//    click the header to expand/collapse. ───────────────────────────────────
function _renderProcessComparisonSection(list) {
  const open = window._uiState.processComparisonOpen;
  const headerCells = list.map(p => `<th>${escapeHtml(p.title)}${p.gcvCorrected ? ' <span class="cmp-badge">GCV corrected</span>' : ''}</th>`).join('');
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
      <div class="cmp-note">Fields not present in the uploaded log (manual-only inputs, Design conditions, …) use the same value — whatever's currently in the Input Parameters tab — across every process.</div>
      ` : ''}
    </div>`;
}

// ── Save session(s) to MongoDB ───────────────────────────────────────────────
async function _saveOneSession(r, sessionName) {
  const payload = {
    sessionName,
    sourceFile: window._uploadedFilename || 'Manual Entry',
    inputs:     r.inputs,
    results: {
      BoilerEff: r.BoilerEff, BoilerEffCorr: r.BoilerEffCorr,
      Ldg: r.Ldg, Luc: r.Luc, Lmf: r.Lmf, Lhf: r.Lhf,
      Lco: r.Lco, Lma: r.Lma, Lrad: r.Lrad,
      CO2in: r.CO2in, CO2out: r.CO2out, Trai: r.Trai,
      AL: r.AL, Tgc: r.Tgc,
      Ldgc: r.Ldgc, Lucc: r.Lucc, Lmfc: r.Lmfc,
      Lhfc: r.Lhfc, Lcoc: r.Lcoc, Lmac: r.Lmac
    }
  };
  const res  = await fetch('/api/sessions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error);
}

async function saveSession() {
  if (window._comparisonResults && window._comparisonResults.length) {
    if (!confirm(`Save all ${window._comparisonResults.length} process result(s) to the database?`)) return;
    try {
      for (const p of window._comparisonResults) {
        await _saveOneSession(p.result, `${window._uploadedFilename || 'Manual Entry'} — ${p.title}`);
      }
      showToast('✓ All process results saved to MongoDB!', 'success');
    } catch (err) {
      showToast('Save failed: ' + err.message, 'error');
    }
    return;
  }

  if (!window._results) { showToast('Calculate first before saving.', 'error'); return; }
  const name = prompt('Session name (optional):', window._uploadedFilename || '');
  if (name === null) return;   // user cancelled
  try {
    await _saveOneSession(window._results, name.trim());
    showToast('✓ Session saved to MongoDB!', 'success');
  } catch (err) {
    showToast('Save failed: ' + err.message, 'error');
  }
}

// ── Tab switching ─────────────────────────────────────────────────────────────
function showTab(tab) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-'+tab).classList.add('active');
  document.querySelectorAll('.tab-btn')[tab === 'input' ? 0 : 1].classList.add('active');
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
  window._uploadedFilename   = null;
  window._uploadData         = null;
  window._processes          = [];
  window._comparisonResults  = null;
  window._gcvCorrection      = null;
  window._uiState            = { processInputsOpen: false, processComparisonOpen: false };
  const st = document.getElementById('upload-status');
  if (st) { st.style.display='none'; st.textContent=''; }
  const procSection = document.getElementById('process-section');
  if (procSection) procSection.style.display = 'none';
  renderProcessList();
  autoCalcCO2();
  autoCalcDesignUltimate();
}

// ── CO₂ auto-calc ─────────────────────────────────────────────────────────────
function autoCalcCO2() {
  const O2in  = v('O2in'),  O2out = v('O2out');
  const co2in = document.getElementById('CO2in');
  const co2out= document.getElementById('CO2out');
  if (co2in)  co2in.value  = (19.3 - O2in).toFixed(2);
  if (co2out) co2out.value = (19.3 - O2out).toFixed(2);
}

// ── Design — Ultimate Analysis auto-calc ────────────────────────────────────
// Derives Carbon/Hydrogen/Nitrogen/Oxygen/Moisture/Ash (Design) from the
// Design — Proximate inputs (Md/Ad/VMd/FCd), mirroring the exact formula
// chain used for Ultimate Analysis — As Fired in the CenPeep sheet:
//   FcDc = FC / (1 - 1.1*A/100 - M/100)      VmDf = 100 - FcDc
//   Cdf  = FcDc + 0.9*(VmDf - 14)            Hdf  = VmDf*(7.35/(VmDf+10) - 0.013)
//   Ndf  = 2.1 - 0.012*VmDf                  k    = (VM+FC) / (VmDf+FcDc)
//   C = Cdf*k   H = Hdf*k   N = Ndf*k   O = 100 - C - S - H - M - N - A
// Sulfur (Sd) and GCV (GCVd) have no Proximate-side equivalent to derive
// from, so — same as As-Fired S/GCV — they stay manual inputs, not computed.
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

function recalculate() {
  if (!window._results) return;
  const Lrad = parseFloat(document.getElementById('Lrad').value) || 0;
  const r = window._results;
  r.Lrad = Lrad;
  const BoilerEff = 100-(r.Ldg+r.Luc+r.Lmf+r.Lhf+r.Lco+r.Lma+Lrad);
  r.BoilerEff = BoilerEff;
  document.querySelectorAll('.boiler-eff-val').forEach(el => {
    el.innerHTML = fmt2(BoilerEff) + '<span class="kpi-unit">%</span>';
  });
}

// ── CSV / PDF download ────────────────────────────────────────────────────────
function downloadCSV() {
  if (window._comparisonResults && window._comparisonResults.length) { downloadComparisonCSV(); return; }
  if (!window._results) { showToast('Calculate first.', 'error'); return; }
  const r=window._results, now=new Date().toISOString().slice(0,19).replace('T',' ');
  let csv=`CENPEEP Boiler Efficiency Report\nGenerated:,${now}\n\nINPUTS\nParameter,Value\n`;
  r.inputs.forEach(i=>{ csv+=`"${i.label}",${i.value}\n`; });
  csv+='\nOUTPUTS\nParameter,Symbol,Value,UoM\n';
  [
    ['CO₂ APH In','CO2in',r.CO2in,'%'],
    ['CO₂ APH Out','CO2out',r.CO2out,'%'],
    ['Weighted Air Temp In','Trai',r.Trai,'°C'],
    ['Dry Gas Loss','Ldg',r.Ldg,'%'],
    ['Unburnt Carbon Loss','Luc',r.Luc,'%'],
    ['Moisture Fuel Loss','Lmf',r.Lmf,'%'],
    ['Hydrogen Fuel Loss','Lhf',r.Lhf,'%'],
    ['CO Loss','Lco',r.Lco,'%'],
    ['Moisture Air Loss','Lma',r.Lma,'%'],
    ['Radiation Loss','Lrad',r.Lrad,'%'],
    ['Boiler Efficiency','eta',r.BoilerEff,'%'],
    ['Boiler Efficiency Corrected','eta_corr',r.BoilerEffCorr,'%']
  ].forEach(([n,s,val,u])=>{ csv+=`"${n}","${s}",${typeof val==='number'?val.toFixed(4):''},,"${u}"\n`; });
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download=`cenpeep_report_${now.replace(/[: ]/g,'_')}.csv`;
  a.click();
}

function downloadComparisonCSV() {
  const list = window._comparisonResults, now = new Date().toISOString().slice(0,19).replace('T',' ');
  let csv = `CENPEEP Boiler Efficiency — Process Comparison\nGenerated:,${now}\n\n`;
  csv += 'Metric,' + list.map(p => `"${p.title}"`).join(',') + '\n';
  _COMPARISON_METRIC_ROWS.forEach(([label, fn]) => {
    csv += `"${label}",` + list.map(p => `"${fn(p)}"`).join(',') + '\n';
  });
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download=`cenpeep_comparison_${now.replace(/[: ]/g,'_')}.csv`;
  a.click();
}

function downloadComparisonPDF() {
  const list = window._comparisonResults, now = new Date().toLocaleString();
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Comparison Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .meta{color:#666;font-size:11px;margin-bottom:16px}</style></head><body>
  <h1>CENPEEP Boiler Efficiency — Process Comparison</h1><p class="meta">Generated: ${now}</p>
  <table><tr><th>Metric</th>${list.map(p=>`<th>${p.title}</th>`).join('')}</tr>
  ${_COMPARISON_METRIC_ROWS.map(([label,fn])=>`<tr><td>${label}</td>${list.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`).join('')}
  </table><script>window.print();<\/script></body></html>`);
  win.document.close();
}

// ── Field Detection Report (.docx) — same table r.py produces, reachable
//    from the Results tab. Uses the fieldDetail/extracted/missingFields
//    already sitting in window._uploadData from the last upload — no
//    re-upload or re-parse. If date-wise processes are active, sends each
//    process's averaged values along so the server builds one section per
//    process (same field-detection info, different Value column) instead
//    of a single whole-file section. ─────────────────────────────────────
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

  if (window._comparisonResults && window._comparisonResults.length) {
    payload.processes = window._comparisonResults.map(p => {
      const { avg, rowCount } = _averageFieldsInRange(p.start, p.end);
      return { title: p.title, start: p.start, end: p.end, rowCount, avg };
    });
  }

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
    a.download = match ? match[1] : 'CENPEEP_Field_Report.docx';
    a.click();
    showToast('✓ Field report downloaded', 'success');
  } catch (err) {
    showToast('Report failed: ' + err.message, 'error');
  }
}

function downloadPDF() {
  if (window._comparisonResults && window._comparisonResults.length) { downloadComparisonPDF(); return; }
  if (!window._results) { showToast('Calculate first.', 'error'); return; }
  const r=window._results, now=new Date().toLocaleString();
  const win=window.open('','_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .hl{background:#e6fff5!important;font-weight:bold}.meta{color:#666;font-size:11px;margin-bottom:16px}
  </style></head><body>
  <h1>CENPEEP Boiler Efficiency Report</h1><p class="meta">Generated: ${now}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${r.inputs.map(i=>`<tr><td>${i.label}</td><td>${i.value}</td></tr>`).join('')}</table>
  <h2>Losses</h2><table><tr><th>Parameter</th><th>Symbol</th><th>Value</th><th>UoM</th></tr>
  <tr><td>CO₂ APH In</td><td>CO₂in</td><td>${fmt2(r.CO2in)}</td><td>%</td></tr>
  <tr><td>CO₂ APH Out</td><td>CO₂out</td><td>${fmt2(r.CO2out)}</td><td>%</td></tr>
  <tr><td>Dry Gas Loss</td><td>Ldg</td><td>${fmt2(r.Ldg)}</td><td>%</td></tr>
  <tr><td>Unburnt Carbon Loss</td><td>Luc</td><td>${fmt2(r.Luc)}</td><td>%</td></tr>
  <tr><td>Moisture Fuel Loss</td><td>Lmf</td><td>${fmt2(r.Lmf)}</td><td>%</td></tr>
  <tr><td>Hydrogen Fuel Loss</td><td>Lhf</td><td>${fmt2(r.Lhf)}</td><td>%</td></tr>
  <tr><td>CO Loss</td><td>Lco</td><td>${fmt(r.Lco)}</td><td>%</td></tr>
  <tr><td>Moisture Air Loss</td><td>Lma</td><td>${fmt2(r.Lma)}</td><td>%</td></tr>
  <tr><td>Radiation Loss</td><td>Lrad</td><td>${fmt2(r.Lrad)}</td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td><b>${fmt2(r.BoilerEff)}</b></td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency Corrected</b></td><td>η_corr</td><td><b>${fmt2(r.BoilerEffCorr)}</b></td><td>%</td></tr>
  </table><script>window.print();<\/script></body></html>`);
  win.document.close();
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