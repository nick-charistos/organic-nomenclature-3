// mulermoc-nom-scenario-52.js
// Didactic scenarios — linear snapshot sequences (additive module, since v44).
// Drives the core/molview/teaching layers through their public entry points;
// modifies no layer logic.
// Disabled by default: without ?scenario / ?present / #step the page behaves
// exactly like the plain naming app.

var MuLERMoCScenario = {
  SUPPORTED_VERSION: 1,
  steps: [], // legacy mirror of the active scenario (kept in sync; use fScenarioActive())
  index: 0, // legacy mirror of active.index
  title: "untitled-scenario", // legacy mirror of active.title
  author: "Unknown", // legacy mirror of active.author
  created: null, // legacy mirror of active.created (ISO timestamp)
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
  pinned: false, // authoring pin-dock: bar docked in-flow at the row's right end (live-only, never in step JSON)
  pinPref: true, // remembered authoring pin choice (default pinned; panel stays closed until opened; live-only, session-scoped, never in step JSON)
  maxEmptyScenarios: 3, // adjustable cap on step-less cards (scNew locks at cap)
  defaultScenarioUrl: "scenarios/Αλκάνια-Αιθάνιο-τεστ.scenario.json", // preloaded as S1 at boot (S2 stays empty); ?scenario= deep links skip this
};

// ── multi-scenario state manager ─────────────────────────────────────
// Each scenario card: {id, title, author, created, steps[], index, menuPick[]}.
// The legacy singletons (MuLERMoCScenario.steps/title/index/menuPick)
// mirror the active card so older playback paths keep working.

// Scenario metadata (v52, additive — no scenarioVersion bump):
// `author` is free text, blank/absent → "Unknown"; `created` is the ISO
// timestamp stamped when the card is created (New/Import) and preserved on
// import when the file carries a valid one.
function fScenarioNowIso() {
  try {
    return new Date().toISOString();
  } catch (e) {
    return null;
  }
}
function fScenarioValidAuthor(v) {
  if (typeof v !== "string") return "Unknown";
  var s = v.replace(/^\s+|\s+$/g, "");
  if (!s) return "Unknown";
  return s.length > 120 ? s.slice(0, 120) : s;
}
function fScenarioValidCreated(v) {
  if (typeof v !== "string" || !v) return null;
  var d = new Date(v);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
}
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
  MuLERMoCScenario.author = a.author;
  MuLERMoCScenario.created = a.created;
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
  var scen = {
    id: fScenarioNewId(),
    title: title || ("scenario-" + (MuLERMoCScenario.seq)),
    author: "Unknown",
    created: fScenarioNowIso(),
    steps: [],
    index: 0,
    menuPick: []
  };
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
// in mulermoc-nom-teaching-52.js). comp10/11 depend on chemical class;
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
  compSuffixLocants: "comp9loc",
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
  // cross-file globals declared in mulermoc-nom-core/molview-50.js; unknown
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
      case "molZoom2D": return typeof molZoom2D !== "undefined" ? molZoom2D : fallback;
      case "viewerMaxH": return typeof viewerMaxH !== "undefined" ? viewerMaxH : fallback;
      case "viewerBothH": return typeof viewerBothH !== "undefined" ? viewerBothH : fallback;
      case "mainChainPoolIdx": return typeof mainChainPoolIdx !== "undefined" ? mainChainPoolIdx : fallback;
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

// Destructive-action guard: a small modal confirm (singleton, like the toast).
// ESC / overlay click / Άκυρο cancel; focus lands on the safe button first.
// Used before deleting a scenario and before deleting a step.
var fScenarioConfirmEl = null;
var fScenarioTextPosMenu = null;
var fScenarioConfirmKey = null;
var fScenarioConfirmYes = null;
var fScenarioConfirmPrevFocus = null;
function fScenarioConfirmClose() {
  var ov = fScenarioConfirmEl;
  if (ov) ov.classList.remove("show");
  if (fScenarioConfirmKey) {
    document.removeEventListener("keydown", fScenarioConfirmKey, true);
    fScenarioConfirmKey = null;
  }
  fScenarioConfirmYes = null;
  fScenarioConfirmSetInert(false);
  try {
    if (fScenarioConfirmPrevFocus && document.contains(fScenarioConfirmPrevFocus) &&
      fScenarioConfirmPrevFocus.focus) {
      fScenarioConfirmPrevFocus.focus();
    }
  } catch (eF) { /* focus restore best-effort */ }
  fScenarioConfirmPrevFocus = null;
}
// Keep the background out of the tab order / a11y tree while the modal is up.
// `inert` handles both where supported; the tab trap below covers older engines.
function fScenarioConfirmSetInert(on) {
  if (!document.body) return;
  Array.prototype.forEach.call(document.body.children, function (ch) {
    if (!ch || ch === fScenarioConfirmEl) return;
    if (ch.tagName === "SCRIPT" || ch.tagName === "STYLE" || ch.tagName === "LINK") return;
    if (on) {
      if (ch.hasAttribute("data-scInert")) return;
      ch.setAttribute("data-scInert", "1");
      try { ch.inert = true; } catch (eI) { /* older browsers */ }
    } else {
      if (!ch.hasAttribute("data-scInert")) return;
      ch.removeAttribute("data-scInert");
      try { ch.inert = false; } catch (eO) { /* older browsers */ }
    }
  });
}
function fScenarioConfirmBuild() {
  var ov = document.createElement("div");
  ov.id = "scenarioConfirm";
  ov.setAttribute("role", "dialog");
  ov.setAttribute("aria-modal", "true");
  ov.setAttribute("aria-labelledby", "scConfirmMsg");
  ov.innerHTML =
    "<div class='scConfirmPanel'>" +
    "<div class='scConfirmMsg' id='scConfirmMsg'></div>" +
    "<div class='scConfirmBtns'>" +
    "<button type='button' class='scConfirmNo'>Άκυρο</button>" +
    "<button type='button' class='scConfirmYes'>Διαγραφή</button>" +
    "</div>" +
    "</div>";
  document.body.appendChild(ov);
  fScenarioConfirmEl = ov;
  return ov;
}
function fScenarioConfirm(msg, onYes, yesLabel) {
  var ov = fScenarioConfirmEl;
  if (!ov || !document.body.contains(ov)) ov = fScenarioConfirmBuild();
  if (!ov.classList.contains("show")) {
    try { fScenarioConfirmPrevFocus = document.activeElement; } catch (eAF) { fScenarioConfirmPrevFocus = null; }
  }
  var msgEl = ov.querySelector(".scConfirmMsg");
  var noBtn = ov.querySelector(".scConfirmNo");
  var yesBtn = ov.querySelector(".scConfirmYes");
  if (msgEl) msgEl.textContent = msg || "";
  if (yesBtn) yesBtn.textContent = yesLabel || "Διαγραφή";
  fScenarioConfirmYes = (typeof onYes === "function") ? onYes : null;
  if (yesBtn) yesBtn.onclick = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    var fn = fScenarioConfirmYes;
    fScenarioConfirmClose();
    if (fn) fn();
  };
  if (noBtn) noBtn.onclick = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    fScenarioConfirmClose();
  };
  // Click on the dim backdrop (not the panel) cancels.
  ov.onclick = function (e) { if (e.target === ov) fScenarioConfirmClose(); };
  // Drop any listener left by a re-entrant open before arming this one.
  if (fScenarioConfirmKey) {
    document.removeEventListener("keydown", fScenarioConfirmKey, true);
    fScenarioConfirmKey = null;
  }
  // Capture phase so ESC cancels the dialog without also closing the author bar.
  fScenarioConfirmKey = function (e) {
    if (e.key === "Escape") {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      fScenarioConfirmClose();
      return;
    }
    // Focus trap: Tab cycles inside the dialog even where `inert` is missing.
    if (e.key === "Tab") {
      var focusables = ov.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusables.length) {
        if (e.preventDefault) e.preventDefault();
        return;
      }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      var active = document.activeElement;
      var inside = ov.contains(active);
      if (e.shiftKey) {
        if (!inside || active === first) {
          if (e.preventDefault) e.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        if (e.preventDefault) e.preventDefault();
        first.focus();
      }
    }
  };
  document.addEventListener("keydown", fScenarioConfirmKey, true);
  fScenarioConfirmSetInert(true);
  ov.classList.add("show");
  if (noBtn && noBtn.focus) noBtn.focus();
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
    noteFormat: "html",
    selectedMol: mol,
    mode2D: fScenarioG("mode2D", "condensed"),
    mainChainMode: fScenarioG("mainChainMode", "algorithmic"),
    chainIdx: menuOnly ? 0 : fScenarioValidChainIdx(fScenarioG("mainChainPoolIdx", 0)),
    etherNamingMode: fScenarioG("etherNamingMode", "iupac"),
    nameAnalysisMode: (menuOnly || adopted) ? "none" : fScenarioG("nameAnalysisMode", "none"),
    selectedRule: typeof selectedRule === "number" ? selectedRule : null,
    style2D: {
      atomColors: !!fScenarioG("svgAtomColors2DFlag", false),
      colorMode: fScenarioG("atomColorMode2D", "atom"),
      zigzag: fScenarioG("mode2D", "") === "condensedZigZag",
      zoom: fScenarioValidZoom(fScenarioG("molZoom2D", 2.0)),
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
      numberingBonds: fScenarioCheck("highlightNumberingBondsCheck", true),
    },
    styleText: { fontSizePx: null, textWidthPx: null, columns: null, position: null }, // whole-text size/width/columns/position; null = theme defaults (18px / 980px / 1 col / top)
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
      viewerMaxHeight: fScenarioValidViewerMaxHeight(fScenarioG("viewerMaxH", null)),
      viewerBothHeight: fScenarioValidViewerBothHeight(fScenarioG("viewerBothH", null)),
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
// Text position: additive optional styleText.position ("left"/"right" or
// null = top). Only a side rail is stored; "top"/missing/invalid collapses to
// null so exports stay minimal. No schema change (scenarioVersion stays 1).
function fScenarioValidTextPosition(v) {
  return v === "left" || v === "right" ? v : null;
}
// 2D zoom level: additive optional style2D.zoom (JSME molecular-area scale).
// Default 2.0 = the long-standing load value. Clamped to the fZoom2D range
// 0.5–6.0; invalid → 2.0. No schema change (scenarioVersion stays 1).
function fScenarioValidZoom(v) {
  var n = parseFloat(v);
  if (isNaN(n)) return 2.0;
  if (n < 0.5) return 0.5;
  if (n > 6.0) return 6.0;
  return n;
}
// Main-chain walk index (v47 stepper): integer >= 0, else 0. Upper clamp
// happens at apply time against the live pool (molecule-dependent).
function fScenarioValidChainIdx(v) {
  if (v === null || typeof v === "undefined" || v === "") return 0;
  var n = parseInt(v, 10);
  if (isNaN(n) || n < 0) return 0;
  return n;
}
// Single-viewer max height (v48): additive optional show.viewerMaxHeight.
// null/empty = Auto (cap a lone viewer at the both-visible height). Absolute
// px, clamped to the live floor/ceiling (VIEWER_MIN_H–VIEWER_MAX_H); the
// string "full" fills the live viewport on whatever screen plays the step
// (resolved per screen, never stored as px). Invalid → null. No schema
// change (scenarioVersion 1).
function fScenarioValidViewerMaxHeight(v) {
  if (v === null || typeof v === "undefined" || v === "") return null;
  if (typeof v === "string" && v.trim().toLowerCase() === "full") return "full";
  var n = parseInt(v, 10);
  if (isNaN(n)) return null;
  if (n < VIEWER_MIN_H) return VIEWER_MIN_H;
  if (n > VIEWER_MAX_H) return VIEWER_MAX_H;
  return n;
}
// Double-viewer height (v48): additive optional show.viewerBothHeight. null/
// empty = Auto (the equal split both viewers get today). COMBINED 2D+3D height
// when two are visible (each viewer takes half), clamped to the VIEWER_BOTH_MIN
// –VIEWER_BOTH_MAX range; "full" fills the live viewport instead (resolved
// per playback screen). Invalid → null. No schema change (scenarioVersion 1).
function fScenarioValidViewerBothHeight(v) {
  if (v === null || typeof v === "undefined" || v === "") return null;
  if (typeof v === "string" && v.trim().toLowerCase() === "full") return "full";
  var n = parseInt(v, 10);
  if (isNaN(n)) return null;
  if (n < VIEWER_BOTH_MIN) return VIEWER_BOTH_MIN;
  if (n > VIEWER_BOTH_MAX) return VIEWER_BOTH_MAX;
  return n;
}
function fScenarioApplyStepFontSize(step) {
  var p = null, pc = null;
  try { p = document.getElementById("scStepText"); } catch (e) { /* no DOM */ }
  if (!p) return;
  try { pc = document.getElementById("pageContainer"); } catch (ePC) { /* no DOM */ }
  var px = step && step.styleText ? fScenarioValidFontSizePx(step.styleText.fontSizePx) : null;
  p.style.fontSize = px ? px + "px" : "";
  // Columns via class (not inline): the small-screen collapse lives in CSS
  // media queries, which cannot beat an inline column-count. A side rail
  // forces one column in CSS; the stored 2-column choice returns when the
  // step falls back to the top card below the rail breakpoint.
  var two = !!(step && step.styleText && fScenarioValidColumns(step.styleText.columns) === 2);
  try {
    if (p.classList) p.classList.toggle("scCols2", two);
  } catch (e) { /* no DOM */ }
  var pos = step && step.styleText ? fScenarioValidTextPosition(step.styleText.position) : null;
  var side = (pos && MuLERMoCScenario.present && showNoteOn(step)) ? pos : null;
  var wasSide = null;
  try {
    if (pc && pc.classList) {
      wasSide = pc.classList.contains("scTextLeft") ? "left" :
        (pc.classList.contains("scTextRight") ? "right" : null);
    }
  } catch (ePc) { /* no page container */ }
  // Class authority lives in fScenarioSyncStepTextLayout, which also runs on
  // resize/exit so the rail classes clear in the <1200px top fallback.
  try { fScenarioSyncStepTextLayout(); } catch (ePlace) { /* placement best-effort */ }
  if (side) p.scrollTop = 0;
  // A side rail changes the app width/height budget; refit viewers once the
  // row has applied. Only on an actual top/side or left/right switch (window
  // resize already has its own fResizeViewers path).
  if (side !== wasSide) {
    try {
      if (typeof fResizeViewers === "function") {
        if (window.requestAnimationFrame) window.requestAnimationFrame(function () { fResizeViewers(); });
        else fResizeViewers();
      }
    } catch (eFit) { /* viewer refit best-effort */ }
  }
}
function fScenarioSideTextAtRail() {
  try {
    if (window.matchMedia) return window.matchMedia("(min-width: 1200px)").matches;
  } catch (eMq) { /* fall through */ }
  try { return window.innerWidth >= 1200; } catch (eW) { return false; }
}
function fScenarioSyncStepTextHeight() {
  var p = null;
  var row = null;
  try { p = document.getElementById("scStepText"); } catch (eP) { /* no DOM */ }
  try { row = document.querySelector("#mainAppContainer > .mainApp3Columns"); } catch (eR) { /* no DOM */ }
  if (!p) return;
  if (!row || p.parentNode !== row) {
    try { if (p.style.maxHeight) p.style.maxHeight = ""; } catch (eC) { /* no style */ }
    return;
  }
  var maxH = 0;
  var ids = ["menuCol", "viewerCol", "analysisCol"];
  for (var i = 0; i < ids.length; i++) {
    var el = null;
    try { el = document.getElementById(ids[i]); } catch (eE) { /* no DOM */ }
    if (!el || el.offsetParent === null) continue;
    var h = 0;
    try { h = el.getBoundingClientRect().height; } catch (eH) { h = 0; }
    if (h > maxH) maxH = h;
  }
  // Full-height rail: fit content up to a viewport-derived cap, then
  // internal-scroll. The flex chain (#pageContainer.presenting > #authorLayout
  // > #mainAppContainer > .mainApp3Columns) fills the viewport, so the free
  // space below the tallest column belongs to the rail too. Available is
  // measured scroll-invariant — rail document-top plus footer height against
  // window.innerHeight — so shrinking the window shrinks the cap even while
  // the page scrolls (live viewport rects would freeze: a scrolled layout
  // recomputes the same creditsTop − railTop, a ratchet that grows but never
  // shrinks). Take the larger of columns vs available so short columns still
  // reach the footer while tall columns keep working.
  var avail = 0;
  try {
    var r = p.getBoundingClientRect();
    var railTopDoc = (r.top || 0) + (window.scrollY || window.pageYOffset || 0);
    var credH = 80;
    try {
      var cred = document.getElementById("creditsUs");
      if (cred && cred.offsetHeight) credH = cred.offsetHeight;
    } catch (eCred) { /* no DOM */ }
    var vh = window.innerHeight || 0;
    if (vh > 0) avail = Math.round(vh - railTopDoc - credH - 20);
  } catch (eA) { avail = 0; }
  var target = maxH;
  if (avail > target) target = avail;
  var next = target > 0 ? Math.round(target) + "px" : "";
  try {
    if (p.style.maxHeight !== next) p.style.maxHeight = next;
  } catch (eS) { /* no style */ }
}
// Presentation top layout: make the note card span exactly the visible app
// columns (menu only when the step shows it, plus viewer + analysis). The card
// is a sibling of #mainAppContainer, so this is measured rather than structural.
function fScenarioClearStepTextFit(p) {
  if (!p || !p.style) return;
  try {
    p.style.removeProperty("--scStepTextFitWidth");
    p.style.removeProperty("--scStepTextFitLeft");
  } catch (eC) { /* no style */ }
}
function fScenarioVisibleStepTextSpan() {
  var left = Infinity, right = -Infinity;
  var ids = ["menuCol", "viewerCol", "analysisCol"];
  for (var i = 0; i < ids.length; i++) {
    var el = null;
    try { el = document.getElementById(ids[i]); } catch (eE) { /* no DOM */ }
    if (!el || el.offsetParent === null) continue;
    var r = null;
    try { r = el.getBoundingClientRect(); } catch (eB) { r = null; }
    if (!r || !(r.width > 0)) continue;
    if (r.left < left) left = r.left;
    if (r.right > right) right = r.right;
  }
  if (!isFinite(left) || !isFinite(right) || !(right > left)) return null;
  return { left: left, right: right, width: right - left };
}
var _scStepTextFitFrame = null;
function fScenarioScheduleStepTextRefit() {
  if (_scStepTextFitFrame !== null) return;
  var run = function () {
    _scStepTextFitFrame = null;
    try { if (typeof fResizeViewers === "function") fResizeViewers(); } catch (eRf) { /* resize unavailable */ }
    fScenarioSyncStepTextHeight();
  };
  try {
    if (window.requestAnimationFrame) _scStepTextFitFrame = window.requestAnimationFrame(run);
    else {
      _scStepTextFitFrame = 1;
      setTimeout(run, 0);
    }
  } catch (eF) {
    _scStepTextFitFrame = null;
    run();
  }
}
function fScenarioSyncStepTextWidth() {
  var p = null, host = null, row = null, pc = null;
  try { p = document.getElementById("scStepText"); } catch (eP) { /* no DOM */ }
  try { host = document.getElementById("authorLayout"); } catch (eH) { /* no DOM */ }
  try { row = document.querySelector("#mainAppContainer > .mainApp3Columns"); } catch (eR) { /* no DOM */ }
  try { pc = document.getElementById("pageContainer"); } catch (eC) { /* no DOM */ }
  if (!p) return false;
  var top = !!(host && row && p.parentNode === host && p.offsetParent !== null &&
    MuLERMoCScenario.present && pc && pc.classList.contains("presenting"));
  if (!top) {
    fScenarioClearStepTextFit(p);
    return false;
  }
  var span = fScenarioVisibleStepTextSpan();
  var hr = null;
  try { hr = host.getBoundingClientRect(); } catch (eB) { hr = null; }
  if (!span || !hr || !(hr.width > 0)) {
    fScenarioClearStepTextFit(p);
    return false;
  }
  var left = Math.max(0, Math.round(span.left - hr.left));
  var avail = Math.max(0, Math.round(hr.width - left));
  var width = Math.min(Math.round(span.width), avail);
  if (!(width > 0)) {
    fScenarioClearStepTextFit(p);
    return false;
  }
  var nextW = width + "px";
  var nextL = left + "px";
  var changed = false;
  try {
    if (p.style.getPropertyValue("--scStepTextFitWidth") !== nextW) {
      p.style.setProperty("--scStepTextFitWidth", nextW);
      changed = true;
    }
    if (p.style.getPropertyValue("--scStepTextFitLeft") !== nextL) {
      p.style.setProperty("--scStepTextFitLeft", nextL);
      changed = true;
    }
  } catch (eS) { /* no style */ }
  return changed;
}
function fScenarioSyncStepTextLayout() {
  var p = null;
  var row = null;
  var host = null;
  var main = null;
  var pc = null;
  try { p = document.getElementById("scStepText"); } catch (eP) { /* no DOM */ }
  try { row = document.querySelector("#mainAppContainer > .mainApp3Columns"); } catch (eR) { /* no DOM */ }
  try { host = document.getElementById("authorLayout"); } catch (eH) { /* no DOM */ }
  try { main = document.getElementById("mainAppContainer"); } catch (eM) { /* no DOM */ }
  try { pc = document.getElementById("pageContainer"); } catch (eC) { /* no DOM */ }
  if (!p || !row || !host || !main) return null;
  var side = null;
  try {
    if (MuLERMoCScenario.present && pc && pc.classList.contains("presenting") && fScenarioSideTextAtRail()) {
      var ps = fScenarioPresent();
      var st = ps && ps.steps ? ps.steps[ps.index] : null;
      var pos = st && st.styleText ? fScenarioValidTextPosition(st.styleText.position) : null;
      if (st && pos && showNoteOn(st)) side = pos;
    }
  } catch (eSide) { side = null; }
  // Own the rail classes here (not in fScenarioApplyStepFontSize) so resizes
  // and Exit also clear them when the <1200px fallback applies.
  try {
    if (pc && pc.classList) {
      pc.classList.toggle("scTextLeft", side === "left");
      pc.classList.toggle("scTextRight", side === "right");
    }
  } catch (eCls) { /* no page container */ }
  var moved = false;
  try {
    if (side === "left") {
      if (p.parentNode !== row || row.firstElementChild !== p) {
        row.insertBefore(p, row.firstElementChild);
        moved = true;
      }
    } else if (side === "right") {
      if (p.parentNode !== row || row.lastElementChild !== p) {
        row.appendChild(p);
        moved = true;
      }
    } else if (p.parentNode !== host || p.nextElementSibling !== main) {
      host.insertBefore(p, main);
      moved = true;
    }
  } catch (eMove) { return null; }
  fScenarioSyncStepTextHeight();
  var widthChanged = false;
  try { widthChanged = fScenarioSyncStepTextWidth(); } catch (eW) { widthChanged = false; }
  if (moved || widthChanged) fScenarioScheduleStepTextRefit();
  return side;
}
var _scStepTextRO = null;
var _scStepTextROTimer = null;
var _scStepTextResizeBound = false;
function fInitStepTextSideObserver() {
  try {
    if (_scStepTextRO || typeof ResizeObserver === "undefined") return;
    var row = document.querySelector("#mainAppContainer > .mainApp3Columns");
    if (!row) return;
    _scStepTextRO = new ResizeObserver(function () {
      if (_scStepTextROTimer) clearTimeout(_scStepTextROTimer);
      _scStepTextROTimer = setTimeout(function () {
        _scStepTextROTimer = null;
        fScenarioSyncStepTextHeight();
        try {
          if (fScenarioSyncStepTextWidth()) fScenarioScheduleStepTextRefit();
        } catch (eW) { /* width best-effort */ }
      }, 100);
    });
    _scStepTextRO.observe(row);
    var ids = ["menuCol", "viewerCol", "analysisCol"];
    for (var i = 0; i < ids.length; i++) {
      var col = document.getElementById(ids[i]);
      if (col) _scStepTextRO.observe(col);
    }
  } catch (eRO) { /* observer unavailable */ }
}
function fInitStepTextSideResize() {
  if (_scStepTextResizeBound) return;
  _scStepTextResizeBound = true;
  var timer = null;
  try {
    window.addEventListener("resize", function () {
      fScenarioSyncStepTextLayout();
      // Height-only drags move neither the card nor its fit width, but the
      // viewer budget is viewport-derived — refit unconditionally (rAF-
      // coalesced inside) so viewers track the window live, exactly like
      // the rail cap already does via the layout sync above.
      try { fScenarioScheduleStepTextRefit(); } catch (eRe) { /* refit best-effort */ }
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        timer = null;
        fScenarioSyncStepTextLayout();
        try { fScenarioScheduleStepTextRefit(); } catch (eRe2) { /* refit best-effort */ }
      }, 120);
    });
  } catch (eRz) { /* resize unavailable */ }
}
// Apply a step's stored single-viewer max height and double-viewer height to
// the live molview globals and re-fit the viewers. null resets each to Auto.
// The Fsync calls mirror the values back into the Ρυθμίσεις controls when
// they exist.
function fScenarioApplyViewerMaxHeight(step) {
  var h = step && step.show ? fScenarioValidViewerMaxHeight(step.show.viewerMaxHeight) : null;
  try { viewerMaxH = h; } catch (eV) { /* global unavailable */ }
  var hb = step && step.show ? fScenarioValidViewerBothHeight(step.show.viewerBothHeight) : null;
  try { viewerBothH = hb; } catch (eVb) { /* global unavailable */ }
  try { if (typeof fResizeViewers === "function") fResizeViewers(); } catch (eR) { /* resize unavailable */ }
  try { if (typeof fViewerMaxHeightSync === "function") fViewerMaxHeightSync(); } catch (eU) { /* UI best-effort */ }
  try { if (typeof fViewerBothHeightSync === "function") fViewerBothHeightSync(); } catch (eUb) { /* UI best-effort */ }
}
function fScenarioValidMenuGroups(g) {
  var out = [];
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
    noteFormat: "text",
    mode2D: "condensed",
    mainChainMode: "algorithmic",
    chainIdx: 0,
    etherNamingMode: "iupac",
    nameAnalysisMode: "none",
    selectedRule: null,
    style2D: { atomColors: false, colorMode: "atom", zigzag: false, zoom: 2.0 },
    styleName: { box: true, cross: false, etherNaming: "iupac", panelOpen: true, hidden: [] },
    styleHighlight: { bondAtoms: false, numberingAtoms: true, numberingBonds: true },
    styleText: { fontSizePx: null, textWidthPx: null, columns: null, position: null },
    audio: { narrate: false },
    menuSubset: [],
    menuGroups: ["molecules"],
    view3D: { style: "ballnstick", spin: false, showH: true, atomSymbols: true, moveto: null },
    show: {
      menu: false, viewerButtons: false, viewerSettings: false,
      viewers: { "2D": true, "3D": true },
      viewerMaxHeight: null,
      viewerBothHeight: null,
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
  // Single-viewer max height: normalize silently (null = Auto); the validate
  // path warns on non-empty invalid input.
  out.show.viewerMaxHeight = fScenarioValidViewerMaxHeight(
    out.show.viewerMaxHeight === undefined ? null : out.show.viewerMaxHeight
  );
  // Double-viewer height: normalize silently (null = Auto); the validate path
  // warns on non-empty invalid input.
  out.show.viewerBothHeight = fScenarioValidViewerBothHeight(
    out.show.viewerBothHeight === undefined ? null : out.show.viewerBothHeight
  );
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
    columns: fScenarioValidColumns(out.styleText ? out.styleText.columns : null),
    position: fScenarioValidTextPosition(out.styleText ? out.styleText.position : null)
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
    var _rawNF = s && typeof s.noteFormat !== "undefined" ? s.noteFormat : null;
    if (_rawNF !== null && _rawNF !== "" && _rawNF !== "text" && _rawNF !== "html") {
      warnings.push("Step " + (i + 1) + ": invalid note format discarded (text used).");
    }
    st.noteFormat = _rawNF === "html" ? "html" : "text";
    if (st.mode2D === "diagramatic") {
      st.mode2D = "skeletal";
      warnings.push("Step " + (i + 1) + ": legacy 2D mode 'diagramatic' migrated to 'skeletal'.");
    }
    var _rawPx = s && s.styleText ? s.styleText.fontSizePx : null;
    if (_rawPx !== null && typeof _rawPx !== "undefined" && String(_rawPx) !== "" && fScenarioValidFontSizePx(_rawPx) === null) {
      warnings.push("Step " + (i + 1) + ": invalid text size discarded (default 18px used).");
    }
    var _rawW = s && s.styleText ? s.styleText.textWidthPx : null;
    if (_rawW !== null && typeof _rawW !== "undefined" && String(_rawW) !== "" && fScenarioValidTextWidthPx(_rawW) === null) {
      warnings.push("Step " + (i + 1) + ": invalid text width discarded (default auto used).");
    }
    var _rawC = s && s.styleText ? s.styleText.columns : null;
    if (_rawC !== null && typeof _rawC !== "undefined" && String(_rawC) !== "" && fScenarioValidColumns(_rawC) === null && String(_rawC) !== "1") {
      warnings.push("Step " + (i + 1) + ": invalid column count discarded (default 1 column used).");
    }
    var _rawPos = s && s.styleText ? s.styleText.position : null;
    if (_rawPos !== null && typeof _rawPos !== "undefined" && String(_rawPos) !== "" && String(_rawPos) !== "top" && fScenarioValidTextPosition(_rawPos) === null) {
      warnings.push("Step " + (i + 1) + ": invalid text position discarded (top used).");
    }
    var _rawVMH = s && s.show ? s.show.viewerMaxHeight : null;
    if (_rawVMH !== null && typeof _rawVMH !== "undefined" && String(_rawVMH) !== "" && fScenarioValidViewerMaxHeight(_rawVMH) === null) {
      warnings.push("Step " + (i + 1) + ": invalid viewer height discarded (Auto used).");
    }
    var _rawVBH = s && s.show ? s.show.viewerBothHeight : null;
    if (_rawVBH !== null && typeof _rawVBH !== "undefined" && String(_rawVBH) !== "" && fScenarioValidViewerBothHeight(_rawVBH) === null) {
      warnings.push("Step " + (i + 1) + ": invalid double-viewer height discarded (Auto used).");
    }
    var rawMoveto = st.view3D && st.view3D.moveto ? st.view3D.moveto : null;
    st.view3D.moveto = fScenarioValidMoveto(st.view3D.moveto);
    if (rawMoveto && !st.view3D.moveto) {
      warnings.push("Step " + (i + 1) + ": invalid 3D view discarded (default used) — re-capture with rotate off.");
    }
    // Main-chain walk index (v47 stepper): additive, no version bump. Integer
    // >= 0 else 0 (warned when a present value is discarded); clamped to the
    // live pool at apply time since pool length is molecule-dependent.
    var _rawChain = (s && typeof s.chainIdx !== "undefined" && s.chainIdx !== "") ? s.chainIdx : null;
    st.chainIdx = fScenarioValidChainIdx(_rawChain);
    if (_rawChain !== null && st.chainIdx === 0 && String(_rawChain) !== "0") {
      warnings.push("Step " + (i + 1) + ": invalid chain step discarded (default used).");
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
      // Valid menu-only step: no warning (boot/import stay silent; the
      // save-time "Saved menu-only step" confirmation already informed the author).
    }
    st.menuSubset = kept;
    steps.push(st);
  });
  if (!steps.length) return { ok: false, warnings: warnings.concat(["No valid steps left."]) };
  // Scenario metadata (additive, no version bump): author defaults to
  // "Unknown" when blank/absent/invalid; a valid creation date is kept,
  // an invalid one is dropped with a warning (the card stamps its own).
  var _author = fScenarioValidAuthor(obj.author);
  if (typeof obj.author !== "undefined" && obj.author !== null &&
    typeof obj.author !== "string") {
    warnings.push("Invalid author discarded (Unknown used).");
  }
  var _created = fScenarioValidCreated(obj.created);
  if (typeof obj.created !== "undefined" && obj.created !== null &&
    obj.created !== "" && !_created) {
    warnings.push("Invalid creation date discarded.");
  }
  return {
    ok: true,
    steps: steps,
    title: obj.title || obj.scenario || "scenario",
    author: _author,
    created: _created,
    warnings: warnings
  };
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
    // Dims "Από δεδομένα" for empty/missing stored chains and re-syncs the
    // radio to the restored mainChainMode. Depends on mode2D (resolved above).
    if (typeof fUpdateChainModeButton === "function") fUpdateChainModeButton();
  } catch (e) {
    /* controls unavailable */
  }
  try {
    var m2d = typeof mode2D !== "undefined" ? mode2D : "condensed";
    var idx = m2d === "expanded" ? 1 : (m2d === "skeletal" || m2d === "condensedZigZag") ? 2 : 0;
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
    if (typeof fSyncAtomColorModeDisabled === "function") fSyncAtomColorModeDisabled();
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
    numberingBonds: fScenarioCheck("highlightNumberingBondsCheck", true),
    nameHidden: Array.isArray(window.nameHiddenComps) ? window.nameHiddenComps.slice() : [],
    nameEyeEdit: window.nameEyeEdit === true,
    zoom: (typeof molZoom2D !== "undefined" ? molZoom2D : 2.0),
    viewerMaxHeight: (typeof viewerMaxH !== "undefined" ? viewerMaxH : null),
    viewerBothHeight: (typeof viewerBothH !== "undefined" ? viewerBothH : null),
  };
}

