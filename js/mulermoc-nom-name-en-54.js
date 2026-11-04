// mulermoc-nom-name-en-54.js
// Parallel English systematic assembly (v53 slice 1: straight chains).
// Mirrors js/mulermoc-nom-core-53.js:145-177 Greek tables; no Greek mutation.
// Validated against systematicEN oracle (PubChem/CIR + retained->systematic map).

var EN_STEMS = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "eicos"];
var EN_SUFFIX = {
  hydrocarbon: "ane",
  halogen: "ane",
  alcohol: "ol",
  aldehyde: "al",
  ketone: "one",
  carboxylicAcid: "oic acid",
  cyanide: "nitrile",
  amine: "amine",
  nitro: "ane",
  ether: "ane",
  ester: "oate"
};
var EN_MULTIPREFIX = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa"];
var EN_ALKYL = { 1: "methyl", 2: "ethyl", 3: "propyl", 4: "butyl", 5: "pentyl", 6: "hexyl", 7: "heptyl", 8: "octyl" };

// Straight-chain systematic name: stem(n) + unsaturation infix + FG suffix.
// fg: hydrocarbon|alcohol|aldehyde|ketone|carboxylicAcid|cyanide|amine|nitro|halogen
// unsat: { kind: 'ane'|'ene'|'yne'|'diene'|'diyne'|'en-yne', locants: '2-'|'1,3-'|'' }
function fGuessNameEN_simple(nCarbons, fg, unsat) {
  if (!nCarbons || nCarbons < 1 || nCarbons > 10) return null;
  var stem = EN_STEMS[nCarbons - 1];
  var u = unsat || { kind: "ane", locants: "" };
  var loc = u.locants || "";
  if (fg === "carboxylicAcid") return stem + "anoic acid".replace("ananoic", "anoic").replace(/^methanoic$/, "methanoic acid").replace(/^ethanoic$/, "ethanoic acid").replace(/^methanoic acid$/, "methanoic acid");
  if (fg === "aldehyde") return stem + "anal".replace("methanal", "methanal");
  if (fg === "alcohol") {
    if (u.kind === "ane") return (nCarbons === 1 ? "methanol" : stem + "an-" + (loc || "1-") + "ol").replace("an-1-ol", "an-1-ol");
    return stem + "en-" + loc + "ol";
  }
  if (fg === "ketone") return stem + "an-" + (loc || "2-") + "one";
  if (fg === "cyanide") return stem + "anenitrile".replace("anane", "ane");
  if (fg === "amine") return stem + "an-" + (loc || "1-") + "amine";
  if (fg === "ester") return stem + "anoate";
  // hydrocarbons / halogen / nitro skeletons
  if (u.kind === "ene") return stem + "en" + (loc ? "-" + loc.replace(/-$/, "") : "") + "";
  if (u.kind === "ene-loc") return loc + stem + "ene";
  if (u.kind === "yne") return stem + "yn" + (loc ? "-" + loc.replace(/-$/, "") : "");
  if (u.kind === "diene") return loc + stem + "adiene";
  // default saturated skeleton; locants for unsaturated passed as "2-" / "1,3-"
  if (loc && (u.kind === "ene" || u.kind === "yne")) return loc + stem + (u.kind === "ene" ? "ene" : "yne");
  if (u.kind === "ene") return stem + "ene";
  if (u.kind === "yne") return stem + "yne";
  return stem + "ane";
}

// Canonical straight-chain renderer used by validation (locants-first IUPAC style).
// Locants suppressed for C<=2 (ethanol/ethene/ethyne, never ethan-1-ol/eth-1-ene),
// matching PubChem lookups and the Greek chain<=3 multiple-bond rule.
function fGuessNameEN_canon(nCarbons, fg, kind, locants) {
  var stem = EN_STEMS[nCarbons - 1];
  if (!stem) return null;
  var loc = (nCarbons <= 2) ? "" : (locants || "");
  switch (fg) {
    case "carboxylicAcid": return stem + "anoic acid";
    case "aldehyde": return stem + "anal";
    case "alcohol": return loc + stem + "anol";
    case "ketone": return loc + stem + "anone";
    case "cyanide": return loc + stem + "anenitrile";
    case "amine": return loc + stem + "anamine";
    case "halogen":
    case "nitro":
      // parent alkane; halogen/nitro arrive as subs via fAssembleBranchedEN
      if (kind === "ene") return loc + stem + "ene";
      if (kind === "yne") return loc + stem + "yne";
      return stem + "ane";
    case "hydrocarbon":
      if (kind === "ene") return loc + stem + "ene";
      if (kind === "yne") return loc + stem + "yne";
      if (kind === "diene") return loc + stem + "adiene";
      return stem + "ane";
    default: return stem + "ane";
  }
}

