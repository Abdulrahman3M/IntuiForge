# Decision Log — P11

| ID | Decision | Reason | Owner / date |
|---|---|---|---|
| D-001 | Keep article v1 unchanged; implement authoring as an additive public package | The existing versioned contract and central validator/renderers already own content semantics; avoid breaking all hosts | Codex, 2026-10-20 |
| D-002 | Unsupported schema versions are rejected with the existing precise migration diagnostic; do not silently rewrite them | Article contract registers no other migration; preserving exact data is safer than guessing | Codex, 2026-10-20 |
| D-003 | Drafts remain in memory; export and publish require explicit user action | Avoid implicit storage/network and preserve original published content | Codex, 2026-10-20 |
| D-004 | Shared Project State was advanced from stale P07 metadata to active P11 | Phase-state, P10 report and ledger prove P10 is complete; preserving stale status would corrupt continuity | Codex, 2026-10-20 |
