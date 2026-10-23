# Path mapping strategy

Treat upstream and consumer project paths as two distinct namespaces. Build a table with source path, installed path, content/hash evidence, references/importers, owner (upstream/host/generated), confidence, and action. Use install manifests and Git history first; search imports and runtime URLs second; use content similarity only to find candidates that must be reviewed.

Record one-to-one mappings explicitly. A source rename can map to a differently named host file. Mark deleted upstream paths separately from host-only files; preserve host-only files unless ownership and lack of references are proven. Do not bulk-rename a destination tree based on upstream layout. `compare_installations.py --mapping FILE` accepts a JSON object from upstream-relative source path to installed-relative destination path.

Validate each mapped destination remains inside the installed root. Reject absolute paths, `..`, symlink escapes, duplicate destinations, and ambiguous rename candidates. Rewrite imports and asset URLs only when their consumers and deployment base are known.
