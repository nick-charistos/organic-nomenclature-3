const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));
  const out = {};
  // 1. v56 loads, button first in title bar, tooltip + icon present
  await p.goto("http://localhost:8901/mulermoc-nom-56.html?lang=en", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  out.button = await p.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("#viewerSettingsBtnDiv .settingsBtn")).map((x) => x.id);
    const sb = document.getElementById("selectAtomsBtn");
    return { first: btns[0], tip: sb ? sb.getAttribute("data-tooltip") : null, hasIcon: !!(sb && sb.innerHTML.indexOf("svg") >= 0), cls: sb ? sb.className : null };
  });
  // 2. condensed pick works, halo rendered under content
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const svg = document.querySelector("#jsmeNomeclatureSVG svg");
    const g = svg.getElementsByTagName("g")[0];
    const q = new DOMPoint(4620, 2497).matrixTransform(g.getScreenCTM());
    return [Math.round(q.x), Math.round(q.y)];
  });
  await p.mouse.click(r[0], r[1]);
  await p.waitForTimeout(500);
  out.afterBond = await p.evaluate(() => ({ s: window.MulerUserSelection.atoms2D.concat(window.MulerUserSelection.bonds2D), halo: !!document.querySelector("#jsmeNomeclatureSVG .mulerSelHalo") }));
  // 3. compacted pick
  await p.goto("http://localhost:8901/mulermoc-nom-56.html?mol=butanoic_acid", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  const comp = await p.evaluate(() => { const c = (typeof fMulerSelectCompacted === "function") ? fMulerSelectCompacted() : null; return c && c[0] ? { n: c.length, tip: c[0].tip } : { n: (c || []).length }; });
  if (comp && comp.n) {
    await p.mouse.click(766, 346);
    await p.waitForTimeout(500);
  }
  out.compact = await p.evaluate(() => { const s = window.MulerUserSelection; return { a: s.atoms2D, halo: !!document.querySelector("#jsmeNomeclatureSVG .mulerSelHalo") }; });
  // 4. mode switch invalidates
  await p.evaluate(() => { try { const o = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption")).find((x) => /ανεπτυγ/i.test(x.textContent || "")); if (o) o.click(); } catch (e) {} });
  await p.waitForTimeout(2500);
  out.afterMode = await p.evaluate(() => ({ a: window.MulerUserSelection.atoms2D, haloGone: !document.querySelector("#jsmeNomeclatureSVG .mulerSelHalo") }));
  console.log(JSON.stringify({ button: out.button, afterBond: out.afterBond, compact: out.compact, afterMode: out.afterMode }));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
