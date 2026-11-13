// Skeletal vertex → atom assignment: every drawn joint must resolve to the
// atom it represents. Regression guard for the C=O offset-end bug: the
// parallel-line endpoint of a multi-line bond sits ~60 SVG units from the true
// joint; at an aldehyde carbonyl carbon (only one drawn single bond) it used
// to be assigned the oxygen, so clicking the carbon selected O.
//
// Checks, per molecule, in skeletal mode with selection armed:
//   A. every vertex picks an atom that is an endpoint of all its bonds;
//   B. no offset multi-line end is left unmerged (post-condition of
//      fMulerSelectVertices);
//   C. for each carbonyl atom, clicking the carbon-side endpoint of every
//      incident bond (the exact old failure spot) picks the carbonyl atom.
const { chromium } = require("playwright-core");

const MOLS = [
  "ethanal", "propanal", "butanal", "pentanal", "propynal",
  "propanone", "butanone", "pentanone_2",
  "butanoic_acid", "propenoic_acid", "methyl_methanoate",
  "propene", "butene_2", "ethyne", "ethanenitrile", "nitroethane",
];

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1600, height: 950 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 200)));

  for (const mol of MOLS) {
    await p.goto("http://localhost:8901/mulermoc-nom-56.html?lang=en&mol=" + mol, { waitUntil: "load", timeout: 60000 });
    await p.waitForTimeout(9000);
    await p.evaluate(() => {
      const opts = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"));
      const o = opts.find((x) => /σκελετ|skeletal/i.test(x.textContent || "")) || opts[2];
      if (o) o.click();
    });
    await p.waitForTimeout(2200);
    await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
    await p.waitForTimeout(300);

    const r = await p.evaluate(() => {
      const geom = fMulerSelectGeom();
      const verts = (geom.verts || []).map((v, i) => ({ x: v.x, y: v.y, bonds: v.bonds.slice(), atom: geom.vassign ? geom.vassign[i] : null }));
      const out = { mode: mode2D, atoms: allAtomsTypeList.slice(), verts, a: [], b: [], c: [] };

      const endpoints = (bond) => {
        const q = bondList[bond];
        return q ? [q[0] - 1, q[1] - 1] : null;
      };
      const isMulti = (bond) => !!(bondList[bond] && bondList[bond][2] > 1);

      // A: vertex pick must be an endpoint of every incident bond.
      for (let i = 0; i < verts.length; i++) {
        const v = verts[i];
        if (!v.bonds.length) continue;
        const pk = fMulerSelectPick(v.x, v.y);
        if (!pk || pk.kind !== "atom") {
          out.a.push({ i, at: [Math.round(v.x), Math.round(v.y)], bonds: v.bonds, pick: pk ? pk.kind : null, why: "not-atom" });
          continue;
        }
        const atom0 = pk.atom - 1;
        for (const bond of v.bonds) {
          const ep = endpoints(bond);
          if (!ep) continue;
          if (ep.indexOf(atom0) < 0) {
            out.a.push({ i, at: [Math.round(v.x), Math.round(v.y)], bonds: v.bonds, pick: pk.atom, why: "not-endpoint-of-bond-" + bond });
            break;
          }
        }
      }

      // B: no offset multi-line end may remain within MULER_SELECT_JOINT_EPS
      // of a vertex that carries a different bond.
      const eps = (typeof MULER_SELECT_JOINT_EPS === "number" ? MULER_SELECT_JOINT_EPS : 150);
      for (let i = 0; i < verts.length; i++) {
        const v = verts[i];
        if (v.bonds.length !== 1 || !isMulti(v.bonds[0])) continue;
        for (let j = 0; j < verts.length; j++) {
          if (i === j) continue;
          const u = verts[j];
          if (u.bonds.indexOf(v.bonds[0]) >= 0) continue;
          if (!u.bonds.some((bond) => bond !== v.bonds[0])) continue;
          const d = Math.hypot(u.x - v.x, u.y - v.y);
          if (d <= eps) {
            out.b.push({ at: [Math.round(v.x), Math.round(v.y)], joint: [Math.round(u.x), Math.round(u.y)], d: Math.round(d) });
            break;
          }
        }
      }

      // C: carbonyl atom — every incident bond's carbon-side endpoint picks it.
      let carbons = [];
      try {
        const fg = functionalGroupObj || {};
        if (fg.aldehyde && Array.isArray(fg.aldehyde.O)) {
          fg.aldehyde.O.forEach((o) => { if (Array.isArray(atomConnectivityList[o]) && atomConnectivityList[o].length) carbons.push({ kind: "aldehyde", c: atomConnectivityList[o][0], o }); });
        }
        if (fg.ketone && Array.isArray(fg.ketone.O)) {
          fg.ketone.O.forEach((o) => { if (Array.isArray(atomConnectivityList[o]) && atomConnectivityList[o].length) carbons.push({ kind: "ketone", c: atomConnectivityList[o][0], o }); });
        }
        if (fg.carboxylicAcid && Array.isArray(fg.carboxylicAcid.O)) {
          fg.carboxylicAcid.O.forEach((e) => {
            const o = Array.isArray(e) ? e[1] : e;
            if (Array.isArray(atomConnectivityList[o]) && atomConnectivityList[o].length) carbons.push({ kind: "acid", c: atomConnectivityList[o][0], o });
          });
        }
      } catch (e) {}
      const groupByBond = {};
      (geom.groups || []).forEach((g) => { if (g && typeof g.bond === "number") groupByBond[g.bond] = g; });
      carbons.forEach((cbn) => {
        // homonyms are fine; only report once per (atom, bond) pair
        const joints = verts.filter((v) => v.atom === cbn.c);
        if (!joints.length) return;
        const joint = joints.find((v) => v.bonds.some(isMulti)) || joints[0];
        for (let bond = 0; bond < bondList.length; bond++) {
          const ep = endpoints(bond);
          if (!ep || ep.indexOf(cbn.c) < 0) continue;
          const g = groupByBond[bond];
          const rep = g && g.rep ? g.rep : (g && g.lines && g.lines[0]);
          if (!rep) continue;
          const d1 = Math.hypot(rep.x1 - joint.x, rep.y1 - joint.y);
          const d2 = Math.hypot(rep.x2 - joint.x, rep.y2 - joint.y);
          const near = d1 <= d2 ? { x: rep.x1, y: rep.y1 } : { x: rep.x2, y: rep.y2 };
          const far = d1 <= d2 ? { x: rep.x2, y: rep.y2 } : { x: rep.x1, y: rep.y1 };
          // exactly the drawn carbon-side line end (old bug spot) plus a point
          // 25% along the line (same physical atom, different geometry)
          const probes = [
            { x: near.x, y: near.y, tag: "end" },
            { x: near.x + (far.x - near.x) * 0.25, y: near.y + (far.y - near.y) * 0.25, tag: "quarter" },
          ];
          probes.forEach((pt) => {
            const pk = fMulerSelectPick(pt.x, pt.y);
            const got = pk && pk.kind === "atom" ? pk.atom - 1 : null;
            if (got !== cbn.c) {
              out.c.push({
                kind: cbn.kind, c: cbn.c + 1, bond: bond, tag: pt.tag,
                at: [Math.round(pt.x), Math.round(pt.y)],
                pick: pk ? pk.kind + ":" + pk.atom : null
              });
            }
          });
        }
      });
      return out;
    });

    check(r.mode === "skeletal", mol + ": mode should be skeletal, got " + r.mode);
    check(r.a.length === 0, mol + ": vertex pick not an endpoint of its bonds " + JSON.stringify(r.a));
    check(r.b.length === 0, mol + ": unmerged multi-line offset end " + JSON.stringify(r.b));
    check(r.c.length === 0, mol + ": carbonyl carbon misses " + JSON.stringify(r.c));
    console.log(mol + ": verts=" + r.verts.length + " A=" + r.a.length + " B=" + r.b.length + " C=" + r.c.length);
  }

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL", e); process.exit(1); });
