// Explain-all overview table in selection mode.
// Regression guard: the overview build scrapes component explanations with
// paints suppressed (__mulerExplainQuiet); while selection mode owns the
// viewer that text must still be generated, otherwise the table nests its own
// previous markup (explainTable inside every explainCell) and every cell
// repeats the quiz prompt.
//
// Checks:
//   A. select armed, no quiz: open builds 1 table / 3 rows / 0 nested, cells
//      carry the component text, no green paint; close empties the panel;
//      three open/close cycles stay stable.
//   B. quiz armed: same build, target kept; close restores the quiz prompt.
//   C. 2D-style switch with the table open rebuilds cleanly (no nesting,
//      no green, quiz target kept).
//   D. with the table open, a correct verdict shows green + success and the
//      table stays; closing afterwards (target cleared) empties the panel.
const { chromium } = require("playwright-core");
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.MULER_BASE || "http://localhost:8901";
async function waitReady(p, failures) {
  try {
    await p.waitForFunction(() => { try { return !!document.querySelector("#jsmeNomeclatureSVG svg") && typeof fMulerSelectAnchors === "function" && !!window.MulerUserSelection; } catch (e) { return false; } }, { timeout: 30000 });
  } catch (e) { try { failures.push("ready timeout"); } catch (e2) {} }
  try { await p.waitForTimeout(800); } catch (e) {}
}

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  const b = await chromium.launch(await (async () => { try { const fs = require("fs"); if (fs.existsSync(CHROME)) return { executablePath: CHROME }; } catch (e) {} return {}; })());
  const p = await b.newPage({ viewport: { width: 1600, height: 950 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 160)));

  await p.goto(BASE + "/mulermoc-nom-56.html?lang=en&mol=butanoic_acid", { waitUntil: "load", timeout: 60000 });
  await waitReady(p, (typeof failures !== "undefined" ? failures : []));
  await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
  await p.waitForTimeout(400);

  async function state() {
    return await p.evaluate(() => {
      const host = document.getElementById("nameAnalysisExplain");
      const tables = host ? host.querySelectorAll(".explainTable") : [];
      const nested = host ? host.querySelectorAll(".explainTable .explainTable") : [];
      const rows = host ? host.querySelectorAll(".explainRow") : [];
      const cells = [];
      rows.forEach((r) => {
        const c = r.querySelector(".explainCell");
        cells.push(c ? (c.textContent || "").replace(/\s+/g, " ").trim() : "");
      });
      const isGreen = (n) => {
        const f = String(n.getAttribute("fill") || "").replace(/\s+/g, "").toLowerCase();
        return f.indexOf("121,220,109") >= 0 || f.indexOf("79dc6d") >= 0;
      };
      let green = 0;
      ["rect", "ellipse", "circle"].forEach((t) => {
        document.querySelectorAll("#jsmeNomeclatureSVG " + t).forEach((n) => { if (isGreen(n)) green += 1; });
      });
      const v = document.getElementById("mulerQuizVerdict");
      return {
        tableOn: !!window.nameExplainAll,
        tables: tables.length,
        nested: nested.length,
        rows: rows.length,
        cells,
        panelText: host ? (host.textContent || "").replace(/\s+/g, " ").trim() : "",
        green,
        target: window.MulerQuizTarget || null,
        verdict: v ? (v.textContent || "").trim() : "",
        verdictHidden: !v || getComputedStyle(v).display === "none"
      };
    });
  }
  const toggle = async () => {
    await p.evaluate(() => document.getElementById("nameExplainAllBtn").click());
    await p.waitForTimeout(500);
  };
  const setMode = async (idx) => {
    await p.evaluate((i) => {
      const opts = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"));
      if (opts[i]) opts[i].click();
    }, idx);
    await p.waitForTimeout(2600);
  };
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
  const goodTable = (s, tag, allowGreen) => {
    check(s.tables === 1, tag + ": exactly one table, got " + s.tables);
    check(s.nested === 0, tag + ": nested tables, got " + s.nested);
    check(s.rows === 3, tag + ": 3 component rows, got " + s.rows);
    check(s.cells.length === 3 && s.cells.every((t) => t.length > 0), tag + ": empty cells " + JSON.stringify(s.cells));
    check(!s.cells.some((t) => /^Select the main chain\.$/.test(t)), tag + ": cell repeats the quiz prompt " + JSON.stringify(s.cells));
    check(s.cells[0].indexOf("main chain") >= 0, tag + ": carbon row should carry its own explanation, got " + JSON.stringify(s.cells[0]));
    if (!allowGreen) check(s.green === 0, tag + ": table build must not paint green, got " + s.green);
  };

  // A. no quiz, three open/close cycles.
  for (const round of [1, 2, 3]) {
    await toggle();
    let s = await state();
    check(s.tableOn, "A" + round + ": explain-all should be on");
    goodTable(s, "A" + round + " open");
    await toggle();
    s = await state();
    check(!s.tableOn, "A" + round + ": explain-all should be off");
    check(s.tables === 0, "A" + round + ": close must remove the table, got " + s.tables);
    check(s.panelText === "", "A" + round + ": close must clear the panel, got " + JSON.stringify(s.panelText.slice(0, 40)));
  }

  // B. quiz armed.
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(900);
  let s = await state();
  check(s.target === "compCarbonsCount", "B: quiz should arm");
  await toggle();
  s = await state();
  goodTable(s, "B open");
  check(s.target === "compCarbonsCount", "B: quiz target must survive the table, got " + JSON.stringify(s.target));
  await toggle();
  s = await state();
  check(s.tables === 0, "B: close must remove the table, got " + s.tables);
  check(s.panelText.indexOf("Select the main chain.") >= 0, "B: close should restore the quiz prompt, got " + JSON.stringify(s.panelText.slice(0, 40)));
  await toggle();
  s = await state();
  goodTable(s, "B reopen");

  // C. style switch with the table open.
  await setMode(1);
  s = await state();
  check(s.tableOn, "C: explain-all should stay on after a style switch");
  goodTable(s, "C expanded");
  check(s.target === "compCarbonsCount", "C: quiz target must survive the style switch, got " + JSON.stringify(s.target));
  await setMode(0);
  s = await state();
  goodTable(s, "C condensed");

  // D. correct verdict with the table open.
  const ch = await p.evaluate(() => (typeof fMulerMainChainResolved === "function" ? fMulerMainChainResolved() : []).slice());
  check(ch.length === 4, "D: butanoic acid chain should have 4 atoms, got " + JSON.stringify(ch));
  for (const a of ch) {
    const ok = await clickAtom(a);
    check(ok, "D: missing anchor for chain atom " + a);
  }
  await p.waitForTimeout(500);
  s = await state();
  check(/Correct/.test(s.verdict) && !s.verdictHidden, "D: exact should show the success line, got " + JSON.stringify(s.verdict));
  check(s.green > 0, "D: exact should paint the green reward, got " + s.green);
  goodTable(s, "D exact", true);
  check(!s.target, "D: exact should clear the target");
  await toggle();
  s = await state();
  check(s.tables === 0, "D: close after exact must remove the table, got " + s.tables);
  check(s.panelText === "", "D: close after exact should leave the panel empty, got " + JSON.stringify(s.panelText.slice(0, 40)));

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL", e); process.exit(1); });
