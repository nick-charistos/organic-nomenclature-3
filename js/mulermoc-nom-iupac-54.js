// mulermoc-nom-iupac-54.js
// v53 PubChem/CIR English-IUPAC layer (additive, dev-only for now).
// - Primary oracle: PubChem PUG REST (CID + IUPACName + Title).
// - Fallback: NCI/CADD CIR /iupac_name (plain text).
// - Future path: SMILES-only imports + JSME user drawings -> IUPAC + 3D SDF.
// No auto-run at boot (rate limits); call from console:
//   await fFetchIUPAC_EN("CCO")
//   await fEnrichMolWithIUPAC("ethane")
//   await fEnrichAllWithPubChem({ limit: 5 })
//   await fEnrichFromJSME()

function fEncodeSMILESForURL(smiles) {
  // encodeURIComponent already escapes '#' -> %23, required by CIR/PUG.
  return encodeURIComponent(String(smiles || "").trim());
}

// Retained (PubChem preferred) -> school systematic. P3-owned; extend on review.
// Covers C1-C2 acids/aldehydes + common ester alkyl-alkanoate pairs, plus the
// general retained-ester pattern in fResolveSystematicEN below (Blue Book:
// functional-class PINs keep retained acid stems — formate/acetate — while
// the engine builds systematic alkyl alkanoates).
var RETAINED_TO_SYSTEMATIC_EN = {
  "formic acid": "methanoic acid",
  "acetic acid": "ethanoic acid",
  "formaldehyde": "methanal",
  "acetaldehyde": "ethanal",
  "propionaldehyde": "propanal",
  "butyraldehyde": "butanal",
  "methyl formate": "methyl methanoate",
  "ethyl formate": "ethyl methanoate",
  "methyl acetate": "methyl ethanoate",
  "ethyl acetate": "ethyl ethanoate",
  "acetone": "propan-2-one",
  "acetic aldehyde": "ethanal",
  "acetonitrile": "ethanenitrile",
  "propionitrile": "propanenitrile",
  "acrylonitrile": "prop-2-enenitrile",
  "methacrylonitrile": "2-methylprop-2-enenitrile",
  "propionic acid": "propanoic acid",
  "butyric acid": "butanoic acid",
  "isobutyric acid": "2-methylpropanoic acid",
  "pivalic acid": "2,2-dimethylpropanoic acid",
  "acetylene": "ethyne",
  "allene": "propa-1,2-diene"
};

function fIsSystematicName(t) {
  var s = String(t || "").trim();
  if (!s || s.indexOf(",") >= 0) return false;
  if (/^(methanal|ethanal|propanal|butanal|pentanal|methanol|ethanol|acetone|propan-2-one|butan-2-one|methanoic acid|ethanoic acid|propanoic acid|butanoic acid)$/i.test(s)) return true;
  // Systematic esters need no locants (methyl methanoate, propenoate salts):
  // anything ending in anoate/enoate/ynoate/dioate is systematic by construction
  // (retained formate/acetate do not match).
  if (/(anoate|enoate|ynoate|dioate)$/i.test(s)) return true;
  return /\d/.test(s) && /(ane|ene|yne|anol|anone|anal|oic acid|dioic acid|anenitrile|anamine|diol|dial|dione|anoate)$/i.test(s);
}

function fResolveSystematicEN(iupacRaw, title, synonyms) {
  // strip PubChem contaminations: appended synonyms ("butanal   n-butyraldehyde", "pentanal (valeraldehyde)")
  var raw = String(iupacRaw || "").split(/\s\s+/)[0].replace(/\s*\(.*\)\s*$/, "").trim();
  var low = raw.toLowerCase();
  if (RETAINED_TO_SYSTEMATIC_EN[low]) return RETAINED_TO_SYSTEMATIC_EN[low];
  // General retained ester-acid stems (Blue Book: functional-class PINs keep
  // retained acid names — formate/acetate/propionate/butyrate — while the
  // systematic engine builds alkyl alkanoates). Covers every alkyl variant
  // (tert-butyl formate, propan-2-yl acetate, phenyl acetate...) without
  // enumerating pairs. Runs before the systematic shape checks so a mapped
  // systematic name is never overridden by them.
  var _est = /^(.*)\s+(formate|acetate|propionate|butyrate)$/i.exec(raw);
  if (_est && _est[1]) {
    var _acid = { formate: "methanoate", acetate: "ethanoate", propionate: "propanoate", butyrate: "butanoate" };
    var _sys = _acid[String(_est[2]).toLowerCase()];
    if (_sys) return (_est[1] + " " + _sys).trim();
  }
  if (fIsSystematicName(raw)) return raw;
  if (/^(meth|eth|prop|but|pent|hex|hept|oct|non|dec|undec|dodec|tridec|tetradec|pentadec|hexadec|heptadec|octadec|nonadec|icos)(ane|ene|yne|anol|anone|anal|oic acid|dioic acid|anenitrile|diol|dial|dione|anoate)$/i.test(low)) return raw || null;
  const pool = Array.isArray(synonyms) ? synonyms : [];
  // Prefer a locanted systematic synonym; skip inverted-index entries ("propanal, 2-methyl-").
  for (const s of pool) {
    const t = String(s || "").trim();
    if (!t || t.toLowerCase() === low) continue;
    if (fIsSystematicName(t)) return t;
  }
  return raw || null;
}

