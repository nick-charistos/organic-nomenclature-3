const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));
  await p.goto("http://localhost:8901/mulermoc-nom-56.html?mol=sec_butyl_ethanoate", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  // click first atom label center
  await p.evaluate(() => {
    try {
      const A = fMulerSelectAnchors();
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(A[0].x, A[0].y).matrixTransform(g.getScreenCTM());
      window.__t = [q.x, q.y];
    } catch (e) {}
  });
  await p.waitForTimeout(200);
  const t = await p.evaluate(() => window.__t);
  await p.mouse.click(t[0], t[1]);
  await p.waitForTimeout(800);
  await p.screenshot({ path: "sel-atom.png", clip: { x: 340, y: 140, width: 680, height: 320 } });
  const s1 = await p.evaluate(() => {
    const s = window.MulerUserSelection;
    let fill = null;
    try {
      const rm = fGetRenderedAtomRectMap(true, (typeof mode2D !== "undefined" && mode2D === "expanded"));
      const a = (s.atoms2D[0] || 0) - 1;
      const el = rm ? rm[a] : null;
      const nd = el && el.node ? el.node : null;
      fill = nd ? nd.getAttribute("fill") : null;
    } catch (e) {}
    return { a: s.atoms2D, fill, wrapped: !!window.__mulerBgWrapped, seq: !!document.getElementById("mulerSelNum0") };
  });
  // hover preview: move back over the picked label, ring should appear
  await p.mouse.move(t[0], t[1]);
  await p.waitForTimeout(500);
  const hov = await p.evaluate(() => { const l = document.getElementById("mulerHoverRing"); return { ring: !!l, kids: l ? l.querySelectorAll("*").length : 0 }; });
  // click empty area (bottom-left of svg, away from molecule)
  await p.evaluate(() => {
    try {
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(300, 4600).matrixTransform(g.getScreenCTM());
      window.__t = [q.x, q.y];
    } catch (e) {}
  });
  const t2 = await p.evaluate(() => window.__t);
  await p.mouse.click(t2[0], t2[1]);
  await p.waitForTimeout(800);
  const s2 = await p.evaluate(() => { const s = window.MulerUserSelection; return { a: s.atoms2D, wrapped: !!window.__mulerBgWrapped }; });
  // switch mode -> should invalidate
  await p.evaluate(() => { try { const o = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption")).find((x) => /ανεπτυγ/i.test(x.textContent || "")); if (o) o.click(); } catch (e) {} });
  await p.waitForTimeout(2500);
  const s3 = await p.evaluate(() => { const s = window.MulerUserSelection; return { a: s.atoms2D, mode: (typeof mode2D !== "undefined" ? mode2D : "?"), compAtom: window.__mulerCompAtomArg, compBond: window.__mulerCompBondArg }; });
  console.log(JSON.stringify({ s1, hov, s2, s3 }));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
