# IntuiForge package licensing

The owner has licensed IntuiForge-authored code and documentation under Apache License 2.0. The full license is in the root `LICENSE`; `NOTICE` carries the project attribution. The npm package remains `private: true` and is built for local/offline distribution; this setting prevents registry publication through npm.

Bundled components keep their own upstream licenses and notices in place:

- RichViz 0.5.0 runtime: Apache-2.0; see `packages/visualization-legacy/vendor/RichViz-main/LICENSE`, `NOTICE`, and `THIRD_PARTY_NOTICES.md`.
- Captiva application icons: GPL-3.0-or-later; see `packages/visualization-legacy/asset-library/Assets/Application-Icons/Captiva/LICENSE` and `README.md`. The catalog keeps these assets isolated and labels their license and provenance.
- Other bundled visualization engines retain their original licenses and notices under `packages/visualization-legacy/vendor/RichViz-main/External-Libraries/`.
- Project visual-library assets retain their per-item source, attribution, license, and checksums in `packages/visualization-legacy/asset-library/Assets/catalog.json`.

Apache-2.0 applies only to IntuiForge-authored material. This manifest preserves attribution; it does not relicense third-party content or determine whether a particular downstream combination is permitted. Review the complete included notices for the distribution and use case.
