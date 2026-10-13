import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Boiler type lives in sessionStorage['boilerType'] exactly as before
// (boiler-gate.js / boiler-badge.js) — this context just lets React
// components re-render when it changes.
const BoilerCtx = createContext({ boilerType: null, setBoilerType: () => {} });
export const useBoiler = () => useContext(BoilerCtx);

export function BoilerProvider({ children }) {
  const [boilerType, setType] = useState(() => sessionStorage.getItem('boilerType'));
  const setBoilerType = useCallback((t) => {
    sessionStorage.setItem('boilerType', t);
    setType(t);
  }, []);
  // Locked state: tab switching + upload disabled until a boiler type is picked
  useEffect(() => {
    document.body.classList.toggle('boiler-locked', !boilerType);
    return () => document.body.classList.remove('boiler-locked');
  }, [boilerType]);
  return <BoilerCtx.Provider value={{ boilerType, setBoilerType }}>{children}</BoilerCtx.Provider>;
}
