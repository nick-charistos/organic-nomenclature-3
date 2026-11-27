// probe-scenario-quiz: v58 scenario quizzes, headless Chrome (2D only).
// Contract (v59.04, ?v=59.04):
//  - a step stores {kind, mode, modes, modeLabels, mol, startMode}; `modes` is
//    the required component set (empty for deferred menu quizzes);
//    `startMode` is optional and only set by the drawer's Start component
//    select. Legacy `preSolved` is ignored (the author's live solve state is
//    never part of a step);
//  - the drawer tags are settings-only: selected = required, unselected = free,
//    and every capable tag toggles regardless of the author's solved state;
//  - Update never destroys an authored task (removal is an explicit button) and
//    a solved capture never rewrites the required set;
//  - Present never auto-arms: it arms only the author-chosen startMode, else
//    shows the .scQuizStartPrompt until the student picks a component. The gate
//    holds until every required comp is solved; solved steps show their
//    display, menu steps defer to the picked molecule, and no forward jump can
//    skip a gated step.
const { chromium } = require("playwright-core");
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.MULER_BASE || "http://localhost:8901";
const failures = [];
const warnings = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };
const warn = (msg) => { warnings.push(msg); };

async function waitReady(p) {
  try {
    await p.waitForFunction(() => {
      try {
        return !!document.querySelector("#jsmeNomeclatureSVG svg") &&
          typeof fMulerQuizResolveTarget === "function" &&
          typeof fScenarioNew === "function" &&
          typeof fScenarioStudentTask === "function" &&
          typeof fScenarioQuizTodo === "function" &&
          !!window.MulerUserSelection;
      } catch (e) { return false; }
    }, { timeout: 30000 });
  } catch (e) { failures.push("ready timeout"); }
  try { await p.waitForTimeout(800); } catch (e) {}
}

async function state(p) {
  return await p.evaluate(() => {
    try {
      const el = document.getElementById("mulerQuizVerdict");
      const ps = (typeof fScenarioPresent === "function") ? fScenarioPresent() : null;
      const st = ps && ps.steps ? ps.steps[ps.index] : null;
      let todo = null;
      try { todo = st ? fScenarioQuizTodo(st) : null; } catch (e) { todo = "err"; }
      return {
        target: window.MulerQuizTarget || null,
        sel: ((window.MulerUserSelection || {}).atoms2D || []).slice(),
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
        present: !!(window.MuLERMoCScenario && window.MuLERMoCScenario.present),
        step: ps ? ps.index : -1,
        quiz: st ? (st.quiz || null) : null,
        todo: todo,
        task: (() => { try { const t = fScenarioStudentTask(); return t ? t.quiz.mode : null; } catch (e) { return "?"; } })(),
        solved: (() => { try { return JSON.parse(JSON.stringify(window.__mulerQuizSolved || {})); } catch (e) { return "?"; } })(),
        blocked: (() => { try { return fMulerSelectPresentBlocked(); } catch (e) { return "?"; } })(),
        prompt: (() => {
          try {
            const pr = document.querySelector("#nameAnalysisExplain .scQuizStartPrompt");
            return pr ? { text: (pr.textContent || "").trim(), cls: pr.className } : null;
          } catch (e) { return "?"; }
        })(),
      };
    } catch (e) { return { err: String((e && e.message) || e).slice(0, 140) }; }
  });
}

async function clickAtom(p, atom1) {
  const sc = await p.evaluate((a1) => {
    try {
      const A = fMulerSelectAnchors().find((x) => x.atom === a1 - 1);
      if (!A) return null;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(A.x, A.y).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    } catch (e) { return null; }
  }, atom1);
  if (!sc) return false;
  await p.mouse.click(sc[0], sc[1]);
  await p.waitForTimeout(420);
  return true;
}

async function openMol(p, mol) {
  await p.goto(BASE + "/mulermoc-nom-59.html?lang=en&mol=" + mol, { waitUntil: "load", timeout: 60000 });
  await waitReady(p);
}

// v58.12: student-mode hover ring (2D) — true when the ring rect exists.
async function hoverAtom(p, atom1) {
  const sc = await p.evaluate((a1) => {
    try {
      const A = fMulerSelectAnchors().find((x) => x.atom === a1 - 1);
      if (!A) return null;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(A.x, A.y).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    } catch (e) { return null; }
  }, atom1);
  if (!sc) return "noanchor";
  await p.mouse.move(sc[0], sc[1]);
  await p.waitForTimeout(500);
  return await p.evaluate(() => !!document.querySelector("#mulerHoverRing rect"));
}

// Applet-side picking mode ("atom"/"off"/...): the only reliable check that
// the 3D picking script actually reached JSmol (the page-side string can lie
// when a load tail overwrites it).
async function pickingState(p) {
  return await p.evaluate(() => {
    try {
      if (typeof Jmol === "undefined" || !Jmol || typeof jmolAppletNomeclature === "undefined" || !jmolAppletNomeclature) return "noapplet";
      var s = String(Jmol.scriptWait(jmolAppletNomeclature, "show picking") || "");
      var m = /picking = "([^"]+)"/.exec(s);
      return m ? m[1] : "unknown";
    } catch (e) { return "err"; }
  });
}

// v58.13: record the 3D paint scripts (green/cyan/wipe) so the probe can
// assert that clearing picks does not leave the solved green erased.
async function install3DLog(p) {
  await p.evaluate(() => {
    try {
      window.__muler3DLog = [];
      if (window.__muler3DLogInstalled) return;
      window.__muler3DLogInstalled = true;
      var orig = window.fJSmolScript;
      window.fJSmolScript = function (app, s) {
        try { var t = String(s || ""); if (/color atoms|selectionHalos/.test(t)) window.__muler3DLog.push(t); } catch (e) {}
        return orig.apply(this, arguments);
      };
    } catch (e) {}
  });
}

async function emptyCanvasPoint(p) {
  return await p.evaluate(() => {
    try {
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const r = svg.getBoundingClientRect();
      const g = svg.getElementsByTagName("g")[0];
      const inv = g.getScreenCTM().inverse();
      const cands = [[r.left + 15, r.top + r.height - 20], [r.left + 15, r.top + 20], [r.right - 15, r.bottom - 20], [r.right - 15, r.top + 20]];
      for (const c of cands) {
        const q = new DOMPoint(c[0], c[1]).matrixTransform(inv);
        let pick = null;
        try { pick = fMulerSelectPick(q.x, q.y); } catch (e) { pick = { err: 1 }; }
        if (!pick) return { x: c[0], y: c[1] };
      }
    } catch (e) {}
    return null;
  });
}

async function rowButton(p, scenId, cls) {
  const ok = await p.evaluate(([id, c]) => {
    try {
      const btns = Array.prototype.slice.call(
        document.querySelectorAll('.scenarioPanel[data-scenario-id="' + id + '"] .srow ' + c));
      if (!btns.length) return "missing";
      btns[btns.length - 1].click();
      return true;
    } catch (e) { return "err:" + String((e && e.message) || e).slice(0, 60); }
  }, [scenId, cls]);
  await p.waitForTimeout(700);
  return ok;
}

// Build a scenario from plain step specs (lang en so Present texts are
// assertable; show.menu/menuSubset fields are honoured).
async function makeScenario(p, id, specs) {
  return await p.evaluate(([sid, list]) => {
    try {
      const scen = fScenarioNew(sid, true);
      for (let i = 0; i < list.length; i++) {
        const spec = list[i];
        const st = fScenarioDefaults({}, i);
        st.lang = "en";
        st.nameAnalysisMode = "none";
        for (const k in spec) {
          if (k === "showExtra" || k === "menuSubset") continue;
          st[k] = spec[k];
        }
        if (spec.selectedMol === null) st.selectedMol = null;
        if (spec.menuSubset) { st.show.menu = true; st.menuSubset = spec.menuSubset.slice(); }
        if (spec.showExtra) {
          for (const k in spec.showExtra) st.show[k] = spec.showExtra[k];
        }
        scen.steps.push(st);
      }
      if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels();
      if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id);
      return scen.id;
    } catch (e) { return "err:" + String((e && e.message) || e).slice(0, 80); }
  }, [id, specs]);
}

async function armBox(p, boxId, mode) {
  for (let i = 0; i < 4; i++) {
    const t = await p.evaluate(() => window.MulerQuizTarget || null);
    if (t === mode) return true;
    await p.evaluate((b) => { try { const el = document.getElementById(b); if (el) el.click(); } catch (e) {} }, boxId);
    await p.waitForTimeout(450);
  }
  return false;
}

// Solve one quiz mode: arm its box, click the resolved target atoms, verify
// the target cleared and the mode is marked solved.
async function solveMode(p, mode) {
  const boxId = await p.evaluate((m) => {
    try { return (typeof fMulerQuizBoxIdForMode === "function") ? fMulerQuizBoxIdForMode(m) : null; } catch (e) { return null; }
  }, mode);
  if (!boxId) return "nobox:" + mode;
  if (!await armBox(p, boxId, mode)) return "noarm:" + mode;
  const atoms = await p.evaluate(() => {
    try { return (fMulerQuizTargetSet() || []).map((x) => Number(x)).filter((x) => x > 0); } catch (e) { return []; }
  });
  if (!atoms.length) return "noset:" + mode;
  for (const a of atoms) { if (!await clickAtom(p, a)) return "noanchor:" + a; }
  await p.waitForTimeout(500);
  const ok = await p.evaluate((m) => {
    try { return !window.MulerQuizTarget && !!fMulerQuizIsSolved(m); } catch (e) { return false; }
  }, mode);
  return ok ? true : "nosolve:" + mode;
}

