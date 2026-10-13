import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import UploadBanner from '../components/UploadBanner.jsx';
import { buildUploadSummary, STRATEGY_BEE } from '../components/UploadSummary.jsx';
import ProcessSection, { useProcesses } from '../components/ProcessSection.jsx';
import { FieldGrid, SectionCards } from '../components/Fields.jsx';
import { DeltaCard, HeaderRow, KpiCard, OutRow, ProcessComparisonSection, ProcessInputsSection } from '../components/Results.jsx';
import { DownloadIcon, FileTextIcon, PlayIcon, ResetIcon, SaveIcon } from '../components/Icons.jsx';
import { useToast } from '../hooks/ToastContext.jsx';
import { authFetch } from '../lib/auth.js';
import { averageFieldsInRange, downloadBlob, fmt2, fmtDateDMY, stashForSummary } from '../lib/format.js';
import { INFO_ONLY_IDS, INPUT_IDS, INPUT_LABELS, runCalculation } from '../lib/calc/bee.js';
import { cards, grids } from '../config/fields.bee.js';

const GRID_IDS = ['grid-general', 'grid-fluegas', 'grid-fuel', 'grid-ash', 'grid-other'];
const ALL_FIELDS = GRID_IDS.flatMap((g) => grids[g]);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map((f) => [f.id, f.value ?? '']));
const FORM_IDS = new Set(ALL_FIELDS.filter((f) => !f.readonly).map((f) => f.id));
const ALL_FIELD_IDS = INPUT_IDS.filter((id) => !INFO_ONLY_IDS.includes(id));
// Fields intentionally never auto-detected (same intent as their MANUAL tag) — script3.js
const MANUAL_FIELD_IDS = ['L6', 'S', 'GCVba', 'GCVfa'];
const computeMissingFields = (extracted) => ALL_FIELD_IDS
  .filter((id) => !MANUAL_FIELD_IDS.includes(id) && !(id in extracted))
  .map((id) => ({ id, label: INPUT_LABELS[id] || id }));

const RESET_VALUES = {
  BL: 20, SP: 66,
  O2fg: 9, COfg: 800, CO2fg: 10.67, Tfg: 180, Tamb: 29.3, Hum: 0.1977,
  C: 53.65, H2: 3.25, N2: 1.11, O2f: 8.68, S: 0.34, M: 14.43, A: 18.54, GCV: 4291,
  Cba: 0.11, Cfa: 4.89, GCVba: 0, GCVfa: 0,
  L6: 1,
};

const COMPARISON_METRIC_ROWS = [
  ['Date Range', (p) => `${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}`],
  ['Rows Used', (p) => String(p.rowCount)],
  ['Boiler Efficiency (%)', (p) => fmt2(p.result.BoilerEff)],
  ['Dry Flue Gas (%) — L1', (p) => fmt2(p.result.L1)],
  ['H\u2082 in Fuel (%) — L2', (p) => fmt2(p.result.L2)],
  ['Moisture in Fuel (%) — L3', (p) => fmt2(p.result.L3)],
  ['Moisture in Air (%) — L4', (p) => fmt2(p.result.L4)],
  ['Partial C\u2192CO (%) — L5', (p) => fmt2(p.result.L5)],
  ['Radiation & Unaccounted (%) — L6', (p) => fmt2(p.result.L6)],
  ['Unburnt Fly Ash (%) — L7', (p) => fmt2(p.result.L7)],
  ['Unburnt Bottom Ash (%) — L8', (p) => fmt2(p.result.L8)],
];

const HeatRow = ({ name, sym, kcal, pct }) => (
  <div className="output-row">
    <span className="out-name">{name}</span><span className="out-sym">{sym}</span>
    <span className="out-val">{fmt2(kcal)}</span><span className="out-uom">{fmt2(pct)}%</span>
  </div>
);

