---
name: richviz-updater
description: Analyze and differentially update an existing Rich Visualization Library (Rich Viz) installation in a consumer project while preserving mapped paths, host adapters, local configuration, and customizations. Use when Rich Viz is already integrated and a newer upstream version must be evaluated or applied.
---

# Rich Visualization Library Updater

Use this skill only when Rich Viz already exists in the target project and the user requests an update, upgrade, or version migration. Follow the gated workflow below in order. A file copy is not a successful update. Do not overwrite or delete target files automatically.

For first installation, use [`../richviz-integration/SKILL.md`](../richviz-integration/SKILL.md). For current examples and stable visual references, consult the [Visual Reference Browser](../../visual-browser/README.md).

## Required inputs and boundaries

- Read the target project's `AGENTS.md`, scoped policies, dependency governance, and documentation rules before editing. The target project's explicit current instruction wins.
- Identify the installed Rich Viz root, exact current version/commit, target version/commit, provenance, source-tree path and runtime entry points. Inspect only relevant direct dependencies after establishing these locations.
- The upstream Rich Viz root is the adjacent repository root when this skill is used from its source checkout. If a release/archive/ref is supplied, verify its identity and version before comparing it. Never silently substitute an unverified branch, network response, or working directory.
- Treat `RichViz` as a stable technical API/package identifier and `Rich Visualization Library` / `Rich Viz` as current product branding. Legacy host folder names and saved schema/fence identifiers remain compatible unless separately authorized and migrated.
- Preserve third-party licenses and notices. Do not copy, replace, or update a vendor distribution independently of the host's dependency manager and license checks.

## Gate 1 — establish the installed state

1. Read host instructions, current version markers, manifests/lockfiles, the installation record, and relevant change history.
2. Locate installed runtime, schemas, renderers, examples/spec data, adapters, style assets, icons, engine files, and generated files. Search imports, route/fence registrations, asset URLs, CSP, tests, and host API calls to identify consumers.
3. Record the actual installation root and path adaptations. Inspect Git status before work; do not overwrite or absorb unrelated user changes.
4. Run the read-only comparison helper where Python 3.9+ is available:

   ```sh
   python skills/richviz-updater/Scripts/compare_installations.py --upstream PATH --installed PATH --mapping path-map.json
   ```

   The optional JSON mapping maps upstream-relative file names to installed-relative file names. Without it, identical paths are compared. The report is evidence for review, not authority to edit.
5. Classify every relevant local difference as `required host adaptation`, `project integration`, `local configuration`, `temporary patch`, `upstream-compatible improvement`, `possibly obsolete customization`, or `unclassified`. Mark unknown ownership as unclassified. Do not assume that a deleted upstream path was unused by the host.

**Gate:** Do not prepare writes until the installed version, ownership boundary, consumers, local changes, and relevant host-specific paths are recorded. If installation provenance is incomplete, continue read-only discovery; do not guess a source-to-host mapping.

## Gate 2 — inspect and characterize the target release

1. Read target `VERSION`, `CHANGELOG.md`, API/schema versions, public type/registry IDs, dependency manifests, license/notice files, migration notes, and relevant renderer/adapter documentation.
2. Compare all supported intermediate migrations between the installed and target versions; do not treat a major-version jump as a patch release.
3. Inventory upstream additions, modifications, removals, and renames. A rename candidate requires evidence from repository history/release notes or a high-confidence content match reviewed by a person; a similar name is not proof.
4. Identify changed schema/API behavior, removed/deprecated capabilities, engine/version changes, generated outputs, and required migrations to stored specs.
5. Review all required third-party license and redistribution terms before proposing vendor file changes.

**Gate:** Any missing release bytes, unclear version, unclear third-party rights, or undocumented breaking behavior blocks only dependent mutations. Report the specific evidence gap and continue independent safe analysis.

## Gate 3 — build and review an explicit path map

