import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Calendar popup (red dot = a date the uploaded file actually has data for) —
// port of openDatePicker() in public/script.js. Positioned under the button
// that opened it, closes on outside click / selection / Clear.
export default function DatePicker({ anchorEl, selected, availableDates, onSelect, onClose }) {
  const availSet = new Set(availableDates || []);
  const base = selected ? new Date(selected + 'T00:00:00')
    : (availableDates && availableDates.length) ? new Date(availableDates[availableDates.length - 1] + 'T00:00:00')
    : new Date();
  const [view, setView] = useState({ y: base.getFullYear(), m: base.getMonth() });
  const popRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const rect = anchorEl.getBoundingClientRect();
    setPos({ top: window.scrollY + rect.bottom + 6, left: window.scrollX + rect.left });
  }, [anchorEl]);

  useEffect(() => {
    const onDown = (e) => {
      if (popRef.current && !popRef.current.contains(e.target) && e.target !== anchorEl) onClose();
    };
    const t = setTimeout(() => document.addEventListener('mousedown', onDown), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', onDown); };
  }, [anchorEl, onClose]);

  const first = new Date(view.y, view.m, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const monthLabel = first.toLocaleString('default', { month: 'long' });

  const nav = (d) => setView(({ y, m }) => {
    let nm = m + d, ny = y;
    if (nm < 0) { nm = 11; ny--; }
    if (nm > 11) { nm = 0; ny++; }
    return { y: ny, m: nm };
  });

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(<span key={'e' + i} className="dp-cell dp-empty" />);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasData = availSet.has(iso);
    const isSelected = selected === iso;
    cells.push(
      <span key={iso} className={'dp-cell' + (hasData ? ' dp-has-data' : '') + (isSelected ? ' dp-selected' : '')}
        data-date={iso} onClick={() => { onSelect(iso); onClose(); }}>
        {d}{hasData && <i className="dp-dot" />}
      </span>
    );
  }

  return createPortal(
    <div className="date-picker-popup" ref={popRef} style={{ top: pos.top + 'px', left: pos.left + 'px' }}>
      <div className="dp-head">
        <button type="button" className="dp-nav" onClick={() => nav(-1)}>&lsaquo;</button>
        <span className="dp-month">{monthLabel} {view.y}</span>
        <button type="button" className="dp-nav" onClick={() => nav(1)}>&rsaquo;</button>
      </div>
      <div className="dp-grid dp-dow"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
      <div className="dp-grid">{cells}</div>
      <div className="dp-foot">
        <span className="dp-legend"><i className="dp-dot" /> data available</span>
        <button type="button" className="dp-clear" onClick={() => { onSelect(null); onClose(); }}>Clear</button>
      </div>
    </div>,
    document.body
  );
}
