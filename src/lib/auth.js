// auth.js — session storage + the fetch wrappers used for every API call.
//
// Request/response encryption mirrors the Node encryption.utils.js (and the
// Flask security.py): AES-256-CBC, JSON plaintext, hex ciphertext, wrapped as
// { encryptedData: "<hex>" } in both directions.
//   - JSON request bodies are encrypted automatically by authFetch/publicFetch.
//   - Every JSON response is decrypted transparently inside res.json().
//   - FormData bodies (file uploads) are sent as-is; their responses are
//     still decrypted.
// Key/IV default to the same values as the Node reference file; override them
// with VITE_API_SECRET_KEY / VITE_API_IV at build time (they must match the
// server's API_SECRET_KEY / API_IV).
const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

const API_KEY = import.meta.env.VITE_API_SECRET_KEY || 'qwertyuiopasdfghjklzxcvbnm123456';
const API_IV = import.meta.env.VITE_API_IV || '1234567890123456';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setSession(token, user) {
  sessionStorage.setItem(TOKEN_KEY, token);
  if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  sessionStorage.setItem('loggedIn', 'true');
}

export function getUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem('loggedIn');
}

export function isLoggedIn() {
  return !!getToken();
}

const _enc = new TextEncoder();
const _dec = new TextDecoder();
let _cryptoKeyPromise = null;

function _getCryptoKey() {
  if (!_cryptoKeyPromise) {
    _cryptoKeyPromise = crypto.subtle.importKey(
      'raw', _enc.encode(API_KEY), { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']
    );
  }
  return _cryptoKeyPromise;
}

function _toHex(buf) {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

function _fromHex(hex) {
  if (hex.length % 2) throw new Error('Invalid encrypted payload.');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

// Node: encryptData(data) -> hex
export async function encryptData(data) {
  const key = await _getCryptoKey();
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: _enc.encode(API_IV) },
    key,
    _enc.encode(JSON.stringify(data))
  );
  return _toHex(cipher);
}

// Node: decryptData(hex) -> parsed JSON
export async function decryptData(encryptedHex) {
  const key = await _getCryptoKey();
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: _enc.encode(API_IV) },
    key,
    _fromHex(encryptedHex)
  );
  return JSON.parse(_dec.decode(plain));
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

async function secureFetch(url, options, authenticated) {
  const headers = new Headers(options.headers || {});
  let body = options.body;

  // Encrypt JSON request bodies into { encryptedData: "<hex>" }.
  if (typeof body === 'string' && (headers.get('Content-Type') || '').includes('application/json')) {
    body = JSON.stringify({ encryptedData: await encryptData(JSON.parse(body)) });
  }

  if (authenticated) {
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers, body });

  if (authenticated && res.status === 401) {
    clearSession();
    goToLogin();
    throw new Error('Session expired — redirecting to login.');
  }

  // Transparently decrypt { encryptedData } bodies so every
  // `await res.json()` call site keeps working unchanged.
  const originalJson = res.json.bind(res);
  res.json = async function () {
    const parsed = await originalJson();
    if (parsed && typeof parsed.encryptedData === 'string') {
      return decryptData(parsed.encryptedData);
    }
    return parsed;
  };
  return res;
}

// For logged-in calls: attaches the Bearer token and sends the user back to
// the login page on 401.
export function authFetch(url, options = {}) {
  return secureFetch(url, options, true);
}

// For calls made before a session exists (login): same encryption, but no
// token and no redirect on 401 (a wrong password is a normal 401).
export function publicFetch(url, options = {}) {
  return secureFetch(url, options, false);
}
