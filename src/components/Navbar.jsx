import { Link } from '../lib/router.jsx';
import { logout } from '../lib/auth.js';
import { useBoiler } from '../hooks/BoilerContext.jsx';

// Same links as the <nav> block repeated in calculator.html/tab1-3.html/…
export const NAV_LINKS = [
  { to: '/calculator', label: 'CENPEEP' },
  { to: '/bs-2885', label: 'BS-2885' },
  { to: '/is-13890', label: 'IS-13890' },
  { to: '/asme-ptc-4-1', label: 'ASME-PTC 4.1' },
  { to: '/bee', label: 'BEE' },
  { to: '/summary', label: 'Summary' },
  { to: '/sessions', label: 'Sessions' },
];

export default function Navbar({ active }) {
  const { boilerType } = useBoiler();
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-logo">
          <div className="nav-logo-icon"><img src="images/abhitech-logo.png" alt="ABHITECH" /></div>
          <span className="nav-logo-text">Boiler<small>Efficiency Calculator</small></span>
          {boilerType && (
            <span id="boiler-type-badge" className="boiler-type-badge" title="Boiler type selected at login">{boilerType}</span>
          )}
        </div>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={'nav-link' + (active === l.to ? ' active' : '')}>{l.label}</Link>
          ))}
        </div>
        <button className="nav-logout" onClick={() => logout()}>Logout</button>
      </div>
    </nav>
  );
}
