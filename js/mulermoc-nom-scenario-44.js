// mulermoc-nom-scenario-44.js
// Didactic scenarios — linear snapshot sequences (v44, additive module).
// Drives the existing v44 layers (core/molview/teaching) through their
// public entry points; modifies no v42/v43/v44 layer logic.
// Disabled by default: without ?scenario / ?present / #step the page
// behaves exactly like v43 (44-no-params == 43).

var MuLERMoCScenario = {
  SUPPORTED_VERSION: 1,
  steps: [], // legacy mirror of the active scenario (kept in sync; use fScenarioActive())
  index: 0, // legacy mirror of active.index
  title: "untitled-scenario", // legacy mirror of active.title
  menuPick: [], // legacy mirror of active.menuPick
  scenarios: [], // multi-scenario: [{id, title, steps[], index, menuPick[]}]
  activeId: null, // explicit active card; Save/pick/Present follow it
  presentId: null, // scenario being presented (set on Play, cleared on Exit)
  seq: 0, // scenario id sequence
  present: false,
  ready: false,
  applyToken: 0, // S2: bumped per fScenarioApply; stale async follow-ups abort
  pending3D: null, // S2: {token, mol, step, done} — name click waits for 3D parse
  authorSettings: null, // pre-Present checkbox states, restored on Exit
  menuPickMode: false, // authoring: show pick checkboxes in the left menu
  authoring: false, // authoring mode: bar + panels + pick UI (off by default)
  maxEmptyScenarios: 3, // adjustable cap on step-less cards (scNew locks at cap)
};

// ── multi-scenario state manager ─────────────────────────────────────
// Each scenario card: {id, title, steps[], index, menuPick[]}.
// The legacy singletons (MuLERMoCScenario.steps/title/index/menuPick)
// mirror the active card so older playback paths keep working.
function fScenarioNewId() {
  MuLERMoCScenario.seq = (MuLERMoCScenario.seq || 0) + 1;
  return "s" + MuLERMoCScenario.seq;
}
function fScenarioGet(id) {
  for (var i = 0; i < MuLERMoCScenario.scenarios.length; i++) {
    if (MuLERMoCScenario.scenarios[i].id === id) return MuLERMoCScenario.scenarios[i];
  }
  return null;
}
function fScenarioSyncLegacy() {
  var a = fScenarioActive();
  if (!a) return;
  MuLERMoCScenario.steps = a.steps;
  MuLERMoCScenario.index = a.index;
  MuLERMoCScenario.title = a.title;
  MuLERMoCScenario.menuPick = a.menuPick;
}
function fScenarioActive() {
  var a = MuLERMoCScenario.activeId ? fScenarioGet(MuLERMoCScenario.activeId) : null;
  if (a) return a;
  if (MuLERMoCScenario.scenarios.length) {
    MuLERMoCScenario.activeId = MuLERMoCScenario.scenarios[0].id;
    fScenarioSyncLegacy();
    return MuLERMoCScenario.scenarios[0];
  }
  return fScenarioNew("untitled-scenario", true);
}
function fScenarioPresent() {
  var p = MuLERMoCScenario.presentId ? fScenarioGet(MuLERMoCScenario.presentId) : null;
  return p || fScenarioActive();
}
function fScenarioNew(title, silent) {
  var scen = { id: fScenarioNewId(), title: title || ("scenario-" + (MuLERMoCScenario.seq)), steps: [], index: 0, menuPick: [] };
  MuLERMoCScenario.scenarios.push(scen);
  MuLERMoCScenario.activeId = scen.id;
  fScenarioSyncLegacy();
  if (!silent) {
    fScenarioBuildPanels();
    fScenarioPaintPickUi();
  }
  return scen;
}
function fScenarioDelete(id) {
  var i;
  for (i = 0; i < MuLERMoCScenario.scenarios.length; i++) {
    if (MuLERMoCScenario.scenarios[i].id === id) break;
  }
  if (i >= MuLERMoCScenario.scenarios.length) return;
  MuLERMoCScenario.scenarios.splice(i, 1);
  if (!MuLERMoCScenario.scenarios.length) {
    MuLERMoCScenario.activeId = null;
    fScenarioActive();
  } else if (MuLERMoCScenario.activeId === id) {
    MuLERMoCScenario.activeId = MuLERMoCScenario.scenarios[Math.max(0, i - 1)].id;
  }
  fScenarioSyncLegacy();
  fScenarioBuildPanels();
  fScenarioPaintPickUi();
}
function fScenarioSetActive(id) {
  var s = fScenarioGet(id);
  if (!s) return;
  MuLERMoCScenario.activeId = id;
  fScenarioSyncLegacy();
  fScenarioPaintPickUi();
  var panels = document.querySelectorAll(".scenarioPanel");
  for (var i = 0; i < panels.length; i++) {
    panels[i].classList.toggle("active", panels[i].getAttribute("data-scenario-id") === id);
  }
}
function fScenarioPanelFor(id) {
  return document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"]');
}

// nameAnalysisMode -> name-box id (reverse of the .nameCompBox click map
// in mulermoc-nom-teaching-44.js). comp10/11 depend on chemical class;
// verified after triggering, mismatch falls back to "none".
var fScenarioModeToCompId = {
  compNumber1: "comp0",
  compSecondSub1: "comp1",
  compNumber2: "comp2",
  compSecondSub2: "comp3",
  compBondPos: "comp4",
  compCarbonsCount: "comp5",
  compBondType: "comp6",
  compEndNumber: "comp7",
  compBondType2: "comp8",
  compSuffix: "comp9",
  commonAlkyl1: "comp10",
  esterAlkyl: "comp10",
  commonAlkyl2: "comp11",
  esterEster: "comp11",
  commonEther: "comp12",
};

// S3: older saved scenarios may carry a legacy leading space (" compSecondSub1/2").
// Normalize before comparing or looking up so capture → apply → click
// survives trimming on either side.
function fScenarioNormMode(m) {
  return String(m == null ? "none" : m).replace(/^\s+|\s+$/g, "");
}

function fScenarioCompIdFor(mode) {
  if (Object.prototype.hasOwnProperty.call(fScenarioModeToCompId, mode)) {
    return fScenarioModeToCompId[mode];
  }
  var n = fScenarioNormMode(mode);
  for (var k in fScenarioModeToCompId) {
    if (Object.prototype.hasOwnProperty.call(fScenarioModeToCompId, k) &&
        fScenarioNormMode(k) === n) {
      return fScenarioModeToCompId[k];
    }
  }
  return null;
}

function fScenarioG(name, fallback) {
  // Eval-free live-state reader (T3 hardening). Explicit whitelist over the
  // cross-file globals declared in mulermoc-nom-core/molview-44.js; unknown
  // names yield the fallback (same contract as the old eval version).
  try {
    switch (name) {
      case "selectedMol": return typeof selectedMol !== "undefined" ? selectedMol : fallback;
      case "currentMolName": return typeof currentMolName !== "undefined" ? currentMolName : fallback;
      case "mode2D": return typeof mode2D !== "undefined" ? mode2D : fallback;
      case "mainChainMode": return typeof mainChainMode !== "undefined" ? mainChainMode : fallback;
      case "etherNamingMode": return typeof etherNamingMode !== "undefined" ? etherNamingMode : fallback;
      case "nameAnalysisMode": return typeof nameAnalysisMode !== "undefined" ? nameAnalysisMode : fallback;
      case "svgAtomColors2DFlag": return typeof svgAtomColors2DFlag !== "undefined" ? svgAtomColors2DFlag : fallback;
      case "atomColorMode2D": return typeof atomColorMode2D !== "undefined" ? atomColorMode2D : fallback;
      case "nameSettingsFlag": return typeof nameSettingsFlag !== "undefined" ? nameSettingsFlag : fallback;
      case "narrateAnalysisFlag": return typeof narrateAnalysisFlag !== "undefined" ? narrateAnalysisFlag : fallback;
      case "vis3D": return typeof vis3D !== "undefined" ? vis3D : fallback;
      case "rotateFlag": return typeof rotateFlag !== "undefined" ? rotateFlag : fallback;
      case "hydrogens3DFlag": return typeof hydrogens3DFlag !== "undefined" ? hydrogens3DFlag : fallback;
      case "atomSymbols3DFlag": return typeof atomSymbols3DFlag !== "undefined" ? atomSymbols3DFlag : fallback;
      default: return fallback;
    }
  } catch (e) {
    return fallback;
  }
}

function fScenarioToast(msg) {
  var t = document.getElementById("scenarioToast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(function () {
    t.classList.remove("show");
  }, 2600);
}

// ── readiness: wait for JSME applet + data + entry points ──────────────
function fScenarioWhenReady(cb) {
  var tries = 0;
  (function poll() {
    tries++;
    try {
      if (
        typeof nameExamples !== "undefined" &&
        nameExamples.methane &&
        typeof fSelectMol === "function" &&
        typeof jsmeNomeclatureApplet !== "undefined" &&
        jsmeNomeclatureApplet
      ) {
        MuLERMoCScenario.ready = true;
        cb();
        return;
      }
    } catch (e) {
      /* keep polling */
    }
    if (tries < 200) {
      setTimeout(poll, 150);
    } else {
      fScenarioToast("Scenario: app did not become ready (JSME/data).");
    }
  })();
}

// ── 3D camera via `show moveto` (S1: scriptWait-only) ────────────────────
// The old Jmol.getPropertyAsString(applet, "show moveto") branch is gone on
// purpose: the property API answered with a `getProperty ERROR … Options
// include: …` dump starting with `moveto\t"` that passed the old prefix
// check and poisoned stored steps ("always loads the default").
// scriptWait("show moveto") returns the real script output ("" when 3D is
// unavailable). Capture with `rotate off` — a spinning view drifts.
function fScenarioGetMoveto() {
  try {
    if (typeof Jmol === "undefined" || typeof Jmol.scriptWait === "undefined" ||
        typeof jmolAppletNomeclature === "undefined") return null;
    var w = String(Jmol.scriptWait(jmolAppletNomeclature, "show moveto") || "").trim();
    var line = w.split("\n").filter(function (l) {
      return /^moveto\b/i.test(l.trim());
    })[0];
    if (line) return line.trim();
  } catch (e) {
    /* 3D unavailable */
  }
  return null;
}

// Strict moveto grammar (S1). A real camera line is `moveto` followed only by
// numbers, whitespace, braces, signs, decimal points, exponent markers and an
// optional trailing `;` — e.g. `moveto 0.0 { 17 896 -444 35.17} 65.75 …`.
// The poisoned `getProperty ERROR …` dump contains other letters, so any
// letter besides e/E (scientific notation like 4.03e-17) or any character
// outside the numeric charset rejects the line → null (default view).
function fScenarioValidMoveto(s) {
  if (typeof s !== "string") return null;
  var line = s.trim().split("\n")[0].trim();
  if (!/^moveto\b/i.test(line) || line.length > 2048) return null;
  var body = line.replace(/^moveto\b/i, "").trim().replace(/;$/, "").trim();
  if (!body || !/^[\d\s.\-+{}eE]+$/.test(body)) return null;
  if (/[a-df-zA-DF-Z]/.test(body)) return null; // letters other than e/E
  var nums = body.match(/-?\d(\.\d+)?([eE][+\-]?\d+)?/g) || [];
  if (nums.length < 5) return null; // not a real camera vector
  return line;
}

// ── capture ────────────────────────────────────────────────────────────
function fScenarioViewerOn(kind) {
  // kind: "2D" | "3D" — mirrors fToggleViewer2D/3D scope.
  if (kind === "2D") {
    var b = document.getElementById("view2DBtn");
    if (b) return b.classList.contains("active");
    return !document.getElementById("jsmeNomeclatureSVG") ||
      document.getElementById("jsmeNomeclatureSVG").style.display !== "none";
  }
  var b3 = document.getElementById("view3DBtn");
  if (b3) return b3.classList.contains("active");
  return true;
}

function fScenarioCapture() {
  if (!MuLERMoCScenario.ready) {
    fScenarioToast("Scenario: app not ready yet.");
    return null;
  }
  var act = fScenarioActive();
  var mol = fScenarioG("selectedMol", null);
  if (!mol || typeof nameExamples === "undefined" || !nameExamples[mol]) mol = null;
  var pick = act.menuPick.slice();
  // Menu derivation (no Menu checkbox — the menu follows picks+selection):
  // - single pick, nothing selected → adopted as the step's molecule;
  // - selection wins over a single (stray) pick — subset dropped, no menu;
  // - selection + 2+ picks → molecule step with a browsable subset menu;
  // - no selection + 2+ picks → menu-only step (molecule-less menu);
  // - selection alone (or nothing picked) → molecule step, no menu.
  var adopted = false;
  if (!mol && pick.length === 1) {
    mol = pick[0];
    adopted = true;
  }
  var menuOnly = !mol && pick.length > 1;
  if (!mol && !menuOnly) {
    fScenarioToast("Scenario: select a molecule or pick molecules first.");
    return null;
  }
  var showMenu = menuOnly || (!!mol && pick.length > 1);
  var subset = showMenu ? pick.slice() : [];
  if (showMenu && mol && subset.indexOf(mol) < 0) subset.unshift(mol);
  var spin = !!fScenarioG("rotateFlag", false);
  var moveto = !menuOnly && !adopted && fScenarioViewerOn("3D") ? fScenarioGetMoveto() : null;
  // Default step title: the live Greek IUPAC name when the loaded
  // molecule matches the capture (fresh `currentMolName`); the dataset
  // key when nothing is loaded (adopted pick); "menu" for menu-only.
  var _liveMol = fScenarioG("selectedMol", null);
  var _greek = fScenarioG("currentMolName", null);
  var step = {
    n: act.steps.length + 1,
    title: !mol ? "menu" : (_liveMol === mol && _greek ? _greek : mol),
    note: "",
    selectedMol: mol,
    mode2D: fScenarioG("mode2D", "condensed"),
    mainChainMode: fScenarioG("mainChainMode", "algorithmic"),
    etherNamingMode: fScenarioG("etherNamingMode", "iupac"),
    nameAnalysisMode: (menuOnly || adopted) ? "none" : fScenarioG("nameAnalysisMode", "none"),
    selectedRule: typeof selectedRule === "number" ? selectedRule : null,
    style2D: {
      atomColors: !!fScenarioG("svgAtomColors2DFlag", false),
      colorMode: fScenarioG("atomColorMode2D", "atom"),
      zigzag: fScenarioG("mode2D", "") === "condensedZigZag",
    },
    styleName: {
      box: !!window.nameBoxFlag,
      cross: !!window.nameCrossFlag,
      etherNaming: fScenarioG("etherNamingMode", "iupac"),
      panelOpen: !!fScenarioG("nameSettingsFlag", true),
      hidden: Array.isArray(window.nameHiddenComps) ? window.nameHiddenComps.slice() : [],
    },
    styleHighlight: {
      bondAtoms: fScenarioCheck("bondAtomsCheck", false),
      numberingAtoms: fScenarioCheck("highlightNumberingCheck", true),
    },
    styleText: { fontSizePx: null, textWidthPx: null, columns: null }, // whole-text size/width/columns; null = theme defaults (18px / 980px / 1 col)
    audio: { narrate: !!fScenarioG("narrateAnalysisFlag", false) },
    view3D: {
      style: fScenarioG("vis3D", "ballnstick"),
      spin: spin,
      showH: !!fScenarioG("hydrogens3DFlag", true),
      atomSymbols: !!fScenarioG("atomSymbols3DFlag", true),
      moveto: moveto,
    },
    menuSubset: subset,
    menuGroups: ["molecules"], // Ταξινομήσεις Μένου drawer default (flat list)
    show: {
      menu: showMenu,
      viewerButtons: false,
      viewerSettings: false,
      viewers: { "2D": fScenarioViewerOn("2D"), "3D": fScenarioViewerOn("3D") },
      controls: { "2D": false, "3D": false },
      save: { "2D": false, "3D": false },
      naming: true,
      nameSettings: false,
      nameClick: false,
      nameEye: false,
      audio: false,
      rule: false,
      text: true,
    },
  };
  if (spin) fScenarioToast("Note: 3D spin is on — stored view may drift.");
  MuLERMoCScenario.lastCaptureNote = adopted ? "Single pick adopted as the step molecule." : null;
  return step;
}