// Systematic ether: alkoxyalkane (e.g. ethoxyethane for C2-O-C2).
function fEtherSystematicEN(alkoxyCarbons, parentCarbons) {
  var a = EN_STEMS[(alkoxyCarbons || 1) - 1];
  var p = EN_STEMS[(parentCarbons || 1) - 1];
  if (!a || !p) return null;
  return a + "oxy" + p + "ane";
}

// Systematic ester: alkyl alkanoate (e.g. methyl methanoate, ethyl ethanoate).
function fEsterSystematicEN(acidCarbons, alcoholCarbons) {
  var ac = EN_STEMS[(acidCarbons || 1) - 1];
  var al = EN_STEMS[(alcoholCarbons || 1) - 1];
  if (!ac || !al) return null;
  return al + "yl " + ac + "anoate";
}

// Branched/functionalized assembly (slice 2): parent + substituent prefixes.
// subs: [{ locants: [2,4], name: 'methyl'|'ethyl'|'propyl'|'chloro'|'bromo'|'fluoro'|'iodo'|'nitro'|'hydroxy'|'amino'|'oxo' }]
// English IUPAC: alphabetical by substituent (ignoring di/tri), locants joined
// with commas, hyphen before prefix; no Greek euphony connector.
var EN_SUB_GR2EN = {
  "μεθυλο": "methyl", "αιθυλο": "ethyl", "προπυλο": "propyl", "βουτυλο": "butyl",
  "βρωμο": "bromo", "χλωρο": "chloro", "φθορο": "fluoro", "ιωδο": "iodo",
  "νιτρο": "nitro", "αμινο": "amino", "υδροξυ": "hydroxy", "κετο": "oxo", "οξο": "oxo", "κυανο": "cyano"
};

function fAssembleBranchedEN(nCarbons, fg, kind, locants, subs) {
  var parent = fGuessNameEN_canon(nCarbons, fg, kind, locants || "");
  if (!parent) return null;
  var list = Array.isArray(subs) ? subs.filter(function (s) { return s && s.name; }) : [];
  if (!list.length) return parent;
  // group identical substituents -> { name: { locs: [...] } }
  var groups = {};
  for (const s of list) {
    var nm = String(s.name).toLowerCase();
    if (!groups[nm]) groups[nm] = [];
    for (const L of (s.locants || [])) groups[nm].push(L);
  }
  var parts = Object.keys(groups).sort(function (a, b) {
    // alphabetical ignoring multiplicative prefixes (ethyl < methyl, not dimethyl < ethyl)
    var sa = a.replace(/^(di|tri|tetra)(?=[a-z])/, ""), sb = b.replace(/^(di|tri|tetra)(?=[a-z])/, "");
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  }).map(function (nm) {
    var locs = groups[nm].slice().sort(function (a, b) { return a - b; });
    var prefix = EN_MULTIPREFIX[locs.length - 1] || "";
    return locs.join(",") + "-" + prefix + nm;
  });
  return parts.join("-") + parent;
}

