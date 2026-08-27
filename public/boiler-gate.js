// boiler-gate.js — runs on every authenticated page (calculator.html,
// tab1/2/3.html, summary.html, sessions.html).
//
// Functionality is unchanged from before: the boiler type is still just
// read/written as sessionStorage['boilerType'], same values, same place
// it's used elsewhere (boiler-badge.js, reports, etc).
//
// Only the UI changed:
//  - It's no longer picked on a separate full-page screen right after
//    login. Login now drops the user straight onto the app.
//  - Until a boiler type is chosen for this session, the top nav tabs
//    (CENPEEP / BS-2885 / ASME-PTC 4.1 / BEE / Summary / Sessions), the
//    in-page Input/Output tabs, and the Excel upload button are disabled.
//  - A "Select Boiler Type" button is shown; clicking it pops the same
//    boiler-type form up as a small card, with an X to dismiss it and an
//    OK button that saves the selection and unlocks everything.
(function () {
  const LOCK_CLASS = 'boiler-locked';

  function getBoilerType() {
    return sessionStorage.getItem('boilerType');
  }

  function applyLockState() {
    const locked = !getBoilerType();
    document.body.classList.toggle(LOCK_CLASS, locked);
    const banner = document.getElementById('boiler-lock-banner');
    if (banner) banner.style.display = locked ? 'flex' : 'none';
    return locked;
  }

  function injectStylesOnce() {
    if (document.getElementById('boiler-gate-styles')) return;
    const style = document.createElement('style');
    style.id = 'boiler-gate-styles';
    style.textContent = `
      /* ── Locked state: tab switching + upload disabled until a boiler
         type is picked for this session ───────────────────────────── */
      body.${LOCK_CLASS} .nav-link,
      body.${LOCK_CLASS} .tab-btn,
      body.${LOCK_CLASS} .btn-upload {
        pointer-events: none;
        opacity: 0.4;
        filter: grayscale(0.4);
        cursor: not-allowed;
      }
      body.${LOCK_CLASS} #upload-file-input { pointer-events: none; }

      /* ── "Select Boiler Type" banner ──────────────────────────────── */
      .boiler-lock-banner {
        display: none;
        align-items: center;
        gap: 14px;
        background: var(--accent-light, rgba(96,165,250,0.14));
        border: 1.5px solid var(--border, rgba(255,255,255,0.12));
        border-radius: var(--radius, 16px);
        padding: 14px 18px;
        margin: 0 0 20px;
      }
      .boiler-lock-banner-icon {
        width: 40px; height: 40px; flex-shrink: 0;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(96,165,250,0.18);
        border: 1px solid rgba(96,165,250,0.3);
        color: #93c5fd;
      }
      .boiler-lock-banner-text { flex: 1 1 auto; min-width: 180px; }
      .boiler-lock-banner-text strong { display: block; font-size: 14.5px; color: var(--text, #f1f5f9); margin-bottom: 2px; }
      .boiler-lock-banner-text span { font-size: 13px; color: var(--muted, #94a3b8); }
      .boiler-lock-banner .btn { flex-shrink: 0; }

      /* ── Boiler-type popup card (reuses the app's existing modal look) ── */
      .boiler-select-modal { max-width: 400px; text-align: center; }
      .boiler-select-modal .modal-body { padding: 26px 28px 30px; }
      .boiler-select-icon {
        width: 56px; height: 56px; margin: 0 auto 16px;
        border-radius: 14px;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(96,165,250,0.10));
        border: 1px solid rgba(96,165,250,0.3);
        color: #93c5fd;
      }
      .boiler-select-sub { font-size: 13.5px; color: var(--muted, #94a3b8); margin-bottom: 20px; }
      .boiler-select-field { text-align: left; margin-bottom: 20px; }
      .boiler-select-field label {
        display: block; font-size: 12.5px; font-weight: 600;
        color: var(--muted, #94a3b8); margin-bottom: 8px; letter-spacing: 0.2px;
      }
      .select-wrap { position: relative; }
      .select-wrap select {
        width: 100%;
        padding: 13px 40px 13px 14px;
        border: 1.5px solid var(--border, rgba(255,255,255,0.12));
        border-radius: 12px;
        font-family: 'Outfit', sans-serif;
        font-size: 14.5px;
        color: var(--text, #f1f5f9);
        background: rgba(255,255,255,0.03);
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        transition: all 0.2s;
      }
      .select-wrap select:focus {
        border-color: var(--accent, #60a5fa);
        background: rgba(59,130,246,0.06);
        box-shadow: 0 0 0 3px rgba(59,130,246,0.14);
      }
      .select-wrap select option { background: #101d42; color: var(--text, #f1f5f9); }
      .select-wrap::after {
        content: '';
        position: absolute; right: 16px; top: 50%;
        width: 9px; height: 9px;
        border-right: 2px solid var(--muted, #94a3b8);
        border-bottom: 2px solid var(--muted, #94a3b8);
        transform: translateY(-70%) rotate(45deg);
        pointer-events: none;
      }
      #boilerSelectOk { width: 100%; justify-content: center; }
    `;
    document.head.appendChild(style);
  }

  function injectBannerOnce() {
    if (document.getElementById('boiler-lock-banner')) return;
    const container = document.querySelector('.container');
    if (!container) return;
    const banner = document.createElement('div');
    banner.className = 'boiler-lock-banner';
    banner.id = 'boiler-lock-banner';
    banner.innerHTML = `
      <div class="boiler-lock-banner-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15h18"/><path d="M5 15V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9"/><path d="M8 15v4"/><path d="M16 15v4"/><path d="M9 8h.01"/><path d="M13 8h.01"/></svg>
      </div>
      <div class="boiler-lock-banner-text">
        <strong>Boiler type not selected</strong>
        <span>Select your boiler type to unlock uploads and tab switching.</span>
      </div>
      <button type="button" class="btn btn-primary" id="boiler-select-trigger">Select Boiler Type</button>
    `;
    container.insertBefore(banner, container.firstChild);
    document.getElementById('boiler-select-trigger').addEventListener('click', openModal);
  }

  function injectModalOnce() {
    if (document.getElementById('boilerSelectOverlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'boilerSelectOverlay';
    overlay.innerHTML = `
      <div class="modal boiler-select-modal">
        <div class="modal-header">
          <h3>Select Your Boiler Type</h3>
          <button class="modal-close" id="boilerSelectClose" aria-label="Close" type="button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="boiler-select-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15h18"/><path d="M5 15V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9"/><path d="M8 15v4"/><path d="M16 15v4"/><path d="M9 8h.01"/><path d="M13 8h.01"/></svg>
          </div>
          <div class="boiler-select-sub">This helps tailor the calculation to your plant</div>
          <div class="boiler-select-field">
            <label for="boilerTypeSelect">Boiler Type</label>
            <div class="select-wrap">
              <select id="boilerTypeSelect">
                <option value="PF Fired">PF Fired</option>
                <option value="AFBC">AFBC</option>
                <option value="Pulverized Coal">Pulverized Coal</option>
              </select>
            </div>
          </div>
          <button type="button" class="btn btn-primary" id="boilerSelectOk">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // pre-select the current value, if one was already chosen earlier
    const existing = getBoilerType();
    if (existing) {
      const sel = overlay.querySelector('#boilerTypeSelect');
      if ([...sel.options].some(o => o.value === existing)) sel.value = existing;
    }

    document.getElementById('boilerSelectClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.getElementById('boilerSelectOk').addEventListener('click', confirmSelection);
  }

  function openModal() {
    const overlay = document.getElementById('boilerSelectOverlay');
    if (overlay) overlay.classList.add('open');
  }

  function closeModal() {
    const overlay = document.getElementById('boilerSelectOverlay');
    if (overlay) overlay.classList.remove('open');
  }

  function confirmSelection() {
    const select = document.getElementById('boilerTypeSelect');
    const boilerType = select.value;
    sessionStorage.setItem('boilerType', boilerType);
    closeModal();
    applyLockState();
    if (typeof window.__renderBoilerBadge === 'function') {
      const oldBadge = document.getElementById('boiler-type-badge');
      if (oldBadge) oldBadge.remove();
      window.__renderBoilerBadge();
    }
  }

  function init() {
    if (!sessionStorage.getItem('loggedIn')) return; // login gate elsewhere already handles redirect
    injectStylesOnce();
    injectBannerOnce();
    injectModalOnce();
    applyLockState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();