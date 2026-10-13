import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import UploadBanner from '../components/UploadBanner.jsx';
import { buildUploadSummary, STRATEGY_DEFAULT } from '../components/UploadSummary.jsx';
import ProcessSection, { useProcesses } from '../components/ProcessSection.jsx';
import { FieldGrid, SectionCards } from '../components/Fields.jsx';
import { CollapsibleHead, DeltaCard, HeaderRow, KpiCard, OutRow, ProcessComparisonSection, ProcessInputsSection } from '../components/Results.jsx';
import { PlayIcon, ResetIcon } from '../components/Icons.jsx';
import { useToast } from '../hooks/ToastContext.jsx';
import { authFetch } from '../lib/auth.js';
import { averageFieldsInRange, fmt2, fmtDateDMY, stashForSummary } from '../lib/format.js';
import { ASME_INPUT_IDS, ASME_INPUT_LABELS, runCalculation } from '../lib/calc/asme.js';
import { cards, grids } from '../config/fields.asme.js';

const GRID_IDS = ['grid-general', 'grid-proximate', 'grid-plant'];
const ALL_FIELDS = GRID_IDS.flatMap((g) => grids[g]);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map((f) => [f.id, f.value ?? '']));
const FORM_IDS = new Set(ALL_FIELDS.filter((f) => !f.readonly).map((f) => f.id));
// Mirrors routes/upload.py's REQUIRED_FIELDS — used to reset detected/missing colouring
const ALL_FIELD_IDS = ['Cba', 'Cfa', 'M', 'A', 'VM', 'FC', 'GCV', 'O2out', 'COout', 'Tgo'];
const RESET_VALUES = { Cba: 1.2, Cfa: 0.4, Pfa: 80, Pba: 20, M: 12.2, A: 40, VM: 22.9, FC: 24.9, GCV: 3320, S: 0.6, O2out: 5, COout: 50, Tgo: 135, Tref: 30 };
const UI0 = { lossesOpen: true, intermediateOpen: true, processInputsOpen: false, processComparisonOpen: false };

const COMPARISON_METRIC_ROWS = [
  ['Date Range', (p) => `${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}`],
  ['Rows Used', (p) => String(p.rowCount)],
  ['Boiler Efficiency (%)', (p) => fmt2(p.result.BoilerEff)],
  ['Dry Flue Gas Loss (%) — 65', (p) => fmt2(p.result.L65)],
  ['Moisture in Fuel (%) — 66', (p) => fmt2(p.result.L66)],
  ['H\u2082 Combustion (%) — 67', (p) => fmt2(p.result.L67)],
  ['Combustibles in Refuse (%) — 68', (p) => fmt2(p.result.L68)],
  ['Radiation (%) — 69', (p) => fmt2(p.result.L69)],
  ['Unmeasured Losses (%) — 70', (p) => fmt2(p.result.L70)],
  ['Total Losses (%) — 71', (p) => fmt2(p.result.TotalLosses)],
];