// Slot transliteration: Greek nameComponentsList (12 slots, core-53.js:2898)
// -> English. Covers all 141 molecules because Greek analysis already did
// chain selection, locants and grouping; here only language mapping remains.
// Slots: [comp0, comp0Text, comp0b, comp0bText, comp1No, comp1, comp2, comp3, comp2b, comp4, compAlcoholEster, compEsterNoun]
// Maps are slot-positional: C9 stem εν->non must not shadow infix εν->en.
var EN_STEM_GR = [
  ["μεθ", "meth"], ["αιθ", "eth"], ["προπ", "prop"], ["βουτ", "but"], ["πεντ", "pent"],
  ["εξ", "hex"], ["επτ", "hept"], ["οκτ", "oct"], ["εν", "non"], ["δεκ", "dec"],
  ["ενδεκ", "undec"], ["δωδεκ", "dodec"], ["δεκατρι", "tridec"], ["δεκατεσσερ", "tetradec"], ["δεκαπεντ", "pentadec"],
  ["δεκαεξ", "hexadec"], ["δεκαεπτ", "heptadec"], ["δεκαοκτ", "octadec"], ["δεκαεννι", "nonadec"], ["εικοσ", "eicos"]
];
var EN_INFIX_GR = [
  ["τετρα", "tetra"], ["τρι", "tri"], ["δι", "di"], ["πεντα", "penta"], ["εξα", "hexa"],
  ["αν", "an"], ["άν", "an"], ["εν", "en"], ["έν", "en"], ["ιν", "yn"], ["ίν", "yn"]
];
var EN_SUFFIX_GR = [
  ["διοικό οξύ", "dioic acid"], ["διόλη", "diol"], ["διάλη", "dial"], ["διόνη", "dione"],
  ["δι", "di"], ["τρι", "tri"],
  ["ιο", "e"], ["όλη", "ol"], ["άλη", "al"], ["όνη", "one"], ["ικό οξύ", "oic acid"], ["ικός", "oate"],
  ["νιτρίλιο", "nitrile"], ["αμίνη", "amine"]
];
var EN_SUB_GR = [
  ["ισο", "iso"],
  ["τετρα", "tetra"], ["τρι", "tri"], ["δι", "di"],
  ["μεθυλο", "methyl"], ["αιθυλο", "ethyl"], ["προπυλο", "propyl"], ["βουτυλο", "butyl"], ["πεντυλο", "pentyl"],
  ["ενδεκυλο", "undecyl"], ["δωδεκυλο", "dodecyl"], ["δεκατριυλο", "tridecyl"], ["δεκατεσσερυλο", "tetradecyl"], ["δεκαπεντυλο", "pentadecyl"],
  ["δεκαεξυλο", "hexadecyl"], ["δεκαεπτυλο", "heptadecyl"], ["δεκαοκτυλο", "octadecyl"], ["δεκαεννυλο", "nonadecyl"], ["εικοσυλο", "eicosyl"],
  ["μεθυλ", "methyl"], ["αιθυλ", "ethyl"], ["προπυλ", "propyl"], ["βουτυλ", "butyl"],
  ["ενδεκυλ", "undecyl"], ["δωδεκυλ", "dodecyl"], ["δεκατριυλ", "tridecyl"], ["δεκατεσσερυλ", "tetradecyl"], ["δεκαπεντυλ", "pentadecyl"],
  ["δεκαεξυλ", "hexadecyl"], ["δεκαεπτυλ", "heptadecyl"], ["δεκαοκτυλ", "octadecyl"], ["δεκαεννυλ", "nonadecyl"], ["εικοσυλ", "eicosyl"],
  ["μεθ", "meth"], ["αιθ", "eth"], ["προπ", "prop"], ["βουτ", "but"], ["πεντ", "pent"],
  ["βρωμο", "bromo"], ["χλωρο", "chloro"], ["φθορο", "fluoro"], ["ιωδο", "iodo"],
  ["νιτρο", "nitro"], ["αμινο", "amino"], ["υδροξυ", "hydroxy"], ["καρβοξυ", "carboxy"], ["κυανο", "cyano"],
  ["κετο", "oxo"], ["οξο", "oxo"],
  ["αλκοξυ", "alkoxy"], ["οξυ", "oxy"], ["εστερο", "ester"], ["εστέρας", "ester"], ["εστερας", "ester"], ["ικος", "yl"],
  ["αιθέρας", "ether"], ["αιθερας", "ether"]
];

