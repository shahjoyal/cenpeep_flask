import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import pymongo

load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Secret used to SIGN login tokens (see security.py). Falls back to a
# randomly-generated key so the app still runs in local dev without an
# .env entry, but that means every server restart invalidates every
# logged-in session — set JWT_SECRET in .env (a long random string) for
# any real/shared deployment so restarts don't silently log everyone out,
# and so the signing key doesn't change every time the process restarts.
import secrets
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET') or secrets.token_hex(32)
if not os.getenv('JWT_SECRET'):
    print('⚠️  JWT_SECRET not set in .env — using a random one-time key '
          '(sessions will not survive a server restart). Set JWT_SECRET '
          'in .env for production.')
app.config['MAX_CONTENT_LENGTH'] = 250 * 1024 * 1024  # 250 MB (was 100MB — some real
                                                        # plant workbooks with many
                                                        # months of hourly tag data
                                                        # across several sheets can
                                                        # approach this size; raised
                                                        # again to comfortably clear
                                                        # ~150-200MB .xlsm exports
                                                        # without changing anything
                                                        # about how they're parsed —
                                                        # the chunked/streamed reader
                                                        # in routes/upload.py already
                                                        # handles files of this size
                                                        # at the same speed regardless
                                                        # of this ceiling)

# MongoDB connection
MONGO_URI = os.getenv('MONGODB_URI', '')
db = None
if MONGO_URI and '<username>' not in MONGO_URI:
    try:
        client = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
        client.server_info()
        db = client.get_default_database()
        print('✅ MongoDB connected')
        from pagerduty import resolve_db_connection_alert
        resolve_db_connection_alert()
    except Exception as e:
        print(f'❌ MongoDB connection failed: {e}')
        from pagerduty import alert_db_connection_failed
        alert_db_connection_failed()
else:
    print('⚠️  MONGODB_URI not set — sessions disabled')

app.config['DB'] = db

# One-time seed: create the default admin account IN THE DATABASE, hashed,
# the first time the app runs against an empty users collection. This
# replaces the old hardcoded `username === 'admin' && password ===
# 'admin123'` check that used to live in public/index.html — the
# credentials are unchanged (still admin / admin123) so nothing about how
# you log in changes, but the check now happens server-side against a
# hashed value in Mongo instead of being readable in the page source.
# CHANGE THIS PASSWORD after first login (see POST /api/auth/change-password)
# — leaving it as admin123 in a real deployment defeats the point of moving
# it into the database in the first place.
if db is not None:
    try:
        from security import hash_password
        if db.users.count_documents({}) == 0:
            db.users.insert_one({
                'username': 'admin',
                'passwordHash': hash_password('admin123'),
                'role': 'admin',
            })
            print("✅ Seeded default admin user (admin / admin123) — "
                  "change this password after first login.")
    except Exception as e:
        print(f'❌ Admin user seed failed: {e}')

# Register blueprints
from routes.auth import auth_bp
from routes.upload import upload_bp
from routes.sessions import sessions_bp
from routes.report import report_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(upload_bp, url_prefix='/api/upload')
app.register_blueprint(sessions_bp, url_prefix='/api/sessions')
app.register_blueprint(report_bp, url_prefix='/api/report')

# ── Transport security ────────────────────────────────────────────────────
# "Hashing" API responses so no one in between can read them isn't
# possible (hashes can't be turned back into the JSON the page needs) —
# what actually stops that is HTTPS/TLS on the connection itself. If
# you're deploying on Vercel (vercel.json is already in this repo), Vercel
# terminates HTTPS for you automatically and this is a no-op. If you're
# running this Flask app directly behind your own domain, set FORCE_HTTPS=1
# in .env once you have a TLS certificate in front of it.
@app.after_request
def add_security_headers(response):
    if os.getenv('FORCE_HTTPS') == '1':
        response.headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains'
    return response