function fScenarioRestoreAuthorSettings() {
  var a = MuLERMoCScenario.authorSettings;
  if (!a) return;
  fScenarioSetCheck("bondAtomsCheck", !!a.bondAtoms, "selectedCheck", "unselectedCheck");
  fScenarioSetCheck("highlightNumberingCheck", a.numberingAtoms !== false, "selectedCheck", "unselectedCheck");
  fScenarioSetCheck("highlightNumberingBondsCheck", a.numberingBonds !== false, "selectedCheck", "unselectedCheck");
  window.nameHiddenComps = Array.isArray(a.nameHidden) ? a.nameHidden.slice() : [];
  window.nameEyeEdit = a.nameEyeEdit === true;
  // Author's live 2D zoom comes back too (step applies overwrote it);
  // re-apply scale + re-render before the naming rebuild below.
  try {
    if (typeof molZoom2D !== "undefined") molZoom2D = fScenarioValidZoom(a.zoom);
    if (typeof jsmeNomeclatureApplet !== "undefined" && jsmeNomeclatureApplet) {
      jsmeNomeclatureApplet.setMolecularAreaScale(typeof molZoom2D !== "undefined" ? molZoom2D : 2.0);
    }
    if (typeof fUpdateSVG === "function") fUpdateSVG();
  } catch (eZoom) {
    /* applet unavailable */
  }
  // Author's live single-viewer max height comes back too (a step apply may
  // have overwritten it). Re-fit the viewers, then mirror into the control.
  try {
    if (typeof viewerMaxH !== "undefined") viewerMaxH = fScenarioValidViewerMaxHeight(a.viewerMaxHeight);
    if (typeof viewerBothH !== "undefined") viewerBothH = fScenarioValidViewerBothHeight(a.viewerBothHeight);
    if (typeof fResizeViewers === "function") fResizeViewers();
    if (typeof fViewerMaxHeightSync === "function") fViewerMaxHeightSync();
    if (typeof fViewerBothHeightSync === "function") fViewerBothHeightSync();
  } catch (eVMH) {
    /* viewer height restore best-effort */
  }
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
    modeSuffix = mode2D === "expanded" ? "_2D_Expanded" : mode2D === "condensed" ? "_2D_Condensed" : "_2D_Skeletal";
    if (step.style2D.zigzag) mode2D = "condensedZigZag";
    atomSymbols3DFlag = !!step.view3D.atomSymbols;
    hydrogens3DFlag = !!step.view3D.showH;
    vis3D = step.view3D.style;
    rotateFlag = !!step.view3D.spin;
    svgAtomColors2DFlag = !!step.style2D.atomColors;
    atomColorMode2D = step.style2D.colorMode;
    molZoom2D = fScenarioValidZoom(step.style2D.zoom);
    fScenarioSyncControlUi();
    fScenarioApplyViewerMaxHeight(step);
    // author's live selectedRule untouched on menu-only steps
    fScenarioChrome(step.show);
    return true;
  }
  // 1. state globals (same scope as molview/teaching layers)
  selectedMol = step.selectedMol;
  mode2D = step.mode2D;
  modeSuffix = mode2D === "expanded" ? "_2D_Expanded" : mode2D === "condensed" ? "_2D_Condensed" : "_2D_Skeletal";
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
  fScenarioSetCheck("highlightNumberingBondsCheck", _sh.numberingBonds !== false, "selectedCheck", "unselectedCheck");
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
  // Per-step 2D zoom re-asserted after the load: fSelectMol resets zoom to
  // default via fInitProps, then the step's stored level applies on top.
  // Same synchronous task as the load render → single paint, no flash; the
  // stored name-highlight replay (§5 below) paints onto the zoomed render.
  molZoom2D = fScenarioValidZoom(step.style2D.zoom);
  fScenarioApplyViewerMaxHeight(step);
  try {
    if (typeof jsmeNomeclatureApplet !== "undefined" && jsmeNomeclatureApplet) {
      jsmeNomeclatureApplet.setMolecularAreaScale(molZoom2D);
      if (typeof jsmeNomeclatureAppletORGNL !== "undefined" && jsmeNomeclatureAppletORGNL) {
        jsmeNomeclatureAppletORGNL.setMolecularAreaScale(molZoom2D);
      }
    }
  } catch (eZoom) {
    /* applet unavailable */
  }
  // Per-step main-chain walk index re-asserted after the load: fSelectMol
  // resets to pool[0] via fInitProps, then the stored step applies on top.
  // Naming/boxes stay as loaded (winner); the highlight replay (§5 below)
  // paints onto the stepped chain. Out-of-range (data changed since
  // authoring) falls back to the winner. The async 3D side needs no hook:
  // fCalcMainChain3D adopts pool3D[shared idx] when the parse lands.
  try {
    if (typeof mainChainPool !== "undefined" && Array.isArray(mainChainPool) &&
      mainChainPool.length > 0) {
      var _ci = fScenarioValidChainIdx(step.chainIdx);
      if (_ci > mainChainPool.length - 1) _ci = 0;
      mainChainPoolIdx = _ci;
      mainChainAtomsList = mainChainPool[_ci].chain.slice();
    }
  } catch (eChain) { /* chain unavailable */ }
  try {
    if (typeof fShowNameAnalysis === "function") fShowNameAnalysis();
  } catch (e) {
    /* naming unavailable */
  }
  try {
    if (typeof fUpdateSVG === "function") fUpdateSVG();
  } catch (eZoomSvg) {
    /* viewer unavailable */
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

// Class-aware twin of fScenarioHide for the 2D/3D control bars, which both
// hiding mechanisms touch: the app's viewer toggles add the `hide` class
// (`display:none !important`) while present-chrome sets inline display only.
// Clearing inline display alone cannot revive a bar carrying a stale `hide`
// class (e.g. left by fScenarioRestoreChrome after a no-3D exit), so both
// are driven here. Every authoring caller of fScenarioChrome is followed by
// fScenarioRestoreChrome(viewers), which re-applies viewer-based hiding.
function fScenarioShowBar(id, show) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.display = show ? "" : "none";
  if (el.classList) el.classList.toggle("hide", !show);
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
  try { fScenarioSyncStepTextLayout(); } catch (eTxt) { /* text placement best-effort */ }
}

