# P02 Verification Evidence

Date: 2026-10-18 (Asia/Dubai). Runtime: Node v24.19.0, Windows 11 build 26200.

| Gate | Command | Result |
|---|---|---|
| Focused P02 | `npm run test:p02` | PASS, 12 tests / 12 pass / 0 fail |
| Complete suite | `npm test` | PASS, 19 tests / 19 pass / 0 fail (P01 7 + P02 12) |
| Implementation kit | `python .\IntuiForge-Implementation-Kit\Scripts\Validate-Kit.py` | PASS, 16 phases / 114 features / 0 structural errors |
| Shared state | `node 'C:\Users\Abdoo\.codex\plugins\cache\created-by-me-remote\aipm-chatgpt-capabilities\1.0.6\skills\shared-project-state-manager\scripts\sps.mjs' doctor --project-root .` | PASS, no problems; project writable; no Git repository |
| Protected source | `Get-FileHash -LiteralPath 'Input/RichViz v0.5.0.zip' -Algorithm SHA256` | PASS, `6639552377C83B0FA48739C2140B808FF71CECF5ED9BC68C427D4E3B3482EEF3` |

## Test-first evidence

- Initial P02 API contract tests were run before the validator existed and failed because the article package entry was absent (intentional RED).
- The later script-markup case failed before the safe-clone rejection was added; it passes afterward (`UNSAFE_MARKUP`).
- A lowercase `onclick` case failed before event-handler detection was made case-insensitive; it passes afterward (`UNSAFE_PROPERTY`).
- The oversized-Markdown case failed before whole-source preflight was added; it passes afterward (`SOURCE_TOO_LARGE`).
- Final runs are green as recorded above; the tests were not skipped or weakened.

## Coverage

The focused suite covers ART-01..ART-08, public schema/package exports, Markdown/`edu-viz`, canonical-ID collisions, non-mutating object/JSON normalization, explicit version rejection, static summary, relative/external asset rules, error source locations, hostile object graphs, actions/derived expressions, script markup, mixed-case event-handler keys, hidden media URL rejection, and all five proposal examples.

Browser, screenshot, responsive, and keyboard checks are not applicable to P02 because it produces no rendered UI. No browser identity or screenshot result is claimed.
