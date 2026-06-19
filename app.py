import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pymongo

load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# Allow bigger uploads; default 50 MB, override with MAX_UPLOAD_MB.
MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "50"))
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_MB * 1024 * 1024

# MongoDB connection
MONGO_URI = os.getenv("MONGODB_URI", "")
db = None

if MONGO_URI and "<username>" not in MONGO_URI:
    try:
        client = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
        client.server_info()
        db = client.get_default_database()
        print("✅ MongoDB connected")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
else:
    print("⚠️  MONGODB_URI not set — sessions disabled")

app.config["DB"] = db

# Register blueprints
from routes.upload import upload_bp
from routes.sessions import sessions_bp

app.register_blueprint(upload_bp, url_prefix="/api/upload")
app.register_blueprint(sessions_bp, url_prefix="/api/sessions")


# Health check
@app.route("/api/health")
def health():
    db_status = "disconnected"
    if db is not None:
        try:
            db.command("ping")
            db_status = "connected"
        except Exception:
            db_status = "disconnected"

    return jsonify({
        "ok": True,
        "db": db_status,
        "maxUploadMB": MAX_UPLOAD_MB
    })


# Quick ping route for Vercel debugging
@app.route("/ping")
def ping():
    return jsonify({
        "ok": True,
        "cwd": os.getcwd(),
        "root": app.root_path
    })


# Serve static files from local public/
@app.route("/public/<path:filename>")
def public_files(filename):
    pub = os.path.join(app.root_path, "public")
    file_path = os.path.join(pub, filename)

    if os.path.isfile(file_path):
        return send_from_directory(pub, filename)

    return jsonify({
        "ok": False,
        "error": "File not found in public folder",
        "requested": filename
    }), 404


# SPA fallback
@app.route("/")
@app.route("/<path:path>")
def spa(path="index.html"):
    pub = os.path.join(app.root_path, "public")
    requested_file = os.path.join(pub, path)
    index_file = os.path.join(pub, "index.html")

    if os.path.isfile(requested_file):
        return send_from_directory(pub, path)

    if os.path.isfile(index_file):
        return send_from_directory(pub, "index.html")

    return jsonify({
        "ok": False,
        "error": "public/index.html not found",
        "root": app.root_path,
        "public": pub
    }), 404


if __name__ == "__main__":
    port = int(os.getenv("PORT", 3000))
    print(f"🚀 CENPEEP Flask running at http://localhost:{port}")
    app.run(
        host="0.0.0.0",
        port=port,
        debug=os.getenv("FLASK_ENV") != "production"
    )