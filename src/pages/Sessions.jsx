import { useCallback, useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { BoilerLockBanner } from '../components/BoilerGate.jsx';
import { authFetch } from '../lib/auth.js';

const fmt2 = (n) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(2) : '—';
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    + '  ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

const Empty = ({ icon, title, children }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <div className="empty-title">{title}</div>
    {children !== undefined && <div className="empty-sub">{children}</div>}
  </div>
);

const Unit = ({ children = ' %' }) => <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted2)' }}>{children}</span>;

function SessionCard({ s, onOpen, onDelete }) {
  const r = s.results || {};
  const title = s.sessionName
    || (s.sourceFile && s.sourceFile !== 'Manual Entry' ? s.sourceFile : null)
    || `Session ${s._id.slice(-6)}`;
  return (
    <div className="session-card" onClick={() => onOpen(s)}>
      <button className="session-card-delete" onClick={(e) => onDelete(e, s._id)}>🗑</button>
      <div className="session-card-header">
        <div>
          <div className="session-card-title">{title}</div>
          <div className="session-card-date">{formatDate(s.uploadedAt || s.createdAt)}</div>
        </div>
        <div className="session-card-source" title={s.sourceFile || ''}>{s.sourceFile || 'Manual'}</div>
      </div>
      {s.boilerType && <div className="boiler-type-badge" style={{ margin: '0 0 12px', display: 'inline-block' }}>{s.boilerType}</div>}
      <div className="session-kpis">
        <div className="session-kpi"><div className="session-kpi-label">Boiler Eff.</div><div className="session-kpi-value green">{fmt2(r.BoilerEff)}<Unit /></div></div>
        <div className="session-kpi"><div className="session-kpi-label">Corr. Eff.</div><div className="session-kpi-value blue">{fmt2(r.BoilerEffCorr)}<Unit /></div></div>
        <div className="session-kpi"><div className="session-kpi-label">Dry Gas Loss</div><div className="session-kpi-value red">{fmt2(r.Ldg)}<Unit /></div></div>
        <div className="session-kpi"><div className="session-kpi-label">Unburnt C Loss</div><div className="session-kpi-value amber">{fmt2(r.Luc)}<Unit /></div></div>
      </div>
    </div>
  );
}

const MRow = ({ label, val, uom = '', cls = '' }) => (
  <div className={'modal-row' + (cls ? ' ' + cls : '')}>
    <span className="modal-row-name">{label}</span>
    <span className="modal-row-val">{fmt2(val)}</span>
    <span className="modal-row-uom">{uom}</span>
  </div>
);

