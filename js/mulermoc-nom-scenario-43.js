// mulermoc-nom-scenario-43.js
// Didactic scenarios — linear snapshot sequences (v43, additive module).
// Drives the existing v43 layers (core/molview/teaching) through their
// public entry points; modifies no v42/v43 layer logic.
// Disabled by default: without ?scenario / ?present / #step the page
// behaves exactly like v42 (43-no-params == 42).

var MuLERMoCScenario = {
  SUPPORTED_VERSION: 1,
  steps: [],
  index: 0,
  title: "untitled-scenario",
  present: false,
  ready: false,
  applyToken: 0, // S2: bumped per fScenarioApply; stale async follow-ups abort
  pending3D: null, // S2: {token, mol, step, done} — name click waits for 3D parse
};

// nameAnalysisMode -> name-box id (reverse of the .nameCompBox click map
// in mulermoc-nom-teaching-43.js). comp10/11 depend on chemical class;
// verified after triggering, mismatch falls back to "none".
var fScenarioModeToCompId = {
  compNumber1: "comp0",
  " compSecondSub1": "comp1",
  compNumber2: "comp2",
  " compSecondSub2": "comp3",
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

// S3: legacy engine modes carry a leading space (" compSecondSub1/2",
// see mulermoc-nom-teaching-43.js). Normalize before comparing or looking up
// so capture → apply → click survives trimming on either side.
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
  // cross-file globals declared in mulermoc-nom-core/molview-43.js; unknown
  // names yield the fallback (same contract as the old eval version).
  try {
    switch (name) {
      case "selectedMol": return typeof selectedMol !== "undefined" ? selectedMol : fallback;
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
  var mol = fScenarioG("selectedMol", null);
  if (!mol || typeof nameExamples === "undefined" || !nameExamples[mol]) {
    fScenarioToast("Scenario: select a molecule first.");
    return null;
  }
  var spin = !!fScenarioG("rotateFlag", false);
  var moveto = fScenarioViewerOn("3D") ? fScenarioGetMoveto() : null;
  var step = {
    n: MuLERMoCScenario.steps.length + 1,
    title: mol,
    note: "",
    selectedMol: mol,
    mode2D: fScenarioG("mode2D", "condensed"),
    mainChainMode: fScenarioG("mainChainMode", "algorithmic"),
    etherNamingMode: fScenarioG("etherNamingMode", "iupac"),
    nameAnalysisMode: fScenarioG("nameAnalysisMode", "none"),
    selectedRule: typeof selectedRule === "number" ? selectedRule : null,
    style2D: {
      atomColors: !!fScenarioG("svgAtomColors2DFlag", false),
      colorMode: fScenarioG("atomColorMode2D", "atom"),
      zigzag: fScenarioG("mode2D", "") === "condensedZigZag",
    },
    styleName: {
      box: !!(typeof nameBoxFlag !== "undefined" ? nameBoxFlag : window.nameBoxFlag),
      cross: !!(typeof nameCrossFlag !== "undefined" ? nameCrossFlag : window.nameCrossFlag),
      etherNaming: fScenarioG("etherNamingMode", "iupac"),
      panelOpen: !!fScenarioG("nameSettingsFlag", true),
    },
    audio: { narrate: !!fScenarioG("narrateAnalysisFlag", false) },
    view3D: {
      style: fScenarioG("vis3D", "ballnstick"),
      spin: spin,
      showH: !!fScenarioG("hydrogens3DFlag", true),
      atomSymbols: !!fScenarioG("atomSymbols3DFlag", true),
      moveto: moveto,
    },
    externalLinks: {},
    show: {
      menu: false,
      viewerButtons: false,
      viewerSettings: false,
      viewers: { "2D": fScenarioViewerOn("2D"), "3D": fScenarioViewerOn("3D") },
      controls: { "2D": false, "3D": false },
      save: { "2D": false, "3D": false },
      naming: true,
      nameSettings: false,
      audio: false,
      rule: false,
      text: true,
      infoHost: false,
    },
  };
  if (spin) fScenarioToast("Note: 3D spin is on — stored view may drift.");
  return step;
}

// ── validation (version policy) ────────────────────────────────────────
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
    styleName: { box: true, cross: false, etherNaming: "iupac", panelOpen: true },
    audio: { narrate: false },
    view3D: { style: "ballnstick", spin: false, showH: true, atomSymbols: true, moveto: null },
    externalLinks: {},
    show: {
      menu: false, viewerButtons: false, viewerSettings: false,
      viewers: { "2D": true, "3D": true },
      controls: { "2D": false, "3D": false },
      save: { "2D": false, "3D": false },
      naming: true, nameSettings: false, audio: false, rule: false, text: true, infoHost: false,
    },
  };
  var out = Object.assign({}, d, step);
  ["style2D", "styleName", "audio", "view3D", "show", "externalLinks"].forEach(function (k) {
    out[k] = Object.assign({}, d[k], step[k] || {});
  });
  out.show.viewers = Object.assign({}, d.show.viewers, (step.show || {}).viewers || {});
  out.show.controls = Object.assign({}, d.show.controls, (step.show || {}).controls || {});
  out.show.save = Object.assign({}, d.show.save, (step.show || {}).save || {});
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
    if (!s || !s.selectedMol || !nameExamples[s.selectedMol]) {
      warnings.push("Step " + (i + 1) + ": unknown molecule '" + (s && s.selectedMol) + "' — skipped.");
      return;
    }
    var st = fScenarioDefaults(s, steps.length);
    var rawMoveto = st.view3D && st.view3D.moveto ? st.view3D.moveto : null;
    st.view3D.moveto = fScenarioValidMoveto(st.view3D.moveto);
    if (rawMoveto && !st.view3D.moveto) {
      warnings.push("Step " + (i + 1) + ": invalid 3D view discarded (default used) — re-capture with rotate off.");
    }
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
  var compId = fScenarioCompIdFor(step.nameAnalysisMode);
  var box = compId && document.getElementById(compId);
  if (!box) return;
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
  nameBoxFlag = window.nameBoxFlag;
  window.nameCrossFlag = !!step.styleName.cross;
  nameCrossFlag = window.nameCrossFlag;
  narrateAnalysisFlag = !!step.audio.narrate;
  nameSettingsFlag = !!step.styleName.panelOpen;
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
  rotate3D();

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

function showTextOn(step) {
  return !step || !step.show || step.show.text !== false;
}

function fScenarioFillStepPanel(step) {
  var h1 = document.getElementById("pageTitle");
  var p = document.getElementById("scStepText");
  if (!h1 || !p) return;
  var appTitle = MuLERMoCScenario.appTitle || h1.textContent || "";
  // plain text only (textContent escapes markup); rich noteFormat reserved for later
  if (MuLERMoCScenario.present && step && step.n && showTextOn(step)) {
    h1.textContent = step.title ? step.n + ". " + step.title : appTitle;
    p.textContent = step.note || "";
  } else {
    h1.textContent = appTitle;
    p.textContent = "";
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
  // menu column hidden wholesale in presentation (flex row recenters the rest)
  fScenarioHide("menuCol", present);
  // naming panel + settings + audio
  fScenarioHide("nameAnalysisContainer", present && show.naming === false);
  // per-step heading (page h1) + text div below it (title/note, plain text)
  fScenarioFillStepPanel(MuLERMoCScenario.steps[MuLERMoCScenario.index]);
  fScenarioHide("scStepText", !present || show.text === false);
  var ns = !(present && show.nameSettings !== true);
  fScenarioHide("nameSettingsBtnDiv", present && !ns);
  var panel = document.getElementById("nameSettingsPanel");
  if (panel && present && !ns) panel.classList.remove("open");
  var audioOn = !(present && show.audio !== true);
  ["narrateAnalysisToggle", "readNameBtn"].forEach(function (id) {
    fScenarioHide(id, !audioOn);
  });
  // minimal info host for future PubChem links
  var host = document.getElementById("molInfoPanelSlot");
  if (host) host.style.display = present && show.infoHost === true ? "" : "none";
  // own UI
  var tb = document.getElementById("scenarioAuthorBar");
  if (tb) tb.style.display = present ? "none" : "";
  var dr = document.getElementById("scenarioDrawer");
  if (dr) dr.style.display = present ? "none" : "";
  var pb = document.getElementById("scenarioPlayBar");
  if (pb) pb.style.display = present ? "" : "none";
}

// ── file export / import (memory + file, decision A) ────────────────────
function fScenarioExport() {
  var data = {
    scenarioVersion: MuLERMoCScenario.SUPPORTED_VERSION,
    app: "mulermoc-nom-43",
    scenario: MuLERMoCScenario.title,
    title: MuLERMoCScenario.title,
    steps: MuLERMoCScenario.steps,
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = String(MuLERMoCScenario.title || "scenario").replace(/\s+/g, "_") + ".scenario.json";
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
      MuLERMoCScenario.steps = res.steps;
      MuLERMoCScenario.title = res.title;
      MuLERMoCScenario.index = 0;
      fScenarioRenderList();
      fScenarioToast("Imported " + res.steps.length + " steps.");
    } catch (e) {
      fScenarioToast("Import failed: invalid JSON.");
    }
  };
  r.readAsText(file);
}

// ── UI (scenario chrome lives in css/mulermoc-nom-scenario-43.css) ─────────
function fScenarioBuildUi() {
  if (!document.getElementById("scenarioToast")) {
    var t = document.createElement("div");
    t.id = "scenarioToast";
    document.body.appendChild(t);
  }
  // minimal info host for future PubChem links (hidden unless show.infoHost)
  if (!document.getElementById("molInfoPanelSlot")) {
    var host = document.createElement("div");
    host.id = "molInfoPanelSlot";
    host.style.display = "none";
    host.innerHTML = "<div class='molInfoRow'>Εξωτερικοί σύνδεσμοι: <b>—</b> (PubChem: μελλοντικά)</div>";
    var anchor = document.getElementById("nameAnalysis") || document.getElementById("nameAnalysisContainer");
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(host, anchor.nextSibling);
    else document.body.appendChild(host);
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
  if (!document.getElementById("scenarioAuthorBar")) {
    var bar = document.createElement("div");
    bar.id = "scenarioAuthorBar";
    bar.innerHTML =
      "<input type='text' id='scenarioTitle' value='untitled-scenario' title='Scenario title'>" +
      "<button id='scSave' title='Save current view as step'>Save step</button>" +
      "<button id='scList' title='Show/hide step list'>Steps (<span id='scCount'>0</span>)</button>" +
      "<button id='scExport' title='Download scenario JSON'>Export</button>" +
      "<button id='scImport' title='Import scenario JSON'>Import</button>" +
      "<button id='scPresent' title='Open presentation at step 1'>Present ▶</button>" +
      "<input type='file' id='scFile' accept='.json,application/json' style='display:none'>";
    document.body.appendChild(bar);
    document.getElementById("scSave").onclick = function () {
      var st = fScenarioCapture();
      if (!st) return;
      MuLERMoCScenario.steps.push(st);
      MuLERMoCScenario.title = document.getElementById("scenarioTitle").value || "untitled-scenario";
      fScenarioRenderList();
      fScenarioToast("Saved step " + st.n + ".");
    };
    document.getElementById("scList").onclick = function () {
      var d = document.getElementById("scenarioDrawer");
      d.style.display = d.style.display === "none" ? "" : "none";
    };
    document.getElementById("scExport").onclick = fScenarioExport;
    document.getElementById("scImport").onclick = function () {
      document.getElementById("scFile").click();
    };
    document.getElementById("scFile").onchange = function (e) {
      if (e.target.files[0]) fScenarioImportFile(e.target.files[0]);
      e.target.value = "";
    };
    document.getElementById("scPresent").onclick = function () {
      if (!MuLERMoCScenario.steps.length) {
        fScenarioToast("Save at least one step first.");
        return;
      }
      try {
        history.replaceState(null, "", "#step=1");
      } catch (e) {
        /* file:// */
      }
      // in-place present (no reload: memory + file keeps steps in this page)
      MuLERMoCScenario.present = true;
      MuLERMoCScenario.index = 0;
      fScenarioApply(MuLERMoCScenario.steps[0]);
      fScenarioPlayUi();
    };
    var dr = document.createElement("div");
    dr.id = "scenarioDrawer";
    dr.style.display = "none";
    dr.innerHTML = "<div><b>Steps</b> <span style='opacity:.6'>(in-memory + file)</span></div><div id='scSteps'></div>";
    document.body.appendChild(dr);
  }
  if (!document.getElementById("scenarioPlayBar")) {
    var pb = document.createElement("div");
    pb.id = "scenarioPlayBar";
    pb.style.display = "none";
    pb.innerHTML =
      "<button id='scPrev'>◀</button><span id='scPos'>1/1</span><button id='scNext'>▶</button>" +
      "<b id='scStepTitle'></b><span class='snote' id='scStepNote'></span>" +
      "<span style='flex:1'></span><button id='scExit'>Exit ✕</button>";
    document.body.appendChild(pb);
    document.getElementById("scPrev").onclick = function () {
      fScenarioGo(MuLERMoCScenario.index - 1);
    };
    document.getElementById("scNext").onclick = function () {
      fScenarioGo(MuLERMoCScenario.index + 1);
    };
    document.getElementById("scExit").onclick = function () {
      // exit in place (keeps in-memory steps): restore full chrome (menu
      // menu-open + both viewers + all bars) via a transient clone — the
      // stored step keeps its authored show.* for a later Export.
      MuLERMoCScenario.present = false;
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
      var st = MuLERMoCScenario.steps[MuLERMoCScenario.index];
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
      } else fScenarioChrome(null);
    };
  }
}

function fScenarioRenderList() {
  var box = document.getElementById("scSteps");
  var cnt = document.getElementById("scCount");
  if (!box) return;
  if (cnt) cnt.textContent = MuLERMoCScenario.steps.length;
  box.innerHTML = "";
  MuLERMoCScenario.steps.forEach(function (st, i) {
    var row = document.createElement("div");
    row.className = "srow";
    var badge = st.view3D.moveto ? "3D✓" : "3D–";
    row.innerHTML =
      "<b>" + st.n + "</b><input type='text' value=''><span title='3D custom view'>" + badge + "</span>" +
      "<button title='Jump'>Go</button><button title='Up'>↑</button><button title='Down'>↓</button>" +
      "<button title='Re-capture 3D view'>3D</button><button title='Delete'>✕</button>";
    var titleInput = row.querySelector("input");
    titleInput.value = st.title || "";
    titleInput.onchange = function () {
      st.title = titleInput.value;
    };
    var noteInput = document.createElement("textarea");
    noteInput.className = "snote";
    noteInput.placeholder = "Educational text (plain text)";
    noteInput.value = st.note || "";
    noteInput.onchange = function () {
      st.note = noteInput.value;
    };
    row.appendChild(noteInput);
    var textLabel = document.createElement("label");
    textLabel.className = "sshow";
    var textCheck = document.createElement("input");
    textCheck.type = "checkbox";
    textCheck.checked = !st.show || st.show.text !== false;
    textCheck.onchange = function () {
      st.show = st.show || {};
      st.show.text = textCheck.checked;
    };
    textLabel.appendChild(textCheck);
    textLabel.appendChild(document.createTextNode(" Text"));
    row.appendChild(textLabel);
    var btns = row.querySelectorAll("button");
    btns[0].onclick = function () {
      fScenarioGo(i);
    };
    btns[1].onclick = function () {
      if (i === 0) return;
      MuLERMoCScenario.steps.splice(i - 1, 0, MuLERMoCScenario.steps.splice(i, 1)[0]);
      fScenarioRenumber();
    };
    btns[2].onclick = function () {
      if (i >= MuLERMoCScenario.steps.length - 1) return;
      MuLERMoCScenario.steps.splice(i + 1, 0, MuLERMoCScenario.steps.splice(i, 1)[0]);
      fScenarioRenumber();
    };
    btns[3].onclick = function () {
      var m = fScenarioViewerOn("3D") ? fScenarioGetMoveto() : null;
      st.view3D.moveto = m;
      fScenarioRenderList();
      fScenarioToast(m ? "3D view updated (custom)." : "No 3D view captured (default).");
    };
    btns[4].onclick = function () {
      MuLERMoCScenario.steps.splice(i, 1);
      fScenarioRenumber();
    };
    box.appendChild(row);
  });
}

function fScenarioRenumber() {
  MuLERMoCScenario.steps.forEach(function (st, i) {
    st.n = i + 1;
  });
  if (MuLERMoCScenario.index >= MuLERMoCScenario.steps.length) {
    MuLERMoCScenario.index = Math.max(0, MuLERMoCScenario.steps.length - 1);
  }
  fScenarioRenderList();
}

function fScenarioPlayUi() {
  var st = MuLERMoCScenario.steps[MuLERMoCScenario.index];
  var pos = document.getElementById("scPos");
  if (pos) pos.textContent = MuLERMoCScenario.steps.length ? MuLERMoCScenario.index + 1 + "/" + MuLERMoCScenario.steps.length : "0/0";
  var ti = document.getElementById("scStepTitle");
  if (ti) ti.textContent = st ? st.n + ". " + (st.title || "") : "";
  var no = document.getElementById("scStepNote");
  if (no) no.textContent = st && st.note ? st.note : "";
}

function fScenarioGo(i) {
  if (!MuLERMoCScenario.steps.length) return;
  if (i < 0) i = 0;
  if (i >= MuLERMoCScenario.steps.length) i = MuLERMoCScenario.steps.length - 1;
  MuLERMoCScenario.index = i;
  try {
    history.replaceState(null, "", "#step=" + (i + 1));
  } catch (e) {
    /* file:// */
  }
  fScenarioApply(MuLERMoCScenario.steps[i]);
  fScenarioPlayUi();
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
          MuLERMoCScenario.steps = res.steps;
          MuLERMoCScenario.title = res.title;
          fScenarioRenderList();
          fScenarioWhenJSmolReady(function () {
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
    if (!MuLERMoCScenario.present || !MuLERMoCScenario.steps.length) return;
    var m = /step=(\d+)/.exec(location.hash);
    if (m) {
      var i = Math.max(1, parseInt(m[1], 10)) - 1;
      if (i !== MuLERMoCScenario.index) {
        MuLERMoCScenario.index = Math.min(i, MuLERMoCScenario.steps.length - 1);
        fScenarioApply(MuLERMoCScenario.steps[MuLERMoCScenario.index]);
        fScenarioPlayUi();
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fScenarioBoot);
} else {
  fScenarioBoot();
}
