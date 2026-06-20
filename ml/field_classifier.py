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

import os
import pickle
import re
import tempfile

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .training_data import get_training_data, is_non_field_header


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

    def __init__(self):
        self.vectorizer = None
        self.train_vectors = None
        self.train_labels = None
        self.train_texts = None

    # ── Training ────────────────────────────────────────────────────────────
    def train(self, texts=None, labels=None):
        if texts is None or labels is None:
            texts, labels = get_training_data()

        normalized = [_normalize(t) for t in texts]

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
        return self

    # ── Persistence ─────────────────────────────────────────────────────────
    def save(self, path=None):
        """
        Save model state.

        On Vercel, defaults to /tmp/field_classifier.pkl.
        Locally, defaults to ml/field_classifier.pkl.
        """
        target_path = path or DEFAULT_MODEL_PATH
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
                },
                f,
            )

    @classmethod
    def load(cls, path=None):
        """
        Load a previously saved model if present.
        If not found, train a fresh one.
        """
        clf = cls()
        target_path = path or DEFAULT_MODEL_PATH

        # Prefer the requested path, then fall back to the local repo path
        # if we're running somewhere other than Vercel.
        candidates = [target_path]
        if not _is_vercel() and target_path != LOCAL_MODEL_PATH:
            candidates.append(LOCAL_MODEL_PATH)

        loaded = False
        for candidate in candidates:
            if os.path.exists(candidate):
                with open(candidate, "rb") as f:
                    state = pickle.load(f)
                clf.vectorizer = state["vectorizer"]
                clf.train_vectors = state["train_vectors"]
                clf.train_labels = state["train_labels"]
                clf.train_texts = state["train_texts"]
                loaded = True
                break

        if not loaded:
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
        if is_non_field_header(text):
            return None, 0.0, None

        if self.vectorizer is None:
            self.train()

        norm = _normalize(text)
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

        exclude_mask = [is_non_field_header(t) for t in texts]
        normed = [_normalize(t) for t in texts]
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


# ── Module-level singleton (lazy-loaded, trained once per process) ──────────
_classifier_instance = None


def get_classifier():
    global _classifier_instance
    if _classifier_instance is None:
        _classifier_instance = FieldClassifier.load()
    return _classifier_instance


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