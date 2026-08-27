// boiler-badge.js — shows the boiler type picked at login as a small
// badge in the navbar, on every authenticated page. Reads sessionStorage
// 'boilerType' (set on index.html right after login). Safe no-op if the
// value isn't set (e.g. someone jumps straight to a page mid-session).
(function () {
  function renderBadge() {
    const boilerType = sessionStorage.getItem('boilerType');
    const navLogo = document.querySelector('.nav-logo');
    if (!boilerType || !navLogo) return;
    if (document.getElementById('boiler-type-badge')) return; // already there
    const badge = document.createElement('span');
    badge.id = 'boiler-type-badge';
    badge.className = 'boiler-type-badge';
    badge.textContent = boilerType;
    badge.title = 'Boiler type selected at login';
    navLogo.appendChild(badge);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBadge);
  } else {
    renderBadge();
  }
})();