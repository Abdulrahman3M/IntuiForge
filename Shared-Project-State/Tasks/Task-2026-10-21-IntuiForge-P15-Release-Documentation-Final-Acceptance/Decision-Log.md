# Decision Log — P15

## D-001 — Package semver and distribution boundary

- **Date:** 2026-10-21
- **Decision:** Set the initial package metadata version to `1.0.0`, while keeping `private: true` and `license: UNLICENSED`.
- **Authority:** User requested completion of release phase; P01 reserved public package/release metadata for P15.
- **Reason:** Root exports and article schema are already versioned, but root `package.json` had no name/version and `npm pack` failed. This phase creates a concrete local, reproducible archive without making a public licensing grant.
- **Effect:** Local package installation and checks are supported; registry publishing and public redistribution remain out of scope.

## D-002 — Preserve distinct third-party licenses

- **Date:** 2026-10-21
- **Decision:** Keep all upstream notices in their source locations, describe the Captiva GPL collection separately, and mark IntuiForge itself UNLICENSED.
- **Reason:** The package contains materials under different upstream terms; no project-wide relicense or public distribution authorization was found.

## D-003 — Browser verification initially deferred

- **Date:** 2026-10-21
- **Decision:** Defer browser navigation until dedicated process and CDP identity can be checked. This was superseded by D-004 after elevated status inspection succeeded.
- **Reason:** Browser policy requires verified dedicated process identity before navigation. No personal-profile fallback is allowed.

## D-004 — Complete dedicated Edge and screenshot verification

- **Date:** 2026-10-21
- **Decision:** Verify the dedicated AI-Agent-Browser, open the local gallery, exercise search and preview, and capture desktop and narrow viewport screenshots inline.
- **Evidence:** Browser Environment Manager verified Edge 155.0.4283.62 and CDP `127.0.0.1:9222`; `edge://version` showed `IB-Edge-Debug\Profile`. The gallery exposed 373 items, search reduced results to one Mermaid item, Preview opened, and resource inspection found no off-origin requests. The temporary local server was stopped after capture.
- **Limit:** The screenshot connector rejected project file paths under its configured workspace allowlist. Captures were inspected inline; no persistent PNG artifacts are claimed.

## D-006 — Persist P15 screenshots after connector path denial

- **Date:** 2026-10-23.
- **Decision:** Reopen the gallery in the authorized Edge session, capture desktop and mobile viewports, and persist the PNG data through the workspace-bound Node runtime.
- **Evidence:** `Reports/P15-Visual-Library-Desktop.png` (1440×1000) and `Reports/P15-Visual-Library-Mobile.png` (390×844), both visually inspected; see checkpoint CP-004.
- **Limit:** The Edge manager could not inspect process metadata because CIM access is disabled in the sandbox. Edge page navigation and screenshot capture were available and succeeded.

## D-005 — Apply Apache License 2.0 to IntuiForge-authored materials

- **Date:** 2026-10-21
- **Decision:** The owner selected Apache License 2.0 for IntuiForge-authored code and documentation.
- **Implementation:** Added the root `LICENSE` and `NOTICE`, set package metadata to `Apache-2.0`, and clarified the boundary in release documentation. Retained all RichViz, Captiva GPL, engine, and asset-specific notices unchanged.
- **Distribution:** Kept `private: true`; the npm package remains unpublished. Rebuilt the 518-file local archive; preserved the superseded unlicensed artifact and its manifest/checksum under `release/history/pre-apache-license-2026-10-21/`.
- **Verification:** P15 tests 7/7 and full suite 124/124; repeated package hashes match; offline install, eleven exports, and packaged schema pass.
