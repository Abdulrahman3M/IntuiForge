# Updater scenarios

These examples describe required decisions; they do not authorize blind writes.

1. **Nearly identical paths:** the installed manifest identifies v1.4.0 and its owned root. Same-path hashes show two upstream changes and one unchanged local config. Update the two mapped files, retain config, run affected consumer tests, then switch the version pointer.
2. **Renamed host folders:** upstream `src/renderers/Chart.js` maps to host `Central Systems/Rich Visualization/Renderers/chart-renderer.js`. Use the explicit integration manifest/import evidence, merge the upstream chart fix into the renamed module, and update only mapped import paths.
3. **Locally modified upstream file:** the host added a route resolver to `RichVisualization.js`. Preserve it while applying the upstream API fix; test both the public renderer API and the consumer resolver before switching.
4. **Upstream rename:** release notes rename `src/Icons.js` to `src/Icons/registry.js`. Confirm history/content and host references, map the renamed source to the adapted installed path, rewrite imports in the same change, and validate icons in the host. Keep unrelated similarly named host files.
5. **Breaking release:** a new major version changes the saved spec schema. Read every intermediate migration, operate on a copy, preserve unknown fields, compare record counts and checksums, and run host schema/render tests. If data semantics remain unclear, pause that migration and present the consequence for owner decision.
6. **Local patch appears fixed upstream:** an upstream release adds the feature a host patch provided. Verify equivalent behavior in the host environment, remove the patch only in the planned delta, and keep a regression test proving the requirement still passes; otherwise retain the patch.