async function fFetchSynonyms_PubChem(smilesOrCid, opts) {
  const o = opts || {};
  const by = o.by === "cid" ? "cid" : "smiles";
  const enc = fEncodeSMILESForURL(smilesOrCid);
  if (!enc) return [];
  const base =
    by === "cid"
      ? "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + enc
      : "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/" + enc;
  const res = await fetch(base + "/synonyms/JSON", {
    headers: { Accept: "application/json" }
  });
  if (!res.ok) return [];
  const data = await res.json();
  const info =
    (data && data.InformationList && data.InformationList.Information) || [];
  return (info[0] && info[0].Synonym) || [];
}

async function fFetchIUPAC_EN_PubChem(smiles) {
  const enc = fEncodeSMILESForURL(smiles);
  if (!enc) throw new Error("empty SMILES");
  const url =
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/" +
    enc +
    "/property/IUPACName,Title,CanonicalSMILES,ConnectivitySMILES/JSON";
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("PubChem " + res.status + " for " + smiles);
  const data = await res.json();
  const props =
    (data && data.PropertyTable && data.PropertyTable.Properties) || [];
  if (!props.length) throw new Error("PubChem: no properties for " + smiles);
  const p = props[0];
  return {
    source: "pubchem",
    cid: p.CID || null,
    iupac: p.IUPACName || null,
    title: p.Title || null,
    canonicalSmiles: p.CanonicalSMILES || p.ConnectivitySMILES || null,
  };
}

async function fFetchIUPAC_EN_CIR(smiles) {
  const enc = fEncodeSMILESForURL(smiles);
  if (!enc) throw new Error("empty SMILES");
  const url =
    "https://cactus.nci.nih.gov/chemical/structure/" + enc + "/iupac_name";
  const res = await fetch(url, { headers: { Accept: "text/plain" } });
  if (!res.ok) throw new Error("CIR " + res.status + " for " + smiles);
  const text = (await res.text()).trim();
  if (!text || /^404|error/i.test(text))
    throw new Error("CIR: no name for " + smiles);
  return { source: "cir", cid: null, iupac: text, title: null };
}

// Debug helper: verbose oracle logs only with ?debug or window.MULER_DEBUG.
// Failures stay console.warn (always visible); success chatter is gated.
function fMulerDebugLog() {
  try {
    if (typeof window !== "undefined" && window.MULER_DEBUG) {
      console.log.apply(console, arguments);
    }
  } catch (e) {}
}

// Shared OC throttle gate (10 req/s/IP documented limit): serialize
// OpenClatura fetches with a minimum gap. Both callers (select path +
// draft preview) funnel through fFetchIUPAC_OC, so gating here covers all.
var __mulerOCGate = { last: 0, chain: Promise.resolve() };
function fOCGateWait() {
  var wait = 0;
  try {
    var now = Date.now();
    wait = 150 - (now - __mulerOCGate.last);
    if (!(wait > 0)) wait = 0;
  } catch (eG) { wait = 0; }
  var p = null;
  try {
    p = __mulerOCGate.chain.then(function () {
      if (wait > 0) return new Promise(function (r) { setTimeout(r, wait); });
      return null;
    });
  } catch (eC) { p = Promise.resolve(); }
  try {
    __mulerOCGate.chain = p.catch(function () {}).then(function () {});
  } catch (eS) {}
  return p;
}

