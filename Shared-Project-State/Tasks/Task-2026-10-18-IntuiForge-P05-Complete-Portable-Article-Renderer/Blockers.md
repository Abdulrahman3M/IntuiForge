# Blockers — P05

## B-001 — Dedicated AI Edge could not initially be verified

- Status: RESOLVED on 2026-10-19.
- Evidence: Host process inspection verified PID 20076 and the expected Edge executable, `--user-data-dir=C:\Users\Abdoo\AppData\Local\IB-Edge-Debug`, loopback address and port 9222; `127.0.0.1:9222` listener ownership matched PID 20076. Live `edge://version` showed active profile `C:\Users\Abdoo\AppData\Local\IB-Edge-Debug\Profile`; CDP `/json/version` reported Edge 155.0.4283.62 / protocol 1.3. The `mcp__edge_ai` fixture mounted and passed browser checks. See `Checkpoints/CP-005.md` and `Reports/P05-Completion.md`.
- Resolution: Reused the existing dedicated AI Edge session only; no profile/environment was created or reset. Owner tabs were preserved. Only the temporary project fixture server and pages created for this test were closed.

## B-002 — Screenshot file export is denied by MCP path allowlist

- Status: NON-BLOCKING LIMITATION.
- Evidence: `take_screenshot` returned actual inline captures; an attempt to save under project reports was rejected by the MCP configured-workspace path allowlist.
- Impact: Screenshots remain visible execution evidence, not durable image files in this workspace.
- Resolution: Do not bypass the allowlist; report this limitation accurately. It does not block P05 because required browser screenshots were captured and inspected inline.
