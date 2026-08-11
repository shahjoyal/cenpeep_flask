/* ════════════════════════════════════════════════════════════════════
   CENPEEP  —  script.js
   Handles: calculation · Excel upload → auto-populate · DB save · toast
   ════════════════════════════════════════════════════════════════════ */

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const v    = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
const fmt  = (n, d=4) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(d) : '—';
const fmt2 = n => fmt(n, 2);

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
function runCalculation(rawInputs) {
  const inputs = computeDerivedInputs(rawInputs);
  const gv = id => g(inputs, id);

  const M=gv('M'),A=gv('A'),VM=gv('VM'),FC=gv('FC'),GCV=gv('GCV'),S=gv('S');
  const O2in=gv('O2in'),O2out=gv('O2out'),COout=gv('COout'),COin=gv('COin');
  const Tgi=gv('Tgi'),Tgo=gv('Tgo'),Tpai=gv('Tpai'),Tpao=gv('Tpao');
  const Tsai=gv('Tsai'),Tsao=gv('Tsao'),Fsa=gv('Fsa'),Fpa=gv('Fpa');
  const Cba=gv('Cba'),Cfa=gv('Cfa'),Pfa=gv('Pfa'),Pba=gv('Pba');
  const Lrad=gv('Lrad') || 1.2;
  const Cp=30.6, CVc=8077.8, CVco=2415, Mwv=0.0166;
  const CO2in=gv('CO2in'), CO2out=gv('CO2out'), COoutp=(COout/1000000)*100;

  // Ultimate analysis
  const FcDc=FC/(1-(1.1*A/100)-M/100), VmDf=100-FcDc;
  const Cdf=FcDc+0.9*(VmDf-14), Hdf=VmDf*((7.35/(VmDf+10))-0.013);
  const Ndf=2.1-(0.012*VmDf), k=(VM+FC)/(VmDf+FcDc);
  const Ca=Cdf*k, H=Hdf*k, N=Ndf*k, O=100-Ca-S-H-M-N-A;

  // Air flow
  const Fta=Fsa+Fpa, Rsa=Fsa/Fta, Rpa=Fpa/Fta;
  const Trai=Tsai*Rsa+Tpai*Rpa;

  // Ash & carbon
  const Cash=Pfa/100*Cfa+Pba/100*Cba, U=A/100*Cash/(100-Cash);
  const N2out=100-(O2out+CO2out+COoutp);

  // Air calculations
  const Sa=(2.66*(Ca-U*100)+7.937*H+0.996*S-O)/23.2;
  const Ea=1+(O2out-COoutp/2)/(0.2682*N2out-(O2out-COoutp));
  const Ma=Sa*Ea*Mwv;

  // Heat
  const Wd=(Ca+S/2.67-100*U)/(12*CO2out);
  const Sh=Wd*Cp*(Tgo-Trai), Sw=1.88*(Tgo-25)+2442+4.2*(25-Trai);

  // Test losses
  const Ldg=Sh*100/(GCV*4.186);
  const Luc=U*CVc*100/GCV;
  const Lmf=Sw*M/(GCV*4.186);
  const Lhf=9*H*Sw/(GCV*4.186);
  const Lco=COoutp*7*CVco*(Ca-100*U)/3/(CO2out+COoutp)/GCV;
  const Lma=Ma*1.88*(Tgo-Trai)*100/(GCV*4.186);
  const BoilerEff=100-(Ldg+Luc+Lmf+Lhf+Lco+Lma+Lrad);

  // Design conditions
  const Cd=gv('Cd'),Sd=gv('Sd'),Hd=gv('Hd'),Od=gv('Od');
  const Ad2=gv('Ad2'),GCVd=gv('GCVd'),Trad=gv('Trad'),Mwvd=gv('Mwvd');
  const Md=gv('Md2');

  // Corrected gas temp
  const AL=(CO2in-CO2out)*0.9*100/CO2out;
  const Tgnl=((AL*Cp*(Tgo-Trai))/(100*Cp))+Tgo;
  const Tgc=(Trad*(Tgi-Tgo)+Tgi*(Tgo-Trai))/(Tgi-Trai);

  // Corrected losses
  const Wdc=(Cd+Sd/2.67-100*U)/(12*CO2out);
  const Shc=Wdc*Cp*(Tgc-Trad);
  const Ldgc=Shc*100/(GCVd*4.186);

  const Kc=Math.exp(0.225*Cd/Hd)-Math.exp(0.225*Ca/H);
  const V_corr=(gv('VMd')<17)?0.013*(Ad2*GCV/(A*GCVd))*Kc:0;
  const Lucc=Luc*((Ad2*GCV)/(A*GCVd))+V_corr;

  const Swd=1.88*(Tgc-25)+2442+4.2*(25-Trad);
  const Lmfc=Swd*Md/(GCVd*4.186);
  const Lhfc=9*Hd*Swd/(GCVd*4.186);
  const Lcoc=COoutp*7*CVco*(Cd-100*U)/3/(CO2out+COoutp)/GCVd;

  const Sad=(2.66*(Cd-U*100)+7.937*Hd+0.996*Sd-Od)/23.2;
  const Ead=1+(O2out-COoutp/2)/(0.2682*N2out-(O2out-COoutp));
  const Mad=Sad*Ead*Mwvd;
  const Lmac=Mad*1.88*(Tgc-Trad)*100/(GCVd*4.186);

  const BoilerEffCorr=100-(Ldgc+Lucc+Lmfc+Lhfc+Lcoc+Lmac+Lrad);

  return {
    CO2in,CO2out,COoutp,Trai,Cash,U,Fta,Rsa,Rpa,
    N2out,Sa,Ea,Ma,Wd,Sh,Sw,
    Ldg,Luc,Lmf,Lhf,Lco,Lma,Lrad,BoilerEff,
    AL,Tgnl,Tgc,Ldgc,Lucc,Lmfc,Lhfc,Lcoc,Lmac,BoilerEffCorr,
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
        <input type="number" id="Lrad" value="${r.Lrad||1.2}" oninput="recalculate()"
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
  ['Date Range',                       p => `${p.start || '—'} → ${p.end || '—'}`],
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

function renderComparison(list) {
  document.getElementById('kpi-area').innerHTML = list.map(p => `
    <div class="kpi-card kpi-green">
      <div class="kpi-label">${escapeHtml(p.title)}</div>
      <div class="kpi-value">${fmt2(p.result.BoilerEff)}<span class="kpi-unit">%</span></div>
      <div class="kpi-sub">${p.start || '—'} → ${p.end || '—'} · ${p.rowCount} row${p.rowCount===1?'':'s'}</div>
    </div>`).join('');

  const headerCells = list.map(p => `<th>${escapeHtml(p.title)}</th>`).join('');
  const bodyRows = _COMPARISON_METRIC_ROWS.map(([label, fn]) => `
    <tr><td class="cmp-metric">${label}</td>${list.map(p => `<td>${fn(p)}</td>`).join('')}</tr>
  `).join('');

  document.getElementById('output-tables').innerHTML = `
    <div class="output-section">
      <div class="output-section-head"><span>Process Comparison</span></div>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead><tr><th></th>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      <div class="cmp-note">Fields not present in the uploaded log (manual-only inputs, Design conditions, …) use the same value — whatever's currently in the Input Parameters tab — across every process.</div>
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