// mulermoc-nom-name-en-54.js
// Parallel English systematic assembly (v54: straight-chain to C20).
// Mirrors js/mulermoc-nom-core-54.js Greek tables; no Greek mutation.
// Validated against systematicEN oracle (PubChem/CIR + retained->systematic map).

var EN_STEMS = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
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
var EN_MULTIPREFIX = ["", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca", "undeca", "dodeca", "trideca", "tetradeca", "pentadeca", "hexadeca", "heptadeca", "octadeca", "nonadeca", "icosa"];
var EN_ALKYL = { 1: "methyl", 2: "ethyl", 3: "propyl", 4: "butyl", 5: "pentyl", 6: "hexyl", 7: "heptyl", 8: "octyl", 9: "nonyl", 10: "decyl", 11: "undecyl", 12: "dodecyl", 13: "tridecyl", 14: "tetradecyl", 15: "pentadecyl", 16: "hexadecyl", 17: "heptadecyl", 18: "octadecyl", 19: "nonadecyl", 20: "icosyl" };

// Straight-chain systematic name: stem(n) + unsaturation infix + FG suffix.
// fg: hydrocarbon|alcohol|aldehyde|ketone|carboxylicAcid|cyanide|amine|nitro|halogen
// unsat: { kind: 'ane'|'ene'|'yne'|'diene'|'diyne'|'en-yne', locants: '2-'|'1,3-'|'' }
function fGuessNameEN_simple(nCarbons, fg, unsat) {
  if (!nCarbons || nCarbons < 1 || nCarbons > EN_STEMS.length) return null;
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
  ["δεκαεξ", "hexadec"], ["δεκαεπτ", "heptadec"], ["δεκαοκτ", "octadec"], ["δεκαεννι", "nonadec"], ["εικοσ", "icos"]
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
  ["δεκαεξυλο", "hexadecyl"], ["δεκαεπτυλο", "heptadecyl"], ["δεκαοκτυλο", "octadecyl"], ["δεκαεννυλο", "nonadecyl"], ["εικοσυλο", "icosyl"],
  ["μεθυλ", "methyl"], ["αιθυλ", "ethyl"], ["προπυλ", "propyl"], ["βουτυλ", "butyl"],
  ["ενδεκυλ", "undecyl"], ["δωδεκυλ", "dodecyl"], ["δεκατριυλ", "tridecyl"], ["δεκατεσσερυλ", "tetradecyl"], ["δεκαπεντυλ", "pentadecyl"],
  ["δεκαεξυλ", "hexadecyl"], ["δεκαεπτυλ", "heptadecyl"], ["δεκαοκτυλ", "octadecyl"], ["δεκαεννυλ", "nonadecyl"], ["εικοσυλ", "icosyl"],
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
// variant "sys": systematic substituent forms (retained -> systematic map +
// P-16.3.4(a) parens); stored separately as engineEN_sys, no delegation.
function fPopulateEngineENFromGreek(key, variant) {
  try {
    if (typeof nameComponentsList === "undefined" || !nameComponentsList) return null;
    var k = key || (typeof selectedMol !== "undefined" ? selectedMol : null);
    if (!k) return null;
    var sys = (variant === "sys");
    var isEster = false;
    try {
      isEster = typeof functionalGroupsList !== "undefined" && functionalGroupsList.length === 1 && functionalGroupsList[0] === "ester";
    } catch (e) {}
    var S = function (i) {
      var t = fGreekFragToEN(nameComponentsList[i] == null ? "" : nameComponentsList[i], i);
      if (sys) t = fSystematicSubstSlot(i, t);
      return t;
    };
    var SchJ = function (i) {
      return fGreekFragToEN(nameComponentsList[i] == null ? "" : nameComponentsList[i], i);
    };
    var hasSub = !!S(1) || !!S(3);
    var stripLoc = function (s) { return String(s == null ? "" : s).replace(/^[-\s]+/, "").replace(/[-\s]+$/, ""); };
    // substituent locants live in comp0 when substituents exist, else comp0 holds the first parent locant
    var preLoc = hasSub ? stripLoc(S(0)) : "";
    var preLoc2 = hasSub ? stripLoc(S(2)) : "";
    // EN-alphabetical substituent order (P-14.5.1/2): v54.21 two-group swap
    // (kept as the legacy fallback below) + v54.41 full group order. The
    // swap compares whole-slot keys; the sorter below orders every group
    // (slot-1 + slot-3 pieces) by displayed name. Bounded to the clean case
    // (both groups carry locants); otherwise keep Greek order.
    var _swapSub = false;
    try {
      var _sk1 = fENSubstSortKey(S(1)), _sk3 = fENSubstSortKey(S(3));
      _swapSub = !!(_sk1 && _sk3 && preLoc && preLoc2 && _sk3 < _sk1);
    } catch (eSw) { _swapSub = false; }
    // Systematic display forms with locant-preceded parens (v54.40): W1/W3/W10
    // mirror the sys box texts so joined engineEN_sys matches the panel boxes.
    // Unwrapped S(1)/S(3) stay the sort-key/swap inputs above (parens strip out
    // of fENSubstSortKey anyway); slots keep bare forms.
    var W1 = S(1), W3 = S(3), W10 = S(10);
    if (sys && typeof fENSysNeedsParens === "function") {
      try {
        var C0 = fGreekFragToEN(nameComponentsList[0] == null ? "" : nameComponentsList[0], 0);
        var C1 = fGreekFragToEN(nameComponentsList[1] == null ? "" : nameComponentsList[1], 1);
        var C2 = fGreekFragToEN(nameComponentsList[2] == null ? "" : nameComponentsList[2], 2);
        var C3 = fGreekFragToEN(nameComponentsList[3] == null ? "" : nameComponentsList[3], 3);
        var C9 = fGreekFragToEN(nameComponentsList[9] == null ? "" : nameComponentsList[9], 9);
        var C10 = fGreekFragToEN(nameComponentsList[10] == null ? "" : nameComponentsList[10], 10);
        if (fENSysNeedsParens(W1, C1, C0)) W1 = "(" + W1 + ")";
        var _jfp = (typeof fSplitENBranchSys === "function") ? fSplitENBranchSys(C3, S(3), 3) : null;
        if (_jfp) {
          var _jp = _jfp.sys.slice();
          for (var _jk = 0; _jk < _jp.length; _jk += 2) {
            var _jprev = (_jk === 0) ? C2 : _jp[_jk - 1];
            if (fENSysNeedsParens(_jp[_jk], _jfp.com[_jk], _jprev)) _jp[_jk] = "(" + _jp[_jk] + ")";
          }
          W3 = _jp.join("-");
        } else if (fENSysNeedsParens(W3, C3, C2)) W3 = "(" + W3 + ")";
        if (fENSysNeedsParens(W10, C10, isEster ? "" : C9)) W10 = "(" + W10 + ")";
      } catch (eW) { W1 = S(1); W3 = S(3); W10 = S(10); }
    }
    // v54.41 full group order (mirrors the boxes): G1 + slot-3 pieces sorted
    // by displayed name. Null = legacy pre assembly below (single group,
    // original order, or a non-first group without digit locants).
    var _jgroups = (typeof fENSubstGroups === "function") ? fENSubstGroups(S, SchJ, sys) : [];
    var _jord = (typeof fENSortSubstGroups === "function") ? fENSortSubstGroups(_jgroups) : null;
    if (_jord) {
      try {
        var _jg1 = -1;
        for (var _jq = 0; _jq < _jord.length; _jq++) { if (_jgroups[_jord[_jq]].kind === "g1") { _jg1 = _jq; break; } }
        if (_jg1 > 0 && _jg1 < _jord.length - 1) _jord = null;
      } catch (eJQ) { _jord = null; }
    }
    var pre;
    if (_jord) {
      pre = "";
      var _je = false;
      for (var _ji = 0; _ji < _jord.length; _ji++) {
        var _jg = _jgroups[_jord[_ji]];
        var _jl = stripLoc(_jg.loc);
        var _jt = _jl ? ((_je ? "-" : "") + _jl + "-") : "";
        var _jn = _jg.name;
        if (sys && typeof fENSysNeedsParens === "function") {
          try { if (fENSysNeedsParens(_jn, _jg.com, _jg.loc)) _jn = "(" + _jn + ")"; } catch (ePPj) {}
        }
        pre += _jt + _jn; _je = true;
      }
    } else if (!_swapSub) {
      pre = (hasSub ? (preLoc ? preLoc + "-" : "") : "") + [W1, S(2), W3].join("");
    } else {
      pre = preLoc2 + "-" + W3 + "-" + preLoc + "-" + W1;
    }
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
    var tail = [W10, S(11)].join("");
    // Esters: alcohol word first, then the substituted acid parent; the
    // εστέρας noun (S(11)) is implied by -oate and dropped.
    var out = isEster ? (W10 + " " + pre + parent) : (pre + parent + tail);
    // normalize artifacts
    out = out.replace(/\s+/g, " ").trim().replace(/ananoic/g, "anoic").replace(/\banane\b/g, "ane");
    if (!out || /^[0-9,\-]*$/.test(out)) return null;
    var delegated = false;
    if (/[\u0370-\u03ff\u1f00-\u1fff]/.test(out)) {
      if (sys) {
        try { if (typeof nameExamples !== "undefined" && nameExamples[k]) nameExamples[k].engineEN_sys = null; } catch (eSN) {}
        return null; // systematic variant must be fully transliterated; caller falls back to school
      }
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
        if (sys) nameExamples[k].engineEN_sys = out;
        else {
          nameExamples[k].engineEN = out;
          if (delegated) nameExamples[k].engineDelegated = true;
        }
      }
    } catch (e) {}
    console.log("[ENGINE-EN" + (sys ? "-SYS" : "") + "] " + k + " -> " + out + (delegated ? " [oracle-delegated]" : ""));
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
// variant "sys": systematic substituent forms (same slot transform as
// fPopulateEngineENFromGreek, so joined boxes match engineEN_sys).
// P-16.7.1(a) terminal-e elision for EN box boundaries: an "en"/"yn" infix box
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

function fNameENBoxes(variant) {
  try {
    if (typeof nameComponentsList === "undefined" || !nameComponentsList) return null;
    if (typeof selectedMol === "undefined" || !selectedMol) return null;
    if (typeof nameExamples === "undefined" || !nameExamples[selectedMol]) return null;
    var sys = (variant === "sys");
    var S = function (i) {
      var t = fGreekFragToEN(nameComponentsList[i] == null ? "" : nameComponentsList[i], i);
      if (sys) t = fSystematicSubstSlot(i, t);
      return t;
    };
    var isEster = false;
    try { isEster = typeof functionalGroupsList !== "undefined" && functionalGroupsList.length === 1 && functionalGroupsList[0] === "ester"; } catch (e) {}
    var hasSub = !!S(1) || !!S(3);
    // School transliteration (no systematic transform): group-boundary source
    // for the sys-aware slot splitter + differs-from-school parens gate.
    var Sch = function (i) {
      return fGreekFragToEN(nameComponentsList[i] == null ? "" : nameComponentsList[i], i);
    };
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
    // Pre (substituent) boxes: EN-alphabetical group order (P-14.5.1/2, v54.41;
    // same swap rule as fPopulateEngineENFromGreek for the legacy path).
    // Sorted path: slot-1 group + every slot-3 piece sort together by
    // DISPLAYED name, locants traveling with their group. Box ids stay
    // attached to content — only display order changes — so the
    // highlight/explain mapping is unaffected. Separators are positional
    // (first-emitted loc box loses its leading dash). The legacy path below
    // is byte-identical to before (verified: sorter-null implies the swap
    // cannot fire, single groups bypass sorting).
    if (hasSub) {
      var _sw = false;
      try {
        var _k1 = fENSubstSortKey(S(1)), _k3 = fENSubstSortKey(S(3));
        _sw = !!(_k1 && _k3 && stripLoc(S(0)) && stripLoc(S(2)) && _k3 < _k1);
      } catch (eSwB) { _sw = false; }
      var _pushG1 = function (loc0) {
        push("comp0", loc0);
        var _t1 = S(1);
        if (sys && typeof fENSysNeedsParens === "function") {
          try { if (fENSysNeedsParens(_t1, Sch(1), loc0)) _t1 = "(" + _t1 + ")"; } catch (eP1) {}
        }
        push("comp1", _t1);
      };
      var _pushG2 = function (loc2) {
        push("comp2", loc2);
        // Sys mode with a changed slot-3: split the SCHOOL text for group
        // boundaries (v54.40, mirrors GR v54.34) — splitting the sys text
        // shreds internal-locant names ("propan-2-yl" -> 3 boxes).
        if (sys && S(3) !== Sch(3)) {
          var _sfp = null;
          try { if (typeof fSplitENBranchSys === "function") _sfp = fSplitENBranchSys(Sch(3), S(3), 3); } catch (eSF) { _sfp = null; }
          if (_sfp) {
            for (var bi = 0; bi < _sfp.sys.length; bi += 2) {
              var gi = bi / 2;
              var _pt = _sfp.sys[bi];
              try {
                var _pv = (bi === 0) ? loc2 : _sfp.sys[bi - 1];
                if (typeof fENSysNeedsParens === "function" && fENSysNeedsParens(_pt, _sfp.com[bi], _pv)) _pt = "(" + _pt + ")";
              } catch (ePP) {}
              push(gi === 0 ? "comp3" : "comp3b" + (gi === 1 ? "" : String(gi - 1)), _pt);
              if (bi + 1 < _sfp.sys.length) {
                var li = gi + 1;
                push("comp3loc" + (li === 1 ? "" : String(li - 1)), "-" + _sfp.sys[bi + 1] + "-");
              }
            }
            return;
          }
          // School-unsplittable (or otherwise unpieceable) fused text keeps
          // the whole-box fallback — one component, never a wrong split —
          // with the same locant-preceded parens gate as the pieces.
          var _w3 = S(3);
          try { if (typeof fENSysNeedsParens === "function" && fENSysNeedsParens(_w3, Sch(3), loc2)) _w3 = "(" + _w3 + ")"; } catch (eW3) {}
          push("comp3", _w3);
          return;
        }
        var br = fSplitENBranch(S(3));
        if (br) {
          for (var bi2 = 0; bi2 < br.length; bi2 += 2) {
            var gi2 = bi2 / 2;
            push(gi2 === 0 ? "comp3" : "comp3b" + (gi2 === 1 ? "" : String(gi2 - 1)), br[bi2]);
            if (bi2 + 1 < br.length) {
              var li2 = gi2 + 1;
              push("comp3loc" + (li2 === 1 ? "" : String(li2 - 1)), "-" + br[bi2 + 1] + "-");
            }
          }
        } else { push("comp3", S(3)); }
      };
      // v54.41: full group order (G1 + slot-3 pieces). Null = legacy path
      // below (single group, original order, or a non-first group without
      // digit locants — fail-closed, today's exact output there).
      var _groups = (typeof fENSubstGroups === "function") ? fENSubstGroups(S, Sch, sys) : [];
      var _ord = (typeof fENSortSubstGroups === "function") ? fENSortSubstGroups(_groups) : null;
      if (_ord) {
        // G1 (if present) must sort first or last — anything else keeps the
        // legacy path (unattested; middle order has no box mapping).
        try {
          var _gqi = -1;
          for (var _gqj = 0; _gqj < _ord.length; _gqj++) { if (_groups[_ord[_gqj]].kind === "g1") { _gqi = _gqj; break; } }
          if (_gqi > 0 && _gqi < _ord.length - 1) _ord = null;
        } catch (eQ) { _ord = null; }
      }
      if (_ord) {
        var _emitted = false;
        for (var _e = 0; _e < _ord.length; _e++) {
          var _g = _groups[_ord[_e]];
          var _gl = stripLoc(_g.loc);
          var _lt = _gl ? ((_emitted ? "-" : "") + _gl + "-") : "";
          if (_lt) { push(_g.locId, _lt); _emitted = true; }
          var _nt = _g.name;
          if (sys && typeof fENSysNeedsParens === "function") {
            try { if (fENSysNeedsParens(_nt, _g.com, _g.loc)) _nt = "(" + _nt + ")"; } catch (ePPs) {}
          }
          push(_g.nameId, _nt); _emitted = true;
        }
      } else if (_sw) {
        var _l2 = stripLoc(S(2)), _l0 = stripLoc(S(0));
        _pushG2(_l2 ? _l2 + "-" : "");
        _pushG1("-" + _l0 + "-");
      } else {
        _pushG1(S(0));
        _pushG2(S(2));
      }
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
    if (!isEster) {
      var _t10 = S(10);
      if (sys && typeof fENSysNeedsParens === "function") {
        try { if (fENSysNeedsParens(_t10, Sch(10), Sch(9))) _t10 = "(" + _t10 + ")"; } catch (eP10) {}
      }
      push("comp10", _t10); push("comp11", S(11));
    }
    // P-16.7.1(a) elision at box seams: "yn"/"en" directly before a
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
// Sys-aware fused branch splitter (v54.40, mirrors GR fSysFusedPieces v54.34):
// split the SCHOOL text for group boundaries, transform each name piece
// individually, keep locants. Returns {sys, com} or null (school itself
// unsplittable, or systematic identical to school -> caller falls back to
// the school split / whole box; never a wrong-but-plausible split).
// Shredding root cause it fixes: fSplitENBranch on sys text tears
// "propan-2-yl" into [propan, 2, yl] because the internal locant validates
// as a boundary; school names carry no internal digits so their split is
// clean (sec-/tert- hyphenation stays shielded as before).
function fSplitENBranchSys(schoolText, sysText, slot) {
  try {
    var sch = String(schoolText == null ? "" : schoolText);
    var parts = (typeof fSplitENBranch === "function") ? fSplitENBranch(sch) : null;
    if (!parts) return null;
    var sys = parts.map(function (p, k) {
      if (k % 2 === 1) return p;
      var m = (typeof fSystematicSubstSlot === "function") ? fSystematicSubstSlot(slot, p) : p;
      return (typeof m === "string" && m) ? m : p;
    });
    if (sys.join("-") === parts.join("-")) return null;
    // Fail-closed consistency: the per-piece transform must reproduce the
    // whole-slot transform exactly; otherwise fall back to the whole box.
    if (String(sysText == null ? "" : sysText) !== sys.join("-")) return null;
    return { sys: sys, com: parts };
  } catch (eF) { return null; }
}
// Parens-when-preceded-by-locants (v54.40, mirrors GR fGRSysNeedsParens
// v54.36): a bare systematic name carrying an internal digit is ambiguous
// right after a parent locant run ("4-propan-2-yl"), so it nests in parens
// when the preceding component is a number locant: 4-(propan-2-yl)-.
// Differs-from-school required (toggle visibility, sort keys and verdicts
// keyed off unwrapped text stay byte-identical where sys equals school);
// already-parenthesized, unchanged, or digitless names pass through;
// empty locants (tiny chains, locant-free slots like the ester tail) mean
// no parens. Render/join-layer only — slots keep bare forms, so toggle
// visibility, splitting and idempotence are unaffected.
function fENSysNeedsParens(sysText, commonText, prevLocText) {
  try {
    if (!sysText || sysText === commonText) return false;
    if (/[()]/.test(sysText)) return false;
    if (!/\d/.test(sysText)) return false;
    var loc = String(prevLocText == null ? "" : prevLocText).replace(/-/g, "");
    return /\d/.test(loc);
  } catch (eP) { return false; }
}
// Systematic substituent names (school retained -> systematic, P-29.6/P-57.1).
// tert-butyl mapped since v54.38 (didactic override for teaching: the toggle
// shows the fully substitutive construction even though tert-butyl is the
// preferred prefix, P-57.1.2 — EN sys then differs from PubChem systematic
// on tert-butyl molecules, recorded like the OC bis case). tert-butoxy/
// isobutoxy omitted: unattested, verify against P-63.2/P-57.1 before adding.
// Single locant-bearing groups stay bare; parentheses are added
// by fSystematicSubstSlot only when multiplied (P-16.3.4(a)).
var EN_SYST_SUBST = {
  "isopropyl": "propan-2-yl",
  "isobutyl": "2-methylpropyl",
  "sec-butyl": "butan-2-yl",
  "tert-butyl": "2-methylpropan-2-yl",
  "isopropoxy": "propan-2-yloxy",
  "sec-butoxy": "butan-2-yloxy"
};

// Substituted-stem test for the systematic bis/tris upgrade (P-16.3.4(a)):
// a multiplied substituent whose stem is a hetero-substituted ALKYL group
// (halo/nitro decorated branches, v54.23: chloromethyl, 2-chloroethyl, ...)
// takes bis/tris/tetrakis/... + parens, e.g. dichloromethyl ->
// bis(chloromethyl). Bare groups stay bare, and so do directly multiplied
// hetero prefixes (dichloro, dinitro) — the yl$ anchor keeps those intact.
function fIsSubstitutedStemEN(s) {
  try {
    var _t = String(s == null ? "" : s).toLowerCase();
    return /yl$/.test(_t) && /(chloro|bromo|fluoro|iodo|nitro)/.test(_t);
  }
  catch (e) { return false; }
}
function fBisPrefixEN(p) {
  var map = { di: "bis", tri: "tris", tetra: "tetrakis", penta: "pentakis", hexa: "hexakis", hepta: "heptakis", octa: "octakis" };
  return Object.prototype.hasOwnProperty.call(map, p) ? map[p] : p;
}

// Systematic slot transform: segment-wise substitution (hyphen-separated
// locants pass through; S(0)/S(2) locant slots unaffected). Greek input
// expected; returns the input unchanged when nothing maps.
function fSystematicSubstSlot(slot, text) {
  try {
    if (slot !== 1 && slot !== 3 && slot !== 10) return text;
    var t = String(text == null ? "" : text);
    if (!t) return t;
    // Shield hyphenated retained forms (sec-/tert-, v54.37): the split below
    // would otherwise tear "sec-butyl" into ["sec","butyl"] before the
    // whole-word EN_SYST_SUBST lookup ever sees it (the map entry existed
    // since v54.22 but could never fire). Same protected-prefix idea as
    // fSplitENBranch. tert-* restores unchanged by design (preferred prefix).
    var _shHeld = [];
    var _shT = t;
    try {
      _shT = String(t).replace(/(sec|tert)-(?=[a-z])/gi, function (m) {
        _shHeld.push(m.toLowerCase() === m ? m : m.toLowerCase());
        return "" + (_shHeld.length - 1) + "";
      });
    } catch (eSh) { _shT = t; _shHeld = []; }
    // Paren-aware split: hyphens inside parentheses (decorated multiplied
    // forms, e.g. di(2-chloroethyl)) stay inside one segment. Inputs without
    // parens split exactly as before (no legacy impact).
    var parts = [];
    try {
      var _depth = 0, _cur = "";
      for (var _ci = 0; _ci < _shT.length; _ci++) {
        var _ch = _shT.charAt(_ci);
        if (_ch === "(") _depth++;
        else if (_ch === ")") _depth = Math.max(0, _depth - 1);
        if (_ch === "-" && _depth === 0) { parts.push(_cur); _cur = ""; }
        else _cur += _ch;
      }
      parts.push(_cur);
    } catch (eSp) { parts = _shT.split("-"); }
    var _restore = function (w) {
      try {
        return String(w).replace(/(\d+)/g, function (m, n) {
          var _h = _shHeld[parseInt(n, 10)];
          return (typeof _h === "string") ? _h : m;
        });
      } catch (eR) { return w; }
    };
    var out = [];
    for (var k = 0; k < parts.length; k++) {
      var w = _restore(parts[k]);
      if (!w || /^\d[\d,]*$/.test(w)) { out.push(w); continue; }
      // Parenthesized multiplied form from the Greek parens rule, e.g.
      // "di(2-chloroethyl)" (transliterated δι(2-χλωροαιθυλο)).
      var mp = /^(di|tri|tetra|penta|hexa|hepta|octa)\((.+)\)$/.exec(w);
      if (mp && fIsSubstitutedStemEN(mp[2])) { out.push(fBisPrefixEN(mp[1]) + "(" + mp[2] + ")"); continue; }
      var m2 = /^(di|tri|tetra)([a-z].*)$/.exec(w);
      if (m2 && Object.prototype.hasOwnProperty.call(EN_SYST_SUBST, m2[2])) {
        var s2 = EN_SYST_SUBST[m2[2]];
        out.push(/\d/.test(s2) ? m2[1] + "(" + s2 + ")" : m2[1] + s2);
      } else if (Object.prototype.hasOwnProperty.call(EN_SYST_SUBST, w)) {
        out.push(EN_SYST_SUBST[w]);
      } else {
        // Substituted-stem upgrade: "dichloromethyl" -> "bis(chloromethyl)".
        var m3 = /^(di|tri|tetra|penta|hexa|hepta|octa)([a-z].*)$/.exec(w);
        if (m3 && fIsSubstitutedStemEN(m3[2])) out.push(fBisPrefixEN(m3[1]) + "(" + m3[2] + ")");
        else out.push(w);
      }
    }
    return out.join("-");
  } catch (eS) { return text; }
}
// EN substituent sort key (P-14.5.1 simple + P-14.5.2 compound, v54.41):
// alphabetical by transliterated DISPLAYED name. Simple substituents ignore
// di/tri/tetra (dimethyl under m); compound (substituted) substituents sort
// by the first letter of the complete name (difluorobutyl under d,
// bis(chloromethyl) under b), leading locants skipped. (Resolves the v54.22
// limitation note: leading di/tri/tetra inside compound names no longer
// strips. sec-/tert- sort as plain Roman (P-14.5.3 tie-break only).)
function fENSubstSortKey(nm) {
  try {
    var s = String(nm == null ? "" : nm).toLowerCase();
    s = s.replace(/[()]/g, "");
    s = s.replace(/^[\d,\s\-]+/, "");
    if ((typeof fIsSubstitutedStemEN === "function") && fIsSubstitutedStemEN(s)) return s;
    return s.replace(/^(di|tri|tetra)(?=[a-z])/, "");
  } catch (e) { return ""; }
}
// Numeric locants list for the P-14.5.4 tie-break (identical Roman letters ->
// lowest locants first). Unparseable -> [] (stable fallback).
function fENLocKey(locText) {
  try {
    var out = [];
    var parts = String(locText == null ? "" : locText).replace(/^[-\s]+/, "").replace(/[-\s]+$/, "").split(/[, \-]+/);
    for (var i = 0; i < parts.length; i++) {
      var n = parseInt(parts[i], 10);
      if (isFinite(n)) out.push(n);
    }
    return out;
  } catch (eL) { return []; }
}
// Substituent groups for ordering (v54.41): slot-1 group + every slot-3
// piece, locants traveling with their group. Returns raw-order (G1 first)
// [{loc, name, com, kind, locId, nameId}] or [] when degenerate. Name/com
// are DISPLAYED strings (sys-aware when sys); parens are applied at emission
// (own-locant gate, as before), so sorting uses bare names.
function fENSubstGroups(S, Sch, sys) {
  try {
    if (typeof S !== "function") return [];
    var gs = [];
    var s1 = "", c1 = "";
    try { s1 = S(1); } catch (e1) { s1 = ""; }
    try { c1 = (typeof Sch === "function") ? Sch(1) : s1; } catch (eC1) { c1 = s1; }
    if (s1) gs.push({ loc: S(0), name: s1, com: c1, kind: "g1", locId: "comp0", nameId: "comp1" });
    var s3 = "", c3 = "";
    try { s3 = S(3); } catch (e3) { s3 = ""; }
    try { c3 = (typeof Sch === "function") ? Sch(3) : s3; } catch (eC3) { c3 = s3; }
    if (s3) {
      var pcs = null, ccs = null;
      if (sys && s3 !== c3 && typeof fSplitENBranchSys === "function") {
        var sfp = null;
        try { sfp = fSplitENBranchSys(c3, s3, 3); } catch (eSF) { sfp = null; }
        if (sfp) { pcs = sfp.sys; ccs = sfp.com; }
      }
      if (!pcs) {
        var br = null;
        try { if (typeof fSplitENBranch === "function") br = fSplitENBranch(s3); } catch (eB) { br = null; }
        if (br) { pcs = br; ccs = br.slice(); }
      }
      if (pcs) {
        for (var k = 0; k < pcs.length; k += 2) {
          var j = k / 2;
          gs.push({
            loc: (k === 0) ? S(2) : pcs[k - 1], name: pcs[k], com: ccs[k], kind: "g3",
            locId: (j === 0) ? "comp2" : ("comp3loc" + (j === 1 ? "" : String(j - 1))),
            nameId: (j === 0) ? "comp3" : ("comp3b" + (j === 1 ? "" : String(j - 1)))
          });
        }
      } else {
        gs.push({ loc: S(2), name: s3, com: c3, kind: "g3", locId: "comp2", nameId: "comp3" });
      }
    }
    return gs;
  } catch (eG) { return []; }
}
// Full alphabetical group order (v54.41, P-14.5.1/2/4): sort key of the
// DISPLAYED name, P-14.5.4 locant tie-break, stable. Returns the emission
// permutation, or null to keep the legacy path: single/degenerate groups,
// original order, or a non-first group without digit locants (fail-closed —
// junction dashes need locants; legacy straight output is today's exact
// behavior there since the swap precondition needs non-empty locants too).
function fENSortSubstGroups(gs) {
  try {
    if (!Array.isArray(gs) || gs.length < 2) return null;
    var idx = [];
    for (var i = 0; i < gs.length; i++) idx.push(i);
    idx.sort(function (a, b) {
      var ka = "", kb = "";
      try { ka = fENSubstSortKey(gs[a].name); } catch (e1) {}
      try { kb = fENSubstSortKey(gs[b].name); } catch (e2) {}
      if (ka < kb) return -1;
      if (ka > kb) return 1;
      var la = [], lb = [];
      try { la = fENLocKey(gs[a].loc); } catch (e3) {}
      try { lb = fENLocKey(gs[b].loc); } catch (e4) {}
      for (var k = 0; k < Math.max(la.length, lb.length); k++) {
        var va = (k < la.length) ? la[k] : 1e9, vb = (k < lb.length) ? lb[k] : 1e9;
        if (va !== vb) return va - vb;
      }
      return a - b;
    });
    var ident = true;
    for (var j = 0; j < idx.length; j++) { if (idx[j] !== j) { ident = false; break; } }
    if (ident) return null;
    for (var m = 1; m < idx.length; m++) {
      if (!/\d/.test(String(gs[idx[m]].loc))) return null;
    }
    return idx;
  } catch (eS) { return null; }
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
function fMatchEngineEN(key, engineOverride) {
  var out = { status: "missing", via: null, engine: null, oracle: null };
  try {
    if (typeof nameExamples === "undefined" || !nameExamples[key]) return out;
    var e = nameExamples[key];
    var _eng = (typeof engineOverride !== "undefined" && engineOverride != null) ? engineOverride : (e && e.engineEN);
    if (!e || !_eng) return out;
    var a = fNormNoStereo(String(_eng).toLowerCase().trim());
    var sys = fNormNoStereo(String(e.systematicEN || "").toLowerCase().trim());
    var ret = fNormNoStereo(String(e.iupacPubchem || e.iupacEN || "").toLowerCase().trim());
    var tit = fNormNoStereo(String(e.titlePubchem || "").toLowerCase().trim());
    out.engine = _eng;
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
// Second-oracle verdict (OpenClatura, Phase 2): pure string compare of the
// engine EN against the rule-built OC name (stereo-stripped, same normalizer
// as the PubChem path). No retained/title fallbacks — OC emits one systematic
// name. Statuses "match" | "mismatch" | "missing" (no OC data yet); the live
// chip and the batch table below share this, so they cannot disagree.
function fMatchENvsOC(engineEN, ocName) {
  try {
    var a = String(engineEN == null ? "" : engineEN).toLowerCase().trim();
    var o = String(ocName == null ? "" : ocName).toLowerCase().trim();
    if (!a || !o) return "missing";
    if (typeof fNormNoStereo === "function") { a = fNormNoStereo(a); o = fNormNoStereo(o); }
    return (a === o) ? "match" : "mismatch";
  } catch (e) { return "missing"; }
}
function fMatchEngineEN_OC(key, engineOverride) {
  var out = { status: "missing", via: "openclatura", engine: null, oracle: null };
  try {
    if (typeof nameExamples === "undefined" || !key || !nameExamples[key]) return out;
    var e = nameExamples[key];
    var _eng = (typeof engineOverride !== "undefined" && engineOverride != null) ? engineOverride : (e && e.engineEN);
    if (!e || !_eng) return out;
    out.engine = _eng;
    out.oracle = e.openclaturaEN || null;
    if (!out.oracle) return out;
    out.status = fMatchENvsOC(out.engine, out.oracle);
    return out;
  } catch (e2) { return out; }
}
function fValidateENAgainstOC() {
  var out = { checked: 0, match: 0, mismatch: [], missing: 0 };
  if (typeof nameExamples === "undefined") return out;
  for (const k of Object.keys(nameExamples)) {
    const e = nameExamples[k];
    if (!e || !e.engineEN) continue;
    out.checked++;
    const r = fMatchEngineEN_OC(k);
    if (r.status === "missing") { out.missing++; continue; }
    if (r.status === "match") out.match++;
    else out.mismatch.push({ key: k, engine: r.engine, oracle: r.oracle });
  }
  console.log("[EN-VALIDATE-OC] checked=" + out.checked + " match=" + out.match + " mismatch=" + out.mismatch.length + " missing=" + out.missing);
  for (const m of out.mismatch.slice(0, 20)) console.log("[EN-MISMATCH-OC] " + m.key + ": engine=\"" + m.engine + "\" openclatura=\"" + m.oracle + "\"");
  return out;
}
