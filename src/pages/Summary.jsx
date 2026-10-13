import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import UploadBanner from '../components/UploadBanner.jsx';
import { useToast } from '../hooks/ToastContext.jsx';
import { authFetch } from '../lib/auth.js';
import { SUMMARY_STORAGE_KEY, stashForSummary } from '../lib/format.js';
import { runCalculation as runCenpeep } from '../lib/calc/cenpeep.js';
import { runCalculation as runAsme } from '../lib/calc/asme.js';
import { runCalculation as runBee } from '../lib/calc/bee.js';
import { runBS2885Calculation } from '../lib/calc/bs2885.js';
import {
  ASME_DEFAULTS, ASME_DETECTABLE, BEE_DEFAULTS, BEE_DETECTABLE, BS2885_DEFAULTS, CENPEEP_DEFAULTS, CENPEEP_DETECTABLE,
} from '../lib/summaryDefaults.js';

const fmt2 = (n) => (typeof n === 'number' && isFinite(n)) ? n.toFixed(2) : '—';

function coverageOf(extracted, ids) {
  const found = ids.filter((id) => extracted && Object.prototype.hasOwnProperty.call(extracted, id)).length;
  return { found, total: ids.length };
}

// Run all four methods off ONE upload's extracted data — each using only its
// own field set, exactly like using that tab standalone. (The original page
// reached each method's calculator through hidden iframes; here the very same
// calculation functions are imported directly.)
function computeAllEfficiencies(data) {
  const extracted = data.extracted || {};
  const extractedBS = data.extractedBS2885 || {};
  const out = {};
  try {
    const r = runCenpeep({ ...CENPEEP_DEFAULTS, ...extracted });
    out.cenpeep = { ok: true, eff: r.BoilerEff, coverage: coverageOf(extracted, CENPEEP_DETECTABLE) };
  } catch (e) { out.cenpeep = { ok: false, error: e.message }; }
  try {
    const r = runAsme({ ...ASME_DEFAULTS, ...extracted });
    out.asme = { ok: true, eff: r.BoilerEff, coverage: coverageOf(extracted, ASME_DETECTABLE) };
  } catch (e) { out.asme = { ok: false, error: e.message }; }
  try {
    const r = runBee({ ...BEE_DEFAULTS, ...extracted });
    out.bee = { ok: true, eff: r.BoilerEff, coverage: coverageOf(extracted, BEE_DETECTABLE) };
  } catch (e) { out.bee = { ok: false, error: e.message }; }
  try {
    const r = runBS2885Calculation({ ...BS2885_DEFAULTS, ...extractedBS });
    out.bs2885 = {
      ok: true, effB: r.methodB.gross, effBnet: r.methodB.net, effA: r.methodA.gross, effAnet: r.methodA.net,
      coverage: { found: Object.keys(extractedBS).length, total: Object.keys(BS2885_DEFAULTS).length },
    };
  } catch (e) { out.bs2885 = { ok: false, error: e.message }; }
  return out;
}

function timeAgo(ms) {
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return `${Math.round(h / 24)} day(s) ago`;
}

const Card = ({ cls, label, sub, value }) => (
  <div className={'kpi-card ' + cls}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    <div className="kpi-sub">{sub}</div>
  </div>
);
const Pct = ({ v }) => <>{fmt2(v)}<span className="kpi-unit">%</span></>;

