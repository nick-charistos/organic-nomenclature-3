// Branch quiz (v56 branch phase): compSecondSub/compNumber/branch pieces and
// alkyl boxes (commonAlkyl/esterAlkyl) arm set-only numberless atom quizzes
// (purpose "branch"). Name boxes arm directly; digit-led locant boxes use the
// chain-first flow (redirect → solve → auto-arm with numbering aid);
// locant selections never carry across molecules.
// Cases (EN, expanded):
//   1. methyl_2_pentane comp1 (branch name): direct arm, branch-carbon exacts.
//   2. methyl_2_pentane branch locant box: redirect, solve, auto-arm, exact.
//   3. sec_butyl_ethanoate comp10 (ester alcohol part): direct arm, exact.
//   4. molecule switch disarms the quiz and never carries a locant selection.
//   5b. systematic ether alkoxy boxes (e.g. 2-ethoxypropane comp1/comp0):
//       O + alkoxy chain as branch; name direct (short, no aid), locant
//       redirect (long, aid).
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
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  async function open(mol, lang) {
    const q = "?lang=" + (lang || "en") + "&mol=" + mol;
    await p.goto(BASE + "/mulermoc-nom-56.html" + q, { waitUntil: "load", timeout: 60000 });
    await waitReady(p, (typeof failures !== "undefined" ? failures : []));
  }
  async function toExpanded() {
    await p.evaluate(() => {
      const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
        .find((el) => /^(expanded|ανεπτυγμένος)$/i.test(el.textContent.trim()));
      if (!option) throw new Error("Missing expanded mode option");
      option.click();
    });
    await p.waitForFunction(() => mode2D === "expanded", null);
    await p.waitForTimeout(800);
  }
  async function armSelectAndBox(boxId) {
    const has = await p.evaluate((id) => !!document.getElementById(id), boxId);
    if (!has) return false;
    await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
    await p.waitForTimeout(300);
    await p.evaluate((id) => { try { document.getElementById(id).click(); } catch (e) {} }, boxId);
    await p.waitForTimeout(800);
    return true;
  }
  async function state() {
    return await p.evaluate(() => {
      const el = document.getElementById("mulerQuizVerdict");
      const boxes = {};
      try {
        for (const id of ["comp0", "comp1", "comp2", "comp3", "comp4", "comp5", "comp10", "comp11"]) {
          const b = document.getElementById(id);
          boxes[id] = b ? (b.textContent || "").trim().slice(0, 24) : null;
        }
      } catch (e) {}
      return {
        prompt: ((document.getElementById("nameAnalysisExplain") || {}).textContent || "").trim(),
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
        target: window.MulerQuizTarget || null,
        returnTo: window.__mulerQuizReturnTo || null,
        purpose: (typeof fMulerSelectPurpose === "function" ? fMulerSelectPurpose() : "?"),
        solved: fMulerChainSolved(),
        sel: (window.MulerUserSelection && window.MulerUserSelection.atoms2D) || [],
        badges: document.querySelectorAll("[id^='mulerSelNum']").length,
        numbers: document.querySelectorAll("#jsmeNomeclatureSVG text[id^='number']").length,
        boxes,
      };
    });
  }
  async function diag() {
    return await p.evaluate((mode) => {
      try {
        return {
          branchResolved: (typeof fMulerBranchAtomsForMode === "function" ? fMulerBranchAtomsForMode(mode) : null),
          purpose: (typeof fMulerQuizPurposeFor === "function" ? fMulerQuizPurposeFor(mode) : null),
        };
      } catch (e) { return { err: String(e.message).slice(0, 120) }; }
    }, "compSecondSub1");
  }
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
  async function solveChain() {
    const ch = await p.evaluate(() => (typeof fMulerMainChainResolved === "function" ? fMulerMainChainResolved() : []));
    check(ch.length > 0, "chain should resolve, got " + JSON.stringify(ch));
    for (const a of ch) {
      const ok = await clickAtom(a);
      check(ok, "missing anchor for chain atom " + a);
    }
    await p.waitForTimeout(400);
    return ch;
  }
  const sameAtoms = (actual, expected) =>
    JSON.stringify((actual || []).slice().sort((a, b) => a - b)) === JSON.stringify(expected.slice().sort((a, b) => a - b));

  async function checkAldehydeBranches(style) {
    const mol = "ethyl_4_isopropyl_3_methyl_2_hexanal";
    await open(mol, "en");
    await toExpanded();
    if (style === "sys") {
      await p.evaluate(() => document.querySelector("#radioSubstNaming [data-subst-mode='sys']").click());
      await p.waitForFunction(() => substNamingMode === "sys");
    }
    const chain = await p.evaluate(() => fMulerMainChainResolved());
    check(sameAtoms(chain, [1, 2, 3, 4, 5, 6]), style + ": expected fixture main chain, got " + JSON.stringify(chain));
    const cases = [
      { id: "comp0", atoms: [11, 12] },
      { id: "comp1", atoms: [11, 12] },
      { id: "comp2", atoms: [8, 9, 10] },
      { id: "comp3", atoms: [8, 9, 10] },
      { id: "comp3loc", atoms: [7] },
      { id: "comp3b", atoms: [7] },
    ];
    await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
    for (const c of cases) {
      const box = await p.evaluate((id) => {
        const el = document.getElementById(id);
        return el ? { text: el.textContent.trim(), mode: fNameAnalysisModeForBoxId(id) } : null;
      }, c.id);
      check(!!box, style + ": missing " + c.id);
      if (!box) continue;
      const tag = style + " " + c.id + " (" + box.text + ")";
      await p.evaluate((id) => document.getElementById(id).click(), c.id);
      await p.waitForTimeout(300);
      let actual = await state();
      if (c.id === "comp0") {
        check(actual.target === "compCarbonsCount" && !actual.solved,
          tag + ": unsolved locant should redirect to chain, got " + JSON.stringify(actual));
        if (actual.target === "compCarbonsCount") {
          await solveChain();
          actual = await state();
          check(hidden(actual), tag + ": chain verdict must clear on auto-arm");
        }
      }
      check(actual.target === box.mode && actual.purpose === "branch",
        tag + ": should arm branch quiz, got " + JSON.stringify(actual));
      if (actual.target !== box.mode || actual.purpose !== "branch") continue;
      check(actual.solved, tag + ": main chain should remain solved");
      const target = await p.evaluate(() => fMulerQuizTargetSet());
      check(sameAtoms(target, c.atoms), tag + ": expected " + JSON.stringify(c.atoms) + ", got " + JSON.stringify(target));
      if (c.id === "comp1") {
        await clickAtom(7);
        actual = await state();
        check(actual.target === box.mode && actual.sel.includes(7) && !actual.hidden &&
            !!actual.verdict && !/correct/i.test(actual.verdict),
          tag + ": wrong branch must not succeed, got " + JSON.stringify(actual));
        await clickAtom(7);
      }
      for (const atom of c.atoms) check(await clickAtom(atom), tag + ": missing atom anchor " + atom);
      actual = await state();
      check(!actual.target && /Correct! These are the atoms of the substituent/i.test(actual.verdict),
        tag + ": exact target must succeed, got " + JSON.stringify(actual));
      const reward = await p.evaluate(() => {
        const arg = window.__mulerCompAtomArg || "";
        return arg.split(",").filter((_, i) => i % 2 === 0)
          .map(Number).filter((a) => a > 0 && allAtomsTypeList[a - 1] === "C");
      });
      check(sameAtoms(reward, c.atoms), tag + ": reward must paint exactly the branch carbons, got " + JSON.stringify(reward));
    }
  }

  // 1-2. methyl_2_pentane branch name box: arms directly (name, no redirect).
  await open("methyl_2_pentane", "en");
  await toExpanded();
  let d1 = await state();
  check(!!d1.boxes.comp1, "methyl_2_pentane: comp1 branch box should exist, got " + JSON.stringify(d1.boxes));
  const bd1 = await p.evaluate(() => (typeof fMulerBranchAtomsForMode === "function" ? fMulerBranchAtomsForMode("compSecondSub1") : null));
  check((bd1 || []).length > 0, "methyl_2_pentane: branch resolver should be non-empty, got " + JSON.stringify(bd1));
  check(await armSelectAndBox("comp1"), "methyl_2_pentane: comp1 click should work");
  let s = await state();
  check(s.target === "compSecondSub1" && s.purpose === "branch" && !s.returnTo,
    "methyl_2_pentane: name box should arm directly, got " + JSON.stringify({ target: s.target, returnTo: s.returnTo }));
  check(/substituent/i.test(s.prompt), "methyl_2_pentane: prompt must name the substituent, got " + JSON.stringify(s.prompt));
  check(s.numbers === 0, "methyl_2_pentane: unsolved direct arm must show no aid, got " + s.numbers);
  const tgt1 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
  check(tgt1.length > 0, "methyl_2_pentane: branch target should be non-empty, got " + JSON.stringify(tgt1));
  for (const a of tgt1) {
    const ok = await clickAtom(a);
    check(ok, "methyl_2_pentane: missing anchor for branch atom " + a);
  }
  await p.waitForTimeout(400);
  s = await state();
  check(/Correct! These are the atoms of the substituent/i.test(s.verdict) && !s.hidden,
    "methyl_2_pentane: full pick should show the Branch success line, got " + JSON.stringify(s.verdict));
  check(!s.target && s.badges === 0, "methyl_2_pentane: exact should clear the target, stay numberless");

  // 2. branch locant box entry (comp0 or comp2 with digit text).
  await open("methyl_2_pentane", "en");
  await toExpanded();
  const locBox = await p.evaluate(() => {
    try {
      for (const id of ["comp0", "comp2"]) {
        const b = document.getElementById(id);
        if (b && /^\s*\d/.test((b.textContent || "").replace(/^[-\s]+/, ""))) return id;
      }
      return null;
    } catch (e) { return null; }
  });
  check(!!locBox, "methyl_2_pentane: a digit-led branch locant box should exist");
  if (locBox) {
    await armSelectAndBox(locBox);
    s = await state();
    check(s.target === "compCarbonsCount",
      "methyl_2_pentane locant: unsolved click should redirect to chain, got " + JSON.stringify(s.target));
    await solveChain();
    s = await state();
    check(s.purpose === "branch", "methyl_2_pentane locant: chain exact should auto-arm branch, got " + JSON.stringify(s));
    check(hidden(s), "methyl_2_pentane locant: chain verdict should clear when the branch quiz opens");
    const tgtL = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
    for (const a of tgtL) {
      const ok = await clickAtom(a);
      check(ok, "methyl_2_pentane locant: missing anchor for atom " + a);
    }
    await p.waitForTimeout(400);
    s = await state();
    check(/substituent/i.test(s.verdict) && !s.hidden, "methyl_2_pentane locant: full pick should succeed, got " + JSON.stringify(s.verdict));
    check(!s.target, "methyl_2_pentane locant: exact should clear the target");
  }

  // 3. ester alcohol part.
  await open("sec_butyl_ethanoate", "en");
  await toExpanded();
  const has10 = await p.evaluate(() => !!document.getElementById("comp10"));
  check(!!has10, "sec_butyl_ethanoate: comp10 ester-alkyl box should exist");
  if (has10) {
    const bd3 = await p.evaluate(() => (typeof fMulerBranchAtomsForMode === "function" ? fMulerBranchAtomsForMode("esterAlkyl") : null));
    check((bd3 || []).length > 0, "sec_butyl_ethanoate: ester-alkyl resolver should be non-empty, got " + JSON.stringify(bd3));
    await armSelectAndBox("comp10");
    s = await state();
    check(s.target === "esterAlkyl" && s.purpose === "branch" && !s.returnTo,
      "sec_butyl_ethanoate: ester-alkyl name should arm directly, got " + JSON.stringify(s));
    const tgt3 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
    for (const a of tgt3) {
      const ok = await clickAtom(a);
      check(ok, "sec_butyl_ethanoate: missing anchor for alkyl atom " + a);
    }
    await p.waitForTimeout(400);
    s = await state();
    check(/substituent/i.test(s.verdict) && !s.hidden, "sec_butyl_ethanoate: full pick should succeed, got " + JSON.stringify(s.verdict));
    check(!s.target, "sec_butyl_ethanoate: exact should clear the target");
  }

  // 4. Every distinct branch box in the reported aldehyde, in both name styles.
  await checkAldehydeBranches("school");
  await checkAldehydeBranches("sys");

  // Greek condensed name entry is direct even when the chain is unsolved.
  await open("ethyl_4_isopropyl_3_methyl_2_hexanal", "gr");
  await armSelectAndBox("comp3b");
  s = await state();
  check(s.target === "compBranchSub2" && s.purpose === "branch" && !s.solved && !s.returnTo,
    "Greek condensed methyl name should arm directly, got " + JSON.stringify(s));
  check(sameAtoms(await p.evaluate(() => fMulerQuizTargetSet()), [7]), "Greek condensed methyl target must be atom 7");
  check(await clickAtom(7), "Greek condensed methyl anchor missing");
  s = await state();
  check(!s.target && !s.hidden && !!s.verdict, "Greek condensed methyl must complete, got " + JSON.stringify(s));

  // The other locant pieces also return to their own branches after the chain.
  for (const c of [
    { id: "comp2", mode: "compNumber2", atoms: [8, 9, 10] },
    { id: "comp3loc", mode: "compBranchLoc2", atoms: [7] },
  ]) {
    await open("ethyl_4_isopropyl_3_methyl_2_hexanal", "en");
    await toExpanded();
    await armSelectAndBox(c.id);
    s = await state();
    check(s.target === "compCarbonsCount", c.id + ": locant should redirect to main chain");
    await solveChain();
    s = await state();
    check(s.target === c.mode && s.purpose === "branch" && hidden(s),
      c.id + ": locant should auto-arm after chain, got " + JSON.stringify(s));
    check(sameAtoms(await p.evaluate(() => fMulerQuizTargetSet()), c.atoms), c.id + ": incorrect branch target");
  }

  // Mode switches keep the branch quiz, but drop picks from the old diagram.
  await open("ethyl_4_isopropyl_3_methyl_2_hexanal", "en");
  await toExpanded();
  await armSelectAndBox("comp1");
  await clickAtom(11);
  for (const step of [{ index: 2, mode: "skeletal" }, { index: 0, mode: "condensed" }, { index: 1, mode: "expanded" }]) {
    await p.evaluate((index) => document.querySelectorAll("#radio2DMode .mode2DOption")[index].click(), step.index);
    await p.waitForFunction((mode) => mode2D === mode, step.mode);
    await p.waitForTimeout(500);
    s = await state();
    check(s.target === "compSecondSub1" && s.purpose === "branch" && s.sel.length === 0,
      step.mode + ": branch quiz must retain target without stale picks, got " + JSON.stringify(s));
    check(sameAtoms(await p.evaluate(() => fMulerQuizTargetSet()), [11, 12]), step.mode + ": branch target changed");
  }
  for (const atom of [11, 12]) await clickAtom(atom);
  s = await state();
  check(!s.target && /Correct/i.test(s.verdict), "branch quiz should complete after mode switches");

  // Stepping the active chain must update the ethyl group, not retain its
  // former atoms or a partial selection from the old chain.
  await open("ethyl_4_isopropyl_3_methyl_2_hexanal", "en");
  await toExpanded();
  await armSelectAndBox("comp1");
  await clickAtom(11);
  await p.evaluate(() => document.getElementById("chainPrevBtn").click());
  await p.waitForTimeout(800);
  s = await state();
  const stepped = await p.evaluate(() => ({ chain: fMulerMainChainResolved(), target: fMulerQuizTargetSet() }));
  check(sameAtoms(stepped.chain, [1, 2, 3, 4, 11, 12]), "chain step should select the alternate chain");
  check(s.sel.length === 0 && s.target === "compSecondSub1" && /substituent/i.test(s.prompt) &&
      hidden(s) && sameAtoms(stepped.target, [5, 6]),
    "chain step must clear old picks and refresh the branch prompt and target, got " + JSON.stringify({ state: s, stepped }));
  check(sameAtoms(await p.evaluate(() => fMulerQuizResolveTarget("compSecondSub1")), [5, 6]),
    "ethyl target must follow the alternate chain");
  for (const atom of [5, 6]) await clickAtom(atom);
  s = await state();
  check(!s.target && /Correct/i.test(s.verdict), "alternate-chain branch target should complete");

  // The same invalidation applies while a branch locant is waiting for its
  // prerequisite chain quiz.
  await open("ethyl_4_isopropyl_3_methyl_2_hexanal", "en");
  await toExpanded();
  await armSelectAndBox("comp0");
  await clickAtom(1);
  await p.evaluate(() => document.getElementById("chainPrevBtn").click());
  await p.waitForTimeout(800);
  s = await state();
  check(s.target === "compCarbonsCount" && s.sel.length === 0 && s.returnTo === "compNumber1",
    "chain step must reset an in-progress branch prerequisite, got " + JSON.stringify(s));
  await solveChain();
  s = await state();
  check(s.target === "compNumber1" && s.purpose === "branch" &&
      sameAtoms(await p.evaluate(() => fMulerQuizTargetSet()), [5, 6]),
    "branch prerequisite should return to the alternate-chain target, got " + JSON.stringify(s));

  // 5. Representative branch mappings and non-branch component precedence.
  for (const c of [
    { mol: "methyl_2_propanoic_acid", id: "comp1", atoms: [4] },
    { mol: "dimethyl_2_4_pentanone_3", id: "comp1", atoms: [6, 7] },
    { mol: "methyl_4_pentanol_2", id: "comp1", atoms: [6] },
    { mol: "isobutyl_2_methylpropanoate", id: "comp1", atoms: [4] },
    { mol: "isobutyl_isopropyl_ether", id: "comp3", atoms: [4] },
  ]) {
    await open(c.mol, "en");
    const result = await p.evaluate((id) => {
      const mode = fNameAnalysisModeForBoxId(id);
      return { mode, target: fMulerQuizResolveTarget(mode), purpose: fMulerQuizPurposeFor(mode) };
    }, c.id);
    check(result.purpose === "branch" && sameAtoms(result.target, c.atoms),
      c.mol + " " + c.id + ": branch target mismatch " + JSON.stringify(result));
  }
  for (const c of [
    { mol: "dimethyl_2_4_pentanone_3", id: "comp4", atoms: [2, 3, 4, 8], purpose: "loc" },
    { mol: "methyl_4_pentanol_2", id: "comp4", atoms: [7], purpose: "loc" },
    { mol: "butyne_2", id: "comp4", atoms: [2, 3], purpose: "bond" },
    { mol: "sec_butyl_ethanoate", id: "comp10", atoms: [3, 4, 5, 6], purpose: "branch" },
    { mol: "hydroxypropanoic_acid_2", id: "comp1", atoms: [], purpose: "free" },
    { mol: "hydroxypropanenitrile_2", id: "comp1", atoms: [], purpose: "free" },
  ]) {
    await open(c.mol, "en");
    const result = await p.evaluate((id) => {
      const mode = fNameAnalysisModeForBoxId(id);
      return { mode, target: fMulerQuizResolveTarget(mode), purpose: fMulerQuizPurposeFor(mode) };
    }, c.id);
    check(result.purpose === c.purpose && sameAtoms(result.target, c.atoms),
      c.mol + " " + c.id + ": non-branch precedence changed " + JSON.stringify(result));
  }
  // 5b. systematic ether alkoxy boxes resolve O + alkoxy chain as branch
  // (classic paints the same via fHighlightFG(1); quiz is heavy-only).
  for (const mol of ["ethyl_isopropyl_ether", "ethyl_sec_butyl_ether", "isobutyl_isopropyl_ether"]) {
    await open(mol, "en");
    await toExpanded();
    await p.evaluate(() => { try { document.querySelector("#radioSubstNaming [data-subst-mode='sys']").click(); } catch (e) {} });
    await p.waitForTimeout(800);
    const exp = await p.evaluate(() => {
      try {
        var o = (typeof functionalGroupObj !== "undefined" && functionalGroupObj && functionalGroupObj.ether && functionalGroupObj.ether.O) ? (functionalGroupObj.ether.O[0] + 1) : null;
        var ch = (typeof fGetEtherAlkoxyChain === "function") ? fGetEtherAlkoxyChain() : [];
        var arr = [];
        if (o) arr.push(o);
        (ch || []).forEach(function (a) { if (arr.indexOf(a) < 0) arr.push(a); });
        arr.sort(function (a, b) { return a - b; });
        var t1 = (typeof fMulerQuizResolveTarget === "function") ? fMulerQuizResolveTarget("compSecondSub1") : [];
        var t0 = (typeof fMulerQuizResolveTarget === "function") ? fMulerQuizResolveTarget("compNumber1") : [];
        var p1 = (typeof fMulerQuizPurposeFor === "function") ? fMulerQuizPurposeFor("compSecondSub1") : null;
        var p0 = (typeof fMulerQuizPurposeFor === "function") ? fMulerQuizPurposeFor("compNumber1") : null;
        return { exp: arr, t1: t1, t0: t0, p1: p1, p0: p0 };
      } catch (e) { return { err: String(e && e.message || e).slice(0, 120) }; }
    });
    check(exp.p1 === "branch" && sameAtoms(exp.t1, exp.exp),
      mol + " sys compSecondSub1 should resolve O+alkoxy as branch, got " + JSON.stringify(exp));
    check(exp.p0 === "branch" && sameAtoms(exp.t0, exp.exp),
      mol + " sys compNumber1 should resolve O+alkoxy as branch, got " + JSON.stringify(exp));
  }
  // 5c. 2-ethoxypropane full flow (ethyl_isopropyl_ether, IUPAC naming).
  await open("ethyl_isopropyl_ether", "en");
  await toExpanded();
  await p.evaluate(() => { try { document.querySelector("#radioSubstNaming [data-subst-mode='sys']").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  check(await armSelectAndBox("comp1"), "2-ethoxypropane: comp1 ethoxy box should exist");
  s = await state();
  check(s.target === "compSecondSub1" && s.purpose === "branch" && !s.returnTo,
    "2-ethoxypropane: ethoxy name should arm directly, got " + JSON.stringify({ target: s.target, returnTo: s.returnTo }));
  check(/Select the atoms of the substituent\./.test(s.prompt) && !/indicated position/i.test(s.prompt),
    "2-ethoxypropane: name prompt must be short, got " + JSON.stringify(s.prompt));
  check(s.numbers === 0, "2-ethoxypropane: name arm must show no aid, got " + s.numbers);
  {
    const tgtE = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
    check(tgtE.length > 0, "2-ethoxypropane: alkoxy target should be non-empty, got " + JSON.stringify(tgtE));
    for (const a of tgtE) check(await clickAtom(a), "2-ethoxypropane: missing anchor for alkoxy atom " + a);
    await p.waitForTimeout(400);
    s = await state();
    check(/Correct! These are the atoms of the substituent\./.test(s.verdict) && !s.hidden,
      "2-ethoxypropane: name exact must show the short Branch line, got " + JSON.stringify(s.verdict));
    check(!s.target && s.badges === 0, "2-ethoxypropane: exact should clear the target, stay numberless");
  }
  await open("ethyl_isopropyl_ether", "en");
  await toExpanded();
  await p.evaluate(() => { try { document.querySelector("#radioSubstNaming [data-subst-mode='sys']").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  check(await armSelectAndBox("comp0"), "2-ethoxypropane: comp0 locant box should exist");
  s = await state();
  check(s.target === "compCarbonsCount",
    "2-ethoxypropane locant: unsolved click should redirect to chain, got " + JSON.stringify(s.target));
  await solveChain();
  s = await state();
  check(s.target === "compNumber1" && s.purpose === "branch",
    "2-ethoxypropane locant: chain exact should auto-arm branch, got " + JSON.stringify(s));
  check(/at the indicated position/i.test(s.prompt), "2-ethoxypropane locant: prompt must be long, got " + JSON.stringify(s.prompt));
  check(s.numbers > 0, "2-ethoxypropane locant: numbering aid should be visible, got " + s.numbers);
  {
    const tgtL = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
    check(tgtL.length > 0, "2-ethoxypropane locant: target should be non-empty, got " + JSON.stringify(tgtL));
    for (const a of tgtL) check(await clickAtom(a), "2-ethoxypropane locant: missing anchor for atom " + a);
    await p.waitForTimeout(400);
    s = await state();
    check(/at the indicated position/i.test(s.verdict) && !s.hidden,
      "2-ethoxypropane locant: exact must show the long Branch line, got " + JSON.stringify(s.verdict));
    check(!s.target, "2-ethoxypropane locant: exact should clear the target");
  }
  await open("ethyl_4_isopropyl_3_methyl_2_hexanal", "en");
  check(sameAtoms(await p.evaluate(() => fMulerBranchAtomsForMode("compBranchSub99")), []),
    "an unmatched split piece must not take the whole branch slot");

  // 6. molecule switch: quiz disarms; a digit-led locant box must not stick,
  // while component boxes may (sticky restore is the feature).
  await open("methyl_2_pentane", "en");
  await toExpanded();
  await armSelectAndBox("comp1");
  s = await state();
  check(s.target === "compSecondSub1", "pre-switch: branch should be armed, got " + JSON.stringify(s.target));
  const switched = await p.evaluate(() => {
    try {
      const row = document.querySelector("#nomeclature2Menu .menuLi#ethane");
      if (!row || selectedMol === row.id) return false;
      row.click();
      return true;
    } catch (e) { return false; }
  });
  check(!!switched, "could not switch molecule in-page");
  if (switched) await p.waitForFunction(() => selectedMol === "ethane", null, { timeout: 10000 });
  await p.waitForTimeout(2200);
  s = await state();
  check(!s.target, "molecule switch should drop the branch quiz, got " + JSON.stringify(s));
  const stuckLocant = await p.evaluate(() => {
    try {
      const boxes = Array.from(document.querySelectorAll("#nameAnalysis .nameCompBox.selected"));
      return boxes.map((b) => b.id + ":" + (b.textContent || "").trim().slice(0, 16)).filter((t) => {
        const txt = t.split(":")[1] || "";
        return /^\d/.test(txt.replace(/^[-\s]+/, ""));
      });
    } catch (e) { return ["eval-error"]; }
  });
  check(stuckLocant.length === 0, "molecule switch must not carry a locant selection, got " + JSON.stringify(stuckLocant));

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
