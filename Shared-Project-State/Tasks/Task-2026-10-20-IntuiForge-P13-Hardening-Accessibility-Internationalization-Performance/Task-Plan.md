# Task Plan — IntuiForge P13 Hardening, Accessibility, Internationalization & Performance

## Objective

Implement P13 NFR-01..NFR-08 in the existing shared engine, preserving article schema v1, existing host APIs, RichViz compatibility, local/offline operation, Arabic RTL and English LTR.

## In Scope

- Securely validate JSON text, JavaScript objects, Markdown manifests, plugin/component boundaries, URLs, assets and SVG media.
- Make the first-party renderers CSP-compatible and ensure article data cannot produce executable HTML, scripts or arbitrary code.
- Bound parsing, tables, maps, scientific models, media buffers and asynchronous rendering lifecycles.
- Verify keyboard, screen-reader, focus, text alternatives, readable font sizes and responsive behavior.
- Verify Arabic RTL, English LTR and mixed-direction technical tokens.
- Preserve local asset operation, lazy media/visualization loading and usable offline/error fallbacks.
- Add focused automated and real-browser evidence, synchronize P13 docs/state/traceability, and produce `Reports/P13-Completion.md`.

## Out of Scope / Prohibited

- P14/P15 work, website/CMS/account/auth implementations, third-party host patches, new dependencies, external downloads, unrelated cleanup, and breaking article/API changes.
- Replacing RichViz or altering its vendor directory/source ZIP without a separately verified need and its vendor update protocol.
- Article-authored HTML, JavaScript, dynamic module URLs, event-handler attributes, implicit network calls, or untrusted plugin code.
- Personal Edge use, global browser termination, and false PASS claims for missing browser proof.

## Preservation Requirements

Preserve P00–P12 behavior and public contracts, article schema v1, stable IDs/examples, 14 RichViz types and six vendor adapters, `edu-viz`, third-party notices, host-owned routes/content/styles/data, CSS containment, 16px meaningful content, offline/static fallback, and RTL/LTR behavior.

## Ordered Work

1. Confirm P12 COMPLETE and preserve the CP-001 source/hash baseline.
2. Map NFR-01..NFR-08 to canonical owners, existing test fixtures and verified gaps.
3. Fix shared validation, registration, URL/media and CSP trust boundaries without widening public behavior.
4. Add resource budgets, cancellation/disposal and lazy/offline behavior to the central render paths.
5. Exercise accessibility, localization, directionality and responsive behavior in live browser fixtures.
6. Add focused automated/browser/performance/security regression coverage.
7. Run only phase-relevant tests, performance checks and browser audits; correct failures.
8. Update directly affected docs, P13 feature ledger/traceability/coverage, shared state and completion report.
9. Mark P13 COMPLETE only if every NFR and mandatory gate has PASS evidence; otherwise leave PARTIALLY COMPLETE/BLOCKED and stop before P14.

## Acceptance Checklist

- [x] NFR-01 all JSON/object/Markdown/plugin/media input paths reject adversarial data with typed paths and without invoking accessors or user code.
- [x] NFR-02 CSP blocks inline script execution; unsafe HTML/SVG and URL protocols cannot reach executable DOM; only trusted, capability-limited code registers plugins.
- [x] NFR-03 large content remains within declared budgets; render/update/dispose aborts work and leaves no active animation, fetch or object URL.
- [x] NFR-04 keyboard, semantics, visible focus, screen-reader alternatives, 16px meaningful text, and responsive layouts pass focused browser checks.
- [x] NFR-05 Arabic RTL and English LTR preserve reading order, locale labels, number isolation and mixed-direction identifiers.
- [x] NFR-06 shipped/local assets and interactive behavior have no CDN requirement; optional external features degrade with readable offline fallbacks; heavy media/visualization content loads on demand.
- [x] NFR-07 focused unit, integration, browser, security, accessibility, offline, performance and immediate-regression checks have honest PASS/FAIL/UNVERIFIED evidence.
- [x] NFR-08 dedicated Edge process, loopback CDP endpoint and active profile are verified by Browser Environment Manager and the authorized Edge AI tool.
- [x] P00–P12 and third-party/vendor data are preserved; only P13-owned files are changed.
- [x] P13 report and feature ledger agree; phase stops before P14.
