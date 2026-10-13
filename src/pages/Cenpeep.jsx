import { useEffect, useMemo, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import UploadBanner from '../components/UploadBanner.jsx';
import { buildUploadSummary, STRATEGY_DEFAULT } from '../components/UploadSummary.jsx';
import ProcessSection, { useProcesses } from '../components/ProcessSection.jsx';
import { FieldGrid, SectionCards } from '../components/Fields.jsx';
import { CmpBadge, CollapsibleHead, DeltaCard, HeaderRow, KpiCard, OutRow, ProcessComparisonSection, ProcessInputsSection } from '../components/Results.jsx';
import { CalendarIcon, DownloadIcon, FileTextIcon, PlayIcon, ResetIcon, SaveIcon } from '../components/Icons.jsx';
import { useToast } from '../hooks/ToastContext.jsx';
import { authFetch } from '../lib/auth.js';
import { averageFieldsInRange, downloadBlob, fmt, fmt2, fmtDateDMY, num, stashForSummary } from '../lib/format.js';
import { cenpeepDerived } from '../lib/derived.js';
import { INPUT_IDS, INPUT_LABELS, runCalculation } from '../lib/calc/cenpeep.js';
import { cards, grids } from '../config/fields.cenpeep.js';

const INPUT_CARDS = cards.slice(0, 3);
const DESIGN_CARDS = cards.slice(3);
const INPUT_GRIDS = ['grid-general', 'grid-proximate', 'grid-plant'];
const DESIGN_GRIDS = ['grid-design-prox', 'grid-design-ult'];
const ALL_FIELDS = [...INPUT_GRIDS, ...DESIGN_GRIDS].flatMap((g) => grids[g]);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map((f) => [f.id, f.value ?? '']));
const FORM_IDS = new Set(ALL_FIELDS.filter((f) => !f.readonly).map((f) => f.id));
const PROXIMATE_AS_FIRED_IDS = ['M', 'A', 'VM', 'FC', 'GCV'];

// Reset-to-defaults table from resetInputs() in script.js
const RESET_VALUES = {
  L: 210, Ffw: 615, Fin: 140, Cba: 1.2, Cfa: 0.4, Pfa: 80, Pba: 20,
  M: 12.2, A: 40, VM: 22.9, FC: 24.9, GCV: 3320, S: 0.6,
  O2in: 3.5, COin: 39, O2out: 5, COout: 50,
  Tgi: 350, Tgo: 135, Tpai: 40, Tpao: 325, Tsai: 34, Tsao: 325,
  Fsa: 450, Fpa: 250, Tref: 30,
  Md: 13, Ad: 40, VMd: 24, FCd: 23, Sd: 0.3,
  GCVd: 3300, Trad: 38, Mwvd: 0.013,
};

const COMPARISON_METRIC_ROWS = [
  ['Date Range', (p) => `${fmtDateDMY(p.start)} → ${fmtDateDMY(p.end)}`],
  ['Rows Used', (p) => String(p.rowCount)],
  ['Boiler Efficiency (%)', (p) => fmt2(p.result.BoilerEff)],
  ['Boiler Efficiency Corrected (%)', (p) => fmt2(p.result.BoilerEffCorr)],
  ['Dry Gas Loss (%)', (p) => fmt2(p.result.Ldg)],
  ['Unburnt Carbon Loss (%)', (p) => fmt2(p.result.Luc)],
  ['Moisture Fuel Loss (%)', (p) => fmt2(p.result.Lmf)],
  ['Hydrogen Fuel Loss (%)', (p) => fmt2(p.result.Lhf)],
  ['CO Loss (%)', (p) => fmt(p.result.Lco)],
  ['Moisture Air Loss (%)', (p) => fmt2(p.result.Lma)],
  ['Radiation & Unaccounted Loss (%)', (p) => fmt2(p.result.Lrad)],
  ['CO₂ — APH In (%)', (p) => fmt2(p.result.CO2in)],
  ['CO₂ — APH Out (%)', (p) => fmt2(p.result.CO2out)],
];

const processDateKey = (p) => p.start || p.end || null;

