/* ════════════════════════════════════════════════════════════════════
   Boiler Efficiency — BS-2885 (1974) — script1.js
   "Testing of Boilers" — Method A (direct heat balance) and Method B
   (indirect / heat-loss). Every formula below is transcribed cell-for-
   cell from the official BS-2885 (1974) worksheet layout (columns:
   Sl.No. | Particulars | Formula | Unit | Symbol | Value), keeping the
   SAME cell references the sheet itself uses (e.g. F416, F495) so the
   mapping back to the standard's own "Item NNN" numbering (given in
   comments) is always auditable. This mirrors the convention already
   used for the BEE method in script3.js.

   Field detection (Excel upload → auto-populate) uses the SAME shared
   /api/upload endpoint as CENPEEP and BEE (routes/upload.py). BS-2885's
   own detection logic lives in routes/upload_bs2885.py — a self-contained
   module with its own item catalog and row-scanning — and is only merged
   additively into that endpoint's JSON response (under 'extractedBS2885'
   / 'missingFieldsBS2885'), so none of the existing CENPEEP/BEE detection
   logic is touched. It matches rows by the sheet's own "Sl. No." column
   (203, 206, 211, ...) against the same item numbers used below.
   ════════════════════════════════════════════════════════════════════ */

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const v    = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
const fmt  = (n, d=4) => (typeof n === 'number' && !isNaN(n) && isFinite(n)) ? n.toFixed(d) : '—';
const fmt2 = n => fmt(n, 2);
// Safe divide — the source workbook would show #DIV/0! when a fuel branch
// (oil / gas / pulverized) simply isn't fired (its rate is 0); we treat
// that as "this loss line doesn't apply" (0) rather than surfacing NaN.
const sdiv = (a, b) => (b === 0 || !isFinite(b)) ? 0 : a / b;

// ── DB health pill (kept for parity with CENPEEP page; harmless if absent) ──
async function checkDB() {
  const pill = document.getElementById('db-pill');
  if (!pill) return;
  try {
    const res  = await fetch('/api/health');
    const data = await res.json();
    if (data.db === 'connected') {
      pill.textContent = 'DB Online';
      pill.className   = 'db-pill online';
    } else {
      pill.textContent = 'DB Offline';
      pill.className   = 'db-pill offline';
    }
  } catch {
    pill.textContent = 'DB Offline';
    pill.className   = 'db-pill offline';
  }
}

