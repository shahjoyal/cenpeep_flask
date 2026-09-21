from flask import Blueprint, current_app, g, jsonify, request

from security import (
    admin_required,
    hash_password,
    issue_token,
    login_required,
    response_encryption_key_b64,
    verify_password,
)

auth_bp = Blueprint('auth', __name__)


def get_db():
    return current_app.config.get('DB')


def serialize_user(user):
    """Never include passwordHash in anything returned to the client."""
    return {
        'id': str(user['_id']),
        'username': user['username'],
        'role': user.get('role', 'user'),
    }


# POST /api/auth/login — { username, password } -> { ok, token, user }
@auth_bp.route('/login', methods=['POST'])
def login():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503

    body = request.get_json(force=True, silent=True) or {}
    username = (body.get('username') or '').strip()
    password = body.get('password') or ''
    if not username or not password:
        return jsonify({'ok': False, 'error': 'Username and password are required.'}), 400

    try:
        user = db.users.find_one({'username': username})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500

    # Same error for "no such user" and "wrong password" — don't let the
    # response tell an attacker which one they got wrong.
    if not user or not verify_password(password, user.get('passwordHash', '')):
        return jsonify({'ok': False, 'error': 'Invalid username or password.'}), 401

    token = issue_token(user)
    # encKey: the AES-256 key (base64) the client uses to decrypt every
    # later API response body (see app.py's encrypt_json_responses and
    # public/auth.js). Only the login response itself is sent unencrypted —
    # it's the one response that has to be, since it's what delivers this
    # key in the first place.
    return jsonify({
        'ok': True,
        'token': token,
        'user': serialize_user(user),
        'encKey': response_encryption_key_b64(),
    })


# GET /api/auth/me — whoever the current token belongs to
@auth_bp.route('/me', methods=['GET'])
@login_required
def me():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        from bson import ObjectId
        user = db.users.find_one({'_id': ObjectId(g.current_user['sub'])})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500
    if not user:
        return jsonify({'ok': False, 'error': 'User no longer exists.'}), 404
    return jsonify({'ok': True, 'user': serialize_user(user)})


# POST /api/auth/users — create a new user. Admin-only, so the very first
# admin (seeded on startup — see app.py) is the only way to bootstrap more
# accounts; nobody can self-register.
# body: { username, password, role? } — role defaults to "user"
@auth_bp.route('/users', methods=['POST'])
@admin_required
def create_user():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503

    body = request.get_json(force=True, silent=True) or {}
    username = (body.get('username') or '').strip()
    password = body.get('password') or ''
    role = body.get('role') or 'user'
    if role not in ('user', 'admin'):
        return jsonify({'ok': False, 'error': "role must be 'user' or 'admin'."}), 400
    if not username or not password:
        return jsonify({'ok': False, 'error': 'Username and password are required.'}), 400
    if len(password) < 8:
        return jsonify({'ok': False, 'error': 'Password must be at least 8 characters.'}), 400

    try:
        if db.users.find_one({'username': username}):
            return jsonify({'ok': False, 'error': 'That username is already taken.'}), 409
        doc = {
            'username': username,
            'passwordHash': hash_password(password),
            'role': role,
        }
        result = db.users.insert_one(doc)
        doc['_id'] = result.inserted_id
        return jsonify({'ok': True, 'user': serialize_user(doc)}), 201
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# GET /api/auth/users — list users (admin-only; no password hashes returned)
@auth_bp.route('/users', methods=['GET'])
@admin_required
def list_users():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        users = list(db.users.find())
        return jsonify({'ok': True, 'users': [serialize_user(u) for u in users]})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# DELETE /api/auth/users/<id> — remove a user (admin-only)
@auth_bp.route('/users/<user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    if user_id == g.current_user['sub']:
        return jsonify({'ok': False, 'error': "You can't delete your own account while logged in as it."}), 400
    try:
        from bson import ObjectId
        db.users.delete_one({'_id': ObjectId(user_id)})
        return jsonify({'ok': True})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# POST /api/auth/change-password — the logged-in user changes their OWN
# password. Doesn't require the admin role — anyone can rotate their own
# credential, they just need to prove they know the current one.
@auth_bp.route('/change-password', methods=['POST'])
@login_required
def change_password():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503

    body = request.get_json(force=True, silent=True) or {}
    current_password = body.get('currentPassword') or ''
    new_password = body.get('newPassword') or ''
    if len(new_password) < 8:
        return jsonify({'ok': False, 'error': 'New password must be at least 8 characters.'}), 400

    try:
        from bson import ObjectId
        user = db.users.find_one({'_id': ObjectId(g.current_user['sub'])})
        if not user or not verify_password(current_password, user.get('passwordHash', '')):
            return jsonify({'ok': False, 'error': 'Current password is incorrect.'}), 401
        db.users.update_one(
            {'_id': user['_id']},
            {'$set': {'passwordHash': hash_password(new_password)}},
        )
        return jsonify({'ok': True})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500
