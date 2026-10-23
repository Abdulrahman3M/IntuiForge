# File Change Map — Task-2026-10-18-IntuiForge-P01-Core-Contracts

| Path | Phase | Reason | Expected Change | Status | Permanent / Temporary |
|---|---|---|---|---|---|
| `IntuiForge-Implementation-Kit/Execution-State/phase-state.json` | P01 | Record owner-approved phase start | P01 becomes IN_PROGRESS; P00 unchanged | Changed | Permanent state |
| `Shared-Project-State/` | P01 | Required cross-phase continuity and operational test routing | P01 plan, checkpoint, evidence, and handoff | Changed | Permanent state |
| `Shared-Project-State/Test-Workspace/Task-2026-10-18-IntuiForge-P01-Core-Contracts/RichViz-Inspection/` | P01 | Inspect verified source ZIP without modifying it | Temporary extracted inspection copy | Created | Temporary |
| `Input/RichViz v0.5.0.zip` | P01 | Protected source of truth | Must remain unchanged; SHA-256 verified | Unchanged | Permanent owner input |
| `packages/core/`, `packages/react-island/`, `packages/visualization-legacy/` | P01 | Implement core contracts and isolated adapters | Workspace packages, declarations, RichViz runtime/license manifest | Created | Permanent |
| `tests/`, `package.json`, `README.md`, `docs/P01-Core-Workspace-And-Extension-Contracts.md` | P01 | Automated and browser smoke verification; public package docs | Focused tests, browser harness, package exports and docs | Created / Updated | Permanent |
| `Execution-State/P01-feature-ledger.json`, `Reports/P01-Completion.md` | P01 | Per-ID evidence and completion record | CORE-01..CORE-06 PASS with linked proof | Created | Permanent |
| `IntuiForge-Implementation-Kit/Execution-State/phase-state.json` | P01 | Record phase gate | P01 COMPLETE; P00 unchanged; P02 NOT_STARTED | Updated | Permanent state |
| `Shared-Project-State/` | P01 | Carry state, checks, limitations and approval gate | P01 complete; await owner approval before P02 | Updated | Permanent state |
