// Minimal hash router (no extra dependency). Hash routes (#/bee …) are used on
// purpose: they work with the existing Flask catch-all route AND with the
// existing vercel.json, neither of which needs to be touched.
import { useEffect, useState } from 'react';

export function currentPath() {
  const h = window.location.hash || '#/';
  const p = h.replace(/^#/, '') || '/';
  return p.startsWith('/') ? p : '/' + p;
}

export function navigate(path) {
  window.location.hash = '#' + path;
}

export function usePath() {
  const [path, setPath] = useState(currentPath());
  useEffect(() => {
    const on = () => setPath(currentPath());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
}

export function Link({ to, className, children, ...rest }) {
  return (
    <a href={'#' + to} className={className} {...rest}>
      {children}
    </a>
  );
}
