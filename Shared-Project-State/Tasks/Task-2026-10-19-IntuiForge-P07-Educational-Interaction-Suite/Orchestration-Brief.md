# Orchestration Brief — IntuiForge P07

## Objective and authority

Implement only P07 / EDU-01..EDU-07: a central, declarative educational interaction suite. P06 is COMPLETE with all seven WGT IDs PASS, phase report, ledger and 50/50 regression proof. The owner's current instruction explicitly requests closing the current phase and transitioning to the next; this authorizes P07 activation. P07 implementation must follow its own handoff and stop at its phase boundary.

## Owner invariants and exclusions

- IntuiForge is generic and host-independent; InfoBank is not a dependency or acceptance gate.
- No RichViz vendor/source ZIP edits, host-project patches, personal Edge, arbitrary article HTML/JS, destructive schema migration, unrelated cleanup, or P08+ work.
- Preserve P00-P06 behavior, stable IDs, article v1 compatibility, safe actions, offline behavior, CSS isolation, themes, RTL/LTR and existing examples.
- One agent, sequential execution; no subagents or parallel agents.
- No Git repository or formal change/build allocator is present. Do not invent history IDs or versions.

## Selected roster / team map

| Workstream | Role / skill | Dependency | Deliverable / gate |
|---|---|---|---|
| Governance and state | FOUNDATION: project-governance-manager principles + shared-project-state-manager; LEAD: project-orchestrator | P06 closeout | Verified P07 task state, approvals, baseline checkpoint; no hidden governance conflicts |
| Article/data contract | LEAD: create-strict-implementation-handoff principles; SUPPORT: token-optimization | Contract and existing central source inspection | Minimal compatible quiz/activity shapes and validator tests; no execution of article-authored code |
| Runtime implementation | LEAD: P07 implementation handoff; SUPPORT: systematic-debugging + test-driven-development | Failing tests first | Central stepper, quiz, flashcards, timeline, matching/order, progress and guided-comparison behavior |
| Visual verification | SUPPORT: browser-environment-manager | Only after process/CDP/profile preflight | Dedicated Edge interaction, keyboard, RTL, themes and responsive evidence |

The strict-handoff Skill is applied as execution/governance rules referenced by P07; no new handoff document is requested. Specialist versions are used only when locally available; do not claim unavailable versions.

## Supervisor gates

1. Confirm all EDU features are tied to validated contract, central renderer, tests and one observable proof.
2. Write focused tests before production implementation; retain all P00-P06 tests.
3. Run all directly affected regression tests and the project's phase-required checks; report `PASS`, `FAIL` or `UNVERIFIED` truthfully.
4. Use a live dedicated Edge browser only after fresh identity verification; visual/UI criteria cannot pass from generated markup alone.
5. Update docs, traceability, feature ledger, phase state, checkpoint and report; stop after P07 and await owner for P08.
