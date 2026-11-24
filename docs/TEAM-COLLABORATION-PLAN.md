# Team collaboration and decision-making plan

Status: proposed — scaffold not yet created  
Date: 2026-11-24  
Owner: supervisor / main developer  
Purpose: give students and colleagues a low-friction way to propose solutions,
state opinions, and see which decisions are open, accepted or rejected.

## 1. Goals

- State development directions in one durable place.
- Separate **direction**, **proposal**, **decision** and **execution**.
- Let teammates contribute opinions asynchronously.
- Keep one authoritative answer per decision.
- Preserve the reasoning and rejected options for future reference.
- Keep the workflow light enough for a small academic team.

Non-goals:

- a full project-management bureaucracy;
- replacing code review or the probe/verification process;
- storing sensitive student data in public issues.

## 2. Three layers

### A. Direction — roadmap in the repository

```text
docs/ROADMAP.md
docs/roadmap/
  data-model.md
  naming-core.md
  ui-ux.md
  research.md
```

Each direction should state:

- goal and non-goals;
- current state;
- open decisions;
- dependencies;
- phase/milestone;
- owner;
- links to proposals/issues.

`docs/ROADMAP.md` is the index; the files under `docs/roadmap/` hold the detail.
Chat and meetings may discuss direction, but the roadmap is the durable record.

### B. Proposals and opinions — GitHub Discussions / Issues

Use GitHub because the repository already lives there.

**Discussion categories**

- `Ideas` — open-ended suggestions.
- `Data model` — molecule schema, corpus, import/export.
- `Naming core` — algorithm behaviour, rules, validation.
- `UI/UX` — menus, viewers, authoring, mobile.
- `Research` — study design, metrics, thesis work.
- `Polls` — quick preference signals.

**Issue templates**

- **Proposal** — context, problem, at least two options, recommendation,
  evidence, risks, impacted files, decision deadline.
- **Decision needed** — one question, options, deadline, owner, required input.
- **Bug / task** — normal execution items.

**Structured opinion comment**

```text
Position: support / oppose / undecided
Reason:
Evidence / example molecule:
Risks:
Alternative:
```

Reactions are useful for a quick signal; the written rationale is what gets
recorded.

### C. Decisions — ADR-style register

```text
docs/decisions/
  ADR-0001-molecule-json-schema.md
  ADR-0002-dev-vs-release-data-loading.md
  ADR-0003-menu-index-fields.md
docs/DECISIONS.md                 # index + status table
```

Each ADR:

- context;
- options considered;
- decision;
- consequences/trade-offs;
- owner and date;
- links to the discussion/issue;
- status: proposed / accepted / rejected / superseded.

`docs/DECISIONS.md` is the one-screen queue:

| ID | Question | Status | Owner | Due | Outcome |
|---|---|---|---|---|---|

### D. Execution — GitHub Project board

Views:

- **Roadmap** — directions/phases.
- **Decision queue** — `needs-decision` items sorted by due date.
- **Proposals** — open discussion/RFC items.
- **Implementation** — accepted decisions turned into tasks.
- **Student contributions** — incoming molecules, validations, reviews.

Custom fields: `direction`, `phase`, `decision status`, `owner`,
`target version`.

Labels: `proposal`, `needs-decision`, `opinion`, `accepted`, `rejected`,
`data-model`, `naming-core`, `ui`, `research`, `student`.

## 3. Workflow

1. A direction or problem is stated in `docs/ROADMAP.md`.
2. Someone writes a Proposal issue or Discussion with options.
3. Teammates add structured opinions; the owner sets a comment deadline.
4. The owner/delegate makes the decision.
5. It becomes an ADR plus a `DECISIONS.md` entry.
6. Accepted work becomes implementation issues on the board.
7. Chat is for discussion; the decision is copied to GitHub.

Cadence:

- **Async:** proposals open for 3–7 days.
- **Weekly 30–45 min review:** decision queue only.
- **Monthly roadmap review:** directions and priorities.
- **Per release:** close decisions, update roadmap, freeze.

## 4. Operating rules

- One question per decision issue.
- Require at least two options and a recommendation.
- Prefer evidence: example molecules, failing cases, probe output.
- Record rejected options and why.
- Separate student drafts from live decisions; only accepted outcomes enter
  the main docs.
- If students are minors or share personal data, keep drafts in a private
  team area and publish only anonymised decisions.
- English for code/ADR titles; Greek summaries for school stakeholders when
  useful.
- Never put student personal data in public issues.

## 5. Minimum viable setup

1. `docs/ROADMAP.md`
2. `docs/DECISIONS.md`
3. Three GitHub issue templates: Proposal, Decision needed, Bug/task.
4. One GitHub Project with `Roadmap` and `Decision queue` views.
5. A weekly decision-queue review.

Add Discussions and ADR files after the first few decisions prove the process.

## 6. Current open decisions

These came from the molecule-data planning discussion:

1. **Record boundary:** one JSON object per molecule.
2. **Source layout:** per-molecule JSON under `molecules/builtin/`; student
   candidates under `molecules/incoming/`.
3. **Development data loading:** per-file discovery via dev-server endpoint or
   generated manifest.
4. **Closed-release data loading:** generated synchronous bundle, not folder
   scanning or 1000 requests.
5. **Menu index:** precompute formula, GR/EN name, classification, carbon
   count, skeletal SVG/thumbnail and aliases.
6. **Derived vs stored fields:** decide whether `classification`, `smiles` and
   names are canonical source data or build-time derived/cached data.
7. **JSON export first:** replace the executable custom-molecule `.js` export
   with one JSON object; keep legacy export temporarily.
8. **Sandbox import and validator:** dev-only JSON import plus shared schema
   validation before migrating the 147 built-ins.
9. **Migration order:** keep v59 bundled data live until the dev file loader
   matches it; migrate in batches.
10. **Closed release scope:** no new-molecule/draft/import UI in the closed
    build; development tooling remains separate.

## 7. Next actions

With a 20-minute setup window:

1. Create `docs/ROADMAP.md` with the current directions.
2. Create `docs/DECISIONS.md` with the table above and the ten open decisions.
3. Add `.github/ISSUE_TEMPLATE/proposal.md`,
   `decision.md` and `task.md`.
4. Create GitHub labels `proposal`, `needs-decision`, `opinion`, `accepted`,
   `rejected`, `data-model`, `naming-core`, `ui`, `research`, `student`.
5. Create the GitHub Project with `Roadmap` and `Decision queue` views.
6. Schedule the weekly decision-queue review.

## 8. Cross-machine resume

When continuing from another machine:

1. Pull the repository first (`git pull`).
2. Read this file, `docs/ROADMAP.md` and `docs/DECISIONS.md`.
3. Check `git status` and `git log --oneline -5`.
4. Continue from the first unchecked item in §7 or the oldest open decision.

OpenCode sessions are machine-local; the repository documents and GitHub issues
are the shared state.
