# Browser Environment Manager — Mandatory AI Edge Protocol

**Authoritative skill:** `01-Skills-General/browser-environment-manager/SKILL.md`, version 1.0.1, in `Abdulrahman3M/Universal-AI-ToolKit` (owner repository); also consult skill's `PROMPT.md`, `references/Browser-Compatibility.md` and `troubleshooting/Common-Issues.md` if available. The manager owns browser environment lifecycle; **do not implement another browser manager**.

## Dedicated browser only
User has a pre-existing AI-specific Edge configuration referenced in earlier workflows as `IB-Edge-Debug` and CDP port `9222`, but **do not assume this equals the current config or an approved active profile**. Discover exact authorized environment name and canonical config in `%LOCALAPPDATA%\AI-Browser-Environments\<Name>\environment.json`; dedicated data lives under `%LOCALAPPDATA%\AI-Browser-Profiles\<Name>`. Only reuse if the verified existing environment is owner-approved; if different setup actually exists, use its authoritative management instructions.

## Exact operating sequence
1. Before any browser interaction, inspect existing authorized browser config read-only; avoid user's ordinary Edge session.
2. Delegate `Status` to installed skill script from its **actual** path (sample command, not shell to invent):
   ```powershell
   & '<Verified-Skill-Path>\scripts\Browser-Environment.ps1' -Action Status -Name '<Actual-Authorized-Environment-Name>'
   ```
3. Verify **loopback listener + owning PID + Edge process with exact `--user-data-dir`**. Port availability or browser label alone is not identity proof.
4. If environment is stopped, request any required startup authorization and use `-Action Start` through skill. If broken, sanctioned `-Action Repair`; never reset without owner approval; never kill all msedge processes.
5. Run `Connect` via skill, then connect agent's compatible local browser tool to **verified** endpoint, open `edge://version` when supported and compare **actual Profile path** to expected user-data directory. Visible profile name alone is not proof.
6. Now navigate only to development host and permitted neutral URLs, interact, screenshot and validate. Dedicated identity record must precede screenshots.
7. If agent lacks compatible local browser tool or is remote-cloud (loopback can't reach user's local Edge), test only what it actually can and report statuses accurately. No unapproved personal-profile fallback.

## Sample skill commands — only after verifying actual installed path and environment
```powershell
& '<Verified-Skill-Path>\scripts\Browser-Environment.ps1' -Action Connect -Name '<Actual-Name>' -NavigateTest
```
`-NavigateTest` demonstrates CDP navigation, **NOT** screenshot/profile visual verification. Do not claim auth/login or screenshot pass based on HTTP probe. Never auto-create a new environment or auto-modify MCP configuration without owner action/permission.

## Required reporting fields
`CONFIGURED`, `BROWSER_RUNNING`, `CDP_VERIFIED`, `ACTIVE_PROFILE_VERIFIED`, `NAVIGATION_VERIFIED`, `SCREENSHOT_VERIFIED`, plus tool name, expected/observed profile directory (redact personal identifiers), and any `UNVERIFIED`. Do not log cookies/session tokens/process environments. If no approved browser is available, continue non-visual work, mark blocked checks honestly, and don't announce UI phase complete until mandatory visual gate passes.
