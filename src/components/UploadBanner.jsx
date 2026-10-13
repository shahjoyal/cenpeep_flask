import { useRef } from 'react';
import { ChartIcon, UploadIcon } from './Icons.jsx';

// The "Import from Excel" banner repeated on every calculator page.
// `status` = null | { cls, text } | { cls, node } — what used to be written
// into #upload-status (textContent / innerHTML).
export default function UploadBanner({ description, onFile, status, buttonLabel = 'Upload Excel Sheet' }) {
  const inputRef = useRef(null);
  return (
    <div className="upload-banner" id="upload-banner">
      <div className="upload-banner-icon"><ChartIcon /></div>
      <div className="upload-banner-text">
        <strong>Import from Excel</strong>
        <span>{description}</span>
      </div>
      <div className="upload-banner-actions">
        <input type="file" id="upload-file-input" accept=".xlsx,.xls,.xlsm" ref={inputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            Promise.resolve(onFile(file)).finally(() => { if (inputRef.current) inputRef.current.value = ''; });
          }} />
        <button className="btn-upload" onClick={() => inputRef.current && inputRef.current.click()}>
          <UploadIcon />{buttonLabel}
        </button>
        {status && (
          <span className={'upload-status ' + status.cls} id="upload-status" style={{ display: 'inline-block' }}>
            {status.node !== undefined ? status.node : status.text}
          </span>
        )}
      </div>
    </div>
  );
}