# ── PagerDuty alerting on API failures ────────────────────────────────────
# Fires for ANY route that ends up returning a 5xx — whether that's a route
# catching its own exception and returning `{'ok': False, ...}, 500` (the
# pattern used throughout routes/*.py) or something genuinely unhandled
# (caught by the errorhandler right below, which exists specifically so
# this hook has a 5xx response to see instead of the request just failing
# without a response Flask can process here).
#
# Only `request.endpoint` — a fixed name from the route's own @app.route /
# @blueprint.route definition, e.g. "sessions.create_session" — is ever
# read. It cannot contain a filename, a request body, a query string, a
# database value, or an exception message; see pagerduty.py for the one
# place that actually builds the alert text. 4xx responses (bad login,
# not found, validation errors) are left alone — those are normal
# application behavior, not something worth paging someone for.
@app.after_request
def alert_on_api_failure(response):
    if response.status_code >= 500 and request.path.startswith('/api/'):
        from pagerduty import alert_api_failure
        alert_api_failure(request.endpoint)
    return response


# Safety net for exceptions that escape a route's own try/except (every
# route in routes/*.py already catches Exception itself, so in practice
# this only fires for a genuine bug outside those blocks) — without this,
# an unhandled exception wouldn't reach alert_on_api_failure above at all
# and, in production, would otherwise render Flask/Werkzeug's default
# error page (which is not JSON, and can include internal detail) back to
# the caller instead of the same generic shape every other route uses.
@app.errorhandler(Exception)
def handle_unexpected_error(e):
    return jsonify({'ok': False, 'error': 'Internal server error.'}), 500

@app.route('/api/test-pagerduty')
def test_pagerduty():
    return "Test error", 500
    
# ── Response payload encryption ───────────────────────────────────────────
# Wraps every JSON API response body as { enc: true, n, c } (AES-256-GCM),
# decrypted on the client in public/auth.js's Auth.authFetch(). See the long
# comment on RESPONSE_ENCRYPTION_KEY in security.py for exactly what this
# does and doesn't protect against — short version: it's on top of HTTPS,
# not instead of it.
#
# Two things are deliberately left unwrapped:
#   - /api/health and /api/auth/login: login is how the browser gets the
#     decryption key in the first place (see routes/auth.py), so it can't
#     itself be encrypted with that key — chicken/egg. /api/health is left
#     plain so uptime monitors and `curl` can read it without a session.
#   - 401 responses: these fire for requests with no/expired token, i.e.
#     exactly the case where the browser may not hold a key yet. The
#     client only needs the HTTP status code to know to redirect to
#     login, not the body, so there's nothing lost by leaving these plain.
_UNENCRYPTED_PATHS = {'/api/health', '/api/auth/login'}


@app.after_request
def encrypt_json_responses(response):
    if (request.path in _UNENCRYPTED_PATHS
            or response.status_code == 401
            or response.mimetype != 'application/json'):
        return response
    import json as _json
    from security import encrypt_response_payload
    try:
        payload = _json.loads(response.get_data(as_text=True))
    except ValueError:
        return response
    response.set_data(_json.dumps(encrypt_response_payload(payload)))
    return response


if os.getenv('FORCE_HTTPS') == '1':
    @app.before_request
    def redirect_to_https():
        from flask import redirect, request as _req
        if _req.headers.get('X-Forwarded-Proto', _req.scheme) != 'https':
            return redirect(_req.url.replace('http://', 'https://', 1), code=301)


# Health check
@app.route('/api/health')
def health():
    db_status = 'disconnected'
    if db is not None:
        try:
            db.command('ping')
            db_status = 'connected'
        except:
            db_status = 'disconnected'
    return {'ok': True, 'db': db_status}


@app.errorhandler(413)
def too_large(e):
    return {
        'ok': False,
        'error': f"File exceeds the {app.config['MAX_CONTENT_LENGTH'] // (1024*1024)}MB upload limit.",
    }, 413

# Serve static files from local public/
@app.route('/public/<path:filename>')
def public_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'public'), filename)

# SPA fallback
@app.route('/')
@app.route('/<path:path>')
def spa(path='index.html'):
    pub = os.path.join(app.root_path, 'public')
    if path and os.path.exists(os.path.join(pub, path)):
        return send_from_directory(pub, path)
    return send_from_directory(pub, 'index.html')


if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    print(f'🚀 CENPEEP Flask running at http://localhost:{port}')
    app.run(host='0.0.0.0', port=port, debug=True)