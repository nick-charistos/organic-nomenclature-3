const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 120)));
  await p.goto("http://localhost:8901/mulermoc-nom-56.html?mol=ethene", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  // select bond via direct pick (midpoint of first line)
  const r = await p.evaluate(() => {
    try {
      const G = fMulerSelectLineGroups();
      const L = G[0].lines[0];
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint((L.x1 + L.x2) / 2, (L.y1 + L.y2) / 2).matrixTransform(g.getScreenCTM());
      return { x: q.x, y: q.y, bondIdx: G[0].bond };
    } catch (e) { return { ERR: String(e).slice(0, 100) }; }
  });
  console.log("TGT " + JSON.stringify(r));
  await p.mouse.click(r.x, r.y);
  await p.waitForTimeout(500);
  await p.keyboard.down("Shift");
  const r2 = await p.evaluate(() => {
    try {
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(4300, 2603).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    } catch (e) { return null; }
  });
  await p.mouse.click(r2[0], r2[1]);
  await p.waitForTimeout(500);
  await p.keyboard.up("Shift");
  const st = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D, b: s.bonds2D, g: s.groups, shiftSeen: window.__mulerSelShift }; } catch (e) { return {}; } });
  console.log("STATE " + JSON.stringify(st));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
