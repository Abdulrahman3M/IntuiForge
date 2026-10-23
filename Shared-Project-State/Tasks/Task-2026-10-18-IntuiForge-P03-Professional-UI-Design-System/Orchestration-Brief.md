# Orchestration Brief — IntuiForge P03

## Objective and Scope

Owner-authorized P03 only: implement the host-agnostic UI design system and responsive visual reference gallery. Prove UI-01..UI-07. Stop after P03.

## Owner Constraints

- Generic any-compatible-project/page API; no InfoBank or named-host dependency.
- Preserve P00–P02, RichViz v0.5.0 and original ZIP; do not use prior HTML styling as the target.
- Single agent, sequential changes; no other phase or unrelated cleanup.
- Use only a dedicated AI browser after manager/process/CDP/profile preflight; never personal Edge.

## Skill Roster

- FOUNDATION: `project-orchestrator` — governance, scope and phase gates.
- FOUNDATION: `shared-project-state-manager` — evidence, task state and resumable checkpoints.
- SUPPORT: `token-optimization` — selective bounded reads while retaining every acceptance/test requirement.
- LEAD: `frontend-design` — concept, palette, typography, layout and visual critique.
- LEAD: P03 handoff with `executing-plans` and `test-driven-development` — ordered implementation and RED→GREEN tests.
- BROWSER: `browser-environment-manager` — sole dedicated Edge lifecycle/identity authority; no navigation before verification.
- GATE: `verification-before-completion` — fresh test and acceptance evidence before phase status.
- RULES: `create-strict-implementation-handoff` delivery/reporting constraints are applied; the existing handoff is execution authority, so no duplicate handoff is created.
- EXCLUDED: subagents, P04+, personal-browser fallback, external fonts/CDNs, RichViz visual changes.

## Logical Team Map

| Workstream | Role | Owner | Deliverable | Verification |
|---|---|---|---|---|
| Governance/state | FOUNDATION | Codex | P03 state, checkpoint, ledger | State doctor and manual state consistency |
| Tokens/theme/API | LEAD | Codex | Reusable design-system module | RED→GREEN unit tests and host-token browser checks |
| Reference gallery | LEAD | Codex | Isolated functioning gallery and browser fixture | Screenshots, responsive/RTL/LTR/keyboard evidence |
| Acceptance/report | GATE | Codex | UI ledger, reports, docs | Feature-by-feature evidence; no P04 |

## Supervisor Gates

1. Before product edits: P02 COMPLETE and full suite pass (PASS); P03 scope/contracts read (PASS); baseline recorded (PASS).
2. Before browser interaction: manager config, process/loopback/CDP and actual active profile identity must all be verified (currently UNVERIFIED; hold).
3. Before P03 COMPLETE: UI-01..UI-07 each PASS with tests/evidence, relevant browser matrix PASS, full required tests pass, ZIP untouched, state/docs/report consistent.

## Risk

Moderate. Public theme/API and CSS leakage are core concerns. Preserve the opt-in isolation boundary; browser verification is a mandatory gate and currently unavailable.
