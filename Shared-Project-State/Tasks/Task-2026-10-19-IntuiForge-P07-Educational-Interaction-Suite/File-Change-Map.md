# File Change Map — P07 Baseline

| Path | Phase | Reason | Expected Change | Status |
|---|---|---|---|---|
| `packages/article/src/schema.js` | P07 | Educational block/action contracts | Add only P07-specific declarations proven necessary | Baseline inspected; unchanged |
| `packages/article/schema/article-v1.schema.json` | P07 | Runtime/shipped schema parity | Synchronize compatible schema changes | Baseline inspected; unchanged |
| `packages/article/src/index.js` | P07 | Cross-field validation and safe references | Validate educational contracts and bindings | Baseline inspected; unchanged |
| `packages/article/src/index.d.ts` | P07 | Public article types | Add only required educational public shapes | Baseline inspected; unchanged |
| `packages/article-renderer/src/index.js` | P07 | Central runtime/static widget ownership | Implement actual educational controls and states | Baseline inspected; unchanged |
| `packages/article-renderer/src/widgets.js` | P07 | Pure deterministic activities | Extend only reusable calculations/helpers needed | Baseline inspected; unchanged |
| `packages/article-renderer/src/index.d.ts` | P07 | Optional host callback types | Extend only if needed for progress/activity save contract | Baseline inspected; unchanged |
| `packages/state/src/actions.js` / `store.js` | P07 | Existing activity/action behavior | Touch only if source evidence requires safe lifecycle support | Baseline inspected; unchanged |
| `tests/p07-*.test.mjs`, `tests/browser/p07.*` | P07 | Automated and actual browser proof per EDU ID | Add focused tests and live fixture | Not created |
| `tests/browser-server.mjs`, `package.json` | P07 | Serve fixture and expose focused command | Add minimal P07 support | Not changed |
| `docs/P07-Educational-Interaction-Suite.md` | P07 | Document validated public shapes and behavior | Add P07 contract guide | Not created |
| `IntuiForge-Implementation-Kit/Feature-Traceability.csv/.json` | P07 | Feature truth | Mark EDU IDs only with proof | EDU-01..07 PLANNED |
| `IntuiForge-Implementation-Kit/Execution-State/P07-feature-ledger.json`, `phase-state.json`, `Reports/P07-Completion.md` | P07 | Phase evidence | Create ledger and final report | Not created |

No P08+, InfoBank, RichViz vendor/ZIP, or host-project path is in scope.
