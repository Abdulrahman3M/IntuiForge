# Orchestration Brief — IntuiForge P06

## Objective

Execute only P06 / WGT-01..WGT-07: reusable, accessible, declarative general widgets for tables, validated forms, calculators, comparisons, interaction affordances, filters/KPIs, and stateful tabs/accordion/cards.

## Authority and phase gate

- P05 is COMPLETE: `Reports/P05-Completion.md`, CP-005, phase state and DOC feature traceability agree.
- Owner asked on 2026-10-19 to finish P05 and transition to the next phase; this is explicit approval to activate P06.
- User's P06 start prompt/handoff is the implementation authority. Do not begin P07 or later.
- Single-agent, sequential execution only; no subagents or parallel agent execution.

## Owner decisions / invariants

- IntuiForge is generic and host-independent; InfoBank is not a requirement or product dependency.
- Preserve RichViz v0.5.0 behind the existing adapter. Do not modify RichViz vendor files, the original ZIP, unrelated packages, or host-project files.
- Preserve P00-P05 contracts, IDs, offline behavior, safe declarative actions, CSS isolation, accessibility, RTL/LTR and legacy content.
- Do not use `richviz_intelligent_ui.html` as a visual design reference.
- Do not invent history IDs/versions/builds. No Git repository is present.

## Verified environment / execution guidance

- Project root: `D:\Test\02 │ Assistance Projects\IntuiForge — Intelligent UI Engine`.
- Relevant installed skills were read: strict handoff, token optimization and Browser Environment Manager; installed snapshots are 1.0.0, while P06 handoff requests 1.4.0/1.0.1. Follow available instructions; do not claim the unavailable versions were loaded.
- Dedicated Edge was verified in P05; before any P06 browser action, recheck the current process/CDP/profile using Browser Environment Manager and use only the verified `mcp__edge_ai` session. Never access personal Edge.
- Root/nested agent-instruction scan found no applicable `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, or `GEMINI.md` outside preserved vendor content. No Git repository exists.

## Evidence pointer

See `Task-Plan.md`, `File-Change-Map.md`, `Test-Status.md`, `Blockers.md`, and checkpoint `Checkpoints/CP-001.md` for baseline gaps, test output, code hashes and next actions. P06 report target: `Reports/P06-Completion.md`.

## Orchestration roster and supervisor result

Single-agent, sequential execution. No subagents were used (the P06 owner/task constraints prohibit delegation).

| Workstream | Role / skill | Deliverable | Supervisor result |
|---|---|---|---|
| Governance and owner decision | FOUNDATION: project-governance-manager principles; LEAD: project-orchestrator | Confirm authority, P06 boundary and explicit next-phase authorization | Approved; no conflicting project rules found |
| Phase continuity | FOUNDATION: shared-project-state-manager | Update manifest, current state, task report, checkpoint and handoff | Approved; test and browser evidence reconciled |
| Runtime regression diagnosis | SUPPORT: systematic-debugging + test-driven-development | Reproduce and fix missing generated control IDs/names | Approved; RED then GREEN test, 50/50 full suite |
| Dedicated browser verification | SUPPORT: browser-environment-manager | Process/CDP/profile verification and live P06 fixture matrix | Approved; 16/16 behavior checks, zero final console messages |
| Context efficiency | SUPPORT: token-optimization principles | Batch independent read-only checks and avoid redundant/parallel-agent work | Applied; no verification requirements dropped |

P06 completion authority: current user instruction requests finishing the active phase and transitioning to the new phase. P06 is complete; P07 must use its own start instructions and task state.
