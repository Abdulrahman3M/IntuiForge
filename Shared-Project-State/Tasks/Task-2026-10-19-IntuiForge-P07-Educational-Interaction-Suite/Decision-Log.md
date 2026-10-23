# Decision Log — IntuiForge P07

## D-001 — Activate P07 after P06 closeout

- Date: 2026-10-19.
- Decision: P06 is COMPLETE; activate P07 and execute only EDU-01..EDU-07 under this separate task state.
- Authority: Owner's current request to finish the active phase and transition to the new phase; P06 completion report/ledger and phase-state confirm the gate.
- Reason: P06 has all seven WGT features PASS and required regression/browser evidence.
- Affected phases/files: P07 phase state and this task record.
- Owner approval required: Already granted by the current instruction.
- Supersedes: No decision; satisfies the P06 handoff's separate owner-approval gate.

## D-002 — Keep educational behavior central and inert

- Date: 2026-10-19.
- Decision: Implement educational behaviors in the shared validated article contract and central renderer; do not add per-site patches, raw JS/HTML, implicit remote persistence, or CMS-specific behavior.
- Authority: P07 handoff and owner's independent/host-agnostic project decision.
- Reason: P07 is a reusable engine capability and existing P02/P04 architecture is declarative.
- Affected phases/files: P07 article schema, validator, renderer and docs as evidence supports.
- Owner approval required: No for compatible narrow implementation; request only if a material public-contract conflict is found.
- Supersedes: None.
