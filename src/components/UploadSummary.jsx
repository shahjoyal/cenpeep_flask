// The success panel the CENPEEP / ASME / BEE tabs write into #upload-status:
// "✓ N fields auto-populated … + per-field Detected From table + missing line".
const STRATEGY_BASE = {
  cenpeep_column: 'CenPeep layout',
  raw_tabular: 'raw data, averaged',
  raw_tabular_ml: 'raw data + AI field detection',
  raw_tabular_chunked: 'large sheet, chunked',
  raw_tabular_ml_chunked: 'large sheet, chunked + AI field detection',
  unrecognized: 'no fields found',
};
// BEE's page knows two extra layouts (script3.js)
export const STRATEGY_BEE = {
  ...STRATEGY_BASE,
  generic_row_layout: 'labeled-row layout',
  label_value_layout: 'label/value form layout',
};
export const STRATEGY_DEFAULT = STRATEGY_BASE;

export function buildUploadSummary({ data, populated, fieldDetail, missingFieldsList, strategyLabel, derivedLabel, bee }) {
  const sheetResults = data.sheetResults || [];
  const primarySheet = data.primarySheet || '';
  const selectedSr = sheetResults.find((sr) => sr.sheetName === primarySheet);
  const strat = selectedSr ? (strategyLabel[selectedSr.strategy] || selectedSr.strategy) : '';

  const fieldRows = Object.entries(fieldDetail)
    .sort(([, a], [, b]) => (a.label || '').localeCompare(b.label || ''))
    .map(([fid, d]) => {
      const conf = typeof d.confidence === 'number' ? `${Math.round(d.confidence * 100)}%` : '—';
      const via = d.source === 'ml' ? '🤖 AI-detected'
        : d.source === 'cenpeep_column' ? 'CenPeep layout'
        : d.source === 'derived_fallback' ? derivedLabel
        : 'exact match';
      const from = d.header ? `"${d.header}"` : (d.label || fid);
      return <tr key={fid}><td>{d.label || fid}</td><td>{from}</td><td>{via}</td><td>{conf}</td></tr>;
    });

  const missingNames = missingFieldsList.map((m) => m.label || m.id || m);
  let missingLine;
  if (missingNames.length) {
    missingLine = <><br /><small style={{ color: '#f87171' }}>⚠ Not detected — enter manually: {missingNames.join(', ')}</small></>;
  } else if (!bee || populated) {
    missingLine = <><br /><small style={{ color: '#4ade80' }}>✓ All required fields detected</small></>;
  } else {
    missingLine = <><br /><small style={{ color: '#94a3b8' }}>BEE field detection isn't wired up on the server yet — enter values manually below.</small></>;
  }

  const timeNote = data.parseTimeMs ? ` in ${(data.parseTimeMs / 1000).toFixed(1)}s` : '';
  const plural = bee ? (populated === 1 ? '' : 's') : '';
  return (
    <>
      {bee ? (populated ? '✓' : 'ℹ') : '✓'} <b>{populated} field{bee ? plural : 's'}</b> auto-populated from "{data.filename}" ({data.fileSizeMB || '?'} MB){timeNote}
      <br /><small style={{ color: '#94a3b8' }}>📄 Selected sheet: <b>{primarySheet}</b> ({strat}) — out of {sheetResults.length} sheet(s) scanned</small>
      {fieldRows.length > 0 && (
        <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', marginTop: '4px' }}>
          <thead><tr style={{ color: '#94a3b8', textAlign: 'left' }}>
            <th>Field</th><th>Detected From</th><th>Method</th><th>Confidence</th>
          </tr></thead>
          <tbody>{fieldRows}</tbody>
        </table>
      )}
      {missingLine}
    </>
  );
}
