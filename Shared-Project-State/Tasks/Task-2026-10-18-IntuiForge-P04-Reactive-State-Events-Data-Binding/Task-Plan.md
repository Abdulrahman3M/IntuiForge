# Task Plan — IntuiForge P04 Reactive State, Events & Data Binding

## Objective

Execute only P04 after owner approval and the verified P03 COMPLETE gate. Add the smallest reusable host-agnostic runtime for scoped reactive state, computed expressions, declarative actions, cross-block bindings and async resource status/retry.

## Scope

- P04 Feature IDs INT-01 through INT-07.
- A central additive `packages/state/` runtime and `./state` package export.
- Runtime validation for state descriptors and bounded allowlisted AST evaluation; deterministic state transactions and selector notifications.
- Declarative action dispatch through state mutations and explicitly host-provided capability handlers.
- Article block bindings coordinated by the shared runtime; host-injected asynchronous resource loading with explicit external-consent gate.
- Focused runtime, integration and security tests; directly affected API docs and P04 evidence.

## Must Preserve

- IntuiForge remains a generic engine for compatible projects/pages; no InfoBank, CMS, website, framework, authentication, persistence, route or network dependency.
- Frozen `intui.article` v1 schema and all P00–P03 contracts, IDs, docs, tests and examples; only additive, backward-compatible action schema additions if required.
- RichViz 0.5.0 API, existing 14 visualization types, six adapters, notices/licenses, offline assets and `edu-viz` behavior.
- Original ZIP, user data and files outside P04 scope.
- No arbitrary HTML/JavaScript evaluation, endpoint strings, article-driven network fetch, or host side effect without an explicit host-approved capability.

## Out of Scope

- P05 renderer, later widgets/authoring/science features, user-progress persistence, CMS/account integration, replacement engines, RichViz vendor edits, unrelated refactors and browser-environment creation or repair.
- Visual redesign: no old standalone HTML reference may be used as a target.

## Acceptance Criteria

- [x] INT-01: validated scoped store synchronously propagates a committed update to dependent subscribers; unaffected selectors do not fire.
- [x] INT-02: allowlisted actions have deterministic behavior; privileged host actions require a registered handler; unknown/unavailable actions do not mutate state.
- [x] INT-03: AST evaluator supports only fixed operators with bounded depth/node count; hostile properties, unsupported operators, non-finite math and code strings fail without execution.
- [x] INT-04: computed graph evaluates topologically, rejects cycles, recomputes only dependents and rolls back failed transactions.
- [x] INT-05: one slider event updates text, metric and visualization binding consumers synchronously from the same variable.
- [x] INT-06: trusted loader has idle/loading/ready/empty/error/retry semantics; external work cannot start absent explicit consent; no global fetch or article-supplied endpoint.
- [x] INT-07: binding/resource subscriptions and abortable work are cleaned on dispose; remount does not duplicate listeners.
- [x] Regression tests, docs, feature ledger, phase state, reports and shared state agree; stop after P04.

## Baseline

- P03 verified COMPLETE; P04 baseline `npm test` PASS 24/24 on 2026-10-18.
- No Git repository is present; branch/HEAD unavailable. No root IntuiForge `AGENTS.md` exists. RichViz vendor code is out of scope.
- Article schema/validator already define initial state, derived AST, action allowlist and block bindings. No central reactive runtime exists.
- Browser manager Status for `AI-Agent-Browser` returns `Unknown environment` and its canonical manager config is absent. `mcp__edge_ai` became exposed later but was not used because the dedicated identity remains unverified. P04 introduces no rendered UI, so browser/screenshot checks are not applicable; no environment was created and no fallback browser was used.

## Execution Sequence

1. Write behavior-first tests for every INT ID and observe RED.
2. Implement the shared state/expression/action/binding/resource runtime with no dependencies.
3. Run focused tests, full regressions, security checks and public API checks; repair failures at their source.
4. Update only P04 docs/schema additions and feature traceability evidence.
5. Run kit and shared-state validation, check RichViz archive integrity and scope, write final reports/checkpoints, then stop.

## Phase Map

| Phase | Objective | Status | Dependency |
|---|---|---|---|
| P04 | Reactive state, events and data binding | COMPLETE | P03 COMPLETE; owner approved |
| P05+ | Not in this task | NOT_STARTED | P04 completion and separate owner approval |