// ── Toast notification ────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent  = msg;
  t.className    = `toast toast-${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 3200);
}

// ── Field id ⇄ worksheet cell map (single source of truth) ──────────────────
// row  = the BS-2885 worksheet row this input lives on (used as the F[]
//        key in runBS2885Calculation, exactly like the sheet's own F<row>).
// item = the standard's own "Sl. No." (Item NNN) — shown on the form and
//        used by the upload detector to match a row in an uploaded sheet.
const FIELD_ROW_MAP = [
  // Feedwater & Steam
  { id: 'bs203', row: 4, item: 203 },
  { id: 'bs206', row: 7, item: 206 },
  { id: 'bs211', row: 14, item: 211 },
  { id: 'bs215', row: 18, item: 215 },
  { id: 'bs216', row: 19, item: 216 },
  { id: 'bs217', row: 21, item: 217 },
  { id: 'bs220', row: 24, item: 220 },
  { id: 'bs221', row: 26, item: 221 },
  { id: 'bs224', row: 29, item: 224 },
  { id: 'bs225', row: 31, item: 225 },
  { id: 'bs228', row: 34, item: 228 },
  { id: 'bs246', row: 58, item: 246 },
  { id: 'bs247', row: 60, item: 247 },
  { id: 'bs250', row: 63, item: 250 },
  { id: 'bs251', row: 65, item: 251 },
  { id: 'bs254', row: 68, item: 254 },
  { id: 'bs255', row: 70, item: 255 },
  { id: 'bs258', row: 73, item: 258 },
  { id: 'bs259', row: 75, item: 259 },
  { id: 'bs262', row: 78, item: 262 },
  // Solid Fuel — Ultimate Analysis & Firing
  { id: 'bs271', row: 93, item: 271 },
  { id: 'bs272', row: 94, item: 272 },
  { id: 'bs273', row: 95, item: 273 },
  { id: 'bs274', row: 96, item: 274 },
  { id: 'bs275', row: 97, item: 275 },
  { id: 'bs276', row: 98, item: 276 },
  { id: 'bs278', row: 102, item: 278 },
  { id: 'bs279', row: 103, item: 279 },
  { id: 'bs280', row: 105, item: 280 },
  { id: 'bs291', row: 119, item: 291 },
  { id: 'bs295', row: 124, item: 295 },
  { id: 'bs301', row: 131, item: 301 },
  { id: 'bs323', row: 162, item: 323 },
  { id: 'bs325', row: 165, item: 325 },
  { id: 'bs326', row: 166, item: 326 },
  { id: 'bs328', row: 169, item: 328 },
  { id: 'bs329', row: 170, item: 329 },
  // Oil Fuel — Analysis & Firing
  { id: 'bs332', row: 176, item: 332 },
  { id: 'bs333', row: 177, item: 333 },
  { id: 'bs334', row: 178, item: 334 },
  { id: 'bs335', row: 179, item: 335 },
  { id: 'bs336', row: 180, item: 336 },
  { id: 'bs343', row: 186, item: 343 },
  { id: 'bs344', row: 188, item: 344 },
  { id: 'bs345', row: 189, item: 345 },
  { id: 'bs349', row: 194, item: 349 },
  { id: 'bs350', row: 195, item: 350 },
  { id: 'bs352', row: 198, item: 352 },
  { id: 'bs357', row: 204, item: 357 },
  { id: 'bs360', row: 207, item: 360 },
  // Gaseous Fuel — Firing & CV
  { id: 'bs362', row: 211, item: 362 },
  { id: 'bs363', row: 212, item: 363 },
  { id: 'bs390', row: 248, item: 390 },
  { id: 'bs391', row: 249, item: 391 },
  { id: 'bs392', row: 250, item: 392 },
  { id: 'bs393', row: 251, item: 393 },
  // Air & Ambient Conditions
  { id: 'bs397', row: 257, item: 397 },
  { id: 'bs398', row: 258, item: 398 },
  { id: 'bs399', row: 259, item: 399 },
  { id: 'bs427', row: 304, item: 427 },
  // Solid Residue — Ash, Dust & Riddlings
  { id: 'bs450', row: 333, item: 450 },
  { id: 'bs451', row: 334, item: 451 },
  { id: 'bs453', row: 336, item: 453 },
  { id: 'bs454', row: 337, item: 454 },
  { id: 'bs460', row: 345, item: 460 },
  { id: 'bs461', row: 346, item: 461 },
  { id: 'bs463', row: 348, item: 463 },
  { id: 'bs464', row: 349, item: 464 },
  { id: 'bs466', row: 352, item: 466 },
  { id: 'bs467', row: 353, item: 467 },
  { id: 'bs469', row: 355, item: 469 },
  { id: 'bs470', row: 356, item: 470 },
  { id: 'bs472', row: 359, item: 472 },
  { id: 'bs473', row: 360, item: 473 },
  // Water-Filled Ash Hopper / Quenching
  { id: 'bs475', row: 364, item: 475 },
  { id: 'bs476', row: 365, item: 476 },
  { id: 'bs477', row: 367, item: 477 },
  { id: 'bs478', row: 368, item: 478 },
  { id: 'bs479', row: 370, item: 479 },
  { id: 'bs480', row: 371, item: 480 },
  // Heat Balance & Method B Extras
  { id: 'bs519', row: 417, item: 519 },
  { id: 'bs601', row: 426, item: 601 },
  { id: 'bs701', row: 467, item: 701 },
  { id: 'bs702', row: 468, item: 702 },
  { id: 'bs704', row: 470, item: 704 },
  { id: 'bs705', row: 471, item: 705 },
  { id: 'bs708', row: 475, item: 708 },
  { id: 'bs807', row: 486, item: 807 },
  { id: 'bs907', row: 517, item: 907 },
  { id: 'bs909', row: 521, item: 909 },
  { id: 'bs910', row: 523, item: 910 },
];

const ALL_FIELD_IDS = FIELD_ROW_MAP.map(f => f.id);
const ID_TO_ROW      = Object.fromEntries(FIELD_ROW_MAP.map(f => [f.id, f.row]));
const ROW_TO_ID       = Object.fromEntries(FIELD_ROW_MAP.map(f => [f.row, f.id]));

// ── Defaults (used by Reset to Defaults) ─────────────────────────────────────
const DEFAULTS = {
  bs203: 45,
  bs206: 950,
  bs211: 1650,
  bs215: 0,
  bs216: 0,
  bs217: 0,
  bs220: 0,
  bs221: 0,
  bs224: 0,
  bs225: 0,
  bs228: 950,
  bs246: 3400,
  bs247: 0,
  bs250: 0,
  bs251: 0,
  bs254: 0,
  bs255: 0,
  bs258: 0,
  bs259: 0,
  bs262: 0,
  bs271: 12,
  bs272: 38,
  bs273: 38,
  bs274: 2.5,
  bs275: 1.0,
  bs276: 0.4,
  bs278: 13900,
  bs279: 13300,
  bs280: 0,
  bs291: 9.2,
  bs295: 0.05,
  bs301: 2000,
  bs323: 0,
  bs325: 0,
  bs326: 0,
  bs328: 0.05,
  bs329: 5,
  bs332: 0,
  bs333: 0,
  bs334: 0,
  bs335: 0,
  bs336: 0,
  bs343: 2.1,
  bs344: 0,
  bs345: 0,
  bs349: 0,
  bs350: 0,
  bs352: 0,
  bs357: 0,
  bs360: 0,
  bs362: 0,
  bs363: 0,
  bs390: 0,
  bs391: 0,
  bs392: 0,
  bs393: 0,
  bs397: 60,
  bs398: 30,
  bs399: 0.018,
  bs427: 135,
  bs450: 8,
  bs451: 1.2,
  bs453: 200,
  bs454: 0.84,
  bs460: 0,
  bs461: 0,
  bs463: 0,
  bs464: 0.84,
  bs466: 30,
  bs467: 0.4,
  bs469: 135,
  bs470: 0.84,
  bs472: 0,
  bs473: 0,
  bs475: 0,
  bs476: 0,
  bs477: 0,
  bs478: 0,
  bs479: 0,
  bs480: 0,
  bs519: 0,
  bs601: 33820,
  bs701: 0,
  bs702: 10120,
  bs704: 0,
  bs705: 0,
  bs708: 0.35,
  bs807: 10.2,
  bs907: 0,
  bs909: 1.2,
  bs910: 0.3,
};

function resetInputs() {
  for (const [id, val] of Object.entries(DEFAULTS)) {
    const el = document.getElementById(id);
    if (el) { el.value = val; el.classList.remove('field-detected', 'field-missing'); }
  }
  showToast('Inputs reset to defaults.', 'success');
}

// ── Excel upload → auto-populate ─────────────────────────────────────────────
window._uploadedFilename = null;
// Full last /api/upload response, kept the same way CENPEEP/BEE keep
// window._uploadData — used by downloadFieldReportBS2885() below so the
// Field Report doesn't need to re-upload or re-parse the file.
window._uploadDataBS2885 = null;

// ── Persist for the Summary tab ──────────────────────────────────────────
// See script.js for the full explanation — same idea, same sessionStorage
// key, so any tab's upload (this one included) feeds the Summary tab
// without a second upload there.
function stashForSummary(data, sourceTab) {
  try {
    sessionStorage.setItem('cenpeep_lastUpload', JSON.stringify({
      filename: data.filename,
      primarySheet: data.primarySheet,
      sheetNameBS2885: data.sheetNameBS2885,
      extracted: data.extracted || {},
      extractedBS2885: data.extractedBS2885 || {},
      sourceTab,
      savedAt: Date.now(),
    }));
  } catch (e) { /* storage full/unavailable — Summary just won't auto-populate */ }
}

function initUpload() {
  const input = document.getElementById('upload-file-input');
  if (!input) return;
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('upload-status');
    statusEl.style.display = 'inline-block';
    statusEl.className      = 'upload-status loading';
    statusEl.textContent    = '⏳ Reading BS-2885 sheet…';

    const form = new FormData();
    form.append('file', file);

    try {
      const res  = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();

      if (!data.ok) throw new Error(data.error || 'Upload failed');
      stashForSummary(data, 'BS-2885');

      // Reset previous upload's coloring before applying the new one.
      for (const fid of ALL_FIELD_IDS) {
        const el = document.getElementById(fid);
        if (el) el.classList.remove('field-detected', 'field-missing');
      }

      // Same /api/upload endpoint as CENPEEP/BEE — BS-2885's fields come
      // back under their own namespaced keys so nothing here reads (or
      // could collide with) the CENPEEP/BEE `extracted` data in the same
      // response.
      const extracted = data.extractedBS2885 || {};
      let   populated = 0;
      for (const [fieldId, val] of Object.entries(extracted)) {
        const el = document.getElementById(fieldId);
        if (el) {
          el.value = typeof val === 'number' ? parseFloat(val.toFixed(6)) : val;
          el.classList.add('field-detected');
          populated++;
        }
      }

      const missingFieldsList = data.missingFieldsBS2885 || [];
      for (const m of missingFieldsList) {
        const el = document.getElementById(m.id || m);
        if (el) el.classList.add('field-missing');
      }

      window._uploadedFilename = data.filename;
      window._uploadDataBS2885 = data;
      statusEl.className   = 'upload-status success';
      statusEl.textContent = `✓ ${populated} of ${ALL_FIELD_IDS.length} fields detected from "${data.filename}"`;
      showToast(`Detected ${populated} field${populated === 1 ? '' : 's'} from the uploaded sheet.`, 'success');
    } catch (err) {
      statusEl.className   = 'upload-status error';
      statusEl.textContent = `✗ ${err.message}`;
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      input.value = '';
    }
  });
}

// ── Field Detection Report (.docx) ───────────────────────────────────────────
// Same /api/report route CENPEEP and BEE already use (routes/report.py) —
// it renders whatever fieldDetail/extracted/missingFields it's given into
// the same Field / Detected From / Method / Confidence / Value table, so
// this just needs to pass BS-2885's own namespaced upload keys instead of
// re-parsing anything. Uses the fieldDetailBS2885/extractedBS2885/
// missingFieldsBS2885/sheetNameBS2885 already sitting in
// window._uploadDataBS2885 from the last upload.
async function downloadFieldReportBS2885() {
  const data = window._uploadDataBS2885;
  if (!data || !data.fieldDetailBS2885 || !Object.keys(data.fieldDetailBS2885).length) {
    showToast('Upload and parse a file first to generate a field report.', 'error');
    return;
  }

  const payload = {
    filename:       data.filename,
    primarySheet:   data.sheetNameBS2885,
    fieldDetail:    data.fieldDetailBS2885,
    extracted:      data.extractedBS2885,
    missingFields:  data.missingFieldsBS2885,
    reportTitle:    'BS-2885 Field Detection Report',
    filenamePrefix: 'BS2885_Field_Report',
    standardLabel:  'BS-2885',
  };

  try {
    const res = await fetch('/api/report', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Report generation failed (${res.status})`);
    }
    const blob = await res.blob();
    const disposition = res.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename="?([^"]+)"?/);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = match ? match[1] : 'BS2885_Field_Report.docx';
    a.click();
    showToast('✓ Field report downloaded', 'success');
  } catch (err) {
    showToast('Report failed: ' + err.message, 'error');
  }
}

