# Decision Log — IntuiForge P06

## D-001 — Activate P06 after verified P05 closeout

- Decision: P05 is COMPLETE and P06 is the active phase.
- Authority: Owner request on 2026-10-19; P05 completion report, CP-005, phase state and DOC traceability.
- Reason: All P05 feature gates now have automated and actual browser evidence.
- Affected files: P06 task-state and implementation scope only.
- Owner approval required: Approval to transition received in the current user request.
- Supersedes: Earlier P05 handoff instruction to stop before P06 until owner approval.

## D-002 — Keep P06 widgets generic and centrally implemented

- Decision: P06 behavior belongs in the verified shared IntuiForge contracts/renderer or a minimal new central module only if repository evidence proves the abstraction is missing; no per-site patches.
- Authority: P06 handoff and owner decision that IntuiForge is project/page agnostic.
- Reason: All WGT features are general capabilities, not InfoBank-specific behavior.
- Owner approval required: No; this is the existing architecture contract.
- Supersedes: None.

## D-003 — Do not expand the article contract speculatively

- Decision: Make no new public block type/field decision until focused tests and current schema/validation conventions establish the minimum necessary declarative shape.
- Authority: Existing P02/P05 versioned article contract and P06 handoff preservation rules.
- Reason: Avoid silent breaking changes or arbitrary executable behavior.
- Owner approval required: No for additive compatible extensions; escalate only if repository evidence shows a material incompatible contract change is unavoidable.
- Supersedes: None.

## D-004 — Close P06 and transition to the next phase

- Date: 2026-10-19.
- Decision: Complete P06 after all WGT gates pass, then read the P07 start instructions and activate the next phase under its own task state. Do not treat this as approval to implement any P07 features beyond the user's requested transition/activation.
- Authority: Owner's latest instruction: finish the remaining current phase, make it complete, and transition to the new phase.
- Reason: P06 implementation and all mandatory tests/browser checks are complete; the explicit owner request satisfies the P06 handoff's separate-owner-approval gate.
- Affected files: P06 closeout state, global phase state, and subsequently P07 task state if its start instructions permit activation.
- Owner approval required: Already granted by the current instruction.
- Supersedes: Earlier P06 task-plan stop note requiring a separate owner instruction before P07; that gate is satisfied, while P06 itself remains closed.

## D-005 — Repair generated control identity warning within P06

- Date: 2026-10-19.
- Decision: Assign every renderer-generated input/select a collision-checked deterministic `id` and stable `name`, and guard it with a renderer integration test.
- Authority: Direct Edge browser Issues finding during P06 verification; supported by the owner requirement to complete and verify the phase.
- Reason: Accessible labels alone did not prevent the browser warning; generated native controls should expose stable form identity.
- Affected files: `packages/article-renderer/src/index.js`, `tests/p06-renderer.test.mjs`, and `docs/P06-General-Widgets.md`.
- Owner approval required: No; this is a minimal in-scope accessibility/HTML correctness fix.
- Supersedes: None.
