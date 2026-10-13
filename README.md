# CENPEEP Boiler Efficiency Calculator — React frontend

The original HTML/JavaScript pages rebuilt as a React (JSX) app.
**The Python/Flask backend is not touched** — the React app calls the same `/api/...` endpoints.

## What is in here

```
cenpeep-react/
├─ index.html, package.json, vite.config.js      Vite + React project
├─ src/
│  ├─ main.jsx, App.jsx                           entry + routes (hash routes, no extra dependency)
│  ├─ pages/
│  │   Login.jsx      ← index.html
│  │   Cenpeep.jsx    ← calculator.html + script.js
│  │   Bs2885.jsx     ← tab1.html + script1.js
│  │   Asme.jsx       ← tab2.html + script2.js
│  │   Bee.jsx        ← tab3.html + script3.js
│  │   Summary.jsx    ← summary.html + summary.js
│  │   Sessions.jsx   ← sessions.html
│  ├─ components/     Navbar, Particles, BoilerGate, UploadBanner, DatePicker, ProcessSection, Fields, Results …
│  ├─ lib/
│  │   calc/          cenpeep.js, asme.js, bee.js, bs2885.js  ← the calculation code, copied VERBATIM
│  │   auth.js        ← auth.js (same sessionStorage keys, same AES-GCM response decryption)
│  │   format.js, derived.js, router.jsx, summaryDefaults.js, notes.js
│  ├─ config/         fields.*.js — every input field (id, name, symbol, unit, default, MANUAL/AUTO tag),
│  │                  GENERATED from your HTML pages, not retyped
│  └─ styles/         style.css, style1.css, style3.css, login.css, boiler-gate.css — your original CSS, unchanged
├─ public/images/     logo
└─ prebuilt/          ready-to-use production build (see "Option A" below)
```

## Run it

### Option A — no Node needed: drop-in build
1. In your Flask project, move the old `public/` folder aside (e.g. rename it `public_old`).
2. Create a new `public/` and copy the **contents of `prebuilt/`** into it (`index.html`, `app.js`, `images/`).
3. Start Flask as usual. Open `http://localhost:5000/`.

Flask's existing catch-all route and `vercel.json` already serve `public/index.html`, so nothing in Python or Vercel config changes.

### Option B — develop / rebuild with Vite
```bash
npm install
npm run dev        # http://localhost:5173  (proxies /api to Flask on :5000 — start Flask first)
npm run build      # outputs ./dist  → copy its contents into Flask's public/ like Option A
```

## URLs
The app uses hash routes so it works with Flask and Vercel without any server config:

| Old page | New URL |
|---|---|
| index.html | `/#/` |
| calculator.html | `/#/calculator` |
| tab1.html | `/#/bs-2885` |
| tab2.html | `/#/asme-ptc-4-1` |
| tab3.html | `/#/bee` |
| summary.html | `/#/summary` |
| sessions.html | `/#/sessions` |

## How it was verified
Your original pages and the React app were run side by side in a real headless browser against the same mock API,
using the real parsed output of `KTPS__6_THERMACT_Pre_AND_Post_04_7_26_Final.xls`, doing the same clicks:
upload, Calculate, live Radiation/L6 edit, two date-wise processes (Pre/Post) picked through the calendar,
Delta card, GCV and APH correction + undo, design-condition edits, Save to Database, CSV, Field Report request,
BS-2885, Summary (including auto-restore), Sessions (list + detail modal) and Login.

* **61 of 61 comparisons identical** (every number, label, field value, CSS class, saved payload and CSV).
* Calculation modules: **1,500 randomized input sets** gave identical results to the original `script*.js` functions.
* Screenshots: 5 of 7 screens pixel-identical; the other two differ by a few anti-aliased pixels (hover state).

## Intentional differences from the old pages
1. **ASME Radiation / Unmeasured edit:** the old page updated the totals but left the Radiation (69) / Unmeasured (70)
   *table rows* showing the old numbers until you re-opened the section. The React page updates those rows live too.
2. **Summary** no longer loads the four calculator pages in hidden iframes; it imports the same calculation functions directly.
3. **Login:** the unused "Select Boiler Type" box that was left hidden in index.html was not carried over
   (boiler type is still chosen in the popup on the calculator pages, as before).
4. URLs are hash-style (table above), so old bookmarks to `calculator.html` etc. need updating.

## Notes
* `npm install` / `vite build` need internet access; they could not be run in the environment this was prepared in.
  The same source was compiled with esbuild (identical JSX/ES-module handling) and tested in Chromium; `prebuilt/` is that build.
* Include the backend fixes made earlier (`upload.py`) — the frontend relies on the backend field detection exactly as before.
