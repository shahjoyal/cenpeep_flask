"""pagerduty.py — minimal, generic-only critical alerting for CENPEEP.

Deliberately does NOT send any application data. Every event this module
fires uses a summary built only from fixed strings and, in one case,
Flask's internal route identifier (e.g. "sessions.create_session") — a
name that comes from the route *definitions* in the code, never from a
request. Nothing here ever reads or forwards a request body, query
string, uploaded filename, exception message, or database content. If
you add a new call site later, follow the same rule: only code-defined
identifiers or hardcoded text go into a summary, never anything read
from `request` beyond `request.endpoint`.

Uses PagerDuty's Events API v2 (a single HTTP POST) — no PagerDuty SDK
dependency needed.

Setup (see the deployment guide for the full walkthrough):
  1. Create a PagerDuty service, add an "Events API v2" integration to it.
  2. Copy the Integration Key (aka "routing key") PagerDuty gives you.
  3. Set PAGERDUTY_INTEGRATION_KEY=<that key> in .env / your host's env vars.

If PAGERDUTY_INTEGRATION_KEY isn't set, every function below is a silent
no-op — alerting is opt-in and can never block the app from starting or
serving requests, whether it's left unconfigured or PagerDuty itself is
temporarily unreachable.
"""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request

_EVENTS_URL = "https://events.pagerduty.com/v2/enqueue"


def _send(summary: str, severity: str, dedup_key: str, action: str = "trigger") -> None:
    key = os.getenv("PAGERDUTY_INTEGRATION_KEY")
    if not key:
        return  # not configured — alerting is opt-in, never fatal
    body = {
        "routing_key": key,
        "event_action": action,
        "dedup_key": dedup_key,
        "payload": {
            "summary": summary,  # fixed, generic string only — see module docstring
            "source": "cenpeep-api",
            "severity": severity,
        },
    }
    req = urllib.request.Request(
        _EVENTS_URL,
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        urllib.request.urlopen(req, timeout=5)
    except (urllib.error.URLError, urllib.error.HTTPError):
        pass  # a PagerDuty hiccup should never take down the app itself


# ── Fixed alert types ────────────────────────────────────────────────────
# dedup_key groups trigger/resolve pairs into one incident instead of a new
# one every time (important on Vercel: this startup code runs on every
# cold start, so without dedup_key a persistent outage would open a fresh
# incident per cold start instead of updating the one open incident).

def alert_db_connection_failed() -> None:
    """Fires once per cold start if MongoDB can't be reached — no
    connection string or exception text, just the fact that it failed."""
    _send(
        summary="CENPEEP API: MongoDB connection failed at startup.",
        severity="critical",
        dedup_key="cenpeep-db-connection",
        action="trigger",
    )


def resolve_db_connection_alert() -> None:
    """Resolves the above if it's currently open. Called once at startup
    right after a successful connection — a no-op in PagerDuty if there
    was nothing open."""
    _send(
        summary="CENPEEP API: MongoDB connection restored.",
        severity="critical",
        dedup_key="cenpeep-db-connection",
        action="resolve",
    )


def alert_api_failure(endpoint: str) -> None:
    """Fires for ANY API route that returns a 5xx (see app.py's
    after_request hook, which is the only caller). `endpoint` is Flask's
    internal route identifier — e.g. "sessions.create_session" — which
    comes from the route *definitions* in the code, never from the
    request itself. It can't contain a filename, an uploaded value, a
    query string, a request body, or an exception message: none of that
    is read or forwarded here, on purpose. Same dedup-per-endpoint
    pattern as above, so repeated failures on one route update a single
    incident instead of opening a new one per request.
    """
    endpoint = endpoint or "unknown-endpoint"
    _send(
        summary=f"CENPEEP API: {endpoint} is returning server errors (5xx).",
        severity="error",
        dedup_key=f"cenpeep-api-failure:{endpoint}",
        action="trigger",
    )