// ── BS-2885 (1974) calculation engine ────────────────────────────────────────
// F[] is keyed by worksheet ROW NUMBER — exactly like the Excel sheet's own
// cell references — so formulas below can be read side-by-side with the
// standard's worksheet with zero renaming. Comments give the "Item NNN"
// each row corresponds to (blank where the sheet itself has no item number,
// e.g. the % loss sub-total rows).
function runBS2885Calculation(raw) {
  const F = {};
  // ── Leaf inputs (straight from the form) ──────────────────────────────
  for (const { id, row } of FIELD_ROW_MAP) F[row] = raw[id] || 0;

  // ── Ultimate analysis check-sums (Items 271-277, solid; not used further
  //    downstream — kept only so the Ultimate Analysis card can show the
  //    oxygen-by-difference the same way the sheet does). ─────────────────
  F[99]  = 100 - (F[93] + F[94] + F[95] + F[96] + F[97] + F[98]);              // Item 277 — Oxygen (by diff.)
  F[100] = F[93] + F[94] + F[95] + F[96] + F[97] + F[98] + F[99];              // check total (should read 100)

  // Item 337 — Oxygen & nitrogen (by diff.), oil ultimate analysis.
  F[181] = 100 - (F[176] + F[177] + F[178] + F[179] + F[180]);
  F[182] = F[176] + F[177] + F[178] + F[179] + F[180] + F[181];

  // Item 327 — Oxygen & nitrogen (by diff.) in independently-fired-dryer gas.
  F[167] = 100 - (F[165] + F[166]);

  // Item 303 — Rate of firing (pulverized fuel), symbol C1.
  // NOTE (quirk, kept as-is — see BEE's script3.js for the same policy on
  // its own reference sheet): the official BS-2885 worksheet's formula for
  // this cell is "=F119-(F124*F130)/F102", i.e. it divides by row 130 —
  // which is the SECTION HEADER row "Calorific value of mill rejects", not
  // the "gross" value cell itself (that's row 131 / Item 301, a row below).
  // Row 130 is always blank on the real worksheet, so this term evaluates
  // to 0 there too. We reproduce that literally (F[130] is simply never
  // populated, so it's 0) rather than silently "fixing" it to F[131] —
  // if you enter a mill-rejects gross CV (Item 301) it will NOT affect
  // this cell, exactly like the source sheet.
  F[133] = F[119] - (F[124] * (F[130] || 0)) / F[102];                        // Item 303

  // ── A. Heat Output (Items 502–519) ─────────────────────────────────────
  F[400] = F[4]  * F[7];                                                       // Item 502
  F[401] = F[21] * F[24];                                                      // Item 503
  F[402] = F[19] * F[14];                                                      // Item 504
  F[403] = F[18] * F[14];                                                      // Item 505
  F[404] = (F[4] + F[21] - (F[19] + F[18])) * F[58];                           // Item 506
  F[405] = F[404] + F[403] + F[402] - F[401] - F[400];                        // Item 507 — Heat output, gen. section + SH
  F[406] = F[60] * F[63];                                                      // Item 508
  F[407] = F[26] * F[29];                                                      // Item 509
  F[408] = F[65] * F[68];                                                      // Item 510
  F[409] = F[408] - (F[407] + F[406]);                                        // Item 511 — Heat output, 1st reheater
  F[410] = F[70] * F[73];                                                      // Item 512
  F[411] = F[31] * F[34];                                                      // Item 513
  F[412] = F[75] * F[78];                                                      // Item 514
  F[413] = F[412] - (F[411] + F[410]);                                        // Item 515 — Heat output, 2nd reheater
  F[414] = F[405] + F[409] + F[413];                                          // Item 516 — Total heat output
  F[415] = F[194] * F[186] * (F[198] - F[195]) + F[207];                      // Item 517 — Heat used heating/atomizing oil
  F[416] = F[414] - F[415];                                                   // Item 518 — Net total heat output
  // F[417] is the leaf input bs519 (Item 519 — heat added to combustion
  // air from a separate external source); subtracted per the standard's
  // own wording for Item 901 below ("Item 518, Less Item 519 where
  // applicable").

  // ── B. Heat Input (Items 520–524) ──────────────────────────────────────
  F[419] = F[105] * F[102];                                                   // Item 520 — Mech. stokers
  F[420] = F[133] * (F[102] + F[162]);                                        // Item 521 — Pulverized fuel
  F[421] = F[194] * F[188];                                                   // Item 522 — Oil fuel
  F[422] = F[212] > 0 ? F[212] * F[250] : (F[211] > 0 ? F[211] * F[248] : 0); // Item 523 — Gaseous fuel
  F[424] = F[419] + F[420] + F[421] + F[422];                                 // Item 524 — Total heat input (gross-CV basis)

  // ── C. Losses due to solid residue (Items 601–633) ─────────────────────
  F[428] = F[334]; F[429] = F[333] / 100;                                     // Items 602/603 (bottom ash)
  F[430] = F[426] * F[428] * F[429] / 100;                                    // Item 604 — combustible loss, bottom ash
  F[431] = F[430] * 100 / F[102];
  F[433] = F[346]; F[434] = F[345] / 100;                                     // Items 606/607 (coarse dust)
  F[435] = F[426] * F[433] * F[434] / 100;                                    // Item 608
  F[436] = F[435] * 100 / F[102];
  F[438] = F[353]; F[439] = F[352] / 100;                                     // Items 610/611 (fine dust)
  F[440] = F[426] * F[438] * F[439] / 100;                                    // Item 612
  F[441] = F[440] * 100 / F[102];
  F[443] = F[360]; F[444] = F[359] / 100;                                     // Items 614/615 (riddlings)
  F[445] = F[426] * F[443] * F[444] / 100;                                    // Item 616
  F[446] = F[445] * 100 / F[102];
  F[448] = F[170]; F[449] = sdiv(F[169], F[133]);                             // Items 618/619 (dryer ashpit)
  F[450] = F[426] * F[448] * F[449] / 100;                                    // Item 620
  F[451] = F[450] * 100 / F[102];
  F[453] = F[430] + F[435] + F[440] + F[445] + F[450];                        // Item 622 — total combustible in residue (kJ/kg)
  F[454] = F[431] + F[436] + F[441] + F[446] + F[451];                        // Item 623 — total combustible in residue (%)
  F[456] = F[429] * (100 - F[428]) / 100;
  F[457] = F[434] * (100 - F[433]) / 100;
  F[458] = F[439] * (100 - F[438]) / 100;
  F[459] = F[444] * (100 - F[443]) / 100;
  F[460] = F[449] * (100 - F[448]) / 100;
  F[461] = F[94] / 100 - (F[456] + F[457] + F[458] + F[459] + F[460]);        // Item 629 — balance of pure ash
  F[463] = F[429] * F[337] * (F[336] - F[258]);                               // Item 631 — sensible heat, bottom ash+clinker
  F[464] = (F[434] * F[349] * (F[348] - F[258])) + (F[439] * F[356] * (F[355] - F[258])); // Item 632 — sensible heat, dust
  F[465] = F[463] + F[464];                                                   // Item 633 — total sensible heat of solid residue

  // ── D. Losses due to unburnt gas (Items 701–707) ───────────────────────
  F[469] = F[467] * F[468];                                                   // Item 703 — CO loss
  F[472] = F[470] * F[471];                                                   // Item 706 — hydrocarbon loss
  F[473] = F[469] + F[472];                                                   // Item 707 — total unburnt gas loss

  // ── E. Sensible heat in dry flue gas (Item 709) ────────────────────────
  F[476] = F[475] * 30.6 * (F[304] - F[258]);                                 // Item 709

  // ── F. Losses due to moisture & hydrogen (Items 801–805) ───────────────
  F[478] = F[93] / 100;                                                       // Item 801
  F[479] = 9 / 100 * F[96];                                                   // Item 802
  F[480] = F[478] + F[479];                                                   // Item 803
  F[481] = 1.88 * (F[304] - 25) + 2442 + 4.2 * (25 - F[258]);                 // Item 804
  F[482] = F[480] * F[481];                                                   // Item 805

  // ── G. Loss due to sensible heat of water vapour (Item 806) ────────────
  F[484] = F[482] - (F[102] - F[103]);                                       // Item 806

  // ── H. Loss due to moisture in combustion air (Items 807–810) ──────────
  F[487] = F[257]; F[488] = F[259];                                          // Items 808/809
  F[489] = F[486] * F[488] * 1.88 * (F[304] - F[258]);                       // Item 810

  // ── Thermal Efficiency & Heat Account (Items 901–910) ───────────────────
  // Net-CV-basis heat input (denominator recomputed inline, exactly as the
  // sheet's own F495 formula does — the standard has no separate item
  // number for a "net" version of Item 524).
  const heatInputNet =
    (F[105] > 0 ? F[105] * F[103] : 0) +
    (F[119] > 0 ? (F[119] - (F[124] * F[131]) / F[103]) * (F[103] + F[162]) : 0) +
    (F[194] > 0 ? F[194] * F[189] : 0) +
    (F[212] > 0 ? F[212] * F[251] : (F[211] > 0 ? F[211] * F[249] : 0));
  const netHeatInputActive = F[105] > 0 || F[119] > 0 || F[194] > 0 || F[211] > 0 || F[212] > 0;

  F.item901_gross = sdiv((F[416] - F[417]) * 100, F[424]);                    // Item 901 — Thermal Eff. Method A, gross CV
  F.item901_net   = netHeatInputActive ? sdiv((F[416] - F[417]) * 100, heatInputNet) : 0; // Item 901, net CV

  // Item 903 — Losses due to residue (a-f), gross & net CV basis.
  const res_a_g = sdiv(F[430] * 100, F[102]), res_a_n = sdiv(F[430] * 100, F[103]);
  const res_b_g = sdiv(F[435] * 100, F[102]), res_b_n = sdiv(F[435] * 100, F[103]);
  const res_c_g = sdiv(F[440] * 100, F[102]), res_c_n = sdiv(F[440] * 100, F[103]);
  const res_d_g = sdiv(F[445] * 100, F[102]), res_d_n = sdiv(F[445] * 100, F[103]);
  const res_e_g = sdiv(F[450] * 100, F[102]), res_e_n = sdiv(F[450] * 100, F[103]);
  const res_f_g = sdiv(F[465] * 100, F[102]), res_f_n = sdiv(F[465] * 100, F[103]);
  const item903_gross = res_a_g + res_b_g + res_c_g + res_d_g + res_e_g + res_f_g;
  const item903_net   = res_a_n + res_b_n + res_c_n + res_d_n + res_e_n + res_f_n;

  // Item 904 — Losses due to flue gases (a-e), gross & net CV basis.
  const fg_a_g = sdiv(F[473] * 100, F[102]), fg_a_n = sdiv(F[473] * 100, F[103]);
  const fg_b_g = sdiv(F[476] * 100, F[102]), fg_b_n = sdiv(F[476] * 100, F[103]);
  const fg_c_g = sdiv(F[482] * 100, F[102]), fg_c_n = sdiv(F[482] * 100, F[103]);
  const fg_d_g = sdiv(F[484] * 100, F[102]), fg_d_n = sdiv(F[484] * 100, F[103]);
  const fg_e_g = sdiv(sdiv(F[204] * F[481] * 100, F[194]), F[188]);
  const fg_e_n = sdiv(sdiv(F[204] * F[481] * 100, F[194]), F[189]);
  const item904_gross = fg_a_g + fg_b_g + fg_c_g + fg_d_g + fg_e_g;
  const item904_net   = fg_a_n + fg_b_n + fg_c_n + fg_d_n + fg_e_n;

  // Item 905 — Losses due to water-filled ash hopper/slag tank + quenching.
  const pulvHeatIn = F[119] > 0 ? (F[119] - (F[124] * F[131]) / F[103]) * (F[103] + F[162]) : (F[105] * F[103]);
  const hopper_a_n = sdiv(((F[365] - F[368]) * ((100 - F[364]) + 539.1 + 0.5 * (F[304] - 100)) + F[368] * (F[367] - F[364])) * 418.7, pulvHeatIn);
  const hopper_b_n = sdiv(F[371] * ((100 - F[370]) + 539.1 + 0.5 * (F[304] - 100)) * 418.7, pulvHeatIn);
  const item905_net = hopper_a_n + hopper_b_n;
  const denomGrossHopper = F[420] !== 0 ? F[420] : F[419];
  const hopper_a_g = sdiv(((F[365] - F[368]) * ((100 - F[364]) + 539.1 + 0.5 * (F[304] - 100)) + F[368] * (F[367] - F[364])) * 418.7, denomGrossHopper);
  const hopper_b_g = sdiv(F[371] * ((100 - F[370]) + 539.1 + 0.5 * (F[304] - 100)) * 418.7, denomGrossHopper);
  const item905_gross = hopper_a_g + hopper_b_g;

  // Item 906 — Loss due to moisture in combustion air.
  const item906_gross = sdiv(F[489] * 100, F[102]);
  const item906_net    = sdiv(F[489] * 100, F[103]);

  // Item 907 — Loss in heating fuel up to air supply temperature (manual —
  // "the sensible heat per unit mass of fuel between the limits t12 and
  // t11 is to be computed", per the standard's own text; no closed-form
  // cell formula is given, so it's entered directly, same treatment as
  // the source worksheet).
  const item907 = F[517];

  // Item 902 — Thermal Efficiency, Method B (100% − every measured loss).
  F.item902_gross = 100 - (item903_gross + item904_gross + item905_gross + item906_gross + item907 + F[521] + F[523]);
  F.item902_net   = 100 - (item903_net   + item904_net   + item905_net   + item906_net   + item907 + F[521] + F[523]);

  // Item 908 — Balance of account incl. radiation & other unmeasured
  // losses, for test by METHOD A (the residual/implied loss, not directly
  // measured — this is what Method A leaves unaccounted-for).
  F.item908_gross = 100 - (F.item901_gross + item903_gross + item904_gross + item905_gross + item906_gross);
  F.item908_net   = 100 - (F.item901_net   + item903_net   + item904_net   + item905_net   + item906_net);

  return {
    F,
    methodA:   { gross: F.item901_gross, net: F.item901_net },
    methodB:   { gross: F.item902_gross, net: F.item902_net },
    balanceA:  { gross: F.item908_gross, net: F.item908_net },
    losses: {
      residue: {
        total: { gross: item903_gross, net: item903_net },
        a: { label: 'Combustible in bottom ash',  gross: res_a_g, net: res_a_n },
        b: { label: 'Combustible in coarse dust',  gross: res_b_g, net: res_b_n },
        c: { label: 'Combustible in fine dust',    gross: res_c_g, net: res_c_n },
        d: { label: 'Combustible in riddlings',    gross: res_d_g, net: res_d_n },
        e: { label: 'Combustible, dryer ash',      gross: res_e_g, net: res_e_n },
        f: { label: 'Sensible heat of solid residue', gross: res_f_g, net: res_f_n },
      },
      flueGas: {
        total: { gross: item904_gross, net: item904_net },
        a: { label: 'Unburnt gas (CO + hydrocarbons)', gross: fg_a_g, net: fg_a_n },
        b: { label: 'Sensible heat in dry flue gas',   gross: fg_b_g, net: fg_b_n },
        c: { label: 'Moisture in fuel',                gross: fg_c_g, net: fg_c_n },
        d: { label: 'Sensible heat in water vapour',   gross: fg_d_g, net: fg_d_n },
        e: { label: 'Heat in atomizing air/steam',     gross: fg_e_g, net: fg_e_n },
      },
      waterHopper: {
        total: { gross: item905_gross, net: item905_net },
        a: { label: 'Water-filled ash hopper / slag tank', gross: hopper_a_g, net: hopper_a_n },
        b: { label: 'Ash quenching spray',                 gross: hopper_b_g, net: hopper_b_n },
      },
      moistureAir: { label: 'Moisture in combustion air', gross: item906_gross, net: item906_net },
      fuelHeating:  { label: 'Heating fuel up to air supply temp.', value: item907 },
      radiation:    { label: 'Radiation & convection (Method B)',   value: F[521] },
      auxPower:     { label: 'Auxiliary power, heat equivalent (Method B)', value: F[523] },
    },
    ultimate: {
      solidOxygenByDiff: F[99],
      solidCheckTotal:   F[100],
      oilOxygenNitrogenByDiff: F[181],
      oilCheckTotal:           F[182],
    },
  };
}

