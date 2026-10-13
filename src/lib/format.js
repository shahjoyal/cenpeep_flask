// Formatting + date-range helpers shared by every calculator page
// (identical to the helpers duplicated at the top of public/script*.js).

export const fmt = (n, d = 4) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(d) : '—';
export const fmt2 = (n) => fmt(n, 2);
// BS-2885's own fmt additionally treats ±Infinity as missing (script1.js)
export const fmtFinite = (n, d = 4) => (typeof n === 'number' && !isNaN(n) && isFinite(n)) ? n.toFixed(d) : '—';
export const fmt2Finite = (n) => fmtFinite(n, 2);
// Signed variant for delta values — always shows a leading + or −.
export const fmtSigned = (n, d = 2) => (typeof n === 'number' && !isNaN(n)) ? (n >= 0 ? '+' : '') + n.toFixed(d) : '—';

// "YYYY-MM-DD" -> "18 August 2026"
export function fmtDateDMY(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// v(id): parseFloat(value) || 0 over the form-values object
export const num = (values, id) => parseFloat(values[id]) || 0;

// ── Date-wise processes: slicing the uploaded file's dated log ──────────────
// Rows inside [start, end] (inclusive; an unset bound is open on that side).
export function rowsInRange(uploadData, start, end, extra) {
  const rows = ((uploadData && uploadData.datedRows) || []).concat(extra || []);
  return rows.filter((r) => r.date && (!start || r.date >= start) && (!end || r.date <= end));
}

// Average every field the dated log has readings for across the rows in range.
// `useBeeExtras` folds in BEE's beeOverridesDated series (see script3.js).
export function averageFieldsInRange(uploadData, start, end, useBeeExtras = false) {
  const extraRows = useBeeExtras
    ? Object.values((uploadData && uploadData.beeOverridesDated) || {}).flat()
    : [];
  const rows = rowsInRange(uploadData, start, end, extraRows);
  const sums = {}, counts = {};
  rows.forEach((r) => Object.entries(r.values).forEach(([fid, val]) => {
    sums[fid] = (sums[fid] || 0) + val;
    counts[fid] = (counts[fid] || 0) + 1;
  }));
  const avg = {};
  Object.keys(sums).forEach((fid) => { avg[fid] = sums[fid] / counts[fid]; });
  // rowCount reflects the main dated log only
  return { avg, rowCount: rowsInRange(uploadData, start, end).length };
}

// Same sessionStorage stash every tab writes so Summary can auto-restore.
export const SUMMARY_STORAGE_KEY = 'cenpeep_lastUpload';
export function stashForSummary(data, sourceTab) {
  try {
    sessionStorage.setItem(SUMMARY_STORAGE_KEY, JSON.stringify({
      filename: data.filename,
      primarySheet: data.primarySheet,
      sheetNameBS2885: data.sheetNameBS2885,
      extracted: data.extracted || {},
      extractedBS2885: data.extractedBS2885 || {},
      sourceTab,
      savedAt: Date.now(),
    }));
  } catch (e) { /* storage full/unavailable — Summary just won't auto-populate */ }
}

export function downloadBlob(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