// ── validation (version policy) ────────────────────────────────────────
// Menu grouping selection (Ταξινομήσεις Μένου drawer checkboxes): subset of
// molecules|chemclass|series; empty/unknown → ["molecules"] flat fallback.
var SCENARIO_MENU_GROUPS = ["molecules", "chemclass", "series"];
// Whole-text size (px): additive optional styleText.fontSizePx, null = theme
// default 18px. Clamp 12–28; invalid → null (no warning text here — the
// validate path adds it so capture stays toast-quiet).
function fScenarioValidFontSizePx(v) {
  if (v === null || typeof v === "undefined" || v === "") return null;
  var n = parseInt(v, 10);
  if (isNaN(n)) return null;
  if (n < 12) return 12;
  if (n > 28) return 28;
  return n;
}
// Whole-text width (px): additive optional styleText.textWidthPx,
// null = theme default 980px. Clamp 320–1200; invalid → null.
function fScenarioValidTextWidthPx(v) {
  if (v === null || typeof v === "undefined" || v === "") return null;
  var n = parseInt(v, 10);
  if (isNaN(n)) return null;
  if (n < 320) return 320;
  if (n > 1200) return 1200;
  return n;
}
// Text columns: additive optional styleText.columns (2 = two columns,
// null = default one column). Only 1|2 stored; 1 collapses to null so
// exports stay minimal. Anything else non-empty is invalid → null.
function fScenarioValidColumns(v) {
  if (v === null || typeof v === "undefined" || v === "") return null;
  var n = parseInt(v, 10);
  if (isNaN(n)) return null;
  if (n >= 2) return 2;
  return null;
}
function fScenarioApplyStepFontSize(step) {
  var p = null;
  try { p = document.getElementById("scStepText"); } catch (e) { /* no DOM */ }
  if (!p) return;
  var px = step && step.styleText ? fScenarioValidFontSizePx(step.styleText.fontSizePx) : null;
  p.style.fontSize = px ? px + "px" : "";
  var w = step && step.styleText ? fScenarioValidTextWidthPx(step.styleText.textWidthPx) : null;
  p.style.maxWidth = w ? w + "px" : "";
  // Columns via class (not inline): the small-screen collapse lives in CSS
  // media queries, which cannot beat an inline column-count.
  var two = !!(step && step.styleText && fScenarioValidColumns(step.styleText.columns) === 2);
  try {
    if (p.classList) p.classList.toggle("scCols2", two);
  } catch (e) { /* no DOM */ }
}
function fScenarioValidMenuGroups(g) {  var out = [];
  (Array.isArray(g) ? g : []).forEach(function (m) {
    if (SCENARIO_MENU_GROUPS.indexOf(m) >= 0 && out.indexOf(m) < 0) out.push(m);
  });
  return out.length ? out : ["molecules"];
}
function fScenarioDefaults(step, i) {
  var d = {
    n: i + 1,
    title: step.selectedMol || "step " + (i + 1),
    note: "",
    mode2D: "condensed",
    mainChainMode: "algorithmic",
    etherNamingMode: "iupac",
    nameAnalysisMode: "none",
    selectedRule: null,
    style2D: { atomColors: false, colorMode: "atom", zigzag: false },
    styleName: { box: true, cross: false, etherNaming: "iupac", panelOpen: true, hidden: [] },
    styleHighlight: { bondAtoms: false, numberingAtoms: true },
    styleText: { fontSizePx: null, textWidthPx: null, columns: null },
    audio: { narrate: false },
    menuSubset: [],
    menuGroups: ["molecules"],
    view3D: { style: "ballnstick", spin: false, showH: true, atomSymbols: true, moveto: null },
    show: {
      menu: false, viewerButtons: false, viewerSettings: false,
      viewers: { "2D": true, "3D": true },
      controls: { "2D": false, "3D": false },
      save: { "2D": false, "3D": false },
      naming: true, nameSettings: false, nameEye: false, audio: false, rule: false, text: true,
    },
  };
  var out = Object.assign({}, d, step);
  ["style2D", "styleName", "styleHighlight", "styleText", "audio", "view3D", "show"].forEach(function (k) {
    out[k] = Object.assign({}, d[k], step[k] || {});
  });
  out.show.viewers = Object.assign({}, d.show.viewers, (step.show || {}).viewers || {});
  out.show.controls = Object.assign({}, d.show.controls, (step.show || {}).controls || {});
  out.show.save = Object.assign({}, d.show.save, (step.show || {}).save || {});
  // removed 2026-10-06 (not in this phase): legacy files may still carry
  // externalLinks / show.infoHost — strip silently, no warning.
  delete out.externalLinks;
  if (out.show) delete out.show.infoHost;
  // arrays copy by value, not by reference (steps stay independent)
  out.menuSubset = Array.isArray(step.menuSubset) ? step.menuSubset.slice() : [];
  out.styleName.hidden = Array.isArray(step.styleName && step.styleName.hidden) ? step.styleName.hidden.slice() : [];
  out.menuGroups = fScenarioValidMenuGroups(step.menuGroups);
  // Whole-text size/width/columns: normalize silently (font 12–28, width
  // 320–1200, columns 1|2 → 2 else null). The validate path warns on
  // non-empty invalid input.
  out.styleText = {
    fontSizePx: fScenarioValidFontSizePx(out.styleText ? out.styleText.fontSizePx : null),
    textWidthPx: fScenarioValidTextWidthPx(out.styleText ? out.styleText.textWidthPx : null),
    columns: fScenarioValidColumns(out.styleText ? out.styleText.columns : null)
  };
  out.n = i + 1;
  return out;
}

function fScenarioValidate(obj) {
  var warnings = [];
  if (!obj || typeof obj !== "object") return { ok: false, warnings: ["Not a scenario object."] };
  var v = obj.scenarioVersion;
  if (typeof v === "undefined") {
    warnings.push("Legacy file (no scenarioVersion) — migrated in memory; Export to upgrade.");
  } else if (v > MuLERMoCScenario.SUPPORTED_VERSION) {
    return { ok: false, warnings: ["File needs a newer app (scenarioVersion " + v + ")."] };
  }
  if (!Array.isArray(obj.steps) || !obj.steps.length) {
    return { ok: false, warnings: ["Scenario has no steps."] };
  }
  var steps = [];
  obj.steps.forEach(function (s, i) {
    var hasMol = !!(s && s.selectedMol && typeof nameExamples !== "undefined" && nameExamples[s.selectedMol]);
    if (s && s.selectedMol && !hasMol) {
      warnings.push("Step " + (i + 1) + ": unknown molecule '" + s.selectedMol + "' — skipped.");
      return;
    }
    var st = fScenarioDefaults(s, steps.length);
    var _rawPx = s && s.styleText ? s.styleText.fontSizePx : null;
    if (_rawPx !== null && typeof _rawPx !== "undefined" && String(_rawPx) !== "" && fScenarioValidFontSizePx(_rawPx) === null) {
      warnings.push("Step " + (i + 1) + ": invalid text size discarded (default 18px used).");
    }
    var _rawW = s && s.styleText ? s.styleText.textWidthPx : null;
    if (_rawW !== null && typeof _rawW !== "undefined" && String(_rawW) !== "" && fScenarioValidTextWidthPx(_rawW) === null) {
      warnings.push("Step " + (i + 1) + ": invalid text width discarded (default 980px used).");
    }
    var _rawC = s && s.styleText ? s.styleText.columns : null;
    if (_rawC !== null && typeof _rawC !== "undefined" && String(_rawC) !== "" && fScenarioValidColumns(_rawC) === null && String(_rawC) !== "1") {
      warnings.push("Step " + (i + 1) + ": invalid column count discarded (default 1 column used).");
    }
    var rawMoveto = st.view3D && st.view3D.moveto ? st.view3D.moveto : null;
    st.view3D.moveto = fScenarioValidMoveto(st.view3D.moveto);
    if (rawMoveto && !st.view3D.moveto) {
      warnings.push("Step " + (i + 1) + ": invalid 3D view discarded (default used) — re-capture with rotate off.");
    }
    // menu derivation (mirrors fScenarioCapture; stored show.menu is
    // ignored so legacy files migrate): single pick collapses to the
    // step molecule, selection wins over a stray pick, menu shows only
    // for 2+ picks (molecule + menu, or molecule-less menu-only).
    var kept = [];
    (st.menuSubset || []).forEach(function (m) {
      if (m && typeof nameExamples !== "undefined" && nameExamples[m]) {
        if (kept.indexOf(m) < 0) kept.push(m);
      } else {
        warnings.push("Step " + (i + 1) + ": menu subset drops unknown molecule '" + m + "'.");
      }
    });
    if (!hasMol && kept.length === 1) {
      st.selectedMol = kept[0];
      hasMol = true;
      warnings.push("Step " + (i + 1) + ": single pick adopted as the step molecule.");
    }
    var showMenu = kept.length > 1;
    if (showMenu && hasMol && kept.indexOf(st.selectedMol) < 0) {
      kept.unshift(st.selectedMol);
      warnings.push("Step " + (i + 1) + ": its molecule added to the menu subset.");
    }
    if (!showMenu) kept = [];
    st.show = st.show || {};
    st.show.menu = showMenu;
    if (!hasMol) {
      // Menu-only step (selectedMol null): needs a browsable subset.
      if (!kept.length) {
        warnings.push("Step " + (i + 1) + ": no molecule and no menu subset — skipped.");
        return;
      }
      warnings.push("Step " + (i + 1) + ": menu-only step (no molecule).");
    }
    st.menuSubset = kept;
    steps.push(st);
  });
  if (!steps.length) return { ok: false, warnings: warnings.concat(["No valid steps left."]) };
  return { ok: true, steps: steps, title: obj.title || obj.scenario || "scenario", warnings: warnings };
}

// ── apply ──────────────────────────────────────────────────────────────
function fScenarioSetCheck(id, on, selectedCls, unselectedCls) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove(on ? unselectedCls : selectedCls);
  el.classList.add(on ? selectedCls : unselectedCls);
}

// Control-bar visuals mirror the restored globals: radios, checkboxes and
// the style dropdown are click-driven UI that fScenarioApply would otherwise
// leave showing the author's live states in presentation. All lookups are
// guarded; zigzag/disabled states come from fUpdateDiagr2DButton.
function fScenarioSyncControlUi() {
  try {
    if (typeof fUpdateDiagr2DButton === "function") fUpdateDiagr2DButton();
  } catch (e) {
    /* controls unavailable */
  }
  try {
    var m2d = typeof mode2D !== "undefined" ? mode2D : "condensed";
    var idx = m2d === "expanded" ? 1 : (m2d === "diagramatic" || m2d === "condensedZigZag") ? 2 : 0;
    var btns = document.querySelectorAll("#radio2DMode .mode2DOption");
    for (var k = 0; k < btns.length; k++) {
      if (btns[k].classList.contains("disabledRadio")) continue;
      btns[k].classList.remove(k === idx ? "unselectedRadio" : "selectedRadio");
      btns[k].classList.add(k === idx ? "selectedRadio" : "unselectedRadio");
    }
  } catch (e) {
    /* controls unavailable */
  }
  try {
    if (typeof atomSymbols3DFlag !== "undefined") fScenarioSetCheck("atomSymbolsCheck", !!atomSymbols3DFlag, "selectedCheck", "unselectedCheck");
    if (typeof hydrogens3DFlag !== "undefined") fScenarioSetCheck("hydrogensCheck", !!hydrogens3DFlag, "selectedCheck", "unselectedCheck");
    if (typeof rotateFlag !== "undefined") fScenarioSetCheck("rotateCheck", !!rotateFlag, "selectedCheck", "unselectedCheck");
  } catch (e) {
    /* controls unavailable */
  }
  // 2D color controls mirror the restored globals (the SVG class itself
  // re-syncs from the flag in fUpdateSVG).
  try {
    if (typeof svgAtomColors2DFlag !== "undefined") fScenarioSetCheck("svgAtomColorCheck", !!svgAtomColors2DFlag, "selectedCheck", "unselectedCheck");
    if (typeof atomColorMode2D !== "undefined") {
      var _cmBtns = document.querySelectorAll("#atomColorMode .atomColorModeRadio");
      for (var _ci = 0; _ci < _cmBtns.length; _ci++) {
        var _on = _cmBtns[_ci].getAttribute("data-color-mode") === atomColorMode2D;
        _cmBtns[_ci].classList.remove(_on ? "unselectedRadio" : "selectedRadio");
        _cmBtns[_ci].classList.add(_on ? "selectedRadio" : "unselectedRadio");
      }
    }
  } catch (e) {
    /* controls unavailable */
  }
  try {
    // Same labels as fCreateDropMenu (teaching layer).
    var visLabels = { ballnstick: "Σφαίρες και Ράβδοι", spacefill: "Χωροπληρωτικό", sticks: "Ράβδοι" };
    var dl = document.getElementById("dropLabel");
    if (dl && typeof vis3D !== "undefined" && visLabels[vis3D]) dl.innerHTML = visLabels[vis3D];
  } catch (e) {
    /* controls unavailable */
  }
  // Master eye-edit button mirrors the live-only authoring flag (single
  // icon + .active highlight).
  try {
    var _eyeBtn = document.getElementById("nameStyleEyeToggle");
    if (_eyeBtn && typeof svgEyeState !== "undefined") {
      _eyeBtn.innerHTML = svgEyeState;
      _eyeBtn.classList.toggle("active", window.nameEyeEdit === true);
    }
  } catch (e) {
    /* naming controls unavailable */
  }
  // Narration toggle mirrors narrateAnalysisFlag (icon + .active highlight).
  try {
    var _narrBtn = document.getElementById("narrateAnalysisToggle");
    if (_narrBtn && typeof svgSpeaker !== "undefined" && typeof svgMute !== "undefined"
        && typeof narrateAnalysisFlag !== "undefined") {
      _narrBtn.innerHTML = narrateAnalysisFlag ? svgSpeaker : svgMute;
      _narrBtn.classList.toggle("active", narrateAnalysisFlag === true);
    }
  } catch (e) {
    /* naming controls unavailable */
  }
}

// Checkbox settings live only as DOM classes (no JS global) — capture them
// literally; a missing element falls back to the UI default.
function fScenarioCheck(id, fallback) {
  try {
    var el = document.getElementById(id);
    if (!el) return !!fallback;
    return el.classList.contains("selectedCheck");
  } catch (e) {
    return !!fallback;
  }
}