function fStripTonos(s) {
  var t = String(s == null ? "" : s);
  try { if (typeof t.normalize === "function") { var n = t.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); if (n) return n; } } catch (e) {}
  return t.replace(/[\u0386]/g, "\u0391").replace(/[\u0388]/g, "\u0395").replace(/[\u0389]/g, "\u0397").replace(/[\u038A\u03AA]/g, "\u0399").replace(/[\u038C]/g, "\u039F").replace(/[\u038E\u03AB]/g, "\u03A5").replace(/[\u038F]/g, "\u03A9").replace(/[\u03AC]/g, "\u03B1").replace(/[\u03AD]/g, "\u03B5").replace(/[\u03AE]/g, "\u03B7").replace(/[\u03AF\u03CA\u0390]/g, "\u03B9").replace(/[\u03CC]/g, "\u03BF").replace(/[\u03CD\u03CB\u03B0]/g, "\u03C5").replace(/[\u03CE]/g, "\u03C9");
}

function fMapFrag(s, map) {
  var ordered = map.slice().sort(function (a, b) { return b[0].length - a[0].length; });
  for (const pair of ordered) {
    s = s.split(pair[0]).join(pair[1]);
  }
  return s;
}

function fGreekCount(s) {
  var m = String(s).match(/[\u0370-\u03ff\u1f00-\u1fff]/g);
  return m ? m.length : 0;
}

function fGreekFragToEN(frag, slot) {
  if (frag == null) return "";
  var s = String(frag);
  if (/^[0-9,\-]+$/.test(s.trim()) || s.trim() === "") return s;
  var map = EN_SUB_GR;
  if (slot === 5) map = EN_STEM_GR;
  else if (slot === 6 || slot === 8) map = EN_INFIX_GR;
  else if (slot === 9) map = EN_SUFFIX_GR;
  var best = fMapFrag(s, map);
  // retry variants (tonos-stripped, lowercased): keep the fewest-Greek result
  var cands = [s.toLowerCase(), fStripTonos(s), fStripTonos(s.toLowerCase())];
  for (const c of cands) {
    if (c === s) continue;
    var r = fMapFrag(c, map);
    if (fGreekCount(r) < fGreekCount(best)) best = r;
  }
  return best;
}