// Full-chrome restore for Exit: clears BOTH the inline display set by
// fScenarioHide and the `hide` class set by the app's own viewer toggles
// (fToggleViewer2D/3D add it to the control bars; `.hide` is
// `display:none !important`, so inline restore alone cannot bring those bars
// back). Settings chrome (save buttons, menu, viewer buttons, viewer
// settings, naming container) always comes back so all settings buttons are
// available in authoring. Viewer panes + their bars + view buttons instead
// follow the optional `viewers` arg (exit step's show.viewers; null/missing
// defaults both-visible), mirroring fToggleViewer2D/3D scope — so exiting a
// no-3D step leaves 3D hidden with view3DBtn inactive. Capture reads the
// buttons truthfully via fScenarioViewerOn.
function fScenarioRestoreChrome(viewers) {
  var ids = [
    "save2DBtn", "save3DBtn",
    "jsmeNomeclatureDIV",
    "menuCol", "viewerVisBtns", "viewerSettingsBtnDiv", "viewerSettingsPanel",
    "nameAnalysisContainer", "nameSettingsPanel",
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
  var show2D = !viewers || viewers["2D"] !== false;
  var show3D = !viewers || viewers["3D"] !== false;
  // 2D pane + bar (mirrors fToggleViewer2D: SVG + radio bar; DIV wrapper stays).
  try {
    var b2 = document.getElementById("view2DBtn");
    if (b2 && b2.classList) b2.classList.toggle("active", !!show2D);
    var svg = document.getElementById("jsmeNomeclatureSVG");
    if (svg) svg.style.display = show2D ? "" : "none";
    var r2 = document.getElementById("radio2DMode");
    if (r2) {
      r2.style.display = "";
      if (r2.classList) r2.classList.toggle("hide", !show2D);
    }
  } catch (e) {
    /* no 2D DOM */
  }
  // 3D pane + bar (mirrors fToggleViewer3D: applet + controls3D).
  try {
    var b3 = document.getElementById("view3DBtn");
    if (b3 && b3.classList) b3.classList.toggle("active", !!show3D);
    var ap = document.getElementById("nomeclature3D");
    if (ap) ap.style.display = show3D ? "" : "none";
    var c3 = document.getElementById("controls3D");
    if (c3) {
      c3.style.display = "";
      if (c3.classList) c3.classList.toggle("hide", !show3D);
    }
    if (show3D && typeof Jmol !== "undefined") {
      try {
        // Same stuck-viewport guard as fToggleViewer3D: re-sync the applet
        // to the now-visible pane before re-rendering.
        var _ap3 = document.getElementById("nomeclature3D");
        var _w3 = (_ap3 && _ap3.clientWidth) || 480;
        var _h3 = (_ap3 && _ap3.clientHeight) || 240;
        if (Jmol.resizeApplet && typeof jmolAppletNomeclature !== "undefined") {
          Jmol.resizeApplet(jmolAppletNomeclature, { width: _w3, height: _h3 });
        }
        Jmol.script(jmolAppletNomeclature, "refresh");
      } catch (e3) {
        /* 3D unavailable */
      }
    }
  } catch (e4) {
    /* no 3D DOM */
  }
}

function showTextOn(step) {
  // Automatic: heading + text show iff the step carries content
  // (title or note). The legacy show.text flag is ignored.
  return !!(step && (step.title || step.note));
}

function showNoteOn(step) {
  if (!step || !step.note) return false;
  if (window.MuLERMoCNote && MuLERMoCNote.hasVisibleContent) {
    return MuLERMoCNote.hasVisibleContent(step.note, step.noteFormat);
  }
  return String(step.note).replace(/<[^>]*>/g, "").trim() !== "";
}

function fScenarioRenderNote(el, note, format) {
  if (!el) return;
  if (window.MuLERMoCNote && MuLERMoCNote.renderNote) {
    MuLERMoCNote.renderNote(el, note, format);
    return;
  }
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
// through fScenarioRenderNote / MuLERMoCNote.
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
function fScenarioEscapeNoteAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function fScenarioInsertNoteSnippet(noteInput, st, snippet) {
  if (!noteInput || !snippet) return;
  try { noteInput.focus(); } catch (e) { /* no DOM */ }
  var val = noteInput.value || "";
  var s = 0, e = val.length;
  try {
    s = noteInput.selectionStart || 0;
    e = noteInput.selectionEnd || 0;
  } catch (err) { /* no selection API */ }
  if (e < s) { var t = s; s = e; e = t; }
  var next = val.slice(0, s) + snippet + val.slice(e);
  noteInput.value = next;
  st.note = next;
  try {
    var pos = s + snippet.length;
    noteInput.setSelectionRange(pos, pos);
  } catch (err2) { /* no selection API */ }
  fScenarioCheckNoteTags(noteInput);
}
function fScenarioNoteTextToHtml(value) {
  if (window.MuLERMoCNote && MuLERMoCNote.legacyTextToHtml) {
    return MuLERMoCNote.legacyTextToHtml(value);
  }
  var div = document.createElement("div");
  div.textContent = String(value || "");
  return div.innerHTML.replace(
    /&lt;(\/?)(b|i|u|sup|sub|ul|ol|li|small|big)&gt;/gi,
    function (m, slash, tag) { return "<" + slash + tag.toLowerCase() + ">"; }
  ).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");
}
var fScenarioNoteImageInputEl = null;
var fScenarioNoteImagePending = null;
function fScenarioGetNoteImageInput() {
  if (fScenarioNoteImageInputEl && document.body.contains(fScenarioNoteImageInputEl)) {
    return fScenarioNoteImageInputEl;
  }
  var input = document.getElementById("scNoteImageFile");
  if (!input) {
    input = document.createElement("input");
    input.type = "file";
    input.id = "scNoteImageFile";
    input.accept = ".png,.jpg,.jpeg,.gif,.webp,image/png,image/jpeg,image/gif,image/webp";
    input.style.display = "none";
    input.setAttribute("aria-hidden", "true");
    input.tabIndex = -1;
    input.addEventListener("change", function () {
      fScenarioReadNoteImageFile(input);
    });
    input.addEventListener("cancel", function () {
      fScenarioNoteImagePending = null;
      input.value = "";
    });
    document.body.appendChild(input);
  }
  fScenarioNoteImageInputEl = input;
  return input;
}
function fScenarioReadNoteImageFile(input) {
  var file = input.files && input.files[0] ? input.files[0] : null;
  var pending = fScenarioNoteImagePending;
  fScenarioNoteImagePending = null;
  try { input.value = ""; } catch (e) { /* input reset best-effort */ }
  if (!file || !pending) return;
  if (file.type && !/^image\/(png|jpe?g|gif|webp)$/i.test(file.type)) {
    fScenarioToast("Αποδεκτές μόνο εικόνες PNG, JPEG, GIF ή WebP.");
    return;
  }
  if (file.size > 512000) {
    fScenarioToast("Η εικόνα είναι πολύ μεγάλη (όριο ~500 KB).");
    return;
  }
  if (!window.FileReader) {
    fScenarioToast("Ο browser δεν υποστηρίζει ανάγνωση αρχείων εικόνας.");
    return;
  }
  var reader = new FileReader();
  reader.onload = function () {
    var url = String(reader.result || "");
    if (!/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(url)) {
      fScenarioToast("Αποδεκτές μόνο εικόνες PNG, JPEG, GIF ή WebP.");
      return;
    }
    if (url.length > 700000) {
      fScenarioToast("Η εικόνα data URI είναι πολύ μεγάλη (όριο ~500 KB).");
      return;
    }
    var defaultAlt = String(file.name || "").replace(/\.[^.]+$/, "");
    if (!pending.ctx || !pending.ctx.isActive || !pending.ctx.isActive()) return;
    fScenarioNoteImageDialogOpen(pending, url, defaultAlt);
  };
  reader.onerror = function () {
    fScenarioToast("Αποτυχία ανάγνωσης της εικόνας.");
  };
  reader.readAsDataURL(file);
}
function fScenarioInsertNoteImage(ctx) {
  if (!ctx) return;
  var input = fScenarioGetNoteImageInput();
  fScenarioNoteImagePending = { ctx: ctx };
  try { input.value = ""; } catch (e) { /* input reset best-effort */ }
  input.click();
}
var fScenarioNoteImageDialogEl = null;
var fScenarioNoteImageDialogPending = null;
function fScenarioNoteImageDimension(value) {
  var raw = String(value || "").trim();
  if (!raw) return { ok: true, value: null };
  if (!/^\d+$/.test(raw)) return { ok: false, value: null };
  var n = parseInt(raw, 10);
  if (isNaN(n) || n < 16 || n > 2000) return { ok: false, value: null };
  return { ok: true, value: String(n) };
}
function fScenarioNoteImageDialogClose() {
  var d = fScenarioNoteImageDialogEl;
  var pending = fScenarioNoteImageDialogPending;
  fScenarioNoteImageDialogPending = null;
  if (d) {
    if (typeof d.close === "function" && d.open) {
      try { d.close(); } catch (e) { d.removeAttribute("open"); }
    } else {
      d.removeAttribute("open");
    }
  }
  try {
    if (pending && pending.ctx && pending.ctx.focus) pending.ctx.focus();
  } catch (eFocus) { /* focus best-effort */ }
}
function fScenarioNoteImageDialogBuild() {
  if (fScenarioNoteImageDialogEl) return fScenarioNoteImageDialogEl;
  var d = document.createElement("dialog");
  d.id = "scNoteImageDialog";
  d.className = "scNoteImageDialog";
  d.setAttribute("aria-labelledby", "scNoteImageTitle");
  d.setAttribute("aria-modal", "true");
  var title = document.createElement("h2");
  title.id = "scNoteImageTitle";
  title.className = "scNoteImageTitle";
  title.textContent = "Εικόνα";
  var body = document.createElement("div");
  body.className = "scNoteImageBody";
  var altLabel = document.createElement("label");
  altLabel.className = "scNoteImageField";
  altLabel.appendChild(document.createTextNode("Εναλλακτική περιγραφή"));
  var alt = document.createElement("input");
  alt.type = "text";
  alt.className = "scNoteImageAlt";
  alt.required = true;
  altLabel.appendChild(alt);
  body.appendChild(altLabel);
  var dims = document.createElement("div");
  dims.className = "scNoteImageDims";
  [["Πλάτος (px)", "scNoteImageWidth"], ["Ύψος (px)", "scNoteImageHeight"]].forEach(function (def) {
    var label = document.createElement("label");
    label.className = "scNoteImageField";
    label.appendChild(document.createTextNode(def[0]));
    var input = document.createElement("input");
    input.type = "number";
    input.min = "16";
    input.max = "2000";
    input.step = "1";
    input.placeholder = "auto";
    input.className = def[1];
    label.appendChild(input);
    dims.appendChild(label);
  });
  body.appendChild(dims);
  var hint = document.createElement("p");
  hint.className = "scNoteImageHint";
  hint.textContent = "Κενό = αυτόματο. Προαιρετικά 16–2000 px.";
  body.appendChild(hint);
  var foot = document.createElement("div");
  foot.className = "scNoteImageFoot";
  var cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "scNoteImageBtn";
  cancel.textContent = "Άκυρο";
  cancel.onclick = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteImageDialogClose();
  };
  var insert = document.createElement("button");
  insert.type = "button";
  insert.className = "scNoteImageBtn scNoteImageInsert";
  insert.textContent = "Εισαγωγή";
  insert.onclick = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteImageDialogSubmit();
  };
  foot.appendChild(cancel);
  foot.appendChild(insert);
  d.appendChild(title);
  d.appendChild(body);
  d.appendChild(foot);
  d.addEventListener("cancel", function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteImageDialogClose();
  });
  d.addEventListener("close", function () {
    fScenarioNoteImageDialogPending = null;
  });
  document.body.appendChild(d);
  fScenarioNoteImageDialogEl = d;
  return d;
}
function fScenarioNoteImageDialogSubmit() {
  var d = fScenarioNoteImageDialogEl;
  var pending = fScenarioNoteImageDialogPending;
  if (!d || !pending) return;
  var altEl = d.querySelector(".scNoteImageAlt");
  var wEl = d.querySelector(".scNoteImageWidth");
  var hEl = d.querySelector(".scNoteImageHeight");
  var alt = String(altEl && altEl.value || "").trim();
  if (!alt) {
    fScenarioToast("Η εναλλακτική περιγραφή εικόνας είναι υποχρεωτική.");
    try { if (altEl) altEl.focus(); } catch (eAlt) { /* focus best-effort */ }
    return;
  }
  var w = fScenarioNoteImageDimension(wEl && wEl.value);
  if (!w.ok) {
    fScenarioToast("Το πλάτος πρέπει να είναι ακέραιος 16–2000 px.");
    try { if (wEl) wEl.focus(); } catch (eW) { /* focus best-effort */ }
    return;
  }
  var h = fScenarioNoteImageDimension(hEl && hEl.value);
  if (!h.ok) {
    fScenarioToast("Το ύψος πρέπει να είναι ακέραιος 16–2000 px.");
    try { if (hEl) hEl.focus(); } catch (eH) { /* focus best-effort */ }
    return;
  }
  var snippet = '<img src="' + fScenarioEscapeNoteAttr(pending.url) +
    '" alt="' + fScenarioEscapeNoteAttr(alt) + '" class="note-img"';
  if (w.value) snippet += ' width="' + w.value + '"';
  if (h.value) snippet += ' height="' + h.value + '"';
  snippet += ">";
  var ctx = pending.ctx;
  if (!ctx || !ctx.isActive || !ctx.isActive()) {
    fScenarioNoteImageDialogClose();
    return;
  }
  fScenarioNoteImageDialogClose();
  ctx.insertHtml(snippet);
  ctx.afterInsert();
}
function fScenarioNoteImageDialogOpen(pending, url, defaultAlt) {
  var d = fScenarioNoteImageDialogBuild();
  fScenarioNoteImageDialogPending = { ctx: pending && pending.ctx, url: url };
  var alt = d.querySelector(".scNoteImageAlt");
  var w = d.querySelector(".scNoteImageWidth");
  var h = d.querySelector(".scNoteImageHeight");
  if (alt) alt.value = defaultAlt || "";
  if (w) w.value = "";
  if (h) h.value = "";
  if (typeof d.showModal === "function") {
    try { d.showModal(); } catch (e) { d.setAttribute("open", ""); }
  } else {
    d.setAttribute("open", "");
  }
  try {
    if (alt) {
      alt.focus();
      alt.select();
    }
  } catch (eFocus) { /* focus best-effort */ }
}
function fScenarioInsertNoteTable(ctx) {
  if (!ctx) return;
  var rows = parseInt(window.prompt("Γραμμές πίνακα (1–8)", "3"), 10);
  if (isNaN(rows)) return;
  rows = Math.max(1, Math.min(8, rows));
  var cols = parseInt(window.prompt("Στήλες πίνακα (1–8)", "2"), 10);
  if (isNaN(cols)) return;
  cols = Math.max(1, Math.min(8, cols));
  var html = '<table class="note-table"><thead><tr>';
  for (var c = 1; c <= cols; c++) html += "<th>Κεφαλίδα " + c + "</th>";
  html += "</tr></thead>";
  if (rows > 1) {
    html += "<tbody>";
    for (var r = 1; r < rows; r++) {
      html += "<tr>";
      for (var c2 = 1; c2 <= cols; c2++) html += "<td>Κελί " + r + "." + c2 + "</td>";
      html += "</tr>";
    }
    html += "</tbody>";
  }
  html += "</table>";
  ctx.insertHtml(html);
  ctx.afterInsert();
}
function fScenarioCheckNoteTags(noteInput) {
  if (!noteInput || !noteInput.classList || typeof noteInput.value !== "string") return;
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
function fScenarioNoteContentBar(ctx, opts) {
  opts = opts || {};
  // Inline keeps quick text/list tools; heavy inserts are modal-only.
  var showLists = opts.showLists !== false;
  var showInsert = opts.showInsert !== false;
  var showComponent = opts.showComponent !== false;
  var bar = opts.bar || document.createElement("div");
  if (!opts.bar) bar.className = "scNoteToolbar";
  if (opts.preserveFocus && bar.addEventListener) {
    bar.addEventListener("mousedown", function (ev) {
      var b = ev.target && ev.target.closest ? ev.target.closest("button") : null;
      if (b) ev.preventDefault();
    });
  }
  function kind() {
    return ctx.format();
  }
  function notify() {
    if (opts.onChange) opts.onChange();
  }
  var formatBtn = null;
  var sizeSelect = null;
  var sizeWrap = null;
  var alignBtn = null;
  function paint() {
    var html = kind() === "html";
    var rich = ctx.isRich ? !!ctx.isRich() : true;
    if (formatBtn) {
      formatBtn.textContent = html ? "HTML" : "TXT";
      if (formatBtn.classList) formatBtn.classList.toggle("active", html);
      formatBtn.setAttribute("data-tooltip", html ? "Μορφή HTML — κλικ για απλό κείμενο" : "Απλό κείμενο — κλικ για HTML");
      formatBtn.setAttribute("aria-label", html ? "Μορφή HTML — κλικ για απλό κείμενο" : "Απλό κείμενο — κλικ για HTML");
    }
    if (sizeSelect) {
      sizeSelect.disabled = !rich;
      sizeSelect.setAttribute("aria-label", rich ? "Μέγεθος επιλεγμένου κειμένου" : "Διαθέσιμο στην οπτική επεξεργασία");
    }
    if (sizeWrap) {
      sizeWrap.setAttribute("data-tooltip", rich ? "Μέγεθος επιλεγμένου κειμένου" : "Διαθέσιμο στην οπτική επεξεργασία");
    }
    if (alignBtn) {
      alignBtn.disabled = !rich;
      alignBtn.setAttribute("data-tooltip", rich ? "Στοίχιση επιλεγμένου κειμένου" : "Διαθέσιμο στην οπτική επεξεργασία");
      alignBtn.setAttribute("aria-label", rich ? "Στοίχιση επιλεγμένου κειμένου" : "Διαθέσιμο στην οπτική επεξεργασία");
    }
    if (opts.onPaint) opts.onPaint(html);
  }
  function ensureHtml() {
    if (kind() !== "html") ctx.ensureHtml();
  }
  if (opts.showFormat !== false) {
    formatBtn = document.createElement("button");
    formatBtn.type = "button";
    formatBtn.className = "scNoteBtn scNoteFormatBtn";
    formatBtn.onclick = function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      ctx.setFormat(kind() === "html" ? "text" : "html");
      paint();
      notify();
    };
    bar.appendChild(formatBtn);
  }
  var noteBtns = [
    ["B", "b", "Έντονα"],
    ["I", "i", "Πλάγια"],
    ["x²", "sup", "Εκθέτης"],
    ["x₂", "sub", "Δείκτης"],
    ["✕", null, "Καθαρισμός μορφοποίησης"]
  ];
  noteBtns.forEach(function (def) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "scNoteBtn";
    if (def[0] === "✕" && window.MuLERIcons && window.MuLERIcons.formatClear) {
      b.innerHTML = window.MuLERIcons.formatClear;
    } else {
      b.textContent = def[0];
    }
    b.setAttribute("data-tooltip", def[2]);
    b.setAttribute("aria-label", def[2]);
    b.onclick = function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      if (def[1]) ctx.wrap(def[1]);
      else ctx.clean();
      paint();
      notify();
    };
    bar.appendChild(b);
  });
  if (showLists) {
    [["ul", "Λίστα με κουκκίδες", "unorderedList"],
      ["ol", "Αριθμημένη λίστα", "orderedList"]].forEach(function (def) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "scNoteBtn scNoteListBtn";
      var icon = window.MuLERIcons && window.MuLERIcons[def[2]];
      if (icon) b.innerHTML = icon;
      else b.textContent = def[0].toUpperCase();
      b.setAttribute("data-tooltip", def[1]);
      b.setAttribute("aria-label", def[1]);
      b.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        ensureHtml();
        if (ctx.list) ctx.list(def[0]);
        paint();
        notify();
      };
      bar.appendChild(b);
    });
  }
  sizeSelect = document.createElement("select");
  sizeSelect.className = "scNoteFontSize";
  sizeSelect.setAttribute("aria-label", "Μέγεθος επιλεγμένου κειμένου");
  var sizeDefs = [["", "Μέγεθος"], ["14", "Μικρό 14"], ["18", "Κανονικό 18"], ["22", "Μεγάλο 22"], ["26", "Πολύ μεγάλο 26"]];
  sizeDefs.forEach(function (def) {
    var opt = document.createElement("option");
    opt.value = def[0];
    opt.textContent = def[1];
    sizeSelect.appendChild(opt);
  });
  sizeSelect.onchange = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var value = sizeSelect.value;
    if (!value) return;
    if (ctx.fontSize) ctx.fontSize(parseInt(value, 10));
    sizeSelect.value = "";
    paint();
    notify();
  };
  sizeWrap = document.createElement("span");
  sizeWrap.className = "scNoteFontSizeWrap";
  sizeWrap.appendChild(sizeSelect);
  bar.appendChild(sizeWrap);
  (function () {
    var defs = [
      ["left", "alignLeft", "Αριστερά"],
      ["center", "alignCenter", "Κέντρο"],
      ["right", "alignRight", "Δεξιά"]
    ];
    var alignValue = "left";
    var wrap = document.createElement("span");
    wrap.className = "scTextPosDD scNoteAlignDD";
    alignBtn = document.createElement("button");
    alignBtn.type = "button";
    alignBtn.className = "scNoteBtn scTextPosBtn scNoteAlignBtn";
    alignBtn.setAttribute("aria-haspopup", "menu");
    alignBtn.setAttribute("aria-expanded", "false");
    var menu = document.createElement("div");
    menu.className = "scTextPosMenu scNoteAlignMenu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "Στοίχιση κειμένου");
    var caret = document.createElement("span");
    caret.className = "scTextPosCaret";
    caret.setAttribute("aria-hidden", "true");
    var itemEls = [];
    defs.forEach(function (def) {
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "scTextPosOpt scNoteAlignOpt";
      opt.setAttribute("role", "menuitem");
      opt.setAttribute("data-tooltip", def[2]);
      opt.setAttribute("aria-label", def[2]);
      var icon = window.MuLERIcons && window.MuLERIcons[def[1]];
      if (icon) opt.innerHTML = icon;
      else opt.textContent = def[2];
      opt.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        ensureHtml();
        if (ctx.align) ctx.align(def[0]);
        alignValue = def[0];
        paintAlign();
        closeMenu(true);
        paint();
        notify();
      };
      itemEls.push(opt);
      menu.appendChild(opt);
    });
    function paintAlign() {
      var found = null;
      for (var i = 0; i < defs.length; i++) {
        if (defs[i][0] === alignValue) { found = defs[i]; break; }
      }
      var icon = found && window.MuLERIcons && window.MuLERIcons[found[1]];
      if (icon) alignBtn.innerHTML = icon;
      else alignBtn.textContent = found ? found[2] : "A";
      alignBtn.appendChild(caret);
      for (var j = 0; j < itemEls.length; j++) {
        itemEls[j].classList.toggle("active", defs[j][0] === alignValue);
      }
    }
    function closeMenu(restore) {
      if (fScenarioTextPosMenu && fScenarioTextPosMenu.menu === menu) fScenarioTextPosMenu = null;
      menu.classList.remove("open");
      alignBtn.setAttribute("aria-expanded", "false");
      if (restore && alignBtn.focus) alignBtn.focus();
    }
    function openMenu() {
      if (fScenarioTextPosMenu) fScenarioTextPosMenu.close(false);
      menu.style.visibility = "hidden";
      menu.classList.add("open");
      alignBtn.setAttribute("aria-expanded", "true");
      var r = alignBtn.getBoundingClientRect();
      var mw = menu.offsetWidth;
      var mh = menu.offsetHeight;
      var vw = window.innerWidth || document.documentElement.clientWidth;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var left = r.left;
      if (left + mw > vw - 4) left = vw - mw - 4;
      if (left < 4) left = 4;
      var top = r.bottom + 4;
      if (top + mh > vh - 4) top = r.top - mh - 4;
      if (top < 4) top = 4;
      menu.style.left = Math.round(left) + "px";
      menu.style.top = Math.round(top) + "px";
      menu.style.visibility = "";
      menu.getBoundingClientRect();
      fScenarioTextPosMenu = { menu: menu, btn: alignBtn, close: closeMenu };
      var focusFirst = function () {
        if (!menu.classList.contains("open")) return;
        if (itemEls[0] && itemEls[0].focus) itemEls[0].focus();
      };
      focusFirst();
      if (window.requestAnimationFrame) window.requestAnimationFrame(focusFirst);
      else setTimeout(focusFirst, 0);
    }
    alignBtn.onclick = function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      if (alignBtn.disabled) return;
      if (menu.classList.contains("open")) closeMenu(true);
      else openMenu();
    };
    alignBtn.addEventListener("keydown", function (ev) {
      if (ev.key !== "ArrowDown" && ev.key !== "ArrowUp") return;
      ev.preventDefault();
      if (!menu.classList.contains("open")) {
        openMenu();
        return;
      }
      var idx = -1;
      for (var i = 0; i < itemEls.length; i++) {
        if (itemEls[i] === document.activeElement) { idx = i; break; }
      }
      if (idx < 0) idx = 0;
      else idx = ev.key === "ArrowDown" ? (idx + 1) % itemEls.length : (idx - 1 + itemEls.length) % itemEls.length;
      itemEls[idx].focus();
    });
    menu.addEventListener("keydown", function (ev) {
      var key = ev.key;
      if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Home" && key !== "End") return;
      ev.preventDefault();
      var idx = 0;
      for (var i = 0; i < itemEls.length; i++) {
        if (itemEls[i] === document.activeElement) { idx = i; break; }
      }
      if (key === "ArrowDown") idx = (idx + 1) % itemEls.length;
      else if (key === "ArrowUp") idx = (idx - 1 + itemEls.length) % itemEls.length;
      else if (key === "Home") idx = 0;
      else idx = itemEls.length - 1;
      itemEls[idx].focus();
    });
    wrap.appendChild(alignBtn);
    wrap.appendChild(menu);
    bar.appendChild(wrap);
    paintAlign();
  })();
  if (showInsert) {
    [["image", "Εικ.", "Εικόνα από αρχείο (PNG/JPEG/GIF/WebP, ≤500 KB)", fScenarioInsertNoteImage],
      ["table", "Πίν.", "Εισαγωγή πίνακα", fScenarioInsertNoteTable]].forEach(function (def) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "scNoteBtn scNoteInsertBtn";
      var icon = def[0] === "image"
        ? (window.MuLERIcons && (window.MuLERIcons.image || window.MuLERIcons.saveImage))
        : (window.MuLERIcons && window.MuLERIcons[def[0]]);
      if (icon) b.innerHTML = icon;
      else b.textContent = def[1];
      b.setAttribute("data-tooltip", def[2]);
      b.setAttribute("aria-label", def[2]);
      b.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        ensureHtml();
        def[3](ctx);
        paint();
        notify();
      };
      bar.appendChild(b);
    });
  }
  (function () {
    if (!showComponent) return;
    var defs = [
      ["rule-table:1", "1ο συνθετικό"],
      ["rule-table:2", "2ο συνθετικό"],
      ["rule-table:3", "3ο συνθετικό"],
      ["rule-table:4", "Σειρά ομάδων"],
      ["rule-table:alkyl", "Αλκύλια"],
      ["rule-table:alkoxy", "Αλκοξυομάδες"]
    ];
    var icon = (window.MuLERIcons && (window.MuLERIcons.addPredefinedItem || window.MuLERIcons.book)) || null;
    var wrap = document.createElement("span");
    wrap.className = "scNoteComponentDD";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scNoteBtn scNoteComponentBtn";
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-expanded", "false");
    var menu = document.createElement("div");
    menu.className = "scNoteComponentMenu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "Έτοιμο περιεχόμενο");
    var itemEls = [];
    defs.forEach(function (def) {
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "scNoteComponentOpt";
      opt.setAttribute("role", "menuitem");
      opt.textContent = def[1];
      opt.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        choose(def[0]);
      };
      itemEls.push(opt);
      menu.appendChild(opt);
    });
    function paintComp() {
      btn.innerHTML = icon || "Σ";
      var caret = document.createElement("span");
      caret.className = "scNoteComponentCaret";
      caret.setAttribute("aria-hidden", "true");
      btn.appendChild(caret);
      var label = "Έτοιμο περιεχόμενο";
      btn.setAttribute("data-tooltip", label);
      btn.setAttribute("aria-label", label);
    }
    function closeMenu(restore) {
      if (fScenarioTextPosMenu && fScenarioTextPosMenu.menu === menu) fScenarioTextPosMenu = null;
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      if (restore && btn.focus) btn.focus();
    }
    function openMenu() {
      if (fScenarioTextPosMenu) fScenarioTextPosMenu.close(false);
      menu.style.visibility = "hidden";
      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      var r = btn.getBoundingClientRect();
      var mw = menu.offsetWidth;
      var mh = menu.offsetHeight;
      var vw = window.innerWidth || document.documentElement.clientWidth;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var left = r.left;
      if (left + mw > vw - 4) left = vw - mw - 4;
      if (left < 4) left = 4;
      var top = r.bottom + 4;
      if (top + mh > vh - 4) top = r.top - mh - 4;
      if (top < 4) top = 4;
      menu.style.left = Math.round(left) + "px";
      menu.style.top = Math.round(top) + "px";
      menu.style.visibility = "";
      menu.getBoundingClientRect();
      fScenarioTextPosMenu = { menu: menu, btn: btn, close: closeMenu };
      var focusFirst = function () {
        if (!menu.classList.contains("open")) return;
        if (itemEls[0] && itemEls[0].focus) itemEls[0].focus();
      };
      focusFirst();
      if (window.requestAnimationFrame) window.requestAnimationFrame(focusFirst);
      else setTimeout(focusFirst, 0);
    }
    function choose(val) {
      ensureHtml();
      ctx.insertHtml('<div data-note-include="' + val + '"></div>', { rerender: true });
      closeMenu(true);
      paint();
      notify();
    }
    btn.onclick = function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      if (menu.classList.contains("open")) closeMenu(true);
      else openMenu();
    };
    btn.addEventListener("keydown", function (ev) {
      if (ev.key !== "ArrowDown" && ev.key !== "ArrowUp") return;
      ev.preventDefault();
      if (!menu.classList.contains("open")) {
        openMenu();
        return;
      }
      var idx = -1;
      for (var i = 0; i < itemEls.length; i++) {
        if (itemEls[i] === document.activeElement) { idx = i; break; }
      }
      if (idx < 0) idx = 0;
      else idx = ev.key === "ArrowDown" ? (idx + 1) % itemEls.length : (idx - 1 + itemEls.length) % itemEls.length;
      itemEls[idx].focus();
    });
    menu.addEventListener("keydown", function (ev) {
      var key = ev.key;
      if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Home" && key !== "End") return;
      ev.preventDefault();
      var idx = 0;
      for (var i = 0; i < itemEls.length; i++) {
        if (itemEls[i] === document.activeElement) { idx = i; break; }
      }
      if (key === "ArrowDown") idx = (idx + 1) % itemEls.length;
      else if (key === "ArrowUp") idx = (idx - 1 + itemEls.length) % itemEls.length;
      else if (key === "Home") idx = 0;
      else idx = itemEls.length - 1;
      itemEls[idx].focus();
    });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    bar.appendChild(wrap);
    paintComp();
  })();
  paint();
  return { bar: bar, paint: paint };
}