// Author checkbox states (highlight options) stashed on Present entry so Exit
// can restore the author's working settings instead of the step's values.
function fScenarioStashAuthorSettings() {
  MuLERMoCScenario.authorSettings = {
    bondAtoms: fScenarioCheck("bondAtomsCheck", false),
    numberingAtoms: fScenarioCheck("highlightNumberingCheck", true),
    nameHidden: Array.isArray(window.nameHiddenComps) ? window.nameHiddenComps.slice() : [],
    nameEyeEdit: window.nameEyeEdit === true,
  };
}

function fScenarioRestoreAuthorSettings() {
  var a = MuLERMoCScenario.authorSettings;
  if (!a) return;
  fScenarioSetCheck("bondAtomsCheck", !!a.bondAtoms, "selectedCheck", "unselectedCheck");
  fScenarioSetCheck("highlightNumberingCheck", a.numberingAtoms !== false, "selectedCheck", "unselectedCheck");
  window.nameHiddenComps = Array.isArray(a.nameHidden) ? a.nameHidden.slice() : [];
  window.nameEyeEdit = a.nameEyeEdit === true;
  // Re-render the name boxes with the author's live hidden set (the last
  // present step's view lingers otherwise); the naming-chrome hook no-ops
  // outside presentation.
  try {
    if (typeof fShowNameAnalysis === "function") fShowNameAnalysis();
  } catch (e) {
    /* naming unavailable */
  }
  MuLERMoCScenario.authorSettings = null;
}

// ── menu subset pick (per-step LEARN menus) ──────────────────────────────
// Authors tick molecules (and whole groups) in the left menu; each step stores
// its own copy (`menuSubset`). No Menu checkbox: presentation shows the menu
// only for 2+ picks (derived at capture/validate); a single pick collapses
// to the step molecule and selection wins over a stray pick.
function fScenarioPickHas(mol) {
  return fScenarioActive().menuPick.indexOf(mol) >= 0;
}

function fScenarioSetPick(mol, on) {
  if (!mol) return;
  var act = fScenarioActive();
  var i = act.menuPick.indexOf(mol);
  if (on && i < 0) act.menuPick.push(mol);
  if (!on && i >= 0) act.menuPick.splice(i, 1);
  fScenarioSyncLegacy();
  fScenarioPaintPickUi();
}

function fScenarioSetGroupPick(groupKey, on) {
  try {
    var hdr = document.querySelector('.crossMenuLi[data-group-key="' + groupKey + '"]');
    if (!hdr) return;
    var box = hdr.nextElementSibling;
    if (!box) return;
    var rows = box.querySelectorAll(".menuLi");
    var act = fScenarioActive();
    for (var r = 0; r < rows.length; r++) {
      var mol = rows[r].id;
      if (!mol) continue;
      var i = act.menuPick.indexOf(mol);
      if (on && i < 0) act.menuPick.push(mol);
      if (!on && i >= 0) act.menuPick.splice(i, 1);
    }
    fScenarioSyncLegacy();
  } catch (e) {
    /* menu unavailable */
  }
  fScenarioPaintPickUi();
}

// In pick mode, selecting a molecule also picks it for the snapshot menu
// (called from the teaching-layer row click via a guarded hook).
function fScenarioPickOnSelect(mol) {
  if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring || !MuLERMoCScenario.menuPickMode || !mol) return;
  if (!fScenarioPickHas(mol)) fScenarioSetPick(mol, true);
}

// Unpicking the selected molecule also deselects it (viewers go empty via
// the standard path). Guarded: molview always defines it in the app.
function fScenarioDeselectIfUnpicked() {
  try {
    if (typeof selectedMol !== "undefined" && selectedMol &&
        !fScenarioPickHas(selectedMol) &&
        typeof fDeselectMol === "function") {
      fDeselectMol();
    }
  } catch (e) {
    /* selection unavailable */
  }
}

// Free-browse resync (additive, guarded): selecting a flat-menu row (or any
// in-presentation control) rebuilds the name boxes via the standard path,
// which recreates #nameSettingsBtnDiv/#nameSettingsPanel + voice buttons
// without the presentation hides. Re-assert the current step's naming chrome
// so the freshly browsed molecule honors the step's checkboxes.
function fScenarioOnPresentBrowse() {
  try {
    if (!MuLERMoCScenario.present) return;
    fScenarioApplyNamingChrome();
  } catch (e) {
    /* menu unavailable */
  }
}

// (Re)paints the pick UI after every menu rebuild. Author mode: toggle button
// + checkboxes (tri-state group boxes). Present mode: no checkboxes — apply
// the current step's filter instead (covers grouping switches mid-present).
function fScenarioPaintPickUi() {
  try {
    var menu = document.getElementById("nomeclature2Menu");
    if (!menu) return;
    var title = menu.querySelector(".panelTitle");
    // pick-mode toggle button (authoring mode only)
    var btn = document.getElementById("scPickToggle");
    if (!MuLERMoCScenario.present && MuLERMoCScenario.authoring) {
      if (!btn && title) {
        btn = document.createElement("button");
        btn.id = "scPickToggle";
        btn.type = "button";
        btn.className = "checkBoxContainer unselectedCheck";
        btn.innerHTML = '&nbsp;<span class="checkBox"></span><span class="scPickCount" hidden></span>';
        title.appendChild(btn);
      }
      if (btn) {
        btn.classList.remove("is-hidden");
        btn.style.display = "";
        var n = fScenarioActive().menuPick.length;
        var on = !!MuLERMoCScenario.menuPickMode;
        btn.classList.remove("active");
        btn.classList.toggle("selectedCheck", on);
        btn.classList.toggle("unselectedCheck", !on);
        btn.setAttribute("aria-checked", on ? "true" : "false");
        btn.removeAttribute("title");
        btn.setAttribute("data-tooltip", "Επιλογή μορίων για το στιγμιότυπο" + (n ? " (" + n + ")" : ""));
        var badge = btn.querySelector(".scPickCount");
        if (badge) {
          badge.textContent = n ? String(n) : "";
          if (n) badge.removeAttribute("hidden");
          else badge.setAttribute("hidden", "");
        }
      }
    } else if (btn) {
      btn.classList.add("is-hidden");
    }
    // strip stale boxes (rebuilt menu), then paint or render
    var stale = menu.querySelectorAll(".scPickBox, .scGroupBox");
    for (var s = 0; s < stale.length; s++) stale[s].remove();
    if (MuLERMoCScenario.present) {
      fScenarioRenderPresentMenu();
      return;
    }
    if (!MuLERMoCScenario.menuPickMode) return;
    var rows = menu.querySelectorAll(".menuLi");
    for (var r = 0; r < rows.length; r++) {
      if (!rows[r].id) continue;
      var box = document.createElement("input");
      box.type = "checkbox";
      box.className = "scPickBox";
      box.title = "Include in snapshot menu";
      box.setAttribute("data-mol", rows[r].id);
      box.checked = fScenarioPickHas(rows[r].id);
      rows[r].insertBefore(box, rows[r].firstChild);
    }
    var hdrs = menu.querySelectorAll(".crossMenuLi");
    for (var h = 0; h < hdrs.length; h++) {
      var gbox = document.createElement("input");
      gbox.type = "checkbox";
      gbox.className = "scGroupBox";
      gbox.title = "Include whole group";
      gbox.setAttribute("data-group", hdrs[h].getAttribute("data-group-key") || "");
      var gboxEl = hdrs[h].nextElementSibling;
      var members = gboxEl ? gboxEl.querySelectorAll(".menuLi") : [];
      var picked = 0, total = 0;
      for (var m = 0; m < members.length; m++) {
        if (!members[m].id) continue;
        total++;
        if (fScenarioPickHas(members[m].id)) picked++;
      }
      gbox.checked = total > 0 && picked === total;
      gbox.indeterminate = picked > 0 && picked < total;
      hdrs[h].insertBefore(gbox, hdrs[h].firstChild);
    }
  } catch (e) {
    /* menu unavailable */
  }
}

// Current step's subset when presentation shows the menu, else null.
function fScenarioStepSubset() {
  var ps = fScenarioPresent();
  var st = ps.steps[ps.index];
  if (!MuLERMoCScenario.present || !st || !st.show || st.show.menu !== true) return null;
  return Array.isArray(st.menuSubset) ? st.menuSubset : [];
}

// Flat present menu for subset steps: a simple per-step molecule list with
// LOCAL numbering (1..N of the shown subset) — never the global dataset
// numbering. Rows keep id + .menuLi so selection marking and click-to-browse
// work unchanged. Rebuilt on every present navigation; Exit rebuilds the
// author menu instead (see exit handler).
// Per-step Ταξινομήσεις Μένου (st.menuGroups): ["molecules"] (or empty →
// fallback) renders the flat list; a single classified mode renders the
// subset grouped (collapsible); 2+ checked modes render a present grouping
// switcher (memory-only choice, default = molecules when checked).
function fScenarioMenuFormula(prop) {
  return String((nameExamples[prop] && nameExamples[prop].formula) || prop)
    .replace(/(\d+)/g, "<sub>$1</sub>")
    .replace(/(['='])/g, '<span class="bondSymbol large">&#9552;</span>')
    .replace(/(['_'])/g, '<span class="bondSymbol">&#9776;</span>');
}
function fScenarioMenuRowHtml(prop, n) {
  var sel = prop === selectedMol ? " selectedLi" : "";
  return "<div id='" + prop + "' class='menuLi" + sel + "'><span class='menuLiCounter'>" + n + ".</span><span class='menuLiFormula'> " + fScenarioMenuFormula(prop) + "</span></div>";
}
function fScenarioPresentMenuGroups() {
  try {
    var ps = fScenarioPresent();
    var st = ps && ps.steps ? ps.steps[ps.index] : null;
    if (!MuLERMoCScenario.present || !st || !st.show || st.show.menu !== true) return ["molecules"];
    return fScenarioValidMenuGroups(st.menuGroups);
  } catch (e) {
    return ["molecules"];
  }
}
var SCENARIO_MENU_GROUP_LABELS = { molecules: "Μόρια", chemclass: "Χημικές Τάξεις", series: "Ομόλογες Σειρές" };
function fScenarioPresentGroupsHtml(subset, mode, counter) {
  var isChem = mode === "chemclass";
  var buckets = {}, labels = {}, order = [];
  subset.forEach(function (prop) {
    if (!prop || !nameExamples[prop]) return;
    var cl = nameExamples[prop].classification || {};
    var key = isChem ? (cl.chemicalClass || "unclassified") : (cl.seriesKey || "unclassified");
    if (!buckets[key]) {
      buckets[key] = [];
      var lab = isChem
        ? ((typeof chemicalClassLabels !== "undefined" && chemicalClassLabels[key]) || cl.taxonomy)
        : ((typeof homologousSeriesLabels !== "undefined" && homologousSeriesLabels[key]) || cl.taxonomy);
      labels[key] = lab || "Μη ταξινομημένα";
      order.push(key);
    }
    buckets[key].push(prop);
  });
  // canonical author-menu group order first (never drop picked molecules:
  // leftover keys append after it).
  var canon = isChem
    ? (typeof chemicalClassLabels !== "undefined" ? Object.keys(chemicalClassLabels) : [])
    : (typeof homologousSeriesLabels !== "undefined" ? Object.keys(homologousSeriesLabels).concat(["unclassified"]) : []);
  var seen = {};
  var sorted = [];
  canon.concat(order).forEach(function (k) {
    if (!buckets[k] || seen[k]) return;
    seen[k] = true;
    sorted.push(k);
  });
  var html = "";
  // All groups start shut except the one holding the selected molecule
  // (visible selection on step entry / free-browse).
  var selKey = null;
  if (typeof selectedMol !== "undefined" && selectedMol) {
    for (var sk = 0; sk < sorted.length && !selKey; sk++) {
      if (buckets[sorted[sk]].indexOf(selectedMol) >= 0) selKey = sorted[sk];
    }
  }
  sorted.forEach(function (key) {
    var members = buckets[key];
    try {
      if (typeof fSortPropsByCarbonCount === "function") members = fSortPropsByCarbonCount(members.slice());
    } catch (e) {
      /* keep pick order */
    }
    var openCls = key === selKey ? "open" : "closed";
    html += "<div class='scPresentGroup " + openCls + "' data-pgroup-key='" + key + "'>" + labels[key] + "</div><div class='scPresentGroups " + openCls + "'>";
    members.forEach(function (prop) {
      counter.n++;
      html += fScenarioMenuRowHtml(prop, counter.n);
    });
    html += "</div>";
  });
  return html;
}
function fScenarioRenderPresentMenu(view) {
  var subset = fScenarioStepSubset();
  if (!subset) return;
  try {
    var menu = document.getElementById("nomeclature2Menu");
    if (!menu || typeof nameExamples === "undefined") return;
    var groups = fScenarioPresentMenuGroups();
    if (!view || groups.indexOf(view) < 0) {
      view = groups.indexOf("molecules") >= 0 ? "molecules" : groups[0];
    }
    var html = "<div class='panelTitle'> Παραδείγματα </div>";
    if (groups.length > 1) {
      html += "<div class='scPresentGrouping' role='group' aria-label='Ομαδοποίηση μενού'>";
      groups.forEach(function (g) {
        html += "<div class='radioCheckContainer " + (g === view ? "selectedRadio" : "unselectedRadio") + "' data-pgroup='" + g + "'>" + (SCENARIO_MENU_GROUP_LABELS[g] || g) + "<span class='radioCheck'></span></div>";
      });
      html += "</div>";
    }
    html += "<div class='menuNomeclature2Container'>";
    if (view === "molecules") {
      html += "<div class='menuListContainer'>";
      for (var i = 0; i < subset.length; i++) {
        var prop = subset[i];
        if (!prop || !nameExamples[prop]) continue;
        html += fScenarioMenuRowHtml(prop, i + 1);
      }
      html += "</div>";
    } else {
      // one scroll box for all groups (reuses the menuListContainer cap)
      html += "<div class='menuListContainer'>" + fScenarioPresentGroupsHtml(subset, view, { n: 0 }) + "</div>";
    }
    html += "</div>";
    menu.innerHTML = html;
    // switcher (scenario-owned; the teaching .groupingMode stays hidden in
    // presentation and untouched)
    var sw = menu.querySelectorAll(".scPresentGrouping [data-pgroup]");
    for (var s = 0; s < sw.length; s++) {
      sw[s].onclick = (function (m) {
        return function () { fScenarioRenderPresentMenu(m); };
      })(sw[s].getAttribute("data-pgroup"));
    }
    // collapsible group headers (scenario-owned: no teaching-layer
    // .crossMenuLi deselect side effects). App-identical accordion: opening
    // a group shuts the others, clicking the open one shuts it. Explicit
    // slideUp/slideDown like the main menu (never direction-inferring
    // slideToggle); classes stay the styling authority. Selection and
    // show.rule state are preserved (no fDeselectMol in presentation).
    var hd = menu.querySelectorAll(".scPresentGroup");
    for (var h = 0; h < hd.length; h++) {
      hd[h].onclick = (function (el) {
        return function () {
          var box = el.nextElementSibling;
          if (!box) return;
          var canSlide = (typeof $ !== "undefined" && $(box).slideUp && $(box).slideDown);
          if (el.classList.contains("open")) {
            el.classList.remove("open");
            el.classList.add("closed");
            box.classList.remove("open");
            box.classList.add("closed");
            try {
              if (canSlide) $(box).slideUp(150);
            } catch (e) {
              /* classes already hide */
            }
            return;
          }
          var others = menu.querySelectorAll(".scPresentGroup.open");
          for (var o = 0; o < others.length; o++) {
            others[o].classList.remove("open");
            others[o].classList.add("closed");
          }
          var openBoxes = menu.querySelectorAll(".scPresentGroups.open");
          for (var b = 0; b < openBoxes.length; b++) {
            openBoxes[b].classList.remove("open");
            openBoxes[b].classList.add("closed");
            try {
              if (canSlide) $(openBoxes[b]).slideUp(150);
            } catch (e) {
              /* classes already hide */
            }
          }
          el.classList.remove("closed");
          el.classList.add("open");
          box.classList.remove("closed");
          box.classList.add("open");
          try {
            if (canSlide) $(box).slideDown(150);
          } catch (e) {
            /* classes already show */
          }
        };
      })(hd[h]);
    }
  } catch (e) {
    /* menu unavailable */
  }
}

