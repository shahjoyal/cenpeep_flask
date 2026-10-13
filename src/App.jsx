import { useEffect } from 'react';
import { isLoggedIn } from './lib/auth.js';
import { navigate, usePath } from './lib/router.jsx';
import Login from './pages/Login.jsx';
import Cenpeep from './pages/Cenpeep.jsx';
import Bs2885 from './pages/Bs2885.jsx';
import Asme from './pages/Asme.jsx';
import Bee from './pages/Bee.jsx';
import Summary from './pages/Summary.jsx';
import Sessions from './pages/Sessions.jsx';

const ROUTES = {
  '/calculator': Cenpeep,
  '/bs-2885': Bs2885,
  '/asme-ptc-4-1': Asme,
  '/bee': Bee,
  '/summary': Summary,
  '/sessions': Sessions,
};

export default function App() {
  const path = usePath();
  const Page = ROUTES[path];
  const authed = isLoggedIn();

  // Same as Auth.requireAuth() on every protected page: not logged in -> login
  useEffect(() => {
    if (Page && !authed) navigate('/');
  }, [Page, authed]);

  if (!Page) return <Login />;     // '/' and any unknown path -> login
  if (!authed) return null;        // redirecting
  return <Page key={path} />;
}