function fScenarioNoteContextFromInline(state, st, opts) {
  opts = opts || {};
  function copyToStep() {
    st.note = state.draft.note;
    st.noteFormat = "html";
  }
  function sync(markDirty) {
    if (!state || !state.surfaces || !state.surfaces.preview) return;
    if (state.draft.noteFormat !== "html" && !markDirty && !state.dirty) return;
    fScenarioNoteEditorSyncActive(state, !!markDirty);
    copyToStep();
  }
  var ctx = {
    isRich: function () { return true; },
    format: function () { return "html"; },
    setFormat: function () { return "html"; },
    ensureHtml: function () {
      if (state.draft.noteFormat !== "html") sync(true);
    },
    wrap: function (tag) {
      ctx.ensureHtml();
      fScenarioRichWrap(state, tag);
      sync(true);
    },
    list: function (tag) {
      ctx.ensureHtml();
      fScenarioRichMakeList(state, tag);
      sync(true);
    },
    fontSize: function (px) {
      ctx.ensureHtml();
      fScenarioRichSetBlockFontSize(state, px);
      sync(true);
    },
    align: function (align) {
      ctx.ensureHtml();
      fScenarioRichAlignBlocks(state, align);
      sync(true);
    },
    clean: function () {
      ctx.ensureHtml();
      fScenarioRichClean(state);
      sync(true);
    },
    insertHtml: function (html, insOpts) {
      ctx.ensureHtml();
      fScenarioRichInsertHtml(state, html, insOpts);
      sync(true);
    },
    focus: function () {
      try { state.surfaces.preview.focus(); } catch (e) { /* focus best-effort */ }
    },
    checkTags: function () {},
    notify: function () { if (opts.onChange) opts.onChange(); },
    afterInsert: function () {
      sync(true);
      if (opts.onChange) opts.onChange();
    },
    isActive: function () {
      return !!(state.surfaces.preview && document.body.contains(state.surfaces.preview));
    }
  };
  return ctx;
}

