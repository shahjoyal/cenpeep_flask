from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from datetime import datetime

sessions_bp = Blueprint('sessions', __name__)


def get_db():
    return current_app.config.get('DB')


def serialize(doc):
    """Convert MongoDB doc to JSON-safe dict."""
    doc['_id'] = str(doc['_id'])
    if isinstance(doc.get('uploadedAt'), datetime):
        doc['uploadedAt'] = doc['uploadedAt'].isoformat()
    return doc


# GET /api/sessions — all sessions, newest first
@sessions_bp.route('/', methods=['GET'])
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
def create_session():
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        body = request.get_json(force=True)
        doc = {
            'sessionName': body.get('sessionName', ''),
            'sourceFile':  body.get('sourceFile', 'Manual Entry'),
            'inputs':      body.get('inputs', []),
            'results':     body.get('results', {}),
            'uploadedAt':  datetime.utcnow(),
        }
        result = db.sessions.insert_one(doc)
        doc['_id'] = str(result.inserted_id)
        doc['uploadedAt'] = doc['uploadedAt'].isoformat()
        return jsonify({'ok': True, 'session': doc})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# DELETE /api/sessions/<id>
@sessions_bp.route('/<session_id>', methods=['DELETE'])
def delete_session(session_id):
    db = get_db()
    if db is None:
        return jsonify({'ok': False, 'error': 'Database not connected'}), 503
    try:
        db.sessions.delete_one({'_id': ObjectId(session_id)})
        return jsonify({'ok': True})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500
