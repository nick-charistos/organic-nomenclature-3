const { chromium } = require("playwright-core");
const MOL = process.argv[2] || "sec_butyl_ethanoate";
const MODE = process.argv[3] || "condensed";
const ACTIONS = (process.argv[4] || "").split(";").filter(Boolean);
(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));
  await p.goto("http://localhost:8901/mulermoc-nom-56.html?mol=" + MOL, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(14000);
  if (MODE !== "condensed") {
    await p.evaluate((m) => { try { const o = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption")).find((x) => (m === "expanded" ? /ανεπτυγ/i : /σκελετ/i).test(x.textContent || "")); if (o) o.click(); } catch (e) {} }, MODE);
    await p.waitForTimeout(2500);
  }
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(500);
  const out = [];
  for (const a of ACTIONS) {
    const parts = a.split(",");
    const r = await p.evaluate(async ([kind, p1, p2, sh]) => {
      try {
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const toScreen = (sx, sy) => { const q = new DOMPoint(sx, sy).matrixTransform(g.getScreenCTM()); return [q.x, q.y]; };
        let svgPt = null, note = "";
        if (kind === "atom") {
          const idx = parseInt(p1, 10);
          const A = (typeof fMulerSelectAnchors === "function") ? fMulerSelectAnchors() : [];
          const hit = A.find((x) => x.atom === idx);
          if (!hit) return { err: "no-anchor-" + idx };
          svgPt = [hit.x, hit.y]; note = "anchor";
        } else if (kind === "bond") {
          const bi = parseInt(p1, 10);
          const G = (typeof fMulerSelectLineGroups === "function") ? fMulerSelectLineGroups() : null;
          const gg = G ? G.find((x) => x.bond === bi) : null;
          if (!gg) return { err: "no-group-" + bi };
          const L = gg.lines[0];
          svgPt = [(L.x1 + L.x2) / 2, (L.y1 + L.y2) / 2]; note = "bondmid";
        } else if (kind === "vertex") {
          const vi = parseInt(p1, 10);
          const G = (typeof fMulerSelectLineGroups === "function") ? fMulerSelectLineGroups() : null;
          const V = (typeof fMulerSelectVertices === "function") ? fMulerSelectVertices(G) : null;
          if (!V || !V[vi]) return { err: "no-vertex-" + vi };
          svgPt = [V[vi].x, V[vi].y]; note = "vertex";
        } else if (kind === "empty") {
          svgPt = [300, 4600]; note = "empty";
        }
        const sc = toScreen(svgPt[0], svgPt[1]);
        return { svgPt, screen: [Math.round(sc[0]), Math.round(sc[1])], note, doClick: true };
      } catch (e) { return { ERR: String(e && e.message || e).slice(0, 120) }; }
    }, [parts[0], parts[1], parts[2], parts[3]]);
    if (r && r.screen) {
      await p.mouse.click(Math.round(r.screen[0]), Math.round(r.screen[1]), parts[3] === "s" ? { modifiers: ["Shift"] } : {});
      await p.waitForTimeout(700);
    }
    const st = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], b: s.bonds2D || [] }; } catch (e) { return { err: 1 }; } });
    out.push({ act: a, info: r && r.note ? (r.note + "@" + JSON.stringify(r.svgPt)) : r, st });
  }
  await p.keyboard.press("Escape");
  await p.waitForTimeout(500);
  const fin = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], b: s.bonds2D || [] }; } catch (e) { return {}; } });
  console.log(JSON.stringify({ mode: MODE, steps: out, afterEsc: fin }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