// Pristine author menu after Exit: presentation replaced the menu DOM with
// the flat subset list, so rebuild it (grouping mode was never touched).
// Re-marks the current molecule; the render hook repaints pick UI.
function fScenarioRestoreAuthorMenu() {
  try {
    if (typeof fInitNomeclatureMenu === "function") fInitNomeclatureMenu();
  } catch (e) {
    /* menu unavailable */
  }
  try {
    if (selectedMol) {
      var rows = document.querySelectorAll("#nomeclature2Menu .menuLi");
      for (var r = 0; r < rows.length; r++) {
        rows[r].classList.toggle("selectedLi", rows[r].id === selectedMol);
      }
    }
  } catch (e) {
    /* menu unavailable */
  }
}

// S2: 3D-parse gate. Called from fFetchAndParse3D completion (molview,
// guarded) so the per-step name highlight runs after 3D analysis exists for
// this molecule. A 2s fallback timer in fScenarioApply covers 3D-hidden steps,
// fetch failures, or a missing hook — whichever fires first wins, stale tokens
// abort.
function fScenarioOn3DParsed(mol) {
  var p = MuLERMoCScenario.pending3D;
  if (!p || p.done || p.mol !== mol) return;
  if (p.token !== MuLERMoCScenario.applyToken) return;
  p.done = true;
  fScenarioClickNameBox(p.step, p.token);
}

function fScenarioClickNameBox(step, token) {
  if (typeof token === "number" && token !== MuLERMoCScenario.applyToken) return; // stale
  if (!step || !step.nameAnalysisMode ||
      fScenarioNormMode(step.nameAnalysisMode) === "none") return;
  // Locked interaction only gates user clicks (CSS .locked); the stored
  // highlight + explanation always replay in presentation.
  var compId = fScenarioCompIdFor(step.nameAnalysisMode);
  var box = compId && document.getElementById(compId);
  if (!box) return;
  // Hidden (dash) boxes stay inert: skip the stored highlight replay.
  try {
    if (box.classList && box.classList.contains("comp-hidden")) return;
  } catch (e) {
    /* DOM unavailable */
  }
  $(box).trigger("click");
  if (fScenarioNormMode(nameAnalysisMode) !== fScenarioNormMode(step.nameAnalysisMode)) {
    nameAnalysisMode = "none";
    $(".nameCompBox").removeClass("selected");
    fClearHighlights();
    fUpdateSVG();
    fExplainNameComp();
  }
}

function fScenarioApply(step) {
  if (!MuLERMoCScenario.ready || !step) return false;
  try {
    window.speechSynthesis && window.speechSynthesis.cancel();
  } catch (e) {
    /* no TTS */
  }
  // Menu-only step (no molecule): deselect first so no previous molecule
  // lingers, then apply chrome + the flat pick menu below.
  if (!step.selectedMol) {
    var menuTok = ++MuLERMoCScenario.applyToken;
    MuLERMoCScenario.pending3D = null;
    try {
      if (typeof fDeselectMol === "function") fDeselectMol();
    } catch (e) {
      /* fall through to chrome */
    }
    // Display prefs become live (visuals only, no viewer load) so visible
    // bars match the step and carry into flat-menu browsing.
    mode2D = step.mode2D;
    modeSuffix = mode2D === "expanded" ? "_E" : mode2D === "condensed" ? "" : "_diagr2D";
    if (step.style2D.zigzag) mode2D = "condensedZigZag";
    atomSymbols3DFlag = !!step.view3D.atomSymbols;
    hydrogens3DFlag = !!step.view3D.showH;
    vis3D = step.view3D.style;
    rotateFlag = !!step.view3D.spin;
    svgAtomColors2DFlag = !!step.style2D.atomColors;
    atomColorMode2D = step.style2D.colorMode;
    fScenarioSyncControlUi();
    // author's live selectedRule untouched on menu-only steps
    fScenarioChrome(step.show);
    return true;
  }
  // 1. state globals (same scope as molview/teaching layers)
  selectedMol = step.selectedMol;
  mode2D = step.mode2D;
  modeSuffix = mode2D === "expanded" ? "_E" : mode2D === "condensed" ? "" : "_diagr2D";
  if (step.style2D.zigzag) mode2D = "condensedZigZag";
  mainChainMode = step.mainChainMode;
  etherNamingMode = step.etherNamingMode;
  atomSymbols3DFlag = !!step.view3D.atomSymbols;
  hydrogens3DFlag = !!step.view3D.showH;
  vis3D = step.view3D.style;
  svgAtomColors2DFlag = !!step.style2D.atomColors;
  atomColorMode2D = step.style2D.colorMode;
  try {
    localStorage.setItem("atomColorMode2D", atomColorMode2D);
  } catch (e) {
    /* private mode */
  }
  window.nameBoxFlag = !!step.styleName.box;
  window.nameCrossFlag = !!step.styleName.cross;
  narrateAnalysisFlag = !!step.audio.narrate;
  nameSettingsFlag = !!step.styleName.panelOpen;
  // No-flash: the load path rebuilds #nameSettingsPanel from this flag, and
  // chrome only closes it afterwards (visible open->close fade). When the
  // step hides the naming controls, render closed on first paint instead.
  // Author mode and nameSettings:true steps keep the stored value.
  try {
    var _nsOff = MuLERMoCScenario.present && step.show && step.show.nameSettings !== true;
    if (_nsOff) {
      nameSettingsFlag = false;
      window.nameSettingsFlag = false;
    } else {
      window.nameSettingsFlag = nameSettingsFlag;
    }
  } catch (e) {
    window.nameSettingsFlag = nameSettingsFlag;
  }
  // Highlight checkboxes (DOM-class-only settings): restore per step so the
  // highlight readers observe snapshot values. Missing group → UI defaults.
  var _sh = step.styleHighlight || {};
  fScenarioSetCheck("bondAtomsCheck", !!_sh.bondAtoms, "selectedCheck", "unselectedCheck");
  fScenarioSetCheck("highlightNumberingCheck", _sh.numberingAtoms !== false, "selectedCheck", "unselectedCheck");
  if (typeof step.selectedRule === "number") selectedRule = step.selectedRule;
  // S2: per-step token — every async follow-up below aborts when a newer
  // step takes over (rapid Prev/Next, hash jumps).
  var token = ++MuLERMoCScenario.applyToken;
  MuLERMoCScenario.pending3D = null;
  // spin off during the jump, restored after the gated moveto
  var wantSpin = !!step.view3D.spin;
  rotateFlag = false;

  // 2. menu selection marker (menu itself may be hidden)
  try {
    $(".menuLi").removeClass("selectedLi");
    $("#" + CSS.escape(step.selectedMol)).addClass("selectedLi");
  } catch (e) {
    /* menu not rendered in this grouping */
  }

  // 3. load molecule through the standard path
  fSelectMol();
  // Per-step hidden set re-asserted after the load: fSelectMol resets
  // visibility for the new molecule, then the step's stored set applies.
  // Same synchronous task as the load render → single paint, no flash.
  window.nameHiddenComps = Array.isArray(step.styleName.hidden) ? step.styleName.hidden.slice() : [];
  // Master eye switch seeds from the step's visibility flag: with the naming
  // settings gear shown it stays live and toggles the eyes (fNameEyeVisible).
  window.nameEyeEdit = !!(step.show && step.show.nameEye === true);
  try {
    if (typeof fShowNameAnalysis === "function") fShowNameAnalysis();
  } catch (e) {
    /* naming unavailable */
  }
  rotate3D();
  // 3b. control bars mirror the restored globals (bars keep live states
  // otherwise); runs after the load so representation fallbacks are final.
  fScenarioSyncControlUi();

  // 4. custom 3D camera, gated behind the fLoadMol3D load batch (S2): the
  // data-file `moveto + script init` queued by fLoadMol3D wins, then the
  // per-step camera applies on top. Without a custom view, spin restores now.
  if (step.show.viewers["3D"] && step.view3D.moveto) {
    (function (tok, mv) {
      setTimeout(function () {
        if (tok !== MuLERMoCScenario.applyToken) return; // stale
        try {
          Jmol.script(jmolAppletNomeclature, mv);
        } catch (e) {
          /* 3D unavailable */
        }
        if (tok === MuLERMoCScenario.applyToken) {
          rotateFlag = wantSpin;
          rotate3D();
        }
      }, 400);
    })(token, step.view3D.moveto);
  } else {
    rotateFlag = wantSpin;
    rotate3D();
  }

  // 5. name highlight via the standard click path, gated on 3D analysis (S2):
  // with a visible 3D viewer the click waits for fScenarioOn3DParsed (or the
  // fallback timer); 2D-only steps click immediately.
  if (step.nameAnalysisMode && fScenarioNormMode(step.nameAnalysisMode) !== "none") {
    if (step.show.viewers["3D"]) {
      MuLERMoCScenario.pending3D = { token: token, mol: step.selectedMol, step: step, done: false };
      (function (tok) {
        setTimeout(function () {
          var p = MuLERMoCScenario.pending3D;
          if (tok !== MuLERMoCScenario.applyToken || !p || p.done || p.token !== tok) return;
          p.done = true;
          fScenarioClickNameBox(p.step, tok);
        }, 2000);
      })(token);
    } else {
      fScenarioClickNameBox(step, token);
    }
  }

  // 6. rule area
  try {
    if (step.show.rule) {
      $("#ruleTheoryContainer").show();
      if (typeof step.selectedRule === "number" && typeof fShowRuleTheory === "function") {
        fShowRuleTheory();
        $("#ruleTheory").show();
      }
    } else {
      $("#ruleTheoryContainer").hide();
    }
  } catch (e) {
    /* rule DOM unavailable */
  }

  // 7. chrome per show.*
  fScenarioChrome(step.show);
  return true;
}

function fScenarioHide(id, hide) {
  var el = document.getElementById(id);
  if (el) el.style.display = hide ? "none" : "";
}

// Presentation CSS hook: #pageContainer.presenting scopes all present-only
// overrides (scenario stylesheet). Display authority stays in CSS; JS only
// flips this one class, so present styling survives menu/name rebuilds.
function fScenarioSyncPresentClass() {
  try {
    var pc = document.getElementById("pageContainer");
    if (pc) pc.classList.toggle("presenting", !!MuLERMoCScenario.present);
  } catch (e) {
    /* no DOM */
  }
}

// Full-chrome restore for Exit: clears BOTH the inline display set by
// fScenarioHide and the `hide` class set by the app's own viewer toggles
// (fToggleViewer2D/3D add it to the control bars; `.hide` is
// `display:none !important`, so inline restore alone cannot bring those bars
// back). Re-activates the viewer buttons to match the forced both-visible
// state, so the next snapshot capture reads them truthfully.
function fScenarioRestoreChrome() {
  var ids = [
    "radio2DMode", "controls3D", "save2DBtn", "save3DBtn",
    "jsmeNomeclatureDIV", "jsmeNomeclatureSVG", "nomeclature3D",
    "menuCol", "viewerVisBtns", "viewerSettingsBtnDiv",
    "nameAnalysisContainer",
  ];
  ids.forEach(function (id) {
    try {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.display = "";
      if (el.classList) el.classList.remove("hide");
    } catch (e) {
      /* no DOM */
    }
  });
  ["view2DBtn", "view3DBtn"].forEach(function (id) {
    try {
      var btn = document.getElementById(id);
      if (btn && btn.classList) btn.classList.add("active");
    } catch (e) {
      /* no DOM */
    }
  });
}

function showTextOn(step) {
  // Automatic: heading + text show iff the step carries content
  // (title or note). The legacy show.text flag is ignored.
  return !!(step && (step.title || step.note));
}

function showNoteOn(step) {
  // The text card shows iff the note carries real text: strip the allowed
  // simple-HTML tags + whitespace, so tag-only or blank notes count as
  // empty and the card stays hidden (no empty bordered box).
  if (!step || !step.note) return false;
  return step.note.replace(/<[^>]*>/g, "").trim() !== "";
}

// Simple note formatting: escape everything, then re-allow only
// <b>, <i>, <u>, <sup>, <sub>, <ul>, <ol>, <li>, <small>, <big>
// (no attributes). Anything else stays escaped,
// so there is no markup/script injection surface.
function fScenarioRenderNote(el, note) {
  if (!el) return;
  var div = document.createElement("div");
  div.textContent = note || "";
  el.innerHTML = div.innerHTML.replace(
    /&lt;(\/?)(b|i|u|sup|sub|ul|ol|li|small|big)&gt;/gi,
    function (m, slash, tag) { return "<" + slash + tag.toLowerCase() + ">"; }
  );
}

