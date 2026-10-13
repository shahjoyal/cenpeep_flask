// auth.js — port of public/auth.js to an ES module (same sessionStorage keys,
// same AES-256-GCM response decryption, same Bearer-token fetch wrapper).
// The only change: "redirect to index.html" becomes "go to the login route".
const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
const ENC_KEY = 'authEncKey';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

// encKey: base64 AES-256 key the server hands back on login (see routes/auth.py)
export function setSession(token, user, encKey) {
  sessionStorage.setItem(TOKEN_KEY, token);
  if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  if (encKey) sessionStorage.setItem(ENC_KEY, encKey);
  sessionStorage.setItem('loggedIn', 'true');
}

export function getUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

let _cryptoKeyPromise = null;

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(ENC_KEY);
  sessionStorage.removeItem('loggedIn');
  _cryptoKeyPromise = null;
}

export function isLoggedIn() {
  return !!getToken();
}

function _b64ToBytes(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

function _getCryptoKey() {
  const b64 = sessionStorage.getItem(ENC_KEY);
  if (!b64) return null;
  if (!_cryptoKeyPromise) {
    _cryptoKeyPromise = crypto.subtle.importKey('raw', _b64ToBytes(b64), 'AES-GCM', false, ['decrypt']);
  }
  return _cryptoKeyPromise;
}

export async function decryptPayload(wrapped) {
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

// Where "index.html" used to be: the login route of the React app.
function goToLogin() {
  window.location.hash = '#/';
}

export function logout() {
  clearSession();
  sessionStorage.removeItem('boilerType');
  goToLogin();
}

// Drop-in replacement for fetch(): attaches the Bearer token, sends the user
// back to the login page on 401, and transparently decrypts encrypted JSON
// bodies so every `await res.json()` call site keeps working unchanged.
export async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    clearSession();
    goToLogin();
    throw new Error('Session expired — redirecting to login.');
  }
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
