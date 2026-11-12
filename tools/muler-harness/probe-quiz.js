const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));
  await p.goto("http://localhost:8901/mulermoc-nom-56.html?mol=ethane", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  // arm select mode, then click the main-chain count box (quiz target)
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  const armed = await p.evaluate(() => ({
    prompt: (document.getElementById("nameAnalysisExplain") || {}).textContent || "",
    verdict: (document.getElementById("mulerQuizVerdict") || {}).textContent || "",
    target: window.MulerQuizTarget || null,
  }));
  // pick both carbons (shift accumulates), then read verdict + fills
  const pickAt = async (idx, shift) => {
    await p.evaluate((k) => {
      try {
        const A = fMulerSelectAnchors();
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const q = new DOMPoint(A[k].x, A[k].y).matrixTransform(g.getScreenCTM());
        window.__t = [q.x, q.y];
      } catch (e) {}
    }, idx);
    const t = await p.evaluate(() => window.__t);
    if (shift) await p.keyboard.down("Shift");
    await p.mouse.click(t[0], t[1]);
    if (shift) await p.keyboard.up("Shift");
    await p.waitForTimeout(800);
  };
  await pickAt(0, false);
  const mid = await p.evaluate(() => ({
    sel: window.MulerUserSelection.atoms2D,
    verdict: (document.getElementById("mulerQuizVerdict") || {}).textContent || "",
  }));
  await pickAt(1, true);
  await p.screenshot({ path: "quiz-green.png", clip: { x: 340, y: 140, width: 680, height: 320 } });
  const done = await p.evaluate(() => {
    const rm = fGetRenderedAtomRectMap(false, false);
    const fills = [];
    for (const k in rm) {
      try { fills.push(rm[k].node ? rm[k].node.getAttribute("fill") : null); } catch (e) { fills.push(null); }
    }
    return {
      sel: window.MulerUserSelection.atoms2D,
      verdict: (document.getElementById("mulerQuizVerdict") || {}).textContent || "",
      target: window.MulerQuizTarget || null,
      fills,
    };
  });
  console.log(JSON.stringify({ armed, mid, done }));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
