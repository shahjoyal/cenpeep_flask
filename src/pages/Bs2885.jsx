import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import UploadBanner from '../components/UploadBanner.jsx';
import { FieldGrid, SectionCards } from '../components/Fields.jsx';
import { FileTextIcon, PlayIcon, ResetIcon } from '../components/Icons.jsx';
import { useToast } from '../hooks/ToastContext.jsx';
import { authFetch } from '../lib/auth.js';
import { downloadBlob, fmt2Finite as fmt2, stashForSummary } from '../lib/format.js';
import { ALL_FIELD_IDS, DEFAULTS, runBS2885Calculation } from '../lib/calc/bs2885.js';
import { cards, grids } from '../config/fields.bs2885.js';

const GRID_IDS = Object.keys(grids);
const ALL_FIELDS = GRID_IDS.flatMap((g) => grids[g]);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map((f) => [f.id, f.value ?? '']));
const FORM_IDS = new Set(ALL_FIELDS.map((f) => f.id));

const lossRow = (label, gross, net) => (
  <tr key={label}><td>{label}</td><td>{fmt2(gross)} %</td><td>{fmt2(net)} %</td></tr>
);

function LossSection({ title, group }) {
  return (
    <div className="output-table-wrap">
      <h3>{title} — Total: {fmt2(group.total.gross)} % (gross) / {fmt2(group.total.net)} % (net)</h3>
      <table className="output-table">
        <thead><tr><th>Loss</th><th>Gross CV basis</th><th>Net CV basis</th></tr></thead>
        <tbody>
          {Object.keys(group).filter((k) => k !== 'total').map((k) => lossRow(group[k].label, group[k].gross, group[k].net))}
        </tbody>
      </table>
    </div>
  );
}

const Kpi = ({ label, value, cls }) => (
  <div className={'kpi-card ' + cls}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{fmt2(value)}<span className="kpi-unit">%</span></div>
  </div>
);

