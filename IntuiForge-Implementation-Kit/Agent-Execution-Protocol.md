# AI Agent — Strict Single-Phase Execution Protocol

## Source precedence
1. Latest explicit owner decision; 2. actual target project instructions/AGENTS and nested applicable rules; 3. this kit's `Project-Charter.md`, architecture and phase handoff; 4. P00 verified ZIP evidence; 5. existing public compatibility tests and code; 6. suggestions/examples. Escalate **true** owner-level conflicts only. Generated example JSON is illustrative until P02 approves schema.

## Mandatory at start of EACH phase
- Confirm user asked to begin this exact phase, verify previous phase `COMPLETE` (except P00), copy last checkpoint and actual file hashes/paths rather than reread entire history.
- Find and read root + nested `AGENTS.md`, Codex-specific / Claude-specific equivalents and pertinent project governance; identify precedence. Never assume repo conventions from a name alone.
- Capture working tree status and preserve unrelated local edits, untracked data, original RichViz ZIP, and third-party notices. If no Git repo exists, document source baseline before creating anything.
- Read just the handoff, its referenced contracts, relevant source and tests. Search selectively rather than dumping all files/context.
- Identify canonical implementation location and test existing behavior before changing code. If P00, remain read-only and only generate artifacts outside source.
- Use **exactly one agent** for execution. Parallel independent reads within same agent are fine; no spawned subagents or multi-agent orchestration without explicit owner approval.

## Implementation discipline
- Change only approved phase code; centralize rules, no page-specific duplicate patches.
- For each Feature ID: bind implementation file(s), tests and one observable proof. UI IDs need browser interaction/screenshot or `UNVERIFIED` with gate held.
- Favor deterministic feature fixtures and targeted tests; run broader mandated tests only if official project policy requires; record command, pass/fail, date, environment, output summary and report path.
- If an unknown detail has no product consequence, choose the smallest compatible implementation following existing source conventions. If a true conflict threatens stable behavior, owner contract, data integrity, license, API, or destructive migration, stop only affected area with options and effects; do not ask generic questions pre-audit.
- Do not claim that displaying a proposed `Examples/*.json` demonstrates implemented interaction. Tests must mount compiled/runtime modules and exercise controls.

## Token Optimization (independent Skill v1.0.1)
Use selective reads (index→relevant files→necessary line ranges), bounded tool batches and no repeated output of unchanged files. Keep a small checkpoint with goal, version, approved constraints, verified evidence refs, changed files, remaining feature IDs, test outcomes and next action. In long sessions, start a fresh one using checkpoint + current phase file instead of entire conversation. Never omit validations, negative requirements, security or testing to save tokens. Do not invent percent token savings or pretend context limit means tests were run. Output should be concise; on-disk artifacts must be complete.

## Browser Environment Manager
Follow `Browser-Environment-Protocol.md` when real visual/browser work applies. The user explicitly wants dedicated Edge AI profile and CDP verification; never use normal Edge. No personal-profile fallback and no fabricated screenshot claims. If local-only CDP cannot be reached from remote agent, report the blocker and separate nonbrowser work; do not try to infer identity from `/json/version` alone.

## History/governance
After focused testing, locate canonical development history system (CID/NID/RID, semver/build etc.), read actual project rules and several recent records, use official generator if required. Do not fabricate versions/IDs. Do not stage unrelated changes. No silent history refresh or moving files from unrelated folders.

## Status & reports
For each feature: `PASS`, `FAIL`, `UNVERIFIED`, or `NOT_STARTED` plus evidence path. For phase status use `COMPLETE`, `PARTIALLY COMPLETE`, or `BLOCKED`. `COMPLETE` requires all owned feature IDs `PASS`, mandatory tests and relevant browser checks, preserved compatibility, documentation and history (or explicit verified not applicable). Never treat skipped/unverified as pass.

## Stop condition
When phase report is written, stop. Do not proceed to next phase automatically. Prompt owner with exactly the filename of next handoff only after latest phase gate is complete.
