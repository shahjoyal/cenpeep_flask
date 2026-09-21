from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from datetime import datetime

from security import login_required, encrypt_for_db, decrypt_from_db

sessions_bp = Blueprint('sessions', __name__)

# Fields encrypted at rest before being written to db.sessions — the plant
# operating data itself (inputs/results) plus the free-text name/source,
# which can be identifying. boilerType and uploadedAt are left plain since
# the app sorts/filters on them (uploadedAt) or they're not sensitive on
# their own (boilerType).
_ENCRYPTED_FIELDS = ('sessionName', 'sourceFile', 'inputs', 'results')


def get_db():
    return current_app.config.get('DB')


def serialize(doc):
    """Convert a MongoDB doc to a JSON-safe dict, decrypting any encrypted
    fields back to plaintext for the (authenticated) caller."""
    doc['_id'] = str(doc['_id'])
    if isinstance(doc.get('uploadedAt'), datetime):
        doc['uploadedAt'] = doc['uploadedAt'].isoformat()
    for field in _ENCRYPTED_FIELDS:
        if field in doc:
            doc[field] = decrypt_from_db(doc[field])
    return doc


# GET /api/sessions — all sessions, newest first
@sessions_bp.route('/', methods=['GET'])
@login_required
def list_sessions():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        sessions = list(db.sessions.find().sort('uploadedAt', -1))
        return jsonify({'ok': True, 'sessions': [serialize(s) for s in sessions]})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# GET /api/sessions/<id>
@sessions_bp.route('/<session_id>', methods=['GET'])
@login_required
def get_session(session_id):
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        session = db.sessions.find_one({'_id': ObjectId(session_id)})
        if not session:
            return jsonify({'ok': False, 'error': 'Not found'}), 404
        return jsonify({'ok': True, 'session': serialize(session)})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# POST /api/sessions — save a new session
@sessions_bp.route('/', methods=['POST'])
@login_required
def create_session():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        body = request.get_json(force=True)
        plain = {
            'sessionName': body.get('sessionName', ''),
            'sourceFile':  body.get('sourceFile', 'Manual Entry'),
            'boilerType':  body.get('boilerType', ''),
            'inputs':      body.get('inputs', []),
            'results':     body.get('results', {}),
            'uploadedAt':  datetime.utcnow(),
        }
        # Encrypt the sensitive fields for storage; keep boilerType/
        # uploadedAt plain in the doc we write to Mongo.
        doc = dict(plain)
        for field in _ENCRYPTED_FIELDS:
            doc[field] = encrypt_for_db(plain[field])
        result = db.sessions.insert_one(doc)

        # Echo back the plaintext version (this response body itself is
        # encrypted in transit by app.py's encrypt_json_responses).
        plain['_id'] = str(result.inserted_id)
        plain['uploadedAt'] = plain['uploadedAt'].isoformat()
        return jsonify({'ok': True, 'session': plain})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# DELETE /api/sessions/<id>
@sessions_bp.route('/<session_id>', methods=['DELETE'])
@login_required
def delete_session(session_id):
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        db.sessions.delete_one({'_id': ObjectId(session_id)})
        return jsonify({'ok': True})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500