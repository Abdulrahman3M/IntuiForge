# P12 — Portable host integrations and user progress

IntuiForge mounts inside a host-owned DOM element. The host keeps its framework, routes, content shell, identity, search, and user-data store. The P12 package is private workspace code; a public registry install and release version are reserved for the release phase.

## Vanilla host mount

Import the host entry point and give it an existing mount element. The convenience mount registers the portable article renderer and the preserved RichViz adapter, then owns only the article mount lifecycle.

```js
import { mountIntuiArticle } from "@intuiforge/engine/host";

const mount = mountIntuiArticle(
  document.querySelector("#article-root"),
  articleMarkdown,
  {
    hostEnvironment: {
      lang: "ar",
      dir: "rtl",
      theme: "system",
      onNavigate(route) {
        appRouter.navigate(route);
      },
      onError(error, phase) {
        appLogger.warn({ code: error.code, phase });
      },
    },
  },
);

const result = await mount.ready;
// On host teardown:
await mount.dispose();
```

Navigation receives the stable route token declared by the article. IntuiForge does not change `location`, replace the host router, or remove nodes outside `#article-root`. `updateEnvironment({ theme, lang, dir })` refreshes the mounted article when host-owned settings change. Hosts may instead create a reusable runtime with `createIntuiHost()` and mount multiple articles through `host.mount()`.

## Framework-managed island

Framework hosts can keep their existing root and pass a root factory to `mountReactIsland` from `@intuiforge/engine/react-island`. The island creates one child container, forwards updates to the injected root, and unmounts only that root on disposal. React is not a dependency of IntuiForge; the host supplies React only for a component that needs it. P12's browser fixture checks the root lifecycle through the same injected `render`/`unmount` contract without bundling a second framework into this private workspace.

Keep a useful static article or host fallback visible until the integration mount reaches `ready`. If mounting or an optional host service fails, report it through `onError` and leave the host shell available.

## Optional user-progress storage

The host can adapt its existing progress service with `createProgressPersistenceAdapter`. Supply an opaque, stable user ID and explicit read/write functions. Do not use an email address or display name as the ID.

```js
import {
  createProgressPersistenceAdapter,
  mountIntuiArticle,
} from "@intuiforge/engine/host";

const progress = createProgressPersistenceAdapter({
  userId: auth.currentUser.opaqueId,
  read: (key, options) => appProgressStore.read(key, options),
  write: (key, value, options) => appProgressStore.write(key, value, options),
});

const mount = mountIntuiArticle(articleRoot, article, {
  hostEnvironment: { progress },
});
```

The adapter namespaces keys as `intuiforge.progress.v1:<encoded-user-id>:<article-id>`. Stored JSON contains only a versioned activity map: status, selected stable IDs, score fields, and reviewed card IDs. The identity remains in the host-owned key, outside the article and RichViz source. The adapter checks IDs, record size, fields, and version before restoring data; malformed or unsupported records produce a typed progress error.

Loading occurs only when the host provides `progress.load`. Saving occurs only when the host provides `progress.save` and the learner activates an explicit save control declared by the article. The engine keeps progress in memory otherwise. It does not select ambient browser storage, write cookies, make network requests, or create an account system. A host can omit the capability entirely or adapt it to its existing database, API, or in-memory store.

## First install, differential update, and rollback

No external CMS or website is included in this workspace, so the workflow is exercised with the plain and framework-managed fixtures. The package is private until the release phase; use the workspace export during development and the host's package manager when a release package is available.

### First install

1. Record the host's current package manifest/lockfile and the installed RichViz version. Keep the current RichViz package and its files in place.
2. Add only the IntuiForge dependency or workspace export, then add a dedicated mount element to the page or component that owns the article. Keep the host header, footer, navigation, styles, router, and fallback content in their current owners.
3. Pass the host's route, theme, locale, error, and optional progress callbacks through `hostEnvironment`. Do not copy user data into an article or replace the host's storage service.
4. Run the host's existing checks and `npm run test:p12`. Confirm that existing `edu-viz` Markdown and RichViz output still render beside the new mount. Review the manifest/lockfile diff and retain only the intended dependency changes.
5. Enable the new mount only after `ready` and the smoke checks succeed. Keep the static fallback available for failure and no-JavaScript cases.

### Differential update

1. Change the pinned IntuiForge package version and its corresponding lockfile entries only. Review the dependency diff before applying it; preserve all unrelated host adapters and the existing RichViz copy.
2. Run the host suite and P12 tests. Check article rendering, route tokens, theme/locale updates, the progress adapter, and the no-script fallback.
3. Keep the previous IntuiForge package and host entry point selectable until the updated mount passes. Do not overwrite host files or migrate article JSON as part of a package update.
4. Switch the active mount after acceptance. Preserve the host's versioned progress records; if a future format changes, introduce a new versioned key and an explicit migration rather than rewriting the current record in place.

### Rollback

1. Disable the new mount and restore the previously recorded package pin and lockfile entries.
2. Re-enable the host's static/previous article mount or the previous RichViz integration. Leave the host shell, routes, article source, RichViz files, and saved progress untouched.
3. Verify the old content renders, then investigate the new mount separately. Remove an old package or copy only in a later, separately reviewed cleanup after the host confirms it is unused.

The P12 browser fixtures exercise both rollback branches: disposing the plain mount leaves the older RichViz copy running; disposing the framework island restores its static fallback while the host header and footer remain. A real downstream package-manager migration remains host-specific because no external host manifest is present.

## Local verification

```powershell
npm run test:p12
npm test
node tests/browser-server.mjs
```

The server binds to `127.0.0.1` and serves only the project browser fixtures, fixtures, and package source. P12 fixtures are `tests/browser/p12-plain.html`, `tests/browser/p12-framework.html`, and `tests/browser/p12-static.html`; use the approved dedicated AI Edge profile for browser checks.