function CenpeepPage() {
  const showToast = useToast();
  useEffect(() => { document.title = 'Boiler Efficiency Calculator — CENPEEP'; }, []);

  const [tab, setTab] = useState('input');
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [detected, setDetected] = useState(new Set());
  const [missing, setMissing] = useState(new Set());
  const [open, setOpen] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadData, setUploadData] = useState(null);       // window._uploadData
  const [uploadedFilename, setUploadedFilename] = useState(null);
  const proc = useProcesses();

  // window._results / _comparisonResults / corrections / ui state
  const [single, setSingle] = useState(null);               // window._results (mutable Lrad/BoilerEff on recalc)
  const [comparison, setComparison] = useState(null);       // list shown on the Results tab
  const [compActive, setCompActive] = useState(false);      // window._comparisonResults non-null
  const [lradBox, setLradBox] = useState(null);             // value of the #Lrad box (null = box not on screen)
  const [gcv, setGcv] = useState(null);                     // { targetIdx, sourceIdx, targetTitle, sourceTitle }
  const [aph, setAph] = useState(false);                    // window._aphCorrection
  const [aphSingle, setAphSingle] = useState(false);        // window._aphCorrectionSingle
  const [ui, setUi] = useState({ processInputsOpen: false, processComparisonOpen: false });

  const derived = useMemo(() => cenpeepDerived(values), [values]);
  const setField = (id, val) => setValues((v) => ({ ...v, [id]: val }));
  const toggleSection = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  // collectInputsFromDOM(): every INPUT_ID's current field value + Lrad
  const collectInputs = (lradBoxNow = lradBox) => {
    const merged = { ...values, ...derived };
    const obj = {};
    INPUT_IDS.forEach((id) => { obj[id] = merged[id] !== undefined ? merged[id] : 0; });
    obj.Lrad = lradBoxNow !== null ? (parseFloat(lradBoxNow) || 0) : 1.2;
    return obj;
  };
  const avgInRange = (start, end) => averageFieldsInRange(uploadData, start, end);

  // ── Upload ────────────────────────────────────────────────────────────────
  const onFile = async (file) => {
    setUploadStatus({ cls: 'loading', text: '⏳ Parsing all sheets…' });
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await authFetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'CENPEEP');

      const extracted = data.extracted || {};
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
      const missingFieldsList = data.missingFields || [];
      const miss = new Set();
      for (const m of missingFieldsList) { const id = m.id || m; if (ALL_FIELDS.some((f) => f.id === id)) miss.add(id); }

      setValues(next);
      setDetected(det);
      setMissing(miss);
      setUploadedFilename(data.filename);
      setUploadData(data);
      proc.setProcesses([]);
      setComparison(null); setCompActive(false);

      setUploadStatus({
        cls: 'success',
        node: buildUploadSummary({
          data, populated, fieldDetail: data.fieldDetail || {}, missingFieldsList,
          strategyLabel: STRATEGY_DEFAULT, derivedLabel: '↳ defaulted from Secondary Air', bee: false,
        }),
      });
      showToast(`Excel imported — ${populated} fields auto-populated from "${data.primarySheet || ''}"`, 'success');
    } catch (err) {
      setUploadStatus({ cls: 'error', text: `✗ ${err.message}` });
      showToast(err.message, 'error');
    }
  };

  // ── Calculate ─────────────────────────────────────────────────────────────
  const calculate = () => {
    const activeProcesses = proc.processes.filter((p) => p.start || p.end);
    setGcv(null); setAph(false); setAphSingle(false);

    if (!activeProcesses.length) {
      setCompActive(false);
      const r = runCalculation(collectInputs());
      setSingle(r);
      setLradBox(String(r.Lrad || 1.09));
      setComparison(null);
      setTab('output');
      return;
    }
    const baseInputs = collectInputs();
    const list = activeProcesses.map((p) => {
      const { avg, rowCount } = avgInRange(p.start, p.end);
      const result = runCalculation({ ...baseInputs, ...avg });
      return { title: p.title || 'Process', start: p.start, end: p.end, rowCount, result };
    });
    setComparison(list);
    setCompActive(true);
    setSingle(list[0].result);
    setLradBox(null);
    setTab('output');
  };

  // ── Radiation box (recalculate()) ─────────────────────────────────────────
  const onLradChange = (val) => {
    setLradBox(val);
    if (!single) return;
    const Lrad = parseFloat(val) || 0;
    const r = single;
    setSingle({ ...r, Lrad, BoilerEff: 100 - (r.Ldg + r.Luc + r.Lmf + r.Lhf + r.Lco + r.Lma + Lrad) });
  };

  // ── APH correction, single-result flow ────────────────────────────────────
  const applyAPHCorrectionResult = () => {
    if (!single) { showToast('Calculate first.', 'error'); return; }
    const r = runCalculation(collectInputs());
    setSingle(r);
    setLradBox(String(r.Lrad || 1.09));
    setAphSingle(true);
    showToast('APH correction recalculated using the current Design Conditions parameters.', 'success');
  };

  // ── GCV / APH correction, two-process flow ────────────────────────────────
  const undoGCVCorrection = () => {
    if (!gcv) return;
    setComparison((list) => list.map((p, i) => (i === gcv.targetIdx ? { ...p, result: p._originalResult, _originalResult: undefined, gcvCorrected: false } : p)));
    setGcv(null);
    showToast('GCV correction removed.', 'success');
  };
  const applyGCVCorrection = () => {
    const list = comparison;
    if (!compActive || !list || list.length !== 2) { showToast('GCV correction needs exactly two active processes.', 'error'); return; }
    if (gcv) { undoGCVCorrection(); return; }
    const [p0, p1] = list;
    const k0 = processDateKey(p0), k1 = processDateKey(p1);
    if (!k0 || !k1) { showToast('Both processes need at least one date set to apply GCV correction.', 'error'); return; }
    if (k0 === k1) { showToast('Both processes resolve to the same date — cannot tell which is later.', 'error'); return; }
    const laterIdx = k1 > k0 ? 1 : 0, earlierIdx = k1 > k0 ? 0 : 1;
    const later = list[laterIdx], earlier = list[earlierIdx];

    const baseInputs = collectInputs();
    const { avg: avgEarlier } = avgInRange(earlier.start, earlier.end);
    const { avg: avgLater } = avgInRange(later.start, later.end);
    const correctedInputs = { ...baseInputs, ...avgLater };
    PROXIMATE_AS_FIRED_IDS.forEach((id) => {
      correctedInputs[id] = (avgEarlier[id] !== undefined) ? avgEarlier[id] : baseInputs[id];
    });
    const newList = list.map((p, i) => {
      if (i === laterIdx) return { ...p, _originalResult: p.result, result: runCalculation(correctedInputs), gcvCorrected: true };
      return { ...p, result: runCalculation({ ...baseInputs, ...avgEarlier }) };
    });
    setComparison(newList);
    setGcv({ targetIdx: laterIdx, sourceIdx: earlierIdx, targetTitle: later.title, sourceTitle: earlier.title });
    showToast(`GCV correction applied — "${later.title}" now uses "${earlier.title}"'s Proximate As-Fired data.`, 'success');
  };
  const applyAPHCorrection = () => {
    if (!compActive || !comparison || comparison.length !== 2) { showToast('APH correction needs exactly two active processes.', 'error'); return; }
    const next = !aph;
    setAph(next);
    showToast(next
      ? 'APH correction applied — Boiler Efficiency now shows the APH-corrected value for both processes.'
      : 'APH correction removed.', 'success');
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetInputs = () => {
    setValues((v) => {
      const n = { ...v };
      Object.entries(RESET_VALUES).forEach(([id, val]) => { if (id in n) n[id] = String(val); });
      return n;
    });
    setUploadedFilename(null); setUploadData(null);
    proc.setProcesses([]);
    setCompActive(false); setGcv(null); setAph(false); setAphSingle(false);
    setUi({ processInputsOpen: false, processComparisonOpen: false });
    setUploadStatus(null);
  };

  // ── Save to database ──────────────────────────────────────────────────────
  const saveOneSession = async (r, sessionName) => {
    const payload = {
      sessionName,
      sourceFile: uploadedFilename || 'Manual Entry',
      boilerType: sessionStorage.getItem('boilerType') || '',
      inputs: r.inputs,
      results: {
        BoilerEff: r.BoilerEff, BoilerEffCorr: r.BoilerEffCorr,
        Ldg: r.Ldg, Luc: r.Luc, Lmf: r.Lmf, Lhf: r.Lhf,
        Lco: r.Lco, Lma: r.Lma, Lrad: r.Lrad,
        CO2in: r.CO2in, CO2out: r.CO2out, Trai: r.Trai,
        AL: r.AL, Tgc: r.Tgc,
        Ldgc: r.Ldgc, Lucc: r.Lucc, Lmfc: r.Lmfc,
        Lhfc: r.Lhfc, Lcoc: r.Lcoc, Lmac: r.Lmac,
      },
    };
    const res = await authFetch('/api/sessions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
  };
  const saveSession = async () => {
    if (compActive && comparison && comparison.length) {
      if (!window.confirm(`Save all ${comparison.length} process result(s) to the database?`)) return;
      try {
        for (const p of comparison) await saveOneSession(p.result, `${uploadedFilename || 'Manual Entry'} — ${p.title}`);
        showToast('✓ All process results saved to MongoDB!', 'success');
      } catch (err) { showToast('Save failed: ' + err.message, 'error'); }
      return;
    }
    if (!single) { showToast('Calculate first before saving.', 'error'); return; }
    const name = window.prompt('Session name (optional):', uploadedFilename || '');
    if (name === null) return;
    try {
      await saveOneSession(single, name.trim());
      showToast('✓ Session saved to MongoDB!', 'success');
    } catch (err) { showToast('Save failed: ' + err.message, 'error'); }
  };

  // ── CSV / PDF / Field report ──────────────────────────────────────────────
  const stamp = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  const downloadComparisonCSV = () => {
    const list = comparison, now = stamp();
    let csv = `CENPEEP Boiler Efficiency — Process Comparison\nGenerated:,${now}\n\n`;
    csv += 'Metric,' + list.map((p) => `"${p.title}"`).join(',') + '\n';
    COMPARISON_METRIC_ROWS.forEach(([label, fn]) => { csv += `"${label}",` + list.map((p) => `"${fn(p)}"`).join(',') + '\n'; });
    downloadBlob(new Blob([csv], { type: 'text/csv' }), `cenpeep_comparison_${now.replace(/[: ]/g, '_')}.csv`);
  };
  const downloadCSV = () => {
    if (compActive && comparison && comparison.length) { downloadComparisonCSV(); return; }
    if (!single) { showToast('Calculate first.', 'error'); return; }
    const r = single, now = stamp();
    let csv = `CENPEEP Boiler Efficiency Report\nGenerated:,${now}\n\nINPUTS\nParameter,Value\n`;
    r.inputs.forEach((i) => { csv += `"${i.label}",${i.value}\n`; });
    csv += '\nOUTPUTS\nParameter,Symbol,Value,UoM\n';
    [
      ['CO₂ APH In', 'CO2in', r.CO2in, '%'], ['CO₂ APH Out', 'CO2out', r.CO2out, '%'],
      ['Weighted Air Temp In', 'Trai', r.Trai, '°C'], ['Dry Gas Loss', 'Ldg', r.Ldg, '%'],
      ['Unburnt Carbon Loss', 'Luc', r.Luc, '%'], ['Moisture Fuel Loss', 'Lmf', r.Lmf, '%'],
      ['Hydrogen Fuel Loss', 'Lhf', r.Lhf, '%'], ['CO Loss', 'Lco', r.Lco, '%'],
      ['Moisture Air Loss', 'Lma', r.Lma, '%'], ['Radiation Loss', 'Lrad', r.Lrad, '%'],
      ['Boiler Efficiency', 'eta', r.BoilerEff, '%'], ['Boiler Efficiency Corrected', 'eta_corr', r.BoilerEffCorr, '%'],
    ].forEach(([n, s, val, u]) => { csv += `"${n}","${s}",${typeof val === 'number' ? val.toFixed(4) : ''},,"${u}"\n`; });
    downloadBlob(new Blob([csv], { type: 'text/csv' }), `cenpeep_report_${now.replace(/[: ]/g, '_')}.csv`);
  };
  const PRINT_CSS = 'body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}.meta{color:#666;font-size:11px;margin-bottom:16px}';
  const downloadComparisonPDF = () => {
    const list = comparison, now = new Date().toLocaleString();
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Comparison Report</title>
  <style>${PRINT_CSS}</style></head><body>
  <h1>CENPEEP Boiler Efficiency — Process Comparison</h1><p class="meta">Generated: ${now}</p>
  <table><tr><th>Metric</th>${list.map((p) => `<th>${p.title}</th>`).join('')}</tr>
  ${COMPARISON_METRIC_ROWS.map(([label, fn]) => `<tr><td>${label}</td>${list.map((p) => `<td>${fn(p)}</td>`).join('')}</tr>`).join('')}
  </table><script>window.print();<\/script></body></html>`);
    win.document.close();
  };
  const downloadPDF = () => {
    if (compActive && comparison && comparison.length) { downloadComparisonPDF(); return; }
    if (!single) { showToast('Calculate first.', 'error'); return; }
    const r = single, now = new Date().toLocaleString();
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Report</title>
  <style>${PRINT_CSS}h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}.hl{background:#e6fff5!important;font-weight:bold}</style></head><body>
  <h1>CENPEEP Boiler Efficiency Report</h1><p class="meta">Generated: ${now}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${r.inputs.map((i) => `<tr><td>${i.label}</td><td>${i.value}</td></tr>`).join('')}</table>
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
  };
  const downloadFieldReport = async () => {
    const data = uploadData;
    if (!data || !data.fieldDetail || !Object.keys(data.fieldDetail).length) {
      showToast('Upload and parse a file first to generate a field report.', 'error');
      return;
    }
    const payload = {
      filename: data.filename, primarySheet: data.primarySheet, fieldDetail: data.fieldDetail,
      extracted: data.extracted, missingFields: data.missingFields,
    };
    if (compActive && comparison && comparison.length) {
      payload.processes = comparison.map((p) => {
        const { avg, rowCount } = avgInRange(p.start, p.end);
        return { title: p.title, start: p.start, end: p.end, rowCount, avg };
      });
    }
    try {
      const res = await authFetch('/api/report', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Report generation failed (${res.status})`);
      }
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="?([^"]+)"?/);
      downloadBlob(blob, match ? match[1] : 'CENPEEP_Field_Report.docx');
      showToast('✓ Field report downloaded', 'success');
    } catch (err) { showToast('Report failed: ' + err.message, 'error'); }
  };

  // ── Results rendering ─────────────────────────────────────────────────────
  const toggleUi = (key) => setUi((u) => ({ ...u, [key]: !u[key] }));

  const renderSingle = (r) => (
    <>
      <div className="kpi-card kpi-green">
        <div className="kpi-label">Boiler Efficiency</div>
        <div className="kpi-value boiler-eff-val">{fmt2(r.BoilerEff)}<span className="kpi-unit">%</span></div>
        <div className="kpi-sub">Indirect method — as-tested</div>
      </div>
      <div className="kpi-card kpi-blue">
        <div className="kpi-label">Boiler Efficiency Corrected</div>
        <div className="kpi-value boiler-eff-corr-val">{fmt2(r.BoilerEffCorr)}<span className="kpi-unit">%</span></div>
        <div className="kpi-sub">Corrected to design conditions</div>
        {aphSingle && <div className="kpi-note">Please check the input parameters if you feel any issue in the corrected efficiency figure.</div>}
      </div>
      <KpiCard cls="kpi-red" label="Dry Gas Loss"><div className="kpi-value">{fmt2(r.Ldg)}<span className="kpi-unit">%</span></div></KpiCard>
      <KpiCard cls="kpi-amber" label="Loss — Unburnt Carbon"><div className="kpi-value">{fmt2(r.Luc)}<span className="kpi-unit">%</span></div></KpiCard>
      <KpiCard cls="kpi-blue" label="Loss — Moisture in Fuel"><div className="kpi-value">{fmt2(r.Lmf)}<span className="kpi-unit">%</span></div></KpiCard>
      <KpiCard cls="kpi-green" label="Loss — Hydrogen in Fuel"><div className="kpi-value">{fmt2(r.Lhf)}<span className="kpi-unit">%</span></div></KpiCard>
      <KpiCard cls="kpi-amber" label="Loss — Carbon Monoxide"><div className="kpi-value">{fmt(r.Lco)}<span className="kpi-unit">%</span></div></KpiCard>
      <KpiCard cls="kpi-blue" label="Loss — Moisture in Air"><div className="kpi-value">{fmt2(r.Lma)}<span className="kpi-unit">%</span></div></KpiCard>
      <div className="kpi-card kpi-red" style={{ gridColumn: 'span 2' }}>
        <div className="kpi-label">Radiation &amp; Unaccounted Loss</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <input type="number" id="Lrad" value={lradBox ?? ''} onChange={(e) => onLradChange(e.target.value)}
            style={{ background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '6px', padding: '6px 10px', fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', color: 'var(--text-bright)', width: '120px', outline: 'none' }} />
          <span style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace" }}>%</span>
        </div>
        <div className="kpi-sub">Enter value and recalculate</div>
      </div>
      <button type="button" className={'kpi-card kpi-action' + (aphSingle ? ' applied' : '')} onClick={applyAPHCorrectionResult}>
        <div className="kpi-label">APH Correction{aphSingle && <CmpBadge>Applied</CmpBadge>}</div>
        <div className="kpi-value kpi-action-value">{aphSingle ? 'Recalculate Again' : 'Apply APH Correction'}</div>
        <div className="kpi-sub">Uses the Design Conditions (APH Correction) tab</div>
      </button>
    </>
  );

  const renderSingleTables = (r) => (
    <>
      <div className="output-section">
        <div className="output-section-head"><span>Corrected Losses</span></div>
        <HeaderRow />
        <OutRow name="Dry Gas Loss (Corrected)" sym="Ldgc" val={r.Ldgc} uom="%" />
        <OutRow name="Unburnt Carbon Loss (Corrected)" sym="Lucc" val={r.Lucc} uom="%" />
        <OutRow name="Moisture Fuel Loss (Corrected)" sym="Lmfc" val={r.Lmfc} uom="%" />
        <OutRow name="Hydrogen Fuel Loss (Corrected)" sym="Lhfc" val={r.Lhfc} uom="%" />
        <OutRow name="CO Loss (Corrected)" sym="Lcoc" val={r.Lcoc} uom="%" />
        <OutRow name="Moisture Air Loss (Corrected)" sym="Lmac" val={r.Lmac} uom="%" />
        <div className="output-row highlight-row2">
          <span className="out-name">Boiler Efficiency — Corrected</span>
          <span className="out-sym">η<sub>corr</sub></span>
          <span className="out-val">{fmt2(r.BoilerEffCorr)}</span>
          <span className="out-uom">%</span>
        </div>
      </div>
      <div className="output-section">
        <div className="output-section-head"><span>Intermediate Values</span></div>
        <HeaderRow />
        <OutRow name="CO₂ — APH In" sym="CO₂in" val={r.CO2in} uom="%" />
        <OutRow name="CO₂ — APH Out" sym="CO₂out" val={r.CO2out} uom="%" />
        <OutRow name="Weighted Air Temp In" sym="Trai" val={r.Trai} uom="°C" />
        <OutRow name="AH Leakage" sym="AL" val={r.AL} uom="%" />
        <OutRow name="Gas Temp — Corrected" sym="Tgc" val={r.Tgc} uom="°C" />
        <OutRow name="Stoichiometric Air" sym="Sa" val={r.Sa} uom="kg/kg" />
        <OutRow name="Excess Air" sym="Ea" val={r.Ea} uom="—" />
      </div>
    </>
  );

  const renderComparison = (list) => {
    const aphApplied = aph;
    const effOf = (p) => (aphApplied ? p.result.BoilerEffCorr : p.result.BoilerEff);
    const gcvBadge = (p) => (p.gcvCorrected ? <CmpBadge>GCV corrected</CmpBadge> : null);

    const dateAveragedIds = new Set();
    list.forEach((p) => Object.keys(avgInRange(p.start, p.end).avg).forEach((fid) => dateAveragedIds.add(fid)));
    const perProcessIds = INPUT_IDS.filter((id) => dateAveragedIds.has(id));
    const corr = gcv;

    return {
      kpis: (
        <>
          {list.map((p, i) => (
            <div className="kpi-card kpi-green" key={i}>
              <div className="kpi-label">{p.title}{p.gcvCorrected && <CmpBadge>GCV corrected</CmpBadge>}{aphApplied && <CmpBadge>APH corrected</CmpBadge>}</div>
              <div className="kpi-value">{fmt2(effOf(p))}<span className="kpi-unit">%</span></div>
              <div className="kpi-sub">{fmtDateDMY(p.start)} → {fmtDateDMY(p.end)} · {p.rowCount} row{p.rowCount === 1 ? '' : 's'}</div>
            </div>
          ))}
          {list.length === 2 && (
            <>
              <DeltaCard p1={list[0]} p2={list[1]} eff1={effOf(list[0])} eff2={effOf(list[1])} suffix={aphApplied ? ' APH corr.' : ''} />
              <button type="button" className={'kpi-card kpi-action' + (corr ? ' applied' : '')} onClick={applyGCVCorrection}>
                <div className="kpi-label">GCV Correction{corr && <CmpBadge>Applied</CmpBadge>}</div>
                <div className="kpi-value kpi-action-value">{corr ? 'Click to undo' : 'Apply GCV Correction'}</div>
              </button>
              <button type="button" className={'kpi-card kpi-action' + (aphApplied ? ' applied' : '')} onClick={applyAPHCorrection}>
                <div className="kpi-label">APH Correction{aphApplied && <CmpBadge>Applied</CmpBadge>}</div>
                <div className="kpi-value kpi-action-value">{aphApplied ? 'Click to undo' : 'Apply APH Correction'}</div>
                <div className="kpi-sub"></div>
              </button>
            </>
          )}
        </>
      ),
      tables: (
        <>
          <ProcessInputsSection list={list} perProcessIds={perProcessIds} labels={INPUT_LABELS} page="cenpeep"
            open={ui.processInputsOpen} onToggle={() => compActive && toggleUi('processInputsOpen')}
            thBadge={gcvBadge}
            flag={(p, id) => (corr && list.indexOf(p) === corr.targetIdx && PROXIMATE_AS_FIRED_IDS.includes(id)
              ? <> <small style={{ color: 'var(--accent2)' }} title={`From "${corr.sourceTitle}"`}>↺</small></> : null)} />
          <ProcessComparisonSection list={list} rows={COMPARISON_METRIC_ROWS} page="cenpeep"
            open={ui.processComparisonOpen} onToggle={() => compActive && toggleUi('processComparisonOpen')} thBadge={gcvBadge} />
        </>
      ),
    };
  };

  let kpiArea = null, outputTables = null;
  if (comparison) {
    const c = renderComparison(comparison);
    kpiArea = c.kpis; outputTables = c.tables;
  } else if (single && lradBox !== null) {
    kpiArea = renderSingle(single); outputTables = renderSingleTables(single);
  }

  return (
    <div className="container">
      <BoilerLockBanner />
      <div className="section-header" style={{ marginTop: 0 }}><div className="section-label">CENPEEP Formula</div><div className="section-line"></div></div>
      <div className="tab-nav">
        <button className={'tab-btn' + (tab === 'input' ? ' active' : '')} onClick={() => setTab('input')}><span className="tab-num">01 /</span> Input Parameters</button>
        <button className={'tab-btn' + (tab === 'output' ? ' active' : '')} onClick={() => setTab('output')}><span className="tab-num">02 /</span> Results &amp; Losses</button>
      </div>

      {/* ══ INPUT PAGE ══ */}
      <div className={'page' + (tab === 'input' ? ' active' : '')} id="page-input">
        <UploadBanner description="Upload your CENPEEP standard sheet — all input fields will be auto-populated."
          onFile={onFile} status={uploadStatus} />
        <ProcessSection uploadData={uploadData} processes={proc.processes} onAdd={proc.add} onRemove={proc.remove}
          onTitle={proc.setTitle} onDate={proc.setDate} />
        <div className="action-bar">
          <button className="btn btn-primary" onClick={calculate}><PlayIcon />Calculate Efficiency</button>
          <button className="btn btn-ghost" onClick={resetInputs}><ResetIcon />Reset to Defaults</button>
        </div>
        <SectionCards cards={INPUT_CARDS} open={open} onToggle={toggleSection} />
        {INPUT_GRIDS.map((gid) => (
          <FieldGrid key={gid} id={gid} fields={grids[gid]} open={!!open[gid]} values={values} derived={derived}
            onChange={setField} detected={detected} missing={missing} />
        ))}
      </div>

      {/* ══ OUTPUT PAGE ══ */}
      <div className={'page' + (tab === 'output' ? ' active' : '')} id="page-output">
        <div className="output-summary" id="kpi-area">{kpiArea}</div>
        <div className="design-conditions-block">
          <div className="section-header"><div className="section-label">Design Conditions — for APH Correction</div><div className="section-line"></div></div>
          <SectionCards cards={DESIGN_CARDS} open={open} onToggle={toggleSection} />
          {DESIGN_GRIDS.map((gid) => (
            <FieldGrid key={gid} id={gid} fields={grids[gid]} open={!!open[gid]} values={values} derived={derived}
              onChange={setField} detected={detected} missing={missing} />
          ))}
        </div>
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

export default function Cenpeep() {
  return <AppShell active="/calculator"><CenpeepPage /></AppShell>;
}