// Solve every currently required comp (chain first, then the rest).
async function solveAllTodos(p) {
  for (let round = 0; round < 8; round++) {
    const todo = await p.evaluate(() => {
      try { const ps = fScenarioPresent(); return fScenarioQuizTodo(ps.steps[ps.index]); } catch (e) { return null; }
    });
    if (todo === null) return "nodom";
    if (!todo.length) return true;
    const ordered = todo.slice().sort((a, b) =>
      (a === "compCarbonsCount" ? 0 : 1) - (b === "compCarbonsCount" ? 0 : 1));
    const r = await solveMode(p, ordered[0]);
    if (r !== true) return r;
  }
  return "loop";
}

async function menuPick(p, mol) {
  const ok = await p.evaluate((m) => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const hit = items.find((x) => (x.getAttribute("id") || "") === m);
      if (!hit) return "nomenuitem";
      hit.click();
      return true;
    } catch (e) { return "err:" + String((e && e.message) || e).slice(0, 60); }
  }, mol);
  await p.waitForTimeout(1500);
  return ok;
}

const clickBtn = async (p, id) => {
  await p.evaluate((x) => { try { const el = document.getElementById(x); if (el) el.click(); } catch (e) {} }, id);
  await p.waitForTimeout(900);
};

(async () => {
  const b = await chromium.launch(await (async () => {
    try { const fs = require("fs"); if (fs.existsSync(CHROME)) return { executablePath: CHROME }; } catch (e) { return {}; }
  })());
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  // --- 1. capture: armed quiz stores the required set + labels ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  const scid = await makeScenario(p, "probeq-cap", [{ selectedMol: "ethane" }]);
  check(typeof scid === "string" && scid.indexOf("err:") !== 0, "scenario creation failed: " + scid);
  check(await armBox(p, "comp5", "compCarbonsCount"), "setup arm failed");
  check(await rowButton(p, scid, ".scUpdate") === true, "Update button should capture");
  let st = await state(p);
  let cap = st.quiz;
  check(cap && cap.mode === "compCarbonsCount" && cap.mol === "ethane",
    "Update while armed should store the quiz, got " + JSON.stringify(cap));
  check(cap && Array.isArray(cap.modes) && cap.modes.indexOf("compCarbonsCount") >= 0 &&
    cap.modes.indexOf("compBondType") >= 0,
    "capture should store the required set, got " + JSON.stringify(cap && cap.modes));
  check(cap && Array.isArray(cap.modeLabels) && cap.modeLabels.length === cap.modes.length,
    "capture should store one label per required mode, got " + JSON.stringify(cap && cap.modeLabels));
  const rowInfo = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const badge = row ? row.querySelector(".scQuizBadge") : null;
      const req = row ? row.querySelector('input[data-sc-role="require-solution"]') : null;
      const quizRow = row ? row.querySelector('[data-sc-row="quiz"]') : null;
      const info = row ? row.querySelector('[data-sc-role="quiz-requirements"]') : null;
      const toggle = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      const naming = row ? row.querySelector('input[data-sc-role="naming"]') : null;
      const nameClick = row ? row.querySelector('input[data-sc-role="name-click"]') : null;
      return {
        badge: badge ? (badge.textContent || "").trim() : null,
        badgeTip: badge ? (badge.getAttribute("data-tooltip") || "") : "",
        req: req ? { checked: !!req.checked, disabled: !!req.disabled } : null,
        quizRow: !!quizRow,
        info: info ? (info.textContent || "").trim() : null,
        toggle: toggle ? { checked: !!toggle.checked } : null,
        namingHidden: naming ? getComputedStyle(naming.closest("label")).display === "none" : null,
        nameClickHidden: nameClick ? getComputedStyle(nameClick.closest("label")).display === "none" : null,
      };
    } catch (e) { return "err"; }
  }, scid);
  check(rowInfo && rowInfo.quizRow && rowInfo.req && rowInfo.req.checked && !rowInfo.req.disabled,
    "quiz row should offer require-solution checked, got " + JSON.stringify(rowInfo));
  check(rowInfo && rowInfo.info && /comp|αλυσ|chain|eth|an/i.test(rowInfo.info),
    "quiz row should describe the required components, got " + JSON.stringify(rowInfo && rowInfo.info));
  check(rowInfo && rowInfo.toggle && rowInfo.toggle.checked === true,
    "quiz row master checkbox should be checked on quiz steps, got " + JSON.stringify(rowInfo && rowInfo.toggle));
  check(rowInfo && rowInfo.namingHidden === true && rowInfo.nameClickHidden === true,
    "naming master + interaction should be hidden on quiz steps, got " + JSON.stringify(rowInfo));
  check(rowInfo && rowInfo.badge && /quiz|κουίζ/i.test(rowInfo.badge),
    "quiz badge should be localized, got " + JSON.stringify(rowInfo && rowInfo.badge));
  check(rowInfo && rowInfo.badgeTip && !/compCarbonsCount/.test(rowInfo.badgeTip),
    "quiz badge tooltip should use labels, not mode ids, got " + JSON.stringify(rowInfo && rowInfo.badgeTip));
  // --- 1a. component editor tags (v58.31): selected = required, free = pre-solved ---
  const tagInfo = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const tags = row ? Array.from(row.querySelectorAll('[data-sc-role^="quiz-mode-"]')) : [];
      const q = fScenarioGet(id).steps[0].quiz;
      return {
        count: tags.length,
        selected: tags.filter((t) => t.classList.contains("selected")).length,
        disabled: tags.filter((t) => t.disabled).length,
        head: (row.querySelector(".scQuizReqHead") || {}).textContent || "",
        modes: q.modes || [],
      };
    } catch (e) { return "err"; }
  }, scid);
  check(tagInfo && tagInfo.count >= 2 && tagInfo.selected === tagInfo.modes.length,
    "quiz tags should list components with selected = required, got " + JSON.stringify(tagInfo));
  check(tagInfo && /Quiz components|Συνθετικά/i.test(tagInfo.head) && !/Requires|Απαιτούνται/.test(tagInfo.head),
    "component header should name the component set, not the gate label, got " + JSON.stringify(tagInfo && tagInfo.head));
  const toggleOff = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const q = fScenarioGet(id).steps[0].quiz;
      const tags = Array.from(row.querySelectorAll('[data-sc-role^="quiz-mode-"]'));
      const hit = tags.find((t) => t.classList.contains("selected") && t.getAttribute("data-mode") !== q.mode && !t.disabled);
      if (!hit) return "noalt";
      const mode = hit.getAttribute("data-mode");
      hit.click();
      return mode;
    } catch (e) { return "err"; }
  }, scid);
  await p.waitForTimeout(700);
  const offInfo = await p.evaluate(([id, mode]) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const q = fScenarioGet(id).steps[0].quiz;
      const tag = row.querySelector('[data-sc-role="quiz-mode-' + mode + '"]');
      return { modes: q.modes, tag: tag ? tag.className : null, head: (row.querySelector(".scQuizReqHead") || {}).textContent || "" };
    } catch (e) { return "err"; }
  }, [scid, toggleOff]);
  check(typeof toggleOff === "string" && toggleOff !== "noalt" && toggleOff !== "err" &&
    offInfo && offInfo.modes.indexOf(toggleOff) < 0 && /free/.test(offInfo.tag || ""),
    "unselecting a tag should drop it from quiz.modes and mark it free, got " + JSON.stringify({ mode: toggleOff, off: offInfo }));
  // Update keeps the drawer-authored set while the mode is off.
  check(await rowButton(p, scid, ".scUpdate") === true, "tag-set Update should capture");
  const keptOff = await p.evaluate((id) => {
    try { return fScenarioGet(id).steps[0].quiz.modes || []; } catch (e) { return "err"; }
  }, scid);
  check(Array.isArray(keptOff) && keptOff.indexOf(toggleOff) < 0,
    "Update must keep the drawer set (off tag must stay off), got " + JSON.stringify({ mode: toggleOff, modes: keptOff }));
  // Restore for the following sections.
  await p.evaluate(([id, mode]) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const t = row.querySelector('[data-sc-role="quiz-mode-' + mode + '"]');
      if (t) t.click();
    } catch (e) {}
  }, [scid, toggleOff]);
  await p.waitForTimeout(700);
  const restoredModes = await p.evaluate((id) => {
    try { return fScenarioGet(id).steps[0].quiz.modes || []; } catch (e) { return "err"; }
  }, scid);
  check(Array.isArray(restoredModes) && restoredModes.indexOf(toggleOff) >= 0,
    "re-selecting a tag should restore it in quiz.modes, got " + JSON.stringify({ mode: toggleOff, modes: restoredModes }));
  const collapseInfo = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const head = row.querySelector(".scQuizReqHead");
      const list = row.querySelector(".scQuizReqList");
      const initial = { aria: head.getAttribute("aria-expanded"), display: list.style.display };
      head.click();
      const opened = { aria: head.getAttribute("aria-expanded"), display: list.style.display };
      head.click();
      const closed = { aria: head.getAttribute("aria-expanded"), display: list.style.display };
      return { initial, opened, closed };
    } catch (e) { return "err"; }
  }, scid);
  check(collapseInfo && collapseInfo.initial && collapseInfo.initial.aria === "false" && collapseInfo.initial.display === "none" &&
    collapseInfo.opened && collapseInfo.opened.aria === "true" && collapseInfo.opened.display === "" &&
    collapseInfo.closed && collapseInfo.closed.aria === "false" && collapseInfo.closed.display === "none",
    "component list should start collapsed and toggle open/closed, got " + JSON.stringify(collapseInfo));
  // --- 1b. v58.14 row architecture: two-row head + text/settings body ---
  const struct = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      if (!row) return "missing";
      const q = (s) => row.querySelectorAll(s).length;
      const pos = (s) => { const el = row.querySelector(s); return el ? getComputedStyle(el).position : "missing"; };
      return {
        top: q(".srowHead > .srowHeadTop"),
        main: q(".srowHead > .srowHeadMain"),
        text: q(".srowBody > .scStepText"),
        settings: q(".srowBody > .scStepSettings"),
        badges: q(".srowHeadTop .scStepBadges > *"),
        toggles: q(".scStepToggles > button"),
        actions: q(".scStepActions > button"),
        note: q(".scStepText > .scNoteToolbar") + "/" + q(".scStepText > .snote"),
        pos: [pos(".scDragHandle"), pos(".scCollapse"), pos(".delete")],
        gripInHead: q(".srowHead > .scDragHandle"),
        togglesInHead: q(".srowHead > .scStepToggles"),
        headDisplay: (() => { const h = row.querySelector(".srowHead"); return h ? getComputedStyle(h).display : "missing"; })(),
      };
    } catch (e) { return "err"; }
  }, scid);
  check(struct && struct.top === 1 && struct.main === 1 && struct.text === 1 && struct.settings === 1,
    "row should use the two-row head + text/settings body blocks, got " + JSON.stringify(struct));
  check(struct && struct.toggles === 2 && struct.actions === 6,
    "row head should group 2 toggles and 6 actions, got " + JSON.stringify(struct));
  check(struct && struct.note === "1/1", "toolbar + note should live in .scStepText, got " + JSON.stringify(struct && struct.note));
  check(struct && struct.pos.every((x) => x !== "absolute"), "row controls must stay in flow, got " + JSON.stringify(struct && struct.pos));
  check(struct && struct.gripInHead === 1 && struct.togglesInHead === 1 && struct.headDisplay === "grid",
    "head should be a grid with the grip and toggles as direct corner tracks, got " + JSON.stringify(struct));

  // --- 2. Update with no quiz signal keeps the authored task ---
  check(await armBox(p, "comp5", "compCarbonsCount"), "deselect/re-arm setup failed");
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  const beforeKept = await p.evaluate((id) => {
    try { const q = fScenarioGet(id).steps[0].quiz; return q ? { mode: q.mode, modes: q.modes } : null; } catch (e) { return "err"; }
  }, scid);
  await rowButton(p, scid, ".scUpdate");
  const afterKept = await p.evaluate((id) => {
    try { const q = fScenarioGet(id).steps[0].quiz; return q ? { mode: q.mode, modes: q.modes } : null; } catch (e) { return "err"; }
  }, scid);
  check(afterKept && beforeKept && afterKept.mode === beforeKept.mode &&
    JSON.stringify(afterKept.modes) === JSON.stringify(beforeKept.modes),
    "Update without a quiz signal must keep the task, got " + JSON.stringify({ before: beforeKept, after: afterKept }));

  // --- 3. master checkbox off makes it classic ---
  await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const box = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      if (box && box.checked) box.click();
    } catch (e) {}
  }, scid);
  await p.waitForTimeout(800);
  const afterRemove = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const box = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      return {
        quiz: fScenarioGet(id).steps[0].quiz || null,
        toggleChecked: box ? !!box.checked : null,
        quizRow: !!(row && row.querySelector('[data-sc-row="quiz"]')),
        namingHidden: (() => {
          const n = row && row.querySelector('input[data-sc-role="naming"]');
          return n ? getComputedStyle(n.closest("label")).display === "none" : null;
        })(),
      };
    } catch (e) { return "err"; }
  }, scid);
  check(afterRemove && afterRemove.quiz === null && afterRemove.toggleChecked === false &&
    afterRemove.quizRow === true && afterRemove.namingHidden === false,
    "master checkbox off should clear the quiz and restore classic rows, got " + JSON.stringify(afterRemove));

  // --- 4. just-solved capture never edits the step (v59.04) ---
  const capSet4 = await p.evaluate(() => {
    try { return fScenarioQuizCapableModes() || []; } catch (e) { return "err"; }
  });
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  check(await armBox(p, "comp5", "compCarbonsCount"), "setup arm failed");
  const r4 = await solveMode(p, "compCarbonsCount");
  check(r4 === true, "chain solve should succeed, got " + JSON.stringify(r4));
  check(await rowButton(p, scid, ".scUpdate") === true, "Update should capture the just-solved answer");
  const cap4 = await p.evaluate((id) => {
    try { return fScenarioGet(id).steps[0].quiz || null; } catch (e) { return "err"; }
  }, scid);
  check(cap4 && !cap4.preSolved,
    "a solved capture must not store preSolved, got " + JSON.stringify(cap4 && cap4.preSolved));
  const sortJoin = (arr) => JSON.stringify((Array.isArray(arr) ? arr.slice() : []).sort());
  check(cap4 && sortJoin(cap4.modes) === sortJoin(capSet4),
    "a solved capture must keep every capable comp required, got " + JSON.stringify({ capable: capSet4, modes: cap4 && cap4.modes }));
  check(cap4 && Array.isArray(cap4.modes) && cap4.modes.indexOf(cap4.mode) >= 0,
    "the primary mode must stay in the required set, got " + JSON.stringify(cap4 && { mode: cap4.mode, modes: cap4.modes }));

  // --- 5. select-ON Add with nothing armed stays classic (v58.44) ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  const addId = await makeScenario(p, "probeq-add", []);
  await p.evaluate((id) => {
    try { const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .scSave'); if (btn) btn.click(); } catch (e) {}
  }, addId);
  await p.waitForTimeout(800);
  const added = await p.evaluate((id) => {
    try { const sc = fScenarioGet(id); const s = sc.steps[sc.steps.length - 1]; return s ? { quiz: s.quiz || null } : null; } catch (e) { return "err"; }
  }, addId);
  check(added && !added.quiz,
    "select-ON Add must not create a quiz (explicit drawer enable only), got " + JSON.stringify(added));
  // The drawer master checkbox is the explicit author action; the start
  // select defaults to None and lists only the required comps.
  const startEnable = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const en = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      if (!en) return "missing";
      en.click();
      return true;
    } catch (e) { return "err"; }
  }, addId);
  await p.waitForTimeout(700);
  const startBefore = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const sel = row ? row.querySelector('[data-sc-role="quiz-start"]') : null;
      const q = fScenarioGet(id).steps[0].quiz || {};
      return { has: !!sel, value: sel ? sel.value : null, opts: sel ? Array.from(sel.options).map((o) => o.value) : [], modes: q.modes || [], start: q.startMode || null };
    } catch (e) { return "err"; }
  }, addId);
  check(startEnable === true, "quiz enable click failed, got " + JSON.stringify(startEnable));
  check(startBefore && startBefore.has && startBefore.value === "" && startBefore.start === null,
    "start select should default to None, got " + JSON.stringify(startBefore));
  check(startBefore && startBefore.opts.length === (startBefore.modes || []).length + 1,
    "start options should be None + required comps, got " + JSON.stringify(startBefore));
  const startPick = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const sel = row.querySelector('[data-sc-role="quiz-start"]');
      const mode = (fScenarioGet(id).steps[0].quiz.modes || [])[0];
      sel.value = mode;
      sel.dispatchEvent(new Event("change", { bubbles: true }));
      return { mode, stored: fScenarioGet(id).steps[0].quiz.startMode || null, marker: !!row.querySelector('.scQuizTag.is-start') };
    } catch (e) { return "err"; }
  }, addId);
  check(startPick && startPick.stored === startPick.mode && startPick.marker === true,
    "start select should store + mark the comp, got " + JSON.stringify(startPick));
  await p.evaluate((id) => { try { fScenarioUpdateStep(id, 0); } catch (e) {} }, addId);
  await p.waitForTimeout(900);
  const startKept = await p.evaluate((id) => {
    try { return fScenarioGet(id).steps[0].quiz.startMode || null; } catch (e) { return "err"; }
  }, addId);
  check(startKept === startPick.mode, "Update must preserve quiz.startMode, got " + JSON.stringify({ want: startPick.mode, got: startKept }));
  // v58.44 owner sequence: add step 1, enable its quiz, switch molecule, add
  // step 2, then reopen/re-render step 1. The molecule quiz must stay name
  // tags — never fall back to menu type chips from a stale quiz.mol.
  await p.evaluate(() => {
    try {
      const hit = Array.from(document.querySelectorAll(".menuLi")).find((x) => (x.getAttribute("id") || "") === "butane");
      if (hit) hit.click();
    } catch (e) {}
  });
  await p.waitForTimeout(1000);
  await p.evaluate((id) => {
    try { const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .scSave'); if (btn) btn.click(); } catch (e) {}
  }, addId);
  await p.waitForTimeout(1000);
  await p.evaluate((id) => { try { fScenarioRenderList(id); } catch (e) {} }, addId);
  await p.waitForTimeout(700);
  const seq = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const rows = Array.from(document.querySelectorAll('.scenarioPanel[data-scenario-id="' + id + '"] .srow'));
      return {
        steps: sc.steps.length,
        step0: {
          quizMol: sc.steps[0].quiz ? sc.steps[0].quiz.mol : null,
          labels: sc.steps[0].quiz ? (sc.steps[0].quiz.modeLabels || []) : [],
          tagTexts: rows[0] ? Array.from(rows[0].querySelectorAll(".scQuizTag")).map((t) => t.textContent) : [],
          real: rows[0] ? rows[0].querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
          chips: rows[0] ? rows[0].querySelectorAll('.scQuizTag.type').length : -1,
        },
        step1: {
          mol: sc.steps[1] ? sc.steps[1].selectedMol : null,
          quiz: sc.steps[1] ? (sc.steps[1].quiz || null) : null,
        },
      };
    } catch (e) { return "err"; }
  }, addId);
  check(seq && seq.steps === 2 && seq.step0 && seq.step0.quizMol === "ethane" &&
    seq.step0.real > 0 && seq.step0.chips === 0,
    "add-1/quiz/add-2 sequence must keep step 1 name tags, got " + JSON.stringify(seq));
  check(seq && seq.step0 && Array.isArray(seq.step0.labels) && seq.step0.labels.length > 0 &&
    !seq.step0.labels.some((l) => /main chain|bond type|functional group/i.test(l)),
    "stored modeLabels must be real component text, not type names, got " + JSON.stringify(seq && seq.step0 && seq.step0.labels));
  check(seq && seq.step0 && Array.isArray(seq.step0.tagTexts) && seq.step0.tagTexts.length > 0 &&
    !seq.step0.tagTexts.some((t) => /main chain|bond type|functional group/i.test(t)),
    "a non-live molecule step must show name fragments, not type labels, got " + JSON.stringify(seq && seq.step0 && seq.step0.tagTexts));
  check(seq && seq.step1 && seq.step1.mol === "butane" && !seq.step1.quiz,
    "the second added step should stay classic, got " + JSON.stringify(seq && seq.step1));

  // --- 6. menu capture (intent) + Present: gate before the first pick ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  check(await armBox(p, "comp5", "compCarbonsCount"), "menu setup arm failed");
  const menuAuthId = await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-menu-auth", true);
      window.__probeMenuAuth = scen.id;
      fScenarioBuildPanels(); fScenarioRenderList(scen.id);
      fScenarioSetPick("ethane", true); fScenarioSetPick("propane", true);
      fDeselectMol();
      return scen.id;
    } catch (e) { return "err"; }
  });
  await p.waitForTimeout(700);
  await p.evaluate((id) => {
    try { const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .scSave'); if (btn) btn.click(); } catch (e) {}
  }, menuAuthId);
  await p.waitForTimeout(900);
  const menuCap = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id); const s = sc.steps[sc.steps.length - 1];
      return s ? { quiz: s.quiz || null, mol: s.selectedMol, menu: !!(s.show && s.show.menu), subset: s.menuSubset || [] } : null;
    } catch (e) { return "err"; }
  }, menuAuthId);
  check(menuCap && menuCap.quiz && menuCap.quiz.mol === "" && !menuCap.quiz.modes,
    "menu Add should store a deferred task without a set, got " + JSON.stringify(menuCap && menuCap.quiz));
  check(menuCap && menuCap.mol === null && menuCap.menu === true && (menuCap.subset || []).length === 2,
    "menu step should be molecule-less with a 2-pick menu, got " + JSON.stringify(menuCap));
  // Present the authored card (append a trailing plain step through a copy).
  const menuPresentId = await p.evaluate(() => {
    try {
      const sc = fScenarioGet(window.__probeMenuAuth);
      const tail = fScenarioDefaults({ selectedMol: "ethane" }, sc.steps.length);
      tail.lang = "en";
      sc.steps.push(tail);
      fScenarioRenderList(sc.id);
      fScenarioPresentBegin(sc.id, 0);
      return sc.id;
    } catch (e) { return "err:" + String((e && e.message) || e).slice(0, 60); }
  });
  await p.waitForTimeout(1300);
  st = await state(p);
  check(st.step === 0 && !st.target && st.todo && st.todo.length === 0,
    "menu step should apply undone and unarmed, got " + JSON.stringify({ i: st.step, t: st.target, todo: st.todo }));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 0, "menu quiz step must not advance before a molecule is picked, got index " + st.step);
  check(await menuPick(p, "propane") === true, "menu pick should work in Present");
  st = await state(p);
  check(st.step === 0 && !st.target && st.prompt && /Select a component/i.test(st.prompt.text),
    "menu pick must stay idle with the start prompt, got " + JSON.stringify({ i: st.step, t: st.target, p: st.prompt }));
  check(st.quiz && st.quiz.mol === "" && st.quiz.mode === "compCarbonsCount", "deferred task should stay per-molecule");
  check(await armBox(p, "comp5", "compCarbonsCount"), "menu idle chain arm failed");
  st = await state(p);
  check(st.target === "compCarbonsCount", "menu student pick should arm the deferred quiz, got " + JSON.stringify(st.target));
  const rm6 = await solveAllTodos(p);
  check(rm6 === true, "menu quiz should be solvable, got " + JSON.stringify(rm6));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "solved menu quiz should advance, got index " + st.step);

  // --- 7. pinned Present step: auto-arm, gate, all-todo completion ---
  await openMol(p, "ethane");
  const gateId = await makeScenario(p, "probeq-gate", [
    { selectedMol: "ethane" },
    { selectedMol: "ethane", quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane" } },
    { selectedMol: "ethane" },
  ]);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, gateId);
  await p.waitForTimeout(1300);
  st = await state(p);
  check(st.present === true && st.step === 0 && !st.target, "passive step should apply clean, got " + JSON.stringify({ t: st.target, i: st.step }));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1 && !st.target && st.prompt && /Select a component/i.test(st.prompt.text) && !st.task,
    "Present must start the quiz idle with the start prompt, got " + JSON.stringify({ i: st.step, t: st.target, p: st.prompt, task: st.task }));
  // legacy (no stored set) => all capable comps are required
  check(st.todo && st.todo.indexOf("compCarbonsCount") >= 0 && st.todo.indexOf("compBondType") >= 0,
    "legacy step should require every capable comp, got " + JSON.stringify(st.todo));
  // the student picks the chain component
  check(await armBox(p, "comp5", "compCarbonsCount"), "student chain arm failed");
  st = await state(p);
  check(st.step === 1 && st.target === "compCarbonsCount" && st.task === "compCarbonsCount",
    "student pick should arm the chain, got " + JSON.stringify({ i: st.step, t: st.target, task: st.task }));
  // v58.12: student-mode hover + 3D picking on an armed quiz step
  const hovQuiz = await hoverAtom(p, 1);
  check(hovQuiz === true, "hover ring should show on a Present quiz step, got " + JSON.stringify(hovQuiz));
  const pickQuiz = await pickingState(p);
  if (pickQuiz === "noapplet" || pickQuiz === "err") warn("3D applet unavailable — picking assertions skipped");
  else check(pickQuiz === "atom", "3D picking should be armed on a quiz step, got " + JSON.stringify(pickQuiz));
  check(await clickAtom(p, 1), "student pick should land");
  st = await state(p);
  check(st.sel.length === 1, "student pick should register, got " + JSON.stringify(st.sel));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "unsolved gate must hold the step, got index " + st.step);
  // clear the partial pick so the solve below starts blank (Esc = student
  // clear; the task stays armed)
  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  check(await armBox(p, "comp5", "compCarbonsCount"), "student chain re-arm failed");
  const r7 = await solveMode(p, "compCarbonsCount");
  check(r7 === true, "student chain solve should succeed, got " + JSON.stringify(r7));
  st = await state(p);
  check(st.todo && st.todo.length === 1 && st.todo[0] === "compBondType",
    "after the chain only the bond-type comp should remain, got " + JSON.stringify(st.todo));
  // post-solve freedom: reps pickable while required comps remain
  check(await clickAtom(p, 1), "post-solve pick should land");
  st = await state(p);
  check(st.sel.length === 1, "reps should be pickable while required comps remain, got " + JSON.stringify(st.sel));
  // v58.13: clearing picks must not erase the solved green in 3D (the cyan
  // selection and the classic green share the atom-color channel; the
  // empty-canvas clear used to wipe both while 2D kept its component channel).
  await install3DLog(p);
  const emptyPt = await emptyCanvasPoint(p);
  check(!!emptyPt, "could not find an empty canvas point");
  const _wipeRe = /^\s*select all;\s*selectionHalos off; color bonds none; color atoms none;\s*$/;
  if (emptyPt) {
    await p.evaluate(() => { window.__muler3DLog = []; });
    await p.mouse.click(emptyPt.x, emptyPt.y);
    await p.waitForTimeout(700);
    const clearLog = await p.evaluate(() => window.__muler3DLog);
    const wipeIdx = clearLog.findIndex((s) => _wipeRe.test(s));
    if (wipeIdx >= 0) {
      check(clearLog.slice(wipeIdx).some((s) => /X79dc6d/.test(s)),
        "a 3D wipe on a solved display must be followed by the green restore, got " + JSON.stringify(clearLog.slice(wipeIdx, wipeIdx + 2)));
    }
    // A second empty click has nothing to erase: it must not touch the paint.
    await p.evaluate(() => { window.__muler3DLog = []; });
    await p.mouse.click(emptyPt.x, emptyPt.y);
    await p.waitForTimeout(600);
    const clearLog2 = await p.evaluate(() => window.__muler3DLog);
    check(!clearLog2.some((s) => _wipeRe.test(s)),
      "empty-canvas clear with no picks must not wipe the 3D paint, got " + JSON.stringify(clearLog2.slice(0, 2)));
  }
  // Same contract for toggle-to-empty (free practice pick, clicked off).
  await p.evaluate(() => { window.__muler3DLog = []; });
  await clickAtom(p, 1);
  await clickAtom(p, 1);
  await p.waitForTimeout(600);
  const toggleLog = await p.evaluate(() => window.__muler3DLog);
  check(toggleLog.some((s) => /X79dc6d/.test(s)),
    "toggle-to-empty on a solved display should restore the 3D green, got " + JSON.stringify(toggleLog.slice(-2)));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "gate must hold while a required comp remains, got index " + st.step);
  const r7b = await solveAllTodos(p);
  check(r7b === true, "all required comps should be solvable, got " + JSON.stringify(r7b));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 2, "fully solved step must advance, got index " + st.step);
  // v58.12: a passive step keeps the ring off and the applet picking OFF.
  const hovPlain = await hoverAtom(p, 1);
  check(hovPlain === false, "hover ring should stay off on a passive step, got " + JSON.stringify(hovPlain));
  const pickPlain = await pickingState(p);
  if (pickPlain !== "noapplet" && pickPlain !== "err") {
    check(pickPlain === "off", "3D picking should be off on a passive step, got " + JSON.stringify(pickPlain));
  }
  // revisit: solved display, no re-quiz, free bounds
  await clickBtn(p, "scPrev");
  st = await state(p);
  check(st.step === 1 && !st.target && st.todo && st.todo.length === 0,
    "revisit should show the solved display, got " + JSON.stringify({ i: st.step, t: st.target, todo: st.todo }));
  const selBox = await p.evaluate(() => {
    try { return !!document.querySelector("#nameAnalysis .nameCompBox.selected"); } catch (e) { return "err"; }
  });
  check(selBox === true, "revisit should select the solved component box, got " + JSON.stringify(selBox));
  check(await clickAtom(p, 1), "free-bounds pick should land");
  st = await state(p);
  check(st.sel.length === 1, "solved step should allow free exploration, got " + JSON.stringify(st.sel));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 2, "solved step should advance freely, got index " + st.step);

  // --- 8. requireSolution:false never gates but still arms ---
  await openMol(p, "ethane");
  const freeId = await makeScenario(p, "probeq-free", [
    { selectedMol: "ethane", quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane" }, requireSolution: false },
    { selectedMol: "ethane" },
  ]);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, freeId);
  await p.waitForTimeout(1300);
  st = await state(p);
  check(st.step === 0 && !st.target && st.prompt && /Select a component/i.test(st.prompt.text),
    "ungated quiz step should start idle with the prompt, got " + JSON.stringify({ t: st.target, p: st.prompt }));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "requireSolution:false must not gate, got index " + st.step);

  // --- 9. stored set wins over capability (v58.11) ---
  await openMol(p, "ethane");
  const narrowId = await makeScenario(p, "probeq-modes", [
    { selectedMol: "ethane", quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane", modes: ["compCarbonsCount"], modeLabels: ["eth"] } },
    { selectedMol: "ethane" },
  ]);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, narrowId);
  await p.waitForTimeout(1300);
  st = await state(p);
  check(st.step === 0 && st.todo && st.todo.length === 1 && st.todo[0] === "compCarbonsCount",
    "stored set should narrow the requirement, got " + JSON.stringify(st.todo));
  check(!st.target && st.prompt && /Select a component/i.test(st.prompt.text),
    "stored-set quiz should start idle with the prompt, got " + JSON.stringify({ t: st.target, p: st.prompt }));
  const freePaint = await p.evaluate(() => {
    const c = (id) => { const e = document.getElementById(id); return e ? e.className : null; };
    return { req: c("comp5"), free: c("comp6") };
  });
  check(/quizTodo/.test(freePaint.req || "") && /freeComp/.test(freePaint.free || ""),
    "v58.31: required comp quizTodo + unselected capable comp freeComp, got " + JSON.stringify(freePaint));
  const r9 = await solveMode(p, "compCarbonsCount");
  check(r9 === true, "narrowed chain should solve, got " + JSON.stringify(r9));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "solving the stored set must open the gate (bond type not required), got index " + st.step);

  // --- 10. author solves never seed a step; steps do not share progress ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  const preId = await makeScenario(p, "probeq-settings-only", [{ selectedMol: "ethane" }]);
  check(await armBox(p, "comp5", "compCarbonsCount"), "settings-only setup arm failed");
  check(await solveMode(p, "compCarbonsCount") === true, "settings-only chain solve failed");
  check(await solveMode(p, "compBondType") === true, "settings-only bond-type solve failed");
  check(await rowButton(p, preId, ".scUpdate") === true, "settings-only Update failed");
  const preCap = await p.evaluate((id) => {
    try { const q = fScenarioGet(id).steps[0].quiz; return q ? { modes: q.modes, mode: q.mode, pre: q.preSolved } : null; } catch (e) { return "err"; }
  }, preId);
  check(preCap && !preCap.pre,
    "capture must not store preSolved, got " + JSON.stringify(preCap && preCap.pre));
  check(preCap && Array.isArray(preCap.modes) && preCap.modes.indexOf("compCarbonsCount") >= 0 &&
    preCap.modes.indexOf("compBondType") >= 0,
    "solved comps must stay required after capture, got " + JSON.stringify(preCap && preCap.modes));
  // A comp solved in free mode is still toggleable in the drawer.
  const togSolved = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const hit = row ? row.querySelector('[data-sc-role="quiz-mode-compBondType"]') : null;
      if (!hit) return "missing";
      hit.click();
      return (fScenarioGet(id).steps[0].quiz.modes || []).indexOf("compBondType") < 0 ? "removed" : "kept";
    } catch (e) { return "err"; }
  }, preId);
  check(togSolved === "removed", "a solved comp must remain toggleable, got " + JSON.stringify(togSolved));
  // Restore it, then add a trailing step so the gate has somewhere to go.
  await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const hit = row ? row.querySelector('[data-sc-role="quiz-mode-compBondType"]') : null;
      if (hit) hit.click();
    } catch (e) {}
  }, preId);
  await p.waitForTimeout(600);
  await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const tail = fScenarioDefaults({ selectedMol: "ethane" }, sc.steps.length);
      tail.lang = "en";
      sc.steps.push(tail);
      fScenarioRenderList(id);
    } catch (e) {}
  }, preId);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, preId);
  await p.waitForTimeout(1400);
  st = await state(p);
  check(st.step === 0 && st.todo && st.todo.length > 0,
    "author-solved step must start unsolved, got " + JSON.stringify({ step: st.step, todo: st.todo }));
  check(!!st.prompt, "an idle quiz step should show the start prompt, got " + JSON.stringify(st.prompt));
  const scopeKeys = await p.evaluate(() => {
    try {
      const cur = fMulerQuizSolvedKeyFor("ethane");
      const other = String(cur || "").replace("#0|", "#1|");
      const map = window.__mulerQuizSolved || {};
      return { cur: cur, other: other, otherMarks: map[other] || null };
    } catch (e) { return "err"; }
  });
  check(scopeKeys && /#0\|/.test(scopeKeys.cur || "") && scopeKeys.cur !== scopeKeys.other,
    "present progress must be keyed by step, got " + JSON.stringify(scopeKeys));
  check(scopeKeys && !scopeKeys.otherMarks,
    "another step's key must start empty, got " + JSON.stringify(scopeKeys && scopeKeys.otherMarks));

  // --- 11. forward jumps land on the next step (no gate skipping) ---
  await openMol(p, "ethane");
  const jumpId = await makeScenario(p, "probeq-jump", [
    { selectedMol: "ethane" },
    { selectedMol: "ethane", quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane" } },
    { selectedMol: "ethane" },
  ]);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, jumpId);
  await p.waitForTimeout(1300);
  await p.evaluate(() => { try { fScenarioGo(3); } catch (e) {} });
  await p.waitForTimeout(1000);
  st = await state(p);
  check(st.step === 1, "a forward jump must clamp to the next step, got index " + st.step);
  await p.evaluate(() => { location.hash = "#step=3"; });
  await p.waitForTimeout(1000);
  st = await state(p);
  check(st.step === 1, "a hash jump must not skip the gated step, got index " + st.step);

  // --- 12. reselect resets solved (authoring) ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  check(await armBox(p, "comp5", "compCarbonsCount"), "reselect setup arm failed");
  check(await solveMode(p, "compCarbonsCount") === true, "reselect chain solve failed");
  st = await state(p);
  check(st.solved && st.solved.ethane && st.solved.ethane.compCarbonsCount === true,
    "solving should mark progress, got " + JSON.stringify(st.solved));
  await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const hit = items.find((x) => (x.getAttribute("id") || "") === "ethane");
      if (hit) hit.click();
    } catch (e) {}
  });
  await p.waitForTimeout(1200);
  st = await state(p);
  check(st.solved && (!st.solved.ethane || !st.solved.ethane.compCarbonsCount),
    "reselecting the molecule should reset solved progress, got " + JSON.stringify(st.solved));

  // --- 13. solved display locks reps (authoring) ---
  check(await armBox(p, "comp5", "compCarbonsCount"), "reps-lock re-arm failed");
  check(await solveMode(p, "compCarbonsCount") === true, "reps-lock solve failed");
  const repsLocked = await p.evaluate(() => {
    try { return fMulerSelectRepsLocked(); } catch (e) { return "err"; }
  });
  check(repsLocked === true, "solved display should lock reps, got " + JSON.stringify(repsLocked));
  check(await clickAtom(p, 1), "locked click still resolves");
  st = await state(p);
  check(st.sel.length === 0, "locked reps should not take picks, got " + JSON.stringify(st.sel));

  // --- 14. chain rule (v58.33): locants can't be free while the chain is required ---
  await openMol(p, "pentanone_2");
  const ruleId = await makeScenario(p, "probeq-chainrule", [{
    selectedMol: "pentanone_2",
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "pentanone_2", modes: ["compCarbonsCount"], modeLabels: ["main chain"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof ruleId === "string" && ruleId.indexOf("err:") !== 0, "chain-rule scenario creation failed: " + ruleId);
  const ruleTag = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const loc = row ? row.querySelector('[data-sc-role="quiz-mode-compBondPos"]') : null;
      return loc ? { cls: loc.className, aria: loc.getAttribute("aria-pressed") } : "missing";
    } catch (e) { return "err"; }
  }, ruleId);
  check(ruleTag && /chain-locked/.test(ruleTag.cls || "") && ruleTag.aria === "true",
    "locant tag should be locked+selected while the chain is required, got " + JSON.stringify(ruleTag));
  const lockedModes = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const loc = row.querySelector('[data-sc-role="quiz-mode-compBondPos"]');
      if (!loc) return "missing";
      loc.click();
      return fScenarioGet(id).steps[0].quiz.modes;
    } catch (e) { return "err"; }
  }, ruleId);
  await p.waitForTimeout(500);
  check(Array.isArray(lockedModes) && lockedModes.indexOf("compBondPos") < 0,
    "locked locant click must not change quiz.modes, got " + JSON.stringify(lockedModes));
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, ruleId);
  await p.waitForTimeout(1700);
  const rulePresent = await p.evaluate(() => {
    try {
      const c = (id) => { const e = document.getElementById(id); return e ? e.className : null; };
      let todo = null;
      try { const ps = fScenarioPresent(); todo = fScenarioQuizTodo(ps.steps[ps.index]); } catch (e) {}
      return { loc: c("comp4"), todo };
    } catch (e) { return "err"; }
  });
  check(rulePresent && /quizTodo/.test(rulePresent.loc || "") &&
    Array.isArray(rulePresent.todo) && rulePresent.todo.indexOf("compBondPos") >= 0,
    "legacy chain-only set must require the locant at Present, got " + JSON.stringify(rulePresent));
  await p.evaluate(() => { try { fScenarioExitPresent(); } catch (e) {} });
  await p.waitForTimeout(600);

  // --- 14b. aligned block (v59.33): the chain drives every locant tag ---
  await openMol(p, "pentanone_2");
  const alignId = await makeScenario(p, "probeq-align", [{
    selectedMol: "pentanone_2",
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "pentanone_2", modes: ["compCarbonsCount", "compBondPos", "compSuffix"], modeLabels: ["main chain", "locant", "functional group"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof alignId === "string" && alignId.indexOf("err:") !== 0, "align scenario creation failed: " + alignId);
  const clickTag = (id, mode) => p.evaluate(([sid, m]) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + sid + '"] .srow');
      const t = row ? row.querySelector('[data-sc-role="quiz-mode-' + m + '"]') : null;
      if (!t) return "missing";
      t.click();
      return true;
    } catch (e) { return "err"; }
  }, [id, mode]);
  const tagState = (id, mode) => p.evaluate(([sid, m]) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + sid + '"] .srow');
      const t = row ? row.querySelector('[data-sc-role="quiz-mode-' + m + '"]') : null;
      const q = fScenarioGet(sid).steps[0].quiz;
      return { modes: (q.modes || []).slice(), cls: t ? t.className : null, aria: t ? t.getAttribute("aria-pressed") : null };
    } catch (e) { return "err"; }
  }, [id, mode]);
  check(await clickTag(alignId, "compCarbonsCount") === true, "chain tag click failed");
  await p.waitForTimeout(500);
  const alignOff = await tagState(alignId, "compBondPos");
  check(alignOff && Array.isArray(alignOff.modes) && alignOff.modes.indexOf("compCarbonsCount") < 0 && alignOff.modes.indexOf("compBondPos") < 0 &&
    /free/.test(alignOff.cls || "") && !/chain-locked/.test(alignOff.cls || "") && alignOff.aria === "false",
    "deselecting the chain must free every locant too, got " + JSON.stringify(alignOff));
  check(await clickTag(alignId, "compBondPos") === true, "locant tag click failed");
  await p.waitForTimeout(400);
  const alignNoop = await tagState(alignId, "compBondPos");
  check(alignNoop && Array.isArray(alignNoop.modes) && alignNoop.modes.indexOf("compBondPos") < 0 && alignNoop.modes.indexOf("compCarbonsCount") < 0,
    "a locant tag must never toggle on its own, got " + JSON.stringify(alignNoop));
  check(await clickTag(alignId, "compCarbonsCount") === true, "chain tag re-click failed");
  await p.waitForTimeout(500);
  const alignOn = await tagState(alignId, "compBondPos");
  check(alignOn && Array.isArray(alignOn.modes) && alignOn.modes.indexOf("compCarbonsCount") >= 0 && alignOn.modes.indexOf("compBondPos") >= 0 &&
    /selected/.test(alignOn.cls || "") && /chain-locked/.test(alignOn.cls || "") && alignOn.aria === "true",
    "requiring the chain must require every locant too, got " + JSON.stringify(alignOn));
  // Legacy locant-only set: the drawer repairs it by pulling the chain in.
  const legacyAlignId = await makeScenario(p, "probeq-alignlegacy", [{
    selectedMol: "pentanone_2",
    quiz: { kind: "nameComp", mode: "compBondPos", mol: "pentanone_2", modes: ["compBondPos"], modeLabels: ["locant"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  const legacyAlign = await tagState(legacyAlignId, "compCarbonsCount");
  check(legacyAlign && Array.isArray(legacyAlign.modes) && legacyAlign.modes.indexOf("compCarbonsCount") >= 0 && legacyAlign.modes.indexOf("compBondPos") >= 0,
    "legacy locant-only set must be repaired to chain+locants, got " + JSON.stringify(legacyAlign));

  // --- 15. quiz master checkbox after Go (v58.36): no stale molecule guard ---
  await openMol(p, "ethane");
  const goId = await makeScenario(p, "probeq-goquiz", [
    { selectedMol: "ethane" },
    { selectedMol: "butane" },
  ]);
  check(typeof goId === "string" && goId.indexOf("err:") !== 0, "go-quiz scenario creation failed: " + goId);
  await p.evaluate((id) => { try { fScenarioSetActive(id); fScenarioGo(1); } catch (e) {} }, goId);
  await p.waitForTimeout(1700);
  const goClick = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow[data-idx="1"]');
      const box = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      if (!box) return "missing";
      box.click();
      return true;
    } catch (e) { return "err"; }
  }, goId);
  await p.waitForTimeout(900);
  const goAfter = await p.evaluate((id) => {
    try { return { quiz: fScenarioGet(id).steps[1].quiz || null, mol: (typeof selectedMol !== "undefined") ? selectedMol : null }; }
    catch (e) { return "err"; }
  }, goId);
  check(goClick === true && goAfter && goAfter.quiz && Array.isArray(goAfter.quiz.modes) && goAfter.quiz.modes.length > 0,
    "quiz checkbox after Go must enable the step's loaded molecule, got " + JSON.stringify(goAfter));

  // --- 16. menu quizzes (v58.37): all capable per picked molecule, no tags ---
  await openMol(p, "ethane");
  const menuId = await makeScenario(p, "probeq-menuquiz", [{
    selectedMol: null,
    menuSubset: ["ethane", "butane"],
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "" },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof menuId === "string" && menuId.indexOf("err:") !== 0, "menu-quiz scenario creation failed: " + menuId);
  const menuDrawer = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      return {
        tags: row ? row.querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
        types: row ? row.querySelectorAll('.scQuizTag.type').length : 0,
        hint: (row && row.querySelector(".scQuizMenuHint") || {}).textContent || "",
        enabled: !!(row && row.querySelector('input[data-sc-role="quiz-enabled"]') && row.querySelector('input[data-sc-role="quiz-enabled"]').checked),
      };
    } catch (e) { return "err"; }
  }, menuId);
  check(menuDrawer && menuDrawer.tags === 0 && menuDrawer.types > 0 && /picked molecule|μόριο/i.test(menuDrawer.hint) && menuDrawer.enabled === true,
    "menu quiz drawer should show type chips (no name tags), got " + JSON.stringify(menuDrawer));
  // Type chips are switchable (v58.38): unselect bond type.
  const typeToggle = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const chip = row ? row.querySelector('[data-sc-role="quiz-type-bondType"]') : null;
      if (!chip) return "missing";
      chip.click();
      const q = fScenarioGet(id).steps[0].quiz;
      return { types: q.types || null, cls: chip.className };
    } catch (e) { return "err"; }
  }, menuId);
  await p.waitForTimeout(400);
  check(typeToggle && Array.isArray(typeToggle.types) && typeToggle.types.indexOf("bondType") < 0 && /free/.test(typeToggle.cls || ""),
    "unselecting a quiz type should persist quiz.types and mark the chip free, got " + JSON.stringify(typeToggle));
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, menuId);
  await p.waitForTimeout(1400);
  check(await menuPick(p, "ethane"), "menu quiz should list ethane");
  const menuTodo = await p.evaluate(() => {
    try { const ps = fScenarioPresent(); return fScenarioQuizTodo(ps.steps[ps.index]); } catch (e) { return "err"; }
  });
  check(Array.isArray(menuTodo) && menuTodo.length === 1 && menuTodo[0] === "compCarbonsCount",
    "typed menu quiz should require only the selected types, got " + JSON.stringify(menuTodo));
  const menuFree = await p.evaluate(() => {
    try {
      const e = document.getElementById("comp6");
      return e ? e.className : null;
    } catch (e) { return "err"; }
  });
  check(/freeComp/.test(menuFree || ""), "unselected type should be pre-solved on the picked molecule, got " + JSON.stringify(menuFree));
  const menuSolved = await solveAllTodos(p);
  check(menuSolved === true, "menu quiz todos should solve, got " + JSON.stringify(menuSolved));
  const menuGate = await p.evaluate(() => {
    try { const ps = fScenarioPresent(); return fScenarioNavAllowed(ps.index + 1); } catch (e) { return "err"; }
  });
  check(menuGate === true, "solved menu quiz should pass the gate, got " + JSON.stringify(menuGate));
  await p.evaluate(() => { try { fScenarioExitPresent(); } catch (e) {} });
  await p.waitForTimeout(600);

  // --- 17. each step's quiz is independent (v58.39) ---
  await openMol(p, "ethane");
  const indepId = await makeScenario(p, "probeq-step-indep", [
    {
      selectedMol: "ethane",
      quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane", modes: ["compCarbonsCount"], modeLabels: ["main chain"] },
      requireSolution: true,
      showExtra: { nameClick: true, naming: true },
    },
    {
      selectedMol: "ethane",
      quiz: { kind: "nameComp", mode: "compBondType", mol: "ethane", modes: ["compBondType"], modeLabels: ["bond type"] },
      requireSolution: true,
      showExtra: { nameClick: true, naming: true },
    },
  ]);
  check(typeof indepId === "string" && indepId.indexOf("err:") !== 0, "step-independence scenario creation failed: " + indepId);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, indepId);
  await p.waitForTimeout(1600);
  const indep0 = await p.evaluate(() => {
    try {
      const ps = fScenarioPresent();
      return { todo: fScenarioQuizTodo(ps.steps[0]), bond: fMulerQuizIsSolved("compBondType") };
    } catch (e) { return "err"; }
  });
  check(indep0 && Array.isArray(indep0.todo) && indep0.todo.indexOf("compCarbonsCount") >= 0,
    "step 0 should require only its own main-chain task, got " + JSON.stringify(indep0));
  check(indep0 && indep0.bond === true,
    "step 0 free complement should be marked in step 0's scope, got " + JSON.stringify(indep0));
  check(await solveAllTodos(p) === true, "step-independence step 0 solve failed");
  await p.evaluate(() => { try { fScenarioGo(1); } catch (e) {} });
  await p.waitForTimeout(1600);
  const indep1 = await p.evaluate(() => {
    try {
      const ps = fScenarioPresent();
      return { step: ps.index, todo: fScenarioQuizTodo(ps.steps[1]), bond: fMulerQuizIsSolved("compBondType") };
    } catch (e) { return "err"; }
  });
  check(indep1 && indep1.step === 1, "step independence navigation failed, got " + JSON.stringify(indep1));
  check(indep1 && Array.isArray(indep1.todo) && indep1.todo.indexOf("compBondType") >= 0,
    "step 1 must require its own bond-type task, got " + JSON.stringify(indep1));
  check(indep1 && indep1.bond === false,
    "step 1 must not inherit step 0's solved/free state, got " + JSON.stringify(indep1));
  await p.evaluate(() => { try { fScenarioExitPresent(); } catch (e) {} });
  await p.waitForTimeout(600);

  // --- 18. a menu type with no target on the picked molecule is an empty task ---
  await openMol(p, "ethane");
  const noCapId = await makeScenario(p, "probeq-menu-nocap", [{
    selectedMol: null,
    menuSubset: ["ethane", "butane"],
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "", types: ["fg"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof noCapId === "string" && noCapId.indexOf("err:") !== 0, "no-capable menu scenario creation failed: " + noCapId);
  await p.evaluate((id) => { try { fScenarioPresentBegin(id, 0); } catch (e) {} }, noCapId);
  await p.waitForTimeout(1400);
  check(await menuPick(p, "ethane"), "no-capable menu quiz should list ethane");
  await p.waitForTimeout(700);
  const noCap = await p.evaluate(() => {
    try {
      const ps = fScenarioPresent();
      return {
        req: fScenarioQuizRequiredModes(ps.steps[ps.index]),
        todo: fScenarioQuizTodo(ps.steps[ps.index]),
        gate: fScenarioNavAllowed(ps.index + 1),
      };
    } catch (e) { return "err"; }
  });
  check(noCap && Array.isArray(noCap.req) && noCap.req.length === 0,
    "a selected type with no capable comp should yield an empty required set, got " + JSON.stringify(noCap));
  check(noCap && Array.isArray(noCap.todo) && noCap.todo.length === 0,
    "an empty required set must not fall back to all capable, got " + JSON.stringify(noCap));
  check(noCap && noCap.gate === true,
    "a menu quiz with no applicable type should not gate, got " + JSON.stringify(noCap));
  await p.evaluate(() => { try { fScenarioExitPresent(); } catch (e) {} });
  await p.waitForTimeout(600);

  // --- 19. the chain/locant cascade cannot leave zero menu types ---
  const zeroId = await makeScenario(p, "probeq-zero-types", [{
    selectedMol: null,
    menuSubset: ["ethane", "butane"],
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "", types: ["mainChain", "locant"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof zeroId === "string" && zeroId.indexOf("err:") !== 0, "zero-type scenario creation failed: " + zeroId);
  const zero = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const chip = row ? row.querySelector('[data-sc-role="quiz-type-mainChain"]') : null;
      if (!chip) return "missing";
      const before = (fScenarioGet(id).steps[0].quiz.types || []).slice();
      chip.click();
      const after = (fScenarioGet(id).steps[0].quiz.types || []).slice();
      return { before, after };
    } catch (e) { return "err"; }
  }, zeroId);
  check(zero && Array.isArray(zero.before) && zero.before.length === 2 &&
    Array.isArray(zero.after) && zero.after.indexOf("mainChain") >= 0 && zero.after.length > 0,
    "freeing mainChain+locant must not persist an empty type set, got " + JSON.stringify(zero));

  // --- 20. Update preserves the authored menu type subset ---
  const updateTypesId = await makeScenario(p, "probeq-menu-types-update", [{
    selectedMol: null,
    menuSubset: ["ethane", "butane"],
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "", types: ["mainChain", "locant", "bondType", "bondPos", "fg", "groupLocants", "branch", "substituent"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof updateTypesId === "string" && updateTypesId.indexOf("err:") !== 0, "menu type update scenario creation failed: " + updateTypesId);
  const typeBefore = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const chip = row ? row.querySelector('[data-sc-role="quiz-type-bondType"]') : null;
      if (chip) chip.click();
      return (fScenarioGet(id).steps[0].quiz.types || []).slice();
    } catch (e) { return "err"; }
  }, updateTypesId);
  check(Array.isArray(typeBefore) && typeBefore.indexOf("bondType") < 0,
    "menu type toggle setup failed, got " + JSON.stringify(typeBefore));
  await p.evaluate(() => {
    try {
      window.MulerUserSelection.active = true;
      window.MulerQuizTarget = "compCarbonsCount";
    } catch (e) {}
  });
  await p.evaluate((id) => { try { fScenarioUpdateStep(id, 0); } catch (e) {} }, updateTypesId);
  await p.waitForTimeout(900);
  const typeAfter = await p.evaluate((id) => {
    try { return (fScenarioGet(id).steps[0].quiz.types || []).slice(); } catch (e) { return "err"; }
  }, updateTypesId);
  check(Array.isArray(typeAfter) && typeAfter.indexOf("bondType") < 0,
    "Update must keep the authored menu type subset, got " + JSON.stringify({ before: typeBefore, after: typeAfter }));
  await p.evaluate(() => {
    try { window.MulerQuizTarget = null; window.MulerUserSelection.active = false; } catch (e) {}
    try { if (typeof fMulerQuizDisarm === "function") fMulerQuizDisarm(); } catch (e) {}
  });

  // --- 21. a required hidden/atom-less tag stays removable ---
  await openMol(p, "ethane");
  await p.evaluate(() => {
    try {
      window.nameHiddenComps = ["comp6"];
      if (typeof fShowNameAnalysis === "function") fShowNameAnalysis();
    } catch (e) {}
  });
  const hiddenId = await makeScenario(p, "probeq-hidden-tag", [{
    selectedMol: "ethane",
    quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane", modes: ["compCarbonsCount", "compBondType"], modeLabels: ["main chain", "bond type"] },
    requireSolution: true,
    showExtra: { nameClick: true, naming: true },
  }]);
  check(typeof hiddenId === "string" && hiddenId.indexOf("err:") !== 0, "hidden-tag scenario creation failed: " + hiddenId);
  const hidden = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const tag = row ? row.querySelector('[data-sc-role="quiz-mode-compBondType"]') : null;
      if (!tag) return "missing";
      const before = (fScenarioGet(id).steps[0].quiz.modes || []).slice();
      const disabled = tag.disabled;
      tag.click();
      const after = (fScenarioGet(id).steps[0].quiz.modes || []).slice();
      return { before, disabled, after };
    } catch (e) { return "err"; }
  }, hiddenId);
  check(hidden && hidden.disabled === false && Array.isArray(hidden.before) && hidden.before.indexOf("compBondType") >= 0 &&
    Array.isArray(hidden.after) && hidden.after.indexOf("compBondType") < 0,
    "a required hidden component tag should stay removable, got " + JSON.stringify(hidden));
  await p.evaluate(() => {
    try {
      window.nameHiddenComps = [];
      if (typeof fShowNameAnalysis === "function") fShowNameAnalysis();
    } catch (e) {}
  });

  // --- 22. molecule step keeps real name tags; menu steps keep type chips ---
  await openMol(p, "ethane");
  const molTagsId = await makeScenario(p, "probeq-mol-tags", [{ selectedMol: "ethane" }]);
  check(typeof molTagsId === "string" && molTagsId.indexOf("err:") !== 0, "molecule-tags scenario creation failed: " + molTagsId);
  const molTagsToggle = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const box = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      if (!box) return "missing";
      box.click();
      return true;
    } catch (e) { return "err"; }
  }, molTagsId);
  await p.waitForTimeout(800);
  const molTags = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const q = sc && sc.steps[0].quiz;
      return {
        quiz: q ? { mode: q.mode, mol: q.mol, modes: q.modes, types: q.types } : null,
        menuSubset: (sc && sc.steps[0].menuSubset || []).length,
        realTags: row ? row.querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
        typeChips: row ? row.querySelectorAll('.scQuizTag.type').length : -1,
      };
    } catch (e) { return "err"; }
  }, molTagsId);
  check(molTagsToggle === true && molTags && molTags.quiz && molTags.quiz.mol === "ethane" &&
    molTags.realTags >= 2 && molTags.typeChips === 0,
    "a menu-less molecule quiz must store quiz.mol and render real name tags, got " + JSON.stringify(molTags));

  const menuMolId = await makeScenario(p, "probeq-menu-mol-tags", [{
    selectedMol: "ethane",
    menuSubset: ["ethane", "butane"],
  }]);
  check(typeof menuMolId === "string" && menuMolId.indexOf("err:") !== 0, "menu+molecule scenario creation failed: " + menuMolId);
  const menuMolToggle = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const box = row ? row.querySelector('input[data-sc-role="quiz-enabled"]') : null;
      if (!box) return "missing";
      box.click();
      return true;
    } catch (e) { return "err"; }
  }, menuMolId);
  await p.waitForTimeout(800);
  const menuMolTags = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const q = sc && sc.steps[0].quiz;
      return {
        quiz: q ? { mode: q.mode, mol: q.mol, modes: q.modes, types: q.types } : null,
        menuSubset: (sc && sc.steps[0].menuSubset || []).length,
        realTags: row ? row.querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
        typeChips: row ? row.querySelectorAll('.scQuizTag.type').length : -1,
      };
    } catch (e) { return "err"; }
  }, menuMolId);
  check(menuMolToggle === true && menuMolTags && menuMolTags.quiz && menuMolTags.quiz.mol === "" &&
    menuMolTags.typeChips > 0 && menuMolTags.realTags === 0,
    "a menu quiz with a selected molecule must stay deferred and render type chips, got " + JSON.stringify(menuMolTags));

  // --- 23. menu-less molecule step never keeps a deferred quiz marker (v58.44) ---
  await openMol(p, "ethane");
  const pinId = await makeScenario(p, "probeq-pin-molecule", [
    {
      selectedMol: "ethane",
      quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "", types: ["mainChain", "bondType"] },
      requireSolution: true,
      showExtra: { nameClick: true, naming: true },
    },
    {
      selectedMol: "ethane",
      menuSubset: ["ethane", "propane"],
      quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "", types: ["mainChain"] },
      requireSolution: true,
      showExtra: { nameClick: true, naming: true },
    },
    {
      selectedMol: null,
      menuSubset: ["propane", "butane"],
      quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "", types: ["mainChain"] },
      requireSolution: true,
      showExtra: { nameClick: true, naming: true },
    },
  ]);
  check(typeof pinId === "string" && pinId.indexOf("err:") !== 0, "pin-molecule scenario creation failed: " + pinId);
  const pinRows = await p.evaluate((id) => {
    const rows = Array.from(document.querySelectorAll('.scenarioPanel[data-scenario-id="' + id + '"] .srow'));
    return fScenarioGet(id).steps.map((s, i) => ({
      quizMol: s.quiz ? s.quiz.mol : null,
      modes: s.quiz ? (s.quiz.modes || null) : null,
      types: s.quiz ? (s.quiz.types || null) : null,
      real: rows[i] ? rows[i].querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
      chips: rows[i] ? rows[i].querySelectorAll('.scQuizTag.type').length : -1,
    }));
  }, pinId);
  check(pinRows && pinRows[0] && pinRows[0].quizMol === "ethane" && !pinRows[0].types &&
    Array.isArray(pinRows[0].modes) && pinRows[0].modes.length > 0 &&
    pinRows[0].real > 0 && pinRows[0].chips === 0,
    "menu-less molecule quiz must be pinned + render name tags, got " + JSON.stringify(pinRows && pinRows[0]));
  check(pinRows && pinRows[1] && pinRows[1].quizMol === "" && pinRows[1].chips > 0 && pinRows[1].real === 0,
    "multi-menu step must stay deferred + type chips, got " + JSON.stringify(pinRows && pinRows[1]));
  check(pinRows && pinRows[2] && pinRows[2].quizMol === "" && pinRows[2].chips > 0 && pinRows[2].real === 0,
    "menu-only step must stay deferred + type chips, got " + JSON.stringify(pinRows && pinRows[2]));
  // Update the multi-menu step with no live picks: the old deferred marker is
  // preserved but the menu is gone, so it must pin instead of staying chips.
  await p.evaluate((id) => {
    try { fScenarioGet(id).menuPick = []; } catch (e) {}
    try { fScenarioUpdateStep(id, 1); } catch (e) {}
  }, pinId);
  await p.waitForTimeout(1100);
  const pinAfter = await p.evaluate((id) => {
    const s = fScenarioGet(id).steps[1];
    const rows = Array.from(document.querySelectorAll('.scenarioPanel[data-scenario-id="' + id + '"] .srow'));
    return {
      quizMol: s.quiz ? s.quiz.mol : null,
      subset: (s.menuSubset || []).length,
      types: s.quiz ? (s.quiz.types || null) : null,
      real: rows[1] ? rows[1].querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
      chips: rows[1] ? rows[1].querySelectorAll('.scQuizTag.type').length : -1,
    };
  }, pinId);
  check(pinAfter && pinAfter.quizMol === "ethane" && pinAfter.subset === 0 && !pinAfter.types &&
    pinAfter.real > 0 && pinAfter.chips === 0,
    "Update must pin a deferred quiz when the menu is gone, got " + JSON.stringify(pinAfter));
  // The render predicate must not depend on quiz.mol at all. Disable the pin
  // repair for one render and poison the marker: the step shape alone must
  // still render name tags.
  const shapeOnly = await p.evaluate((id) => {
    try {
      const s = fScenarioGet(id).steps[0];
      const old = fScenarioQuizPinMolecule;
      try {
        fScenarioQuizPinMolecule = function () { return false; };
        s.quiz.mol = "";
        s.quiz.types = ["mainChain", "bondType"];
        fScenarioRenderList(id);
        const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
        return {
          real: row ? row.querySelectorAll('[data-sc-role^="quiz-mode-"]').length : -1,
          chips: row ? row.querySelectorAll('.scQuizTag.type').length : -1,
          marker: s.quiz.mol,
        };
      } finally {
        fScenarioQuizPinMolecule = old;
      }
    } catch (e) { return "err"; }
  }, pinId);
  check(shapeOnly && shapeOnly.real > 0 && shapeOnly.chips === 0 && shapeOnly.marker === "",
    "drawer menu-vs-name choice must come from the step shape, not quiz.mol, got " + JSON.stringify(shapeOnly));

  console.log(JSON.stringify({ failures, warnings }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  try { await b.close(); } catch (e) {}
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); try { process.exit(1); } catch (e2) {} });
