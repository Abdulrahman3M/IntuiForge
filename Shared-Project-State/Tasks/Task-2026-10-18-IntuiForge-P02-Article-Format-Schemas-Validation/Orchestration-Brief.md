# Orchestration Brief — IntuiForge P02

## Objective and Scope

Owner-authorized P02 only: define the portable versioned article format and implement strict shared validation across JSON, Markdown and JavaScript-object inputs. Prove ART-01..ART-08. Stop after P02.

## Owner Constraints

- IntuiForge is host-agnostic and independent of InfoBank, CMSs, sites, frameworks, identity and host data.
- Preserve RichViz v0.5.0, notices, public APIs, 14 types, six adapters and `edu-viz`; never alter the input ZIP.
- No subagents or parallel workstreams; no UI/browser use unless new P02 evidence makes it applicable.
- Do not open or start a later phase.

## Skill Roster

- FOUNDATION: `project-orchestrator` — governance, scope, risk and supervisor gates.
- FOUNDATION: `shared-project-state-manager` — phase state, checkpoint and resumable evidence.
- SUPPORT: `token-optimization` — selective reads, compact state, no skipped verification.
- LEAD: P02 handoff with `executing-plans` and `test-driven-development` — scoped implementation and RED→GREEN proof.
- GATE: `verification-before-completion` — fresh evidence before claims.
- EXCLUDED: `browser-environment-manager` — P02 has no UI/browser acceptance criterion; activate only if scope evidence changes.
- EXCLUDED: handoff-authoring operation — the existing P02 handoff is execution authority; do not create a duplicate.

## Logical Team Map

| Workstream | Objective | Role | Owner | Deliverable | Verification |
|---|---|---|---|---|---|
| Governance/state | Confirm P01 gate and preserve owner constraints | FOUNDATION | Codex | P02 state/checkpoint | State doctor + supervisor review |
| Article contract | Freeze v1 schema and Markdown/legacy boundaries | LEAD | Codex | Schema/API/docs | Schema/fixture tests |
| Validation/security | Normalize JSON/object/fence inputs and reject unsafe content | LEAD | Codex | Validator/version handling/diagnostics | TDD + adversarial tests |
| Acceptance | Map all ART IDs and close P02 only | GATE | Codex | Feature ledger/report | Full P02 gate + whole Node suite |

## Supervisor Gates

1. Before edits: P01 COMPLETE evidence and original ZIP hash confirmed (PASS).
2. Before implementation: relevant architecture/article/security contracts and current validator boundary inspected (PASS); tests must first fail for intended missing behavior.
3. Before COMPLETE: every ART ID has tests/evidence; no blocking FAIL/UNVERIFIED; source ZIP hash unchanged; docs/state/report agree; no unrelated changes.

## Risk

MODERATE. Public format compatibility and untrusted content are central. No destructive operations or external side effects are planned. Product-level conflicts block only the affected requirement.
