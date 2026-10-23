# IntuiForge — Architectural Blueprint

```text
AI Author / Human Editor     Markdown / JSON Article / Bundled Assets
         |                                  |
         +------------ Import & Validate -+
                             |
                    Versioned Article AST
                             |
          +------------------+-------------------+
          |                  |                   |
    Content Composer   Reactive Runtime   Capability Registry
          |                  |                   |
     Block Renderers   Actions/Bindings    Visualization Adapters
          |                  |          RichViz + Scientific Plugins
          +------------------+-------------------+
                             |
       Accessibility / Localization / Themes / Security
                             |
            Host Bridge / Mount-Refresh-Dispose
                             |
       Standalone Site | Any Compatible Web Host (CMS/framework optional)
```

## Boundary rules
1. **Core:** owns lifecycle, controlled registries, load/error boundaries, resource budgeting, and the public API. No host-specific business logic.
2. **Content:** parses Markdown and JSON to a normalized and versioned AST; preserves canonical content IDs, heading hierarchy, references, anchor routes, static fallback.
3. **Reactive:** holds article-scoped state, transactions, derived selectors and a **declarative** allowlisted Action DSL with bounded deterministic effects. No uncontrolled cross-article state.
4. **Components:** register schemas+renderers+capabilities+accessibility data; render only from normalized validated props. Composite/nested nodes use the same registry, not hardcoded per-content definitions.
5. **Visual adapters:** retain six vendor engines plus native SVG; load only where needed. Define a plugin capability contract for science modules/maps/3D; vendor version, licensing, resource and offline behavior must be recorded.
6. **Host integration:** standard browser custom mounting API; hosts supply `lang`, `dir`, theme tokens, resolver, trusted navigation and optional persistence adapters. Host retains CMS/search/auth/user data. React confined to isolated components if needed.
7. **Authoring:** controls editing/import/export/templates and invokes the same validator and renderer as production, not a second incompatible preview engine.

## API candidate contract (proposed; freeze in P01 only after audit)
```ts
interface IntuiEngine {
  validateArticle(input: string | unknown): ValidationResult<NormalizedArticle>;
  mount(container: Element, article: NormalizedArticle, env?: HostEnvironment): IntuiHandle;
  registerComponent(plugin: ComponentRegistration): UnregisterFunction;
  getCapabilities(): CapabilityDescriptor[];
}
interface IntuiHandle {
  ready: Promise<void>;
  update(next: NormalizedArticle): Promise<void>;
  dispose(): void;
}
```
Keep old `RichViz.render(container, spec, opts)` supported behind a compatibility wrapper; do not silently change existing return handle behavior. `edu-viz` must keep parsing old docs; new `intui-article` versioned fence/manifest is additive.

## Recommended package separation — target, not assumed source paths
`core`, `schema`, `article`, `state`, `components`, `design-system`, `visualization-legacy`, `scientific-plugins`, `media`, `authoring`, `host-adapters`, `security`, `testing-fixtures`.
Adapt the physical folder layout only after P00 audit; do not invent paths or restructure unrelated content. English technical package identifiers may use lowercase/kebab; main product titles and UI section names should use Title Case.

## Deployment modes
- `Embedded`: install as a component engine in a compatible host and mount under an isolated root. Do not rewrite host routes or global styles.
- `Standalone`: render a validated article with all necessary assets from local paths.
- `Offline`: no required network for content and engines shipped locally; external maps/data are explicitly optional and show degraded state when disconnected.
- `Server` (optional bridge): content/persistence adapters only; core renderer remains browser-capable. For security do not expose any user's local folders or database via automatic static serving.

## Versioning & migration
Use semver for release contracts; article spec version independent from engine version. Provide migrations plus fixtures that prove retained meaning, IDs and media paths, and a reversible migration plan for RichViz. Cross-package public schemas are versioned. Do not claim old/new engine binary compatibility without actual test.
