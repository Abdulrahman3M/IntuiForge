# Install, update, and roll back

IntuiForge installs alongside a host's existing content and RichViz runtime. The change is opt-in; it does not rewrite host routes, saved content, CMS data, local storage, or existing RichViz assets.

## First install

1. Keep the existing host package/runtime and article source intact.
2. Build or obtain the private local archive `intuiforge-engine-1.0.0.tgz` and verify its SHA-256 against `release/SHA256SUMS.txt`.
3. Install the archive locally, for example `npm install ./release/intuiforge-engine-1.0.0.tgz`.
4. Add an explicit host mount that calls `validateArticle` and the public host API. Retain the previous renderer until the new route or content block has been verified.
5. Confirm the host owns the route, persistence key, media resolver, and permissions. IntuiForge does not migrate or copy those records.

## Differential update

1. Record the installed package version and save the previous tarball and checksum outside the active install directory.
2. Install the next version into a version-controlled package lock or a separate staging copy of the host.
3. Validate the article schema, render representative routes, check Arabic RTL and English LTR, and verify host-owned persistence before replacing the active dependency.
4. Keep the previous package and lockfile until the new host build is accepted. Article schema version and package semver are separate; use documented article migrations only when an article schema change exists.

## Rollback

1. Restore the previous dependency version or tarball and its matching lockfile.
2. Rebuild/restart the host using its normal deployment process.
3. If the host integration is not needed, remove only the explicit IntuiForge mount and revert its local dependency declaration. Keep host routes, article content, and stored progress untouched.
4. Verify the prior RichViz or host renderer still loads its original articles. No IntuiForge migration modifies those source records, so no reverse content migration is required.

Do not run a command that deletes an existing package directory, article source, or host data as part of update or rollback. The included `HOST-07` regression checks the no-destructive-path adapter contract. This guide does not claim binary compatibility between untested versions.