// Second oracle: OpenClatura rule-built systematic EN (deterministic Blue
// Book, MIT; https://openclatura.org/llms.txt). Speaks where record-lookup
// oracles go silent (novel molecules). Display + second-opinion only — never
// auto-corrects engine names (PIN/systematic vs school conventions differ by
// design; P3 decides). Query form (/name?smiles=) is backslash-safe per their
// encoding notes; format=json carries name + opsin_check + rules_hit.
// One attempt, fail-soft; throttled internally (150ms gap), 8s timeout;
// callers distinguish "unnameable" (no-answer) from transport errors via
// the thrown message. Success chatter gated behind window.MULER_DEBUG.
async function fFetchIUPAC_OC(smiles, opts) {
  const raw = String(smiles || "").trim();
  if (!raw) throw new Error("empty SMILES");
  const o = opts || {};
  const timeoutMs = typeof o.timeoutMs === "number" ? o.timeoutMs : 8000;
  try { await fOCGateWait(); } catch (eG) {}
  try { __mulerOCGate.last = Date.now(); } catch (eL) {}
  const url =
    "https://openclatura.org/name?smiles=" + encodeURIComponent(raw) + "&verify=0&format=json";
  var ctrl = null, timer = null;
  try {
    if (typeof AbortController !== "undefined") {
      ctrl = new AbortController();
      timer = setTimeout(function () { try { ctrl.abort(); } catch (eA) {} }, timeoutMs);
    }
  } catch (eC) { ctrl = null; }
  var res = null;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: ctrl ? ctrl.signal : undefined,
    });
  } catch (eF) {
    try { if (timer) clearTimeout(timer); } catch (eT) {}
    var em = String((eF && eF.name) || "");
    if (/abort/i.test(em)) throw new Error("OpenClatura timeout for " + raw);
    throw new Error("OpenClatura network error for " + raw + ": " + String((eF && eF.message) || eF));
  }
  try { if (timer) clearTimeout(timer); } catch (eT2) {}
  if (!res.ok) throw new Error("OpenClatura " + res.status + " for " + raw);
  const data = await res.json();
  if (!data || data.ok !== true || !data.name) {
    throw new Error("OpenClatura: unnameable (" + ((data && data.error) || raw) + ")");
  }
  var opsin = null;
  try { opsin = (data.opsin_check && data.opsin_check.status) || null; } catch (eO) {}
  var rules = null;
  try { rules = data.rules_hit || null; } catch (eR) {}
  try {
    if (data.smiles && data.smiles !== raw) fMulerDebugLog("[OC] echo differs sent=" + raw + " got=" + data.smiles);
  } catch (eE) {}
  fMulerDebugLog("[OC] SMILES=" + raw + " -> \"" + data.name + "\" (opsin " + (opsin || "?") + ")");
  return { source: "openclatura", name: String(data.name), opsin: opsin, rulesHit: rules, echoSmiles: data.smiles || null };
}

async function fFetchIUPAC_EN(smiles, opts) {
  const o = opts || {};
  const retryMs = typeof o.retryMs === "number" ? o.retryMs : 800;
  let result = null;
  try {
    result = await fFetchIUPAC_EN_PubChem(smiles);
  } catch (ePub) {
    // back off before CIR: rapid PubChem misses otherwise throttle the fallback
    try { await fSleepMs(retryMs); } catch (e) {}
    try {
      result = await fFetchIUPAC_EN_CIR(smiles);
    } catch (eCir) {
      try { await fSleepMs(retryMs); } catch (e) {}
      try {
        result = await fFetchIUPAC_EN_CIR(smiles);
      } catch (eCir2) {
        console.warn("[IUPAC-EN] lookup failed SMILES=" + smiles, ePub, eCir2);
        return { source: "none", cid: null, iupac: null, title: null, systematic: null, synonyms: [], lastErr: String((ePub && ePub.message) || ePub) + " / " + String((eCir2 && eCir2.message) || eCir2) };
      }
    }
  }
  // Raw retained name stays in .iupac; systematic resolved via map + synonyms.
  let synonyms = [];
  try {
    synonyms = await fFetchSynonyms_PubChem(
      result.cid ? String(result.cid) : smiles,
      { by: result.cid ? "cid" : "smiles" }
    );
  } catch (eSyn) {
    synonyms = [];
  }
  const systematic = fResolveSystematicEN(result.iupac, result.title, synonyms);
  result.iupacPubchem = result.iupac || null;
  result.systematic = systematic || null;
  result.synonyms = synonyms || [];
  // Canonical SMILES rides along from the PUG payload (no extra request);
  // consumers (skeletal depict input, info panel) read it off the hit.
  try { result.canonicalSmiles = result.canonicalSmiles || null; } catch (eC) {}
  console.log(
    "[IUPAC-EN] SMILES=" +
      smiles +
      " -> retained=\"" +
      result.iupac +
      "\" systematic=\"" +
      systematic +
      "\" (via " +
      result.source +
      (result.cid ? ", CID " + result.cid : "") +
      ")"
  );
  return result;
}

