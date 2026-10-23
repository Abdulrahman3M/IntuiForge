# Orchestration Brief — IntuiForge P11

- **Owner request:** Implement P11 fully; do not start P12.
- **Objective:** Deliver a safe AI article authoring studio with a versioned declarative contract, import/export, visual editing, same-renderer preview, component inspection, templates, validation diagnostics, undo/redo, and explicit publish.
- **Scope authority:** `IntuiForge-Implementation-Kit/Handoffs/IMPLEMENTATION-HANDOFF_IntuiForge_P11_AI-Article-Authoring-Studio-Export.md` and `Prompts/P11-Start-This-Phase-AR.txt`.
- **Features:** AI-01..AI-08 only.
- **Single-agent mode:** Sequential work only; no agent fan-out.
- **Architecture:** Authoring API and studio are generic; central article validation/rendering remain the source of truth. Do not change article semantics unless the established contract requires it.
- **Security:** Reject unsupported versions and invalid articles; do not execute source HTML/JS, fetch article URLs, or persist drafts implicitly.
- **Preservation:** P00–P10, RichViz vendor/ZIP, unrelated host files, and P12+ remain unchanged.
- **Verification:** Focused P11 tests, all existing tests, relevant P02/P05/P10 regressions, syntax/type/schema checks, and real dedicated-Edge interaction/screenshots at required widths, RTL/LTR, light/dark, and keyboard flows.
- **Exit:** P11 may be marked COMPLETE only when every AI ID has automated and observable evidence, docs/ledgers agree, browser identity/screenshots are verified, and only P11 files changed. Otherwise report partial status without starting another phase.
