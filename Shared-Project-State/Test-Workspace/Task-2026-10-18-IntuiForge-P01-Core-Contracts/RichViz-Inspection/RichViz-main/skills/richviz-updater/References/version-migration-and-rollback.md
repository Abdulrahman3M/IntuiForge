# Version migration and rollback

Compare semantic versions, changelog entries, schema/API versions, registry IDs, adapter compatibility, and required intermediate migrations. Plan major upgrades through every documented breaking transition. Test data transforms against a copy and compare records, IDs, and preserved unknown fields before touching source content.

Before the first mutation, follow the consumer project's snapshot/backup procedure. Record snapshot path, file hashes, version pointer, and exact restore steps. Prefer an isolated versioned sibling and a pointer switch after tests. Keep prior files until post-switch smoke tests succeed. On failure, restore the old pointer/files from the recorded snapshot and rerun baseline checks. Never make a backup discoverable as a live runtime copy.
