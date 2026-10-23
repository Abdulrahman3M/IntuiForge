# P04 — Reactive State, Events and Data Binding

P04 adds the generic runtime package `@intuiforge/engine/state`. It is independent of InfoBank, any CMS, framework, host route, account system or persistence provider. It consumes the validated `intui.article` v1 model and supplies runtime contracts that later renderers and widgets can use.

## Create an article-scoped runtime

Validate source before creating runtime objects. Each call creates a separate scope; state from one article instance is not shared with another.

```js
import { validateArticle } from "@intuiforge/engine/article";
import {
  bindArticleBlocks,
  createActionDispatcher,
  createReactiveStore,
} from "@intuiforge/engine/state";

const result = validateArticle(articleSource);
if (!result.ok) throw new Error("The article did not validate.");

const article = result.value;
const store = createReactiveStore(article);
const bindings = bindArticleBlocks(article, store, (update) => {
  componentRegistry.get(update.blockId)?.setProperty(update.property, update.value);
});
const actions = createActionDispatcher({ article, store, handlers: hostCapabilities });

// A renderer calls this from the control's actual change event.
actions.dispatchEvent("temperature-slider", "change", { value: 55 });

// Tear down before discarding or navigating away from the article.
bindings.dispose();
store.dispose();
```

`bindArticleBlocks` traverses nested blocks and subscribes each declared `bindings` property to the same store variable. It invokes the consumer once with the current value, then synchronously after each successful update. A slider, text label, metric and plot may therefore consume one variable without duplicated page-specific state. The callback is the renderer boundary; P04 does not render widgets or DOM.

## State and computed values

`createReactiveStore(article)` copies scalar values from validated `initialState`, validates their declared type and bounds on every write, and computes `derived` values in topological order. `get(name)` reads state or derived values; `set(name, value)` writes only declared state values. `getSnapshot()` returns an immutable state-plus-derived snapshot.

`subscribe(selector, listener, equals?)` accepts a state/derived ID or selector function. It emits the current selection on subscription, then only when the selected value changes. Notifications are synchronous. `transaction(draft => ...)` applies multiple state writes atomically, recalculates affected derived values once, and notifies once; validation or expression failure rolls the whole transaction back. Transactions are synchronous and cannot be nested.

Derived AST operators are fixed and interpreted: arithmetic (`add`, `subtract`, `multiply`, `divide`, `clamp`), conditional/boolean comparisons, equality, own-property `lookup`, and locale-aware `formatNumber`. Expressions are bounded to 1,000 AST nodes and 32 levels. Unsupported operators, unknown references, cycles, prototype keys, invalid arithmetic and non-finite results raise a typed `ReactiveStateError`. Conditional and boolean operators evaluate only the selected/needed branch after validating the full AST shape. Source strings remain inert literals; no source code is compiled or executed.

## Declarative events and host capabilities

`dispatchEvent(blockId, eventName, payload)` resolves a validated article event and passes it to the allowlisted dispatcher. Built-in state actions (`setState`, `nextStep`, `previousStep`, `selectOption`, `toggle`) update only the article's scoped store. P04 recognizes action payloads for filtering, quiz submission, route navigation, scrolling, expansion, media, dialogs and progress operations.

Non-state actions require a trusted embedding-project handler (`filter`, `submit`, `navigate`, `scroll`, `expand`, `media`, `dialog`, `activity` or `progress`). Without the handler, dispatch fails closed with `ACTION_CAPABILITY_UNAVAILABLE`; the engine does not change routes, touch the DOM, play media, save progress or issue a request by itself. Navigation receives only a stable route token, never an article URL. Media playback actions must be dispatched from a genuine user gesture by the renderer; declaring `gestureRequired: true` is not permission to start playback automatically.

Event payloads are plain data with only `value`, `checked`, `index` and `optionId` fields. Accessors, symbols, non-finite values, unknown action fields and unsupported event tokens are rejected. Article HTML/JavaScript is never executed.

## Async data and consent

`createAsyncResource({ loader, requiresConsent, isEmpty })` accepts a trusted host-supplied loader; it never calls global `fetch` and article content cannot provide an endpoint. Consent is required by default. A host may set `requiresConsent: false` only for a loader that reads local or otherwise consent-free data. Its states are `idle`, `loading`, `ready`, `empty` and `error`; `retry()` is available only after error. The loader receives an `AbortSignal` and attempt number. `dispose()` aborts pending work and clears subscribers; late results cannot overwrite newer or disposed state.

When `requiresConsent` is true, `load()` and `retry()` reject with `EXTERNAL_CONSENT_REQUIRED` unless the caller passes `{ consent: true }`. The embedding project must pass that flag only after explicit user consent. Error details are normalized to avoid leaking loader response data into article state.

## Compatibility and phase boundary

The article schema remains version `1.0.0`; P04 only adds the backward-compatible `scroll` and `expand` action variants. Existing action names and RichViz/`edu-viz` compatibility remain intact. No undo/history action is defined by the v1 article contract; there is no implicit undo behavior. P05 owns actual article rendering and must mount the validated runtime, render controls, and prove visible interactions in the approved browser environment.

## Verification

Run `npm run test:p04` for the focused INT-01..07 behavior/security suite and `npm test` for all existing core, article, RichViz and design-system regressions.
