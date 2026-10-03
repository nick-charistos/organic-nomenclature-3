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

// ── 3D camera via `show moveto` ────────────────────────────────────────
function fScenarioGetMoveto() {
  try {
    if (typeof Jmol === "undefined" || typeof jmolAppletNomeclature === "undefined") return null;
    if (Jmol.getPropertyAsString) {
      var s = Jmol.getPropertyAsString(jmolAppletNomeclature, "moveto");
      if (s && /^moveto\b/i.test(String(s).trim())) return String(s).trim().split("\n")[0];
    }
    if (Jmol.scriptWait) {
      var w = String(Jmol.scriptWait(jmolAppletNomeclature, "show moveto") || "").trim();
      var line = w.split("\n").filter(function (l) {
        return /^moveto\b/i.test(l.trim());
      })[0];
      if (line) return line.trim();
    }
  } catch (e) {
    /* 3D unavailable */
  }
  return null;
}

function fScenarioValidMoveto(s) {
  return typeof s === "string" && /^moveto\b/i.test(s.trim()) && s.length < 2048
    ? s.trim().split("\n")[0]
    : null;
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
      naming: true, nameSettings: false, audio: false, rule: false, infoHost: false,
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
    st.view3D.moveto = fScenarioValidMoveto(st.view3D.moveto);
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
  // spin off during the jump, restored after moveto
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

  // 4. custom 3D camera (queued after the load script)
  if (step.show.viewers["3D"] && step.view3D.moveto) {
    try {
      Jmol.script(jmolAppletNomeclature, step.view3D.moveto);
    } catch (e) {
      /* 3D unavailable */
    }
  }
  rotateFlag = wantSpin;
  rotate3D();

  // 5. name highlight via the standard click path
  if (step.nameAnalysisMode && step.nameAnalysisMode !== "none") {
    var compId = fScenarioModeToCompId[step.nameAnalysisMode];
    var box = compId && document.getElementById(compId);
    if (box) {
      $(box).trigger("click");
      if (nameAnalysisMode !== step.nameAnalysisMode) {
        nameAnalysisMode = "none";
        $(".nameCompBox").removeClass("selected");
        fClearHighlights();
        fUpdateSVG();
        fExplainNameComp();
      }
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
  if (!show2D && typeof Jmol !== "undefined") {
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
  // menu drawer + toggle
  var drawer = document.getElementById("menuDrawer");
  var tog = document.getElementById("menuToggle");
  if (present) {
    if (drawer) {
      drawer.classList.remove("menu-open");
      drawer.classList.add("menu-closed");
      drawer.style.display = "none";
    }
    if (tog) tog.style.display = "none";
  } else {
    if (drawer) {
      drawer.style.display = "";
      drawer.classList.remove("menu-closed");
      drawer.classList.add("menu-open");
    }
    if (tog) tog.style.display = "";
  }
  // naming panel + settings + audio
  fScenarioHide("nameAnalysisContainer", present && show.naming === false);
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

// ── UI (injected; 43.html diff stays at the script include) ─────────────
function fScenarioInjectCss() {
  if (document.getElementById("scenarioCss")) return;
  var s = document.createElement("style");
  s.id = "scenarioCss";
  s.textContent =
    "#scenarioAuthorBar{position:fixed;top:8px;right:8px;z-index:500;background:#fff;border:1px solid #ccc;border-radius:8px;padding:6px 8px;display:flex;gap:6px;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,.15);font-size:.8rem}" +
    "#scenarioAuthorBar input[type=text]{width:140px}" +
    "#scenarioAuthorBar button,#scenarioPlayBar button{cursor:pointer}" +
    "#scenarioDrawer{position:fixed;top:52px;right:8px;z-index:500;background:#fff;border:1px solid #ccc;border-radius:8px;padding:8px;max-height:60vh;overflow:auto;width:300px;font-size:.8rem}" +
    "#scenarioDrawer .srow{display:flex;gap:4px;align-items:center;margin:4px 0}" +
    "#scenarioDrawer .srow input[type=text]{flex:1;min-width:0}" +
    "#scenarioPlayBar{position:fixed;top:0;left:0;right:0;z-index:500;background:#263238;color:#fff;display:flex;gap:10px;align-items:center;padding:6px 12px;font-size:.9rem}" +
    "#scenarioPlayBar .snote{opacity:.75;font-size:.8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:40vw}" +
    "#scenarioToast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:600;background:#323232;color:#fff;padding:8px 14px;border-radius:6px;opacity:0;transition:opacity .2s;max-width:80vw}" +
    "#scenarioToast.show{opacity:1}" +
    "#molInfoPanelSlot{border:1px dashed #bbb;border-radius:6px;padding:6px;margin:6px 0;font-size:.8rem;color:#555}";
  document.head.appendChild(s);
}

function fScenarioBuildUi() {
  fScenarioInjectCss();
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
      // exit in place (keeps in-memory steps): restore author chrome
      MuLERMoCScenario.present = false;
      try {
        history.replaceState(null, "", location.pathname);
      } catch (e) {
        /* file:// */
      }
      var st = MuLERMoCScenario.steps[MuLERMoCScenario.index];
      if (st) {
        st.show = st.show || {};
        st.show.viewers = { "2D": true, "3D": true };
        fScenarioApply(st);
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
          fScenarioGo(Math.min(url.step, res.steps.length) - 1);
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
