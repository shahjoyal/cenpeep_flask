"""
field_classifier.py — Basic ML model for CENPEEP field detection
==================================================================
A lightweight, trainable text-classification model that maps arbitrary
spreadsheet column headers (e.g. "Main Steam Flow", "MS TEMP boiler outlet",
"O2 at APH I/L Left") to CENPEEP field ids (Ffw, Tgo, O2in, ...).

Approach: TF-IDF vectorization over character n-grams + word n-grams, then
cosine similarity against a labeled training set. This is intentionally
"basic" per the user's request — no heavy ML framework, no GPU, trains in
under a second, and is easy to extend by just adding rows to
ml/training_data.py.

Why char n-grams matter here: real plant headers are inconsistent
("MAIN STM TEMP-L" vs "Main Steam Flow" vs "MS TEMP (left) boiler outlet")
with abbreviations, typos, merged words, and unit suffixes. Character
n-grams give partial-match credit for shared substrings even when word
tokenization would treat two headers as completely disjoint.

The model returns a confidence score (cosine similarity, 0-1) for every
prediction, so the caller can apply a threshold and skip low-confidence
guesses rather than mislabeling a column.
"""

from __future__ import annotations

import hashlib
import os
import pickle
import re
import tempfile

import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .training_data import get_training_data, is_non_field_header
from . import training_data_is13890 as _is13890_data


def _is_vercel() -> bool:
    return os.getenv("VERCEL", "").lower() in {"1", "true", "yes"}


MODULE_DIR = os.path.dirname(__file__)
LOCAL_MODEL_PATH = os.path.join(MODULE_DIR, "field_classifier.pkl")
RUNTIME_MODEL_PATH = os.path.join(tempfile.gettempdir(), "field_classifier.pkl")

# On Vercel, /var/task is read-only, so never write there.
# Use /tmp instead. Locally, keep the model next to this file.
DEFAULT_MODEL_PATH = RUNTIME_MODEL_PATH if _is_vercel() else LOCAL_MODEL_PATH

# Below this cosine-similarity score, a prediction is considered "no match"
# rather than forced onto the nearest label. Tunable as training data grows.
DEFAULT_CONFIDENCE_THRESHOLD = 0.45