function SessionModal({ s, onClose }) {
  const r = s.results || {};
  return (
    <div className="modal-overlay open" id="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" id="modal">
        <div className="modal-header">
          <h3 id="modal-title">{s.sessionName || s.sourceFile || `Session ${s._id.slice(-6)}`}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" id="modal-body">
          <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace", marginBottom: '18px' }}>
            Source: {s.sourceFile || 'Manual'} &nbsp;|&nbsp; Saved: {formatDate(s.uploadedAt || s.createdAt)}{s.boilerType ? <> &nbsp;|&nbsp; Boiler: {s.boilerType}</> : null}
          </div>
          <div className="modal-section-title">Efficiency Results</div>
          <MRow label="Boiler Efficiency (as-tested)" val={r.BoilerEff} uom="%" cls="modal-highlight" />
          <MRow label="Boiler Efficiency (corrected)" val={r.BoilerEffCorr} uom="%" cls="modal-highlight2" />
          <div className="modal-section-title">Losses</div>
          <MRow label="Dry Gas Loss" val={r.Ldg} uom="%" />
          <MRow label="Unburnt Carbon Loss" val={r.Luc} uom="%" />
          <MRow label="Moisture in Fuel Loss" val={r.Lmf} uom="%" />
          <MRow label="Hydrogen in Fuel Loss" val={r.Lhf} uom="%" />
          <MRow label="CO Loss" val={r.Lco} uom="%" />
          <MRow label="Moisture in Air Loss" val={r.Lma} uom="%" />
          <MRow label="Radiation Loss" val={r.Lrad} uom="%" />
          <div className="modal-section-title">Corrected Losses</div>
          <MRow label="Dry Gas Loss (corr.)" val={r.Ldgc} uom="%" />
          <MRow label="Unburnt Carbon Loss (corr.)" val={r.Lucc} uom="%" />
          <MRow label="Moisture Fuel Loss (corr.)" val={r.Lmfc} uom="%" />
          <MRow label="Hydrogen Fuel Loss (corr.)" val={r.Lhfc} uom="%" />
          <MRow label="CO Loss (corr.)" val={r.Lcoc} uom="%" />
          <MRow label="Moisture Air Loss (corr.)" val={r.Lmac} uom="%" />
          <div className="modal-section-title">Intermediate Values</div>
          <MRow label="CO₂ APH In" val={r.CO2in} uom="%" />
          <MRow label="CO₂ APH Out" val={r.CO2out} uom="%" />
          <MRow label="Weighted Air Temp In" val={r.Trai} uom="°C" />
          <MRow label="AH Leakage" val={r.AL} uom="%" />
          <MRow label="Gas Temp (Corrected)" val={r.Tgc} uom="°C" />
          {s.inputs && s.inputs.length > 0 && (
            <>
              <div className="modal-section-title">Input Parameters</div>
              {s.inputs.map((i, idx) => <MRow key={idx} label={i.label || i.id} val={parseFloat(i.value)} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionsPage() {
  useEffect(() => { document.title = 'Boiler Efficiency — Sessions'; }, []);
  const [state, setState] = useState({ phase: 'loading', sessions: [], error: '' });
  const [selected, setSelected] = useState(null);

  const loadSessions = useCallback(async () => {
    setState((s) => ({ ...s, phase: 'loading' }));
    try {
      const res = await authFetch('/api/sessions');
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setState({ phase: 'ready', sessions: data.sessions, error: '' });
    } catch (err) {
      setState({ phase: 'error', sessions: [], error: err.message });
    }
  }, []);
  useEffect(() => { loadSessions(); }, [loadSessions]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const deleteSession = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this session?')) return;
    try {
      await authFetch(`/api/sessions/${id}`, { method: 'DELETE' });
      loadSessions();
    } catch { /* ignored, same as before */ }
  };

  const { phase, sessions, error } = state;
  const count = phase === 'ready' ? (sessions.length === 1 ? '1 session' : `${sessions.length} sessions`) : '—';

  return (
    <>
      {selected && <SessionModal s={selected} onClose={() => setSelected(null)} />}
      <div className="container">
        <BoilerLockBanner />
        <div className="sessions-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2>Saved Sessions</h2>
            <span className="sessions-count" id="sessions-count">{count}</span>
          </div>
          <button className="btn btn-ghost" onClick={loadSessions} style={{ fontSize: '12px', padding: '8px 16px' }}>↻ Refresh</button>
        </div>
        <div id="sessions-content">
          {phase === 'loading' && <Empty icon="⏳" title="Loading sessions…">Fetching data from the database.</Empty>}
          {phase === 'error' && (
            <Empty icon="⚠️" title="Could not load sessions">
              {error}<br /><br />Make sure the server is running and MongoDB URI is configured in <code>.env</code>.
            </Empty>
          )}
          {phase === 'ready' && !sessions.length && (
            <Empty icon="📋" title="No sessions yet">Run a calculation and click "Save to Database" to store a session here.</Empty>
          )}
          {phase === 'ready' && sessions.length > 0 && (
            <div className="session-grid" id="session-grid">
              {sessions.map((s) => <SessionCard key={s._id} s={s} onOpen={setSelected} onDelete={deleteSession} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Sessions() {
  return <AppShell active="/sessions"><SessionsPage /></AppShell>;
}
