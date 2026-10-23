# Decision Log — Task-2026-10-18-IntuiForge-P01-Core-Contracts

Append decisions; do not rewrite prior decisions to hide history.

| Decision ID | Decision | Authority | Reason | Affected Areas | Approval Required | Supersedes |
|---|---|---|---|---|---|---|
| OWNER-2026-10-18-01 | IntuiForge is host-agnostic and must not depend on InfoBank or another particular host. | Owner clarification in conversation; also Project Charter | IntuiForge must work with any compatible web project/page. | All phases; P01 public API and host bridge | No; fixed owner decision | Any earlier host-specific examples |
| OWNER-2026-10-18-02 | Do not use personal Edge; use only the approved dedicated AI Edge after identity verification. | Owner browser instruction and supplied Edge command/profile details | Protect personal browsing profile and ensure reproducible UI checks. | Browser verification | No; fixed owner decision | Any default-browser assumption |
| P01-2026-10-18-01 | Keep the article validator injected behind the core contract; P01 does not freeze or implement the article schema owned by P02. | P01 handoff + Article Format Contract | P02 must formally freeze the schema; P01 freezes only the core API seam. | Core validator seam / P02 dependency | No | None |