function SummaryPage() {
  const showToast = useToast();
  useEffect(() => { document.title = 'Boiler Efficiency Calculator — Summary'; }, []);

  const [results, setResults] = useState(null);
  const [sourceNote, setSourceNote] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);

  // Auto-restore: show the last upload made on any tab, no second upload needed
  useEffect(() => {
    let stored;
    try {
      const raw = sessionStorage.getItem(SUMMARY_STORAGE_KEY);
      if (!raw) return;
      stored = JSON.parse(raw);
    } catch (e) { return; }
    if (!stored || !stored.extracted) return;
    try {
      const res = computeAllEfficiencies(stored);
      const okCount = ['cenpeep', 'bs2885', 'asme', 'bee'].filter((k) => res[k].ok).length;
      setResults(res);
      setSourceNote(
        `Auto-loaded from your last upload on the ${stored.sourceTab || 'another'} tab ` +
        `("${stored.filename || 'file'}", ${timeAgo(stored.savedAt)}) — ${okCount}/4 methods calculated. ` +
        'Upload a new file above to recalculate.'
      );
    } catch (e) { /* fall back to the empty state */ }
  }, []);

  const handleUpload = async (file) => {
    setUploadStatus({ cls: 'loading', text: '⏳ Parsing sheet and running all four methods…' });
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await authFetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'Summary');
      setSourceNote('');
      const r = computeAllEfficiencies(data);
      setResults(r);
      const okCount = ['cenpeep', 'bs2885', 'asme', 'bee'].filter((k) => r[k].ok).length;
      setUploadStatus({ cls: 'success', text: `✓ ${okCount}/4 methods calculated from "${data.filename}"` });
      showToast(`Summary updated — ${okCount}/4 methods calculated`, okCount === 4 ? 'success' : 'error');
    } catch (err) {
      setUploadStatus({ cls: 'error', text: `✗ ${err.message}` });
      showToast(err.message, 'error');
    }
  };

  const c = results && results.cenpeep, bs = results && results.bs2885, a = results && results.asme, b = results && results.bee;

  return (
    <div className="container">
      <BoilerLockBanner />
      <div className="section-header" style={{ marginTop: 0 }}><div className="section-label">Summary — All Methods</div><div className="section-line"></div></div>

      <UploadBanner
        description="Upload one data sheet — CENPEEP, BS-2885, ASME-PTC 4.1 and BEE efficiencies are all calculated from it, each using only its own required input fields."
        onFile={handleUpload} status={uploadStatus} />

      {!results && (
        <div id="summary-empty" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', fontSize: '14px' }}>
          Upload a data sheet above — or upload one on any other tab and come back here — to see Boiler Efficiency computed by all four methods side by side.
        </div>
      )}

      {sourceNote && (
        <div id="summary-source-note" style={{ fontSize: '12px', color: 'var(--muted)', margin: '-6px 0 14px', padding: '0 4px' }}>{sourceNote}</div>
      )}

      {results && (
        <div id="summary-results">
          <div className="output-summary" id="summary-kpi-area">
            <Card cls="kpi-green" label="CENPEEP"
              sub={c.ok ? `${c.coverage.found}/${c.coverage.total} fields detected` : (c.error || 'Could not calculate')}
              value={c.ok ? <Pct v={c.eff} /> : '—'} />
            <Card cls="kpi-blue" label="BS-2885 — Method B (indirect)"
              sub={bs.ok ? `Method A (direct): ${fmt2(bs.effA)}% · ${bs.coverage.found}/${bs.coverage.total} fields` : (bs.error || 'Could not calculate')}
              value={bs.ok ? <Pct v={bs.effB} /> : '—'} />
            <Card cls="kpi-amber" label="ASME PTC 4.1"
              sub={a.ok ? `${a.coverage.found}/${a.coverage.total} fields detected` : (a.error || 'Could not calculate')}
              value={a.ok ? <Pct v={a.eff} /> : '—'} />
            <Card cls="kpi-red" label="BEE-2 Indirect"
              sub={b.ok ? `${b.coverage.found}/${b.coverage.total} fields detected` : (b.error || 'Could not calculate')}
              value={b.ok ? <Pct v={b.eff} /> : '—'} />
          </div>
          <div id="summary-detail-tables"></div>
        </div>
      )}
    </div>
  );
}

export default function Summary() {
  return <AppShell active="/summary"><SummaryPage /></AppShell>;
}