var fScenarioNoteEditorEl = null;
var fScenarioNoteEditorState = null;
function fScenarioNoteEditorIsOpen() {
  return !!(fScenarioNoteEditorEl && fScenarioNoteEditorEl.open);
}
function fScenarioNoteEditorRestoreFocus() {
  var state = fScenarioNoteEditorState;
  fScenarioNoteEditorState = null;
  if (!state) return;
  var target = state.expandBtn || (state.inlineEditor && state.inlineEditor.el);
  try {
    if (target && document.contains(target) && target.focus) target.focus();
  } catch (e) { /* focus best-effort */ }
}
function fScenarioNoteEditorClose() {
  var d = fScenarioNoteEditorEl;
  if (!d) return;
  if (typeof d.close === "function" && d.open) {
    d.close();
    return;
  }
  d.removeAttribute("open");
  fScenarioNoteEditorRestoreFocus();
}
function fScenarioNoteEditorSyncActive(state, markDirty) {
  if (!state) return;
  var draft = state.draft;
  if (state.richView === "wysiwyg") {
    if (draft.noteFormat !== "html" && !markDirty && !state.dirty) return;
    draft.note = window.MuLERMoCNote && MuLERMoCNote.serializeEditable
      ? MuLERMoCNote.serializeEditable(state.surfaces.preview)
      : state.surfaces.preview.innerHTML;
    draft.noteFormat = "html";
  } else {
    if (draft.noteFormat !== "html" && !markDirty && !state.dirty) return;
    draft.note = state.surfaces.source.value || "";
    draft.noteFormat = "html";
    fScenarioCheckNoteTags(state.surfaces.source);
  }
  if (markDirty) state.dirty = true;
}
function fScenarioRichSaveSelection(state) {
  if (!state || !state.surfaces || !state.surfaces.preview) return;
  var preview = state.surfaces.preview;
  var sel = window.getSelection ? window.getSelection() : null;
  if (!sel || sel.rangeCount === 0) return;
  var r = sel.getRangeAt(0);
  if (preview.contains(r.commonAncestorContainer)) {
    state.richRange = r.cloneRange();
  }
}
function fScenarioRichRestoreSelection(state) {
  var preview = state.surfaces.preview;
  try { preview.focus(); } catch (e) { /* focus best-effort */ }
  if (!state.richRange) return false;
  var sel = window.getSelection ? window.getSelection() : null;
  if (!sel) return false;
  try {
    sel.removeAllRanges();
    sel.addRange(state.richRange);
    return true;
  } catch (err) {
    return false;
  }
}
function fScenarioRichFocusEnd(state) {
  var preview = state.surfaces.preview;
  try { preview.focus(); } catch (e) { /* focus best-effort */ }
  var sel = window.getSelection ? window.getSelection() : null;
  if (!sel || !document.createRange) return;
  var r = document.createRange();
  r.selectNodeContents(preview);
  r.collapse(false);
  sel.removeAllRanges();
  sel.addRange(r);
  fScenarioRichSaveSelection(state);
}
function fScenarioRichPlaceCaretAfterInclude(state, key) {
  var preview = state.surfaces.preview;
  var nodes = preview.querySelectorAll ? preview.querySelectorAll('[data-note-include="' + key + '"]') : [];
  if (!nodes.length) {
    fScenarioRichFocusEnd(state);
    return;
  }
  var el = nodes[nodes.length - 1];
  try { preview.focus(); } catch (e) { /* focus best-effort */ }
  var sel = window.getSelection ? window.getSelection() : null;
  if (!sel || !document.createRange) return;
  var r = document.createRange();
  r.setStartAfter(el);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
  fScenarioRichSaveSelection(state);
}
function fScenarioNoteEditorRenderPreview(state) {
  var preview = state.surfaces.preview;
  if (!preview) return false;
  state.suppress = true;
  var note = state.draft.noteFormat === "html"
    ? state.draft.note
    : fScenarioNoteTextToHtml(state.draft.note);
  var ok = window.MuLERMoCNote && MuLERMoCNote.renderEditable
    ? MuLERMoCNote.renderEditable(preview, note)
    : false;
  state.suppress = false;
  if (ok) fScenarioRichSaveSelection(state);
  return !!ok;
}
function fScenarioRichInsertHtml(state, html, opts) {
  var preview = state.surfaces.preview;
  if (!preview || !html) return;
  if (!fScenarioRichRestoreSelection(state)) fScenarioRichFocusEnd(state);
  var inserted = false;
  try {
    inserted = document.execCommand("insertHTML", false, html);
  } catch (e) {
    inserted = false;
  }
  if (!inserted) {
    var sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.rangeCount) {
      var r = sel.getRangeAt(0);
      r.deleteContents();
      var tpl = document.createElement("template");
      tpl.innerHTML = html;
      var frag = tpl.content;
      var last = frag.lastChild;
      r.insertNode(frag);
      if (last) {
        r.setStartAfter(last);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
      }
    }
  }
  var rerender = !!(opts && opts.rerender) || /data-note-include/i.test(html);
  fScenarioNoteEditorSyncActive(state, true);
  if (rerender) {
    var keyMatch = /data-note-include="([^"]+)"/i.exec(html);
    var key = keyMatch ? keyMatch[1] : "";
    if (fScenarioNoteEditorRenderPreview(state)) {
      if (key) fScenarioRichPlaceCaretAfterInclude(state, key);
      else fScenarioRichFocusEnd(state);
      fScenarioNoteEditorSyncActive(state, true);
    }
  } else {
    fScenarioRichSaveSelection(state);
  }
}
function fScenarioRichWrap(state, tag) {
  var preview = state.surfaces.preview;
  if (!preview) return;
  fScenarioRichRestoreSelection(state);
  var cmd = tag === "b" ? "bold"
    : tag === "i" ? "italic"
      : tag === "u" ? "underline"
        : tag === "sup" ? "superscript"
          : tag === "sub" ? "subscript" : "";
  var ok = false;
  if (cmd) {
    try { document.execCommand("styleWithCSS", false, false); } catch (e) { /* best-effort */ }
    try { ok = document.execCommand(cmd, false, null); } catch (e2) { ok = false; }
  }
  if (!ok) {
    var sel = window.getSelection ? window.getSelection() : null;
    if (!sel || sel.rangeCount === 0) {
      fScenarioRichFocusEnd(state);
      sel = window.getSelection ? window.getSelection() : null;
    }
    if (sel && sel.rangeCount) {
      var r = sel.getRangeAt(0);
      if (r.collapsed) {
        var empty = document.createElement(tag);
        r.insertNode(empty);
        r.setStart(empty, 0);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
      } else {
        var node = r.commonAncestorContainer;
        if (node && node.nodeType === 3) node = node.parentNode;
        var existing = null;
        while (node && node !== preview) {
          if (node.nodeName && node.nodeName.toLowerCase() === tag) {
            existing = node;
            break;
          }
          node = node.parentNode;
        }
        if (existing) {
          var parent = existing.parentNode;
          while (existing.firstChild) parent.insertBefore(existing.firstChild, existing);
          parent.removeChild(existing);
        } else {
          try {
            var wrapper = document.createElement(tag);
            wrapper.appendChild(r.extractContents());
            r.insertNode(wrapper);
            r.selectNodeContents(wrapper);
            sel.removeAllRanges();
            sel.addRange(r);
          } catch (e3) { /* range crosses blocks */ }
        }
      }
    }
  }
  fScenarioRichSaveSelection(state);
  fScenarioNoteEditorSyncActive(state, true);
}
function fScenarioRichBlockTargets(state, create) {
  var preview = state && state.surfaces ? state.surfaces.preview : null;
  if (!preview) return [];
  if (!fScenarioRichRestoreSelection(state)) fScenarioRichFocusEnd(state);
  var sel = window.getSelection ? window.getSelection() : null;
  if (!sel || sel.rangeCount === 0) return [];
  var range = sel.getRangeAt(0);
  if (!preview.contains(range.commonAncestorContainer)) return [];
  var selector = "p,div,li,blockquote,td,th";
  var blocks = [];
  function addBlock(el) {
    if (!el || !preview.contains(el)) return;
    if (el.closest && el.closest("[data-note-include]")) return;
    if (blocks.indexOf(el) < 0) blocks.push(el);
  }
  if (range.collapsed) {
    var node = range.startContainer;
    if (node && node.nodeType === 3) node = node.parentNode;
    var block = node && node.closest ? node.closest(selector) : null;
    if (block) {
      addBlock(block);
    } else if (create) {
      var div = document.createElement("div");
      div.appendChild(document.createElement("br"));
      range.insertNode(div);
      range.setStart(div, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      addBlock(div);
    }
  } else {
    var nodes = preview.querySelectorAll ? preview.querySelectorAll(selector) : [];
    for (var i = 0; i < nodes.length; i++) {
      try {
        if (range.intersectsNode(nodes[i])) addBlock(nodes[i]);
      } catch (e) {
        if (nodes[i].contains(range.commonAncestorContainer)) addBlock(nodes[i]);
      }
    }
    if (!blocks.length && create) {
      var wrap = document.createElement("div");
      try {
        wrap.appendChild(range.extractContents());
        range.insertNode(wrap);
        range.selectNodeContents(wrap);
        sel.removeAllRanges();
        sel.addRange(range);
        addBlock(wrap);
      } catch (e2) { /* range crosses blocks */ }
    }
  }
  var result = [];
  for (var j = 0; j < blocks.length; j++) {
    var hasChild = false;
    for (var k = 0; k < blocks.length; k++) {
      if (j !== k && blocks[j].contains(blocks[k])) { hasChild = true; break; }
    }
    if (!hasChild) result.push(blocks[j]);
  }
  return result;
}
function fScenarioRichSetBlockFontSize(state, px) {
  var allowed = [14, 18, 22, 26];
  if (allowed.indexOf(px) < 0) return false;
  var targets = fScenarioRichBlockTargets(state, true);
  if (!targets.length) return false;
  for (var i = 0; i < targets.length; i++) {
    for (var j = 0; j < allowed.length; j++) {
      targets[i].classList.remove("note-fs-" + allowed[j]);
    }
    targets[i].classList.add("note-fs-" + px);
  }
  fScenarioRichSaveSelection(state);
  fScenarioNoteEditorSyncActive(state, true);
  return true;
}
function fScenarioRichClearAlign(el) {
  if (!el || !el.classList) return;
  el.classList.remove("note-align-left");
  el.classList.remove("note-align-center");
  el.classList.remove("note-align-right");
}
function fScenarioRichAlignTargets(state) {
  var preview = state && state.surfaces ? state.surfaces.preview : null;
  var blocks = fScenarioRichBlockTargets(state, true);
  var targets = [];
  for (var i = 0; i < blocks.length; i++) {
    var target = blocks[i];
    // A list item cannot carry alignment independently: align its list.
    if (target && target.nodeName === "LI" && target.closest) {
      var list = target.closest("ul,ol");
      if (list && preview && preview.contains(list)) target = list;
    }
    if (targets.indexOf(target) < 0) targets.push(target);
  }
  return targets;
}
function fScenarioRichAlignBlocks(state, align) {
  if (align !== "left" && align !== "center" && align !== "right") return false;
  var targets = fScenarioRichAlignTargets(state);
  if (!targets.length) return false;
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    fScenarioRichClearAlign(target);
    if (target.nodeName === "UL" || target.nodeName === "OL") {
      var items = target.querySelectorAll ? target.querySelectorAll("li") : [];
      for (var j = 0; j < items.length; j++) fScenarioRichClearAlign(items[j]);
    }
    if (align !== "left") target.classList.add("note-align-" + align);
  }
  fScenarioRichSaveSelection(state);
  fScenarioNoteEditorSyncActive(state, true);
  return true;
}
function fScenarioRichLiftLists(preview) {
  if (!preview) return;
  var lists = preview.querySelectorAll ? preview.querySelectorAll("ul,ol") : [];
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
    var parent = list.parentNode;
    if (!parent || parent === preview) continue;
    var tag = parent.nodeName ? parent.nodeName.toLowerCase() : "";
    if (tag !== "p" && tag !== "div") continue;
    if (parent.childNodes.length !== 1) continue;
    parent.parentNode.insertBefore(list, parent);
    parent.parentNode.removeChild(parent);
  }
}
function fScenarioRichMakeList(state, tag) {
  var preview = state && state.surfaces ? state.surfaces.preview : null;
  if (!preview) return false;
  var listTag = tag === "ol" ? "ol" : "ul";
  if (!fScenarioRichRestoreSelection(state)) fScenarioRichFocusEnd(state);
  var ok = false;
  try {
    ok = document.execCommand(listTag === "ol" ? "insertOrderedList" : "insertUnorderedList", false, null);
  } catch (e) {
    ok = false;
  }
  if (ok) {
    fScenarioRichLiftLists(preview);
    fScenarioRichSaveSelection(state);
    fScenarioNoteEditorSyncActive(state, true);
    return true;
  }
  var sel = window.getSelection ? window.getSelection() : null;
  if (!sel || sel.rangeCount === 0) return false;
  var range = sel.getRangeAt(0);
  var lines = String(range.toString() || "").split(/\r?\n/).map(function (line) {
    return line.trim();
  }).filter(function (line) {
    return line !== "";
  });
  if (!lines.length) lines = ["Στοιχείο λίστας"];
  var items = lines.map(function (line) {
    return "<li>" + fScenarioEscapeNoteAttr(line) + "</li>";
  }).join("");
  fScenarioRichInsertHtml(state, "<" + listTag + ">" + items + "</" + listTag + ">");
  fScenarioRichLiftLists(preview);
  fScenarioNoteEditorSyncActive(state, true);
  return true;
}
function fScenarioRichClean(state) {
  var preview = state.surfaces.preview;
  if (!preview) return;
  var tags = ["b", "strong", "i", "em", "u", "s", "sup", "sub", "small", "big", "code", "span", "a"];
  var nodes = preview.querySelectorAll ? preview.querySelectorAll(tags.join(",")) : [];
  for (var i = nodes.length - 1; i >= 0; i--) {
    var el = nodes[i];
    if (el.closest && el.closest("[data-note-include]")) continue;
    var parent = el.parentNode;
    if (!parent) continue;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  }
  var styled = preview.querySelectorAll ? preview.querySelectorAll(".note-fs-14,.note-fs-18,.note-fs-22,.note-fs-26,.note-align-left,.note-align-center,.note-align-right") : [];
  for (var s = 0; s < styled.length; s++) {
    styled[s].classList.remove("note-fs-14");
    styled[s].classList.remove("note-fs-18");
    styled[s].classList.remove("note-fs-22");
    styled[s].classList.remove("note-fs-26");
    fScenarioRichClearAlign(styled[s]);
  }
  fScenarioNoteEditorSyncActive(state, true);
  fScenarioRichFocusEnd(state);
}
function fScenarioRichPaste(state, ev) {
  if (!ev || !ev.clipboardData) return;
  ev.preventDefault();
  var html = "";
  var text = "";
  try {
    html = ev.clipboardData.getData("text/html") || "";
    text = ev.clipboardData.getData("text/plain") || "";
  } catch (e) { /* clipboard best-effort */ }
  var safe = html && window.MuLERMoCNote && MuLERMoCNote.sanitizeHtml
    ? MuLERMoCNote.sanitizeHtml(html)
    : null;
  if (safe) {
    fScenarioRichInsertHtml(state, safe);
  } else if (text) {
    var escaped = fScenarioEscapeNoteAttr(text).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");
    fScenarioRichInsertHtml(state, escaped);
  }
}
function fScenarioNoteEditorPaint(state) {
  if (!state || !state.surfaces) return;
  state.surfaces.preview.hidden = state.richView !== "wysiwyg";
  state.surfaces.source.hidden = state.richView !== "source";
  if (state.sourceBtn) {
    var sourceView = state.richView === "source";
    var sourceIcon = window.MuLERIcons && (sourceView ? window.MuLERIcons.code : window.MuLERIcons.itemDetails);
    if (sourceIcon) state.sourceBtn.innerHTML = sourceIcon;
    else state.sourceBtn.textContent = sourceView ? "HTML" : "WYSIWYG";
    state.sourceBtn.classList.toggle("active", sourceView);
    state.sourceBtn.setAttribute("aria-pressed", sourceView ? "true" : "false");
    state.sourceBtn.setAttribute("data-tooltip", sourceView ? "Επιστροφή στην οπτική επεξεργασία" : "Επεξεργασία HTML πηγής");
    state.sourceBtn.setAttribute("aria-label", sourceView ? "Επιστροφή στην οπτική επεξεργασία" : "Επεξεργασία HTML πηγής");
  }
  if (state.contentBar && state.contentBar.paint) state.contentBar.paint();
}
function fScenarioNoteEditorSetRichView(state, view) {
  if (!state) return;
  var next = view === "source" ? "source" : "wysiwyg";
  if (state.richView === next) {
    fScenarioNoteEditorPaint(state);
    return;
  }
  if (next === "source") {
    if (state.richView === "wysiwyg" && state.dirty) fScenarioNoteEditorSyncActive(state, false);
    state.surfaces.source.value = state.draft.noteFormat === "html"
      ? state.draft.note
      : fScenarioNoteTextToHtml(state.draft.note);
    state.richView = "source";
    fScenarioCheckNoteTags(state.surfaces.source);
    fScenarioNoteEditorPaint(state);
    try { state.surfaces.source.focus(); } catch (e) { /* focus best-effort */ }
    return;
  }
  if (!state.sourceEdited && state.draft.noteFormat !== "html") {
    state.richView = "wysiwyg";
    if (!fScenarioNoteEditorRenderPreview(state)) {
      state.richView = "source";
      fScenarioToast("Η πλούσια προεπισκόπηση δεν είναι διαθέσιμη· παραμείνατε στην προβολή HTML.");
      fScenarioNoteEditorPaint(state);
      return;
    }
    fScenarioNoteEditorPaint(state);
    fScenarioRichFocusEnd(state);
    return;
  }
  var raw = state.surfaces.source.value || "";
  var safe = window.MuLERMoCNote && MuLERMoCNote.sanitizeHtml
    ? MuLERMoCNote.sanitizeHtml(raw)
    : null;
  if (safe === null) {
    fScenarioToast("Η ασφαλής μορφοποίηση δεν είναι διαθέσιμη· η προεπισκόπηση δεν άλλαξε.");
    return;
  }
  state.draft.note = safe;
  state.draft.noteFormat = "html";
  state.richView = "wysiwyg";
  if (!fScenarioNoteEditorRenderPreview(state)) {
    state.richView = "source";
    fScenarioToast("Η πλούσια προεπισκόπηση δεν είναι διαθέσιμη· παραμείνατε στην προβολή HTML.");
    fScenarioNoteEditorPaint(state);
    return;
  }
  fScenarioNoteEditorPaint(state);
  fScenarioRichFocusEnd(state);
}
function fScenarioNoteContextFromModal(state, opts) {
  opts = opts || {};
  var ctx = {
    isRich: function () { return state.richView === "wysiwyg"; },
    format: function () { return "html"; },
    setFormat: function () { return "html"; },
    ensureHtml: function () {
      if (state.draft.noteFormat !== "html") fScenarioNoteEditorSyncActive(state, true);
    },
    wrap: function (tag) {
      ctx.ensureHtml();
      if (ctx.isRich()) {
        fScenarioRichWrap(state, tag);
      } else {
        fScenarioWrapNoteSelection(state.surfaces.source, {}, "<" + tag + ">", "</" + tag + ">");
        fScenarioNoteEditorSyncActive(state, true);
      }
      if (opts.onChange) opts.onChange();
    },
    list: function (tag) {
      ctx.ensureHtml();
      if (ctx.isRich()) {
        fScenarioRichMakeList(state, tag);
      } else {
        fScenarioMakeNoteList(state.surfaces.source, {}, tag);
        fScenarioNoteEditorSyncActive(state, true);
      }
      if (opts.onChange) opts.onChange();
    },
    fontSize: function (px) {
      if (!ctx.isRich()) return false;
      ctx.ensureHtml();
      fScenarioRichSetBlockFontSize(state, px);
      if (opts.onChange) opts.onChange();
      return true;
    },
    align: function (align) {
      if (!ctx.isRich()) return false;
      ctx.ensureHtml();
      fScenarioRichAlignBlocks(state, align);
      if (opts.onChange) opts.onChange();
      return true;
    },
    clean: function () {
      ctx.ensureHtml();
      if (ctx.isRich()) {
        fScenarioRichClean(state);
      } else {
        fScenarioCleanNote(state.surfaces.source, {});
        fScenarioNoteEditorSyncActive(state, true);
      }
      if (opts.onChange) opts.onChange();
    },
    insertHtml: function (html, insOpts) {
      ctx.ensureHtml();
      if (ctx.isRich()) {
        fScenarioRichInsertHtml(state, html, insOpts);
      } else {
        fScenarioInsertNoteSnippet(state.surfaces.source, {}, html);
        fScenarioNoteEditorSyncActive(state, true);
      }
      if (opts.onChange) opts.onChange();
    },
    focus: function () {
      var surface = state.richView === "source" ? state.surfaces.source : state.surfaces.preview;
      try { surface.focus(); } catch (e) { /* focus best-effort */ }
    },
    checkTags: function () {
      if (ctx.isRich()) return;
      fScenarioCheckNoteTags(state.surfaces.source);
    },
    notify: function () {
      if (opts.onChange) opts.onChange();
    },
    afterInsert: function () {
      fScenarioNoteEditorSyncActive(state, true);
      if (opts.onChange) opts.onChange();
    },
    isActive: function () {
      return fScenarioNoteEditorState === state && fScenarioNoteEditorIsOpen();
    }
  };
  return ctx;
}
function fScenarioNoteEditorApply() {
  var state = fScenarioNoteEditorState;
  if (!state) return;
  var legacyUntouched = state.draft.noteFormat !== "html" && !state.dirty && !state.sourceEdited;
  if (legacyUntouched) {
    state.st.note = state.snapshot.note;
    state.st.noteFormat = state.snapshot.noteFormat;
  } else {
    if (state.richView === "source") {
      state.draft.note = state.surfaces.source.value || "";
    } else {
      state.draft.note = window.MuLERMoCNote && MuLERMoCNote.serializeEditable
        ? MuLERMoCNote.serializeEditable(state.surfaces.preview)
        : state.surfaces.preview.innerHTML;
    }
    var safe = window.MuLERMoCNote && MuLERMoCNote.sanitizeHtml
      ? MuLERMoCNote.sanitizeHtml(state.draft.note)
      : null;
    if (safe === null) {
      fScenarioToast("Η ασφαλής μορφοποίηση δεν είναι διαθέσιμη· η εφαρμογή ακυρώθηκε.");
      return;
    }
    state.st.note = safe;
    state.st.noteFormat = "html";
  }
  if (state.inlineEditor && state.inlineEditor.refresh) state.inlineEditor.refresh();
  if (state.paintFormat) state.paintFormat();
  state.dirty = false;
  fScenarioNoteEditorClose();
}
function fScenarioNoteEditorRequestClose(force) {
  var state = fScenarioNoteEditorState;
  if (!state) {
    fScenarioNoteEditorClose();
    return;
  }
  if (!force) {
    var changed = false;
    if (state.dirty || state.sourceEdited) {
      fScenarioNoteEditorSyncActive(state, false);
      changed = state.draft.note !== state.snapshot.note ||
        state.draft.noteFormat !== state.snapshot.noteFormat;
    }
    if (changed) {
      var ok = window.confirm("Υπάρχουν μη αποθηκευμένες αλλαγές. Να απορριφθούν;");
      if (!ok) return;
    }
  }
  state.dirty = false;
  fScenarioNoteEditorClose();
}
function fScenarioNoteEditorBuild() {
  if (fScenarioNoteEditorEl) return fScenarioNoteEditorEl;
  var d = document.createElement("dialog");
  d.id = "scNoteEditor";
  d.className = "scNoteEditor";
  d.setAttribute("aria-labelledby", "scNoteEditorTitle");
  d.setAttribute("aria-modal", "true");
  var head = document.createElement("div");
  head.className = "scNoteEditorHead";
  var title = document.createElement("h2");
  title.id = "scNoteEditorTitle";
  title.className = "scNoteEditorTitle";
  var close = document.createElement("button");
  close.type = "button";
  close.className = "scNoteEditorClose";
  close.setAttribute("data-tooltip", "Έξοδος από τον μεγάλο επεξεργαστή");
  close.setAttribute("aria-label", "Έξοδος από τον μεγάλο επεξεργαστή");
  if (window.MuLERIcons && window.MuLERIcons.fullScreenExit) close.innerHTML = window.MuLERIcons.fullScreenExit;
  else close.textContent = "✕";
  close.onclick = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteEditorRequestClose(false);
  };
  head.appendChild(title);
  head.appendChild(close);
  var tools = document.createElement("div");
  tools.className = "scNoteEditorToolbar";
  var body = document.createElement("div");
  body.className = "scNoteEditorBody";
  var preview = document.createElement("div");
  preview.className = "scNoteEditorPreview";
  preview.setAttribute("role", "textbox");
  preview.setAttribute("aria-multiline", "true");
  preview.setAttribute("aria-label", "Πλούσιο κείμενο");
  preview.setAttribute("data-placeholder", "Γράψτε το κείμενο του βήματος…");
  var source = document.createElement("textarea");
  source.className = "scNoteEditorSource";
  source.placeholder = "HTML πηγής";
  source.spellcheck = false;
  body.appendChild(preview);
  body.appendChild(source);
  var footer = document.createElement("div");
  footer.className = "scNoteEditorFooter";
  var cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "scNoteEditorBtn";
  cancel.textContent = "Άκυρο";
  cancel.onclick = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteEditorRequestClose(false);
  };
  var apply = document.createElement("button");
  apply.type = "button";
  apply.className = "scNoteEditorBtn scNoteEditorApply";
  apply.textContent = "Εφαρμογή";
  apply.onclick = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteEditorApply();
  };
  footer.appendChild(cancel);
  footer.appendChild(apply);
  d.appendChild(head);
  d.appendChild(tools);
  d.appendChild(body);
  d.appendChild(footer);
  d.addEventListener("cancel", function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteEditorRequestClose(false);
  });
  d.addEventListener("close", function () {
    fScenarioNoteEditorRestoreFocus();
  });
  ["keyup", "mouseup", "focus", "blur"].forEach(function (name) {
    preview.addEventListener(name, function () {
      if (fScenarioNoteEditorState) fScenarioRichSaveSelection(fScenarioNoteEditorState);
    });
  });
  document.body.appendChild(d);
  fScenarioNoteEditorEl = d;
  return d;
}
function fScenarioOpenNoteEditor(st, inlineEditor, paintFormat, expandBtn) {
  if (!st || !inlineEditor) return;
  var d = fScenarioNoteEditorBuild();
  var preview = d.querySelector(".scNoteEditorPreview");
  var source = d.querySelector(".scNoteEditorSource");
  var tools = d.querySelector(".scNoteEditorToolbar");
  var title = d.querySelector(".scNoteEditorTitle");
  if (title) title.textContent = "Κείμενο βήματος " + (st.n || "") + (st.title ? " — " + st.title : "");
  tools.innerHTML = "";
  var snapshot = {
    note: String(st.note || ""),
    noteFormat: st.noteFormat === "html" ? "html" : "text"
  };
  var state = {
    st: st,
    inlineEditor: inlineEditor,
    paintFormat: paintFormat,
    expandBtn: expandBtn || null,
    draft: { note: snapshot.note, noteFormat: snapshot.noteFormat },
    snapshot: snapshot,
    dirty: false,
    sourceEdited: false,
    richView: "wysiwyg",
    surfaces: { preview: preview, source: source },
    suppress: false,
    richRange: null,
    ctx: null,
    contentBar: null,
    sourceBtn: null
  };
  fScenarioNoteEditorState = state;
  var sourceBtn = document.createElement("button");
  sourceBtn.type = "button";
  sourceBtn.className = "scNoteBtn scNoteSourceBtn";
  sourceBtn.innerHTML = (window.MuLERIcons && window.MuLERIcons.code) || "HTML";
  sourceBtn.onclick = function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fScenarioNoteEditorSetRichView(state, state.richView === "source" ? "wysiwyg" : "source");
  };
  tools.appendChild(sourceBtn);
  var contentBar = document.createElement("div");
  contentBar.className = "scNoteToolbar";
  tools.appendChild(contentBar);
  state.sourceBtn = sourceBtn;
  state.ctx = fScenarioNoteContextFromModal(state, {
    onChange: function () { fScenarioNoteEditorPaint(state); }
  });
  state.contentBar = fScenarioNoteContentBar(state.ctx, {
    bar: contentBar,
    showFormat: false,
    preserveFocus: true
  });
  source.value = state.draft.noteFormat === "html"
    ? state.draft.note
    : fScenarioNoteTextToHtml(state.draft.note);
  source.oninput = function () {
    if (state.suppress) return;
    state.sourceEdited = true;
    state.draft.note = source.value;
    state.draft.noteFormat = "html";
    state.dirty = true;
    fScenarioCheckNoteTags(source);
    fScenarioNoteEditorPaint(state);
  };
  preview.oninput = function () {
    if (state.suppress) return;
    fScenarioNoteEditorSyncActive(state, true);
    fScenarioNoteEditorPaint(state);
  };
  preview.addEventListener("paste", function (ev) {
    if (state.suppress) return;
    fScenarioRichPaste(state, ev);
    fScenarioNoteEditorPaint(state);
  });
  if (!fScenarioNoteEditorRenderPreview(state)) {
    state.richView = "source";
    source.value = state.draft.noteFormat === "html"
      ? state.draft.note
      : fScenarioNoteTextToHtml(state.draft.note);
    fScenarioToast("Η πλούσια προεπισκόπηση δεν είναι διαθέσιμη· χρησιμοποιήστε την προβολή HTML.");
  }
  fScenarioNoteEditorPaint(state);
  if (typeof d.showModal === "function") {
    try { d.showModal(); } catch (e) { d.setAttribute("open", ""); }
  } else {
    d.setAttribute("open", "");
  }
  if (state.richView === "source") {
    try { source.focus(); } catch (e3) { /* focus best-effort */ }
  } else {
    fScenarioRichFocusEnd(state);
  }
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
  if (MuLERMoCScenario.present && step && step.n && showTextOn(step)) {
    if (step.title) {
      h1.textContent = "";
      var numSpan = document.createElement("span");
      numSpan.className = "scStepNumberTitle";
      numSpan.textContent = step.n + ".";
      // h1.appendChild(numSpan);
      h1.appendChild(document.createTextNode(" " + step.title));
    } else {
      h1.textContent = appTitle;
    }
    if (showNoteOn(step)) {
      fScenarioRenderNote(p, step.note, step.noteFormat);
    } else {
      p.textContent = "";
      try { p.classList.remove("note-html"); p.classList.remove("mu-note"); } catch (eNoNote) { /* no classList */ }
    }
    fScenarioApplyStepFontSize(step);
  } else {
    h1.textContent = appTitle;
    p.textContent = "";
    try { p.classList.remove("note-html"); p.classList.remove("mu-note"); } catch (eCls) { /* no classList */ }
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
    var _visBoxCount = 0;
    try {
      _visBoxCount = document.querySelectorAll(
        ".nameCompContainer .nameCompBox:not(.comp-hidden)",
      ).length;
    } catch (e) {
      /* DOM unavailable */
    }
    fScenarioHide(
      "nameAnalysisExplain",
      (locked && !_lockHasHl) || _visBoxCount === 0,
    );
    // Menu-only steps show the hint only after a free-browse selection has
    // actually rendered name boxes (no molecule means no clickable target).
    try {
      if (present && (!_st || !_st.selectedMol)) {
        if (locked) {
          fScenarioHide("nameAnalysisExplain", true);
        } else if (show && show.naming !== false && _visBoxCount > 0) {
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
  // control bars + save buttons (bars go through the class-aware helper:
  // a stale `hide` class from a no-viewer exit would otherwise survive the
  // inline-display restore and keep a checked bar invisible in presentation)
  var c2 = show.controls && show.controls["2D"] === true && show2D;
  var c3 = show.controls && show.controls["3D"] === true && show3D;
  fScenarioShowBar("radio2DMode", !(present && !c2));
  fScenarioShowBar("controls3D", !(present && !c3));
  // Save-image buttons ride their control bar: the per-step "2D/3D ρυθμίσεις"
  // checkbox (`show.controls`) is the only authoring UI, so a checked bar must
  // also surface its save button. Legacy `show.save` stays an independent OR
  // trigger. Class-aware like the bars above (a stale `hide` class from a
  // no-viewer exit would otherwise defeat the inline-display restore).
  var save2On = !!c2 || (show.save && show.save["2D"] === true && show2D);
  var save3On = !!c3 || (show.save && show.save["3D"] === true && show3D);
  fScenarioShowBar("save2DBtn", !(present && !save2On));
  fScenarioShowBar("save3DBtn", !(present && !save3On));
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
  // The step apply fits the viewers earlier (fScenarioApplyViewerMaxHeight),
  // before this step's text card is written — so re-fit now that the card's
  // height (or its absence) is known, letting a two-viewer present step
  // reserve room for the note. offsetHeight read forces the fresh layout.
  if (present) {
    try { if (typeof fResizeViewers === "function") fResizeViewers(); } catch (eRT) { /* resize best-effort */ }
  }
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
    fScenarioNoteEditorClose();
    MuLERMoCScenario.menuPickMode = false;
    if (fScenarioTextPosMenu) fScenarioTextPosMenu.close(false);
    // Drawer .open/.active and its scroll are deliberately kept: the drawer
    // is hidden by CSS while the bar is away, so reopening returns to the
    // same open scenario (and Play -> Exit lands on the presented step).
    var teardown = function () {
      fScenarioPaintPickUi();
    };
    // Pinned close: slide the still-DOCKED bar out first (pinned CSS has
    // transition:none, so there is no CSS race), then unpin + hide + teardown
    // from the onDone callback while the bar is held off-screen. Keeping
    // `.open` set for the whole slide (removing it only in onDone) is what
    // avoids the old remove-then-re-add toggle that flashed close→open→close.
    if (MuLERMoCScenario.pinned) {
      if (fScenarioSlideBar(-1, function () {
        fScenarioSetPinned(false);
        fScenarioSyncAuthorUi();
        teardown();
      })) return;
      // no WAAPI / reduced motion: fall back to the original unpin-then-CSS.
      fScenarioSetPinned(false);
    }
    // Unpinned (or fallback): close the bar alone in this frame so its slide
    // animates cleanly; teardown after it lands.
    fScenarioSyncAuthorUi();
    setTimeout(teardown, 260);
    return;
  }
  fScenarioSyncAuthorUi();
  fScenarioPaintPickUi();
  fScenarioApplyPinPref();
}

// ── authoring pin-dock (v48) ────────────────────────────────────────────
// Pinned: the bar leaves its fixed overlay and docks at the right edge of
// #pageContainer, spanning its full height (title zone through footer), so
// name settings stay reachable while authoring and only the container
// scrolls. Unpinned: back to a body-level fixed overlay.
// Live-only flag, never captured in step JSON. Reparenting is safe: every
// bar handler is document-delegated and all state lives in
// MuLERMoCScenario/ids. The viewer is frozen at measured pixels while
// docked so the row cannot squeeze the applets.
// ORDER MATTERS: measure first — toggling scPinned restyles the layout, and
// any read after that locks post-dock (stretched) pixels.
function fScenarioSetPinned(on) {
  var bar = document.getElementById("scenarioAuthorBar");
  var pin = document.getElementById("scPin");
  var vc = document.getElementById("viewerCol");
  var row = document.querySelector("#mainAppContainer > .mainApp3Columns");
  var host = document.getElementById("pageContainer");
  if (on) {
    if (!row || !host || !bar) {
      MuLERMoCScenario.pinned = false;
      try { document.body.classList.remove("scPinned"); } catch (eB2) { /* no body */ }
      if (pin) pin.classList.remove("active");
      if (vc) vc.style.flex = "";
      fScenarioToast("Pin unavailable here.");
      return;
    }
    // Measure while the unpinned layout is still intact.
    var w = 0;
    try { w = vc ? vc.getBoundingClientRect().width : 0; } catch (eM) { w = 0; }
    MuLERMoCScenario.pinned = true;
    if (pin) pin.classList.add("active");
    try { document.body.classList.add("scPinned"); } catch (eB) { /* no body */ }
    if (vc && w > 0) vc.style.flex = "0 0 " + Math.round(w) + "px";
    host.appendChild(bar);
    // Scroll cues + keyboard target for the new scroller state; re-check
    // after layout settles (flex + applet resizes land async).
    try { fScenarioSyncScroller(); } catch (eSync) { /* cues best-effort */ }
    try { setTimeout(function () { fScenarioSyncScroller(); }, 300); } catch (eSyncD) { /* cues best-effort */ }
  } else {
    MuLERMoCScenario.pinned = false;
    if (pin) pin.classList.remove("active");
    try { document.body.classList.remove("scPinned"); } catch (eB3) { /* no body */ }
    if (vc) vc.style.flex = "";
    if (bar && bar.parentNode !== document.body) document.body.appendChild(bar);
    try {
      var _sc = document.getElementById("mainAppContainer");
      if (_sc) { _sc.classList.remove("scCanScroll"); _sc.removeAttribute("tabindex"); }
    } catch (eSync2) { /* cues best-effort */ }
  }
}

// Re-apply the author's remembered pin when the bar returns (authoring only;
// never in presentation). Session-scoped preference (MuLERMoCScenario.pinPref),
// set by the pin button; internal forced unpins (✕/ESC, Present entry) leave it
// untouched so close → reopen and Present → Exit restore the docked bar. Safe
// to call unconditionally: no-ops outside authoring, when unpinned, or when the
// remembered choice is off.
function fScenarioApplyPinPref() {
  if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
  if (!MuLERMoCScenario.pinPref || MuLERMoCScenario.pinned) return;
  if (!document.getElementById("scenarioAuthorBar")) return;
  fScenarioSetPinned(true);
  // Dock reparents the bar and .open lands in the same task, so the CSS
  // transition never sees a clean closed→open pair (reparenting suppresses
  // it) — WAAPI drives the visible motion instead. Only bar-return paths call
  // this helper; the direct pin-button dock stays instant (no animation).
  fScenarioSlideBar(1);
}

function fScenarioReduceMotion() {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  catch (e) { return false; }
}

// Pinned bar slide (dir: 1 = in, -1 = out). WAAPI is imperative, so the
// reparent/same-task .open timing that defeats the CSS transition can't
// suppress it. `.open` stays the state authority (visibility + final
// transform); unsupported/no-WAAPI or reduced-motion just snaps via CSS.
// Returns true when the animation was started (callers fall back on false).
// onDone (out only) runs while the fill still holds the off-screen end pose —
// the caller flips pin/hidden state there so nothing re-appears mid-close.
function fScenarioSlideBar(dir, onDone) {
  var bar = document.getElementById("scenarioAuthorBar");
  if (!bar) return false;
  if (!window.Animation || !bar.animate || fScenarioReduceMotion()) return false;
  var kf = dir < 0
    ? [{ transform: "none" }, { transform: "translateX(100%)" }]
    : [{ transform: "translateX(100%)" }, { transform: "none" }];
  try {
    // Disable the CSS transition FIRST (before any style flush) so toggling
    // .open can never arm a parallel CSS transition alongside the WAAPI slide.
    bar.style.transition = "none";
    // Drop any in-flight slide (rapid reopen during a close) so a stale
    // fill:forwards animation + its onfinish can't fight the new state.
    try { bar.getAnimations().forEach(function (an) { an.cancel(); }); } catch (eAn) { /* older engines */ }
    bar.classList.add("open");
    // Out: hold the end pose (fill) so onDone's state flip (unpin + remove
    // .open) happens off-screen with no flash; then cancel so the base closed
    // CSS (translateX(100%) + hidden) takes over cleanly.
    var a = bar.animate(kf, { duration: 250, easing: "ease", fill: dir < 0 ? "forwards" : "none" });
    a.onfinish = function () {
      try { if (dir < 0 && typeof onDone === "function") onDone(); } catch (eDone) { /* teardown best-effort */ }
      try { a.cancel(); } catch (eCancel) { /* already gone */ }
      bar.style.transition = "";
    };
    return true;
  } catch (e) { bar.style.transition = ""; return false; /* leave to CSS */ }
}

// ── pinned scroll cues (v48) ────────────────────────────────────────────
// Edge buttons + fade show only while pinned AND the container overflows;
// per-side buttons disable at the scroll ends. Called from pin toggles,
// container scroll (passive), and layout settles.
function fScenarioSyncScroller() {
  var sc = document.getElementById("mainAppContainer");
  if (!sc) return;
  var on = !!(MuLERMoCScenario.pinned && sc.scrollWidth > sc.clientWidth + 1);
  sc.classList.toggle("scCanScroll", on);
  if (on) sc.setAttribute("tabindex", "0"); else sc.removeAttribute("tabindex");
  var max = Math.max(sc.scrollWidth - sc.clientWidth, 0);
  var atL = sc.scrollLeft <= 1;
  var atR = sc.scrollLeft >= max - 1;
  var bl = document.getElementById("scScrollLeft");
  var br = document.getElementById("scScrollRight");
  if (bl) bl.disabled = atL;
  if (br) br.disabled = atR;
}

function fScenarioScrollStep(dir) {
  var sc = document.getElementById("mainAppContainer");
  if (!sc) return;
  var reduce = false;
  try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (eM) { /* motion unknown */ }
  var step = Math.max(Math.round(sc.clientWidth * 0.8), 50);
  try {
    sc.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  } catch (eS) {
    sc.scrollLeft += dir * step; // ancient fallback
  }
}

// Drawers live in-flow inside their own panel (down/up via .open), so no
// fixed-top anchoring is needed. Kept as a no-op for older call sites.
function fScenarioPositionDrawer(panel) {
  return;
}

// Author bar follows authoring && !present; the tab hides in presentation
// (clean stage) and shows otherwise. Open drawers (with their Steps .active
// state and scroll) intentionally survive both: the hidden-bar rule in
// css/mulermoc-nom-scenario-52.css hides them while the bar is away, so
// Play -> Exit and close -> reopen return to the same open scenario.
// Steps owns open/close.
function fScenarioSyncAuthorUi() {
  var showBar = MuLERMoCScenario.authoring && !MuLERMoCScenario.present;
  var tb = document.getElementById("scenarioAuthorBar");
  if (tb) {
    // Classes are the sole visibility authority (inline display would
    // beat them and snap instead of animating).
    tb.style.display = "";
    tb.classList.toggle("open", showBar);
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

// Suggested download name: title → filesystem-safe stem + .scenario.json.
// Sanitizes the characters Windows/macOS reject so the Save window and the
// download fallback both start from a valid name.
function fScenarioSuggestFilename(title) {
  var stem = String(title == null ? "" : title)
    .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
  if (!stem) stem = "scenario";
  return stem + ".scenario.json";
}

// Original delivery path: <a download> blob click. Used everywhere the Save
// picker is unavailable (Firefox, Safari, file://, insecure origins) and as
// the fallback when the picker throws. Unchanged behavior for offline/Import.
function fScenarioSaveBlobDownload(filename, blob) {
  try {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
    return true;
  } catch (e) {
    return false;
  }
}

// Save delivery (v52): on Chromium over http(s) the File System Access API
// opens the real Save window (folder + editable name). Cancelling it is a
// silent no-op; any other failure falls back to the download path so Export
// never loses the file. Same JSON bytes either way — no schema change.
function fScenarioSaveBlob(filename, blob) {
  var usePicker = false;
  try {
    // The API itself only exists in secure contexts; `isSecureContext !== false`
    // keeps jsdom/older engines (property undefined) on the picker path while
    // honouring an explicit insecure report (file://).
    usePicker = typeof window.showSaveFilePicker === "function" && window.isSecureContext !== false;
  } catch (e) {
    usePicker = false;
  }
  if (!usePicker) return Promise.resolve(fScenarioSaveBlobDownload(filename, blob));
  return window.showSaveFilePicker({
    suggestedName: filename,
    types: [{ description: "Scenario JSON", accept: { "application/json": [".json"] } }],
  }).then(function (handle) {
    return handle.createWritable().then(function (writable) {
      return writable.write(blob).then(function () {
        return writable.close();
      });
    });
  }).then(function () {
    return true;
  }).catch(function (err) {
    // AbortError: the author dismissed the Save window on purpose.
    if (err && err.name === "AbortError") return false;
    return fScenarioSaveBlobDownload(filename, blob);
  });
}

function fScenarioExport(id) {
  var scen = (id && fScenarioGet(id)) || fScenarioActive();
  if (!scen) return;
  var data = {
    scenarioVersion: MuLERMoCScenario.SUPPORTED_VERSION,
    app: "mulermoc-nom-44",
    scenario: scen.title,
    title: scen.title,
    author: fScenarioValidAuthor(scen.author),
    created: scen.created || fScenarioNowIso(),
    steps: scen.steps,
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  return fScenarioSaveBlob(fScenarioSuggestFilename(scen.title), blob);
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
      scen.author = res.author || "Unknown";
      scen.created = res.created || scen.created;
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
    // Exit aligns with the exit step: keep its stored viewers (a no-3D exit
    // step returns to a no-3D authoring view). Missing/legacy → both visible.
    var _vw = (st.show && st.show.viewers) || null;
    s.show.viewers = {
      "2D": !_vw || _vw["2D"] !== false,
      "3D": !_vw || _vw["3D"] !== false,
    };
    fScenarioApply(s);
    // exit restores settings chrome (all settings buttons available) while
    // viewer panes + bars + view buttons follow the exit step ...
    fScenarioRestoreChrome(s.show.viewers);
    // One-shot 3D reload: a no-3D exit zaps the applet (via fScenarioChrome),
    // so the next 3D re-display must reload the exit molecule once. Toggles
    // otherwise stay refresh-only (see fToggleViewer3D).
    try {
      MuLERMoCScenario.reload3DOnce =
        (s.show.viewers["3D"] === false && !!s.selectedMol &&
          !!((typeof nameExamples !== "undefined" && nameExamples[s.selectedMol])));
    } catch (eFlag) {
      /* flag best-effort */
    }
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
  // Present → Exit restores the author's remembered pin (session-scoped);
  // guarded by authoring, so a deep-link present exits with no bar/pin.
  fScenarioApplyPinPref();
  // Back in authoring: if this card's drawer was open before Play, bring the
  // step that was on stage back into view (the drawer opens where it was).
  if (MuLERMoCScenario.authoring) {
    fScenarioScrollDrawerToStep(_psx.id, _psx.index);
  }
}

// Scroll only the card's open drawer to a step row (never the page/bar).
// Exit runs before the pin-dock reparent/width reflow settles, so repeat the
// measurement on the next frame and once more shortly after.
function fScenarioScrollDrawerToStep(scenId, stepIdx) {
  var panel = scenId && fScenarioPanelFor(scenId);
  var d = panel && panel.querySelector(".scenarioDrawer.open");
  if (!d) return;
  var run = function () {
    var row = d.querySelector('.srow[data-idx="' + stepIdx + '"]');
    if (!row) return;
    var dr, rr;
    try {
      dr = d.getBoundingClientRect();
      rr = row.getBoundingClientRect();
    } catch (e) {
      return;
    }
    var pad = 6;
    if (rr.top < dr.top + pad || rr.bottom > dr.bottom - pad) {
      d.scrollTop += rr.top - dr.top - pad;
    }
  };
  if (window.requestAnimationFrame) window.requestAnimationFrame(run);
  else run();
  setTimeout(run, 120);
}

// Start presentation at a step (top-level: the card Play and the per-step
// Present buttons both call it). startIdx is 0-based; omitted -> step 1.
function fScenarioPresentBegin(id, startIdx) {
  var scen = (id && fScenarioGet(id)) || fScenarioActive();
  if (!scen || !scen.steps.length) {
    fScenarioToast("Save at least one step first.");
    return;
  }
  var start = (typeof startIdx === "number" && isFinite(startIdx))
    ? Math.floor(startIdx)
    : 0;
  start = Math.max(0, Math.min(start, scen.steps.length - 1));
  try {
    history.replaceState(null, "", "#step=" + (start + 1));
  } catch (e) {
    /* file:// */
  }
  fScenarioSetActive(scen.id);
  // in-place present (no reload: memory + file keeps steps in this page)
  // Pin-dock is authoring-only: undock first so presentation owns the stage.
  if (MuLERMoCScenario.pinned) fScenarioSetPinned(false);
  fScenarioStashAuthorSettings();
  MuLERMoCScenario.present = true;
  MuLERMoCScenario.presentId = scen.id;
  scen.index = start;
  fScenarioSyncLegacy();
  var applied = false;
  try {
    applied = !!fScenarioApply(scen.steps[start]);
  } catch (e) {
    applied = false;
  }
  if (!applied) {
    MuLERMoCScenario.present = false;
    MuLERMoCScenario.presentId = null;
    fScenarioSyncPresentClass();
    // Undo the stash: a retry would otherwise re-stash the partially applied
    // step state and leak it as the author's settings on the next Exit.
    fScenarioRestoreAuthorSettings();
    try {
      history.replaceState(null, "", location.pathname);
    } catch (eHash) {
      /* file:// */
    }
    fScenarioToast("Could not start presentation at step " + (start + 1) + ".");
    return;
  }
  fScenarioPlayUi();
  fScenarioRenderPresentMenu();
}

// ── UI (scenario chrome lives in css/mulermoc-nom-scenario-52.css) ─────────
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
    var textHost = document.getElementById("authorLayout");
    var textAnchor = document.getElementById("mainAppContainer");
    if (textHost) {
      if (textAnchor && textAnchor.parentNode === textHost) textHost.insertBefore(textDiv, textAnchor);
      else textHost.appendChild(textDiv);
    } else {
      var h1 = document.getElementById("pageTitle");
      if (h1 && h1.parentNode) h1.parentNode.insertBefore(textDiv, h1.nextSibling);
      else document.body.appendChild(textDiv);
    }
  }
  try { fInitStepTextSideObserver(); } catch (eTxtRO) { /* observer best-effort */ }
  try { fInitStepTextSideResize(); } catch (eTxtRz) { /* resize best-effort */ }
  // Per-scenario panel actions (resolved via closest .scenarioPanel).
  function fScenarioPanelIdFromEl(el) {
    try {
      var p = el && el.closest ? el.closest(".scenarioPanel") : null;
      return p ? p.getAttribute("data-scenario-id") : null;
    } catch (e) {
      return null;
    }
  }
  // Drawer follows the card: open this panel's drawer (accordion —
  // all others shut), mark its Steps button. Safe if the panel is gone.
  // Toggle helper below closes an open drawer (+ drops Steps .active),
  // otherwise delegates to this open-only path (accordion + empty guard).
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
  // Toggle helper: open drawer closes it (+ drops Steps .active),
  // otherwise delegates to the open-only path above.
  function fScenarioToggleDrawer(id) {
    var panel = id && fScenarioPanelFor(id);
    var d = panel && panel.querySelector(".scenarioDrawer");
    if (d && d.classList.contains("open")) {
      d.classList.remove("open");
      var lb = panel.querySelector(".scList");
      if (lb && lb.classList) lb.classList.remove("active");
    } else {
      fScenarioOpenDrawer(id);
    }
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
      // New step visible: pin the drawer scroller to the last row.
      // Two passes — rAF for the fresh layout + delayed pass once the
      // .25s .open transition has released max-height (else scroll clamps).
      try {
        var _panel = act && fScenarioPanelFor(act.id);
        var _drawer = _panel && _panel.querySelector(".scenarioDrawer");
        var _box = _panel && _panel.querySelector(".scSteps");
        var _rows = _box && _box.querySelectorAll(".srow");
        if (_drawer && _rows && _rows.length) {
          var _scrollLast = function () {
            try { _drawer.scrollTop = _drawer.scrollHeight; } catch (e) { /* best-effort */ }
          };
          if (window.requestAnimationFrame) window.requestAnimationFrame(_scrollLast);
          else _scrollLast();
          setTimeout(_scrollLast, 280);
        }
      } catch (e) { /* scroll best-effort */ }
      var _note = MuLERMoCScenario.lastCaptureNote;
      MuLERMoCScenario.lastCaptureNote = null;
      fScenarioToast(!st.selectedMol ? "Saved menu-only step " + st.n + " (no molecule selected)." : "Saved step " + st.n + "." + (_note ? " " + _note : ""));
    });
    $(document).on("click", ".scenarioPanel .scList", function (e) {
      var id = fScenarioPanelIdFromEl(this);
      if (id) fScenarioSetActive(id);
      fScenarioToggleDrawer(id);
      if (e && e.stopPropagation) e.stopPropagation();
    });
    // Button-bar gaps toggle the drawer; action buttons keep their own
    // clicks (Add opens-only, Export/Play inert — see their handlers).
    // The closest() guard avoids double-toggling Steps clicks bubbling up.
    $(document).on("click", ".scenarioPanel .scenarioButtonPanel", function (e) {
      if (e && e.target && e.target.closest &&
        e.target.closest("button,input,textarea,select,label,a")) return;
      var id = fScenarioPanelIdFromEl(this);
      if (id) fScenarioSetActive(id);
      fScenarioToggleDrawer(id);
      if (e && e.stopPropagation) e.stopPropagation();
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
      if (!id) return;
      var sc = fScenarioGet(id);
      var title = (sc && sc.title) ? sc.title : "χωρίς τίτλο";
      fScenarioConfirm("Διαγραφή σεναρίου «" + title + "»; Τα βήματά του θα χαθούν.", function () {
        fScenarioDelete(id);
      });
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
    // Author is optional: blank → "Unknown" (stored, so Export never emits
    // an empty author). `input` keeps an in-focus field in sync with the
    // card while typing; `change` normalizes the visible value on blur.
    $(document).on("change input", ".scenarioPanel .scenarioAuthor", function (e) {
      var id = fScenarioPanelIdFromEl(this);
      var s = (id && fScenarioGet(id)) || fScenarioActive();
      if (!s) return;
      s.author = fScenarioValidAuthor(this.value);
      if (e && e.type === "change" && this.value !== s.author) this.value = s.author;
      fScenarioSyncLegacy();
    });
  }
  if (!document.getElementById("scenarioAuthorBar")) {
    var bar = document.createElement("div");
    bar.id = "scenarioAuthorBar";
    // Closed by default via CSS (no .open); the tab reveals it.
    // Inline display is never used here: it would beat the animation classes.
    bar.style.display = "";
    bar.innerHTML =
      "<div id='scenarioPlayBarTitle'><span class='scTitleBtns'><button id='scNew' data-tooltip='Νέο κενό σενάριο'>+ New</button>" +
      "<button id='scImport' data-tooltip='Φόρτωση σεναρίου (JSON)'>Import</button>" +
      "<input type='file' id='scFile' accept='.json,application/json' style='display:none'></span>" +
      "<span class='scTitleText'>Σενάρια Παρουσίασης</span><button id='scPin' data-tooltip='Καρφίτσωμα δίπλα στο περιεχόμενο'>📌</button><button id='scCloseBar' data-tooltip='Κλείσιμο (ESC)'>✕</button></div>" +
      "<div id='scenarioPanels'></div>";
    document.body.appendChild(bar);
    fScenarioPaintIconTextBtn(document.getElementById("scNew"), "libraryNew", "+ New");
    fScenarioPaintIconTextBtn(document.getElementById("scImport"), "upload", "Import");
    // Pin button: registry SVG replaces the emoji fallback (kept in the
    // markup for no-registry resilience); tooltip + onclick below untouched.
    var _pinBtn = document.getElementById("scPin");
    if (_pinBtn && window.MuLERIcons && window.MuLERIcons.pin) _pinBtn.innerHTML = window.MuLERIcons.pin;
    // Close-bar button: registry SVG replaces the text fallback (kept in the
    // markup for no-registry resilience); tooltip + onclick below untouched.
    var _closeBtn = document.getElementById("scCloseBar");
    if (_closeBtn && window.MuLERIcons && window.MuLERIcons.closePanel) _closeBtn.innerHTML = window.MuLERIcons.closePanel;
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
    document.getElementById("scPin").onclick = function () {
      var next = !MuLERMoCScenario.pinned;
      MuLERMoCScenario.pinPref = next;
      fScenarioSetPinned(next);
    };
    // Pinned scroll cues: registry chevrons replace the text fallbacks
    // (kept in markup for no-registry resilience); passive scroll listener
    // keeps the end-states truthful.
    (function () {
      var bl = document.getElementById("scScrollLeft");
      var br = document.getElementById("scScrollRight");
      try {
        if (bl && window.MuLERIcons && window.MuLERIcons.chevronLeft) bl.innerHTML = window.MuLERIcons.chevronLeft;
        if (br && window.MuLERIcons && window.MuLERIcons.chevronRight) br.innerHTML = window.MuLERIcons.chevronRight;
      } catch (eI) { /* icon hydration best-effort */ }
      if (bl) bl.onclick = function () { fScenarioScrollStep(-1); };
      if (br) br.onclick = function () { fScenarioScrollStep(1); };
      var sc = document.getElementById("mainAppContainer");
      if (sc && sc.addEventListener) {
        sc.addEventListener("scroll", function () { fScenarioSyncScroller(); }, { passive: true });
      }
      // Re-evaluate when the container geometry settles (applet resizes,
      // drawer open/close, window drags): cheap measurement, direct call.
      try {
        if (sc && typeof ResizeObserver !== "undefined" && !sc._scRO) {
          sc._scRO = new ResizeObserver(function () { fScenarioSyncScroller(); });
          sc._scRO.observe(sc);
        }
      } catch (eRO) { /* observer unavailable */ }
    })();
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
      if (fScenarioNoteEditorIsOpen()) return;
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
    // Text-position dropdown (fixed menu, one open at a time): outside
    // presses and any scroll/resize dismiss it; ESC closes the menu first so
    // it never also shuts the author bar.
    document.addEventListener("mousedown", function (e) {
      var open = fScenarioTextPosMenu;
      if (!open) return;
      if (open.menu.contains(e.target) || open.btn.contains(e.target)) return;
      open.close(false);
    }, true);
    document.addEventListener("keydown", function (e) {
      var open = fScenarioTextPosMenu;
      if (!open || e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      open.close(true);
    }, true);
    document.addEventListener("focusin", function (e) {
      var open = fScenarioTextPosMenu;
      if (!open) return;
      if (open.menu.contains(e.target) || open.btn.contains(e.target)) return;
      open.close(false);
    }, true);
    window.addEventListener("scroll", function () {
      if (fScenarioTextPosMenu) fScenarioTextPosMenu.close(false);
    }, true);
    window.addEventListener("resize", function () {
      if (fScenarioTextPosMenu) fScenarioTextPosMenu.close(false);
    });
  }
  if (!document.getElementById("scenarioPlayBar")) {
    var pb = document.createElement("div");
    pb.id = "scenarioPlayBar";
    pb.style.display = "none";
    pb.innerHTML =
      "<span id='scScenarioId' aria-label='Σενάριο παρουσίασης'></span>" +
      "<div id='scenarioPlayBarNextPrevContainer'>" +
      "<button id='scPrev' data-tooltip='Προηγούμενο βήμα'>◀</button><span id='scPos'>1/1</span><button id='scNext' data-tooltip='Επόμενο βήμα'>▶</button>" +
      "</div>" +
      // "<b id='scStepTitle'></b><span class='snote' id='scStepNote'></span>" +
      "<button id='scExit' data-tooltip='Έξοδος (ESC)'>Exit ✕</button>";
    document.body.appendChild(pb);
    fScenarioPaintIconBtn(document.getElementById("scPrev"), "arrowLeft", "Προηγούμενο βήμα");
    fScenarioPaintIconBtn(document.getElementById("scNext"), "arrowRight", "Επόμενο βήμα");
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
// Icon helper: icon-only buttons keep data-tooltip + aria-label text.
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
      "<span class='scScenarioNo'>S1</span>" +
      "<input type='text' class='scenarioTitle' value='' title='Τίτλος σεναρίου'>" +
      "<span class='scCount'>0</span>" +
      "<button class='scDelete' data-tooltip='Διαγραφή σεναρίου'>✕</button>" +
      "</div>" +
      "<div class='scenarioMeta'>" +
      "<label class='scenarioAuthorLabel' for=''>Author:</label>" +
      "<input type='text' class='scenarioAuthor' value='' placeholder='Unknown' " +
      "data-tooltip='Συγγραφέας σεναρίου (προαιρετικό)' aria-label='Συγγραφέας σεναρίου'>" +
      "</div>" +
      "<div class='scenarioButtonPanel'>" +
      "<button class='scSave' data-tooltip='Αποθήκευση προβολής ως βήμα'>Add step</button>" +
      "<button class='scList' data-tooltip='Εμφάνιση/Απόκρυψη βημάτων'>Steps</button>" +
      "<button class='scExport' data-tooltip='Λήψη σεναρίου (JSON)'>Export</button>" +
      "<button class='scPresent' data-tooltip='Έναρξη παρουσίασης από το βήμα 1'>Play ▶</button>" +
      "</div>" +
      "<div class='scenarioDrawer'>" +
      "<div class='scSteps'></div>" +
      "</div>";
    var ti = panel.querySelector(".scenarioTitle");
    if (ti) ti.value = scen.title || "";
    var ai = panel.querySelector(".scenarioAuthor");
    if (ai) ai.value = scen.author || "";
    fScenarioPaintIconTextBtn(panel.querySelector(".scSave"), "addTask", "Add step");
    fScenarioPaintIconTextBtn(panel.querySelector(".scExport"), "downloadList", "Export");
    fScenarioPaintIconTextBtn(panel.querySelector(".scPresent"), "screen", "Play");
    fScenarioPaintIconBtn(panel.querySelector(".scDelete"), "deleteStep", "Διαγραφή σεναρίου");
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
        if (locked) nb.setAttribute("data-tooltip", "Συμπληρώστε πρώτα ένα κενό σενάριο (μέχρι " + cap + " κενά)");
        else nb.setAttribute("data-tooltip", "Νέο κενό σενάριο");
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
    _no.title = "Σενάριο " + (_pos + 1);
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
      listBtn.setAttribute("aria-label", "Βήματα (" + scen.steps.length + ")");
    } else {
      listBtn.innerHTML = "";
      listBtn.textContent = "Steps (" + scen.steps.length + ")";
    }
    if (listBtn.classList) listBtn.classList.toggle("is-empty", _empty);
    listBtn.disabled = _empty;
  }
  // Empty scenario (0 steps): gate every button except Add step + Delete.
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
  var ai = panel.querySelector(".scenarioAuthor");
  var _authorShown = scen.author || "";
  if (ai && document.activeElement !== ai && ai.value !== _authorShown) ai.value = _authorShown;
  box.innerHTML = "";
  scen.steps.forEach(function (st, i) {
    var row = document.createElement("div");
    row.className = "srow";
    row.setAttribute("data-idx", String(i));
    row.setAttribute("draggable", "false");
    // Dedicated drag grip (span, not button, so it is never a step action).
    var grip = document.createElement("span");
    grip.className = "scDragHandle";
    grip.textContent = "⠿";
    grip.setAttribute("data-tooltip", "Σύρετε για αναδιάταξη του βήματος " + st.n);
    grip.setAttribute("aria-label", "Σύρετε για αναδιάταξη του βήματος " + st.n);
    grip.setAttribute("tabindex", "0");
    row.innerHTML =
      "<span id='scStep" + i + "' class='scStepNumberWrap'>" +
      "<span class='stepNumber'>" + st.n + "</span></span><span class='scStepTitleWrap'><span class='scStepTitleLabel'>Τίτλος βήματος</span><input type='text' class='scStepTitle' placeholder='Τίτλος βήματος' value=''></span>" +
      "<button class='scGo' data-tooltip='Προεπισκόπηση'>Go</button>" +
      "<button class='scPresentStep' data-tooltip='Παρουσίαση από το βήμα " + st.n + "'>▶</button>" +
      "<button class='scUpdate' data-tooltip='Ενημέρωση βήματος από την τρέχουσα προβολή'>Update</button><button class='scDupe' data-tooltip='Διπλασιασμός βήματος'>⧉</button><button class='scUp' data-tooltip='Επάνω'>↑</button><button class='scDown' data-tooltip='Κάτω'>↓</button>" +
      "<button class='delete' data-tooltip='Διαγραφή'>✕</button>";
    // Grip first so it leads the row; mousedown on it arms HTML5 drag
    // (row stays non-draggable otherwise so inputs/textareas keep working).
    if (row.firstChild) row.insertBefore(grip, row.firstChild);
    else row.appendChild(grip);
    grip.addEventListener("mousedown", function () {
      row.setAttribute("draggable", "true");
    });
    grip.addEventListener("mouseup", function () {
      if (!row.classList.contains("dragging")) row.setAttribute("draggable", "false");
    });
    // Icon-only step actions (data-tooltip + aria-label keep the meaning).
    (function () {
      var ab = row.querySelectorAll("button");
      var defs = [
        ["skip", "Προεπισκόπηση"], ["screen", "Παρουσίαση από αυτό το βήμα"], ["reset", "Ενημέρωση βήματος από την τρέχουσα προβολή"], ["copy", "Διπλασιασμός βήματος"],
        ["arrowUp", "Επάνω"], ["arrowDown", "Κάτω"], ["deleteStep", "Διαγραφή"]
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
    molBadge.setAttribute("data-tooltip", st.selectedMol
      ? st.selectedMol + (_isMenu ? " + μενού (" + _subN + ")" : "")
      : "μόνο μενού (" + _subN + ")");
    molBadge.textContent = _isMenu ? "Μενού" : "Μόριο";
    var numWrap = row.querySelector(".scStepNumberWrap");
    if (numWrap) numWrap.appendChild(molBadge);
    else row.insertBefore(molBadge, row.firstChild.nextSibling);
    var titleInput = row.querySelector("input.scStepTitle");
    titleInput.value = st.title || "";
    titleInput.onchange = function () {
      st.title = titleInput.value;
    };
    var noteInput = document.createElement("div");
    noteInput.className = "snote snoteRich";
    noteInput.setAttribute("data-placeholder", "Γράψτε το κείμενο του βήματος…");
    noteInput.setAttribute("aria-label", "Κείμενο βήματος");
    var inlineState = {
      st: st,
      draft: {
        note: String(st.note || ""),
        noteFormat: st.noteFormat === "html" ? "html" : "text"
      },
      surfaces: { preview: noteInput },
      richView: "wysiwyg",
      suppress: false,
      richRange: null,
      dirty: false,
      inline: true
    };
    function renderInlineNote() {
      var note = st.noteFormat === "html" ? st.note : fScenarioNoteTextToHtml(st.note);
      inlineState.suppress = true;
      var ok = window.MuLERMoCNote && MuLERMoCNote.renderEditable
        ? MuLERMoCNote.renderEditable(noteInput, note)
        : false;
      inlineState.suppress = false;
      if (!ok) {
        noteInput.innerHTML = "";
        noteInput.textContent = String(st.note || "");
        noteInput.setAttribute("contenteditable", "true");
        noteInput.setAttribute("role", "textbox");
        noteInput.setAttribute("aria-multiline", "true");
        if (!noteInput.classList.contains("mu-note")) noteInput.classList.add("mu-note");
      }
      inlineState.draft = {
        note: String(st.note || ""),
        noteFormat: st.noteFormat === "html" ? "html" : "text"
      };
      inlineState.dirty = false;
      inlineState.richRange = null;
    }
    renderInlineNote();
    var inlineEditor = {
      el: noteInput,
      state: inlineState,
      refresh: renderInlineNote
    };
    function commitInline() {
      st.note = inlineState.draft.note;
      if (inlineState.draft.noteFormat === "html") st.noteFormat = "html";
    }
    noteInput.oninput = function () {
      if (inlineState.suppress) return;
      fScenarioNoteEditorSyncActive(inlineState, true);
      commitInline();
    };
    noteInput.addEventListener("paste", function (ev) {
      if (inlineState.suppress) return;
      fScenarioRichPaste(inlineState, ev);
      commitInline();
    });
    ["keyup", "mouseup", "focus", "blur"].forEach(function (name) {
      noteInput.addEventListener(name, function () {
        if (inlineState.suppress) return;
        fScenarioRichSaveSelection(inlineState);
      });
    });
    var noteBar = document.createElement("div");
    noteBar.className = "scNoteToolbar";
    var noteContent;
    var expandBtn = document.createElement("button");
    expandBtn.type = "button";
    expandBtn.className = "scNoteBtn scNoteExpandBtn";
    expandBtn.setAttribute("data-tooltip", "Μεγάλος επεξεργαστής — εικόνα, πίνακας, έτοιμο περιεχόμενο, κώδικας");
    expandBtn.setAttribute("aria-label", "Μεγάλος επεξεργαστής — εικόνα, πίνακας, έτοιμο περιεχόμενο, κώδικας");
    if (window.MuLERIcons && window.MuLERIcons.fullScreen) expandBtn.innerHTML = window.MuLERIcons.fullScreen;
    else expandBtn.textContent = "⤢";
    expandBtn.onclick = function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      fScenarioOpenNoteEditor(st, inlineEditor, noteContent.paint, expandBtn);
    };
    noteBar.appendChild(expandBtn);
    var noteCtx = fScenarioNoteContextFromInline(inlineState, st, {});
    noteContent = fScenarioNoteContentBar(noteCtx, {
      bar: noteBar,
      showFormat: false,
      showInsert: false,
      showComponent: false,
      preserveFocus: true
    });
    // Column toggle (1↔2, default 1): icon button after the content tools,
    // shows the current state + .active highlight when 2-column. Writes
    // st.styleText.columns live (1 collapses to null/default); Update preserves it.
    (function () {
      var tog = document.createElement("button");
      tog.type = "button";
      tog.className = "scNoteBtn scColsToggle";
      tog.setAttribute("data-tooltip", "Στήλες κειμένου: 1/2 (εναλλαγή)");
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
      noteBar.appendChild(tog);
    })();
    // Text position (v50): presentation-only top/left/right. Side positions
    // render as a sticky reading rail beside the app on wide screens; narrow
    // screens fall back to the top card in CSS. Width applies to top only and
    // a side rail always uses one column, but both stored values are preserved
    // for switching back. Trigger shows the current icon + caret; the fixed
    // menu is icon-only (data-tooltip + aria-label carry the names).
    (function () {
      var defs = [
        ["top", "panelTop", "Πάνω"],
        ["left", "panelLeft", "Αριστερά"],
        ["right", "panelRight", "Δεξιά"]
      ];
      var byKey = {};
      var opts = {};
      function posOf() {
        var p = fScenarioValidTextPosition(st.styleText ? st.styleText.position : null);
        return p || "top";
      }
      function iconOf(def) {
        return (window.MuLERIcons && window.MuLERIcons[def[1]]) || null;
      }
      var wrap = document.createElement("span");
      wrap.className = "scTextPosDD";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "scNoteBtn scTextPosBtn";
      btn.setAttribute("aria-haspopup", "menu");
      btn.setAttribute("aria-expanded", "false");
      var menu = document.createElement("div");
      menu.className = "scTextPosMenu";
      menu.setAttribute("role", "menu");
      menu.setAttribute("aria-label", "Θέση κειμένου");
      defs.forEach(function (def) {
        byKey[def[0]] = def;
        var opt = document.createElement("button");
        opt.type = "button";
        opt.className = "scTextPosOpt";
        opt.setAttribute("role", "menuitemradio");
        opt.setAttribute("data-tooltip", def[2]);
        opt.setAttribute("aria-label", def[2]);
        var ic = iconOf(def);
        if (ic) opt.innerHTML = ic;
        else opt.textContent = def[2];
        opt.onclick = function (ev) {
          if (ev && ev.preventDefault) ev.preventDefault();
          choose(def[0]);
        };
        opts[def[0]] = opt;
        menu.appendChild(opt);
      });
      function paintPos() {
        var key = posOf();
        var def = byKey[key] || defs[0];
        var ic = iconOf(def);
        btn.innerHTML = ic || def[2];
        var caret = document.createElement("span");
        caret.className = "scTextPosCaret";
        caret.setAttribute("aria-hidden", "true");
        btn.appendChild(caret);
        var label = "Θέση κειμένου: " + def[2];
        btn.setAttribute("data-tooltip", label);
        btn.setAttribute("aria-label", label);
        defs.forEach(function (d) {
          var on = d[0] === key;
          if (opts[d[0]].classList) opts[d[0]].classList.toggle("active", on);
          opts[d[0]].setAttribute("aria-checked", on ? "true" : "false");
        });
      }
      function closeMenu(restore) {
        if (fScenarioTextPosMenu && fScenarioTextPosMenu.menu === menu) fScenarioTextPosMenu = null;
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        if (restore && btn.focus) btn.focus();
      }
      function openMenu() {
        if (fScenarioTextPosMenu) fScenarioTextPosMenu.close(false);
        menu.style.visibility = "hidden";
        menu.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        var r = btn.getBoundingClientRect();
        var mw = menu.offsetWidth;
        var mh = menu.offsetHeight;
        var vw = window.innerWidth || document.documentElement.clientWidth;
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var left = r.left;
        if (left + mw > vw - 4) left = vw - mw - 4;
        if (left < 4) left = 4;
        var top = r.bottom + 4;
        if (top + mh > vh - 4) top = r.top - mh - 4;
        if (top < 4) top = 4;
        menu.style.left = Math.round(left) + "px";
        menu.style.top = Math.round(top) + "px";
        menu.style.visibility = "";
        // Force the visibility change to apply before focusing a menu item.
        menu.getBoundingClientRect();
        fScenarioTextPosMenu = { menu: menu, btn: btn, close: closeMenu };
        var focusCurrent = function () {
          if (!menu.classList.contains("open")) return;
          var cur = opts[posOf()];
          if (cur && cur.focus) cur.focus();
        };
        focusCurrent();
        // The click that opened the menu can restore focus to the trigger
        // after this handler; re-assert on the next frame.
        if (window.requestAnimationFrame) window.requestAnimationFrame(focusCurrent);
        else setTimeout(focusCurrent, 0);
      }
      function choose(key) {
        st.styleText = st.styleText || {};
        st.styleText.position = key === "top" ? null : key;
        paintPos();
        closeMenu(true);
      }
      btn.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        if (menu.classList.contains("open")) closeMenu(true);
        else openMenu();
      };
      // Arrow keys open the menu and enter it even if a mouse click leaves
      // focus on the trigger (browser focus restoration after click).
      btn.addEventListener("keydown", function (ev) {
        if (ev.key !== "ArrowDown" && ev.key !== "ArrowUp") return;
        ev.preventDefault();
        if (!menu.classList.contains("open")) {
          openMenu();
          return;
        }
        var order = [defs[0][0], defs[1][0], defs[2][0]];
        var idx = -1;
        for (var i = 0; i < order.length; i++) {
          if (opts[order[i]] === document.activeElement) { idx = i; break; }
        }
        if (idx < 0) {
          var cur = opts[posOf()];
          if (cur && cur.focus) cur.focus();
          return;
        }
        idx = ev.key === "ArrowDown" ? (idx + 1) % order.length : (idx - 1 + order.length) % order.length;
        var next = opts[order[idx]];
        if (next && next.focus) next.focus();
      });
      menu.addEventListener("keydown", function (ev) {
        var key = ev.key;
        if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Home" && key !== "End") return;
        ev.preventDefault();
        var order = [defs[0][0], defs[1][0], defs[2][0]];
        var idx = 0;
        for (var i = 0; i < defs.length; i++) {
          if (opts[defs[i][0]] === document.activeElement) { idx = i; break; }
        }
        if (key === "ArrowDown") idx = (idx + 1) % order.length;
        else if (key === "ArrowUp") idx = (idx - 1 + order.length) % order.length;
        else if (key === "Home") idx = 0;
        else if (key === "End") idx = order.length - 1;
        var next = opts[order[idx]];
        if (next && next.focus) next.focus();
      });
      wrap.appendChild(btn);
      wrap.appendChild(menu);
      noteBar.appendChild(wrap);
      paintPos();
    })();
    row.appendChild(noteBar);
    row.appendChild(noteInput);
    // No Text checkbox: heading + text show automatically iff the step
    // carries a title or note (see showTextOn); clear both for silence.
    // No Menu checkbox: the menu follows picks + selection (derived at
    // capture/validate — 2+ picks show it, otherwise the step stands alone).
    // Viewer control bars (authored per step; enabled only when that step's
    // viewer is visible — viewers are set live via [2D][3D] before saving).
    var showRow = document.createElement("div");
    showRow.className = "scShowRow";
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
        label.setAttribute("data-tooltip", "Needs the " + kind + " viewer visible in this step (toggle [" + kind + "] before saving)");
      }
      ctlCheck.onchange = function () {
        st.show = st.show || {};
        st.show.controls = st.show.controls || {};
        st.show.controls[kind] = ctlCheck.checked;
      };
      label.appendChild(ctlCheck);
      label.appendChild(document.createTextNode(" " + pair[0]));
      showRow.appendChild(label);
    });
    // Naming gear + panel.
    var nameCtlLabel = document.createElement("label");
    nameCtlLabel.className = "sshow";
    nameCtlLabel.setAttribute("data-tooltip", "Show the naming settings gear + panel in presentation");
    var nameCtlCheck = document.createElement("input");
    nameCtlCheck.type = "checkbox";
    nameCtlCheck.checked = !!(st.show && st.show.nameSettings === true);
    nameCtlCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameSettings = nameCtlCheck.checked;
    };
    nameCtlLabel.appendChild(nameCtlCheck);
    nameCtlLabel.appendChild(document.createTextNode(" Ρυθμίσεις ονομασίας"));
    showRow.appendChild(nameCtlLabel);
    // Name-box interaction (user clicks only; stored highlight always
    // replays). Absent = allowed (legacy files); capture stores false.
    var nameClickLabel = document.createElement("label");
    nameClickLabel.className = "sshow";
    nameClickLabel.setAttribute("data-tooltip", "Allow clicking the name boxes in presentation");
    var nameClickCheck = document.createElement("input");
    nameClickCheck.type = "checkbox";
    nameClickCheck.checked = !!(st.show && st.show.nameClick === true);
    nameClickCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameClick = nameClickCheck.checked;
    };
    nameClickLabel.appendChild(nameClickCheck);
    nameClickLabel.appendChild(document.createTextNode(" Διάδραση ονομασίας"));
    showRow.appendChild(nameClickLabel);
    // Per-component eye toggles in presentation (Ορατότητα συνθετικών):
    // checked → the master eye switch starts lit and the small eye buttons
    // above each name box stay live during presentation (visibility itself
    // still comes from the stored hidden set); unchecked → master starts
    // unlit, click it to reveal the eyes (needs Ρυθμίσεις ονομασίας shown).
    // Molecule steps only — menu-only steps carry no naming.
    var nameEyeLabel = document.createElement("label");
    nameEyeLabel.className = "sshow";
    nameEyeLabel.setAttribute("data-tooltip", "Show per-component eye toggles in presentation");
    var nameEyeCheck = document.createElement("input");
    nameEyeCheck.type = "checkbox";
    nameEyeCheck.checked = !!(st.show && st.show.nameEye === true);
    if (!st.selectedMol) {
      nameEyeCheck.disabled = true;
      nameEyeLabel.classList.add("disabled");
      nameEyeLabel.setAttribute("data-tooltip", "Molecule steps only (this step carries no naming)");
    }
    nameEyeCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameEye = nameEyeCheck.checked;
    };
    nameEyeLabel.appendChild(nameEyeCheck);
    nameEyeLabel.appendChild(document.createTextNode(" Ορατότητα συνθετικών"));
    showRow.appendChild(nameEyeLabel);
    row.appendChild(showRow);
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
    // Class-bound step actions (order-free): Go previews, Present jumps
    // straight into presentation at this step, the rest edit/reorder/delete.
    (function (scenId, idx) {
      var goBtn = row.querySelector(".scGo");
      var presentBtn = row.querySelector(".scPresentStep");
      var updBtn = row.querySelector(".scUpdate");
      var dupBtn = row.querySelector(".scDupe");
      var upBtn = row.querySelector(".scUp");
      var downBtn = row.querySelector(".scDown");
      var delBtn = row.querySelector(".delete");
      if (goBtn) goBtn.onclick = function () {
        if (scenId && scenId !== MuLERMoCScenario.activeId) fScenarioSetActive(scenId);
        fScenarioGo(idx);
      };
      if (presentBtn) presentBtn.onclick = function () {
        fScenarioPresentBegin(scenId, idx);
      };
      if (updBtn) updBtn.onclick = function () {
        fScenarioUpdateStep(scenId, idx);
      };
      if (dupBtn) dupBtn.onclick = function () {
        fScenarioDuplicateStep(scenId, idx);
      };
      if (upBtn) upBtn.onclick = function () {
        if (idx === 0) return;
        var s = fScenarioGet(scenId) || fScenarioActive();
        s.steps.splice(idx - 1, 0, s.steps.splice(idx, 1)[0]);
        fScenarioRenumber(scenId);
      };
      if (downBtn) downBtn.onclick = function () {
        var s = fScenarioGet(scenId) || fScenarioActive();
        if (idx >= s.steps.length - 1) return;
        s.steps.splice(idx + 1, 0, s.steps.splice(idx, 1)[0]);
        fScenarioRenumber(scenId);
      };
      if (delBtn) delBtn.onclick = function () {
        fScenarioConfirm("Διαγραφή βήματος " + st.n + ";", function () {
          var s = fScenarioGet(scenId) || fScenarioActive();
          s.steps.splice(idx, 1);
          fScenarioRenumber(scenId);
        });
      };
    })(scen.id, i);
    row.addEventListener("dragstart", function (ev) { fScenarioStepDragStart(ev, scen.id); });
    row.addEventListener("dragover", function (ev) { fScenarioStepDragOver(ev); });
    row.addEventListener("dragleave", function () {
      row.classList.remove("drag-over-before", "drag-over-after");
    });
    row.addEventListener("drop", function (ev) { fScenarioStepDrop(ev, scen.id); });
    row.addEventListener("dragend", function () { fScenarioStepDragEnd(scen.id); });
    box.appendChild(row);
  });
  // empty-cap states (scNew + per-panel Delete) follow every render
  fScenarioSyncNewDeleteUi();
}