// 3D SDF for the future SMILES-only import path. PubChem returns 404 when
// a compound has no 3D conformer — callers must treat null as "no 3D".
async function fFetchSDF3D_PubChem(smilesOrCid, opts) {
  const o = opts || {};
  const by = o.by === "cid" ? "cid" : "smiles";
  const enc = fEncodeSMILESForURL(smilesOrCid);
  if (!enc) throw new Error("empty identifier");
  const base =
    by === "cid"
      ? "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + enc
      : "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/" + enc;
  const url = base + "/SDF?record_type=3d";
  const res = await fetch(url, { headers: { Accept: "chemical/x-mdl-sdfile" } });
  if (res.status === 404) {
    console.log("[SDF-3D] no 3D conformer for " + smilesOrCid);
    return null;
  }
  if (!res.ok) throw new Error("PubChem SDF " + res.status);
  const sdf = await res.text();
  console.log(
    "[SDF-3D] fetched " + (sdf ? sdf.length : 0) + " chars for " + smilesOrCid
  );
  return sdf || null;
}

function fSleepMs(ms) {
  return new Promise(function (r) {
    setTimeout(r, ms);
  });
}

// Enrich one stored molecule: SMILES -> retained IUPAC + systematic target (+optional 3D SDF).
// Writes entry.iupacPubchem (verbatim) / entry.systematicEN (school target) /
// entry.iupacEN (= systematic, back-compat) / .pubchemCID / .iupacSource / .titlePubchem
// (and .sdf3D when asked). Human authors validate where systematic != retained.
async function fEnrichMolWithIUPAC(key, opts) {
  const o = opts || {};
  if (typeof nameExamples === "undefined" || !nameExamples[key]) {
    console.warn("[IUPAC-EN] unknown molecule key: " + key);
    return null;
  }
  const entry = nameExamples[key];
  if (!entry.smiles) {
    console.warn("[IUPAC-EN] no SMILES cached for " + key + " (open v53 once first)");
    return null;
  }
  const hit = await fFetchIUPAC_EN(entry.smiles);
  entry.iupacPubchem = hit.iupacPubchem || hit.iupac || null;
  entry.titlePubchem = hit.title || null;
  entry.systematicEN = hit.systematic || null;
  entry.iupacEN = entry.systematicEN || entry.iupacPubchem || null;
  entry.pubchemCID = hit.cid || entry.pubchemCID || null;
  entry.canonicalSmiles = hit.canonicalSmiles || entry.canonicalSmiles || null;
  entry.iupacSource = hit.source || "none";
  try { entry.iupacErr = hit.lastErr || null; } catch (eI) {}
  entry.needsHumanCheck =
    !!entry.iupacPubchem &&
    !!entry.systematicEN &&
    entry.iupacPubchem.toLowerCase() !== entry.systematicEN.toLowerCase();
  if (o.fetchSDF3D && hit.iupac) {
    try {
      entry.sdf3D = await fFetchSDF3D_PubChem(entry.smiles);
    } catch (e) {
      console.warn("[SDF-3D] failed for " + key, e);
      entry.sdf3D = entry.sdf3D || null;
    }
  }
  console.log(
    "[IUPAC-EN] " + key + ": SMILES=" + entry.smiles + " retained=\"" +
      entry.iupacPubchem + "\" systematic=\"" + entry.systematicEN + "\"" +
      (entry.needsHumanCheck ? " [NEEDS-HUMAN-CHECK]" : "")
  );
  return entry;
}

