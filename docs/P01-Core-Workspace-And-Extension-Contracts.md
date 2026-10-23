# P01 — Core Workspace & Extension Contracts

This document records the P01 public boundary. It does not define the article schema; P02 owns that contract. The engine accepts a validator supplied by trusted code and passes only that validator's successful `value` to a registered renderer.

## Package boundaries

| Package path | Responsibility | Dependency direction |
|---|---|---|
| `packages/core/` | Mount lifecycle, validator boundary, component/renderer/adapter registries, capability descriptors, failure isolation | No dependency on RichViz, React, CMS, or a host framework |
| `packages/react-island/` | Optional injected `createRoot` bridge around a single DOM island | Depends only on core error type; does not import or require React |
| `packages/visualization-legacy/` | RichViz 0.5.0 façade and renderer adapter | Depends on the vendored RichViz package; core does not depend on it |

The workspace publishes a versioned `./v1` export path and TypeScript declarations. The package is private and has no fabricated release/build version; release allocation remains with the project's later release phase.

## Lifecycle

`createIntuiEngine({ validateArticle })` returns `validateArticle`, `mount`, `registerComponent`, `registerRenderer`, `registerAdapter`, `getCapabilities`, and `dispose`. `mount(container, input, environment)` returns `{ ready, update, refresh, dispose, state }`.

Each render attempt receives an `AbortSignal`. Starting an update/refresh or disposing the handle aborts the previous attempt and disposes its returned handle/function. A renderer that adds listeners must bind them to this signal or return a cleanup handle. A stale asynchronous render result is immediately disposed and cannot re-enter the mount root. Only the supplied mount root is replaced; sibling host content is not touched.

Validation uses the discriminated result `{ ok: true, value }` or `{ ok: false, errors }`. Missing, throwing, or malformed validators produce typed errors. P01 does not normalize article fields, parse Markdown, or claim the proposed `intui.article` schema is implemented.

## Extension contract

Components, renderers, and adapters register separately with a stable lowercase ID, semantic version, capability strings, and a trusted `render` function. Duplicate IDs, invalid IDs/versions, duplicate capabilities, and multiple default renderers are rejected. The registration returns an idempotent unregister callback. `getCapabilities()` returns metadata only, without exposing mutable registries.

Renderers access components and adapters through `context.getComponent(id)` and `context.getAdapter(id)`. The core has no vendor-engine import; RichViz and its six existing adapters remain behind `packages/visualization-legacy/`.

## Optional React island

The host supplies ReactDOM's `createRoot` function and the React element. IntuiForge creates one child `<div data-intui-react-island>` and renders only into that node. Updating re-renders that island; disposal calls `unmount()` and removes only the island. The host page is not migrated to React and React is not installed or imported by the core.

## Failure and localization

Validator or renderer errors return a mount result with `status: "error"`, notify the optional `onError` observer, and show a generic localized status panel. The fallback never displays exception text, is an assertive live alert, has Arabic/RTL and English/LTR copy, uses isolated shadow styling when supported, and keeps essential text at 16 CSS px. Errors thrown by observers or teardown do not break the host page.

## RichViz compatibility

The public façade preserves `RichViz.validate(source)`, `RichViz.types`, and `RichViz.render(container, spec, options)` and returns the original v0.5.0 handle. `registerRichVizAdapter(engine)` registers a stable adapter ID/version; the legacy engines remain locally packaged and load through RichViz's own lazy adapter boundaries. The original `Input/RichViz v0.5.0.zip` is unchanged. GPL Captiva assets and unrelated gallery/docs are not imported into P01; they remain solely in the source archive.

## Security and portability

- Article-supplied source is never evaluated as JavaScript.
- The core requires a trusted validator before accepting input for rendering.
- All host services remain optional, explicit dependencies; IntuiForge owns no host routes, identity, storage, search, CMS, or user data.
- React and visualization engines are optional and isolated behind adapters.
- The error fallback uses text nodes and scoped styles; it does not write host-wide CSS or raw HTML.

## P01 verification

`npm test` runs focused Node tests for lifecycle/listener cleanup, stable registration, adapter isolation, React islands, localized errors, and the actual RichViz 0.5.0 import/validation surface. `tests/browser/p01.html` is the module-based fixture for rendering a real RichViz step guide and both fallbacks when the dedicated AI browser can reach the loopback server. `tests/browser/fallback.html` is the file-safe visual check for localized fallback behavior.
