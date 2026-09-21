// auth.js — shared login-token handling, loaded on every page (login page
// included). Replaces the old plain `sessionStorage['loggedIn'] = 'true'`
// flag with a real signed token issued by POST /api/auth/login, and gives
// every other script one place to call the API through (Auth.authFetch)
// so the token gets attached automatically instead of being copy-pasted
// into every fetch() call by hand.
(function () {
  const TOKEN_KEY = 'authToken';
  const USER_KEY = 'authUser';
  const ENC_KEY = 'authEncKey';

  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // encKey: base64 AES-256 key the server hands back on login (see
  // routes/auth.py) — every API response after login is encrypted with
  // it, so it's stashed alongside the token and used to transparently
  // decrypt response bodies in authFetch() below.
  function setSession(token, user, encKey) {
    sessionStorage.setItem(TOKEN_KEY, token);
    if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    if (encKey) sessionStorage.setItem(ENC_KEY, encKey);
    // Kept alongside the real token so any old inline guard script that
    // still checks the legacy 'loggedIn' flag keeps working during the
    // transition — every guard below has been updated to check the real
    // token instead, but this costs nothing to also set.
    sessionStorage.setItem('loggedIn', 'true');
  }

  function getUser() {
    try {
      return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function clearSession() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ENC_KEY);
    sessionStorage.removeItem('loggedIn');
    _cryptoKeyPromise = null;
  }

  function isLoggedIn() {
    return !!getToken();
  }

  // ── Response payload decryption ─────────────────────────────────────
  // Mirrors security.py's AES-256-GCM on the server. Every JSON response
  // (other than /api/health and /api/auth/login — see app.py) arrives as
  // { enc: true, n: <nonce b64>, c: <ciphertext b64> }; this decrypts it
  // back to the real payload using Web Crypto, which speaks the exact
  // same AES-GCM format natively (no extra library needed).
  let _cryptoKeyPromise = null;

  function _b64ToBytes(b64) {
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  }

  function _getCryptoKey() {
    const b64 = sessionStorage.getItem(ENC_KEY);
    if (!b64) return null;
    if (!_cryptoKeyPromise) {
      _cryptoKeyPromise = crypto.subtle.importKey(
        'raw', _b64ToBytes(b64), 'AES-GCM', false, ['decrypt']
      );
    }
    return _cryptoKeyPromise;
  }

  async function decryptPayload(wrapped) {
    const keyPromise = _getCryptoKey();
    if (!keyPromise) {
      throw new Error('No decryption key in this session — please log in again.');
    }
    const key = await keyPromise;
    const plainBuf = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: _b64ToBytes(wrapped.n) },
      key,
      _b64ToBytes(wrapped.c)
    );
    return JSON.parse(new TextDecoder().decode(plainBuf));
  }

  // Call at the very top of every protected page — same job the old
  // `if (!sessionStorage.getItem('loggedIn')) window.location.href =
  // 'index.html';` guard used to do, just checking the real token now.
  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = 'index.html';
    }
  }

  function logout() {
    clearSession();
    sessionStorage.removeItem('boilerType');
    window.location.href = 'index.html';
  }

  // Drop-in replacement for fetch(): attaches "Authorization: Bearer
  // <token>" automatically, and sends the user back to the login page if
  // the server says the session is missing/expired/invalid (401) instead
  // of letting every caller handle that separately.
  async function authFetch(url, options = {}) {
    const token = getToken();
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      clearSession();
      window.location.href = 'index.html';
      throw new Error('Session expired — redirecting to login.');
    }
    // Transparently decrypt an encrypted JSON body so every existing
    // `const data = await res.json()` call site keeps working unchanged —
    // callers never need to know the response was wrapped in the first
    // place.
    const originalJson = res.json.bind(res);
    res.json = async function () {
      const body = await originalJson();
      if (body && body.enc === true && typeof body.n === 'string' && typeof body.c === 'string') {
        return decryptPayload(body);
      }
      return body;
    };
    return res;
  }

  window.Auth = {
    getToken, setSession, getUser, clearSession, isLoggedIn,
    requireAuth, logout, authFetch, decryptPayload,
  };
})();