// Batch enrichment with throttling (PubChem ~5 req/s). Sequential on purpose.
async function fEnrichAllWithPubChem(opts) {
  const o = opts || {};
  const delayMs = typeof o.delayMs === "number" ? o.delayMs : 400;
  const limit = typeof o.limit === "number" ? o.limit : Infinity;
  const onlyMissing = o.onlyMissing !== false;
  const fetchSDF3D = !!o.fetchSDF3D;
  if (typeof nameExamples === "undefined") {
    console.warn("[IUPAC-EN] nameExamples not loaded yet");
    return { done: 0, failed: 0 };
  }
  const keys = Object.keys(nameExamples).slice(0, limit);
  let done = 0,
    failed = 0,
    skipped = 0;
  for (const k of keys) {
    const e = nameExamples[k];
    if (!e || !e.smiles) {
      skipped++;
      continue;
    }
    if (onlyMissing && e.iupacEN) {
      skipped++;
      continue;
    }
    try {
      await fEnrichMolWithIUPAC(k, { fetchSDF3D: fetchSDF3D });
      done++;
    } catch (err) {
      failed++;
      console.warn("[IUPAC-EN] failed " + k, err);
    }
    await fSleepMs(delayMs);
  }
  console.log(
    "[IUPAC-EN] batch done=" + done + " failed=" + failed + " skipped=" + skipped
  );
  return { done: done, failed: failed, skipped: skipped };
}

// Future SMILES-only / JSME-drawing import path:
// current drawing -> SMILES -> IUPAC + 3D SDF, all console-logged.
async function fEnrichFromJSME(opts) {
  const o = opts || {};
  const fetchSDF3D = o.fetchSDF3D !== false;
  let smiles = null;
  try {
    if (
      typeof jsmeNomeclatureApplet !== "undefined" &&
      jsmeNomeclatureApplet
    ) {
      if (typeof jsmeNomeclatureApplet.getSmiles === "function")
        smiles = jsmeNomeclatureApplet.getSmiles();
      else if (typeof jsmeNomeclatureApplet.smiles === "function")
        smiles = jsmeNomeclatureApplet.smiles();
    }
  } catch (e) {
    console.warn("[IUPAC-EN] JSME getSmiles failed", e);
  }
  if (!smiles) {
    console.warn("[IUPAC-EN] no SMILES from JSME drawing");
    return { smiles: null, iupac: null, systematic: null, sdf3D: null };
  }
  const hit = await fFetchIUPAC_EN(smiles);
  let sdf3D = null;
  if (fetchSDF3D) {
    try {
      sdf3D = await fFetchSDF3D_PubChem(smiles);
    } catch (e) {
      console.warn("[SDF-3D] JSME fetch failed", e);
    }
  }
  return { smiles: smiles, iupac: hit.iupacPubchem || hit.iupac, systematic: hit.systematic, cid: hit.cid, sdf3D: sdf3D };
}