// ── per-step drag reorder (authoring, desktop HTML5 DnD) ───────────────────
// Dedicated ⠿ grip arms the row drag (see grip mousedown above); Up/Down
// buttons remain the touch/keyboard fallback. Drop reuses the splice +
// fScenarioRenumber path so numbering/count/legacy stay single-sourced.
function fScenarioStepDragStart(ev, scenId) {
  var row = ev && ev.currentTarget;
  // Only allow drags initiated from the grip handle.
  if (!row || (ev.target && ev.target.closest && !ev.target.closest(".scDragHandle") &&
    ev.target !== row)) {
    if (ev.preventDefault) ev.preventDefault();
    return;
  }
  var idx = row.getAttribute("data-idx");
  try {
    if (ev.dataTransfer) {
      ev.dataTransfer.setData("text/plain", String(idx));
      ev.dataTransfer.effectAllowed = "move";
    }
  } catch (e) { /* Firefox requires setData; ignore failures */ }
  window._scDragFrom = { scenId: scenId, idx: parseInt(idx, 10) };
  if (row.classList) row.classList.add("dragging");
}

function fScenarioStepDragOver(ev) {
  if (ev.preventDefault) ev.preventDefault();
  try {
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
  } catch (e) { /* noop */ }
  var row = ev && ev.currentTarget;
  if (!row || !row.parentNode) return false;
  var kids = row.parentNode.querySelectorAll(".srow");
  for (var k = 0; k < kids.length; k++) {
    if (kids[k] !== row && kids[k].classList) {
      kids[k].classList.remove("drag-over-before", "drag-over-after");
    }
  }
  var rect = null;
  try {
    rect = row.getBoundingClientRect();
  } catch (e) { rect = null; }
  var after = false;
  if (rect && ev.clientY) after = (ev.clientY - rect.top) > (rect.height / 2);
  if (row.classList) {
    row.classList.toggle("drag-over-before", !after);
    row.classList.toggle("drag-over-after", after);
  }
  return false;
}

