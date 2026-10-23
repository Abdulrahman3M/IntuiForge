# IMPLEMENTATION-HANDOFF_IntuiForge_P12_Portable-Host-Integrations-And-User-Progress

## A. Identification
- **Project:** IntuiForge — Intelligent UI Engine (new independent project with RichViz migration)
- **Phase:** P12 / 15 — Portable Host Integrations & User Progress
- **Mode:** `STRICT`, sequential, one-agent by default
- **Previous gate:** `P11` (must be COMPLETE with evidence; otherwise STOP)
- **Task type:** SCOPED IMPLEMENTATION
- **References:** root contracts, feature matrix, original RichViz ZIP supplied separately by owner; previous HTML is a **negative UI style reference**; authorized dedicated Edge browser only when needed.

## B. Objective
إتاحة دمج المحرك المستقل في أي مشروع ويب أو صفحة متوافقة من خلال عقد عام، دون ربطه بمضيف أو CMS أو إطار عمل بعينه.

## C. Verified Baseline / Current State
- Verified against GitHub `main` core files during handoff authoring: RichViz's README/package identify v0.5.0, 14 visualization types and six engine adapters. Core uses `src/RichVisualization.js`, `src/RichVisualizationSchema.js`, registry, cards and composites. **ZIP not supplied to this handoff author**; the agent must audit the actual ZIP, not assume it equals GitHub `main`.
- Only P00 creates the authoritative ZIP-derived baseline; subsequent phases must rely on it and check actual changed state.
- Known risks: `RichViz.render()` accepts JavaScript object without the validator path used for string source; `.rev` base 16px but `.9em/.92em` descendants fall below 16px; legacy compositions have tabs/accordion but no general shared state. Verify against source before altering.

## D. Target State / Deliverable
Generic public mount contract + plain HTML host fixture + a framework-managed host fixture + JS-off fallback. No existing third-party host is a dependency or required acceptance environment.

## E. Scope / Preservation
**In scope:** host-neutral adapter, Markdown fences, no whole-app framework requirement, RichViz legacy, locale/theme bridge, progress adapter, safe persistence, deep linking, route preservation, optional host-provided user data storage.
**Out of scope:** features explicitly allocated to other phases; unrelated cleanup; ecosystem replacements; CMS/account system in IntuiForge.
**Must preserve:** existing working diagrams, layouts, IDs, examples, safe defaults, RTL/LTR, CSS isolation, each host's routes/content/styles, offline behavior and vendor notices.
**Prohibited:** Ad hoc duplicated page patches, unvalidated article-side HTML/JS execution, silent breaking schema/API changes, superficial demo-only components.

## F. Mandatory Pre-Implementation Investigation
1. Read all applicable AGENTS.md and nested/equivalent policies and current branch/dirty status; record filenames/hashes rather than pasting long contents repeatedly.
2. Verify completed `P11` milestone and prior gate proof; compare manifest, version, changed files and report. If gate incomplete, STOP.
3. Inspect only code, schema, styles, tests, documentation and real user examples relevant to this phase. Locate central shared implementation. Never invent exact paths for ZIP imports.
4. Capture an explicit baseline of current behavior, gaps, risk and a compact file-range evidence map before modifying.
5. Use the author-owned dedicated Edge AI profile via Browser Environment Manager when UI/visual/browser tests matter; do not browse on personal Edge. See `../Browser-Environment-Protocol.md`.

## G. Architecture / Source of Truth
- Nucleus owns lifecycle/schemas/registry; components do not own cross-app navigation, CMS, user authentication, or raw arbitrary script evaluation.
- Public article contract is declarative, validated, versioned and portable; generic behavior belongs in central packages, not host-specific page patches. No particular website or CMS is the required host.
- Existing RichViz family remains accessible behind compatibility adapters, with reversible migration path and tests.

## H. Atomic Feature Requirements
| ID | Required capability | Observable acceptance |
|---|---|---|
| HOST-01 | Generic host integration contract | Mounts through the public browser API with explicit host capabilities; no CMS/framework dependency |
| HOST-02 | Any-host portable integration | Vanilla DOM API; no mandatory site framework conversion |
| HOST-03 | Legacy RichViz/edu-viz adapter | Existing markdown visualizations continue to render |
| HOST-04 | Optional progress persistence adapter | Per-user data outside article and not in RichViz content source |
| HOST-05 | React island lifecycle | Uses React only when required within contained component |
| HOST-06 | Host-owned application services | The host retains its CMS, storage, search, identity and user data; IntuiForge does not assume or duplicate them |

