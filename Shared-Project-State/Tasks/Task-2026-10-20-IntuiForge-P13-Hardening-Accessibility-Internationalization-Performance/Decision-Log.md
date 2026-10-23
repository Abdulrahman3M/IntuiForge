# Decision Log — P13

## D-001 — Keep schema and APIs additive

- **Decision:** preserve article schema `1.0.0` and existing public API behavior; harden ingress/rendering through additive options, typed errors and wrapper checks.
- **Evidence:** P02 Article Format Contract, P13 handoff prohibition on silent breaking changes, P12 host acceptance.
- **Tradeoff:** unsafe or unsupported optional assets may show their localized text fallback instead of rendering.

## D-002 — Keep plugins trusted by installation, not article data

- **Decision:** article blocks and imported data never provide executable plugin code or module URLs. Only host/build code may register implementations; article input can select only an implementation that the trusted host already installed.
- **Evidence:** Architecture Blueprint and Security-And-Trust-Model trust zones.
- **Tradeoff:** unavailable/unregistered plugins retain a readable unsupported-component fallback.

## D-003 — Keep offline assets local and remote access explicit

- **Decision:** use existing local engine/assets and explicit host loaders; enforce asset policy/integrity and clear failure alternatives. Do not introduce CDN or service-worker dependencies unless repository evidence shows they are required for the stated offline gate.
- **Evidence:** Architecture Deployment Modes and P02/P10 asset contracts.

## D-004 — Browser tooling version

- **Decision:** use the only installed Browser Environment Manager skill (1.1.0) for process/CDP/profile preflight because the handoff's requested 1.0.1 copy is absent. Record the version difference and retain the handoff's identity checks.
- **Evidence:** installed skill `VERSION` is 1.1.0; dedicated process/CDP and actual profile path were verified.
- **Impact:** no browser check is claimed from HTTP/CDP alone; page interaction still needs the authorized Edge AI tool.
