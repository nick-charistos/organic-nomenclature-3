// probe-scenario-quiz: v58 scenario quizzes, headless Chrome (2D only).
// Capture rides Update (armed→set, disarmed→clear); gate blocks on live
// targets; Present auto-arms (fresh attempt per entry); menu picks arm
// deferred quizzes; reselect/restart resets re-arm; solved displays lock reps.
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
      return {
        target: window.MulerQuizTarget || null,
        sel: ((window.MulerUserSelection || {}).atoms2D || []).slice(),
        bonds: ((window.MulerUserSelection || {}).bonds2D || []).slice(),
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
        present: !!(window.MuLERMoCScenario && window.MuLERMoCScenario.present),
        step: (() => { try { return fScenarioPresent().index; } catch (e) { return -1; } })(),
        task: (() => { try { const t = fScenarioStudentTask(); return t ? t.quiz.mode : null; } catch (e) { return "?"; } })(),
        solved: (() => { try { return !!fMulerQuizIsSolved("compCarbonsCount"); } catch (e) { return "?"; } })(),
      };
    } catch (e) { return { err: String(e && e.message || e).slice(0, 120) }; }
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
  await p.waitForTimeout(500);
  return true;
}

async function openMol(p, mol) {
  await p.goto(BASE + "/mulermoc-nom-58.html?lang=en&mol=" + mol, { waitUntil: "load", timeout: 60000 });
  await waitReady(p);
}

// Solve whatever quiz is live by clicking its resolved target atoms
// (1-based, same convention as the stored selection).
async function solveLiveTarget(p) {
  const atoms = await p.evaluate(() => {
    try {
      const set = (typeof fMulerQuizTargetSet === "function") ? fMulerQuizTargetSet() : [];
      return (set || []).map((x) => Number(x)).filter((x) => x > 0);
    } catch (e) { return null; }
  });
  if (!atoms || !atoms.length) return "noset";
  for (const a of atoms) { if (!await clickAtom(p, a)) return "noanchor:" + a; }
  await p.waitForTimeout(600);
  const s2 = await state(p);
  return (!s2.target && /Correct/.test(s2.verdict || "")) ? true : "noexact:" + JSON.stringify(s2.verdict);
}

async function armSelect(p) {
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
}

// Arming is toggle-based (click selected box = disarm), and a molecule
// reload may or may not preserve the selected visual — so click until the
// target reads back, bounded. Deterministic from any box state.
async function ensureArmed(p, box, mode) {
  for (let i = 0; i < 3; i++) {
    const t = await p.evaluate(() => { try { return window.MulerQuizTarget || null; } catch (e) { return "err"; } });
    if (t === mode) return true;
    await p.evaluate((b) => { try { document.getElementById(b).click(); } catch (e) {} }, box);
    await p.waitForTimeout(600);
  }
  return false;
}

async function rowButton(p, scenId, cls) {
  const ok = await p.evaluate(([id, c]) => {
    try {
      const btns = Array.prototype.slice.call(
        document.querySelectorAll('.scenarioPanel[data-scenario-id="' + id + '"] .srow ' + c));
      if (!btns.length) return "missing";
      btns[btns.length - 1].click();
      return true;
    } catch (e) { return "err:" + String(e && e.message || e).slice(0, 60); }
  }, [scenId, cls]);
  await p.waitForTimeout(700);
  return ok;
}

