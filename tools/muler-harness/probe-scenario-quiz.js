// probe-scenario-quiz: v58 scenario quizzes, headless Chrome (2D only).
// Contract (v58.11, ?v=58.11):
//  - a step stores {kind, mode, modes, modeLabels, mol, preSolved}; `modes` is
//    the required component set captured from the step's molecule (empty for
//    deferred menu quizzes);
//  - Update never destroys an authored task (removal is an explicit button);
//  - Present auto-arms a fresh attempt, the gate holds until every required
//    comp is solved, solved steps show their display, menu steps defer to the
//    picked molecule, and no forward jump can skip a gated step.
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
  await p.goto(BASE + "/mulermoc-nom-58.html?lang=en&mol=" + mol, { waitUntil: "load", timeout: 60000 });
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
      const remove = row ? row.querySelector('[data-sc-role="quiz-remove"]') : null;
      const naming = row ? row.querySelector('input[data-sc-role="naming"]') : null;
      const nameClick = row ? row.querySelector('input[data-sc-role="name-click"]') : null;
      return {
        badge: badge ? (badge.textContent || "").trim() : null,
        badgeTip: badge ? (badge.getAttribute("data-tooltip") || "") : "",
        req: req ? { checked: !!req.checked, disabled: !!req.disabled } : null,
        quizRow: !!quizRow,
        info: info ? (info.textContent || "").trim() : null,
        remove: !!remove,
        namingHidden: naming ? getComputedStyle(naming.closest("label")).display === "none" : null,
        nameClickHidden: nameClick ? getComputedStyle(nameClick.closest("label")).display === "none" : null,
      };
    } catch (e) { return "err"; }
  }, scid);
  check(rowInfo && rowInfo.quizRow && rowInfo.req && rowInfo.req.checked && !rowInfo.req.disabled,
    "quiz row should offer require-solution checked, got " + JSON.stringify(rowInfo));
  check(rowInfo && rowInfo.info && /comp|αλυσ|chain|eth|an/i.test(rowInfo.info),
    "quiz row should describe the required components, got " + JSON.stringify(rowInfo && rowInfo.info));
  check(rowInfo && rowInfo.remove === true, "quiz row should offer explicit removal");
  check(rowInfo && rowInfo.namingHidden === true && rowInfo.nameClickHidden === true,
    "naming master + interaction should be hidden on quiz steps, got " + JSON.stringify(rowInfo));
  check(rowInfo && rowInfo.badge && /quiz|κουίζ/i.test(rowInfo.badge),
    "quiz badge should be localized, got " + JSON.stringify(rowInfo && rowInfo.badge));
  check(rowInfo && rowInfo.badgeTip && !/compCarbonsCount/.test(rowInfo.badgeTip),
    "quiz badge tooltip should use labels, not mode ids, got " + JSON.stringify(rowInfo && rowInfo.badgeTip));

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

  // --- 3. explicit removal makes it classic ---
  await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const btn = row ? row.querySelector('[data-sc-role="quiz-remove"]') : null;
      if (btn) btn.click();
    } catch (e) {}
  }, scid);
  await p.waitForTimeout(800);
  const afterRemove = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      return {
        quiz: fScenarioGet(id).steps[0].quiz || null,
        quizRow: !!(row && row.querySelector('[data-sc-row="quiz"]')),
        namingHidden: (() => {
          const n = row && row.querySelector('input[data-sc-role="naming"]');
          return n ? getComputedStyle(n.closest("label")).display === "none" : null;
        })(),
      };
    } catch (e) { return "err"; }
  }, scid);
  check(afterRemove && afterRemove.quiz === null && afterRemove.quizRow === false && afterRemove.namingHidden === false,
    "explicit removal should clear the quiz and restore classic rows, got " + JSON.stringify(afterRemove));

  // --- 4. just-solved capture stores the task + authored baseline ---
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  check(await armBox(p, "comp5", "compCarbonsCount"), "setup arm failed");
  const r4 = await solveMode(p, "compCarbonsCount");
  check(r4 === true, "chain solve should succeed, got " + JSON.stringify(r4));
  check(await rowButton(p, scid, ".scUpdate") === true, "Update should capture the just-solved answer");
  const cap4 = await p.evaluate((id) => {
    try { return fScenarioGet(id).steps[0].quiz || null; } catch (e) { return "err"; }
  }, scid);
  check(cap4 && cap4.mode === "compCarbonsCount" && cap4.preSolved && cap4.preSolved.ethane &&
    cap4.preSolved.ethane.indexOf("compCarbonsCount") >= 0,
    "just-solved capture should store the mode + baseline, got " + JSON.stringify(cap4));
  check(cap4 && cap4.preSolved && cap4.preSolved.ethane.indexOf("compBondType") < 0,
    "baseline should only carry modes solved for this step, got " + JSON.stringify(cap4 && cap4.preSolved));

  // --- 5. select-ON Add with nothing armed stores a default quiz ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  const addId = await makeScenario(p, "probeq-add", []);
  await p.evaluate((id) => {
    try { const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .scSave'); if (btn) btn.click(); } catch (e) {}
  }, addId);
  await p.waitForTimeout(800);
  const added = await p.evaluate((id) => {
    try { const sc = fScenarioGet(id); const s = sc.steps[sc.steps.length - 1]; return s ? (s.quiz || null) : null; } catch (e) { return "err"; }
  }, addId);
  check(added && added.mode === "compCarbonsCount" && Array.isArray(added.modes) && added.modes.length >= 2,
    "select-ON Add should store the default task + set, got " + JSON.stringify(added));

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
  check(st.target === "compCarbonsCount", "menu pick should auto-arm the deferred quiz, got " + JSON.stringify(st.target));
  check(st.quiz && st.quiz.mol === "" && st.quiz.mode === "compCarbonsCount", "deferred task should stay per-molecule");
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
  check(st.step === 1 && st.target === "compCarbonsCount" && st.task === "compCarbonsCount",
    "Present must auto-arm the quiz step, got " + JSON.stringify({ i: st.step, t: st.target }));
  // v58.12: student-mode hover + 3D picking on a quiz step (both were dead
  // when the step armed: raw Present hover guards + a picking tail computed
  // before the task armed).
  const hovQuiz = await hoverAtom(p, 1);
  check(hovQuiz === true, "hover ring should show on a Present quiz step, got " + JSON.stringify(hovQuiz));
  const pickQuiz = await pickingState(p);
  if (pickQuiz === "noapplet" || pickQuiz === "err") warn("3D applet unavailable — picking assertions skipped");
  else check(pickQuiz === "atom", "3D picking should be armed on a quiz step, got " + JSON.stringify(pickQuiz));
  // legacy (no stored set) => all capable comps are required
  check(st.todo && st.todo.indexOf("compCarbonsCount") >= 0 && st.todo.indexOf("compBondType") >= 0,
    "legacy step should require every capable comp, got " + JSON.stringify(st.todo));
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
  check(st.step === 0 && st.target === "compCarbonsCount", "ungated quiz step should still arm, got " + JSON.stringify(st.target));
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
  const r9 = await solveMode(p, "compCarbonsCount");
  check(r9 === true, "narrowed chain should solve, got " + JSON.stringify(r9));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "solving the stored set must open the gate (bond type not required), got index " + st.step);

  // --- 10. authored pre-solved baseline restores as solved ---
  await openMol(p, "ethane");
  await p.evaluate(() => { document.getElementById("selectAtomsBtn").click(); });
  await p.waitForTimeout(400);
  const preId = await makeScenario(p, "probeq-presolved", [{ selectedMol: "ethane" }]);
  check(await armBox(p, "comp5", "compCarbonsCount"), "preSolved setup arm failed");
  check(await solveMode(p, "compCarbonsCount") === true, "preSolved chain solve failed");
  check(await solveMode(p, "compBondType") === true, "preSolved bond-type solve failed");
  check(await rowButton(p, preId, ".scUpdate") === true, "preSolved Update failed");
  const preCap = await p.evaluate((id) => {
    try { const q = fScenarioGet(id).steps[0].quiz; return q ? { modes: q.modes, pre: q.preSolved } : null; } catch (e) { return "err"; }
  }, preId);
  check(preCap && preCap.pre && preCap.pre.ethane && preCap.pre.ethane.indexOf("compCarbonsCount") >= 0 &&
    preCap.pre.ethane.indexOf("compBondType") >= 0,
    "capture should store the full authored baseline, got " + JSON.stringify(preCap));
  // a trailing step so the gate has somewhere to advance to
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
  check(st.step === 0 && !st.target && st.todo && st.todo.length === 0,
    "authored-solved step should present as solved, got " + JSON.stringify({ t: st.target, todo: st.todo }));
  const preCls = await p.evaluate(() => {
    try {
      const b = document.getElementById("comp5");
      return b ? String(b.className) : null;
    } catch (e) { return "err"; }
  });
  check(preCls && /freeComp/.test(preCls), "authored-solved comp should carry .freeComp, got " + JSON.stringify(preCls));
  await clickBtn(p, "scNext");
  st = await state(p);
  check(st.step === 1, "authored-solved step should advance freely, got index " + st.step);

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

  console.log(JSON.stringify({ failures, warnings }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  try { await b.close(); } catch (e) {}
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); try { process.exit(1); } catch (e2) {} });
