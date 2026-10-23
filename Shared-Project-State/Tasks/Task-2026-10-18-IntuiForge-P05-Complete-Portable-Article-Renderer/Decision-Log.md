# Decision Log — IntuiForge P05

## D-001 — Execute P05 only

- Decision: Begin P05 after P04 COMPLETE and stop before P06.
- Authority: Explicit owner approval in the current conversation; P05 phase prompt.
- Reason: Preserve the project's sequential phase gate.
- Affected phases/files: P05 source, tests and records.
- Owner approval required: No further approval for P05; P06 remains gated.
- Supersedes: None.

## D-002 — Use central generic renderer

- Decision: Create the minimum shared renderer abstraction only because core has a registry but no article composition renderer; render validated article data through core lifecycle and reuse P04/P03 packages.
- Authority: P05 handoff and Architecture Blueprint.
- Reason: DOC-01..DOC-07 apply to any compatible project/page and must not be implemented as host-specific patches.
- Affected phases/files: `packages/article-renderer/`, package export, core environment contract only if required.
- Owner approval required: No; explicit architectural source of truth.
- Supersedes: None.

## D-003 — Reuse approved P03 design system

- Decision: Keep Quiet Signal / Intelligent Editorial tokens and add only renderer-specific scoped rules; do not use the rejected HTML or create a second visual palette.
- Authority: P03 Design System and P05 Design-Quality-Contract.
- Reason: Preserve coherent theme/color/accessibility and host isolation.
- Affected phases/files: Renderer styles and browser fixture.
- Owner approval required: No.
- Supersedes: None.

## D-004 — Browser gate is unverified, not bypassed

- Decision: Do not call `mcp__edge_ai` or any generic browser until the canonical environment, process/listener ownership, CDP endpoint and actual profile path are verified. Continue non-visual implementation; hold P05 COMPLETE if browser proof remains unavailable.
- Authority: P05 Browser-Environment-Protocol and current Browser Environment Manager skill.
- Reason: Manager returned `Unknown environment: AI-Agent-Browser`; canonical config was not found under this execution context; process inspection returned access denied; no listener was observed.
- Affected phases/files: P05 browser checks/report.
- Owner approval required: If the required profile/config must be created or modified, ask for the smallest specific authority; do not infer that a new browser environment is permitted.
- Supersedes: None.

## D-005 — Add a nested `group` block type additively

- Decision: Add `group` to the existing v1 block vocabulary and generated JSON Schema so tabs and nested sections have a stable structural container; existing v1 documents remain valid without migration.
- Authority: DOC-03, P05 handoff step 3, and the owner-approved P05 scope.
- Reason: Existing v1 `tabs` had child blocks but no semantic group/panel container or stable per-tab label contract.
- Affected files: `packages/article/src/schema.js`, `packages/article/schema/article-v1.schema.json`, Article Format Contract, renderer and tests.
- Owner approval required: No; additive and backward compatible.
- Supersedes: None.

## D-006 — Static output is explicit, not claimed as automatic hydration

- Decision: Provide a validated/escaped `renderArticleStatic()` API and print rules; document that it emits static markup but does not automatically hydrate arbitrary server HTML.
- Authority: DOC-05, P02 static fallback contract, and existing core mount lifecycle.
- Reason: Core mount owns and replaces its supplied mount root; claiming seamless hydration without a dedicated reusing-DOM lifecycle would be misleading.
- Affected files: Renderer API/docs/tests and P05 status report.
- Owner approval required: No; preserve exact behavior truthfully and leave automatic hydration unclaimed.
- Supersedes: None.

## D-007 — Normalize adapter object specs through RichViz's validator

- Decision: Serialize plain object specs to JSON before calling the preserved RichViz render API, so the library validates and applies optional defaults before rendering.
- Authority: Actual P05 Edge failure (`TypeError` reading `showTitle`) from valid object input with omitted optional `options`; P05 DOC-06 scope and passing browser retest.
- Reason: The legacy renderer accepts a raw object but assumes normalization has already occurred; the string path is its existing validation/normalization path. Fix belongs in the IntuiForge-owned adapter, not the vendor source.
- Affected files: `packages/visualization-legacy/src/index.js` and P05 browser tests.
- Owner approval required: No; compatibility fix within DOC-06 scope, vendor/source ZIP untouched.
- Supersedes: None.

## D-008 — Close P05 and activate P06

- Decision: Mark P05 COMPLETE after final automated and verified-browser evidence, then open P06 as the active phase under a new task record.
- Authority: Owner request on 2026-10-19 to complete the remaining current phase and transition to the next phase.
- Reason: All DOC-01..DOC-07 passed; dedicated Edge identity, viewport, interaction and screenshot evidence are recorded.
- Affected phases/files: P05 closeout artifacts; new P06 shared-state task and phase state.
- Owner approval required: Approval received in the current user request.
- Supersedes: D-001's instruction not to start P06 before a later owner approval.