// v53 select-log: called from fSelectMol() on every selection.
// Sync log first (key + cached SMILES/systematic), then fire-and-forget fetch
// only when systematic is missing. Pending-guard avoids parallel storms when
// stepping quickly through menus/scenarios.
var __mulerIupacPending = {};
var __mulerOCPending = {};
// OpenClatura second-oracle fetch on selection (fire-and-forget, like the
// PubChem path above but lighter: one attempt, no synonyms round). Cached on
// the entry; the info panel repaints via the molecule-guarded refresh.
function fLogMolSelectWithOC(key) {
  let entry = null;
  try {
    entry =
      typeof nameExamples !== "undefined" ? nameExamples[key] : null;
  } catch (e) {
    entry = null;
  }
  if (!entry) return;
  const smiles = (entry.canonicalSmiles || entry.smiles) || null;
  if (typeof window !== "undefined" && window.MULER_QUIET_FETCH) return;
  if (!smiles || entry.openclaturaDone || __mulerOCPending[key]) return;
  __mulerOCPending[key] = true;
  fFetchIUPAC_OC(smiles)
    .then(function (oc) {
      try {
        if (entry) {
          entry.openclaturaEN = (oc && oc.name) || null;
          entry.openclaturaOpsin = (oc && oc.opsin) || null;
          entry.openclaturaDone = true;
          entry.openclaturaErr = false;
        }
      } catch (eStore) { /* cache best-effort */ }
      try { if (typeof fMulerMolInfoRefresh === "function") fMulerMolInfoRefresh(key); } catch (eMI) {}
      try { if (typeof fMulerOCFetchDone === "function") fMulerOCFetchDone(key); } catch (eOC) {}
    })
    .catch(function (err) {
      try { console.warn("[OC] select-fetch failed " + key, err); } catch (eL) {}
      // Distinguish genuine no-answer (unnameable/4xx payload → quiet amber)
      // from transport errors (timeout/network → lavender error state).
      var _noAns = false;
      try { _noAns = /unnameable/i.test(String((err && err.message) || err)); } catch (eM) {}
      try { if (entry) { entry.openclaturaDone = true; entry.openclaturaEN = null; entry.openclaturaErr = !_noAns; } } catch (eF) {}
      try { if (typeof fMulerMolInfoRefresh === "function") fMulerMolInfoRefresh(key); } catch (eMI2) {}
      try { if (typeof fMulerOCFetchDone === "function") fMulerOCFetchDone(key); } catch (eOC2) {}
    })
    .finally(function () {
      __mulerOCPending[key] = false;
    });
}
function fLogMolSelectWithIUPAC(key) {
  let entry = null;
  try {
    entry =
      typeof nameExamples !== "undefined" ? nameExamples[key] : null;
  } catch (e) {
    entry = null;
  }
  const smiles = (entry && entry.smiles) || null;
  const cached = (entry && (entry.systematicEN || entry.iupacEN)) || null;
  console.log(
    "[SELECT] mol=" +
      key +
      " SMILES=" +
      (smiles || "n/a") +
      " SYSTEMATIC_EN=" +
      (cached || "fetching…") +
      (entry && entry.iupacPubchem ? " (retained=\"" + entry.iupacPubchem + "\")" : "")
  );
  if (typeof window !== "undefined" && window.MULER_QUIET_FETCH) return;
  if (!smiles || cached || __mulerIupacPending[key]) return;
  __mulerIupacPending[key] = true;
  fFetchIUPAC_EN(smiles)
    .then(function (hit) {
      try {
        if (entry) {
          entry.iupacPubchem = hit.iupacPubchem || hit.iupac || null;
          entry.titlePubchem = hit.title || null;
          entry.systematicEN = hit.systematic || null;
          entry.iupacEN = entry.systematicEN || entry.iupacPubchem || null;
          entry.pubchemCID = hit.cid || entry.pubchemCID || null;
          entry.iupacSource = hit.source || "none";
          entry.needsHumanCheck =
            !!entry.iupacPubchem &&
            !!entry.systematicEN &&
            entry.iupacPubchem.toLowerCase() !== entry.systematicEN.toLowerCase();
          entry.iupacFetchDone = true;
          // Distinguish "no record" (amber) from "lookup failed" (lavender):
          // only transport-level errors count as failed when nothing came back.
          try {
            var _le = String((hit && hit.lastErr) || "");
            var _hasO = !!(entry.systematicEN || entry.iupacEN || entry.iupacPubchem || entry.titlePubchem);
            entry.iupacFetchError = !_hasO && /failed to fetch|networkerror|load failed|typeerror|timeout|abort/i.test(_le);
          } catch (eFE) {}
        }
      } catch (eStore) {
        /* cache best-effort */
      }
      console.log(
        "[IUPAC-EN] " + key + ": SMILES=" + smiles + " retained=\"" +
          hit.iupacPubchem + "\" systematic=\"" + hit.systematic + "\"" +
          (entry && entry.needsHumanCheck ? " [NEEDS-HUMAN-CHECK]" : "")
      );
      try { if (typeof fMulerENFetchDone === "function") fMulerENFetchDone(key); } catch (eH) {}
      try { if (typeof fMulerMolInfoRefresh === "function") fMulerMolInfoRefresh(key); } catch (eMI) {}
      try { if (typeof fMulerOCFetchDone === "function") fMulerOCFetchDone(key); } catch (eOC) {}
    })
    .catch(function (err) {
      console.warn("[IUPAC-EN] select-fetch failed " + key, err);
      try { if (entry) { entry.iupacFetchDone = true; entry.iupacFetchError = true; } } catch (eF) {}
      try { if (typeof fMulerENFetchDone === "function") fMulerENFetchDone(key); } catch (eH2) {}
      try { if (typeof fMulerMolInfoRefresh === "function") fMulerMolInfoRefresh(key); } catch (eMI2) {}
    })
    .finally(function () {
      __mulerIupacPending[key] = false;
    });
}
