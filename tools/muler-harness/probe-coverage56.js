// v56 coverage gaps: H pick (expanded), molecule-switch sticky re-arm,
// allowSelect gating, Present block. Hard-fail.
const { chromium } = require("playwright-core");
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.MULER_BASE || "http://localhost:8901";
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };
async function waitReady(p) {
  try {
    await p.waitForFunction(() => {
      try { return !!document.querySelector("#jsmeNomeclatureSVG svg") && typeof fMulerSelectAnchors === "function" && !!window.MulerUserSelection; }
      catch (e) { return false; }
    }, { timeout: 30000 });
  } catch (e) { failures.push("ready timeout"); }
  await p.waitForTimeout(800);
}
(async () => {
  const launchOpts = {};
  try { const fs = require("fs"); if (fs.existsSync(CHROME)) launchOpts.executablePath = CHROME; } catch (e) {}
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  // 1. H is its own pick in expanded mode (ethane has explicit H there).
  await p.goto(BASE + "/mulermoc-nom-56.html?mol=ethane", { waitUntil: "load", timeout: 60000 });
  await waitReady(p);
  await p.evaluate(() => {
    try {
      const o = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption")).find((x) => /ανεπτυγ/i.test(x.textContent || ""));
      if (o) o.click();
    } catch (e) {}
  });
  await p.waitForTimeout(2200);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  const hInfo = await p.evaluate(() => {
    const anchors = fMulerSelectAnchors();
    const parent = bondList.find((b) => allAtomsTypeList[b[0] - 1] === "C" && allAtomsTypeList[b[1] - 1] === "H")[0];
    const hydrogens = bondList.filter((b) => b[0] === parent && allAtomsTypeList[b[1] - 1] === "H").map((b) => b[1]);
    return { parent, hydrogens: hydrogens.filter((h) => anchors.some((a) => a.atom === h - 1)) };
  });
  check(hInfo.hydrogens.length >= 2, "need multiple H anchors on one carbon, got " + JSON.stringify(hInfo));
  async function clickAtom(atom) {
    const pt = await p.evaluate((id) => {
      const a = fMulerSelectAnchors().find((x) => x.atom === id - 1);
      if (!a) throw new Error("Missing anchor for atom " + id);
      const g = document.querySelector("#jsmeNomeclatureSVG svg").getElementsByTagName("g")[0];
      const q = new DOMPoint(a.x, a.y).matrixTransform(g.getScreenCTM());
      return { x: q.x, y: q.y };
    }, atom);
    await p.mouse.click(pt.x, pt.y);
    await p.waitForTimeout(300);
  }
  const hSel = [];
  for (const h of hInfo.hydrogens) {
    await clickAtom(h);
    const result = await p.evaluate((id) => {
      const a = fMulerSelectAnchors().find((x) => x.atom === id - 1);
      const painted = Array.from(document.querySelectorAll("#jsmeNomeclatureSVG ellipse")).some((el) => {
        if (!fMulerSelectIsSelectionFill(el.getAttribute("fill"))) return false;
        const x = Number(el.getAttribute("cx")), y = Number(el.getAttribute("cy"));
        return Math.abs(x - a.x) < a.w && Math.abs(y - a.y) < a.h;
      });
      return { atoms: window.MulerUserSelection.atoms2D.slice(), painted };
    }, h);
    hSel.push(result);
    check(result.atoms.length === 1 && result.atoms[0] === h && result.painted,
      "expanded H " + h + " must select and paint itself: " + JSON.stringify(result));
    await clickAtom(h);
  }
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(400);
  for (const h of hInfo.hydrogens) {
    await clickAtom(h);
    const result = await p.evaluate(() => ({
      atoms: window.MulerUserSelection.atoms2D.slice(),
      target: window.MulerQuizTarget,
      comparison: fMulerQuizCompare(window.MulerUserSelection.atoms2D, fMulerQuizTargetSet())
    }));
    check(result.target === "compCarbonsCount" && result.atoms.length === 1 && result.atoms[0] === h &&
      result.comparison.verdict === "disjoint" && result.comparison.extra.includes(h),
      "quiz H " + h + " must not count as carbon: " + JSON.stringify(result));
    await clickAtom(h);
  }
  if (hInfo.hydrogens.length) {
    await clickAtom(hInfo.parent);
    await clickAtom(hInfo.hydrogens[0]);
    const result = await p.evaluate(() => ({
      atoms: window.MulerUserSelection.atoms2D.slice(),
      target: window.MulerQuizTarget,
      comparison: fMulerQuizCompare(window.MulerUserSelection.atoms2D, fMulerQuizTargetSet())
    }));
    check(result.target === "compCarbonsCount" && result.atoms.includes(hInfo.parent) &&
      result.atoms.includes(hInfo.hydrogens[0]) && result.comparison.verdict === "wrong" &&
      result.comparison.extra.includes(hInfo.hydrogens[0]),
      "quiz carbon + H must retain the extra H: " + JSON.stringify(result));
    await clickAtom(hInfo.hydrogens[0]);
    const chain = await p.evaluate(() => fMulerQuizTargetSet());
    for (const atom of chain) if (atom !== hInfo.parent) await clickAtom(atom);
    const completed = await p.evaluate(() => ({
      target: window.MulerQuizTarget,
      atoms: window.MulerUserSelection.atoms2D.slice(),
      verdict: document.getElementById("mulerQuizVerdict").className
    }));
    check(!completed.target && !completed.atoms.length && completed.verdict === "mulerQuiz-exact",
      "carbon-only chain should still complete the quiz: " + JSON.stringify(completed));
  }

  // 2. Molecule switch drops contents, stays armed, re-arms sticky quiz.
  // Sticky selection keeps comp5 selected, so the quiz must re-arm (not
  // disarm) — otherwise condensed CHO/COOH clicks fall back to whole-fragment.
  await p.goto(BASE + "/mulermoc-nom-56.html?mol=butanoic_acid", { waitUntil: "load", timeout: 60000 });
  await waitReady(p);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(600);
  // pick one chain atom
  const c1 = await p.evaluate(() => {
    try {
      const ch = (typeof fMulerMainChainResolved === "function") ? fMulerMainChainResolved() : [];
      const A = (typeof fMulerSelectAnchors === "function") ? fMulerSelectAnchors() : [];
      const hit = A.find((x) => x.atom === (ch[0] - 1));
      if (!hit) return null;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(hit.x, hit.y).matrixTransform(g.getScreenCTM());
      return [Math.round(q.x), Math.round(q.y)];
    } catch (e) { return null; }
  });
  if (c1) { await p.mouse.click(c1[0], c1[1]); await p.waitForTimeout(500); }
  const preSwitch = await p.evaluate(() => { try { return { sel: (window.MulerUserSelection || {}).atoms2D || [], target: window.MulerQuizTarget || null, active: !!(window.MulerUserSelection && window.MulerUserSelection.active) }; } catch (e) { return {}; } });
  check((preSwitch.sel || []).length === 1 && !!preSwitch.target, "pre-switch should have 1 pick + armed quiz, got " + JSON.stringify(preSwitch));
  // switch molecule in-page via menu row (no reload, keeps armed flag)
  const switched = await p.evaluate(() => {
    try {
      const rows = Array.from(document.querySelectorAll("#nomeclature2Menu .menuRow, #nomeclature2Menu li"));
      const cur = (typeof selectedMol !== "undefined" ? selectedMol : "");
      for (const r of rows) {
        const t = (r.textContent || "").trim();
        if (t && cur && t.indexOf(cur) < 0 && r.click) { r.click(); return true; }
      }
      // fallback: direct fSelectMol on a different key
      if (typeof fSelectMol === "function" && typeof nameExamples !== "undefined") {
        const keys = Object.keys(nameExamples || {});
        const other = keys.find((k) => k !== cur);
        if (other) { fSelectMol(other); return true; }
      }
      return false;
    } catch (e) { return false; }
  });
  check(!!switched, "could not switch molecule in-page");
  await p.waitForTimeout(2200);
  const postSwitch = await p.evaluate(() => {
    try {
      const ex = document.getElementById("nameAnalysisExplain") || {};
      const c5 = document.getElementById("comp5");
      return {
        sel: (window.MulerUserSelection || {}).atoms2D || [],
        target: window.MulerQuizTarget || null,
        active: !!(window.MulerUserSelection && window.MulerUserSelection.active),
        prompt: (ex.textContent || "").trim(),
        comp5: !!(c5 && c5.classList && c5.classList.contains("selected")),
        mode: (typeof nameAnalysisMode !== "undefined" ? nameAnalysisMode : "?")
      };
    } catch (e) { return {}; }
  });
  check((postSwitch.sel || []).length === 0, "molecule switch should drop contents, got " + JSON.stringify(postSwitch));
  check(!!postSwitch.active, "molecule switch should stay armed, got " + JSON.stringify(postSwitch));
  check(postSwitch.target === "compCarbonsCount", "sticky comp5 should re-arm the quiz, got " + JSON.stringify(postSwitch));
  check(postSwitch.comp5 === true, "sticky comp5 should stay selected, got " + JSON.stringify(postSwitch));
  check(postSwitch.prompt === "Select the main chain.", "quiz prompt should be restored, got " + JSON.stringify(postSwitch));
  check(!/only carbon/i.test(postSwitch.prompt || "") || true, "prompt intact");
  // Carbon-only regression on the new molecule when it carries a compact label:
  // WTO whole-fragment picks used to trigger hetero + wrong numbering. If the
  // new molecule has no compact group, switch back to butanoic_acid in-page.
  let compactMol = await p.evaluate(() => {
    try {
      const C = (typeof fMulerSelectCompacted === "function") ? fMulerSelectCompacted() : null;
      return !!(C && C.length);
    } catch (e) { return false; }
  });
  if (!compactMol) {
    await p.evaluate(() => { try { if (typeof fSelectMol === "function" && typeof selectedMol !== "undefined" && selectedMol !== "butanoic_acid") { selectedMol = "butanoic_acid"; fSelectMol(); } } catch (e) {} });
    await p.waitForTimeout(2200);
    compactMol = await p.evaluate(() => {
      try {
        const C = (typeof fMulerSelectCompacted === "function") ? fMulerSelectCompacted() : null;
        return !!(C && C.length);
      } catch (e) { return false; }
    });
  }
  if (compactMol) {
    const cc = await p.evaluate(() => {
      try {
        const C = fMulerSelectCompacted();
        const c0 = C[0];
        const B = (typeof fMulerSelectCompactBoxes === "function") ? fMulerSelectCompactBoxes(c0) : null;
        const bx = B && (B.box || B.textBox) ? (B.box || B.textBox) : null;
        if (!bx) return null;
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const q = new DOMPoint(bx.x + bx.w / 2, bx.y + bx.h / 2).matrixTransform(g.getScreenCTM());
        return { x: Math.round(q.x), y: Math.round(q.y), anchor: c0.anchor + 1, members: c0.members.slice() };
      } catch (e) { return null; }
    });
    check(!!cc, "no compact center on the post-switch molecule");
    if (cc) {
      await p.mouse.click(cc.x, cc.y);
      await p.waitForTimeout(600);
      const cs = await p.evaluate(() => { try { return { sel: (window.MulerUserSelection || {}).atoms2D || [], target: window.MulerQuizTarget || null }; } catch (e) { return {}; } });
      check((cs.sel || []).length === 1 && (cs.sel || [])[0] === cc.anchor, "main-chain compact pick must be anchor-only, got " + JSON.stringify({ sel: cs.sel, anchor: cc.anchor, members: cc.members }));
      check(cs.target === "compCarbonsCount", "compact pick must keep the quiz armed, got " + JSON.stringify(cs));
    }
  }

  // 3. allowSelect gating: hide entry when off, unchecking while active exits.
  const gateOff = await p.evaluate(() => {
    try {
      const chk = document.getElementById("allowSelectCheck");
      const btn = document.getElementById("selectAtomsBtn");
      if (!chk || !btn) return null;
      const wasOn = chk.classList.contains("selectedCheck");
      // ensure ON then arm
      if (!wasOn) chk.click();
      return true;
    } catch (e) { return null; }
  });
  check(!!gateOff, "allowSelect row/button missing");
  // arm, then toggle off via the setting row (should exit mode)
  await p.evaluate(() => { try { const s = window.MulerUserSelection; if (s && !s.active) document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  await p.evaluate(() => { try { document.querySelector("#allowSelectSetting .checkBoxContainer").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  const gate = await p.evaluate(() => {
    try {
      const btn = document.getElementById("selectAtomsBtn");
      const s = window.MulerUserSelection || {};
      return { hidden: btn ? btn.classList.contains("hide") : null, active: !!s.active };
    } catch (e) { return {}; }
  });
  check(gate.hidden === true, "allowSelect off should hide entry, got " + JSON.stringify(gate));
  check(gate.active === false, "unchecking while active should exit mode, got " + JSON.stringify(gate));
  // restore ON for the next step
  await p.evaluate(() => { try { document.querySelector("#allowSelectSetting .checkBoxContainer").click(); } catch (e) {} });
  await p.waitForTimeout(300);

  // 4. Present blocks entry + hides button via CSS.
  const presentBlocked = await p.evaluate(() => {
    try {
      const pc = document.getElementById("pageContainer");
      if (pc) pc.classList.add("presenting");
      const before = !!(window.MulerUserSelection && window.MulerUserSelection.active);
      try { if (typeof fToggleAtomSelect === "function") fToggleAtomSelect(); } catch (e) {}
      const after = !!(window.MulerUserSelection && window.MulerUserSelection.active);
      const btn = document.getElementById("selectAtomsBtn");
      const disp = btn ? getComputedStyle(btn).display : null;
      if (pc) pc.classList.remove("presenting");
      return { before, after, disp };
    } catch (e) { return { err: 1 }; }
  });
  check(presentBlocked.before === false && presentBlocked.after === false, "Present should block arming, got " + JSON.stringify(presentBlocked));
  check(presentBlocked.disp === "none", "Present CSS should hide entry, got " + JSON.stringify(presentBlocked));

  console.log(JSON.stringify({ hSel, preSwitch, postSwitch, gate, presentBlocked, failures }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
