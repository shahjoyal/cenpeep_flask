import { useCallback, useState } from 'react';
import DatePicker from './DatePicker.jsx';
import { CalendarIcon } from './Icons.jsx';
import { rowsInRange } from '../lib/format.js';

// "Date-wise Processes" block (public/script*.js addProcess/renderProcessList…).
// Shown only once an upload has dated log data. State lives in the page
// (processes array) so Calculate can read it.
export default function ProcessSection({ uploadData, processes, onAdd, onRemove, onTitle, onDate }) {
  const [picker, setPicker] = useState(null); // { id, role, el }
  const closePicker = useCallback(() => setPicker(null), []);

  const visible = !!(uploadData && uploadData.dateFilteringAvailable && uploadData.availableDates && uploadData.availableDates.length);
  let hint = 'Optional — split this file into named date ranges and compare results side by side.';
  if (visible) {
    const ad = uploadData.availableDates;
    hint = `Dated data found from ${ad[0]} to ${ad[ad.length - 1]} (${ad.length} day${ad.length === 1 ? '' : 's'} with readings) on "${uploadData.primarySheet || ''}".`;
  }
  const pickedProc = picker ? processes.find((p) => p.id === picker.id) : null;

  return (
    <div className="process-section" id="process-section" style={{ display: visible ? '' : 'none' }}>
      <div className="process-section-head">
        <div className="process-section-title">
          <strong><CalendarIcon />Date-wise Processes</strong>
          <span className="process-section-sub" id="process-hint">{hint}</span>
        </div>
        <button type="button" className="btn btn-secondary" id="add-process-btn" onClick={onAdd}>+ Add Process</button>
      </div>
      <div id="process-list">
        {!processes.length ? (
          <div className="process-empty">No processes added — Calculate will use the whole file's average, same as today.</div>
        ) : processes.map((p) => {
          const rowCount = rowsInRange(uploadData, p.start, p.end).length;
          return (
            <div className="process-row" key={p.id} data-id={p.id}>
              <input type="text" className="process-title-input" value={p.title} placeholder="Process title"
                onChange={(e) => onTitle(p.id, e.target.value)} />
              <button type="button" className="process-date-btn" data-role="start"
                onClick={(e) => setPicker({ id: p.id, role: 'start', el: e.currentTarget })}>
                {p.start || 'Start date'}
              </button>
              <span className="process-date-sep">→</span>
              <button type="button" className="process-date-btn" data-role="end"
                onClick={(e) => setPicker({ id: p.id, role: 'end', el: e.currentTarget })}>
                {p.end || 'End date'}
              </button>
              <span className="process-row-count">{rowCount} row{rowCount === 1 ? '' : 's'} in range</span>
              <button type="button" className="process-remove-btn" onClick={() => onRemove(p.id)} title="Remove process">✕</button>
            </div>
          );
        })}
      </div>
      {picker && pickedProc && (
        <DatePicker anchorEl={picker.el} selected={pickedProc[picker.role]}
          availableDates={(uploadData && uploadData.availableDates) || []}
          onSelect={(iso) => onDate(picker.id, picker.role, iso)} onClose={closePicker} />
      )}
    </div>
  );
}

// Process list state helper used by the three date-aware pages.
export function useProcesses() {
  const [processes, setProcesses] = useState([]);
  const [seq, setSeq] = useState(0);
  return {
    processes,
    setProcesses,
    add: () => {
      const n = seq + 1;
      setSeq(n);
      setProcesses((ps) => [...ps, { id: 'proc' + n, title: `Process ${ps.length + 1}`, start: null, end: null }]);
    },
    remove: (id) => setProcesses((ps) => ps.filter((p) => p.id !== id)),
    setTitle: (id, title) => setProcesses((ps) => ps.map((p) => (p.id === id ? { ...p, title } : p))),
    setDate: (id, which, iso) => setProcesses((ps) => ps.map((p) => (p.id === id ? { ...p, [which]: iso } : p))),
  };
}
