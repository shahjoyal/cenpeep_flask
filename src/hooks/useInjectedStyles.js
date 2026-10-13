import { useLayoutEffect } from 'react';

// The original app loads a different set of stylesheets on each HTML page
// (login page: its own <style>; app pages: style.css [+ style1/3.css]).
// Because this is now ONE page, the stylesheets are mounted/unmounted with the
// screen that needs them, so e.g. the login page's rules can never leak onto
// the calculators (and vice-versa) — same isolation as before.
export function useInjectedStyles(cssList, key) {
  useLayoutEffect(() => {
    const els = cssList.map((css, i) => {
      const el = document.createElement('style');
      el.setAttribute('data-app-style', key + '-' + i);
      el.textContent = css;
      document.head.appendChild(el);
      return el;
    });
    return () => els.forEach((el) => el.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
