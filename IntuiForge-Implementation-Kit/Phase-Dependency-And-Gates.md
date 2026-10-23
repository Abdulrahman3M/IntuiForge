# Phases & Dependency Gates

**Mandatory sequence:** P00 → P01 → P02 → P03 → P04 → P05 → P06 → P07 → P08 → P09 → P10 → P11 → P12 → P13 → P14 → P15

## P00 — Source Audit & Non-Destructive Migration
**Dependency:** None. **Goal:** جرد ZIP القديم وتوثيق حالته والحقوق والاختبارات والتكامل؛ لا تعديل الإنتاج. **Gate:** Phase baseline and migration report; frozen observed inventory; source hashes; zero intentional source edits.

## P01 — Core Workspace & Extension Contracts
**Dependency:** P00. **Goal:** إنشاء هيكل IntuiForge وحدود الحزم والنواة وسجل الإضافات دون كسر RichViz. **Gate:** A bootable core + extension smoke tests and legacy import smoke tests.

## P02 — Article Format, Schemas & Validation
**Dependency:** P01. **Goal:** تعريف عقد مقال بإصدارات وتحقق صارم لجميع مسارات الإدخال. **Gate:** Valid/invalid fixture suite, schema docs, version migration checks, untrusted object validation.

## P03 — Professional UI Design System
**Dependency:** P02. **Goal:** بناء نظام بصري متسق ومكونات أساسية بجودة أعلى من HTML السابق. **Gate:** Responsive visual reference gallery approved by objective design gates.

## P04 — Reactive State, Events & Data Binding
**Dependency:** P03. **Goal:** بناء حالة تفاعلية عامة وربط البيانات والأحداث والحسابات الآمنة. **Gate:** Linked-slider multi-component acceptance and malicious expression rejection tests.

## P05 — Complete Portable Article Renderer
**Dependency:** P04. **Goal:** تركيب فقرات ومكونات ورسم تفاعلي متداخل داخل مقال واحد. **Gate:** Multiple-composition sample renders with legacy edu-viz inside article and no host CSS bleed.

## P06 — Smart Tables, Forms & Analysis Widgets
**Dependency:** P05. **Goal:** تقديم الأدوات التفاعلية العامة من الجداول والمدخلات والحاسبات. **Gate:** Interaction and a11y test matrix for every general widget.

## P07 — Educational Interaction Suite
**Dependency:** P06. **Goal:** إضافة عناصر التعليم والتقييم والتقدم. **Gate:** Science and language teaching examples with exact scoring and persistence controls.

## P08 — Visual Engines & Interactive Knowledge Maps
**Dependency:** P07. **Goal:** توسعة RichViz الحالية وربط 14 نوع تصور وستة محركات والخرائط المعرفية. **Gate:** Existing 14-type regression plus high-node knowledge-map interaction tests.

## P09 — Scientific Simulation, Maps & 3D
**Dependency:** P08. **Goal:** إضافة منظومة تطبيقات علمية عبر إضافات متخصصة. **Gate:** Independent real running scientific examples and capability-fallback tests.

## P10 — Rich Media, References, Math & Code
**Dependency:** P09. **Goal:** دعم المحتوى الموسوعي الغني والأصول والملحقات. **Gate:** Media synchronized examples and references/citations tests in RTL and LTR.

## P11 — AI Article Authoring Studio & Export
**Dependency:** P10. **Goal:** تحويل مخرجات AI إلى حزمة قابلة للتحرير والتحقق والمعاينة. **Gate:** Roundtrip exact meaning/ids and preview/export/import parity checks.

## P12 — Portable Host Integrations & User Progress
**Dependency:** P11. **Goal:** دمج المحرك في أي مشروع ويب أو صفحة متوافقة عبر عقد عام دون اعتماد على CMS أو إطار عمل بعينه. **Gate:** عقد تركيب عام + مضيف HTML بسيط + مضيف مستقل آخر + JS-off fallback.

## P13 — Hardening, Accessibility, Internationalization & Performance
**Dependency:** P12. **Goal:** تحصين النظام واختبار حدود البيانات والموارد والمتصفحات. **Gate:** Security adversarial matrix, keyboard/reader audit, performance budgets and offline tests.

## P14 — Premium Intelligent UI Showcase & Visual QA
**Dependency:** P13. **Goal:** إنشاء مكتبة عروض حقيقية احترافية ومراجعات بصرية فعلية. **Gate:** Browser-verified demonstration and screenshot evidence; not previous HTML style.

## P15 — Release, Documentation & Final Acceptance
**Dependency:** P14. **Goal:** تحضير إصدار قابل للتوزيع مع تقرير تتبع لكل متطلب. **Gate:** No unclosed mandatory requirements, validated artifacts, honest final release report.

## Interphase invariant
No phase starts without previous COMPLETE and evidence; P00 never edits source. Every feature ID assigned to phase must have PASS proof to close. Missing browser or environment proof is UNVERIFIED, not PASS. Only explicit owner authorization can change phase scope; update ledger and history before proceeding.
