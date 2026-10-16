"""End-to-end through the real Flask app (no MongoDB needed): python tests/e2e_upload.py"""
import os, sys, json, warnings
warnings.filterwarnings("ignore")
os.environ.setdefault('JWT_SECRET', 'testsecret')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); sys.path.insert(0, ROOT)
import app as appmod, security
with appmod.app.app_context():
    tok = security.issue_token({'_id': '1', 'username': 't', 'role': 'admin'})
tok = tok[0] if isinstance(tok, tuple) else tok
c = appmod.app.test_client(); H = {'Authorization': 'Bearer ' + tok}
def dec(r):
    b = json.loads(r.get_data(as_text=True)); d = security.decrypt_data(b['encryptedData'])
    return json.loads(d) if isinstance(d, str) else d
r = c.post('/api/upload/', data={'file': (open(os.path.join(ROOT, 'tests', 'IS-13890.xlsx'), 'rb'), 'IS-13890.xlsx')},
           headers=H, content_type='multipart/form-data')
d = dec(r)
assert r.status_code == 200 and d['ok']
assert len(d['extractedIS13890']) == 19 and not d['missingFieldsIS13890'], d['missingFieldsIS13890']
assert 'extractedBS2885' in d and 'extracted' in d          # other detectors still respond
print('upload ok  | IS-13890 fields:', len(d['extractedIS13890']), '| sheet:', d['sheetNameIS13890'])
# NOTE: POST /api/upload/retrain is deliberately not exercised here — it re-saves ml/field_classifier.pkl.
