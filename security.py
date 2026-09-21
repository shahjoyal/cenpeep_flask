"""
security.py — password hashing + token auth for CENPEEP
================================================================================
Everything the app needs to stop shipping the "admin"/"admin123" login as a
hardcoded check in the browser and move it to a real, hashed, database-backed
user store, plus a decorator to require a valid login on the API routes that
actually touch data (uploads, saved sessions, reports).

What this deliberately does NOT do: "hash the API response/payload" as
literally asked. Hashing is one-way — you cannot turn a hash back into the
JSON the frontend needs to render, so it can't be used to protect a payload
that has to be read on the other end. The two things that actually stop
"someone else getting the data" are covered instead:
  1. Every data-bearing route now requires a valid signed token (see
     @login_required below) — without logging in, the API returns 401 and
     you get no data, hashed or not.
  2. Transport encryption (HTTPS/TLS) is what stops anyone *in between* the
     browser and the server from reading the traffic. That's enforced in
     app.py (HSTS header + optional HTTP->HTTPS redirect), not here — it's
     a transport-layer concern, not something a training-data-style file
     can add on its own. If you're deploying on Vercel (there's a
     vercel.json in this repo), Vercel already terminates HTTPS for you.

Password hashing: werkzeug.security's generate_password_hash/
check_password_hash (already a transitive Flask dependency, so no new
package needed) — PBKDF2-SHA256 with a random per-password salt by default.
Never store or compare plaintext passwords anywhere past the login request.

Tokens: a signed JWT (PyJWT) carrying {user_id, username, role, exp}. Signed
with SECRET_KEY (see app.py / .env) so it can't be forged or edited by the
client — stealing the token string itself is the only way to impersonate a
session, same as any bearer-token API.
"""

from __future__ import annotations

import base64
import json
import os
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from flask import current_app, g, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

TOKEN_EXPIRY_HOURS = int(os.getenv("TOKEN_EXPIRY_HOURS", "12"))


# ── Password hashing ─────────────────────────────────────────────────────────
def hash_password(plain_password: str) -> str:
    """One-way hash for storage. Never store plain_password itself anywhere."""
    return generate_password_hash(plain_password, method="pbkdf2:sha256")


def verify_password(plain_password: str, password_hash: str) -> bool:
    return check_password_hash(password_hash, plain_password)


# ── JWT issue / verify ───────────────────────────────────────────────────────
def _secret_key() -> str:
    key = current_app.config.get("SECRET_KEY")
    if not key:
        raise RuntimeError(
            "SECRET_KEY is not set — set the JWT_SECRET environment variable "
            "(see .env). Tokens cannot be safely issued without it."
        )
    return key


def issue_token(user: dict) -> str:
    """Build a signed JWT for a user document from the users collection."""
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user["_id"]),
        "username": user["username"],
        "role": user.get("role", "user"),
        "iat": now,
        "exp": now + timedelta(hours=TOKEN_EXPIRY_HOURS),
    }
    return jwt.encode(payload, _secret_key(), algorithm="HS256")


def decode_token(token: str) -> dict:
    """Raises jwt.PyJWTError (expired/invalid/malformed) on any problem —
    callers should catch and turn that into a 401, never a 500."""
    return jwt.decode(token, _secret_key(), algorithms=["HS256"])


def _extract_token() -> str | None:
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        return auth_header[len("Bearer "):].strip()
    return None


# ── Route protection ─────────────────────────────────────────────────────────
def login_required(fn):
    """Require a valid, unexpired Bearer token. On success, stashes the
    decoded claims on flask.g.current_user for the route to use if it wants
    (e.g. to scope data by user later); on failure, returns 401 with no
    route-specific data leaked in the error body."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        token = _extract_token()
        if not token:
            return jsonify({"ok": False, "error": "Authentication required."}), 401
        try:
            claims = decode_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({"ok": False, "error": "Session expired, please log in again."}), 401
        except jwt.PyJWTError:
            return jsonify({"ok": False, "error": "Invalid or tampered session token."}), 401
        g.current_user = claims
        return fn(*args, **kwargs)
    return wrapper


def admin_required(fn):
    """Like login_required, but also requires role == 'admin' — used for
    user-management endpoints (creating other users). login_required must
    run FIRST (to populate g.current_user), so it wraps the outside."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if g.current_user.get("role") != "admin":
            return jsonify({"ok": False, "error": "Admin privileges required."}), 403
        return fn(*args, **kwargs)
    return login_required(wrapper)


