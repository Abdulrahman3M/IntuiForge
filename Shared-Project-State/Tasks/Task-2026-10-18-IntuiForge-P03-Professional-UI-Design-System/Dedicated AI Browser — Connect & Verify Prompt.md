# Dedicated AI Browser — Connect & Verify Prompt

You are authorized to inspect, connect to, and test **only** the already configured dedicated Microsoft Edge environment described below. Reuse it only after all identity checks pass.

**Do not create, launch, reset, repair, adopt, or modify any browser environment or profile.** Do not use the user's personal/default Edge profile or an unverified fallback browser.

## Browser configuration reference

These values were supplied from the user's `edge://version` page. They are a reference snapshot, not proof of the currently running process or profile.

| Property | Supplied value |
|---|---|
| Browser | Microsoft Edge |
| Environment name | `AI-Agent-Browser` |
| Edge version | `155.0.4283.45` (Official build, 64-bit) |
| Revision | `50f24ef2aa5369a074b8888b7db82d9c0652d642` |
| Chromium version | `155.0.8059.40` |
| Operating system | Windows 11 25H2, build `26200.9457` |
| JavaScript engine | V8 `15.5.9.4` |
| User agent | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36 Edg/155.0.0.0` |
| Executable | `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` |
| User data directory | `C:\Users\Abdoo\AppData\Local\IB-Edge-Debug` |
| Previously observed active profile | `C:\Users\Abdoo\AppData\Local\IB-Edge-Debug\Profile` |
| Remote debugging address | `127.0.0.1` |
| CDP port / endpoint | `9222` / `http://127.0.0.1:9222` |
| Previously observed command line | `"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --user-data-dir="C:\Users\Abdoo\AppData\Local\IB-Edge-Debug" --remote-debugging-address=127.0.0.1 --remote-debugging-port=9222 --no-first-run --no-default-browser-check --flag-switches-begin --flag-switches-end` |
| Variations Source | `variations server` |
| Command-line Variations | `eyJkaXNhYmxlLWZlYXR1cmVzIjoiQ29tbWVyY2lhbENoYXRWaWRlb1N1bW1h...` (truncated reference; do not use for identity) |

## Mandatory verification sequence

1. **Discover tools.** Check which browser adapters are actually exposed in this session. Prefer `edge-ai` only if exposed. A tool's presence does not prove it is connected to this browser. Do not substitute a generic or cloud browser.
2. **Verify process identity before connecting.** In an authorized local Windows context, inspect the live Edge process and CDP listener. Verify the executable path, exact `--user-data-dir`, `--remote-debugging-port=9222`, loopback-only binding, and that the listening socket's owning PID is the expected browser process. A port number or user-supplied version snapshot alone is insufficient. If process ownership cannot be established, stop browser actions.
3. **Verify CDP.** Only after step 2 succeeds, read `http://127.0.0.1:9222/json/version`. Check the browser signature/version, protocol data, and WebSocket debugger endpoint. The WebSocket host/port must match the verified loopback endpoint.
4. **Verify the active profile.** Through the verified browser connection, inspect `edge://version` (or `chrome://version` only if required and supported) and read the actual **Profile path**. Confirm it is beneath `C:\Users\Abdoo\AppData\Local\IB-Edge-Debug`. If unavailable, report `ACTIVE_PROFILE_UNVERIFIED`; do not claim full identity verification.
5. **Controlled navigation.** After all identity checks pass, reuse the session, open one new tab, navigate to `https://example.com`, and record the final URL and title. Capture a screenshot only if the connected browser tool supports it. Do not interact with unrelated tabs or browser data.
6. **Report.** State separately: `MCP_TOOL`, `PROCESS_IDENTITY`, `USER_DATA_DIRECTORY`, `CDP_ENDPOINT`, `ACTIVE_PROFILE_PATH`, `NAVIGATION`, `SCREENSHOT`, and `BLOCKERS`. Overall result must be `VERIFIED`, `PARTIALLY_VERIFIED`, or `BLOCKED`. Never label the browser `VERIFIED` when process identity or active profile is unverified.

## Strict prohibitions

- Do not open or inspect unrelated tabs or browser data.
- Do not expose CDP beyond loopback, use the operating-system default URL handler, or attach to another process that happens to use port 9222.
- Do not close Edge/Chrome processes, delete/reset data, change settings/sign-in preferences, or launch another instance.
- Do not claim navigation or screenshots without actual evidence.
- Do not treat an HTTP CDP response alone as proof of process ownership or active profile.
- Treat the truncated command-line variations field as informational only.

## Current known blocker

The Browser Environment Manager reports `Unknown environment: AI-Agent-Browser`, and the current execution session has not exposed a matching Edge process or port-9222 listener. Do not create an `environment.json` that adopts the existing `IB-Edge-Debug` directory. Keep the result blocked until a permitted, verifiable path to the already configured session is available or the owner explicitly changes the no-modification restriction.