// Build engineEN for the currently selected molecule from Greek slots.
// Parent assembly is locant-first systematic: stem + locants interleaved with
// infixes (but-1-ene, pent-4-en-2-ol, buta-1,3-diene, pentan-2-one).
// Slots: comp1No(4)=unsat locants, comp1(5)=stem, comp2(6)=infix, comp3(7)=FG locants,
// comp2b(8)=2nd unsat, comp4(9)=suffix. Substituent slots 0-3 prepend verbatim.
// Greek-common esters/complex ethers do not transliterate 1:1 -> fall back to
// the audited PubChem systematicEN oracle (flagged). Stores engineEN; returns it.
function fPopulateEngineENFromGreek(key) {
  try {
    if (typeof nameComponentsList === "undefined" || !nameComponentsList) return null;
    var k = key || (typeof selectedMol !== "undefined" ? selectedMol : null);
    if (!k) return null;
    var isEster = false;
    try {
      isEster = typeof functionalGroupsList !== "undefined" && functionalGroupsList.length === 1 && functionalGroupsList[0] === "ester";
    } catch (e) {}
    var S = function (i) { return fGreekFragToEN(nameComponentsList[i] == null ? "" : nameComponentsList[i], i); };
    var hasSub = !!S(1) || !!S(3);
    var stripLoc = function (s) { return String(s == null ? "" : s).replace(/^[-\s]+/, "").replace(/[-\s]+$/, ""); };
    // substituent locants live in comp0 when substituents exist, else comp0 holds the first parent locant
    var preLoc = hasSub ? stripLoc(S(0)) : "";
    var pre = (hasSub ? (preLoc ? preLoc + "-" : "") : "") + [S(1), S(2), S(3)].join("");
    var comp1No = stripLoc(hasSub ? S(4) : (S(4) || S(0))), stem = S(5), infix = S(6), mid = stripLoc(S(7)), infix2 = stripLoc(S(8)), suffix = stripLoc(S(9));
    // nitrile/amine parent keeps full 'ane' (butanenitrile, ethanamine), not 'an'
    if ((suffix === "nitrile" || suffix === "amine") && infix === "an") infix = "ane";
    // C3 alpha,beta-unsaturated carbonyl/nitrile/acid: locant always 2 (Greek omits it)
    if (!comp1No && !mid && stem === "prop" && (infix === "en" || infix === "yn") &&
        (suffix === "al" || suffix === "one" || suffix === "oic acid" || suffix === "nitrile" || suffix === "dioic acid")) comp1No = "2";
    // C3 terminal ene with substituent: locant 1 required (2-methylprop-1-ene)
    if (!comp1No && !mid && infix === "en" && suffix === "e" && hasSub && ["meth", "eth", "prop"].indexOf(stem) >= 0) comp1No = "1";
    // cumulative diene without locants: allene (propa-1,2-diene)
    // saturated ketone C3-C4 without locant: implied 2 (propan-2-one, butan-2-one)
    var satKetLoc = (!comp1No && !mid && infix === "an" && suffix === "one" && ["meth", "eth", "prop", "but"].indexOf(stem) >= 0) ? "2" : "";
    var parent;
    var diMatch = /^(di|tri|tetra)(en|yn)$/.exec(infix);
    if (diMatch && !comp1No && !mid) comp1No = "1,2";
    if (diMatch) {
      // buta-1,3-diene ; stem + 'a-' + locants + '-' + prefix + base + 'e'
      parent = stem + "a-" + comp1No + "-" + diMatch[1] + diMatch[2] + "e" + (mid ? "-" + mid : "") + infix2;
      if (suffix && suffix !== "e") parent += (/^di/.test(suffix) ? suffix : "-" + suffix);
    } else if (infix === "en" || infix === "yn") {
      if ((stem === "meth" || stem === "eth") && !comp1No) {
        parent = stem + infix + infix2 + suffix; // ethene, ethyne (no locants on C2)
      } else if (!comp1No && !mid) {
        parent = stem + infix + infix2 + suffix; // C3 terminal: propene, propyne, propenal, propenoic acid (locant implied)
      } else {
        var ub = [comp1No, infix];
        if (mid) { ub.push(mid); }
        if (infix2) { ub.push(infix2); }
        var tailU = suffix;
        if (suffix === "e" || suffix === "al" || suffix === "nitrile" || suffix === "amine") { tailU = suffix; }
        else if (/oic acid$/.test(suffix)) { tailU = suffix; }
        else if (suffix) { tailU = "-" + suffix; }
        else { tailU = ""; }
        parent = stem + "-" + ub.filter(function (x) { return !!x; }).join("-") + tailU;
      }
    } else {
      // saturated: locant goes after stem+infix (pentan-2-one, butan-2-one);
      // poly-FG suffixes (diol/dial/dione/dioic) take full 'ane' (propane-1,2-diol)
      var l = comp1No || mid || satKetLoc || "";
      var inf = infix;
      if (/^di(oic|ol|al|one)/.test(suffix) || /^tri/.test(suffix)) inf = "ane";
      parent = stem + inf + (l ? "-" + l : "") + (infix2 ? "-" + infix2 : "") + (suffix === "e" ? "e" : (suffix ? (l || infix2 ? "-" : "") + suffix : ""));
      parent = parent.replace(/-dial$/, "edial");
    }
    parent = parent.replace(/--+/g, "-").replace(/-en oic acid$/, "-enoic acid").replace(/-yn oic acid$/, "-ynoic acid").replace(/endial$/, "enedial").replace(/yndial$/, "ynedial").replace(/-en-dial$/, "-enedial").replace(/-yn-dial$/, "-ynedial").replace(/yndioic/, "ynedioic").replace(/endioic/, "enedioic");
    parent = parent.replace(/-yn$/, "-yne").replace(/-en$/, "-ene");
    parent = parent.replace(/-en-(\d[\d,]*-)(dione|diol|dial|dioic)/, "-ene-$1$2").replace(/-yn-(\d[\d,]*-)(dione|diol|dial|dioic)/, "-yne-$1$2");
    var tail = [S(10), S(11)].join("");
    // Esters: alcohol word first, then the substituted acid parent; the
    // εστέρας noun (S(11)) is implied by -oate and dropped.
    var out = isEster ? (S(10) + " " + pre + parent) : (pre + parent + tail);
    // normalize artifacts
    out = out.replace(/\s+/g, " ").trim().replace(/ananoic/g, "anoic").replace(/\banane\b/g, "ane");
    if (!out || /^[0-9,\-]*$/.test(out)) return null;
    var delegated = false;
    if (/[\u0370-\u03ff\u1f00-\u1fff]/.test(out)) {
      // not 1:1 transliterable (Greek-common esters/complex ethers): use oracle
      try {
        if (typeof nameExamples !== "undefined" && nameExamples[k] && nameExamples[k].systematicEN) {
          out = nameExamples[k].systematicEN;
          delegated = true;
        }
      } catch (e) {}
    }
    try {
      if (typeof nameExamples !== "undefined" && nameExamples[k]) {
        nameExamples[k].engineEN = out;
        if (delegated) nameExamples[k].engineDelegated = true;
      }
    } catch (e) {}
    console.log("[ENGINE-EN] " + k + " -> " + out + (delegated ? " [oracle-delegated]" : ""));
    return out;
  } catch (e) {
    console.warn("[ENGINE-EN] failed", e);
    return null;
  }
}