function fScenarioStepDrop(ev, scenId) {
  if (ev.preventDefault) ev.preventDefault();
  if (ev.stopPropagation) ev.stopPropagation();
  var from = window._scDragFrom && window._scDragFrom.scenId === scenId
    ? window._scDragFrom.idx : NaN;
  if (isNaN(from)) {
    try {
      from = parseInt(ev.dataTransfer && ev.dataTransfer.getData("text/plain"), 10);
    } catch (e) { from = NaN; }
  }
  var row = ev && ev.currentTarget;
  var toRow = row ? parseInt(row.getAttribute("data-idx"), 10) : NaN;
  fScenarioStepDragEnd(scenId, true);
  if (isNaN(from) || isNaN(toRow)) return false;
  var after = row.classList && row.classList.contains("drag-over-after");
  // Fallback when classes were cleared: use pointer midpoint.
  if (!row.classList.contains("drag-over-before") && !after) {
    try {
      var r = row.getBoundingClientRect();
      after = ev.clientY && (ev.clientY - r.top) > (r.height / 2);
    } catch (e) { after = false; }
  }
  if (from === toRow) return false;
  var s = (scenId && fScenarioGet(scenId)) || fScenarioActive();
  if (!s || !s.steps || from < 0 || from >= s.steps.length) return false;
  var to = toRow + (after ? 1 : 0);
  // Remember scroll + focus: Renumber does a full .scSteps rebuild.
  var panel = scenId && fScenarioPanelFor(scenId);
  var drawer = panel && panel.querySelector(".scenarioDrawer");
  var scTop = drawer ? drawer.scrollTop : null;
  var moved = s.steps.splice(from, 1)[0];
  if (from < to) to--;
  if (to < 0) to = 0;
  if (to > s.steps.length) to = s.steps.length;
  s.steps.splice(to, 0, moved);
  fScenarioRenumber(scenId);
  // Restore scroll, focus the moved grip, announce.
  try {
    var p2 = scenId && fScenarioPanelFor(scenId);
    var d2 = p2 && p2.querySelector(".scenarioDrawer");
    if (d2 && scTop !== null) d2.scrollTop = scTop;
    var box2 = p2 && p2.querySelector(".scSteps");
    var newRow = box2 && box2.querySelectorAll(".srow")[to];
    var g2 = newRow && newRow.querySelector(".scDragHandle");
    if (g2 && g2.focus) g2.focus();
  } catch (e) { /* focus/scroll best-effort */ }
  if (typeof fScenarioToast === "function") {
    fScenarioToast("Step moved to position " + (to + 1) + ".");
  }
  window._scDragFrom = null;
  return false;
}

