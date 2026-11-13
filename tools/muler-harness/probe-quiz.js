// Quiz 1C final-only verdicts. While picking, the verdict line must stay
// hidden (no partial counts, no "outside the main chain" / "no overlap"
// notes). final feedback: exact success, plus order/direction once the picked
// SET already equals the target set.
//
// Cases:
//   1. ethane — arm: prompt only, verdict hidden; first of two picks: still
//      hidden; second pick: exact success.
//   2. 2-methylpentane — pick a branch atom (outside the chain): verdict
//      hidden, target still armed (silent wrong pick, no count).
//   3. 2-methylpentane — pick the whole chain backwards: direction feedback.
//   4. 2-methylpentane — pick the whole chain scrambled: order feedback.
const { chromium } = require("playwright-core");

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  async function open(mol) {
    await p.goto("http://localhost:8901/mulermoc-nom-56.html?lang=en&mol=" + mol, { waitUntil: "load", timeout: 60000 });
    await p.waitForTimeout(14000);
  }
  async function armQuiz() {
    await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
    await p.waitForTimeout(300);
    await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
    await p.waitForTimeout(800);
  }
  async function state() {
    return await p.evaluate(() => {
      const el = document.getElementById("mulerQuizVerdict");
      return {
        prompt: ((document.getElementById("nameAnalysisExplain") || {}).textContent || "").trim(),
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
        target: window.MulerQuizTarget || null,
        sel: (window.MulerUserSelection && window.MulerUserSelection.atoms2D) || [],
      };
    });
  }
  const chain = async () => await p.evaluate(() => (typeof fMulerMainChainResolved === "function" ? fMulerMainChainResolved() : []).slice());
  async function clickAtom(atom1) {
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
  const hidden = (s) => s.hidden && s.verdict === "";

  // 1. ethane: partial picks are silent, the second completes.
  await open("ethane");
  await armQuiz();
  let s = await state();
  check(s.prompt === "Select the main chain.", "ethane: prompt should be the quiz instruction, got " + JSON.stringify(s.prompt));
  check(hidden(s), "ethane: verdict must be hidden after arming, got " + JSON.stringify(s.verdict));
  check(s.target === "compCarbonsCount", "ethane: target should be armed, got " + JSON.stringify(s.target));
  let ch = await chain();
  check(ch.length === 2, "ethane: main chain should have 2 atoms, got " + JSON.stringify(ch));
  await clickAtom(ch[0]);
  s = await state();
  check(s.sel.length === 1, "ethane: first pick should select one atom, got " + JSON.stringify(s.sel));
  check(hidden(s), "ethane: partial pick must stay silent, got " + JSON.stringify(s.verdict));
  await clickAtom(ch[1]);
  await p.waitForTimeout(400);
  await p.screenshot({ path: "quiz-green.png", clip: { x: 340, y: 140, width: 680, height: 320 } });
  s = await state();
  check(/Correct/.test(s.verdict) && !s.hidden, "ethane: exact should show the success line, got " + JSON.stringify(s.verdict));
  check(!s.target, "ethane: exact should clear the target");

  // 2. branch atom outside the chain: silent (old behavior: "outside the main
  //    chain" + a count).
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  check(ch.length === 5, "methyl_2_pentane: main chain should have 5 atoms, got " + JSON.stringify(ch));
  const branch = await p.evaluate((chainArr) => {
    const A = fMulerSelectAnchors();
    const inChain = {};
    chainArr.forEach((a) => { inChain[a] = true; });
    const hit = A.find((x) => !inChain[x.atom + 1]);
    return hit ? hit.atom + 1 : null;
  }, ch);
  check(!!branch, "methyl_2_pentane: no branch atom found outside the main chain");
  if (branch) {
    await clickAtom(branch);
    s = await state();
    check(s.sel.indexOf(branch) >= 0, "branch click should select the branch atom, got " + JSON.stringify(s.sel));
    check(hidden(s), "branch pick outside the chain must stay silent, got " + JSON.stringify(s.verdict));
    check(s.target === "compCarbonsCount", "branch pick must keep the quiz armed");
  }

  // 3. whole chain backwards: direction is final feedback.
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  for (const a of ch.slice().reverse()) {
    const ok = await clickAtom(a);
    check(ok, "direction: missing anchor for atom " + a);
  }
  s = await state();
  check(/wrong direction/i.test(s.verdict) && !s.hidden, "full reverse should report direction, got " + JSON.stringify(s.verdict));

  // 4. whole chain scrambled: order is final feedback.
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  const scrambled = [ch[0], ch[2], ch[1], ch[3], ch[4]];
  for (const a of scrambled) {
    const ok = await clickAtom(a);
    check(ok, "order: missing anchor for atom " + a);
  }
  s = await state();
  check(/Wrong order/i.test(s.verdict) && !s.hidden, "scrambled full set should report order, got " + JSON.stringify(s.verdict));

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