**Implementation steps** (follow in order, adapting only filenames from verified source):
1. Map each feature ID above to its canonical owner module, schema, renderer and test fixture; record new design only where architecture doesn't already cover it.
2. Add the smallest shared contracts and working implementations necessary for **all** P12 feature IDs. Each exposed control must perform its labeled behavior, not just render a mockup.
3. Extend authoritative schema/validation and lifecycle as applicable; support RTL/LTR, light/dark, responsive widths and accessibility from inception.
4. Create tests for valid/invalid/edge inputs and immediate dependents. Test keyboard & focus when users can interact.
5. Execute focused automated tests and browser verification where relevant, correct failures, document any environment-only unverified check.
6. Synchronize only changed public API/schema/component documentation; then record compliant project history after checks.

### Additional Required Coverage
| ID | Required capability | Observable acceptance |
|---|---|---|
| HOST-07 | First install and differential update workflow | Existing host adapters and installed RichViz copies can upgrade safely; reproducible no-destructive-path rollback |

- [ ] **HOST-07 — First install and differential update workflow**: Existing host adapters and installed RichViz copies can upgrade safely; reproducible no-destructive-path rollback.

## I. Edge Cases / Failure Handling
- Missing/corrupt optional assets: show a localized text alternative and explain reason; no blank unexplained component.
- Untrusted/unsupported source: reject with typed validation error and source path; never execute code from article.
- Invalid state, changing locale/theme, or unmounted components: predictable lifecycle, no duplicate event handlers or broken hosts.
- Keyboard-only/reduced-motion/offline/slow device: meaningful equivalent and explicit limitation if capability unavailable.
- Existing legacy spec or dirty working tree: preserve behavior; do not silently rewrite user data.

## J. Visual / UX Contract
Applicable whenever phase produces UI: use `../Design-Quality-Contract.md`. Mobile first, 16px minimum meaningful article text, comfortable max reading line length, semantic hierarchy, refined surfaces, clear focus states; RTL and mixed LTR identifiers. Prior standalone `richviz_intelligent_ui.html` must NOT guide styling. Visual outcome is judged on **actual browser screenshots and functioning controls**, not on generated HTML/CSS alone.

## K. Data / Files / Versions
- Maintain stable IDs and versioned JSON schema; no destructive migrations without explicit authorization.
- Preserve license/NOTICE of imported external engines. No external downloads unless specifically approved by project policy.
- Commit/package only phase-owned deltas. Find true code paths before creating any new files.

## L. Tests — Mandatory Focused Gate
- [ ] **HOST-01 — Generic host integration contract**: A documented public browser API mounts into a plain HTML fixture and a framework-managed host fixture; neither requires CMS-specific code or host application conversion.
- [ ] **HOST-02 — Any-host portable integration**: Vanilla DOM API; no mandatory site framework conversion.
- [ ] **HOST-03 — Legacy RichViz/edu-viz adapter**: Existing markdown visualizations continue to render.
- [ ] **HOST-04 — Optional progress persistence adapter**: Per-user data outside article and not in RichViz content source.
- [ ] **HOST-05 — React island lifecycle**: Uses React only when required within contained component.
- [ ] **HOST-06 — Host-owned application services**: Host-specific CMS, storage, search, identity and user data remain owned by the host and are accessed only through explicit supplied capabilities.
- [ ] Unit/integration and relevant regression tests execute with PASS/FAIL evidence and exact commands. Browser checks report `CONFIGURED`, `CDP_VERIFIED`, `ACTIVE_PROFILE_VERIFIED`, `SCREENSHOT_VERIFIED` separately, or `UNVERIFIED`.
- [ ] Explicit no unrelated modifications. No placeholders pretending feature completion. Documentation/history synchronized correctly.
- [ ] Update all feature IDs for P12 in coverage ledger, linking proofs. Do not label this phase COMPLETE while any ID lacks proof.

## M. Definition Of Done / Reporting
- Emit `Reports/P12-Completion.md` using `../Report-Template.md` with summary, evidence, architecture, modified files, preserved behavior, tests, browser identity/results, docs, official history values if actually allocated, open issues, and status `COMPLETE | PARTIALLY COMPLETE | BLOCKED`.
- Update `Execution-State/phase-state.json` and per-feature ledger only with real evidence and outputs; preserve prior history.
- **Stop after this phase**: owner starts the next handoff explicitly.


