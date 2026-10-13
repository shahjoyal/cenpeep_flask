import { useEffect, useState } from 'react';
import { useBoiler } from '../hooks/BoilerContext.jsx';
import { BoilerIcon } from './Icons.jsx';

// Port of public/boiler-gate.js: until a boiler type is chosen the tabs and the
// upload button are disabled (CSS, via body.boiler-locked) and this banner is
// shown; "Select Boiler Type" opens a small modal card with a dropdown + OK.
const OPTIONS = ['CFBC', 'Pulverized Coal', 'AFBC', 'Bagasse Fired'];

export function BoilerLockBanner() {
  const { boilerType } = useBoiler();
  return (
    <div className="boiler-lock-banner" id="boiler-lock-banner" style={{ display: boilerType ? 'none' : 'flex' }}>
      <div className="boiler-lock-banner-icon"><BoilerIcon width="20" height="20" /></div>
      <div className="boiler-lock-banner-text">
        <strong>Boiler type not selected</strong>
        <span>Select your boiler type to unlock uploads and tab switching.</span>
      </div>
      <button type="button" className="btn btn-primary" id="boiler-select-trigger"
        onClick={() => window.dispatchEvent(new CustomEvent('open-boiler-modal'))}>Select Boiler Type</button>
    </div>
  );
}

export function BoilerSelectModal() {
  const { boilerType, setBoilerType } = useBoiler();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(boilerType && OPTIONS.includes(boilerType) ? boilerType : OPTIONS[0]);

  // banner button → open
  useEventOpen(() => setOpen(true));

  return (
    <div className={'modal-overlay' + (open ? ' open' : '')} id="boilerSelectOverlay"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="modal boiler-select-modal">
        <div className="modal-header">
          <h3>Select Your Boiler Type</h3>
          <button className="modal-close" id="boilerSelectClose" aria-label="Close" type="button" onClick={() => setOpen(false)}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="boiler-select-icon"><BoilerIcon width="26" height="26" /></div>
          <div className="boiler-select-sub">This helps tailor the calculation to your plant</div>
          <div className="boiler-select-field">
            <label htmlFor="boilerTypeSelect">Boiler Type</label>
            <div className="select-wrap">
              <select id="boilerTypeSelect" value={sel} onChange={(e) => setSel(e.target.value)}>
                {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button type="button" className="btn btn-primary" id="boilerSelectOk"
            onClick={() => { setBoilerType(sel); setOpen(false); }}>OK</button>
        </div>
      </div>
    </div>
  );
}

function useEventOpen(fn) {
  useEffect(() => {
    window.addEventListener('open-boiler-modal', fn);
    return () => window.removeEventListener('open-boiler-modal', fn);
  });
}
