import { useEffect, useState } from 'react';
import loginCss from '../styles/login.css?raw';
import { useInjectedStyles } from '../hooks/useInjectedStyles.js';
import Particles from '../components/Particles.jsx';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '../components/Icons.jsx';
import { publicFetch, setSession } from '../lib/auth.js';
import { navigate } from '../lib/router.jsx';

// Login screen (public/index.html). The unused "select boiler type" box that
// the original left in the markup is dropped — the boiler type is picked in the
// popup on the calculator pages, exactly as before.
export default function Login() {
  useEffect(() => { document.title = 'Boiler Efficiency Calculator'; }, []);
  useInjectedStyles([loginCss], 'login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState({ text: 'Incorrect username or password!', show: false, n: 0 });

  const showError = (text) => setError((e) => ({ text: text || e.text, show: true, n: e.n + 1 }));

  const login = async () => {
    if (!username || !password) { showError('Enter your username and password.'); return; }
    setBusy(true);
    try {
      const res = await publicFetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) { showError(data.error || 'Incorrect username or password!'); return; }
      setSession(data.token, data.user);
      navigate('/calculator');
    } catch (e) {
      showError('Could not reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Particles />
      <div className="screen" onKeyDown={(e) => { if (e.key === 'Enter') login(); }}>
        <div className="brand-panel">
          <div className="brand-logo-ring"><div className="inner"><img src="images/abhitech-logo.png" alt="ABHITECH" /></div></div>
          <div className="brand-title">Boiler <span className="accent">Efficiency</span> Calculator</div>
          <div className="brand-rule"></div>
          <div className="stat-row">
            <div className="stat-chip"><div className="n">87%</div><div className="l">Boiler Eff.</div></div>
            <div className="stat-chip"><div className="n">5.8%</div><div className="l">Dry Gas Loss</div></div>
            <div className="stat-chip"><div className="n">1.2%</div><div className="l">Unburnt C</div></div>
          </div>
        </div>
        <div className="form-panel">
          <div className="login-box" id="loginBox">
            <div className="login-logo-icon"><img src="images/abhitech-logo.png" alt="ABHITECH" /></div>
            <div className="login-title">Welcome</div>
            <div className="login-sub">Sign in to access the Efficiency Calculator</div>
            <div className="login-divider"></div>
            <div key={error.n} className={'error-msg' + (error.show ? ' show' : '')} id="errorMsg">{error.text}</div>
            <div className="form-group">
              <span className="icon"><MailIcon /></span>
              <input type="text" id="username" placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <span className="icon"><LockIcon /></span>
              <input type={showPwd ? 'text' : 'password'} id="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="toggle-eye" id="toggleEye" aria-label="Show password" onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <button className="btn-login" disabled={busy} onClick={login}>Login</button>
            <div className="login-footer">Powered by <b>ABHITECH EnergyCon Ltd.</b></div>
          </div>
        </div>
      </div>
    </>
  );
}