const boxStyle = { background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '6px', padding: '6px 10px', fontFamily: "'JetBrains Mono',monospace", fontSize: '20px', color: 'var(--text-bright)', width: '90px', outline: 'none' };
const rowStyle = { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' };
const unitStyle = { fontSize: '14px', color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace" };

function AsmePage() {
  const showToast = useToast();
  useEffect(() => { document.title = 'Boiler Efficiency Calculator — ASME-PTC 4.1'; }, []);

  const [tab, setTab] = useState('input');
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [detected, setDetected] = useState(new Set());
  const [missing, setMissing] = useState(new Set());
  const [open, setOpen] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const proc = useProcesses();

  const [single, setSingle] = useState(null);          // window._results
  const [comparison, setComparison] = useState(null);  // window._comparisonResults
  const [lradBox, setLradBox] = useState(null);        // Lrad / Lunm boxes (null = not on screen)
  const [lunmBox, setLunmBox] = useState(null);
  const [ui, setUi] = useState(UI0);

  const setField = (id, val) => setValues((v) => ({ ...v, [id]: val }));
  const toggleSection = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const avgInRange = (s, e) => averageFieldsInRange(uploadData, s, e);

  const collectInputs = () => {
    const obj = {};
    ASME_INPUT_IDS.forEach((id) => { obj[id] = values[id] !== undefined ? values[id] : 0; });
    obj.Lrad = lradBox !== null ? (parseFloat(lradBox) || 0) : undefined;
    obj.Lunm = lunmBox !== null ? (parseFloat(lunmBox) || 0) : undefined;
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
      stashForSummary(data, 'ASME PTC 4.1');

      const next = { ...values };
      const det = new Set();
      let populated = 0;
      for (const [fieldId, val] of Object.entries(data.extracted || {})) {
        if (FORM_IDS.has(fieldId)) {
          next[fieldId] = String(typeof val === 'number' ? parseFloat(val.toFixed(6)) : val);
          det.add(fieldId);
          populated++;
        }
      }
      const missingFieldsList = data.missingFields || [];
      const miss = new Set();
      for (const m of missingFieldsList) { const id = m.id || m; if (ALL_FIELDS.some((f) => f.id === id)) miss.add(id); }

      setValues(next); setDetected(det); setMissing(miss);
      setUploadData(data);
      proc.setProcesses([]);
      setComparison(null);
      setUploadStatus({
        cls: 'success',
        node: buildUploadSummary({ data, populated, fieldDetail: data.fieldDetail || {}, missingFieldsList,
          strategyLabel: STRATEGY_DEFAULT, derivedLabel: '↳ defaulted from Secondary Air', bee: false }),
      });
      showToast(`Excel imported — ${populated} fields auto-populated from "${data.primarySheet || ''}"`, 'success');
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
      setLradBox(String(r.Lrad)); setLunmBox(String(r.Lunm));
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
    setLradBox(null); setLunmBox(null);
    setTab('output');
  };

  // recalculate(): Radiation (69) / Unmeasured (70) edited on the results page
  const onLossBox = (which, val) => {
    const nextLrad = which === 'Lrad' ? val : lradBox;
    const nextLunm = which === 'Lunm' ? val : lunmBox;
    if (which === 'Lrad') setLradBox(val); else setLunmBox(val);
    if (!single) return;
    const r = { ...single };
    r.Lrad = parseFloat(nextLrad) || 0;
    r.Lunm = parseFloat(nextLunm) || 0;
    r.L69 = r.Lrad;
    r.L70 = r.Lunm;
    r.TotalLosses = r.L65 + r.L66 + r.L67 + r.L68 + r.L69 + r.L70;
    r.BoilerEff = 100 - r.TotalLosses;
    setSingle(r);
  };

  const resetInputs = () => {
    setValues((v) => {
      const n = { ...v };
      Object.entries(RESET_VALUES).forEach(([id, val]) => { if (id in n) n[id] = String(val); });
      return n;
    });
    setDetected((d) => { const n = new Set(d); ALL_FIELD_IDS.forEach((id) => n.delete(id)); return n; });
    setMissing((d) => { const n = new Set(d); ALL_FIELD_IDS.forEach((id) => n.delete(id)); return n; });
    setUploadData(null);
    proc.setProcesses([]);
    setComparison(null); setSingle(null); setLradBox(null); setLunmBox(null);
    setUi(UI0);
    setUploadStatus(null);
  };

  const toggleUi = (key) => setUi((u) => ({ ...u, [key]: !u[key] }));

  let kpiArea = null, outputTables = null;
  if (comparison) {
    const list = comparison;
    const dateAveragedIds = new Set();
    list.forEach((p) => Object.keys(avgInRange(p.start, p.end).avg).forEach((fid) => dateAveragedIds.add(fid)));
    const perProcessIds = ASME_INPUT_IDS.filter((id) => dateAveragedIds.has(id));
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
        <ProcessInputsSection list={list} perProcessIds={perProcessIds} labels={ASME_INPUT_LABELS} page="asme"
          open={ui.processInputsOpen} onToggle={() => toggleUi('processInputsOpen')} />
        <ProcessComparisonSection list={list} rows={COMPARISON_METRIC_ROWS} page="asme"
          open={ui.processComparisonOpen} onToggle={() => toggleUi('processComparisonOpen')} />
      </>
    );
  } else if (single && lradBox !== null) {
    const r = single;
    kpiArea = (
      <>
        <div className="kpi-card kpi-green">
          <div className="kpi-label">Boiler Efficiency</div>
          <div className="kpi-value boiler-eff-val">{fmt2(r.BoilerEff)}<span className="kpi-unit">%</span></div>
          <div className="kpi-sub">ASME PTC 4.1 — Losses Method, HHV basis</div>
        </div>
        <KpiCard cls="kpi-red" label={<>Dry Flue Gas Loss <span style={{ opacity: 0.6 }}>(Item 65)</span></>}><div className="kpi-value">{fmt2(r.L65)}<span className="kpi-unit">%</span></div></KpiCard>
        <KpiCard cls="kpi-blue" label={<>Moisture in Fuel Loss <span style={{ opacity: 0.6 }}>(Item 66)</span></>}><div className="kpi-value">{fmt2(r.L66)}<span className="kpi-unit">%</span></div></KpiCard>
        <KpiCard cls="kpi-green" label={<>H{'\u2082'} Combustion Loss <span style={{ opacity: 0.6 }}>(Item 67)</span></>}><div className="kpi-value">{fmt2(r.L67)}<span className="kpi-unit">%</span></div></KpiCard>
        <KpiCard cls="kpi-amber" label={<>Combustibles in Refuse <span style={{ opacity: 0.6 }}>(Item 68)</span></>}><div className="kpi-value">{fmt2(r.L68)}<span className="kpi-unit">%</span></div></KpiCard>
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Radiation Loss <span style={{ opacity: 0.6 }}>(Item 69)</span></div>
          <div style={rowStyle}>
            <input type="number" id="Lrad" value={lradBox} onChange={(e) => onLossBox('Lrad', e.target.value)} style={boxStyle} />
            <span style={unitStyle}>%</span>
          </div>
          <div className="kpi-sub">ABMA curve / measured — enter &amp; recalculate</div>
        </div>
        <div className="kpi-card kpi-blue">
          <div className="kpi-label">Unmeasured Losses <span style={{ opacity: 0.6 }}>(Item 70)</span></div>
          <div style={rowStyle}>
            <input type="number" id="Lunm" value={lunmBox ?? ''} onChange={(e) => onLossBox('Lunm', e.target.value)} style={boxStyle} />
            <span style={unitStyle}>%</span>
          </div>
          <div className="kpi-sub">Mutually agreed value — enter &amp; recalculate</div>
        </div>
      </>
    );
    outputTables = (
      <>
        <div className="output-section">
          <CollapsibleHead open={ui.lossesOpen} onClick={() => toggleUi('lossesOpen')}>Heat-Loss Efficiency — Items 65{'\u2013'}72</CollapsibleHead>
          {ui.lossesOpen && (
            <>
              <HeaderRow b="Item" />
              <OutRow name="Dry Flue Gas Loss" sym="65" val={r.L65} uom="%" />
              <OutRow name="Moisture in Fuel" sym="66" val={r.L66} uom="%" />
              <OutRow name={'Water from H\u2082 Combustion'} sym="67" val={r.L67} uom="%" />
              <OutRow name="Combustibles in Refuse" sym="68" val={r.L68} uom="%" />
              <OutRow name="Radiation" sym="69" val={r.L69} uom="%" />
              <OutRow name="Unmeasured Losses" sym="70" val={r.L70} uom="%" />
              <div className="output-row highlight-row2">
                <span className="out-name">Total Losses</span><span className="out-sym">71</span>
                <span className="out-val" id="losses-total-val">{fmt2(r.TotalLosses)}</span><span className="out-uom">%</span>
              </div>
              <div className="output-row highlight-row2">
                <span className="out-name">Boiler Efficiency</span><span className="out-sym">72</span>
                <span className="out-val" id="losses-eff-val">{fmt2(r.BoilerEff)}</span><span className="out-uom">%</span>
              </div>
            </>
          )}
        </div>
        <div className="output-section">
          <CollapsibleHead open={ui.intermediateOpen} onClick={() => toggleUi('intermediateOpen')}>Intermediate Values</CollapsibleHead>
          {ui.intermediateOpen && (
            <>
              <HeaderRow b="Item" />
              <OutRow name={'CO\u2082, dry'} sym="32" val={r.CO2} uom="%" />
              <OutRow name={'N\u2082, dry (by difference)'} sym="35" val={r.N2} uom="%" />
              <OutRow name="Excess Air" sym="36" val={r.ExcessAir} uom="%" />
              <OutRow name="Carbon, as fired (ultimate)" sym="43" val={r.Ca} uom="%" />
              <OutRow name="Hydrogen, as fired (ultimate)" sym="44" val={r.H} uom="%" />
              <OutRow name="Dry Refuse per Unit Fuel" sym="22" val={r.DryRefuse} uom={'\u2014'} />
              <OutRow name="Carbon Burned per Unit Fuel" sym="24" val={r.CarbonBurned} uom="%" />
              <OutRow name="Dry Flue Gas per Unit Fuel" sym="25" val={r.MassDFG} uom={'\u2014'} />
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <BoilerLockBanner />
      <div className="section-header" style={{ marginTop: 0 }}><div className="section-label">ASME-PTC 4.1</div><div className="section-line"></div></div>
      <div className="tab-nav">
        <button className={'tab-btn' + (tab === 'input' ? ' active' : '')} onClick={() => setTab('input')}><span className="tab-num">01 /</span> Input Parameters</button>
        <button className={'tab-btn' + (tab === 'output' ? ' active' : '')} onClick={() => setTab('output')}><span className="tab-num">02 /</span> Results &amp; Losses</button>
      </div>
      <div className={'page' + (tab === 'input' ? ' active' : '')} id="page-input">
        <UploadBanner description="Upload your data sheet — matching input fields will be auto-populated, same detection as CENPEEP."
          onFile={onFile} status={uploadStatus} />
        <ProcessSection uploadData={uploadData} processes={proc.processes} onAdd={proc.add} onRemove={proc.remove}
          onTitle={proc.setTitle} onDate={proc.setDate} />
        <div className="action-bar">
          <button className="btn btn-ghost" onClick={resetInputs}><ResetIcon />Reset to Defaults</button>
          <button className="btn btn-primary" onClick={calculate} title="ASME PTC 4.1 — Losses Method"><PlayIcon />Calculate Efficiency</button>
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
          <button className="btn btn-ghost" onClick={() => setTab('input')}>← Back to Inputs</button>
        </div>
      </div>
    </div>
  );
}

export default function Asme() {
  return <AppShell active="/asme-ptc-4-1"><AsmePage /></AppShell>;
}