function Bs2885Page() {
  const showToast = useToast();
  useEffect(() => { document.title = 'Boiler Efficiency Calculator — BS-2885'; }, []);

  const [tab, setTab] = useState('input');
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [detected, setDetected] = useState(new Set());
  const [missing, setMissing] = useState(new Set());
  const [open, setOpen] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadData, setUploadData] = useState(null);   // window._uploadDataBS2885
  const [result, setResult] = useState(null);           // window._bs2885Result

  const setField = (id, val) => setValues((v) => ({ ...v, [id]: val }));
  const toggleSection = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  const onFile = async (file) => {
    setUploadStatus({ cls: 'loading', text: '⏳ Reading BS-2885 sheet…' });
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await authFetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'BS-2885');

      // BS-2885's fields come back under their own namespaced keys
      const extracted = data.extractedBS2885 || {};
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
      const miss = new Set();
      for (const m of data.missingFieldsBS2885 || []) { const id = m.id || m; if (FORM_IDS.has(id)) miss.add(id); }

      setValues(next); setDetected(det); setMissing(miss);
      setUploadData(data);
      setUploadStatus({ cls: 'success', text: `✓ ${populated} of ${ALL_FIELD_IDS.length} fields detected from "${data.filename}"` });
      showToast(`Detected ${populated} field${populated === 1 ? '' : 's'} from the uploaded sheet.`, 'success');
    } catch (err) {
      setUploadStatus({ cls: 'error', text: `✗ ${err.message}` });
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  const resetInputs = () => {
    setValues((v) => {
      const n = { ...v };
      for (const [id, val] of Object.entries(DEFAULTS)) if (id in n) n[id] = String(val);
      return n;
    });
    setDetected((d) => { const n = new Set(d); Object.keys(DEFAULTS).forEach((id) => n.delete(id)); return n; });
    setMissing((d) => { const n = new Set(d); Object.keys(DEFAULTS).forEach((id) => n.delete(id)); return n; });
    showToast('Inputs reset to defaults.', 'success');
  };

  const calculate = () => {
    const raw = {};
    for (const id of ALL_FIELD_IDS) raw[id] = parseFloat(values[id]) || 0;
    setResult(runBS2885Calculation(raw));
    setTab('output');
    showToast('BS-2885 efficiency calculated.', 'success');
  };

  const downloadFieldReportBS2885 = async () => {
    const data = uploadData;
    if (!data || !data.fieldDetailBS2885 || !Object.keys(data.fieldDetailBS2885).length) {
      showToast('Upload and parse a file first to generate a field report.', 'error');
      return;
    }
    const payload = {
      filename: data.filename, primarySheet: data.sheetNameBS2885, fieldDetail: data.fieldDetailBS2885,
      extracted: data.extractedBS2885, missingFields: data.missingFieldsBS2885,
      reportTitle: 'BS-2885 Field Detection Report', filenamePrefix: 'BS2885_Field_Report', standardLabel: 'BS-2885',
    };
    try {
      const res = await authFetch('/api/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Report generation failed (${res.status})`);
      }
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="?([^"]+)"?/);
      downloadBlob(blob, match ? match[1] : 'BS2885_Field_Report.docx');
      showToast('✓ Field report downloaded', 'success');
    } catch (err) { showToast('Report failed: ' + err.message, 'error'); }
  };

  const r = result;
  return (
    <div className="container">
      <BoilerLockBanner />
      <div className="section-header" style={{ marginTop: 0 }}><div className="section-label">BS-2885 (1974)</div><div className="section-line"></div></div>
      <div className="tab-nav">
        <button className={'tab-btn' + (tab === 'input' ? ' active' : '')} onClick={() => setTab('input')}><span className="tab-num">01 /</span> Input Parameters</button>
        <button className={'tab-btn' + (tab === 'output' ? ' active' : '')} onClick={() => setTab('output')}><span className="tab-num">02 /</span> Results &amp; Losses</button>
      </div>
      <div className={'page' + (tab === 'input' ? ' active' : '')} id="page-input">
        <UploadBanner
          description={'Upload a filled-in BS-2885 (1974) test sheet — matching "Sl. No." rows are auto-populated from the Value column.'}
          onFile={onFile} status={uploadStatus} />
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
        <div className="output-summary" id="kpi-area">
          {r && (
            <>
              <Kpi label="Thermal Efficiency — Method A (Gross CV)" value={r.methodA.gross} cls="kpi-green" />
              <Kpi label="Thermal Efficiency — Method A (Net CV)" value={r.methodA.net} cls="kpi-green" />
              <Kpi label="Thermal Efficiency — Method B (Gross CV)" value={r.methodB.gross} cls="kpi-blue" />
              <Kpi label="Thermal Efficiency — Method B (Net CV)" value={r.methodB.net} cls="kpi-blue" />
            </>
          )}
        </div>
        <div id="output-tables">
          {r && (
            <>
              <div className="output-table-wrap">
                <h3>Method A — Balance of Account (radiation &amp; unmeasured losses)</h3>
                <table className="output-table">
                  <thead><tr><th></th><th>Gross CV basis</th><th>Net CV basis</th></tr></thead>
                  <tbody>{lossRow('Item 908 — Unaccounted balance', r.balanceA.gross, r.balanceA.net)}</tbody>
                </table>
              </div>
              <LossSection title="Item 903 — Losses due to Residue" group={r.losses.residue} />
              <LossSection title="Item 904 — Losses due to Flue Gases" group={r.losses.flueGas} />
              <LossSection title="Item 905 — Losses, Water-Filled Ash Hopper / Quenching" group={r.losses.waterHopper} />
              <div className="output-table-wrap">
                <h3>Other Method B Losses</h3>
                <table className="output-table">
                  <thead><tr><th>Loss</th><th>Gross CV basis</th><th>Net CV basis</th></tr></thead>
                  <tbody>
                    {lossRow(r.losses.moistureAir.label, r.losses.moistureAir.gross, r.losses.moistureAir.net)}
                    <tr><td>{r.losses.fuelHeating.label}</td><td colSpan="2">{fmt2(r.losses.fuelHeating.value)} %</td></tr>
                    <tr><td>{r.losses.radiation.label}</td><td colSpan="2">{fmt2(r.losses.radiation.value)} %</td></tr>
                    <tr><td>{r.losses.auxPower.label}</td><td colSpan="2">{fmt2(r.losses.auxPower.value)} %</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="output-table-wrap">
                <h3>Ultimate Analysis — Check Totals</h3>
                <table className="output-table">
                  <thead><tr><th></th><th>Oxygen (by diff.)</th><th>Sum (should read 100%)</th></tr></thead>
                  <tbody>
                    <tr><td>Solid fuel</td><td>{fmt2(r.ultimate.solidOxygenByDiff)} %</td><td>{fmt2(r.ultimate.solidCheckTotal)} %</td></tr>
                    <tr><td>Oil fuel (O₂ + N₂ by diff.)</td><td>{fmt2(r.ultimate.oilOxygenNitrogenByDiff)} %</td><td>{fmt2(r.ultimate.oilCheckTotal)} %</td></tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="download-bar">
          <button className="btn btn-secondary" onClick={downloadFieldReportBS2885}><FileTextIcon />Field Report (.docx)</button>
          <button className="btn btn-ghost" onClick={() => setTab('input')}>← Back to Inputs</button>
        </div>
      </div>
    </div>
  );
}

export default function Bs2885() {
  return <AppShell active="/bs-2885" extraStyle="bs2885"><Bs2885Page /></AppShell>;
}