function fScenarioStepDragEnd(scenId, keepData) {
  var rows = document.querySelectorAll(
    (scenId ? ".scenarioPanel[data-scenario-id='" + scenId + "'] " : "") + ".srow");
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].classList) {
      rows[i].classList.remove("dragging", "drag-over-before", "drag-over-after");
    }
    rows[i].setAttribute("draggable", "false");
  }
  if (!keepData) window._scDragFrom = null;
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
  if (no) {
    no.textContent = st && window.MuLERMoCNote && MuLERMoCNote.toPlainText
      ? MuLERMoCNote.toPlainText(st.note, st.noteFormat, false)
      : String((st && st.note) || "").replace(/<[^>]*>/g, "").trim();
  }
  // Present identity, full left: scenario name followed by the author
  // (textContent only — both are free-typed). Runs on begin + every step
  // turn, so renames always arrive with the next presentation.
  try {
    var idEl = document.getElementById("scScenarioId");
    if (idEl) {
      var sc = (ps && ps.id && typeof fScenarioGet === "function") ? fScenarioGet(ps.id) : null;
      var title = (sc && sc.title) || "";
      var author = (typeof fScenarioValidAuthor === "function")
        ? fScenarioValidAuthor(sc && sc.author)
        : (String((sc && sc.author) || "").trim() || "Unknown");
      while (idEl.firstChild) idEl.removeChild(idEl.firstChild);
      var tSpan = document.createElement("span");
      tSpan.className = "scScenarioIdTitle";
      tSpan.textContent = title;
      var sep = document.createElement("span");
      sep.className = "scScenarioIdSep";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = " · ";
      var aSpan = document.createElement("span");
      aSpan.className = "scScenarioIdAuthor";
      aSpan.textContent = author;
      idEl.appendChild(tSpan);
      idEl.appendChild(sep);
      idEl.appendChild(aSpan);
      idEl.setAttribute("title", title + " · " + author);
    }
  } catch (eId) { /* present identity best-effort */ }
}

// ── Go/Jump pick alignment (authoring) ───────────────────────────────────
// After a successful authoring preview the live pick mirrors the step, so a
// Go → tweak → Update round-trip keeps the menu: steps carrying a subset
// (menu-only, or molecule+menu) restore picks with pick mode on; menu-less
// molecule steps clear picks with pick mode off. Silent by design (unlike
// the pick-toggle path, which toasts on clear). Presentation navigation
// (Prev/Next/Play/deep links) never touches picks.
function fScenarioGoAlignPick(step) {
  if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring || !step) return;
  var act = fScenarioActive();
  if (!act) return;
  var subset = Array.isArray(step.menuSubset) ? step.menuSubset : [];
  var known = [];
  var dropped = 0;
  for (var k = 0; k < subset.length; k++) {
    var mol = subset[k];
    if (mol && typeof nameExamples !== "undefined" && nameExamples[mol]) {
      if (known.indexOf(mol) < 0) known.push(mol);
    } else if (mol) {
      dropped++;
    }
  }
  var wantPick = known.length > 1;
  act.menuPick = wantPick ? known : [];
  MuLERMoCScenario.menuPickMode = wantPick;
  fScenarioSyncLegacy();
  fScenarioPaintPickUi();
  if (dropped > 0) fScenarioToast("Dropped " + dropped + " unknown molecule(s) from the step menu.");
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
  try {
    fScenarioGoAlignPick(ps.steps[i]);
  } catch (e) {
    /* pick alignment best-effort */
  }
  // Authoring preview: fScenarioChrome hides nothing while !present, so the
  // viewer buttons/bars would keep the live states. Mirror the step's
  // viewers onto the chrome (panes + [2D][3D] actives + control bars), the
  // same helper Exit uses. Presentation navigation skips this (chrome path).
  try {
    if (!MuLERMoCScenario.present && MuLERMoCScenario.authoring) {
      var _st = ps.steps[i];
      fScenarioRestoreChrome(_st && _st.show ? _st.show.viewers : null);
    }
  } catch (e) {
    /* viewer alignment best-effort */
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
// mode, zigzag, zoom), styleName (box/cross/etherNaming/panelOpen), styleHighlight,
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
  fresh.noteFormat = old.noteFormat === "html" ? "html" : "text";
  fresh.styleText = {
    fontSizePx: fScenarioValidFontSizePx(old.styleText ? old.styleText.fontSizePx : null),
    textWidthPx: fScenarioValidTextWidthPx(old.styleText ? old.styleText.textWidthPx : null),
    columns: fScenarioValidColumns(old.styleText ? old.styleText.columns : null),
    position: fScenarioValidTextPosition(old.styleText ? old.styleText.position : null)
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
          scen.author = res.author || "Unknown";
          scen.created = res.created || scen.created;
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
    } else {
      // Default library preload: the empty boot card becomes S1 (stored Greek
      // alkane scenario) and a second empty card is added as S2. Deep links
      // (?scenario=) skip this. file:// fetch failure falls back silently to
      // the single empty boot card (Import remains the offline path).
      fetch(MuLERMoCScenario.defaultScenarioUrl)
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (obj) {
          var res = fScenarioValidate(obj);
          res.warnings.forEach(fScenarioToast);
          if (!res.ok) {
            if (url.present) fScenarioToast("Present mode needs ?scenario=… or imported steps.");
            return;
          }
          var s1 = fScenarioActive();
          s1.title = res.title;
          s1.author = res.author || "Unknown";
          s1.created = res.created || s1.created;
          s1.steps = res.steps;
          s1.index = 0;
          s1.menuPick = [];
          fScenarioSyncLegacy();
          fScenarioNew("untitled-scenario", true);
          fScenarioSetActive(s1.id);
          fScenarioBuildPanels();
          if (url.present) {
            MuLERMoCScenario.presentId = s1.id;
            fScenarioWhenJSmolReady(function () {
              fScenarioStashAuthorSettings();
              fScenarioGo(Math.min(url.step, res.steps.length) - 1);
            });
          }
        })
        .catch(function (e) {
          /* file:// or missing default: keep the single empty boot card */
          if (url.present) fScenarioToast("Present mode needs ?scenario=… or imported steps.");
        });
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
