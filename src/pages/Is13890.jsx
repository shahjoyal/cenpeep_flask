import { useEffect, useMemo, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import UploadBanner from '../components/UploadBanner.jsx';
import { FieldGrid, SectionCards } from '../components/Fields.jsx';
import { FileTextIcon, PlayIcon, ResetIcon } from '../components/Icons.jsx';
import { useToast } from '../hooks/ToastContext.jsx';
import { authFetch } from '../lib/auth.js';
import { downloadBlob, fmt2Finite as fmt2, stashForSummary } from '../lib/format.js';
import { DEFAULTS, IS13890_INPUT_IDS, runIS13890Calculation } from '../lib/calc/is13890.js';
import { cards, grids } from '../config/fields.is13890.js';

const GRID_IDS = Object.keys(grids);
const ALL_FIELDS = GRID_IDS.flatMap((g) => grids[g]);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map((x) => [x.id, x.value ?? '']));
const FORM_IDS = new Set(ALL_FIELDS.map((x) => x.id));
const fmt4 = (n) => (typeof n === 'number' && isFinite(n)) ? n.toFixed(4) : '—';

const Kpi = ({ label, value, unit, cls }) => (
  <div className={'kpi-card ' + cls}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{fmt2(value)}<span className="kpi-unit">{unit}</span></div>
  </div>
);

