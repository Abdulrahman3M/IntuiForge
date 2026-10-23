# P05 — Complete Portable Article Renderer

`@intuiforge/engine/article-renderer` supplies a central renderer for validated `intui.article` v1 documents. It is independent of any CMS, framework, or website and mounts through the core renderer registry.

```js
import { createIntuiEngine } from "@intuiforge/engine/v1";
import { validateArticle } from "@intuiforge/engine/article";
import { registerArticleRenderer } from "@intuiforge/engine/article-renderer";

const engine = createIntuiEngine({ validateArticle });
registerArticleRenderer(engine, { theme: "system" });
const handle = engine.mount(mountElement, article, {
  theme: "system",
  themeTokens: { accent: "#176B5B" },
  onNavigate(routeId) { hostRouteResolver(routeId); },
});
await handle.ready;
// When the host removes the article:
await handle.dispose();
await engine.dispose();
```

The renderer uses the article envelope’s `locale` and `dir`, stable section/block IDs, a section table of contents, semantic headings and text nodes. It selects an open Shadow Root when available. Environments without Shadow DOM receive an in-container fallback whose selectors use the `if-article-*` namespace; the renderer does not write host-level styles. Its design reuses P03 immutable tokens and supports light, dark, system, and validated host color tokens.

Supported composition includes prose, quotes, callouts, code, lists, tables, citations, declared media, metrics, basic range/text/select controls, nested groups, tabs, conditionals, accordions, and registered `org.intuiforge.richviz` visualization adapters. `group` is an additive article-v1 block type used as a nested container/tab panel. For tabs, `children` are groups with stable IDs and optional `props.label`; an optional `bindings.selected` points to a declared enum state variable whose values are group IDs. A `conditional` block uses `props.condition` (or the compatible `props.when`) with the P04 expression vocabulary and places visible content in `children`.

Controls dispatch only declared P04 actions. Host effects remain explicit capabilities: cross-article navigation passes the stable route token to `onNavigate`; media, quiz, filters, dialogs, activity and progress use the corresponding host callback. The renderer never treats a route token as a URL. Internal TOC/Markdown links use section or block IDs; validation rejects unresolved Markdown fragments. A bounded inline Markdown subset supports links, emphasis, strong emphasis, and code; unsafe destinations remain inert literal text. Article content is never interpreted as HTML.

`renderArticleStatic(article, { theme })` returns an escaped semantic HTML fragment suitable for a build/server template before JavaScript runs. Tabs, conditionals, and disclosures are emitted with readable content; print rules expose hidden panels and hide navigation chrome. This is static generation, not a claim that arbitrary server HTML is automatically hydrated. The interactive renderer remains separately mountable through the core lifecycle.

Assets must be declared in the article manifest. The host may provide `resolveAsset(assetId, asset)` to resolve local/authorized media; unavailable assets retain a text alternative. External origin authorization and integrity remain the validator/host’s responsibility. No implicit data request or article-authored executable code is supported.

Run focused automated coverage with `npm run test:p05`; regression gates are `npm run test:p01` through `npm run test:p04`. Actual browser checks at 320/360/768/1024/1440 CSS px, computed text sizes, themes, focus/keyboard, overflow, and screenshots require the verified dedicated AI Edge session described by `IntuiForge-Implementation-Kit/Browser-Environment-Protocol.md`.
