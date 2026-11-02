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
// Covers C1-C2 acids/aldehydes + common ester alkyl-alkanoate pairs.
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
  if (fIsSystematicName(raw)) return raw;
  if (/^(meth|eth|prop|but|pent|hex|hept|oct|non|dec)(ane|ene|yne|anol|anone|anal|oic acid|dioic acid|anenitrile|diol|dial|dione|anoate)$/i.test(low)) return raw || null;
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
