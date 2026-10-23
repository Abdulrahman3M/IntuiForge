# IntuiForge 1.0.0 — Quick start

IntuiForge is a private, host-agnostic browser engine. It has no runtime package dependencies, performs no required network requests, and accepts declarative validated articles.

## Requirements

- Node.js 18 or newer and npm 9 or newer to install the local package archive or run the development checks.
- A browser and a compatible host page for interactive rendering. Host applications own their routes, storage, identity, and authorization.

## Build and install the local package

From the project root, run:

```powershell
npm run release:build
npm install --offline ./release/intuiforge-engine-1.0.0.tgz
```

The build writes the tarball, `release-manifest.json`, and `SHA256SUMS.txt` under `release/`. It creates two packages and compares SHA-256, installs the result with npm offline, and imports each public export. The archive is private and is not published to a registry.

## Mount a validated article

```js
import { createIntuiHost, mountIntuiArticle } from "@intuiforge/engine/host";
import { validateArticle } from "@intuiforge/engine/article";
const articleSource = await fetch("./article.json").then((response) => response.json());

const result = validateArticle(articleSource);
if (!result.ok) throw new Error(result.errors.map((item) => `${item.path}: ${item.message}`).join("\n"));

const host = createIntuiHost({ validateArticle });
const mounted = host.mount(document.querySelector("#article"), result.value, {
  lang: result.value.locale,
  dir: result.value.dir,
});
await mounted.ready;

// Call when the host page removes the article:
await mounted.dispose();
host.dispose();
```

Use `@intuiforge/engine` exports listed in [the API guide](./API.md). Integrations that need only one capability can import `@intuiforge/engine/design-system`, `@intuiforge/engine/state`, or another documented subpath. Keep article data declarative and pass it through the validator.

## Run the visual library

Double-click `Start Visual Gallery.bat` on Windows. The loopback-only server prints the local gallery URL; open it in an approved browser and press Ctrl+C in the launcher window to stop the server. See [the gallery guide](./GALLERY.md).

## Verify the workspace

```powershell
npm test
npm run test:p15
npm run release:build
```

IntuiForge-authored code and documentation are licensed under Apache License 2.0, while third-party components retain their own licenses. The package remains private and is not published to a registry. Review `LICENSES/README.md` and `THIRD-PARTY-NOTICES.md` before distributing the archive.