function BeePage() {
  const showToast = useToast();
  useEffect(() => { document.title = 'Boiler Efficiency Calculator — BEE'; }, []);

  const [tab, setTab] = useState('input');
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [detected, setDetected] = useState(new Set());
  const [missing, setMissing] = useState(new Set());
  const [open, setOpen] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState(null);
  const proc = useProcesses();

  const [single, setSingle] = useState(null);          // window._results
  const [comparison, setComparison] = useState(null);  // window._comparisonResults
  const [l6Box, setL6Box] = useState('');              // the #L6live box
  const [ui, setUi] = useState({ processInputsOpen: false, processComparisonOpen: false });

  const setField = (id, val) => setValues((v) => ({ ...v, [id]: val }));
  const toggleSection = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const avgInRange = (s, e) => averageFieldsInRange(uploadData, s, e, true);
  const collectInputs = () => {
    const obj = {};
    INPUT_IDS.forEach((id) => { obj[id] = values[id] !== undefined ? values[id] : 0; });
    return obj;
  };

  const onFile = async (file) => {
    setUploadStatus({ cls: 'loading', text: '⏳ Parsing all sheets…' });
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await authFetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'BEE');

      // BEE-2-only overrides take priority over the shared extraction (applied
      // on a local copy; the backend's own extracted/fieldDetail stay untouched)
      const extracted = { ...(data.extracted || {}), ...(data.beeOverrides || {}) };
      const next = { ...values };
      const det = new Set();
      let populated = 0;
      for (const [fieldId, val] of Object.entries(extracted)) {
        if (FORM_IDS.has(fieldId)) {
          next[fieldId] = String(typeof val === 'number' ? parseFloat(val.toFixed(6)) : val);
          det.add(fieldId);
          populated++;
        }
      }
      const missingFieldsList = computeMissingFields(extracted);
      const miss = new Set();
      for (const m of missingFieldsList) if (ALL_FIELDS.some((f) => f.id === m.id)) miss.add(m.id);
      // BEE's own missing list replaces the CENPEEP-scoped one so the field report matches
      const data2 = { ...data, missingFields: missingFieldsList };

      setValues(next); setDetected(det); setMissing(miss);
      setUploadedFilename(data.filename);
      setUploadData(data2);
      proc.setProcesses([]);
      setComparison(null);

      const fieldDetail = { ...(data.fieldDetail || {}) };
      for (const fid of Object.keys(data.beeOverrides || {})) {
        fieldDetail[fid] = { label: INPUT_LABELS[fid] || fid, header: 'LAB sheet (lab-tested reading)', source: 'rule', confidence: 1.0 };
      }
      setUploadStatus({
        cls: populated ? 'success' : '',
        node: buildUploadSummary({ data, populated, fieldDetail, missingFieldsList,
          strategyLabel: STRATEGY_BEE, derivedLabel: '↳ defaulted', bee: true }),
      });
      showToast(populated ? `Excel imported — ${populated} fields auto-populated` : 'Sheet parsed — BEE field detection not configured yet',
        populated ? 'success' : 'info');
    } catch (err) {
      setUploadStatus({ cls: 'error', text: `✗ ${err.message}` });
      showToast(err.message, 'error');
    }
  };

  const calculate = () => {
    const activeProcesses = proc.processes.filter((p) => p.start || p.end);
    if (!activeProcesses.length) {
      const r = runCalculation(collectInputs());
      setComparison(null);
      setSingle(r);
      setL6Box(String(r.L6));
      setTab('output');
      return;
    }
    const baseInputs = collectInputs();
    const list = activeProcesses.map((p) => {
      const { avg, rowCount } = avgInRange(p.start, p.end);
      return { title: p.title || 'Process', start: p.start, end: p.end, rowCount, result: runCalculation({ ...baseInputs, ...avg }) };
    });
    setComparison(list);
    setSingle(list[0].result);
    setTab('output');
  };

  // recalculate(): live-edited L6 re-runs the whole calc and mirrors it into the L6 input
  const onL6Live = (val) => {
    setL6Box(val);
    if (!single) return;
    const L6 = parseFloat(val) || 0;
    const inputs = collectInputs();
    inputs.L6 = L6;
    setField('L6', String(L6));
    setSingle(runCalculation(inputs));
  };

  const resetInputs = () => {
    setValues((v) => {
      const n = { ...v };
      Object.entries(RESET_VALUES).forEach(([id, val]) => { if (id in n) n[id] = String(val); });
      return n;
    });
    setUploadedFilename(null); setUploadData(null);
    proc.setProcesses([]);
    setComparison(null); setSingle(null);
    setUi({ processInputsOpen: false, processComparisonOpen: false });
    setUploadStatus(null);
  };

  const saveSession = async () => {
    if (!single) { showToast('Calculate first before saving.', 'error'); return; }
    const name = window.prompt('Session name (optional):', uploadedFilename || '');
    if (name === null) return;
    const r = single;
    const payload = {
      sessionName: name.trim(),
      sourceFile: uploadedFilename || 'Manual Entry',
      boilerType: sessionStorage.getItem('boilerType') || '',
      inputs: r.inputs,
      results: {
        method: 'BEE-2 Indirect', BoilerEff: r.BoilerEff,
        L1: r.L1, L2: r.L2, L3: r.L3, L4: r.L4, L5: r.L5, L6: r.L6, L7: r.L7, L8: r.L8,
        TA: r.TA, EA: r.EA, AAS: r.AAS, m: r.m,
      },
    };
    try {
      const res = await authFetch('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      showToast('✓ Session saved to MongoDB!', 'success');
    } catch (err) { showToast('Save failed: ' + err.message, 'error'); }
  };

  const downloadCSV = () => {
    if (!single) { showToast('Calculate first.', 'error'); return; }
    const r = single, now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let csv = `BEE-2 Indirect Boiler Efficiency Report\nGenerated:,${now}\n\nINPUTS\nParameter,Value\n`;
    r.inputs.forEach((i) => { csv += `"${i.label}",${i.value}\n`; });
    csv += '\nLOSSES\nParameter,Symbol,Value (%),kcal/kg of coal\n';
    [
      ['Dry Flue Gas', 'L1', r.L1], ['Hydrogen in Fuel', 'L2', r.L2], ['Moisture in Fuel', 'L3', r.L3],
      ['Moisture in Air', 'L4', r.L4], ['Partial Combustion C→CO', 'L5', r.L5],
      ['Radiation & Unaccounted', 'L6', r.L6], ['Unburnt in Fly Ash', 'L7', r.L7], ['Unburnt in Bottom Ash', 'L8', r.L8],
    ].forEach(([n, s, val]) => { csv += `"${n}","${s}",${val.toFixed(4)},${(r.heatInput * val / 100).toFixed(2)}\n`; });
    csv += `\n"Boiler Efficiency","eta",${r.BoilerEff.toFixed(4)},\n`;
    downloadBlob(new Blob([csv], { type: 'text/csv' }), `bee_indirect_report_${now.replace(/[: ]/g, '_')}.csv`);
  };

  const downloadPDF = () => {
    if (!single) { showToast('Calculate first.', 'error'); return; }
    const r = single, now = new Date().toLocaleString();
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
  ${r.inputs.map((i) => `<tr><td>${i.label}</td><td>${i.value}</td></tr>`).join('')}</table>
  <h2>Heat Balance</h2><table><tr><th>Parameter</th><th>Symbol</th><th>kcal/kg coal</th><th>% loss</th></tr>
  <tr><td>Heat Input</td><td></td><td>${fmt2(r.heatInput)}</td><td>100.00</td></tr>
  <tr><td>Dry Flue Gas</td><td>L1</td><td>${fmt2(r.heatInput * r.L1 / 100)}</td><td>${fmt2(r.L1)}</td></tr>
  <tr><td>Hydrogen in Fuel</td><td>L2</td><td>${fmt2(r.heatInput * r.L2 / 100)}</td><td>${fmt2(r.L2)}</td></tr>
  <tr><td>Moisture in Fuel</td><td>L3</td><td>${fmt2(r.heatInput * r.L3 / 100)}</td><td>${fmt2(r.L3)}</td></tr>
  <tr><td>Moisture in Air</td><td>L4</td><td>${fmt2(r.heatInput * r.L4 / 100)}</td><td>${fmt2(r.L4)}</td></tr>
  <tr><td>Partial Combustion C→CO</td><td>L5</td><td>${fmt2(r.heatInput * r.L5 / 100)}</td><td>${fmt2(r.L5)}</td></tr>
  <tr><td>Radiation &amp; Unaccounted</td><td>L6</td><td>${fmt2(r.heatInput * r.L6 / 100)}</td><td>${fmt2(r.L6)}</td></tr>
  <tr><td>Unburnt in Fly Ash</td><td>L7</td><td>${fmt2(r.heatInput * r.L7 / 100)}</td><td>${fmt2(r.L7)}</td></tr>
  <tr><td>Unburnt in Bottom Ash</td><td>L8</td><td>${fmt2(r.heatInput * r.L8 / 100)}</td><td>${fmt2(r.L8)}</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td></td><td><b>${fmt2(r.BoilerEff)}</b></td></tr>
  </table><script>window.print();<\/script></body></html>`);
    win.document.close();
  };

  const downloadFieldReport = async () => {
    const data = uploadData;
    if (!data || !data.fieldDetail || !Object.keys(data.fieldDetail).length) {
      showToast('Upload and parse a file first to generate a field report.', 'error');
      return;
    }
    const payload = { filename: data.filename, primarySheet: data.primarySheet, fieldDetail: data.fieldDetail, extracted: data.extracted, missingFields: data.missingFields };
    try {
      const res = await authFetch('/api/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Report generation failed (${res.status})`);
      }
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="?([^"]+)"?/);
      downloadBlob(blob, match ? match[1] : 'BEE_Field_Report.docx');
      showToast('✓ Field report downloaded', 'success');
    } catch (err) { showToast('Report failed: ' + err.message, 'error'); }
  };

  const toggleUi = (key) => setUi((u) => ({ ...u, [key]: !u[key] }));

  let kpiArea = null, outputTables = null;
  if (comparison) {
    const list = comparison;
    const dateAveragedIds = new Set();
    list.forEach((p) => Object.keys(avgInRange(p.start, p.end).avg).forEach((fid) => dateAveragedIds.add(fid)));
    const perProcessIds = INPUT_IDS.filter((id) => dateAveragedIds.has(id));
    kpiArea = (
      <>
        {list.map((p, i) => (
          <div className="kpi-card kpi-green" key={i}>
            <div className="kpi-label">{p.title}</div>
            <div className="kpi-value">{fmt2(p.result.BoilerEff)}<span className="kpi-unit">%</span></div>
            <div className="kpi-sub">{fmtDateDMY(p.start)} → {fmtDateDMY(p.end)} · {p.rowCount} row{p.rowCount === 1 ? '' : 's'}</div>
          </div>
        ))}
        {list.length === 2 && <DeltaCard p1={list[0]} p2={list[1]} eff1={list[0].result.BoilerEff} eff2={list[1].result.BoilerEff} />}
      </>
    );
    outputTables = (
      <>
        <ProcessInputsSection list={list} perProcessIds={perProcessIds} labels={INPUT_LABELS} page="bee"
          open={ui.processInputsOpen} onToggle={() => toggleUi('processInputsOpen')} />
        <ProcessComparisonSection list={list} rows={COMPARISON_METRIC_ROWS} page="bee"
          open={ui.processComparisonOpen} onToggle={() => toggleUi('processComparisonOpen')} />
      </>
    );
  } else if (single) {
    const r = single;
    const Pct = ({ v }) => <div className="kpi-value">{fmt2(v)}<span className="kpi-unit">%</span></div>;
    kpiArea = (
      <>
        <div className="kpi-card kpi-green" style={{ gridColumn: 'span 2' }}>
          <div className="kpi-label">Boiler Efficiency</div>
          <Pct v={r.BoilerEff} />
          <div className="kpi-sub">BEE-2 Indirect method (heat-loss)</div>
        </div>
        <KpiCard cls="kpi-red" label="L1 — Dry Flue Gas"><Pct v={r.L1} /></KpiCard>
        <KpiCard cls="kpi-blue" label="L2 — H₂ in Fuel"><Pct v={r.L2} /></KpiCard>
        <KpiCard cls="kpi-blue" label="L3 — Moisture in Fuel"><Pct v={r.L3} /></KpiCard>
        <KpiCard cls="kpi-blue" label="L4 — Moisture in Air"><Pct v={r.L4} /></KpiCard>
        <KpiCard cls="kpi-amber" label="L5 — Partial C→CO"><Pct v={r.L5} /></KpiCard>
        <div className="kpi-card kpi-amber" style={{ gridColumn: 'span 2' }}>
          <div className="kpi-label">L6 — Radiation &amp; Unaccounted</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <input type="number" id="L6live" value={l6Box} onChange={(e) => onL6Live(e.target.value)}
              style={{ background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '6px', padding: '6px 10px', fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', color: 'var(--text-bright)', width: '120px', outline: 'none' }} />
            <span style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace" }}>%</span>
          </div>
          <div className="kpi-sub">Enter value and recalculate</div>
        </div>
        <KpiCard cls="kpi-amber" label="L7 — Unburnt Fly Ash"><Pct v={r.L7} /></KpiCard>
        <KpiCard cls="kpi-amber" label="L8 — Unburnt Bottom Ash"><Pct v={r.L8} /></KpiCard>
      </>
    );
    outputTables = (
      <>
        <div className="output-section">
          <div className="output-section-head"><span>Heat Balance Summary</span></div>
          <HeaderRow c="kcal/kg of coal" d="% loss" />
          <HeatRow name="Heat Input" sym="" kcal={r.heatInput} pct={100} />
          <HeatRow name="Dry Flue Gas" sym="L1" kcal={r.heatInput * r.L1 / 100} pct={r.L1} />
          <HeatRow name="Hydrogen in Fuel" sym="L2" kcal={r.heatInput * r.L2 / 100} pct={r.L2} />
          <HeatRow name="Moisture in Fuel" sym="L3" kcal={r.heatInput * r.L3 / 100} pct={r.L3} />
          <HeatRow name="Moisture in Air" sym="L4" kcal={r.heatInput * r.L4 / 100} pct={r.L4} />
          <HeatRow name="Partial Combustion C→CO" sym="L5" kcal={r.heatInput * r.L5 / 100} pct={r.L5} />
          <HeatRow name="Surface (Radiation) Losses" sym="L6" kcal={r.heatInput * r.L6 / 100} pct={r.L6} />
          <HeatRow name="Unburnt in Fly Ash" sym="L7" kcal={r.heatInput * r.L7 / 100} pct={r.L7} />
          <HeatRow name="Unburnt in Bottom Ash" sym="L8" kcal={r.heatInput * r.L8 / 100} pct={r.L8} />
          <div className="output-row highlight-row2">
            <span className="out-name">Boiler Efficiency</span><span className="out-sym">η</span>
            <span className="out-val">{fmt2(r.BoilerEff)}</span><span className="out-uom">%</span>
          </div>
        </div>
        <div className="output-section">
          <div className="output-section-head"><span>Intermediate Values</span></div>
          <HeaderRow />
          <OutRow name="Theoretical Air Required" sym="TA" val={r.TA} uom="kg/kg coal" />
          <OutRow name="Excess Air Supplied" sym="EA" val={r.EA} uom="%" />
          <OutRow name="Actual Air Supplied" sym="AAS" val={r.AAS} uom="kg/kg coal" />
          <OutRow name="Mass of Dry Flue Gas" sym="m" val={r.m} uom="kg/kg coal" />
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <BoilerLockBanner />
      <div className="section-header" style={{ marginTop: 0 }}><div className="section-label">BEE</div><div className="section-line"></div></div>
      <div className="tab-nav">
        <button className={'tab-btn' + (tab === 'input' ? ' active' : '')} onClick={() => setTab('input')}><span className="tab-num">01 /</span> Input Parameters</button>
        <button className={'tab-btn' + (tab === 'output' ? ' active' : '')} onClick={() => setTab('output')}><span className="tab-num">02 /</span> Results &amp; Losses</button>
      </div>
      <div className={'page' + (tab === 'input' ? ' active' : '')} id="page-input">
        <UploadBanner description="Upload your file — matching input fields will be auto-populated automatically."
          onFile={onFile} status={uploadStatus} />
        <ProcessSection uploadData={uploadData} processes={proc.processes} onAdd={proc.add} onRemove={proc.remove}
          onTitle={proc.setTitle} onDate={proc.setDate} />
        <div className="action-bar">
          <button className="btn btn-primary" onClick={calculate}><PlayIcon />Calculate Efficiency</button>
          <button className="btn btn-ghost" onClick={resetInputs}><ResetIcon />Reset to Defaults</button>
        </div>
        <SectionCards cards={cards} open={open} onToggle={toggleSection} />
        {GRID_IDS.map((gid) => (
          <FieldGrid key={gid} id={gid} fields={grids[gid]} open={!!open[gid]} values={values}
            onChange={setField} detected={detected} missing={missing} />
        ))}
      </div>
      <div className={'page' + (tab === 'output' ? ' active' : '')} id="page-output">
        <div className="output-summary" id="kpi-area">{kpiArea}</div>
        <div id="output-tables">{outputTables}</div>
        <div className="download-bar">
          <button className="btn btn-primary" onClick={saveSession}><SaveIcon />Save to Database</button>
          <button className="btn btn-secondary" onClick={downloadCSV}><DownloadIcon />Download CSV</button>
          <button className="btn btn-secondary" onClick={downloadPDF}><DownloadIcon />Download PDF</button>
          <button className="btn btn-secondary" onClick={downloadFieldReport}><FileTextIcon />Field Report (.docx)</button>
          <button className="btn btn-ghost" onClick={() => setTab('input')}>← Back to Inputs</button>
        </div>
      </div>
    </div>
  );
}

export default function Bee() {
  return <AppShell active="/bee" extraStyle="bee"><BeePage /></AppShell>;
}