// ── Calculate & render ────────────────────────────────────────────────────
window._bs2885Result = null;

function calculate() {
  const raw = {};
  for (const id of ALL_FIELD_IDS) raw[id] = v(id);
  const result = runBS2885Calculation(raw);
  window._bs2885Result = result;
  renderOutput(result);
  showTab('output');
  showToast('BS-2885 efficiency calculated.', 'success');
}

function kpiCard(label, value, unit, cls = '') {
  return `<div class="kpi-card ${cls}">
    <div class="kpi-label">${label}</div>
    <div class="kpi-value">${fmt2(value)}<span class="kpi-unit">${unit}</span></div>
  </div>`;
}

function lossRow(label, gross, net) {
  return `<tr><td>${label}</td><td>${fmt2(gross)} %</td><td>${fmt2(net)} %</td></tr>`;
}

function lossSection(title, group) {
  const rows = Object.keys(group)
    .filter(k => k !== 'total')
    .map(k => lossRow(group[k].label, group[k].gross, group[k].net))
    .join('');
  return `<div class="output-table-wrap">
    <h3>${title} — Total: ${fmt2(group.total.gross)} % (gross) / ${fmt2(group.total.net)} % (net)</h3>
    <table class="output-table">
      <thead><tr><th>Loss</th><th>Gross CV basis</th><th>Net CV basis</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

function renderOutput(result) {
  const kpiArea = document.getElementById('kpi-area');
  const tables  = document.getElementById('output-tables');
  if (!kpiArea || !tables) return;

  kpiArea.innerHTML = `
    ${kpiCard('Thermal Efficiency — Method A (Gross CV)', result.methodA.gross, '%', 'kpi-green')}
    ${kpiCard('Thermal Efficiency — Method A (Net CV)',   result.methodA.net,   '%', 'kpi-green')}
    ${kpiCard('Thermal Efficiency — Method B (Gross CV)', result.methodB.gross, '%', 'kpi-blue')}
    ${kpiCard('Thermal Efficiency — Method B (Net CV)',   result.methodB.net,   '%', 'kpi-blue')}
  `;

  tables.innerHTML = `
    <div class="output-table-wrap">
      <h3>Method A — Balance of Account (radiation &amp; unmeasured losses)</h3>
      <table class="output-table">
        <thead><tr><th></th><th>Gross CV basis</th><th>Net CV basis</th></tr></thead>
        <tbody>${lossRow('Item 908 — Unaccounted balance', result.balanceA.gross, result.balanceA.net)}</tbody>
      </table>
    </div>
    ${lossSection('Item 903 — Losses due to Residue', result.losses.residue)}
    ${lossSection('Item 904 — Losses due to Flue Gases', result.losses.flueGas)}
    ${lossSection('Item 905 — Losses, Water-Filled Ash Hopper / Quenching', result.losses.waterHopper)}
    <div class="output-table-wrap">
      <h3>Other Method B Losses</h3>
      <table class="output-table">
        <thead><tr><th>Loss</th><th>Gross CV basis</th><th>Net CV basis</th></tr></thead>
        <tbody>
          ${lossRow(result.losses.moistureAir.label, result.losses.moistureAir.gross, result.losses.moistureAir.net)}
          <tr><td>${result.losses.fuelHeating.label}</td><td colspan="2">${fmt2(result.losses.fuelHeating.value)} %</td></tr>
          <tr><td>${result.losses.radiation.label}</td><td colspan="2">${fmt2(result.losses.radiation.value)} %</td></tr>
          <tr><td>${result.losses.auxPower.label}</td><td colspan="2">${fmt2(result.losses.auxPower.value)} %</td></tr>
        </tbody>
      </table>
    </div>
    <div class="output-table-wrap">
      <h3>Ultimate Analysis — Check Totals</h3>
      <table class="output-table">
        <thead><tr><th></th><th>Oxygen (by diff.)</th><th>Sum (should read 100%)</th></tr></thead>
        <tbody>
          <tr><td>Solid fuel</td><td>${fmt2(result.ultimate.solidOxygenByDiff)} %</td><td>${fmt2(result.ultimate.solidCheckTotal)} %</td></tr>
          <tr><td>Oil fuel (O₂ + N₂ by diff.)</td><td>${fmt2(result.ultimate.oilOxygenNitrogenByDiff)} %</td><td>${fmt2(result.ultimate.oilCheckTotal)} %</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

// ── Page init ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkDB();
  initUpload();
});