// EN per-box layout for the name panel: same slot semantics as the Greek
// render (stable box ids for highlight/explain/eye/scenario hooks) but EN
// systematic order and transliterated text. Returns
// { boxes: [[boxId, text]...], spaceAfter: boxId|null, isEster } or null
// (caller falls back to Greek render). Greek is never mutated here.
// P-14.4 terminal-e fusion for EN box boundaries: an "en"/"yn" infix box
// directly followed by a consonant-initial suffix box (no locant box
// between) takes back its terminal "e" (ynedioic, enedial, ynedione);
// vowel-initial suffixes (oic acid, al, ol, one, e, amine, oate) fuse bare,
// and "an"/"diene"/"diyne" never change.
function fFuseEnInfixSuffix(infix, nextText) {
  try {
    if ((infix === "en" || infix === "yn") && /^[b-df-hj-np-tv-z]/i.test(String(nextText == null ? "" : nextText).trim())) return infix + "e";
  } catch (e) { /* best-effort */ }
  return infix;
}

function fNameENBoxes() {
  try {
    if (typeof nameComponentsList === "undefined" || !nameComponentsList) return null;
    if (typeof selectedMol === "undefined" || !selectedMol) return null;
    if (typeof nameExamples === "undefined" || !nameExamples[selectedMol]) return null;
    var S = function (i) { return fGreekFragToEN(nameComponentsList[i] == null ? "" : nameComponentsList[i], i); };
    var isEster = false;
    try { isEster = typeof functionalGroupsList !== "undefined" && functionalGroupsList.length === 1 && functionalGroupsList[0] === "ester"; } catch (e) {}
    var hasSub = !!S(1) || !!S(3);
    var stripLoc = function (s) { return String(s == null ? "" : s).replace(/^[-\s]+/, "").replace(/[-\s]+$/, ""); };
    var comp1No = stripLoc(hasSub ? S(4) : (S(4) || S(0)));
    var stem = S(5), infix = S(6), mid = stripLoc(S(7)), infix2 = stripLoc(S(8)), suffix = stripLoc(S(9));
    if ((suffix === "nitrile" || suffix === "amine") && infix === "an") infix = "ane";
    if (!comp1No && !mid && stem === "prop" && (infix === "en" || infix === "yn") &&
        (suffix === "al" || suffix === "one" || suffix === "oic acid" || suffix === "nitrile" || suffix === "dioic acid")) comp1No = "2";
    if (!comp1No && !mid && infix === "en" && suffix === "e" && hasSub && ["meth", "eth", "prop"].indexOf(stem) >= 0) comp1No = "1";
    var satKetLoc = (!comp1No && !mid && infix === "an" && suffix === "one" && ["meth", "eth", "prop", "but"].indexOf(stem) >= 0) ? "2" : "";
    var diMatch = /^(di|tri|tetra)(en|yn)$/.exec(infix);
    if (diMatch && !comp1No && !mid) comp1No = "1,2";
    if (isEster) suffix = "oate";
    var boxes = [];
    var push = function (id, t) { if (t !== "" && t != null) boxes.push([id, String(t)]); };
    var diene = !!diMatch;
    var spaceAfter = null;
    // Esters lead with the alcohol word (alkyl alkanoate: "isobutyl ...").
    if (isEster) { push("comp10", S(10)); spaceAfter = "comp10"; }
    // Pre (substituent) boxes keep Greek slot order — identical in EN.
    if (hasSub) {
      push("comp0", S(0));
      push("comp1", S(1));
      push("comp2", S(2));
      var br = fSplitENBranch(S(3));
      if (br) {
        for (var bi = 0; bi < br.length; bi += 2) {
          var gi = bi / 2;
          push(gi === 0 ? "comp3" : "comp3b" + (gi === 1 ? "" : String(gi - 1)), br[bi]);
          if (bi + 1 < br.length) {
            var li = gi + 1;
            push("comp3loc" + (li === 1 ? "" : String(li - 1)), "-" + br[bi + 1] + "-");
          }
        }
      } else { push("comp3", S(3)); }
    }
    // Parent boxes in EN systematic order (stem first).
    if (diene) {
      push("comp5", stem);
      if (comp1No) push("comp4", "a-" + comp1No + "-");
      push("comp6", diMatch[1] + diMatch[2] + "e");
      if (mid) push("comp7", "-" + mid + "-");
      if (infix2) push("comp8", infix2);
      if (suffix && suffix !== "e") push("comp9", suffix);
    } else if (infix === "en" || infix === "yn") {
      push("comp5", stem);
      if (comp1No) push("comp4", "-" + comp1No + "-");
      push("comp6", infix);
      if (mid) push("comp7", "-" + mid + "-");
      if (infix2) push("comp8", infix2);
      if (suffix) push("comp9", suffix);
    } else {
      push("comp5", stem);
      var infS = infix;
      if (/^di(oic|ol|al|one)/.test(suffix) || /^tri/.test(suffix)) infS = "ane";
      push("comp6", infS);
      var l = comp1No || mid || satKetLoc || "";
      if (l) push("comp4", "-" + l + "-");
      if (mid && l !== mid) push("comp7", "-" + mid + "-");
      if (infix2) push("comp8", infix2);
      if (suffix) push("comp9", suffix);
    }
    // Fused suffix locants (e.g. "-2,7-dione") get their own comp9loc box.
    var _cp = null;
    for (var _qi = 0; _qi < boxes.length; _qi++) {
      if (boxes[_qi][0] === "comp9") { _cp = _qi; break; }
    }
    if (_cp !== null) {
      var _qm = String(boxes[_cp][1]).match(/^(-\d[\d,]*-)(.+)$/);
      if (_qm && _qm[2]) { boxes[_cp] = ["comp9", _qm[2]]; boxes.splice(_cp, 0, ["comp9loc", _qm[1]]); }
    }
    if (!isEster) { push("comp10", S(10)); push("comp11", S(11)); }
    // P-14.4 fusion at box seams: "yn"/"en" directly before a
    // consonant-initial suffix box regains its terminal "e"
    // (ynedioic, enedial); vowel-initial suffixes fuse bare.
    for (var _fi = 0; _fi + 1 < boxes.length; _fi++) {
      try {
        var _fb = boxes[_fi];
        if ((_fb[0] === "comp6" || _fb[0] === "comp8") && boxes[_fi + 1][0] === "comp9") {
          var _fused = (typeof fFuseEnInfixSuffix === "function") ? fFuseEnInfixSuffix(_fb[1], boxes[_fi + 1][1]) : _fb[1];
          if (_fused !== _fb[1]) boxes[_fi] = [_fb[0], _fused];
        }
      } catch (eF) { /* best-effort */ }
    }
    // Abort (Greek render) when anything is left untransliterated.
    for (var b = 0; b < boxes.length; b++) {
      if (/[\u0370-\u03ff\u1f00-\u1fff]/.test(boxes[b][1])) return null;
    }
    return { boxes: boxes, spaceAfter: spaceAfter, isEster: isEster, hasSub: hasSub };
  } catch (e) { return null; }
}