def _normalize(text):
    """Light cleanup: lowercase, strip punctuation/numbers-only noise, collapse whitespace."""
    text = str(text)
    text = re.sub(r"[\(\)\[\]/\\\-_,.:;]+", " ", text)
    # Split a letter directly glued to a digit ("Temp2" -> "Temp 2"). Real
    # plant headers are inconsistent about this ("Temp 1" vs "Temp2" for
    # sibling probes on the same reading), and without the split the glued
    # variant loses word-boundary alignment with the spaced training
    # examples and can drift toward an unrelated label.
    text = re.sub(r"(?<=[A-Za-z])(?=\d)", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


class FieldClassifier:
    """
    Trainable TF-IDF + cosine-similarity classifier.

    Usage:
        clf = FieldClassifier()
        clf.train()                          # train from ml/training_data.py
        clf.save()                           # persist to disk
        clf = FieldClassifier.load()         # reload later (fast path)
        field_id, score = clf.predict("Main Steam Flow")
    """

    # Subclasses (see IS13890FieldClassifier) override these four hooks to use
    # their own training set / exclusion list / model file. The defaults below
    # are exactly the original CENPEEP/BEE behaviour.
    MODEL_FILENAME = "field_classifier.pkl"

    def _get_data(self):
        return get_training_data()

    def _is_non_field(self, text):
        return is_non_field_header(text)

    def _prenormalize(self, text):
        return text

    def _data_hash(self):
        """Fingerprint of the training set — lets load() notice a stale .pkl."""
        texts, labels = self._get_data()
        h = hashlib.sha1()
        for t, l in zip(texts, labels):
            h.update(f"{t}\x1f{l}\x1e".encode("utf-8", "ignore"))
        return h.hexdigest()

    @classmethod
    def _local_path(cls):
        return os.path.join(MODULE_DIR, cls.MODEL_FILENAME)

    @classmethod
    def _default_path(cls):
        if _is_vercel():
            return os.path.join(tempfile.gettempdir(), cls.MODEL_FILENAME)
        return cls._local_path()

    def __init__(self):
        self.vectorizer = None
        self.train_vectors = None
        self.train_labels = None
        self.train_texts = None
        self.data_hash = None

    # ── Training ────────────────────────────────────────────────────────────
    def train(self, texts=None, labels=None):
        if texts is None or labels is None:
            texts, labels = self._get_data()

        normalized = [_normalize(self._prenormalize(t)) for t in texts]

        # Combine word unigrams/bigrams with char n-grams (3-5) for robustness
        # against abbreviations and merged/garbled plant-tag naming.
        self.vectorizer = TfidfVectorizer(
            analyzer="char_wb",
            ngram_range=(3, 5),
            sublinear_tf=True,
            min_df=1,
        )
        self.train_vectors = self.vectorizer.fit_transform(normalized)
        self.train_labels = list(labels)
        self.train_texts = list(texts)
        self.data_hash = self._data_hash()
        return self

    # ── Persistence ─────────────────────────────────────────────────────────
    def save(self, path=None):
        """
        Save model state.

        On Vercel, defaults to /tmp/field_classifier.pkl.
        Locally, defaults to ml/field_classifier.pkl.
        """
        target_path = path or self._default_path()
        target_dir = os.path.dirname(target_path)
        if target_dir:
            os.makedirs(target_dir, exist_ok=True)

        with open(target_path, "wb") as f:
            pickle.dump(
                {
                    "vectorizer": self.vectorizer,
                    "train_vectors": self.train_vectors,
                    "train_labels": self.train_labels,
                    "train_texts": self.train_texts,
                    "data_hash": self.data_hash,
                    "sklearn_version": sklearn.__version__,
                },
                f,
            )

    @classmethod
    def load(cls, path=None):
        """
        Load a previously saved model if present and still matching the
        current training data; otherwise train a fresh one.
        (A missing/unreadable/stale .pkl is never fatal.)
        """
        clf = cls()
        target_path = path or cls._default_path()

        # Prefer the requested path, then fall back to the local repo path
        # if we're running somewhere other than Vercel.
        candidates = [target_path]
        if not _is_vercel() and target_path != cls._local_path():
            candidates.append(cls._local_path())

        loaded = False
        for candidate in candidates:
            if not os.path.exists(candidate):
                continue
            try:
                with open(candidate, "rb") as f:
                    state = pickle.load(f)
                clf.vectorizer = state["vectorizer"]
                clf.train_vectors = state["train_vectors"]
                clf.train_labels = state["train_labels"]
                clf.train_texts = state["train_texts"]
                clf.data_hash = state.get("data_hash")
                saved_ver = state.get("sklearn_version")
            except Exception:
                continue          # corrupt / incompatible pickle -> retrain below
            # Older pickles carry no hash -> trusted as-is (original behaviour).
            # A pickle WITH a hash is only reused while the training data is unchanged.
            if clf.data_hash is not None and clf.data_hash != clf._data_hash():
                continue
            # Same for a pickle written by a different scikit-learn than the one
            # running now: retraining takes ~1 s, an incompatible unpickle can misbehave.
            if saved_ver is not None and saved_ver != sklearn.__version__:
                continue
            loaded = True
            break

        if not loaded:
            clf = cls()
            clf.train()
            # Only persist if possible. On Vercel, write to /tmp, not /var/task.
            try:
                clf.save(target_path)
            except OSError:
                pass

        return clf

    # ── Inference ───────────────────────────────────────────────────────────
    def predict(self, text, threshold=DEFAULT_CONFIDENCE_THRESHOLD):
        """
        Predict the CENPEEP field id for a single header string.
        Returns (field_id_or_None, confidence_score, matched_example).
        """
        if self._is_non_field(text):
            return None, 0.0, None

        if self.vectorizer is None:
            self.train()

        norm = _normalize(self._prenormalize(text))
        if not norm:
            return None, 0.0, None

        vec = self.vectorizer.transform([norm])
        sims = cosine_similarity(vec, self.train_vectors)[0]
        best_idx = sims.argmax()
        best_score = float(sims[best_idx])

        if best_score < threshold:
            return None, best_score, None

        predicted_label = self.train_labels[best_idx]
        if predicted_label == "OUT_OF_SCOPE":
            return None, best_score, self.train_texts[best_idx]

        return predicted_label, best_score, self.train_texts[best_idx]

    def predict_batch(self, texts, threshold=DEFAULT_CONFIDENCE_THRESHOLD):
        """
        Predict field ids for many headers at once (vectorized — much faster
        than calling predict() in a loop for wide sheets with 100+ columns).
        Returns a list of (field_id_or_None, confidence, matched_example).
        """
        if not texts:
            return []

        if self.vectorizer is None:
            self.train()

        exclude_mask = [self._is_non_field(t) for t in texts]
        normed = [_normalize(self._prenormalize(t)) for t in texts]
        vecs = self.vectorizer.transform(normed)
        sims = cosine_similarity(vecs, self.train_vectors)

        results = []
        for i, row in enumerate(sims):
            if exclude_mask[i]:
                results.append((None, 0.0, None))
                continue

            best_idx = row.argmax()
            best_score = float(row[best_idx])

            if best_score < threshold:
                results.append((None, best_score, None))
                continue

            predicted_label = self.train_labels[best_idx]
            if predicted_label == "OUT_OF_SCOPE":
                results.append((None, best_score, self.train_texts[best_idx]))
            else:
                results.append((predicted_label, best_score, self.train_texts[best_idx]))

        return results


# ── IS-13890 classifier ─────────────────────────────────────────────────────
# Its own training set (ml/training_data_is13890.py), its own model file
# (ml/field_classifier_is13890.pkl) and its own threshold — completely
# independent of the CENPEEP/BEE classifier above.
IS13890_CONFIDENCE_THRESHOLD = 0.60


class IS13890FieldClassifier(FieldClassifier):
    MODEL_FILENAME = "field_classifier_is13890.pkl"

    def _get_data(self):
        return _is13890_data.get_training_data()

    def _is_non_field(self, text):
        return _is13890_data.is_non_field_header(text)

    def _prenormalize(self, text):
        # O\u2082 / CO\u2082 / N\u2082 -> O2 / CO2 / N2 and drop the degree sign, so a
        # subscript-two header matches the plain-ASCII training phrases.
        return str(text).replace("\u2082", "2").replace("\u00b0", " ").replace("\u00ba", " ")


# ── Module-level singletons (lazy-loaded, trained once per process) ─────────
_classifier_instance = None
_is13890_instance = None


def get_classifier():
    global _classifier_instance
    if _classifier_instance is None:
        _classifier_instance = FieldClassifier.load()
    return _classifier_instance


def get_is13890_classifier():
    global _is13890_instance
    if _is13890_instance is None:
        _is13890_instance = IS13890FieldClassifier.load()
    return _is13890_instance


def retrain_and_save():
    """
    Force a fresh train from current training_data.py and persist it.

    On Vercel, persistence goes to /tmp only. This avoids the read-only
    /var/task filesystem error.
    """
    clf = FieldClassifier()
    clf.train()

    try:
        clf.save()
    except OSError:
        # If saving fails for any reason, still keep the trained model in memory.
        pass

    global _classifier_instance
    _classifier_instance = clf
    return clf


def retrain_and_save_is13890():
    """Same as retrain_and_save(), for the IS-13890 classifier."""
    clf = IS13890FieldClassifier()
    clf.train()
    try:
        clf.save()
    except OSError:
        pass

    global _is13890_instance
    _is13890_instance = clf
    return clf
