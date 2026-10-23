# Test Status — P15

| Check | Result | Evidence |
|---|---|---|
| Baseline `npm test` | PASS — 117/117 | Before P15 changes. |
| `npm run test:p15` | PASS — 7/7 | REL-01..REL-07. |
| Final `npm test` | PASS — 124/124 | Zero failed/skipped/todo tests. |
| Build-script syntax checks | PASS | `node --check` on build, audit, sync and P15 test scripts. |
| Apache-2.0 metadata and notices | PASS | `package.json` declares Apache-2.0; root LICENSE and NOTICE are included; third-party license boundaries remain documented. |
| `npm run release:build -- release-apache-candidate` | PASS | 518-file package; repeated pack hashes match; offline install, 11 exports and schema smoke passed. Final archive SHA-256 is `a174191e76f1b7838aa6a9f8a8ed14308f0f3ae906ab8a80b1a983fa69170a46`. |
| Windows batch launch | PASS | Gallery 200, catalog 200 / 254 assets, project-root file 404; Ctrl+C stopped server. |
| Dedicated Edge identity and gallery | PASS | Browser Environment Manager verified Edge 155.0.4283.62 and CDP 127.0.0.1:9222; `edge://version` confirmed `IB-Edge-Debug\Profile`. The local gallery loaded 373 items, search returned one Mermaid result, and Preview opened. |
| Desktop and mobile viewport screenshots | PASS | Captured, saved, and visually inspected. `Reports/P15-Visual-Library-Desktop.png` (1440×1000) shows four cards across; `Reports/P15-Visual-Library-Mobile.png` (390×844) shows a single-column card within the viewport and horizontally scrollable categories. |

No known P15 test failure remains.
