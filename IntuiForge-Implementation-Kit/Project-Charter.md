# IntuiForge — Project Charter & Non-Negotiables

## Product decision
IntuiForge is **a new independent intelligent user-interface/content engine** evolved from the old RichViz package. RichViz is a conserved visualization-compatible subsystem, **not** a discarded codebase or a whole encyclopedia platform. IntuiForge is host-agnostic: it supplies a portable article/interactive runtime, components, editor tools and explicit integration contracts for any compatible web project or page. No specific CMS, application or website is a dependency or defines the product scope.

## Mandatory experiences
- Produce real interactive, professionally designed, AI-authorable articles that include prose and functional components in one responsive story.
- Achieve the **quality principles** of high-end GPT-6 Intelligent UI presentation — adaptive content-first layouts, contextual controls, useful interactions, fine detail, accessible polished styling — without claiming the ability to reuse proprietary ChatGPT internals or duplicate the exact UI pixel-by-pixel.
- Full feature coverage from `Feature-Traceability.csv` is binding. Anything in that ledger assigned to P00–P15 is required to be operational and tested in its respective phase. Illustrative demo alone is insufficient.
- Existing RichViz API, `edu-viz` Markdown, 14 documented render types, six adapters and vendor licenses remain compatible or require a separately owner-approved material breaking change. Host examples are fixtures only; none is the canonical or required host.
- Arabic RTL across Arabic articles, mixed-direction identifiers, responsive/accessibility, offline/local library loading and **16px minimum article text**.
- All article source is safe declarative content with schema validation on string and object inputs; no execution of arbitrary user- or AI-authored JavaScript.
- No code shipped yet by this handoff bundle. The agent executes sequential handoffs only when specifically invoked.

## Exclusions
- Do not rebuild a host application's CMS, identity system, search or user database inside IntuiForge.
- Do not require a particular content format or framework, rewrite host routes/global styles, or force a single visualization engine for every type.
- Do not use old `richviz_intelligent_ui.html` as visual target, nor equate attractive one-off static HTML with a working reusable engine.
- No undisclosed online AI calls, analytics, user tracking, remote fonts/CDNs, personal Edge sessions, automatic publishing or service installation.

## Acceptance philosophy
Feature traceability = requirement → owning phase → code/spec evidence → automated tests → real-browser visual evidence when UI-related → docs/history. Unsupported environmental checks are `UNVERIFIED`, never `PASS`; a phase with missing mandatory acceptance is not complete.
