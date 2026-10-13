import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

// Same behaviour as showToast() in public/script*.js: message + type class,
// visible for 3.2s.
export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', type: 'success', show: false });
  const timer = useRef(null);
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div className={toast.show ? `toast toast-${toast.type} show` : 'toast'} id="toast">{toast.msg}</div>
    </ToastCtx.Provider>
  );
}
