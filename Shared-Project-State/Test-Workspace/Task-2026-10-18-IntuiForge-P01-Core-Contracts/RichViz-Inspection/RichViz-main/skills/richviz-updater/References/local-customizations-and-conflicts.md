# Local customization preservation

Classify local changes as host-required adaptation, host integration, local configuration, temporary patch, upstream-compatible improvement, possibly obsolete customization, or unclassified. Record the original reason and consumers for each. Unknown remains unclassified until evidence resolves it.

For simultaneous edits, preserve host behavior while transplanting the upstream intent into the host adaptation. Retire a patch only when tests demonstrate the new upstream behavior satisfies the same host requirement. Preserve an improvement if it can be reapplied cleanly; keep its attribution/history. Conflicts with material API, architecture, security, ownership, or data consequences require the project owner. Avoid asking about mechanical merges and independently clear files.
