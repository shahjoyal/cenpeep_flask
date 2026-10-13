import { fmt, fmt2, fmtDateDMY, fmtSigned } from '../lib/format.js';
import { NOTES } from '../lib/notes.js';

// ── small building blocks shared by the CENPEEP / ASME / BEE result pages ──
export const KpiCard = ({ cls, label, children, sub, style }) => (
  <div className={'kpi-card ' + cls} style={style}>
    <div className="kpi-label">{label}</div>
    {children}
    {sub !== undefined && <div className="kpi-sub">{sub}</div>}
  </div>
);
export const KpiValue = ({ v, className = '', digits = 2 }) => (
  <div className={'kpi-value ' + className}>{fmt(v, digits)}<span className="kpi-unit">%</span></div>
);

export const OutRow = ({ name, sym, val, uom }) => (
  <div className="output-row">
    <span className="out-name">{name}</span>
    <span className="out-sym">{sym}</span>
    <span className="out-val">{fmt2(val)}</span>
    <span className="out-uom">{uom}</span>
  </div>
);
export const HeaderRow = ({ a = 'Parameter', b = 'Symbol', c = 'Value', d = 'UoM' }) => (
  <div className="output-row header-row">
    <span>{a}</span><span style={{ textAlign: 'right' }}>{b}</span>
    <span style={{ textAlign: 'right' }}>{c}</span><span style={{ textAlign: 'right' }}>{d}</span>
  </div>
);
export const CollapsibleHead = ({ open, onClick, children }) => (
  <div className={'output-section-head collapsible-head' + (open ? ' open' : '')} onClick={onClick}>
    <span>{children}</span>
    <span className="collapse-chevron">{open ? '▾' : '▸'}</span>
  </div>
);

export function DeltaCard({ p1, p2, eff1, eff2, suffix = '' }) {
  const delta = eff2 - eff1;
  return (
    <div className={'kpi-card ' + (delta >= 0 ? 'kpi-green' : 'kpi-red')}>
      <div className="kpi-label">Delta Difference</div>
      <div className="kpi-value">{fmtSigned(delta)}<span className="kpi-unit">%</span></div>
      <div className="kpi-sub">{p2.title} − {p1.title} (Boiler Eff.{suffix})</div>
    </div>
  );
}

// Per-process KPI cards (one per process)
export function ProcessKpiCards({ list, effOf, badges }) {
  return list.map((p, i) => (
    <div className="kpi-card kpi-green" key={i}>
      <div className="kpi-label">{p.title}{badges && badges(p)}</div>
      <div className="kpi-value">{fmt2(effOf(p))}<span className="kpi-unit">%</span></div>
      <div className="kpi-sub">{fmtDateDMY(p.start)} → {fmtDateDMY(p.end)} · {p.rowCount} row{p.rowCount === 1 ? '' : 's'}</div>
    </div>
  ));
}

// "Process Inputs" collapsible table. `perProcessIds` already filtered to the
// ids the dated log varies by process. `flag(p,id)` lets CENPEEP mark the ↺
// GCV-correction cells.
export function ProcessInputsSection({ list, perProcessIds, labels, open, onToggle, page, thBadge, flag }) {
  const notes = NOTES[page];
  return (
    <div className="output-section">
      <CollapsibleHead open={open} onClick={onToggle}>Process Inputs</CollapsibleHead>
      {open && (
        <>
          <div className="cmp-table-wrap">
            <table className="cmp-table">
              <thead><tr>
                <th>From the dated log — varies per process</th>
                {list.map((p, i) => (
                  <th key={i}>{p.title}{thBadge && thBadge(p)}
                    <div className="cmp-th-date">{fmtDateDMY(p.start)} → {fmtDateDMY(p.end)}</div>
                  </th>
                ))}
              </tr></thead>
              <tbody>
                {perProcessIds.length ? perProcessIds.map((id) => (
                  <tr key={id}>
                    <td className="cmp-metric">{labels[id] || id}</td>
                    {list.map((p, i) => {
                      const entry = p.result.inputs.find((x) => x.id === id);
                      return <td key={i}>{fmt(entry ? entry.value : 0, 3)}{flag && flag(p, id)}</td>;
                    })}
                  </tr>
                )) : (
                  <tr><td colSpan={list.length + 1}>{notes.noDate}</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="cmp-note">{notes.inputsNote}</div>
        </>
      )}
    </div>
  );
}

export function ProcessComparisonSection({ list, rows, open, onToggle, page, thBadge }) {
  return (
    <div className="output-section">
      <CollapsibleHead open={open} onClick={onToggle}>Process Comparison</CollapsibleHead>
      {open && (
        <>
          <div className="cmp-table-wrap">
            <table className="cmp-table">
              <thead><tr><th></th>{list.map((p, i) => <th key={i}>{p.title}{thBadge && thBadge(p)}</th>)}</tr></thead>
              <tbody>
                {rows.map(([label, fn]) => (
                  <tr key={label}><td className="cmp-metric">{label}</td>{list.map((p, i) => <td key={i}>{fn(p)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cmp-note">{NOTES[page].comparisonNote}</div>
        </>
      )}
    </div>
  );
}

export const CmpBadge = ({ children }) => <> <span className="cmp-badge">{children}</span></>;
