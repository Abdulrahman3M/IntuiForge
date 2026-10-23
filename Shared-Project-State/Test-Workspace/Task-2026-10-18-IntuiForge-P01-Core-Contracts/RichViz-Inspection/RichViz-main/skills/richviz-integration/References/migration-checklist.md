# Migration checklist

- Compare source and destination schema versions and registry IDs.
- Inventory saved specs and types actually used by the host.
- Identify breaking fields, engine changes, asset paths, and interactive lifecycle changes.
- Back up only the owned installation and preserve original content data.
- Migrate a copy; validate before and after; compare normalized structures.
- Run focused runtime/browser checks before switching the path.
- Keep rollback copy until the deployed smoke test is successful.
- Never delete an engine or vendor file until all consumers are checked.