// Note toolbar helpers (authoring only, display-level): wrap the textarea
// selection with an allowed tag pair, or build a list from selected lines.
// Writes back to st.note via the same path as onchange; render stays safe
// through fScenarioRenderNote (escape-first, attributeless allowlist).
function fScenarioWrapNoteSelection(noteInput, st, open, close) {
  if (!noteInput) return;
  try { noteInput.focus(); } catch (e) { /* no DOM */ }
  var val = noteInput.value || "";
  var s = 0, e = val.length;
  try { s = noteInput.selectionStart || 0; e = noteInput.selectionEnd || 0; } catch (err) { /* no selection API */ }
  if (e < s) { var t = s; s = e; e = t; }
  var sel = val.slice(s, e) || "";
  var next = val.slice(0, s) + open + sel + close + val.slice(e);
  noteInput.value = next;
  st.note = next;
  try {
    var pos = s + open.length + sel.length + close.length;
    noteInput.setSelectionRange(pos, pos);
  } catch (err2) { /* no selection API */ }
  fScenarioCheckNoteTags(noteInput);
}
function fScenarioMakeNoteList(noteInput, st, listTag) {
  if (!noteInput) return;
  try { noteInput.focus(); } catch (e) { /* no DOM */ }
  var val = noteInput.value || "";
  var s = 0, e = val.length;
  try { s = noteInput.selectionStart || 0; e = noteInput.selectionEnd || 0; } catch (err) { /* no selection API */ }
  if (e < s) { var t = s; s = e; e = t; }
  var sel = val.slice(s, e) || "";
  var lines = sel.split(/\r?\n/).map(function (ln) { return ln.trim(); }).filter(function (ln) { return ln !== ""; });
  if (!lines.length) lines = [sel || "Στοιχείο λίστας"];
  // Strip a pre-existing single wrap so re-clicking toggles instead of nesting.
  var items = lines.map(function (ln) {
    return "<li>" + ln.replace(/^<li>|<\/li>$/g, "") + "</li>";
  }).join("");
  var block = "<" + listTag + ">" + items + "</" + listTag + ">";
  var next = val.slice(0, s) + block + val.slice(e);
  noteInput.value = next;
  st.note = next;
  try {
    var pos = (val.slice(0, s) + block).length;
    noteInput.setSelectionRange(pos, pos);
  } catch (err2) { /* no selection API */ }
  fScenarioCheckNoteTags(noteInput);
}
function fScenarioCleanNote(noteInput, st) {
  if (!noteInput) return;
  var next = String(noteInput.value || "").replace(/<\/?[^>]*>/g, "");
  noteInput.value = next;
  st.note = next;
  fScenarioCheckNoteTags(noteInput);
}
function fScenarioCheckNoteTags(noteInput) {
  if (!noteInput || !noteInput.classList) return;
  var val = noteInput.value || "";
  var tags = ["b", "i", "u", "sup", "sub", "ul", "ol", "li", "small", "big"];
  var bad = false;
  for (var k = 0; k < tags.length; k++) {
    var open = (val.match(new RegExp("<" + tags[k] + ">", "gi")) || []).length;
    var shut = (val.match(new RegExp("</" + tags[k] + ">", "gi")) || []).length;
    if (open !== shut) { bad = true; break; }
  }
  noteInput.classList.toggle("tag-warn", bad);
  noteInput.title = bad ? "Μη κλεισμένη ετικέτα — ελέγξτε τα <...>." : "";
}
// Duplicate a step: deep-clone, insert right after, title gains
// " (αντίγραφο)". No schema change; renumber keeps n gap-free.
function fScenarioDuplicateStep(scenId, idx) {
  var s = (scenId && fScenarioGet(scenId)) || fScenarioActive();
  if (!s || !s.steps || idx < 0 || idx >= s.steps.length) return;
  var src = s.steps[idx];
  var copy;
  try {
    copy = JSON.parse(JSON.stringify(src));
  } catch (e) {
    return;
  }
  copy.title = (src.title || "step") + " (αντίγραφο)";
  s.steps.splice(idx + 1, 0, copy);
  fScenarioRenumber(scenId);
  fScenarioToast("Duplicated step " + src.n + " as step " + (idx + 2) + ".");
}

function fScenarioFillStepPanel(step) {
  var h1 = document.getElementById("pageTitle");
  var p = document.getElementById("scStepText");
  if (!h1 || !p) return;
  var appTitle = MuLERMoCScenario.appTitle || h1.textContent || "";
  // simple-HTML note subset (see fScenarioRenderNote); rich noteFormat reserved for later
  if (MuLERMoCScenario.present && step && step.n && showTextOn(step)) {
    if (step.title) {
      h1.textContent = "";
      var numSpan = document.createElement("span");
      numSpan.className = "scStepNumberTitle";
      numSpan.textContent = step.n + ".";
      h1.appendChild(numSpan);
      h1.appendChild(document.createTextNode(" " + step.title));
    } else {
      h1.textContent = appTitle;
    }
    fScenarioRenderNote(p, step.note);
    fScenarioApplyStepFontSize(step);
  } else {
    h1.textContent = appTitle;
    p.textContent = "";
    fScenarioApplyStepFontSize(null);
  }
}

// Naming-chrome authority, shared by step entry (fScenarioChrome) and every
// later rebuild: fShowNameAnalysis() recreates #nameSettingsBtnDiv/
// #nameSettingsPanel + voice buttons without the presentation hides
// (free-browse selection, 2D/chain/ether control switches), so the current
// present step's show.* is re-asserted after any rebuild via
// fScenarioOnPresentBrowse() and the molview rebuild hook. Display-only:
// never mutates step data, nameSettingsFlag, or stored show.* (Export-safe).
// Outside presentation it actively clears any leaked lock/explain hide.
function fScenarioApplyNamingChrome(show) {
  var present = MuLERMoCScenario.present;
  if (!present) {
    // Full interactivity outside presentation: a locked present step must
    // never leak its lock (or its hidden explain line) into authoring —
    // the container node survives box rebuilds, so clear both actively.
    // Nothing outside presentation ever sets them; fExplainNameComp owns
    // the line's content independently.
    try {
      var _nc0 = document.getElementById("nameAnalysisContainer");
      if (_nc0 && _nc0.classList) _nc0.classList.remove("locked");
    } catch (e) {
      /* naming DOM unavailable */
    }
    // Clear a leaked hide, but honor fix 3: zero visible boxes keeps the
    // line hidden (a hint pointing at dashes is dead). Runs after the
    // render-path toggle on every authoring rebuild, same verdict.
    var _authNoVis = false;
    try {
      _authNoVis = document.querySelectorAll(".nameCompContainer .nameCompBox:not(.comp-hidden)").length === 0;
    } catch (e) {
      /* DOM unavailable */
    }
    fScenarioHide("nameAnalysisExplain", _authNoVis);
    return;
  }
  try {
    var _pst = fScenarioPresent();
    var _st = _pst && _pst.steps ? _pst.steps[_pst.index] : null;
    if (!_st) return;
    show = show || _st.show || {};
    // naming panel + settings + audio
    fScenarioHide("nameAnalysisContainer", present && show.naming === false);
    // locked name interaction: boxes ignore mouse clicks in presentation
    // (CSS .locked); the stored highlight + explanation still replay via
    // fScenarioClickNameBox. Hide the explain line only when locked with no
    // stored highlight (the click-hint would be dead); otherwise keep it.
    var locked = !!(present && show.nameClick === false);
    try {
      var _nc = document.getElementById("nameAnalysisContainer");
      if (_nc) _nc.classList.toggle("locked", locked);
    } catch (e) {
      /* naming DOM unavailable */
    }
    var _lockHasHl = !!(_st && _st.nameAnalysisMode &&
      fScenarioNormMode(_st.nameAnalysisMode) !== "none" && _st.selectedMol);
    // Fix 3: zero visible components hides the line even when the lock
    // logic above would keep it (a hint pointing at dashes is dead).
    // Molecule steps only — menu-only steps keep their hint by design.
    var _molNoVis = false;
    try {
      _molNoVis = !!(_st && _st.selectedMol) &&
        document.querySelectorAll(".nameCompContainer .nameCompBox:not(.comp-hidden)").length === 0;
    } catch (e) {
      /* DOM unavailable */
    }
    fScenarioHide("nameAnalysisExplain", (locked && !_lockHasHl) || _molNoVis);
    // Menu-only steps have no stored naming to explain: hide the hint line
    // only when interaction is locked (the hint would be dead). When
    // interaction is on the hint stays visible and reappears on free-browse
    // selection (see fScenarioOnPresentBrowse).
    try {
      if (present && (!_st || !_st.selectedMol)) {
        if (locked) {
          fScenarioHide("nameAnalysisExplain", true);
        } else if (show && show.naming !== false) {
          fScenarioHide("nameAnalysisExplain", false);
        }
      }
    } catch (e) {
      /* steps unavailable */
    }
    var ns = !(present && show.nameSettings !== true);
    fScenarioHide("nameSettingsBtnDiv", present && !ns);
    var panel = document.getElementById("nameSettingsPanel");
    if (panel && present && !ns) panel.classList.remove("open");
    // voice buttons: visible with audio on, or with the naming controls
    var audioOn = !(present && show.audio !== true && show.nameSettings !== true);
    ["narrateAnalysisToggle", "readNameBtn"].forEach(function (id) {
      fScenarioHide(id, !audioOn);
    });
  } catch (e) {
    /* naming DOM unavailable */
  }
}

function fScenarioChrome(show) {
  show = show || {};
  var present = MuLERMoCScenario.present;
  // viewers: hidden viewer is not rendered (mirrors fToggleViewer2D/3D scope)
  var show2D = !show.viewers || show.viewers["2D"] !== false;
  var show3D = !show.viewers || show.viewers["3D"] !== false;
  ["jsmeNomeclatureDIV", "jsmeNomeclatureSVG"].forEach(function (id) {
    fScenarioHide(id, !show2D);
  });
  fScenarioHide("nomeclature3D", !show3D);
  // A hidden 3D viewer keeps no model (mirrors fToggleViewer3D scope); hiding
  // 2D must not clear the 3D model.
  if (!show3D && typeof Jmol !== "undefined") {
    try {
      Jmol.script(jmolAppletNomeclature, "zap");
    } catch (e) {
      /* 3D unavailable */
    }
  }
  // control bars + save buttons
  var c2 = show.controls && show.controls["2D"] === true && show2D;
  var c3 = show.controls && show.controls["3D"] === true && show3D;
  fScenarioHide("radio2DMode", present && !c2);
  fScenarioHide("controls3D", present && !c3);
  fScenarioHide("save2DBtn", present && !(show.save && show.save["2D"] === true && show2D));
  fScenarioHide("save3DBtn", present && !(show.save && show.save["3D"] === true && show3D));
  // title-bar chrome: always hidden in presentation
  fScenarioHide("viewerVisBtns", present);
  fScenarioHide("viewerSettingsBtnDiv", present);
  fScenarioHide("viewerSettingsPanel", present);
  // menu column: hidden wholesale in presentation, unless this step carries
  // a menu subset to browse (flex row recenters the rest when hidden)
  var _ps = fScenarioPresent();
  var _menuStep = _ps.steps[_ps.index];
  var _menuOn = present && _menuStep && _menuStep.show && _menuStep.show.menu === true;
  fScenarioHide("menuCol", present && !_menuOn);
  // pick UI never appears in presentation (paint strips it on rebuilds too)
  if (present) {
    try {
      var _pt = document.getElementById("scPickToggle");
      if (_pt) _pt.classList.add("is-hidden");
      var _pb = document.querySelectorAll("#nomeclature2Menu .scPickBox, #nomeclature2Menu .scGroupBox");
      for (var _pi = 0; _pi < _pb.length; _pi++) _pb[_pi].remove();
    } catch (e) {
      /* menu unavailable */
    }
  }
  // naming panel + settings + audio (shared authority — also re-asserted
  // after every rebuild, see fScenarioApplyNamingChrome)
  fScenarioApplyNamingChrome(show);
  // per-step heading (page h1) + text div below it (title/note, plain text)
  var _txtStep = fScenarioPresent().steps[fScenarioPresent().index];
  fScenarioFillStepPanel(_txtStep);
  fScenarioHide("scStepText", !present || !showNoteOn(_txtStep));
  // own UI: author bar + drawer follow authoring mode; the edge tab
  // hides only in presentation (see fScenarioSyncAuthorUi)
  fScenarioSyncAuthorUi();
  var pb = document.getElementById("scenarioPlayBar");
  if (pb) pb.style.display = present ? "" : "none";
  // presentation CSS hook (self-heals on every step apply)
  fScenarioSyncPresentClass();
}

// ── authoring mode (right-edge tab) ────────────────────────────────────
// The author bar, drawer and pick UI live behind authoring mode (off by
// default, so the plain page is a clean explorer). The tab itself stays
// visible whenever not presenting; scratch (menuPick, steps) is kept when
// authoring turns off — only the UI hides and pick mode disengages.
function fScenarioSetAuthoring(on) {
  MuLERMoCScenario.authoring = !!on;
  if (!MuLERMoCScenario.authoring) {
    MuLERMoCScenario.menuPickMode = false;
    // Close the bar alone in this frame so its slide animates cleanly
    // (same sequencing as the Play close); teardown after it lands.
    fScenarioSyncAuthorUi(true);
    setTimeout(function () {
      var drs = document.querySelectorAll(".scenarioDrawer");
      for (var di = 0; di < drs.length; di++) drs[di].classList.remove("open");
      var lbs = document.querySelectorAll(".scList");
      for (var lbi = 0; lbi < lbs.length; lbi++) lbs[lbi].classList.remove("active");
      fScenarioPaintPickUi();
    }, 260);
    return;
  }
  fScenarioSyncAuthorUi();
  fScenarioPaintPickUi();
}

// Drawers live in-flow inside their own panel (down/up via .open), so no
// fixed-top anchoring is needed. Kept as a no-op for older call sites.
function fScenarioPositionDrawer(panel) {
  return;
}

// Author bar + drawer follow authoring && !present; the tab hides in
// presentation (clean stage) and shows otherwise.
function fScenarioSyncAuthorUi(skipDrawers) {
  var showBar = MuLERMoCScenario.authoring && !MuLERMoCScenario.present;
  var tb = document.getElementById("scenarioAuthorBar");
  if (tb) {
    // Classes are the sole visibility authority (inline display would
    // beat them and snap instead of animating).
    tb.style.display = "";
    tb.classList.toggle("open", showBar);
  }
  // Drawers: never force-open here (Steps buttons own that); close them
  // whenever the bar goes away (Steps loses its selected state too).
  // skipDrawers (authoring-off path) defers this past the bar slide so the
  // toggle frame carries only the bar animation.
  if (!showBar && !skipDrawers) {
    var drs = document.querySelectorAll(".scenarioDrawer");
    for (var dri = 0; dri < drs.length; dri++) {
      drs[dri].style.display = "";
      drs[dri].classList.remove("open");
    }
    var lbs = document.querySelectorAll(".scList");
    for (var lbi = 0; lbi < lbs.length; lbi++) lbs[lbi].classList.remove("active");
  }
  // Present hides the whole bar (handle travels with it); otherwise the
  // closed bar leaves only the handle peeking out at the right edge.
  if (tb) tb.classList.toggle("is-hidden", !!MuLERMoCScenario.present);
  var tab = document.getElementById("scenarioAuthorTab");
  if (tab) {
    tab.classList.toggle("active", !!MuLERMoCScenario.authoring);
    tab.classList.remove("is-hidden");
  }
}

