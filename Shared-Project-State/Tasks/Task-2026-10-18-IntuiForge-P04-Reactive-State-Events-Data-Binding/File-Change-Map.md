# File Change Map — IntuiForge P04

| Path | Phase | Reason | Expected Change | Status | Permanent/Temporary |
|---|---|---|---|---|---|
| `packages/state/src/` | P04 | Central runtime | Store, safe expressions, actions, bindings, async resources | Complete | Permanent |
| `packages/state/src/index.d.ts` | P04 | Public API | Typed runtime exports | Complete | Permanent |
| `package.json` | P04 | Public package entry | Additive `./state` export and `test:p04` script | Complete | Permanent |
| `packages/article/src/schema.js`, `packages/article/src/index.js`, `packages/article/schema/article-v1.schema.json` | P04 | Additive declarative actions | Backward-compatible `scroll` and `expand` shapes and semantic validation | Complete | Permanent |
| `tests/p04-reactive-state.test.mjs` | P04 | Acceptance/security | INT-01..07 behavior tests plus action schema regression | Complete | Permanent |
| `docs/P04-Reactive-State-Events-And-Data-Binding.md`, `README.md` | P04 | User/API documentation | Runtime contracts and host capability rules | Complete | Permanent |
| `IntuiForge-Implementation-Kit/Article-Format-Contract.md` | P04 | Action schema expansion | Document additive action fields/runtime semantics | Complete | Permanent |
| `IntuiForge-Implementation-Kit/Feature-Traceability.csv`, `Feature-Traceability.json` | P04 | Traceability | Record verified status per INT ID | Complete | Permanent |
| `Execution-State/P04-feature-ledger.json` | P04 | Feature evidence | Per-ID status and direct proof paths | Complete | Permanent |
| `IntuiForge-Implementation-Kit/Execution-State/phase-state.json` | P04 | Phase state | P04 status/report/features | Complete | Permanent |
| `Reports/P04-Completion.md` | P04 | Required report | Scope, proof, browser result, blockers | Complete | Permanent |
| `Shared-Project-State/` | P04 | Resume/governance | P04 plan, decisions, evidence, handoff and checkpoint | Complete | Permanent |

No InfoBank host/application paths or RichViz vendor files are in scope.
