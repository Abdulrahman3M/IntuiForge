# Step-by-Step Windows Procedure for a Beginner

## Prepare two separate archives
You need **two ZIP files**: (1) the downloadable `IntuiForge_Complete_Implementation_Handoffs.zip` (contains instructions), (2) your existing RichViz library source ZIP (not included in this download). Keep original RichViz ZIP unchanged as your backup. Do not extract source over existing project files.

## Suggested folders (example only)
```text
D:\Projects\IntuiForge\
  Input\RichViz-Source.zip           <-- put YOUR real old library ZIP here
  Implementation-Kit\              <-- unzip IntuiForge instructions here
  Source\                          <-- P00/P01 agent will plan proper source import
  Reports\                         <-- coding agent will put results here
```
The kit ZIP itself contains a top-level directory `IntuiForge-Implementation-Kit`, so you may keep that name instead of renaming to `Implementation-Kit`; adapt the commands consistently.

## Simple Windows File Explorer setup
1. In File Explorer, create new empty `D:\Projects\IntuiForge` (or another path you own) and `Input`.
2. Copy your original RichViz ZIP to `Input`; do not edit it.
3. Right-click this implementation ZIP → **Extract All…** → select `D:\Projects\IntuiForge`. You should see `IntuiForge-Implementation-Kit` and its `Handoffs` folder.
4. Open PowerShell in `D:\Projects\IntuiForge` (address bar: type `powershell`).
5. Run these exact checks, adjusting ZIP filename if different:
```powershell
python ".\IntuiForge-Implementation-Kit\Scripts\Validate-Kit.py"
python ".\IntuiForge-Implementation-Kit\Scripts\Audit-Zip.py" --zip ".\Input\RichViz-Source.zip" --json ".\IntuiForge-Implementation-Kit\Execution-State\zip-audit.json"
python ".\IntuiForge-Implementation-Kit\Scripts\Print-Phase-Prompt.py" P00
```
If `python` is not recognized, use `py -3` as installed on Windows; no additional packages are required for the helper scripts. If ZIP scan warns of suspicious entries, do not extract until agent verifies their safety.
6. Copy output of last command into the AI coding agent, tell it where the two archives are, and attach/input the **P00 handoff** only. The first task is **audit, not software rewrite**.
7. When P00 ends, ask agent to show its file `Reports/P00-Completion.md`. Verify status COMPLETE and no code modification. Then run the next prompt with P01, not all 16 at once.
8. When context grows, begin a new agent conversation with only the current handoff, architecture files, feature ledger, last completion report and source location; no repeated giant conversation paste.

## Important browser requirement
Only the isolated **AI Edge** browser, managed by `browser-environment-manager`, is authorized for tests. If the agent only has a cloud browser or cannot see Windows CDP localhost, it must not claim to have controlled your dedicated Edge. Validate the exact current config first; never attach your personal Edge data, cookies or credentials. The skill owns launch/repair; no new shortcut or reset without necessary permission.

## Check actual progress, not promises
The instruction ZIP is a **plan** and quality gates; the agent has not already built IntuiForge. Screenshots in your earlier HTML are not proof. Each report should list file edits and PASS/FAIL/UNVERIFIED for Feature IDs; phase COMPLETE requires observable running behavior with real checks.