// ── file export / import (memory + file, decision A) ────────────────────
// Export is per scenario card (v1 schema unchanged); Import adds a panel.
function fScenarioExport(id) {
  var scen = (id && fScenarioGet(id)) || fScenarioActive();
  if (!scen) return;
  var data = {
    scenarioVersion: MuLERMoCScenario.SUPPORTED_VERSION,
    app: "mulermoc-nom-44",
    scenario: scen.title,
    title: scen.title,
    steps: scen.steps,
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = String(scen.title || "scenario").replace(/\s+/g, "_") + ".scenario.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 500);
}

function fScenarioImportFile(file) {
  var r = new FileReader();
  r.onload = function () {
    try {
      var res = fScenarioValidate(JSON.parse(r.result));
      res.warnings.forEach(fScenarioToast);
      if (!res.ok) return;
      var scen = fScenarioNew(res.title || "imported-scenario", true);
      scen.steps = res.steps;
      scen.index = 0;
      fScenarioSyncLegacy();
      fScenarioBuildPanels();
      fScenarioToast("Imported " + res.steps.length + " steps as '" + scen.title + "'.");
    } catch (e) {
      fScenarioToast("Import failed: invalid JSON.");
    }
  };
  r.readAsText(file);
}

// Exit presentation in place (keeps in-memory steps): restore full chrome
// (menu menu-open + both viewers + all bars) via a transient clone — the
// stored step keeps its authored show.* for a later Export.
function fScenarioExitPresent() {
  MuLERMoCScenario.present = false;
  MuLERMoCScenario.presentId = null;
  MuLERMoCScenario.pending3D = null;
  try {
    history.replaceState(null, "", location.pathname);
  } catch (e) {
    /* file:// */
  }
  try {
    var drawer = document.getElementById("menuDrawer");
    if (drawer) {
      drawer.classList.remove("menu-closed");
      drawer.classList.add("menu-open");
    }
  } catch (e) {
    /* no drawer */
  }
  var _psx = fScenarioPresent();
  var st = _psx.steps[_psx.index];
  if (st) {
    var s;
    try {
      s = JSON.parse(JSON.stringify(st));
    } catch (e) {
      s = st;
    }
    s.show = s.show || {};
    s.show.viewers = { "2D": true, "3D": true };
    fScenarioApply(s);
    // exit restores full chrome (bars beaten by `hide` class or inline
    // display all come back; viewer buttons re-activated) ...
    fScenarioRestoreChrome();
    // ... the pristine author menu (present replaced it with the flat
    // subset list, so rebuild; the render hook repaints pick UI) ...
    fScenarioRestoreAuthorMenu();
    // ... and the author's own checkbox settings, not the step's
    fScenarioRestoreAuthorSettings();
  } else {
    fScenarioChrome(null);
    fScenarioRestoreChrome();
    fScenarioRestoreAuthorMenu();
  }
  // presentation CSS hook off (apply/chrome above already re-synced it,
  // this covers the no-step path explicitly)
  fScenarioSyncPresentClass();
}

// ── UI (scenario chrome lives in css/mulermoc-nom-scenario-44.css) ─────────
function fScenarioBuildUi() {
  if (!document.getElementById("scenarioToast")) {
    var t = document.createElement("div");
    t.id = "scenarioToast";
    document.body.appendChild(t);
  }
  // per-step educational text below the page title (heading = #pageTitle itself)
  if (!document.getElementById("scStepText")) {
    var textDiv = document.createElement("div");
    textDiv.id = "scStepText";
    textDiv.style.display = "none";
    var h1 = document.getElementById("pageTitle");
    if (h1 && h1.parentNode) h1.parentNode.insertBefore(textDiv, h1.nextSibling);
    else document.body.appendChild(textDiv);
  }
  // Per-scenario panel actions (resolved via closest .scenarioPanel).
  function fScenarioPanelIdFromEl(el) {
    try {
      var p = el && el.closest ? el.closest(".scenarioPanel") : null;
      return p ? p.getAttribute("data-scenario-id") : null;
    } catch (e) {
      return null;
    }
  }
  function fScenarioPresentBegin(id) {
    var scen = (id && fScenarioGet(id)) || fScenarioActive();
    if (!scen || !scen.steps.length) {
      fScenarioToast("Save at least one step first.");
      return;
    }
    try {
      history.replaceState(null, "", "#step=1");
    } catch (e) {
      /* file:// */
    }
    fScenarioSetActive(scen.id);
    // in-place present (no reload: memory + file keeps steps in this page)
    fScenarioStashAuthorSettings();
    MuLERMoCScenario.present = true;
    MuLERMoCScenario.presentId = scen.id;
    scen.index = 0;
    fScenarioSyncLegacy();
    var applied = false;
    try {
      applied = !!fScenarioApply(scen.steps[0]);
    } catch (e) {
      applied = false;
    }
    if (!applied) {
      MuLERMoCScenario.present = false;
      MuLERMoCScenario.presentId = null;
      fScenarioSyncPresentClass();
      fScenarioToast("Could not start presentation at step 1.");
      return;
    }
    fScenarioPlayUi();
    fScenarioRenderPresentMenu();
  }
  // Drawer follows the card: open this panel's drawer (accordion —
  // all others shut), mark its Steps button. Safe if the panel is gone.
  function fScenarioOpenDrawer(id) {
    var panel = id && fScenarioPanelFor(id);
    var all = document.querySelectorAll(".scenarioDrawer");
    for (var ai = 0; ai < all.length; ai++) all[ai].classList.remove("open");
    var btns = document.querySelectorAll(".scenarioPanel .scList");
    for (var bi = 0; bi < btns.length; bi++) btns[bi].classList.remove("active");
    if (!panel) return;
    // Empty scenario (0 steps): never drop a drawer. The accordion above
    // still collapses the other cards; the clicked card activates via its
    // own handler but shows nothing until its first save.
    var _sc = id && fScenarioGet(id);
    if (!_sc || !_sc.steps || !_sc.steps.length) return;
    var d = panel.querySelector(".scenarioDrawer");
    var lb = panel.querySelector(".scList");
    if (d) d.classList.add("open");
    if (lb) lb.classList.add("active");
  }
  if (!window._scMultiHook) {
    window._scMultiHook = true;
    $(document).on("click", ".scenarioPanel .scSave", function () {
      var id = fScenarioPanelIdFromEl(this);
      if (id) fScenarioSetActive(id);
      var st = fScenarioCapture();
      if (!st) return;
      var act = fScenarioActive();
      act.steps.push(st);
      fScenarioSyncLegacy();
      fScenarioRenderList(act.id);
      fScenarioOpenDrawer(act.id);
      var _note = MuLERMoCScenario.lastCaptureNote;
      MuLERMoCScenario.lastCaptureNote = null;
      fScenarioToast(!st.selectedMol ? "Saved menu-only step " + st.n + " (no molecule selected)." : "Saved step " + st.n + "." + (_note ? " " + _note : ""));
    });
    $(document).on("click", ".scenarioPanel .scList", function () {
      var id = fScenarioPanelIdFromEl(this);
      if (id) fScenarioSetActive(id);
      var panel = id && fScenarioPanelFor(id);
      var d = panel && panel.querySelector(".scenarioDrawer");
      if (d && d.classList.contains("open")) {
        // Toggle-off: shut everything.
        d.classList.remove("open");
        if (this.classList) this.classList.remove("active");
      } else {
        fScenarioOpenDrawer(id);
      }
    });
    $(document).on("click", ".scenarioPanel .scExport", function () {
      var id = fScenarioPanelIdFromEl(this);
      fScenarioExport(id || undefined);
    });
    $(document).on("click", ".scenarioPanel .scPresent", function () {
      fScenarioPresentBegin(fScenarioPanelIdFromEl(this));
    });
    $(document).on("click", ".scenarioPanel .scDelete", function () {
      var id = fScenarioPanelIdFromEl(this);
      if (id) fScenarioDelete(id);
    });
    $(document).on("click", ".scenarioPanel", function (e) {
      var id = this.getAttribute && this.getAttribute("data-scenario-id");
      if (!id) return;
      // Controls handle themselves (Save opens via its own path, Steps
      // toggles, inputs just focus); background clicks select + reveal.
      if (e && e.target && e.target.closest &&
          e.target.closest("button,input,textarea,select,label,a")) return;
      if (id !== MuLERMoCScenario.activeId) fScenarioSetActive(id);
      fScenarioOpenDrawer(id);
    });
    $(document).on("change", ".scenarioPanel .scenarioTitle", function () {
      var id = fScenarioPanelIdFromEl(this);
      var s = (id && fScenarioGet(id)) || fScenarioActive();
      if (s) {
        s.title = this.value || s.title;
        fScenarioSyncLegacy();
      }
    });
  }
  if (!document.getElementById("scenarioAuthorBar")) {
    var bar = document.createElement("div");
    bar.id = "scenarioAuthorBar";
    // Closed by default via CSS (no .open); the tab reveals it.
    // Inline display is never used here: it would beat the animation classes.
    bar.style.display = "";
    bar.innerHTML =
    "<div id='scenarioPlayBarTitle'><span>Σενάρια Παρουσίασης</span><button id='scCloseBar' title='Κλείσιμο (ESC)'>✕</button></div>" +
    "<div id='scenarioGlobalBar'>" +
      "<button id='scNew' title='New empty scenario'>+ New</button>" +
      "<button id='scImport' title='Import scenario JSON (adds a panel)'>Import</button>" +
      "<input type='file' id='scFile' accept='.json,application/json' style='display:none'>" +
      "</div>" +
    "<div id='scenarioPanels'></div>";
    document.body.appendChild(bar);
    fScenarioPaintIconTextBtn(document.getElementById("scNew"), "libraryNew", "+ New");
    fScenarioPaintIconTextBtn(document.getElementById("scImport"), "upload", "Import");
    document.getElementById("scNew").onclick = function () {
      if (fScenarioEmptyCount() >= MuLERMoCScenario.maxEmptyScenarios) {
        fScenarioToast("Fill an empty scenario first (max " + MuLERMoCScenario.maxEmptyScenarios + " empty).");
        return;
      }
      fScenarioNew("scenario-" + (MuLERMoCScenario.seq + 1));
    };
    document.getElementById("scCloseBar").onclick = function () {
      fScenarioSetAuthoring(false);
    };
    document.getElementById("scImport").onclick = function () {
      document.getElementById("scFile").click();
    };
    document.getElementById("scFile").onchange = function (e) {
      if (e.target.files[0]) fScenarioImportFile(e.target.files[0]);
      e.target.value = "";
    };
    fScenarioActive();
    fScenarioBuildPanels();
    // Authoring handle: child of the bar docked to its left edge, travels with it.
    if (!document.getElementById("scenarioAuthorTab")) {
      var tab = document.createElement("button");
      tab.id = "scenarioAuthorTab";
      tab.type = "button";
      tab.setAttribute("data-tooltip", "Σενάρια διδασκαλίας");
      tab.innerHTML = '<span class="scTabIcon">✎</span><span class="scTabText">Σενάρια</span>';
      tab.onclick = function () {
        fScenarioSetAuthoring(!MuLERMoCScenario.authoring);
      };
      bar.insertBefore(tab, bar.firstChild);
    }
    fScenarioSyncAuthorUi();
    // menu-subset pick wiring (delegated: the menu DOM rebuilds on every
    // grouping switch; row/group clicks are guarded in the teaching layer)
    $(document).on("click", "#scPickToggle", function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
      if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
      MuLERMoCScenario.menuPickMode = !MuLERMoCScenario.menuPickMode;
      var _act = fScenarioActive();
      if (!MuLERMoCScenario.menuPickMode && _act.menuPick.length) {
        _act.menuPick = [];
        fScenarioSyncLegacy();
        fScenarioToast("Menu pick cleared.");
      }
      fScenarioPaintPickUi();
    });
    $(document).on("click", "#nomeclature2Menu .scPickBox, #nomeclature2Menu .scGroupBox", function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
    });
    $(document).on("change", "#nomeclature2Menu .scPickBox", function () {
      if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
      fScenarioSetPick($(this).attr("data-mol"), this.checked);
      if (!this.checked) fScenarioDeselectIfUnpicked();
    });
    $(document).on("change", "#nomeclature2Menu .scGroupBox", function () {
      if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
      fScenarioSetGroupPick($(this).attr("data-group"), this.checked);
      if (!this.checked) fScenarioDeselectIfUnpicked();
    });
    // Presentation keys (←/→ steps, ESC exit) + author-bar ESC.
    // Never while typing (caret safety) or with modifiers.
    $(document).on("keydown", function (e) {
      if (!e || e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target;
      if (t && /^(input|textarea|select)$/i.test(t.tagName || "")) return;
      if (MuLERMoCScenario.present) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          fScenarioGo(fScenarioPresent().index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          fScenarioGo(fScenarioPresent().index - 1);
        } else if (e.key === "Escape") {
          fScenarioExitPresent();
        }
        return;
      }
      // ESC closes the author bar (never while presenting — see above).
      if (e.key !== "Escape" || !MuLERMoCScenario.authoring) return;
      fScenarioSetAuthoring(false);
    });
  }
  if (!document.getElementById("scenarioPlayBar")) {
    var pb = document.createElement("div");
    pb.id = "scenarioPlayBar";
    pb.style.display = "none";
    pb.innerHTML =
      "<div id='scenarioPlayBarNextPrevContainer'>" +
      "<button id='scPrev' title='Προηγούμενο (←)'>◀</button><span id='scPos'>1/1</span><button id='scNext' title='Επόμενο (→)'>▶</button>" +
      "</div>" +
      // "<b id='scStepTitle'></b><span class='snote' id='scStepNote'></span>" +
      "<button id='scExit' title='Έξοδος (ESC)'>Exit ✕</button>";
    document.body.appendChild(pb);
    document.getElementById("scPrev").onclick = function () {
      fScenarioGo(fScenarioPresent().index - 1);
    };
    document.getElementById("scNext").onclick = function () {
      fScenarioGo(fScenarioPresent().index + 1);
    };
    document.getElementById("scExit").onclick = fScenarioExitPresent;
  }
}

// ── multi-scenario panels ────────────────────────────────────────────
// #scenarioAuthorBar (singleton: title + New/Import) owns #scenarioPanels.
// Each .scenarioPanel[data-scenario-id] has its own button panel (no Import)
// and its own in-flow .scenarioDrawer (down/up via .open).
// Icon helper: icon-only buttons keep title tooltip + aria-label text.
// Falls back to the text label when ui-icons.js is unavailable.
function fScenarioPaintIconBtn(btn, key, label) {
  if (!btn) return;
  var icon = (window.MuLERIcons && window.MuLERIcons[key]) || null;
  if (icon) {
    // Steps button keeps its live count badge (see fScenarioRenderOne).
    if (key === "list" && btn.classList && btn.classList.contains("scList")) return;
    btn.innerHTML = icon;
    if (btn.classList) btn.classList.add("scIconBtn");
    if (label) btn.setAttribute("aria-label", label);
  } else if (label && !btn.textContent) {
    btn.textContent = label;
  }
}
// Bar buttons: icon + text (primary actions; labels teach meaning).
// Step-row buttons stay icon-only (see step wiring below).
function fScenarioPaintIconTextBtn(btn, key, text) {
  if (!btn) return;
  var icon = (window.MuLERIcons && window.MuLERIcons[key]) || null;
  if (icon) {
    var span = document.createElement("span");
    span.textContent = text;
    btn.innerHTML = icon;
    btn.appendChild(span);
    if (btn.classList) { btn.classList.add("scIconBtn"); btn.classList.add("scIconTextBtn"); }
    btn.setAttribute("aria-label", text);
  } else if (text) {
    btn.textContent = text;
  }
}
function fScenarioBuildPanels() {
  var host = document.getElementById("scenarioPanels");
  if (!host) return;
  host.innerHTML = "";
  if (!MuLERMoCScenario.scenarios.length) fScenarioActive();
  MuLERMoCScenario.scenarios.forEach(function (scen) {
    var panel = document.createElement("div");
    panel.className = "scenarioPanel" + (scen.id === MuLERMoCScenario.activeId ? " active" : "");
    panel.setAttribute("data-scenario-id", scen.id);
    panel.innerHTML =
      "<div class='scenarioHeader'>" +
        "<span class='scScenarioNo' title=''>S1</span>" +
        "<input type='text' class='scenarioTitle' value='' title='Scenario title'>" +
        "<span class='scCount'>0</span>" +
        "<button class='scDelete' title='Delete scenario'>✕</button>" +
      "</div>" +
      "<div class='scenarioButtonPanel'>" +
        "<button class='scSave' title='Save current view as step'>Save step</button>" +
        "<button class='scList' title='Show/hide step list'>Steps</button>" +
        "<button class='scExport' title='Download scenario JSON'>Export</button>" +
        "<button class='scPresent' title='Open presentation at step 1'>Play ▶</button>" +
      "</div>" +
      "<div class='scenarioDrawer'>" +
        "<div class='scSteps'></div>" +
      "</div>";
    var ti = panel.querySelector(".scenarioTitle");
    if (ti) ti.value = scen.title || "";
    fScenarioPaintIconTextBtn(panel.querySelector(".scSave"), "addTask", "Save step");
    fScenarioPaintIconTextBtn(panel.querySelector(".scExport"), "downloadList", "Export");
    fScenarioPaintIconTextBtn(panel.querySelector(".scPresent"), "screen", "Play");
    host.appendChild(panel);
  });
  fScenarioRenderList();
}