# ── Encryption at rest / in the response body ────────────────────────────────
# Two SEPARATE keys, on purpose:
#
#   DB_ENCRYPTION_KEY       — never leaves the server. Encrypts the sensitive
#                              fields of a saved session (inputs/results/etc)
#                              before they're written to MongoDB, so a copy of
#                              the database on its own (a leaked backup, an
#                              over-permissioned DB user, a misconfigured
#                              Atlas project) doesn't hand over plant data in
#                              the clear. Decrypted only when a logged-in user
#                              actually reads a session back.
#
#   RESPONSE_ENCRYPTION_KEY — handed to the browser once, at login (see
#                              routes/auth.py), so the client can decrypt the
#                              body of every later API response. This is an
#                              EXTRA layer on top of HTTPS, not a replacement
#                              for it — HTTPS/TLS is still what stops someone
#                              on the network from reading the traffic AT ALL
#                              (including the encrypted envelope's headers,
#                              timing, the fact a request happened). What this
#                              layer buys you specifically: a response body
#                              that ends up somewhere HTTPS doesn't cover —
#                              an access log, an intermediate proxy, a
#                              browser extension reading page traffic — is
#                              still unreadable without the key. It is NOT
#                              protection against someone who can read the
#                              login response too (they get the key right
#                              there), so it isn't a defense against a full
#                              man-in-the-middle — only TLS is. Keeping it
#                              split from DB_ENCRYPTION_KEY means a leaked
#                              browser-side key never exposes the database.
#
# Both are 32-byte (AES-256) keys, base64-encoded in .env. Generate one with:
#   python -c "import base64, os; print(base64.b64encode(os.urandom(32)).decode())"
# Falls back to a random one-time key (like JWT_SECRET in app.py) so the app
# still runs without .env entries, but that means already-encrypted DB
# fields become unreadable and existing sessions get logged out on every
# restart — set both in .env for any real/shared deployment.

_db_key: bytes | None = None
_response_key: bytes | None = None


def _load_key(env_name: str, purpose: str) -> bytes:
    raw = os.getenv(env_name)
    if raw:
        try:
            key = base64.b64decode(raw)
        except Exception as e:
            raise RuntimeError(f"{env_name} in .env is not valid base64: {e}") from e
        if len(key) != 32:
            raise RuntimeError(
                f"{env_name} must decode to exactly 32 bytes for AES-256 "
                f"(got {len(key)}). Generate one with: python -c \"import "
                f"base64, os; print(base64.b64encode(os.urandom(32)).decode())\""
            )
        return key
    key = AESGCM.generate_key(bit_length=256)
    print(
        f"⚠️  {env_name} not set in .env — using a random one-time key "
        f"({purpose} won't survive a server restart, and won't match across "
        f"multiple server instances). Set {env_name}=<base64> in .env for "
        f"production. Generate one with: python -c \"import base64, os; "
        f"print(base64.b64encode(os.urandom(32)).decode())\""
    )
    return key


def db_encryption_key() -> bytes:
    global _db_key
    if _db_key is None:
        _db_key = _load_key("DB_ENCRYPTION_KEY", "encrypted session fields in MongoDB")
    return _db_key


def response_encryption_key() -> bytes:
    global _response_key
    if _response_key is None:
        _response_key = _load_key("RESPONSE_ENCRYPTION_KEY", "encrypted API responses")
    return _response_key


def response_encryption_key_b64() -> str:
    """Base64 form handed to the client at login (see routes/auth.py) so
    the browser can decrypt subsequent responses with Web Crypto."""
    return base64.b64encode(response_encryption_key()).decode()


def _aes_encrypt(plaintext: bytes, key: bytes) -> tuple[str, str]:
    """Returns (nonce_b64, ciphertext_b64). A fresh random nonce every call —
    AES-GCM is only safe if a nonce is never reused with the same key."""
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    ct = aesgcm.encrypt(nonce, plaintext, None)
    return base64.b64encode(nonce).decode(), base64.b64encode(ct).decode()


def _aes_decrypt(nonce_b64: str, ct_b64: str, key: bytes) -> bytes:
    aesgcm = AESGCM(key)
    nonce = base64.b64decode(nonce_b64)
    ct = base64.b64decode(ct_b64)
    return aesgcm.decrypt(nonce, ct, None)


# ── DB field encryption (data at rest) ───────────────────────────────────────
def encrypt_for_db(value) -> dict:
    """Encrypt any JSON-serializable value for storage in Mongo. Store the
    returned dict in place of the plaintext field — it's self-describing
    (__enc marker) so decrypt_from_db() and old plaintext documents can
    coexist in the same collection during a rollout."""
    plaintext = json.dumps(value).encode("utf-8")
    nonce_b64, ct_b64 = _aes_encrypt(plaintext, db_encryption_key())
    return {"__enc": True, "n": nonce_b64, "c": ct_b64}


def decrypt_from_db(value):
    """Inverse of encrypt_for_db(). Returns the value unchanged if it isn't
    one of our markers, so documents saved before encryption was added
    still load instead of raising."""
    if not (isinstance(value, dict) and value.get("__enc")):
        return value
    plaintext = _aes_decrypt(value["n"], value["c"], db_encryption_key())
    return json.loads(plaintext)


# ── API response payload encryption ──────────────────────────────────────────
def encrypt_response_payload(payload: dict) -> dict:
    plaintext = json.dumps(payload).encode("utf-8")
    nonce_b64, ct_b64 = _aes_encrypt(plaintext, response_encryption_key())
    return {"enc": True, "n": nonce_b64, "c": ct_b64}
