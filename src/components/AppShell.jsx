import appCss from '../styles/style.css?raw';
import style1Css from '../styles/style1.css?raw';
import style3Css from '../styles/style3.css?raw';
import gateCss from '../styles/boiler-gate.css?raw';
import { useInjectedStyles } from '../hooks/useInjectedStyles.js';
import { ToastProvider } from '../hooks/ToastContext.jsx';
import { BoilerProvider } from '../hooks/BoilerContext.jsx';
import Particles from './Particles.jsx';
import Navbar from './Navbar.jsx';
import { BoilerSelectModal } from './BoilerGate.jsx';

const EXTRA = { bs2885: style1Css, bee: style3Css };

// Everything every authenticated page used to repeat: its stylesheets (in the
// original order: style.css, page css, boiler-gate css), particles background,
// navbar, toast, and the boiler-type modal. `extraStyle` = 'bs2885' | 'bee'.
export default function AppShell({ active, extraStyle, children }) {
  useInjectedStyles([appCss, ...(EXTRA[extraStyle] ? [EXTRA[extraStyle]] : []), gateCss], 'app-' + (extraStyle || 'base'));
  return (
    <BoilerProvider>
      <ToastProvider>
        <Particles />
        <Navbar active={active} />
        {children}
        <BoilerSelectModal />
      </ToastProvider>
    </BoilerProvider>
  );
}