// Empty-cap authority: at most maxEmptyScenarios step-less cards. scNew
// locks while the cap is reached (fill an empty card first); a panel's
// Delete locks only when it is the last remaining card AND empty (a sole
// filled card keeps today's delete-then-autocreate fallback). Runs on every
// render via fScenarioRenderOne, so New/Delete/Import/Save/step-delete all
// stay in sync with no extra call sites. Display-only: no step data touched.
function fScenarioEmptyCount() {
  var n = 0;
  for (var i = 0; i < MuLERMoCScenario.scenarios.length; i++) {
    if (!MuLERMoCScenario.scenarios[i].steps.length) n++;
  }
  return n;
}
function fScenarioSyncNewDeleteUi() {
  try {
    var cap = MuLERMoCScenario.maxEmptyScenarios;
    if (!(cap >= 0)) cap = 0;
    var locked = fScenarioEmptyCount() >= cap;
    var nb = document.getElementById("scNew");
    if (nb) {
      nb.disabled = locked;
      if (nb.setAttribute) {
        if (locked) nb.setAttribute("data-tooltip", "Fill an empty scenario first (max " + cap + " empty)");
        else nb.removeAttribute("data-tooltip");
      }
    }
    var panels = document.querySelectorAll(".scenarioPanel");
    for (var p = 0; p < panels.length; p++) {
      var pid = panels[p].getAttribute && panels[p].getAttribute("data-scenario-id");
      var sc = (pid && fScenarioGet(pid)) || null;
      var del = panels[p].querySelector(".scDelete");
      if (del) del.disabled = !!sc && !sc.steps.length && MuLERMoCScenario.scenarios.length <= 1;
    }
  } catch (e) {
    /* author bar unavailable */
  }
}

function fScenarioRenderOne(scen) {
  var panel = scen && fScenarioPanelFor(scen.id);
  if (!panel) return;
  var box = panel.querySelector(".scSteps");
  var cnts = panel.querySelectorAll(".scCount");
  var listBtn = panel.querySelector(".scList");
  if (!box) return;
  // Empty-state flags (0 steps): count pills, Steps button, and the card.
  var _empty = scen.steps.length === 0;
  for (var ci = 0; ci < cnts.length; ci++) {
    cnts[ci].textContent = String(scen.steps.length);
    if (cnts[ci].classList) cnts[ci].classList.toggle("is-empty", _empty);
  }
  if (panel.classList) panel.classList.toggle("is-empty", _empty);
  // Positional scenario counter (S1, S2, …): index in scenarios[],
  // recomputed every render so add/delete never leave gaps.
  var _pos = MuLERMoCScenario.scenarios.indexOf(scen);
  var _no = panel.querySelector(".scScenarioNo");
  if (_no) {
    _no.textContent = "S" + (_pos + 1);
    _no.title = "Scenario " + (_pos + 1);
  }
  if (listBtn) {
    var _licon = (window.MuLERIcons && window.MuLERIcons.list) || null;
    if (_licon) {
      listBtn.innerHTML = _licon;
      var _ltxt = document.createElement("span");
      _ltxt.textContent = "Steps";
      listBtn.appendChild(_ltxt);
      var _lbadge = document.createElement("span");
      _lbadge.className = "scCountInline";
      _lbadge.textContent = String(scen.steps.length);
      listBtn.appendChild(_lbadge);
      if (listBtn.classList) { listBtn.classList.add("scIconBtn"); listBtn.classList.add("scIconTextBtn"); }
      listBtn.setAttribute("aria-label", "Steps (" + scen.steps.length + ")");
    } else {
      listBtn.innerHTML = "";
      listBtn.textContent = "Steps (" + scen.steps.length + ")";
    }
    if (listBtn.classList) listBtn.classList.toggle("is-empty", _empty);
    listBtn.disabled = _empty;
  }
  // Empty scenario (0 steps): gate every button except Save step + Delete.
  // Steps/Export/Play are meaningless with no steps; Save stays live so the
  // author can add the first step. Delete stays live except on the last
  // remaining empty card (locked by fScenarioSyncNewDeleteUi — one empty
  // card is always kept). Re-runs on every render, so the first save
  // re-enables them.
  ["scExport", "scPresent"].forEach(function (cls) {
    var b = panel.querySelector("." + cls);
    if (b) b.disabled = _empty;
  });
  var ti = panel.querySelector(".scenarioTitle");
  if (ti && document.activeElement !== ti && ti.value !== scen.title) ti.value = scen.title || "";
  box.innerHTML = "";
  scen.steps.forEach(function (st, i) {
    var row = document.createElement("div");
    row.className = "srow";
    row.innerHTML =
      "<span id='scStep" + i + "' class='scStepNumberWrap'>" +
      "<span class='stepNumber'>" + st.n + "</span></span><span class='scStepTitleWrap'><span class='scStepTitleLabel'>Τίτλος βήματος</span><input type='text' class='scStepTitle' placeholder='Τίτλος βήματος' value=''></span>" +
      "<button title='Jump'>Go</button><button class='scUpdate' title='Update this step from current view'>Update</button><button class='scDupe' title='Duplicate this step'>⧉</button><button title='Up'>↑</button><button title='Down'>↓</button>" +
      "<button title='Delete'>✕</button>";
    // Icon-only step actions (title tooltip + aria-label keep the meaning).
    (function () {
      var ab = row.querySelectorAll("button");
      var defs = [
        ["play", "Go"], ["reset", "Update"], ["copy", "Duplicate"],
        ["arrowUp", "Up"], ["arrowDown", "Down"], ["closeSmall", "Delete"]
      ];
      for (var k = 0; k < defs.length && k < ab.length; k++) {
        var ic = (window.MuLERIcons && window.MuLERIcons[defs[k][0]]) || null;
        if (ic) {
          ab[k].innerHTML = ic;
          if (ab[k].classList) ab[k].classList.add("scIconBtn");
          ab[k].setAttribute("aria-label", defs[k][1]);
        }
      }
    })();
    // Step type at a glance: "menu" when the step carries a browsable
    // menu (menu-only or molecule+menu subset), else "molecule".
    // Detail (molecule key / subset size) lives in the tooltip.
    var molBadge = document.createElement("span");
    var _isMenu = !!(st.show && st.show.menu === true);
    molBadge.className = "scMolBadge" + (_isMenu ? " is-menu" : " is-mol");
    var _subN = Array.isArray(st.menuSubset) ? st.menuSubset.length : 0;
    molBadge.title = st.selectedMol
      ? st.selectedMol + (_isMenu ? " + menu (" + _subN + ")" : "")
      : "menu-only (" + _subN + ")";
    molBadge.textContent = _isMenu ? "Μενού" : "Μόριο";
    var numWrap = row.querySelector(".scStepNumberWrap");
    if (numWrap) numWrap.appendChild(molBadge);
    else row.insertBefore(molBadge, row.firstChild.nextSibling);
    var titleInput = row.querySelector("input.scStepTitle");
    titleInput.value = st.title || "";
    titleInput.onchange = function () {
      st.title = titleInput.value;
    };
    var noteInput = document.createElement("textarea");
    noteInput.className = "snote";
    noteInput.placeholder = "Κείμενο βήματος (B I U, λίστες, <sup>, <sub>)";
    noteInput.value = st.note || "";
    noteInput.onchange = function () {
      st.note = noteInput.value;
      fScenarioCheckNoteTags(noteInput);
    };
    noteInput.oninput = function () {
      fScenarioCheckNoteTags(noteInput);
    };
    // T1 toolbar: inline formatting over the allowed subset (B I sup sub,
    // clean strips all tags) + whole-text px size input.
    // Display-only: st.note / st.styleText.fontSizePx are the single sources.
    var noteBar = document.createElement("div");
    noteBar.className = "scNoteToolbar";
    var noteBtns = [
      ["B", "<b>", "</b>", "Έντονα"],
      ["I", "<i>", "</i>", "Πλάγια"],
      ["x²", "<sup>", "</sup>", "Εκθέτης"],
      ["x₂", "<sub>", "</sub>", "Δείκτης"],
      ["✕", null, null, "Καθαρισμός μορφοποίησης"]
    ];
    noteBtns.forEach(function (def) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "scNoteBtn";
      if (def[0] === "✕" && window.MuLERIcons && window.MuLERIcons.formatClear) {
        b.innerHTML = window.MuLERIcons.formatClear;
        b.setAttribute("aria-label", def[3]);
      } else {
        b.textContent = def[0];
      }
      b.title = def[3];
      b.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        if (def[0] === "✕") { fScenarioCleanNote(noteInput, st); return; }
        fScenarioWrapNoteSelection(noteInput, st, def[1], def[2]);
      };
      noteBar.appendChild(b);
    });
    // Column toggle (1↔2, default 1): icon button before clean, shows the
    // current state + .active highlight when 2-column. Writes
    // st.styleText.columns live (1 collapses to null/default); Update preserves it.
    (function () {
      var tog = document.createElement("button");
      tog.type = "button";
      tog.className = "scNoteBtn scColsToggle";
      tog.title = "Στήλες κειμένου: 1/2 (εναλλαγή)";
      function paintTog() {
        var two = !!(st.styleText && fScenarioValidColumns(st.styleText.columns) === 2);
        var ic = (window.MuLERIcons && (two ? window.MuLERIcons.columns2 : window.MuLERIcons.columns1)) || null;
        if (ic) tog.innerHTML = ic;
        else tog.textContent = two ? "2" : "1";
        if (tog.classList) tog.classList.toggle("active", two);
        tog.setAttribute("aria-pressed", two ? "true" : "false");
        tog.setAttribute("aria-label", two ? "Κείμενο σε 2 στήλες (εναλλαγή σε 1)" : "Κείμενο σε 1 στήλη (εναλλαγή σε 2)");
      }
      tog.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        st.styleText = st.styleText || {};
        var two = !!(st.styleText && fScenarioValidColumns(st.styleText.columns) === 2);
        st.styleText.columns = two ? null : 2;
        paintTog();
      };
      paintTog();
      var cleanBtn = noteBar.lastChild;
      if (cleanBtn) noteBar.insertBefore(tog, cleanBtn);
      else noteBar.appendChild(tog);
    })();
    // Whole-text size/width (px): number inputs alone (size 12–28 default
    // 18px; width 320–1200 default 980px). Empty = default. Writes
    // st.styleText live; Update preserves both.
    (function () {
      var sizeLabel = document.createElement("span");
      sizeLabel.className = "sshow";
      sizeLabel.appendChild(document.createTextNode("Font Size:"));
      var sizeInput = document.createElement("input");
      sizeInput.type = "number";
      sizeInput.min = "12";
      sizeInput.max = "28";
      sizeInput.step = "1";
      sizeInput.className = "scTextSizeInput";
      sizeInput.title = "Μέγεθος γραμματοσειράς (px) (12–28)";
      var curPx = st.styleText ? fScenarioValidFontSizePx(st.styleText.fontSizePx) : null;
      sizeInput.value = curPx === null ? "" : String(curPx);
      sizeInput.placeholder = "18";
      sizeInput.onchange = function () {
        var raw = sizeInput.value;
        if (String(raw) === "") {
          st.styleText = st.styleText || {};
          st.styleText.fontSizePx = null;
          return;
        }
        var n = fScenarioValidFontSizePx(raw);
        if (n === null) {
          st.styleText = st.styleText || {};
          st.styleText.fontSizePx = null;
          sizeInput.value = "";
          return;
        }
        st.styleText = st.styleText || {};
        st.styleText.fontSizePx = n;
        sizeInput.value = String(n);
      };
      noteBar.appendChild(sizeLabel);
      noteBar.appendChild(sizeInput);
      var wLabel = document.createElement("span");
      wLabel.className = "sshow";
      wLabel.appendChild(document.createTextNode("Πλάτος Κειμένου:"));
      var wInput = document.createElement("input");
      wInput.type = "number";
      wInput.min = "320";
      wInput.max = "1200";
      wInput.step = "10";
      wInput.className = "scTextSizeInput scTextWidthInput";
      wInput.title = "Πλάτος κειμένου στην παρουσίαση (px) (320–1200)";
      var curW = st.styleText ? fScenarioValidTextWidthPx(st.styleText.textWidthPx) : null;
      wInput.value = curW === null ? "" : String(curW);
      wInput.placeholder = "980";
      wInput.onchange = function () {
        var raw = wInput.value;
        if (String(raw) === "") {
          st.styleText = st.styleText || {};
          st.styleText.textWidthPx = null;
          return;
        }
        var n = fScenarioValidTextWidthPx(raw);
        if (n === null) {
          st.styleText = st.styleText || {};
          st.styleText.textWidthPx = null;
          wInput.value = "";
          return;
        }
        st.styleText = st.styleText || {};
        st.styleText.textWidthPx = n;
        wInput.value = String(n);
      };
      noteBar.appendChild(wLabel);
      noteBar.appendChild(wInput);
    })();
    row.appendChild(noteBar);
    row.appendChild(noteInput);
    fScenarioCheckNoteTags(noteInput);
    // No Text checkbox: heading + text show automatically iff the step
    // carries a title or note (see showTextOn); clear both for silence.
    // No Menu checkbox: the menu follows picks + selection (derived at
    // capture/validate — 2+ picks show it, otherwise the step stands alone).
    // Viewer control bars (authored per step; enabled only when that step's
    // viewer is visible — viewers are set live via [2D][3D] before saving).
    [["2D ρυθμίσεις", "2D"], ["3D ρυθμίσεις", "3D"]].forEach(function (pair) {
      var label = document.createElement("label");
      label.className = "sshow";
      var kind = pair[1];
      var viewerOn = !st.show || !st.show.viewers || st.show.viewers[kind] !== false;
      var ctlCheck = document.createElement("input");
      ctlCheck.type = "checkbox";
      ctlCheck.checked = !!(st.show && st.show.controls && st.show.controls[kind] === true);
      ctlCheck.disabled = !viewerOn;
      if (!viewerOn) {
        label.classList.add("disabled");
        label.title = "Needs the " + kind + " viewer visible in this step (toggle [" + kind + "] before saving)";
      }
      ctlCheck.onchange = function () {
        st.show = st.show || {};
        st.show.controls = st.show.controls || {};
        st.show.controls[kind] = ctlCheck.checked;
      };
      label.appendChild(ctlCheck);
      label.appendChild(document.createTextNode(" " + pair[0]));
      row.appendChild(label);
    });
    // Naming gear + panel.
    var nameCtlLabel = document.createElement("label");
    nameCtlLabel.className = "sshow";
    nameCtlLabel.title = "Show the naming settings gear + panel in presentation";
    var nameCtlCheck = document.createElement("input");
    nameCtlCheck.type = "checkbox";
    nameCtlCheck.checked = !!(st.show && st.show.nameSettings === true);
    nameCtlCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameSettings = nameCtlCheck.checked;
    };
    nameCtlLabel.appendChild(nameCtlCheck);
    nameCtlLabel.appendChild(document.createTextNode(" Ρυθμίσεις ονομασίας"));
    row.appendChild(nameCtlLabel);
    // Name-box interaction (user clicks only; stored highlight always
    // replays). Absent = allowed (legacy files); capture stores false.
    var nameClickLabel = document.createElement("label");
    nameClickLabel.className = "sshow";
    nameClickLabel.title = "Allow clicking the name boxes in presentation";
    var nameClickCheck = document.createElement("input");
    nameClickCheck.type = "checkbox";
    nameClickCheck.checked = !!(st.show && st.show.nameClick === true);
    nameClickCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameClick = nameClickCheck.checked;
    };
    nameClickLabel.appendChild(nameClickCheck);
    nameClickLabel.appendChild(document.createTextNode(" Διάδραση ονομασίας"));
    row.appendChild(nameClickLabel);
    // Per-component eye toggles in presentation (Ορατότητα συνθετικών):
    // checked → the master eye switch starts lit and the small eye buttons
    // above each name box stay live during presentation (visibility itself
    // still comes from the stored hidden set); unchecked → master starts
    // unlit, click it to reveal the eyes (needs Ρυθμίσεις ονομασίας shown).
    // Molecule steps only — menu-only steps carry no naming.
    var nameEyeLabel = document.createElement("label");
    nameEyeLabel.className = "sshow";
    nameEyeLabel.title = "Show per-component eye toggles in presentation";
    var nameEyeCheck = document.createElement("input");
    nameEyeCheck.type = "checkbox";
    nameEyeCheck.checked = !!(st.show && st.show.nameEye === true);
    if (!st.selectedMol) {
      nameEyeCheck.disabled = true;
      nameEyeLabel.classList.add("disabled");
      nameEyeLabel.title = "Molecule steps only (this step carries no naming)";
    }
    nameEyeCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameEye = nameEyeCheck.checked;
    };
    nameEyeLabel.appendChild(nameEyeCheck);
    nameEyeLabel.appendChild(document.createTextNode(" Ορατότητα συνθετικών"));
    row.appendChild(nameEyeLabel);
    // Menu grouping (presentation only, menu-carrying steps only): which
    // menu views the step offers. Μόρια = flat list (default); Τάξεις/Σειρές
    // classify the picked subset. 2+ checked → grouping switcher in
    // presentation; none → flat fallback. Pure molecule steps (no menu)
    // show no trace of this block.
    if (Array.isArray(st.menuSubset) && st.menuSubset.length > 1) {
    // Single-line set: title + 3 checkboxes share a nowrap wrapper so the
    // wrapping row can never split them across lines.
    var menuGroupsRow = document.createElement("div");
    menuGroupsRow.className = "scMenuGroupsRow";
    var menuGroupTitle = document.createElement("span");
    menuGroupTitle.className = "sshow scMenuGroupsTitle";
    menuGroupTitle.appendChild(document.createTextNode("Ταξινομήσεις Μένου:"));
    menuGroupsRow.appendChild(menuGroupTitle);
    [["Μόρια", "molecules"], ["Χημικές Τάξεις", "chemclass"], ["Ομόλογες Σειρές", "series"]].forEach(function (pair) {
      var gLabel = document.createElement("label");
      gLabel.className = "sshow scMenuGroup";
      var gKind = pair[1];
      var gCheck = document.createElement("input");
      gCheck.type = "checkbox";
      // Stored state shown as-is (all-off is valid → flat fallback); only a
      // missing field (legacy) displays the molecules default.
      var _mgShown = Array.isArray(st.menuGroups) ? st.menuGroups : ["molecules"];
      gCheck.checked = _mgShown.indexOf(gKind) >= 0;
      gCheck.onchange = function () {
        var cur = Array.isArray(st.menuGroups) ? st.menuGroups.slice() : ["molecules"];
        // all-off is a valid stored state (renders the flat fallback);
        // the default only applies to fresh captures.
        var at = cur.indexOf(gKind);
        if (gCheck.checked && at < 0) cur.push(gKind);
        if (!gCheck.checked && at >= 0) cur.splice(at, 1);
        cur.sort(function (a, b) { return SCENARIO_MENU_GROUPS.indexOf(a) - SCENARIO_MENU_GROUPS.indexOf(b); });
        st.menuGroups = cur;
      };
      gLabel.appendChild(gCheck);
      gLabel.appendChild(document.createTextNode(" " + pair[0]));
      menuGroupsRow.appendChild(gLabel);
    });
    row.appendChild(menuGroupsRow);
    }
    var btns = row.querySelectorAll("button:not(.scNoteBtn)");
    // Order in row.innerHTML: Go, Update, Duplicate, Up, Down, Delete.
    // .scNoteBtn toolbar buttons are excluded by the selector above.
    (function (scenId, idx) {
      btns[0].onclick = function () {
        fScenarioGo(idx);
      };
      btns[1].onclick = function () {
        fScenarioUpdateStep(scenId, idx);
      };
      btns[2].onclick = function () {
        fScenarioDuplicateStep(scenId, idx);
      };
      btns[3].onclick = function () {
        if (idx === 0) return;
        var s = fScenarioGet(scenId) || fScenarioActive();
        s.steps.splice(idx - 1, 0, s.steps.splice(idx, 1)[0]);
        fScenarioRenumber(scenId);
      };
      btns[4].onclick = function () {
        var s = fScenarioGet(scenId) || fScenarioActive();
        if (idx >= s.steps.length - 1) return;
        s.steps.splice(idx + 1, 0, s.steps.splice(idx, 1)[0]);
        fScenarioRenumber(scenId);
      };
      btns[5].onclick = function () {
        var s = fScenarioGet(scenId) || fScenarioActive();
        s.steps.splice(idx, 1);
        fScenarioRenumber(scenId);
      };
    })(scen.id, i);
    box.appendChild(row);
  });
  // empty-cap states (scNew + per-panel Delete) follow every render
  fScenarioSyncNewDeleteUi();
}

