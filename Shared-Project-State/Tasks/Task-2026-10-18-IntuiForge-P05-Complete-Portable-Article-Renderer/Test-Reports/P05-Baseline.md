# P05 Baseline — before product implementation

- Captured: 2026-10-18, before changes to P05 product files.
- Prior phase gate: P04 COMPLETE; P04 report and seven INT feature statuses checked.
- Repository: no Git repository present; no branch or commit SHA is applicable.
- Source ZIP: `Input/RichViz v0.5.0.zip`; SHA-256 `6639552377c83b0fa48739c2140b808ff71cecf5ed9bc68c427d4e3b3482eef3`.
- P01–P04 focused baseline: 7/7, 12/12, 5/5, and 8/8 tests passed respectively.

## Baseline source hashes

| Path | SHA-256 before P05 |
|---|---|
| `packages/core/src/engine.js` | `374638d0b0a4b6b2105b5a18e6a142131eec60ff748e106c3e1a8cf678126a34` |
| `packages/core/src/index.d.ts` | `ebcd1f5437d7ff2752e1d7c25a12408ce51b884c5c972db7efa35ca59399a9af` |
| `packages/article/src/schema.js` | `a2efe895a93f43385803ad1574c8e2b27063a1db1a36344e8bd37ce536e909e9` |
| `packages/article/src/index.js` | `a2a09dec9b6ce0aec97082b3190eaf0b7596e844b8d40cae9331118d993a1b10` |
| `packages/state/src/index.js` | `92cce08a019b540c3a9387c142dc1799a40cc0699ea2ce910ae01c6634e8de7e` |
| `packages/state/src/actions.js` | `a304a91f3e2cd4424a1895e830bd233808d6a983ee452f35972b7cf6b2154949` |
| `packages/state/src/bindings.js` | `426ddee17bc45c4bdcfd97c24cbeff90911d2131d99b0d8d47effcc288e2f4c3` |
| `packages/design-system/src/tokens.js` | `d1d9fcedf927ee2621dac502e07096116863787c932a0826932ebeafa5b6c5fe` |
| `package.json` | `146e0d2f9396545b8826b21343018131543b26df586ff4a43fed89235452315a` |
| `tests/browser-server.mjs` | `aee3521c74343584f620f80bb26942afdfe57e7614e51d5d62b297946a00f527` |

## Architecture gaps at baseline

- Core had a generic renderer registry and lifecycle, but no complete article composition renderer.
- Article v1 normalized safe declarative content, but nested container blocks had no `group` type.
- P04 supplied the scoped state, action dispatcher, expression evaluator, and block binding APIs.
- P03 supplied immutable design tokens and host-theme normalization; there was no article-specific presentation layer.
- Existing RichViz 0.5.0 remained available behind its existing adapter. No vendor or ZIP change was needed or made.
- Browser-manager preflight could not verify the dedicated AI Edge process/configuration, loopback listener, CDP identity, or active profile. See `Blockers.md`.