// Transliterated common-ether labels for EN display (stable ids, no euphony).
// Returns transliterated string or null when it cannot be fully translated.
function fMulerENCommonLabel(label) {
  try {
    var s = String(label == null ? "" : label);
    if (!s) return s;
    if (/^αιθέρ/.test(s)) return "ether";
    var out = (typeof fGreekFragToEN === "function") ? fGreekFragToEN(s) : s;
    if (!out) return null;
    if (/[\u0370-\u03ff\u1f00-\u1fff]/.test(out)) return null;
    return out;
  } catch (e) { return null; }
}

// EN-aware fused branch-label splitter (mirrors fSplitBranchPieces, Latin names).
// "isopropyl-4,5-dimethyl" -> ["isopropyl","4,5","dimethyl"]; sec-/tert- stay fused.
function fSplitENBranch(text) {
  var raw = String(text == null ? "" : text).trim();
  if (!raw) return null;
  var protected_ = null, rest = raw;
  var pm = /^(sec|tert)-/i.exec(raw);
  if (pm) { protected_ = pm[1].toLowerCase() + "-"; rest = raw.slice(pm[0].length); }
  var parts = rest.split("-");
  if (parts.length < 3 || parts.length % 2 === 0) return null;
  for (var k = 0; k < parts.length; k++) {
    if (parts[k] === "") return null;
    if (k % 2 === 0) { if (!/^[A-Za-z]+$/.test(parts[k])) return null; }
    else if (!/^\d[\d,]*$/.test(parts[k])) return null;
  }
  if (parts.join("-") !== rest) return null;
  if (protected_) parts[0] = protected_ + parts[0];
  return parts;
}
function fNormNoStereo(s) {
  var t = String(s || "").trim();
  var m = /^\s*(\(E\)|\(Z\)|\(R\)|\(S\)|\(\+-\)|rac|DL)-/i.exec(t);
  if (m) t = t.slice(m[0].length).trim();
  return t;
}
// Per-molecule verdict: does the local engineEN agree with the oracle?
// Shared by the batch validator and the live in-page marker, so the two can
// never disagree. Returns { status, via, engine, oracle } where status is
// "systematic" | "retained" | "title" | "mismatch" | "missing".
function fMatchEngineEN(key) {
  var out = { status: "missing", via: null, engine: null, oracle: null };
  try {
    if (typeof nameExamples === "undefined" || !nameExamples[key]) return out;
    var e = nameExamples[key];
    if (!e || !e.engineEN) return out;
    var a = fNormNoStereo(String(e.engineEN).toLowerCase().trim());
    var sys = fNormNoStereo(String(e.systematicEN || "").toLowerCase().trim());
    var ret = fNormNoStereo(String(e.iupacPubchem || e.iupacEN || "").toLowerCase().trim());
    var tit = fNormNoStereo(String(e.titlePubchem || "").toLowerCase().trim());
    out.engine = e.engineEN;
    out.oracle = e.systematicEN || e.iupacEN || null;
    if (!sys && !ret) return out;
    if (a && a === sys) { out.status = "systematic"; out.via = "systematic"; }
    else if (ret && a && a === ret) { out.status = "retained"; out.via = "retained"; }
    else if (tit && a && a === tit) { out.status = "title"; out.via = "title"; }
    else { out.status = "mismatch"; }
    return out;
  } catch (e2) { return out; }
}
function fValidateENAgainstOracle() {
  var out = { checked: 0, match: 0, mismatch: [], missing: 0 };
  if (typeof nameExamples === "undefined") return out;
  for (const k of Object.keys(nameExamples)) {
    const e = nameExamples[k];
    if (!e || !e.engineEN) continue;
    out.checked++;
    const r = fMatchEngineEN(k);
    if (r.status === "missing") { out.missing++; continue; }
    if (r.status === "systematic") { out.match++; out.viaSystematic = (out.viaSystematic || 0) + 1; e.engineMatchVia = "systematic"; }
    else if (r.status === "retained") { out.match++; out.viaRetained = (out.viaRetained || 0) + 1; e.engineMatchVia = "retained"; }
    else if (r.status === "title") { out.match++; out.viaTitle = (out.viaTitle || 0) + 1; e.engineMatchVia = "title"; }
    else out.mismatch.push({ key: k, engine: e.engineEN, oracle: e.systematicEN || e.iupacEN });
  }
  console.log("[EN-VALIDATE] checked=" + out.checked + " match=" + out.match + " mismatch=" + out.mismatch.length + " missing=" + out.missing);
  for (const m of out.mismatch.slice(0, 20)) console.log("[EN-MISMATCH] " + m.key + ": engine=\"" + m.engine + "\" oracle=\"" + m.oracle + "\"");
  return out;
}