function fScenarioRenderList(id) {
  if (id) {
    var one = fScenarioGet(id);
    if (one) fScenarioRenderOne(one);
    fScenarioSyncLegacy();
    return;
  }
  MuLERMoCScenario.scenarios.forEach(fScenarioRenderOne);
  fScenarioSyncLegacy();
}

function fScenarioRenumber(id) {
  var s = (id && fScenarioGet(id)) || fScenarioActive();
  s.steps.forEach(function (st, i) {
    st.n = i + 1;
  });
  if (s.index >= s.steps.length) {
    s.index = Math.max(0, s.steps.length - 1);
  }
  fScenarioSyncLegacy();
  fScenarioRenderList(s.id);
}

function fScenarioPlayUi() {
  var ps = fScenarioPresent();
  var st = ps.steps[ps.index];
  var pos = document.getElementById("scPos");
  if (pos) pos.textContent = ps.steps.length ? ps.index + 1 + "/" + ps.steps.length : "0/0";
  var ti = document.getElementById("scStepTitle");
  if (ti) ti.textContent = st ? st.n + ". " + (st.title || "") : "";
  var no = document.getElementById("scStepNote");
  fScenarioRenderNote(no, st && st.note);
}

function fScenarioGo(i) {
  var ps = fScenarioPresent();
  if (!ps.steps.length) return;
  if (i < 0) i = 0;
  if (i >= ps.steps.length) i = ps.steps.length - 1;
  ps.index = i;
  fScenarioSyncLegacy();
  try {
    history.replaceState(null, "", "#step=" + (i + 1));
  } catch (e) {
    /* file:// */
  }
  // Fail loud: never show a half-applied step as if it worked.
  var ok = false;
  try {
    ok = !!fScenarioApply(ps.steps[i]);
  } catch (e) {
    ok = false;
  }
  if (!ok) {
    fScenarioToast("Could not apply step " + (i + 1) + ".");
    return;
  }
  fScenarioPlayUi();
  fScenarioRenderPresentMenu();
}

// ── per-step Update (authoring): Go → tweak live view → Update ───────────
// Captures the current live view via fScenarioCapture() and overwrites the
// stored view snapshot at scen.steps[idx]. Authored layer is preserved:
// title, note, styleText.fontSizePx/textWidthPx/columns, and the 4 drawer chrome checkboxes
// (show.controls.2D/3D, show.nameSettings, show.nameClick). Everything visual is refreshed:
// selectedMol, mode2D, mainChainMode, etherNamingMode, nameAnalysisMode
// (clicked name-box highlight), selectedRule, style2D (atom colors, color
// mode, zigzag), styleName (box/cross/etherNaming/panelOpen), styleHighlight,
// audio, view3D (style/spin/showH/atomSymbols/moveto), menuSubset +
// show.menu/show.viewers, menuGroups (Ταξινομήσεις Μένου). No schema change
// (scenarioVersion stays 1).
function fScenarioUpdateStep(scenId, idx) {
  if (scenId && scenId !== MuLERMoCScenario.activeId) fScenarioSetActive(scenId);
  var s = (scenId && fScenarioGet(scenId)) || fScenarioActive();
  if (!s || !s.steps || idx < 0 || idx >= s.steps.length) return;
  var old = s.steps[idx];
  var fresh = fScenarioCapture();
  if (!fresh) return; // capture already toasted the reason; no partial overwrite
  var oldKind = !old.selectedMol ? "menu" : "mol";
  var newKind = !fresh.selectedMol ? "menu" : "mol";
  var oldSub = Array.isArray(old.menuSubset) ? old.menuSubset.slice().sort().join("|") : "";
  var newSub = Array.isArray(fresh.menuSubset) ? fresh.menuSubset.slice().sort().join("|") : "";
  // Preserve the authored layer: step identity, heading + text (+ text
  // size), per-step chrome permissions. These are edited directly in the
  // drawer at any time.
  fresh.n = old.n;
  fresh.title = old.title;
  fresh.note = old.note;
  fresh.styleText = {
    fontSizePx: fScenarioValidFontSizePx(old.styleText ? old.styleText.fontSizePx : null),
    textWidthPx: fScenarioValidTextWidthPx(old.styleText ? old.styleText.textWidthPx : null),
    columns: fScenarioValidColumns(old.styleText ? old.styleText.columns : null)
  };
  fresh.show = fresh.show || {};
  var oldShow = old.show || {};
  fresh.show.controls = oldShow.controls
    ? { "2D": !!oldShow.controls["2D"], "3D": !!oldShow.controls["3D"] }
    : { "2D": false, "3D": false };
  fresh.show.nameSettings = oldShow.nameSettings === true;
  fresh.show.nameClick = oldShow.nameClick === true;
  fresh.show.nameEye = oldShow.nameEye === true;
  fresh.menuGroups = fScenarioValidMenuGroups(old.menuGroups);
  s.steps[idx] = fresh;
  fScenarioSyncLegacy();
  fScenarioRenderList(s.id);
  var msg = "Updated step " + fresh.n + ".";
  if (oldKind !== newKind) {
    msg += newKind === "menu" ? " (now menu-only.)" : " (now molecule.)";
  }
  if (oldSub !== newSub) {
    msg += fresh.menuSubset && fresh.menuSubset.length
      ? " Menu: " + fresh.menuSubset.length + " molecules."
      : " Menu cleared.";
  }
  var extra = MuLERMoCScenario.lastCaptureNote;
  MuLERMoCScenario.lastCaptureNote = null;
  if (extra) msg += " " + extra;
  fScenarioToast(msg);
}

// S3: JSmol readiness wait for deep links. The applet fires the page's
// jmol_isReady (sets window.JSmolReadyFlag); cold ?scenario&present loads
// wait for it before the first fScenarioGo so the camera survives. Falls
// through after ~12s — the S2 gated moveto + parse fallbacks still apply.
function fScenarioWhenJSmolReady(cb) {
  var tries = 0;
  (function poll() {
    tries++;
    try {
      if (window.JSmolReadyFlag === true) {
        cb();
        return;
      }
    } catch (e) {
      /* no window */
    }
    if (tries < 80) {
      setTimeout(poll, 150);
    } else {
      cb();
    }
  })();
}

// ── URL: ?scenario=…&present=1 + #step=N ────────────────────────────────
function fScenarioParseUrl() {
  var q = {};
  try {
    location.search.replace(/^\?/, "").split("&").forEach(function (p) {
      var kv = p.split("=");
      if (kv[0]) q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
  } catch (e) {
    /* file:// */
  }
  var step = 1;
  try {
    var m = /step=(\d+)/.exec(location.hash);
    if (m) step = Math.max(1, parseInt(m[1], 10));
  } catch (e) {
    /* no hash */
  }
  return { scenario: q.scenario || null, present: q.present === "1", step: step };
}

function fScenarioBoot() {
  fScenarioBuildUi();
  // stash the app title; present mode replaces #pageTitle per step, exit restores it
  try {
    var _h = document.getElementById("pageTitle");
    if (_h) MuLERMoCScenario.appTitle = _h.textContent;
  } catch (e) {
    /* no DOM */
  }
  var url = fScenarioParseUrl();
  MuLERMoCScenario.present = url.present;
  fScenarioWhenReady(function () {
    if (url.scenario) {
      // same-origin scenarios/*.json only (validated)
      if (/\.\./.test(url.scenario) || !/\.json$/i.test(url.scenario) || /^https?:/i.test(url.scenario)) {
        fScenarioToast("Blocked scenario URL (same-origin .json only).");
        return;
      }
      fetch(url.scenario)
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (obj) {
          var res = fScenarioValidate(obj);
          res.warnings.forEach(fScenarioToast);
          if (!res.ok) return;
          var scen = fScenarioNew(res.title || "imported-scenario", true);
          scen.steps = res.steps;
          scen.index = 0;
          fScenarioSyncLegacy();
          fScenarioBuildPanels();
          MuLERMoCScenario.presentId = scen.id;
          fScenarioWhenJSmolReady(function () {
            fScenarioStashAuthorSettings();
            fScenarioGo(Math.min(url.step, res.steps.length) - 1);
          });
        })
        .catch(function (e) {
          fScenarioToast("Could not load scenario (needs http(s); use Import on file://).");
        });
    } else if (url.present) {
      fScenarioToast("Present mode needs ?scenario=… or imported steps.");
    }
  });
  window.addEventListener("hashchange", function () {
    var hps = fScenarioPresent();
    if (!MuLERMoCScenario.present || !hps.steps.length) return;
    var m = /step=(\d+)/.exec(location.hash);
    if (m) {
      var i = Math.max(1, parseInt(m[1], 10)) - 1;
      if (i !== hps.index) {
        hps.index = Math.min(i, hps.steps.length - 1);
        fScenarioSyncLegacy();
        var hok = false;
        try {
          hok = !!fScenarioApply(hps.steps[hps.index]);
        } catch (e) {
          hok = false;
        }
        if (!hok) {
          fScenarioToast("Could not apply step " + (hps.index + 1) + ".");
          return;
        }
        fScenarioPlayUi();
        fScenarioRenderPresentMenu();
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fScenarioBoot);
} else {
  fScenarioBoot();
}
