// 2D-style switch while selecting: the viewer must stay clean (no name-comp
// green) and the main-chain quiz must stay armed, so the user can pick in the
// new style and only a correct verdict paints the green reward.
//
// Flow: arm select + comp5 (quiz), cycle condensed -> expanded -> skeletal ->
// condensed (each: zero green shapes, target kept, quiz prompt kept, verdict
// hidden, empty selection, comp5 box still selected), then pick the main chain
// in condensed (success line + green), then switch style again after exact
// (no leftover green, target cleared).
const { chromium } = require("playwright-core");

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1600, height: 950 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 160)));

  await p.goto("http://localhost:8901/mulermoc-nom-56.html?lang=en&mol=butanoic_acid", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
  await p.waitForTimeout(400);
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(900);

  async function state() {
    return await p.evaluate(() => {
      const isGreen = (n) => {
        const f = String(n.getAttribute("fill") || "").replace(/\s+/g, "").toLowerCase();
        return f.indexOf("121,220,109") >= 0 || f.indexOf("79dc6d") >= 0;
      };
      let greenShapes = 0;
      ["rect", "ellipse", "circle"].forEach((tag) => {
        document.querySelectorAll("#jsmeNomeclatureSVG " + tag).forEach((n) => { if (isGreen(n)) greenShapes += 1; });
      });
      const el = document.getElementById("mulerQuizVerdict");
      const c5 = document.getElementById("comp5");
      return {
        mode: (typeof mode2D !== "undefined") ? mode2D : "?",
        greenShapes,
        target: window.MulerQuizTarget || null,
        sel: (window.MulerUserSelection && window.MulerUserSelection.atoms2D) || [],
        prompt: ((document.getElementById("nameAnalysisExplain") || {}).textContent || "").trim(),
        verdict: el ? (el.textContent || "").trim() : "",
        verdictHidden: !el || getComputedStyle(el).display === "none",
        comp5Selected: !!(c5 && c5.classList && c5.classList.contains("selected"))
      };
    });
  }
  const setMode = async (idx) => {
    await p.evaluate((i) => {
      const opts = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"));
      if (opts[i]) opts[i].click();
    }, idx);
    await p.waitForTimeout(2600);
  };
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

  let s = await state();
  check(s.mode === "condensed", "start mode should be condensed, got " + s.mode);
  check(s.greenShapes === 0, "armed quiz must not paint green, got " + s.greenShapes);
  check(s.target === "compCarbonsCount", "quiz should arm, got " + JSON.stringify(s.target));
  check(s.prompt === "Select the main chain.", "quiz prompt missing: " + JSON.stringify(s.prompt));

  const sequence = [
    { idx: 1, mode: "expanded" },
    { idx: 2, mode: "skeletal" },
    { idx: 0, mode: "condensed" },
  ];
  for (const step of sequence) {
    await setMode(step.idx);
    s = await state();
    check(s.mode === step.mode, "mode should be " + step.mode + ", got " + s.mode);
    check(s.greenShapes === 0, step.mode + ": no name-comp highlight may live in the viewer, got " + s.greenShapes + " green shapes");
    check(s.target === "compCarbonsCount", step.mode + ": quiz must stay armed, got " + JSON.stringify(s.target));
    check(s.prompt === "Select the main chain.", step.mode + ": quiz prompt must survive, got " + JSON.stringify(s.prompt));
    check(s.verdictHidden && s.verdict === "", step.mode + ": verdict must stay hidden, got " + JSON.stringify(s.verdict));
    check(s.sel.length === 0, step.mode + ": selection contents must be dropped, got " + JSON.stringify(s.sel));
    check(s.comp5Selected, step.mode + ": comp5 box should stay selected");
  }

  const ch = await chain();
  check(ch.length === 4, "butanoic acid main chain should have 4 atoms, got " + JSON.stringify(ch));
  for (const a of ch) {
    const ok = await clickAtom(a);
    check(ok, "missing anchor for chain atom " + a);
  }
  await p.waitForTimeout(500);
  s = await state();
  check(/Correct/.test(s.verdict) && !s.verdictHidden, "exact should show the success line, got " + JSON.stringify(s.verdict));
  check(s.greenShapes > 0, "exact should paint the green reward, got " + s.greenShapes);
  check(!s.target, "exact should clear the target");

  // After the reward, a style switch must not resurrect a highlight.
  await setMode(1);
  s = await state();
  check(s.mode === "expanded", "post-exact mode should be expanded, got " + s.mode);
  check(s.greenShapes === 0, "post-exact style switch must not paint green, got " + s.greenShapes);
  check(s.sel.length === 0, "post-exact selection should stay empty, got " + JSON.stringify(s.sel));

  // Leaving selection mode restores the classic component highlight, including
  // across style switches — the viewer guard must be selection-mode only.
  await p.evaluate(() => document.getElementById("selectAtomsBtn").click()); // select off
  await p.waitForTimeout(400);
  await p.evaluate(() => document.getElementById("comp5").click()); // clear stale classic selection
  await p.waitForTimeout(700);
  await p.evaluate(() => document.getElementById("comp5").click()); // classic component click
  await p.waitForTimeout(900);
  let classic = await state();
  check(classic.greenShapes > 0, "classic highlight must paint with select mode off, got " + classic.greenShapes);
  await setMode(2);
  classic = await state();
  check(classic.greenShapes > 0, "classic highlight must survive a style switch, got " + classic.greenShapes);

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL", e); process.exit(1); });
