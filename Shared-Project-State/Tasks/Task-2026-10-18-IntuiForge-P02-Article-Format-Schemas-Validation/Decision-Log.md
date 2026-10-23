# Decision Log — P02

## D-001 — P02 start authorized

- **Date:** 2026-10-18
- **Decision:** Start P02 only; stop after its completion gate.
- **Authority:** Owner's explicit message: “ابدأ المرحله التاليه P02”.
- **Reason:** P01 is COMPLETE with current 7/7 Node baseline and matching protected ZIP hash.
- **Affected:** Phase-state, shared state and P02 implementation.
- **Owner approval required:** No additional approval for P02; later phases still require explicit authorization.
- **Supersedes:** P01 handoff notes instructing the agent to await P02 approval.

## D-002 — Host-agnostic contract retained

- **Date:** 2026-10-18
- **Decision:** Do not bind article schema or APIs to InfoBank or any named host.
- **Authority:** Owner's explicit clarification, reinforced by project charter and P02 handoff.
- **Reason:** IntuiForge must work with any compatible project/page through a general integration contract.
- **Affected:** Article contract, validator, docs and tests.
- **Owner approval required:** No; preserve the existing owner decision.
- **Supersedes:** None.

## D-003 — Browser checks not applicable at P02 start

- **Date:** 2026-10-18
- **Decision:** Do not invoke the browser manager or navigate Edge unless evidence shows P02 creates a rendered UI/browser-dependent behavior.
- **Authority:** P02 scope/phase handoff and owner browser constraint.
- **Reason:** Current P02 scope is schema, parsing, validation, fixtures and documentation; no UI acceptance criterion exists.
- **Affected:** P02 verification/report.
- **Owner approval required:** No.
- **Supersedes:** None.

## D-004 — Freeze portable article schema v1

- **Date:** 2026-10-18
- **Decision:** Freeze the host-agnostic `intui.article` envelope at schema version `1.0.0`, publish Draft 2020-12 JSON Schema, and accept only that version until a historical/later migration is specified and tested.
- **Authority:** P02 handoff explicitly assigns schema finalization; owner authorized P02. No prior IntuiForge article schema version exists in P00/P01 evidence.
- **Reason:** Preserve deterministic validation without inventing a migration history or binding the contract to a named host.
- **Affected:** Article schema, parser, safe input validation, Markdown grammar, docs and examples.
- **Owner approval required:** No additional gate within authorized P02 scope.
- **Supersedes:** The proposal-only wording in the previous `Article-Format-Contract.md`.
