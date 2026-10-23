# Task Plan — IntuiForge P15

## Objective

Complete P15 release preparation and final acceptance: reproducible private package, safe install/update/rollback docs, license preservation, audit of all 114 features, release docs and samples, governance synchronization, and a Windows local gallery launcher.

## Scope and constraints

- Follow the P15 implementation handoff and the project's sequential execution protocol.
- Preserve all prior reports, host behavior, RichViz 0.5.0 source, third-party licenses, asset catalog, and the original audited ZIP.
- Keep the package host-agnostic, private, offline-installable, and free of required runtime dependencies.
- Do not publish, invent a Git/build/history identifier, create a P16, or use personal Edge.

## Acceptance

- REL-01..REL-07 each have implementation and test/evidence mappings.
- Two package builds have matching SHA-256; local offline installation and public exports are verified.
- License files and distinct asset-license boundaries remain packaged.
- Traceability contains exactly 114 unique IDs with evidence.
- Quick start, architecture, API, gallery, migration/rollback, and actual article sample files ship in the archive.
- Native Windows launcher serves the allowlisted gallery locally and is stopped after verification.
- Full focused suite is green; phase/shared state and report are synchronized.
