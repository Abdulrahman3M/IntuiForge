# File Change Map — IntuiForge P05

| Path | Phase | Reason | Expected Change | Status | Permanent/Temporary |
|---|---|---|---|---|---|
| `packages/article-renderer/src/index.js` | P05 | Central portable composition | Safe semantic DOM, nested blocks, safe inline Markdown rendering, P04 runtime, adapters, static output, isolated styles | Implemented; automated 5/5 | Permanent |
| `packages/article-renderer/src/index.d.ts`, `packages/core/src/index.d.ts` | P05 | Public typed contract | Renderer registration/static API and typed host callbacks/theme/asset resolver | Implemented; syntax/package export verified | Permanent |
| `package.json`, `README.md`, `docs/P05-Complete-Portable-Article-Renderer.md` | P05 | Public package and usage | Export, test command, host-neutral setup and block data contracts | Implemented | Permanent |
| `packages/article/src/index.js` | P05 | Internal Markdown target validation | Reject unresolved in-article links to undeclared section/block IDs | Implemented; P02 12/12 and P05 5/5 | Permanent |
| `packages/article/src/schema.js`, `packages/article/schema/article-v1.schema.json`, `IntuiForge-Implementation-Kit/Article-Format-Contract.md` | P05 | Additive nested group support | Backward-compatible `group` block type for nested containers/tab panels; document safe fragment behavior | Implemented; P02 12/12 | Permanent |
| `packages/visualization-legacy/src/index.js` | P05 | RichViz adapter object-spec handling | Route object specs through the preserved RichViz validation/normalization path; avoid missing optional defaults | Implemented; verified real browser mount | Permanent |
| `tests/p05-article-renderer.test.mjs` | P05 | Behavior/security regression | DOC composition, safe text/Markdown, links, actions, bindings, disposal and static output | PASS 5/5 | Permanent |
| `tests/browser/p05.html`, `tests/browser/p05.js`, `tests/browser-server.mjs` | P05 | Real browser evidence harness | Responsive/RTL/layout/font/host-isolation/interactions fixture; repeatable keyboard test and error reporting | Fixture verified in dedicated Edge; P05 browser matrix PASS | Permanent |
| `IntuiForge-Implementation-Kit/Feature-Traceability.csv`, `Feature-Traceability.json`, `Execution-State/P05-feature-ledger.json` | P05 | Feature evidence | DOC IDs link to automated tests and browser evidence | All DOC-01..07 PASS | Permanent |
| `IntuiForge-Implementation-Kit/Execution-State/phase-state.json`, `Reports/P05-Completion.md` | P05 | Phase reporting | COMPLETE status and browser identity/acceptance evidence | Updated 2026-10-19 | Permanent |
| `Shared-Project-State/` and P05 task reports/checkpoints | P05 | Resumability | Baseline, decisions, test outcomes, blocker, handoff and current state | Updated | Permanent |

No InfoBank paths, RichViz vendor paths or original source ZIP are in scope.