1. Map each required upstream file to one host destination, including renamed directories/files, import rewrites, public entry paths, generated metadata, and assets.
2. Record mapping evidence (manifest/checksum, prior integration records, references/imports, Git history, or reviewed content similarity). Include confidence and rationale.
3. Identify host-owned files, local adapters, article/fence registrations, shared runtime/dependency ownership, and files intentionally omitted by the original integration.
4. Keep separate rows for upstream deletion, host path rename, host-only file, and generated file. Never translate `upstream path == host path` into an unverified assumption.
5. Link the [visual browser](../../visual-browser/README.md) or stable IDs in the update report when visuals are affected; derive the host mapping from its actual deployment paths.

**Gate:** Every file in scope must have an explicit destination and ownership classification. If two upstream files map to one destination, or mapping evidence is ambiguous, stop that file's mutation pending a real owner decision.

## Gate 4 — classify conflicts and plan a reversible delta

1. Compare upstream changes against the exact installed bytes and relevant local history. Produce a file-level table: unchanged, upstream-only, local-only, same-file conflict, upstream rename, upstream removal, destination collision, or generated output.
2. Preserve local edits by carrying them into the target upstream structure with the smallest compatible adaptation. Keep the host's adapters, routes, design tokens, CSP, shared React runtime, localized paths, and saved content.
3. If a local patch appears superseded upstream, prove the new behavior covers the original host requirement, remove only the obsolete patch, and add a direct regression check. Otherwise retain it.
4. For incompatible simultaneous changes, propose merge options and identify affected behavior. Ask the owner only when the choice has material architectural or product consequences; continue independent non-conflicting changes.
5. Record the exact planned added/updated/renamed/deleted files, import/reference rewrites, data migrations, validation commands, and rollback commands before mutation.
6. Create a project-approved backup/restore point before the first write. Prefer versioned sibling directories or the host's snapshot mechanism. Record hashes and locations; never place a backup where runtime discovery can load it accidentally.

**Gate:** Do not mutate files until the plan preserves all identified local customizations, has a rollback path, and has no unresolved conflict on the planned changes. Deletion requires proof of non-use from references plus tests/runtime ownership evidence.

## Gate 5 — apply a differential update

1. Add only required new upstream files and update only files whose planned merge is clear. For modified shared files, transplant the upstream change into the host-adapted version; do not blind-copy over it.
2. Keep local path conventions, import aliases, adapters, host route IDs, themes, and localization behavior. Update all references atomically with any planned path rename.
3. Preserve host-only files and user data. Never remove saved visualization JSON, content, backups, vendor distributions, or unknown files as cleanup.
4. For breaking schema changes, implement the documented migration on copies first, preserve the source data, and compare counts/content. Use the host's canonical writer/indexer; do not hand-edit integrity hashes or generated manifests.
5. If an unexpected conflict appears, stop writes for that conflict, retain the original snapshot, and continue only independent changes whose plan remains valid.

## Gate 6 — validate and switch

Run focused checks against files actually affected and their direct consumers:

- Import/module loading, runtime routes, CSS and asset paths, local response status, console errors, and absence of unwanted CDN dependencies.
- Rich Viz schema/API tests and rendering for each changed or host-used type; static and interactive lifecycle/disposal where relevant.
- Shared React/diagram engine ownership, theme and RTL/LTR output, accessible names/keyboard operation, narrow responsive layout, and media/assets/icons.
- Consumer integration, article renderer, authoring/Admin integration, build pipeline, security policy, and license/notice checks where the host uses them.
- Link/path existence for all mapped files. Run real affected runtime paths; a syntax check alone is insufficient.

Do not claim tests that were not executed. Switch version pointers or manifests only after focused checks pass. Keep the old copy until post-switch smoke checks pass. On failure, use the documented rollback and re-run the prior-version smoke test; preserve both diagnostic evidence and local work.

## Gate 7 — write the update report

Use the format in [`References/update-report.md`](References/update-report.md). Report exact prior/target versions, mapping, migration, added/updated/renamed/removed files, preserved/retired customizations with evidence, conflicts and decisions, tests with results, rollback location, and limitations. State explicitly if no update was applied.

## Failure conditions

Fail closed for writes when the target version cannot be verified, the installed root is ambiguous, path mapping collisions remain, a planned edit would discard unclassified local content, license rights are unclear, or rollback cannot be established under host policy. Make safe read-only progress and give a precise report; do not substitute a reinstall.