(async () => {
  const b = await chromium.launch(await (async () => { try { const fs = require("fs"); if (fs.existsSync(CHROME)) return { executablePath: CHROME }; } catch (e) { return {}; } })());
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  // --- 1. Update captures the armed quiz (badge + forced nameClick) ---
  await openMol(p, "ethane");
  await armSelect(p);
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(700);
  let s = await state(p);
  check(s.target === "compCarbonsCount", "arm should set the chain target, got " + JSON.stringify(s.target));
  check(await clickAtom(p, 1), "missing anchor for ethane C1");
  const scid = await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-cap", true);
      scen.steps.push(fScenarioDefaults({ selectedMol: "ethane", nameAnalysisMode: "none" }, 0));
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      return scen.id;
    } catch (e) { return null; }
  });
  check(!!scid, "scenario creation failed");
  check(await rowButton(p, scid, ".scUpdate") === true, "Update button should capture");
  const cap = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const st = sc && sc.steps[0];
      return st ? { quiz: st.quiz || null, nameClick: (st.show || {}).nameClick } : null;
    } catch (e) { return { err: 1 }; }
  }, scid);
  check(cap && cap.quiz && cap.quiz.mode === "compCarbonsCount" && cap.quiz.mol === "ethane",
    "Update while armed should store the quiz, got " + JSON.stringify(cap && cap.quiz));
  check(cap && cap.nameClick === true, "quiz capture should force nameClick on");
  const badge = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const bq = row ? row.querySelector(".scQuizBadge") : null;
      return bq ? { text: (bq.textContent || "").trim(), cls: String(bq.className || "") } : null;
    } catch (e) { return null; }
  }, scid);
  check(badge && badge.text === "quiz" && /is-quiz/.test(badge.cls || ""),
    "quiz badge should read quiz with is-quiz, got " + JSON.stringify(badge));
  const reqBox = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const hit = row ? row.querySelector('input[data-sc-role="require-solution"]') : null;
      if (hit) {
        const quizRow = row.querySelector('[data-sc-row="quiz"]');
        return { checked: !!hit.checked, disabled: !!hit.disabled, quizRow: !!quizRow, via: "role" };
      }
      const boxes = row ? Array.prototype.slice.call(row.querySelectorAll('input[type="checkbox"]')) : [];
      const fb = boxes.find((x) => /Απαίτηση|Require/.test((x.parentNode && x.parentNode.textContent) || ""));
      return fb ? { checked: !!fb.checked, disabled: !!fb.disabled, via: "text" } : "missing";
    } catch (e) { return "err"; }
  }, scid);
  check(reqBox && reqBox.checked === true && reqBox.disabled === false && reqBox.quizRow === true,
    "requireSolution should default checked on quiz steps in its own quiz row, got " + JSON.stringify(reqBox));
  const ncBox = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const hit = row ? row.querySelector('input[data-sc-role="name-click"]') : null;
      if (hit) return { checked: !!hit.checked, disabled: !!hit.disabled, display: getComputedStyle(hit.closest("label")).display, via: "role" };
      const boxes = row ? Array.prototype.slice.call(row.querySelectorAll('input[type="checkbox"]')) : [];
      const fb = boxes.find((x) => /Διάδραση|interact/i.test((x.parentNode && x.parentNode.textContent) || ""));
      return fb ? { checked: !!fb.checked, disabled: !!fb.disabled, via: "text" } : "missing";
    } catch (e) { return "err"; }
  }, scid);
  check(ncBox && ncBox.checked === true && (ncBox.display === "none" || ncBox.disabled === true),
    "nameClick should be forced on + hidden/disabled for quiz steps, got " + JSON.stringify(ncBox));
  // Master "Show naming" is hidden on quiz steps (nothing to hide in a quiz)
  // and stored naming stays on.
  const namingRow = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      const hit = row ? row.querySelector('input[data-sc-role="naming"]') : null;
      const label = hit ? hit.closest("label") : null;
      if (!hit || !label) return "missing";
      const sc = fScenarioGet(id);
      return {
        hidden: getComputedStyle(label).display === "none",
        checked: !!hit.checked, disabled: !!hit.disabled,
        stored: !!((sc && sc.steps[0] && sc.steps[0].show || {}).naming),
        via: "role",
      };
    } catch (e) { return "err"; }
  }, scid);
  check(namingRow && namingRow.hidden === true && namingRow.checked === true && namingRow.stored === true,
    "Show naming should be hidden+on for quiz steps, got " + JSON.stringify(namingRow));

  // --- 2. disarmed Update clears the quiz (with toast) ---
  // (one click: deselects the armed box; a second click would re-arm)
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(500);
  s = await state(p);
  check(!s.target, "deselect should disarm, got " + JSON.stringify(s.target));
  await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      if (sc && sc.steps[0]) { sc.steps[0].quiz = { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane" }; }
    } catch (e) {}
  }, scid);
  await rowButton(p, scid, ".scUpdate");
  const cleared = await p.evaluate((id) => {
    try { const sc = fScenarioGet(id); return (sc && sc.steps[0] && sc.steps[0].quiz) || null; }
    catch (e) { return "err"; }
  }, scid);
  check(!cleared, "disarmed Update should drop the quiz (classic step), got " + JSON.stringify(cleared));
  const noQuizRow = await p.evaluate((id) => {
    try {
      const row = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .srow');
      return row ? !!row.querySelector('[data-sc-row="quiz"]') : "missing";
    } catch (e) { return "err"; }
  }, scid);
  check(noQuizRow === false, "classic steps should render no quiz row, got " + JSON.stringify(noQuizRow));

  // --- 2b. solve-then-Update stores the quiz (just-solved capture) ---
  check(await ensureArmed(p, "comp5", "compCarbonsCount"), "setup arm failed");
  check(await clickAtom(p, 1), "missing anchor for ethane C1");
  check(await clickAtom(p, 2), "missing anchor for ethane C2");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.target && s.solved === true,
    "exact should succeed, got " + JSON.stringify(s.verdict));
  check(await rowButton(p, scid, ".scUpdate") === true, "Update button should capture");
  const cap2 = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const st = sc && sc.steps[0];
      return st ? { quiz: st.quiz || null, nameClick: (st.show || {}).nameClick } : null;
    } catch (e) { return { err: 1 }; }
  }, scid);
  check(cap2 && cap2.quiz && cap2.quiz.mode === "compCarbonsCount" && cap2.quiz.mol === "ethane",
    "solve-then-Update should store the quiz, got " + JSON.stringify(cap2 && cap2.quiz));
  check(cap2 && cap2.nameClick === true, "just-solved capture should force nameClick on");

  // --- 2c. select-ON + Add with no box clicked stores a quiz (default task) ---
  await openMol(p, "ethane");
  await armSelect(p);
  const addId = await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-add", true);
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + scen.id + '"] .scSave');
      if (btn) btn.click();
      return scen.id;
    } catch (e) { return null; }
  });
  await p.waitForTimeout(800);
  const added = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const st = sc && sc.steps[sc.steps.length - 1];
      return st ? { quiz: st.quiz || null, nameClick: (st.show || {}).nameClick } : null;
    } catch (e) { return { err: 1 }; }
  }, addId);
  check(added && added.quiz && added.quiz.mode === "compCarbonsCount" && added.quiz.mol === "ethane",
    "select-ON Add should store a default quiz, got " + JSON.stringify(added && added.quiz));
  check(added && added.nameClick === true, "default capture should force nameClick on");

  // --- 2d. menu quiz: arm, build menu, deselect, Add → quiz.mol "" ---
  await openMol(p, "ethane");
  await armSelect(p);
  check(await ensureArmed(p, "comp5", "compCarbonsCount"), "setup arm failed");
  await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-menu-auth", true);
      window.__probeMenuAuth = scen.id;
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      if (typeof fScenarioSetPick === "function") { fScenarioSetPick("ethane", true); fScenarioSetPick("propane", true); }
      if (typeof fDeselectMol === "function") fDeselectMol();
    } catch (e) {}
  });
  await p.waitForTimeout(600);
  const intent = await p.evaluate(() => { try { return window.__mulerQuizIntent || null; } catch (e) { return "err"; } });
  check(intent && intent.mode === "compCarbonsCount" && intent.mol === "ethane",
    "deselect should preserve quiz intent, got " + JSON.stringify(intent));
  await p.evaluate((id) => {
    try {
      const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + id + '"] .scSave');
      if (btn) btn.click();
    } catch (e) {}
  }, await p.evaluate(() => window.__probeMenuAuth));
  await p.waitForTimeout(800);
  const menuCap = await p.evaluate(() => {
    try {
      const sc = fScenarioGet(window.__probeMenuAuth);
      const st = sc && sc.steps[sc.steps.length - 1];
      return st ? { quiz: st.quiz || null, mol: st.selectedMol, menu: (st.show || {}).menu, subset: st.menuSubset || [] } : null;
    } catch (e) { return { err: 1 }; }
  });
  check(menuCap && menuCap.quiz && menuCap.quiz.mode === "compCarbonsCount" && menuCap.quiz.mol === "",
    "menu Add should store a deferred quiz, got " + JSON.stringify(menuCap && menuCap.quiz));
  check(menuCap && menuCap.mol === null && menuCap.menu === true && (menuCap.subset || []).length === 2,
    "menu step should be molecule-less with a 2-pick menu, got " + JSON.stringify(menuCap));
  // Present the authored menu step: no arm until a molecule is picked.
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeMenuAuth, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 0 && !s.target, "authored menu step should apply disarmed, got " + JSON.stringify({ i: s.step, t: s.target }));
  const picked2 = await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const mine = items.find((x) => (x.getAttribute("id") || "") === "propane");
      if (mine) { mine.click(); return true; }
      return "nomenuitem";
    } catch (e) { return "err:" + String(e && e.message || e).slice(0, 60); }
  });
  await p.waitForTimeout(1500);
  check(picked2 === true, "menu pick should work in Present, got " + JSON.stringify(picked2));
  s = await state(p);
  check(s.target === "compCarbonsCount",
    "menu pick should auto-arm the authored quiz, got " + JSON.stringify(s.target));

  // --- 3. gate holds, auto-arm works, solve advances (fresh page) ---
  await openMol(p, "ethane");
  await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-gate", true);
      const mk = (extra) => {
        const st = (typeof fScenarioDefaults === "function")
          ? fScenarioDefaults({ selectedMol: "ethane", nameAnalysisMode: "none" }, scen.steps.length)
          : { selectedMol: "ethane", nameAnalysisMode: "none" };
        for (const k in extra) st[k] = extra[k];
        scen.steps.push(st);
        return st;
      };
      mk({});
      mk({ quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane", prompt: "" } });
      mk({});
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      window.__probeGate = scen.id;
    } catch (e) {}
  });
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeGate, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.present === true && s.step === 0 && !s.target, "passive step should apply clean, got " + JSON.stringify({ t: s.target, i: s.step }));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 1 && s.target === "compCarbonsCount" && s.task === "compCarbonsCount",
    "present must auto-arm the quiz step, got " + JSON.stringify({ i: s.step, t: s.target }));
  check(await clickAtom(p, 1), "student pick should land, got " + JSON.stringify(s.sel));
  s = await state(p);
  check(s.sel.length === 1, "student pick should register, got " + JSON.stringify(s.sel));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(600);
  s = await state(p);
  check(s.step === 1, "unsolved gate must hold the step, got index " + s.step);
  check(await clickAtom(p, 2), "missing anchor for ethane C2 (student)");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.hidden && !s.target, "student exact should succeed, got " + JSON.stringify(s.verdict));
  check(s.solved === true, "exact should mark solved, got " + JSON.stringify(s.solved));
  // --- 3b. post-solve freedom: reps pickable, other comps armable, no gate ---
  check(await clickAtom(p, 1), "post-solve pick should land");
  s = await state(p);
  check(s.sel.length === 1, "reps should be pickable after solving, got " + JSON.stringify(s.sel));
  const other = await p.evaluate(() => {
    try {
      const boxes = Array.prototype.slice.call(document.querySelectorAll("#nameAnalysis .nameCompBox"));
      for (const b of boxes) {
        const id = b.getAttribute("id");
        if (!id || id === "comp5") continue;
        if (b.classList.contains("comp-hidden")) continue;
        const m = (typeof fNameAnalysisModeForBoxId === "function") ? fNameAnalysisModeForBoxId(id) : "none";
        if (!m || m === "none" || m === "compCarbonsCount") continue;
        try {
          const r = (typeof fMulerQuizResolveTarget === "function") ? fMulerQuizResolveTarget(m) : [];
          if (r && r.length) return { id, mode: m };
        } catch (e) {}
      }
      return null;
    } catch (e) { return "err"; }
  });
  if (other && other.id) {
    await p.evaluate((id) => { try { document.getElementById(id).click(); } catch (e) {} }, other.id);
    await p.waitForTimeout(600);
    s = await state(p);
    check(s.target === other.mode, "other comps should arm practice after solve, got " + JSON.stringify(s.target));
  } else { warn("no second armable comp on ethane — practice arm untested"); }
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(900);
  s = await state(p);
  check(s.step === 2, "solved gate must advance, got index " + s.step);

  // --- 3c. solved steps stay solved on revisit (no re-quiz) ---
  await p.evaluate(() => { try { document.getElementById("scPrev").click(); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 1 && !s.target && s.solved === true,
    "revisit should show solved display, got " + JSON.stringify({ i: s.step, t: s.target, solved: s.solved }));
  const backBox = await p.evaluate(() => { try { const b = document.getElementById("comp5"); return !!(b && b.classList.contains("selected")); } catch (e) { return "err"; } });
  check(backBox === true, "revisit should select the solved box, got " + JSON.stringify(backBox));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(900);
  s = await state(p);
  check(s.step === 2, "revisited solved step should advance freely, got index " + s.step);

  // --- 4. restart re-arms (fresh run) ---
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeGate, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 0 && !s.target && s.solved === false, "restart should reset, got " + JSON.stringify({ i: s.step, t: s.target }));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 1 && s.target === "compCarbonsCount", "restart must re-arm the gated step, got " + JSON.stringify({ i: s.step, t: s.target }));

  // --- 5. requireSolution:false passes without solving (fresh page) ---
  await openMol(p, "ethane");
  await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-free", true);
      const mk = (extra) => {
        const st = (typeof fScenarioDefaults === "function")
          ? fScenarioDefaults({ selectedMol: "ethane", nameAnalysisMode: "none" }, scen.steps.length)
          : { selectedMol: "ethane", nameAnalysisMode: "none" };
        for (const k in extra) st[k] = extra[k];
        scen.steps.push(st);
        return st;
      };
      mk({});
      mk({ quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "ethane", prompt: "" }, requireSolution: false });
      mk({});
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      window.__probeFree = scen.id;
    } catch (e) {}
  });
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeFree, 1); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 1 && s.target === "compCarbonsCount",
    "free step should present armed, got " + JSON.stringify({ i: s.step, t: s.target }));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(900);
  s = await state(p);
  check(s.step === 2, "requireSolution:false must not gate, got index " + s.step);

  // --- 6. menu quiz: pick a molecule, task arms for it (fresh page) ---
  await openMol(p, "ethane");
  await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-menu", true);
      const m0 = (typeof fScenarioDefaults === "function")
        ? fScenarioDefaults({ selectedMol: null, nameAnalysisMode: "none" }, 0)
        : { selectedMol: null, nameAnalysisMode: "none" };
      m0.show = m0.show || {};
      m0.show.menu = true;
      m0.menuSubset = ["ethane", "propane"];
      m0.quiz = { kind: "nameComp", mode: "compCarbonsCount", mol: "", prompt: "" };
      scen.steps.push(m0);
      const m1 = (typeof fScenarioDefaults === "function")
        ? fScenarioDefaults({ selectedMol: "ethane", nameAnalysisMode: "none" }, 1)
        : { selectedMol: "ethane", nameAnalysisMode: "none" };
      scen.steps.push(m1);
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      window.__probeMenu = scen.id;
    } catch (e) {}
  });
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeMenu, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 0 && !s.target, "menu step should apply without arming, got " + JSON.stringify({ i: s.step, t: s.target }));
  const picked = await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const mine = items.find((x) => (x.getAttribute("id") || "") === "propane");
      if (mine) { mine.click(); return true; }
      return "nomenuitem";
    } catch (e) { return "err:" + String(e && e.message || e).slice(0, 60); }
  });
  await p.waitForTimeout(1500);
  check(picked === true, "menu pick should work in Present, got " + JSON.stringify(picked));
  s = await state(p);
  check(s.target === "compCarbonsCount",
    "menu pick should auto-arm the quiz for it, got " + JSON.stringify(s.target));
  const blankBox = await p.evaluate(() => { try { return !!document.querySelector("#nameAnalysis .nameCompBox.selected"); } catch (e) { return "err"; } });
  check(blankBox === false, "fresh molecule should not preselect a component, got selected=" + JSON.stringify(blankBox));

  // --- 6b. switch molecules mid-quiz: solve propane, pick ethane → re-arms ---
  check(await clickAtom(p, 1), "propane pick 1");
  check(await clickAtom(p, 2), "propane pick 2");
  check(await clickAtom(p, 3), "propane pick 3");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.hidden && !s.target && s.solved === true,
    "propane exact should succeed, got " + JSON.stringify(s.verdict));
  const picked3 = await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const mine = items.find((x) => (x.getAttribute("id") || "") === "ethane");
      if (mine) { mine.click(); return true; }
      return "nomenuitem";
    } catch (e) { return "err:" + String(e && e.message || e).slice(0, 60); }
  });
  await p.waitForTimeout(1500);
  check(picked3 === true, "switch pick should work in Present, got " + JSON.stringify(picked3));
  s = await state(p);
  check(s.target === "compCarbonsCount" && s.sel.length === 0,
    "switching molecules should re-arm fresh for ethane, got " + JSON.stringify({ t: s.target, sel: s.sel }));
  check(await clickAtom(p, 1), "ethane pick 1 (after switch)");
  check(await clickAtom(p, 2), "ethane pick 2 (after switch)");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.target,
    "ethane exact after switch should succeed, got " + JSON.stringify(s.verdict));

  // --- 6c. solved molecules show their solved display (no re-arm) ---
  const picked6 = await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const mine = items.find((x) => (x.getAttribute("id") || "") === "propane");
      if (mine) { mine.click(); return true; }
      return "nomenuitem";
    } catch (e) { return "err:" + String(e && e.message || e).slice(0, 60); }
  });
  await p.waitForTimeout(1500);
  check(picked6 === true, "return pick should work, got " + JSON.stringify(picked6));
  s = await state(p);
  check(!s.target && s.solved === true,
    "returning to a solved molecule should show solved display, got " + JSON.stringify({ t: s.target, solved: s.solved }));
  const solvedBox = await p.evaluate(() => { try { const b = document.querySelector("#comp5"); return !!(b && b.classList.contains("selected")); } catch (e) { return "err"; } });
  check(solvedBox === true, "solved display should select the solved box, got " + JSON.stringify(solvedBox));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(900);
  s = await state(p);
  check(s.step === 1, "gate should pass on solved display, got index " + s.step);

  // --- 2e. molecule+menu capture stores a deferred quiz (mol "") ---
  await openMol(p, "ethane");
  await armSelect(p);
  check(await ensureArmed(p, "comp5", "compCarbonsCount"), "setup arm failed");
  await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-molmenu", true);
      window.__probeMolMenu = scen.id;
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      if (typeof fScenarioSetPick === "function") { fScenarioSetPick("propane", true); }
      const btn = document.querySelector('.scenarioPanel[data-scenario-id="' + scen.id + '"] .scSave');
      if (btn) btn.click();
    } catch (e) {}
  });
  await p.waitForTimeout(800);
  const mmCap = await p.evaluate(() => {
    try {
      const sc = fScenarioGet(window.__probeMolMenu);
      const st = sc && sc.steps[sc.steps.length - 1];
      return st ? { quiz: st.quiz || null, mol: st.selectedMol, menu: (st.show || {}).menu, subset: st.menuSubset || [] } : null;
    } catch (e) { return { err: 1 }; }
  });
  check(mmCap && mmCap.quiz && mmCap.quiz.mode === "compCarbonsCount" && mmCap.quiz.mol === "",
    "molecule+menu Add should store a deferred quiz, got " + JSON.stringify(mmCap && mmCap.quiz));
  check(mmCap && mmCap.mol === "ethane" && mmCap.menu === true && (mmCap.subset || []).length === 2,
    "step should pin ethane with a 2-pick menu, got " + JSON.stringify(mmCap));
  // Present: apply arms ethane immediately; picking propane re-arms for it.
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeMolMenu, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 0 && s.target === "compCarbonsCount",
    "molecule+menu apply should arm the pinned molecule, got " + JSON.stringify({ i: s.step, t: s.target }));
  const picked4 = await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const mine = items.find((x) => (x.getAttribute("id") || "") === "propane");
      if (mine) { mine.click(); return true; }
      return "nomenuitem";
    } catch (e) { return "err:" + String(e && e.message || e).slice(0, 60); }
  });
  await p.waitForTimeout(1500);
  check(picked4 === true, "menu pick should work, got " + JSON.stringify(picked4));
  s = await state(p);
  check(s.target === "compCarbonsCount" && s.sel.length === 0,
    "picking propane should re-arm fresh (no mismatch gate), got " + JSON.stringify({ t: s.target, sel: s.sel }));
  const blankBox2 = await p.evaluate(() => { try { return !!document.querySelector("#nameAnalysis .nameCompBox.selected"); } catch (e) { return "err"; } });
  check(blankBox2 === false, "authored-menu pick should not preselect either, got selected=" + JSON.stringify(blankBox2));
  check(await clickAtom(p, 1), "propane pick 1");
  check(await clickAtom(p, 2), "propane pick 2");
  check(await clickAtom(p, 3), "propane pick 3");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.target,
    "propane exact should succeed, got " + JSON.stringify(s.verdict));

  // --- 7. reselect resets solved (authoring, fresh page) ---
  await openMol(p, "ethane");
  await armSelect(p);
  check(await ensureArmed(p, "comp5", "compCarbonsCount"), "setup arm failed");
  check(await clickAtom(p, 1), "missing anchor C1");
  check(await clickAtom(p, 2), "missing anchor C2");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.target, "exact should succeed, got " + JSON.stringify(s.verdict));
  check(s.solved === true, "quiz should be marked solved, got " + JSON.stringify(s));
  await p.evaluate(() => {
    try {
      const items = Array.from(document.querySelectorAll(".menuLi"));
      const mine = items.find((x) => (x.getAttribute("id") || "") === "ethane");
      if (mine) mine.click();
    } catch (e) {}
  });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.solved === false, "reselecting the molecule should reset solved, got " + JSON.stringify(s));
  check(await ensureArmed(p, "comp5", "compCarbonsCount"), "re-arm must work after reselect");

  // --- 8. solved display locks reps (authoring, same page; re-arm first) ---
  check(await ensureArmed(p, "comp5", "compCarbonsCount"), "re-arm must work");
  check(await clickAtom(p, 1), "setup pick");
  check(await clickAtom(p, 2), "setup pick 2");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.target, "exact should succeed, got " + JSON.stringify(s.verdict));
  check(await clickAtom(p, 1), "click still resolves");
  await p.waitForTimeout(400);
  s = await state(p);
  check(s.sel.length === 0, "solved display must lock reps (no-op picks), got " + JSON.stringify(s.sel));

  // --- 9. free practice: any unsolved comp arms, solved comps highlight ---
  await openMol(p, "methyl_2_propene");
  await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-free2", true);
      const mk = (extra) => {
        const st = (typeof fScenarioDefaults === "function")
          ? fScenarioDefaults({ selectedMol: "methyl_2_propene", nameAnalysisMode: "none" }, scen.steps.length)
          : { selectedMol: "methyl_2_propene", nameAnalysisMode: "none" };
        for (const k in extra) st[k] = extra[k];
        scen.steps.push(st);
        return st;
      };
      mk({ quiz: { kind: "nameComp", mode: "compCarbonsCount", mol: "methyl_2_propene", prompt: "" } });
      mk({});
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      window.__probeFree2 = scen.id;
    } catch (e) {}
  });
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probeFree2, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 0 && s.target === "compCarbonsCount",
    "task should auto-arm on entry, got " + JSON.stringify({ i: s.step, t: s.target }));
  const other2 = await p.evaluate(() => {
    try {
      const boxes = Array.prototype.slice.call(document.querySelectorAll("#nameAnalysis .nameCompBox"));
      for (const b of boxes) {
        const id = b.getAttribute("id");
        if (!id || id === "comp5") continue;
        if (b.classList.contains("comp-hidden")) continue;
        const m = (typeof fNameAnalysisModeForBoxId === "function") ? fNameAnalysisModeForBoxId(id) : "none";
        if (!m || m === "none" || m === "compCarbonsCount") continue;
        try {
          const r = (typeof fMulerQuizResolveTarget === "function") ? fMulerQuizResolveTarget(m) : [];
          if (r && r.length) return { id, mode: m };
        } catch (e) {}
      }
      return null;
    } catch (e) { return "err"; }
  });
  check(other2 && other2.id, "branched molecule should offer a second armable comp, got " + JSON.stringify(other2));
  await p.evaluate((id) => { try { document.getElementById(id).click(); } catch (e) {} }, other2.id);
  await p.waitForTimeout(600);
  s = await state(p);
  check(s.target === other2.mode && s.task === null,
    "other unsolved comps should arm practice without becoming the task, got " + JSON.stringify({ t: s.target, task: s.task }));
  const pr = await solveLiveTarget(p);
  check(pr === true, "practice should be solvable, got " + JSON.stringify(pr));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(600);
  s = await state(p);
  check(s.step === 0, "unsolved task must still gate after practice, got index " + s.step);
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(600);
  s = await state(p);
  check(s.target === "compCarbonsCount", "task box should re-arm the task, got " + JSON.stringify(s.target));
  const wasSel = await p.evaluate((id) => { try { return !!document.getElementById(id).classList.contains("selected"); } catch (e) { return "err"; } }, other2.id);
  await p.evaluate((id) => { try { document.getElementById(id).click(); } catch (e) {} }, other2.id);
  await p.waitForTimeout(600);
  s = await state(p);
  const nowSel = await p.evaluate((id) => { try { return !!document.getElementById(id).classList.contains("selected"); } catch (e) { return "err"; } }, other2.id);
  check(s.target === "compCarbonsCount" && wasSel !== nowSel,
    "solved box must toggle highlight without killing the task, got " + JSON.stringify({ t: s.target, wasSel, nowSel }));
  const fin = await solveLiveTarget(p);
  check(fin === true, "task should solve, got " + JSON.stringify(fin));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(900);
  s = await state(p);
  check(s.step === 1, "solved task should advance, got index " + s.step);

  // --- 10. authored solved state restores as solved ---
  await openMol(p, "ethane");
  await armSelect(p);
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(600);
  check(await clickAtom(p, 1), "missing anchor C1");
  check(await clickAtom(p, 2), "missing anchor C2");
  await p.waitForTimeout(600);
  s = await state(p);
  check(/Correct/.test(s.verdict) && !s.target && s.solved === true, "setup solve failed, got " + JSON.stringify(s.verdict));
  const preId = await p.evaluate(() => {
    try {
      const scen = fScenarioNew("probeq-presolved", true);
      scen.steps.push(fScenarioDefaults({ selectedMol: "ethane", nameAnalysisMode: "none" }, 0));
      try { if (typeof fScenarioBuildPanels === "function") fScenarioBuildPanels(); } catch (e) {}
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(scen.id); } catch (e) {}
      window.__probePre = scen.id;
      return scen.id;
    } catch (e) { return null; }
  });
  check(!!preId, "scenario creation failed");
  check(await rowButton(preId, ".scUpdate") === true, "Update should capture");
  const preCap = await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      const st = sc && sc.steps[0];
      return st ? { quiz: st.quiz || null, nam: st.nameAnalysisMode } : null;
    } catch (e) { return { err: 1 }; }
  }, preId);
  check(preCap && preCap.quiz && preCap.quiz.mode === "compCarbonsCount" &&
    preCap.quiz.preSolved && preCap.quiz.preSolved.ethane && preCap.quiz.preSolved.ethane.indexOf("compCarbonsCount") >= 0,
    "capture should store authored solved state, got " + JSON.stringify(preCap && preCap.quiz));
  check(!preCap || preCap.nam === "none", "quiz steps should capture a clean naming mode, got " + JSON.stringify(preCap && preCap.nam));
  await p.evaluate((id) => {
    try {
      const sc = fScenarioGet(id);
      sc.steps.push(fScenarioDefaults({ selectedMol: "ethane", nameAnalysisMode: "none" }, sc.steps.length));
      try { if (typeof fScenarioRenderList === "function") fScenarioRenderList(id); } catch (e) {}
    } catch (e) {}
  }, preId);
  await p.evaluate(() => { try { fScenarioPresentBegin(window.__probePre, 0); } catch (e) {} });
  await p.waitForTimeout(1200);
  s = await state(p);
  check(s.step === 0 && !s.target && s.solved === true,
    "authored solved state should restore as solved, got " + JSON.stringify({ i: s.step, t: s.target, solved: s.solved }));
  const preBox = await p.evaluate(() => { try { const b = document.getElementById("comp5"); return !!(b && b.classList.contains("selected")); } catch (e) { return "err"; } });
  check(preBox === true, "restored display should select the solved box, got " + JSON.stringify(preBox));
  await p.evaluate(() => { try { document.getElementById("scNext").click(); } catch (e) {} });
  await p.waitForTimeout(900);
  s = await state(p);
  check(s.step === 1, "authored-solved step should advance freely, got index " + s.step);

  console.log(JSON.stringify({ failures, warnings }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  try { await b.close(); } catch (e) {}
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); try { process.exit(1); } catch (e2) {} });