## قواعد التنفيذ الملزمة — Strict Handoff Contract
1. **Execution Mode: STRICT**. هذا Handoff لمساعد برمجة آخر؛ لا يعتبر تصريحًا بتنفيذ مراحل أخرى. ابدأ من مرحلة واحدة فقط واستكمل بوابتها قبل التالية.
2. اقرأ `AGENTS.md` الجذري والملفات المتداخلة المناسبة، وتعليمات Codex/Claude/المساعد المستخدم، وقواعد المشروع الفعلية **قبل تعديل الشيفرة**. تعامل مع شجرة العمل الحالية على أنها قد تضم تعديلات أخرى لا تمسها.
3. التزم بالمراجع المركزية `../Architecture-Blueprint.md`, `../Article-Format-Contract.md`, `../Design-Quality-Contract.md`, `../Feature-Traceability.csv` وملف `../Agent-Execution-Protocol.md`؛ وافحص الشيفرة الحالية قبل افتراض أي اسم ملف أو API أو مسار.
4. **لا ترتجل قرارات المنتج**، ولا تنفذ refactor لمجرد الرغبة، ولا تحذف ملفات/تاريخًا/تعليقات/محتوى، ولا تفرض إطار عمل أو تغييرات شاملة على أي مشروع مضيف، ولا تستبدل المحركات الموجودة بلا مبرر فني مثبت.
5. مستوى النص العربي RTL و16px على الأقل لكل نص في محتوى المقال والمكونات ذات المحتوى؛ التصميم مرن بموجب `Design-Quality-Contract.md`. المظهر يجب أن يكون تحريريًا احترافيًا، وليس النسخة HTML السابقة.
6. استخدم `token-optimization` v1.0.1: وكيل واحد وتسلسل افتراضي؛ لا Multi-Agent/Subagents دون موافقة صريحة؛ اقرأ فقط الملفات والنطاقات اللازمة؛ حافظ على checkpoint موجز بالدلائل والتغييرات والقيود؛ لا تستبدل الاختبارات بخفض التوكنز.
7. لا يوجد Owner Approval Gate قبل التدقيق أو التنفيذ العادي. توقف **فقط في الجزء المتعارض** إذا كشفت الأدلة تعارضًا حقيقيًا مع قرار مالك ثابت أو مخاطرة حذف/كسر بيانات/تغيير عقد عام؛ سجل خيارات وآثارها والسؤال الوحيد المطلوب.
8. اختبر الملفات المتغيرة والمستهلكين المباشرين والوظائف المتأثرة؛ توسع إلى اختبارات أوسع فقط إذا اشترطت قواعد المشروع أو بوابة إصدار صريحة. لا تدع FAIL/UNVERIFIED = PASS.
9. المراجعة المرئية عند الحاجة: اجعل `browser-environment-manager` v1.0.1 هو المسؤول الوحيد عن تشغيل وفحص **بيئة Edge المخصصة للـAI**؛ نفذ preflight هوية CDP والعملية/الملف الشخصي قبل أي تنقل؛ لا تستخدم بروفايل Edge الشخصي، ولا تفترض أن منفذ 9222 دليل كافٍ، ولا تقتل عمليات Edge عامة. إن لم تتاح الأداة صرّح `UNVERIFIED`.
10. بعد الاختبارات، حدّث التوثيق المتأثر فقط. اتبع قواعد NID/CID/RID/Version/Build الرسمية والسجلات الحديثة وأدواتها إن وجدت؛ لا تختلق رقمًا. اعزل أي Pending Changes غير ذات صلة.
11. لا تترك Stub/TODO/مكوّن غير عامل داخل نطاق المرحلة وتدّعي اكتمالها؛ أبلغ بوضوح ما لم يمكن تنفيذه. لا ترحل ميزة ملزمة دون تسجيلها `FAIL`/`UNVERIFIED` مع عدم الانتقال عند فقد شرط البوابة.
12. اكتب تقريرًا نهائيًا للمرحلة بالحقول الواردة في `Report-Template.md`، وحدث ملف الحالة والمصفوفة بأدلة فعلية فقط. لا تنتقل تلقائيًا إلى المرحلة التالية.