function Is13890Page() {
  const showToast = useToast();
  useEffect(() => { document.title = 'Boiler Efficiency Calculator — IS-13890'; }, []);

  const [tab, setTab] = useState('input');
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [detected, setDetected] = useState(new Set());
  const [missing, setMissing] = useState(new Set());
  const [open, setOpen] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [includeRadiation, setIncludeRadiation] = useState(false);
  const [hfFromTemp, setHfFromTemp] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const setField = (id, val) => setValues((v) => ({ ...v, [id]: val }));
  const toggleSection = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  // Results are derived from the form on every render, so the two options update them live.
  const result = useMemo(() => {
    if (!calculated) return null;
    const raw = {};
    for (const id of IS13890_INPUT_IDS) raw[id] = parseFloat(values[id]) || 0;
    return runIS13890Calculation(raw, { includeRadiation, hfFromTemp });
  }, [calculated, values, includeRadiation, hfFromTemp]);

  const onFile = async (file) => {
    setUploadStatus({ cls: 'loading', text: '⏳ Reading IS-13890 sheet…' });
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await authFetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'IS-13890');

      const extracted = data.extractedIS13890 || {};
      const next = { ...values };
      const det = new Set();
      for (const [id, val] of Object.entries(extracted)) {
        if (FORM_IDS.has(id)) { next[id] = String(typeof val === 'number' ? parseFloat(val.toFixed(6)) : val); det.add(id); }
      }
      const miss = new Set();
      for (const m of data.missingFieldsIS13890 || []) { const id = m.id || m; if (FORM_IDS.has(id) && id !== 'SUC') miss.add(id); }

      setValues(next); setDetected(det); setMissing(miss);
      setUploadData(data);
      const n = det.size;
      if (!n) {
        setUploadStatus({ cls: 'error', text: '✗ No IS-13890 form found in this workbook (needs fields such as wet-bulb temp, evaporation ratio, unburnts in ash…).' });
        showToast('No IS-13890 data found in the uploaded file.', 'error');
      } else {
        setUploadStatus({ cls: 'success', text: `✓ ${n} of ${IS13890_INPUT_IDS.length} fields detected from "${data.filename}"` });
        showToast(`Detected ${n} field${n === 1 ? '' : 's'} from the uploaded sheet.`, 'success');
      }
    } catch (err) {
      setUploadStatus({ cls: 'error', text: `✗ ${err.message}` });
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  const resetInputs = () => {
    setValues(DEFAULT_VALUES); setDetected(new Set()); setMissing(new Set());
    showToast('Inputs reset to the workbook sample values.', 'success');
  };

  const calculate = () => { setCalculated(true); setTab('output'); showToast('IS-13890 efficiency calculated.', 'success'); };

  const downloadFieldReport = async () => {
    const d = uploadData;
    if (!d || !d.fieldDetailIS13890 || !Object.keys(d.fieldDetailIS13890).length) {
      showToast('Upload and parse a file first to generate a field report.', 'error');
      return;
    }
    const payload = {
      filename: d.filename, primarySheet: d.sheetNameIS13890, fieldDetail: d.fieldDetailIS13890,
      extracted: d.extractedIS13890, missingFields: d.missingFieldsIS13890,
      reportTitle: 'IS-13890 Field Detection Report', filenamePrefix: 'IS13890_Field_Report', standardLabel: 'IS-13890',
    };
    try {
      const res = await authFetch('/api/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || `Report generation failed (${res.status})`); }
      const blob = await res.blob();
      const m = (res.headers.get('Content-Disposition') || '').match(/filename="?([^"]+)"?/);
      downloadBlob(blob, m ? m[1] : 'IS13890_Field_Report.docx');
      showToast('✓ Field report downloaded', 'success');
    } catch (err) { showToast('Report failed: ' + err.message, 'error'); }
  };

  const r = result;
  return (
    <div className="container">
      <BoilerLockBanner />
      <div className="section-header" style={{ marginTop: 0 }}><div className="section-label">IS-13890 — Heat Loss Method</div><div className="section-line"></div></div>
      <div className="tab-nav">
        <button className={'tab-btn' + (tab === 'input' ? ' active' : '')} onClick={() => setTab('input')}><span className="tab-num">01 /</span> Input Parameters</button>
        <button className={'tab-btn' + (tab === 'output' ? ' active' : '')} onClick={() => setTab('output')}><span className="tab-num">02 /</span> Results &amp; Losses</button>
      </div>

      <div className={'page' + (tab === 'input' ? ' active' : '')} id="page-input">
        <UploadBanner
          description="Upload a filled-in IS-13890 sheet — input cells (the colour beside “Inputs” in the sheet’s legend) are auto-populated; calculated cells are ignored and recomputed here."
          onFile={onFile} status={uploadStatus} />
        <div className="action-bar">
          <button className="btn btn-primary" onClick={calculate}><PlayIcon />Calculate Efficiency</button>
          <button className="btn btn-ghost" onClick={resetInputs}><ResetIcon />Reset to Sample Values</button>
        </div>
        <SectionCards cards={cards} open={open} onToggle={toggleSection} />
        {GRID_IDS.map((gid) => (
          <FieldGrid key={gid} id={gid} fields={grids[gid]} open={!!open[gid]} values={values}
            onChange={setField} detected={detected} missing={missing} />
        ))}
      </div>

      <div className={'page' + (tab === 'output' ? ' active' : '')} id="page-output">
        {!r && <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--muted)', fontSize: 14 }}>Press “Calculate Efficiency” on the Input tab.</div>}
        {r && (
          <>
            <div className="output-summary" id="kpi-area">
              <Kpi label="Boiler Efficiency (Heat Loss Method)" value={r.efficiency} unit="%" cls="kpi-green" />
              <Kpi label="Total Loss" value={r.totalPct} unit="%" cls="kpi-red" />
              <Kpi label="Total Loss" value={r.totalKcal} unit="kcal/kg" cls="kpi-amber" />
              <Kpi label="Fuel (Bagasse) Consumption" value={r.derived.bagasse} unit="kg/h" cls="kpi-blue" />
            </div>
            {r.warnings.length > 0 && (
              <div style={{ fontSize: 12, color: 'var(--amber)', margin: '0 4px 12px' }}>{r.warnings.map((w, i) => <div key={i}>⚠ {w}</div>)}</div>
            )}

            <div className="output-table-wrap">
              <h3>Calculation options</h3>
              <label style={{ display: 'block', fontSize: 13, margin: '6px 0' }}>
                <input type="checkbox" checked={includeRadiation} onChange={(e) => setIncludeRadiation(e.target.checked)} />{' '}
                Include radiation &amp; convection loss (Lβ = 1.5 % of GCV) in Total Loss — <em>the reference workbook leaves it out</em>
              </label>
              <label style={{ display: 'block', fontSize: 13, margin: '6px 0' }}>
                <input type="checkbox" checked={hfFromTemp} onChange={(e) => setHfFromTemp(e.target.checked)} />{' '}
                Use hf ≈ t (kcal/kg) for “Enthalpy of saturated liquid at t” — <em>the workbook uses the moisture fraction (kg/kg) there</em>
              </label>
            </div>

            <div className="output-table-wrap">
              <h3>Ultimate Analysis (calculated from the proximate analysis)</h3>
              <table className="output-table">
                <thead><tr><th>Carbon</th><th>Hydrogen</th><th>Nitrogen</th><th>Oxygen</th><th>Mean ambient temp t</th></tr></thead>
                <tbody><tr><td>{fmt4(r.derived.C)} %</td><td>{fmt4(r.derived.H)} %</td><td>{fmt4(r.derived.N)} %</td><td>{fmt4(r.derived.O)} %</td><td>{fmt4(r.derived.t)} °C</td></tr></tbody>
              </table>
            </div>

            <div className="output-table-wrap">
              <h3>Efficiency Tabulation (Heat Loss Method)</h3>
              <table className="output-table">
                <thead><tr><th>Symbol</th><th>Particulars</th><th>Value</th><th>Unit</th><th>% of GCV</th><th>Workbook cell</th></tr></thead>
                <tbody>
                  {r.tabulation.map((row) => {
                    const counted = row.loss && (!row.optional || r.includedRadiation);
                    return (
                      <tr key={row.cell} style={row.loss ? undefined : { opacity: 0.75 }}>
                        <td>{row.sym}</td>
                        <td>{row.label}{row.optional && !r.includedRadiation ? ' (not in total)' : ''}</td>
                        <td>{fmt4(row.value)}</td><td>{row.uom}</td>
                        <td>{row.loss ? fmt2(row.value / (parseFloat(values.GCV) || NaN) * 100) + (counted ? '' : ' *') : ''}</td>
                        <td>{row.cell}</td>
                      </tr>
                    );
                  })}
                  <tr><td></td><td><strong>Total Loss</strong></td><td><strong>{fmt4(r.totalKcal)}</strong></td><td>kcal/kg</td><td><strong>{fmt2(r.totalPct)}</strong></td><td>E55 / E56</td></tr>
                  <tr><td>ηboiler</td><td><strong>Boiler Efficiency = 100 − Total Loss %</strong></td><td><strong>{fmt4(r.efficiency)}</strong></td><td>%</td><td></td><td>E58</td></tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="download-bar">
          <button className="btn btn-secondary" onClick={downloadFieldReport}><FileTextIcon />Field Report (.docx)</button>
          <button className="btn btn-ghost" onClick={() => setTab('input')}>← Back to Inputs</button>
        </div>
      </div>
    </div>
  );
}

export default function Is13890() {
  return <AppShell active="/is-13890"><Is13890Page /></AppShell>;
}
