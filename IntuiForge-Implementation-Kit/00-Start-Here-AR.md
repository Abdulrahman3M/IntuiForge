# IntuiForge — ابدأ من هنا

**هذه حزمة تعليمات تنفيذية وليست المحرك المنفذ.** اسم المشروع النهائي: `IntuiForge — Intelligent UI Engine`؛ مصدَر التحويل هو ZIP مكتبة RichViz السابقة، الذي يقدمه المالك للـAgent منفصلًا. **لا تستخدم ملف HTML القديم كنموذج جمالي**؛ وظيفته إن أُرفق مقارنة المحتوى فقط.

أي أمثلة أو ملاحظات أقدم تسمي موقعًا أو مضيفًا بعينه هي سياق تاريخي فقط؛ لا تجعل مضيفًا أساسًا لمعمارية IntuiForge أو شرطًا لقبول أي مرحلة.

## ما ستجده في الحزمة
- `Handoffs/` يحتوي 16 ملف تنفيذ مستقلًا (P00–P15). لكل ملف أهداف ومتطلبات وممنوعات واختبارات وبوابة إغلاق.
- `Feature-Traceability.csv` و`Feature-Traceability.json` تتبع **كل** الإمكانيات المذكورة في المحادثة المتاحة والمناقشات ذات الصلة؛ لا يُسمح بإسقاط صف.
- ملفات العقد: `Architecture-Blueprint.md`، و`Article-Format-Contract.md`، و`Design-Quality-Contract.md`، و`Agent-Execution-Protocol.md`، و`Browser-Environment-Protocol.md`، و`Security-And-Trust-Model.md`.
- `Examples/`: أمثلة توضيحية لصيغ محتوى مقترحة؛ ليست دليلًا على أن محركًا قد نُفذ، ولا شيفرة إنتاج.
- `Scripts/`: سكربتات Python stdlib محلية لتحقق الحزمة وفحص مصدر ZIP وطباعة prompt المرحلة؛ لا تعدل ZIP الأصلي.
- `References/`: مصادر موثقة وملاحظات عن HTML القديم ورابط مهارات صاحب المشروع.

## البدء خطوة بخطوة (Windows + Edge)
1. اصنع مجلد مشروع جديدًا مثل `D:\Projects\IntuiForge` خارج مصدر RichViz القديم. احتفظ بنسخة ZIP القديمة **دون تعديل**؛ يفضل بقاؤها خارج مجلد المشروع أو في `Input/` غير متتبع بـGit. لا ترسل محتويات سرية أو بيانات مستخدمين.
2. فك ضغط `IntuiForge-Implementation-Kit.zip` في مجلد فرعي `Implementation-Kit/` داخل مشروع IntuiForge. لا تنقل ملفات التعليمات إلى مصدر RichViz بحيث تستبدل ملفات بنفس الاسم.
3. ضع ZIP المصدر تحت `Input/RichViz-Source.zip` أو مرر المسار الحقيقي عندما يطلبه الـAgent؛ لا تفترض أن ZIP المصدر داخل هذه الحزمة. إن كان مستودع Git المحلي هو المصدر المعتمد أيضًا، أعطه النسخة والفرع المطلوبين بوضوح.
4. اختياريًا للتحقق المحلي، في PowerShell: `python .\Implementation-Kit\Scripts\Validate-Kit.py`، ثم `python .\Implementation-Kit\Scripts\Audit-Zip.py --zip .\Input\RichViz-Source.zip --json .\Implementation-Kit\Execution-State\zip-audit.json`. هذه فحوص للبيانات فقط وليست استخراجًا أو تثبيتًا.
5. افتح نافذة AI coding agent في جذر المشروع الجديد ووجّهه لقراءة `Implementation-Kit/00-Start-Here-AR.md` و`Implementation-Kit/Agent-Execution-Protocol.md` و`Implementation-Kit/Handoffs/IMPLEMENTATION-HANDOFF_IntuiForge_P00_*.md` فقط في البداية، مع ZIP المصدر. أو استخدم `python .\Implementation-Kit\Scripts\Print-Phase-Prompt.py P00` لنسخ النص المحدد.
6. **ابدأ بـP00 فقط.** سيجرد المصدر، يحدد الحالة الحقيقية والخطوات الآمنة للاستيراد، ويوثق الترخيص وملفات قواعد الـAgent والتكامل الحالي؛ لا يسمح للمرحلة P00 أن تعدل الشيفرة.
7. بعد انتهاء P00، اقرأ `Reports/P00-Completion.md` من بيئة التنفيذ وتأكد أن جميع اختبارات البوابة مثبتة وأن `Final Status: COMPLETE`. ثم قدم handoff P01 فقط مع تقرير P00 المختصر. كرر بالتسلسل حتى P15.
8. أثناء المراحل المرئية، اجعل AI يستخدم مهارة `browser-environment-manager` لبيئة Edge المخصصة وCDP. يجب التحقق من ملف البيئة/عملية Edge/ملف التعريف الفعلي قبل المتصفح؛ لا تدخل بروفايل Edge الشخصي مطلقًا. إذا كانت البيئة مغلقة فلا تبدأها دون التحقق من موافقتك وسياسة المهارة؛ وإذا غير متاحة سجّل الاختبار UNVERIFIED ولا تدعُه مرئيًا ناجحًا.
9. افتح جلسة جديدة عند امتلاء السياق مع آخر تقرير مرحلة وملف المرحلة التالية ومصفوفة المتطلبات، وليس المحادثة الطويلة كلها. لا تدع Agent واحد يشغل عدة مراحل تلقائيًا.
10. بعد P15، راجع `Reports/Final-Acceptance.md` وتحقق أن جميع الـFeature IDs اكتملت اختباراتُها فعليًا، ولا توجد placeholders أو تعارضات غير معلنة، وأن مسار RichViz القديم لا يزال يعمل.

## نص افتتاح المرحلة الأولي
انسخ ما في `Prompts/Start-P00-AR.txt` إلى Agent البرمجي وأرفق ZIP الأصلي (أو حدد مساره). لا ترفع HTML القديم باعتباره مرجع الشكل. لا تمنحه موافقة على حذف أو إعادة ضبط مصادر الملفات؛ اتفاقية التنفيذ تحمي المصدر.

## ترتيب المراحل
| المرحلة | المسؤولية |
|---|---|
| P00 | Source Audit & Non-Destructive Migration |
| P01 | Core Workspace & Extension Contracts |
| P02 | Article Format, Schemas & Validation |
| P03 | Professional UI Design System |
| P04 | Reactive State, Events & Data Binding |
| P05 | Complete Portable Article Renderer |
| P06 | Smart Tables, Forms & Analysis Widgets |
| P07 | Educational Interaction Suite |
| P08 | Visual Engines & Interactive Knowledge Maps |
| P09 | Scientific Simulation, Maps & 3D |
| P10 | Rich Media, References, Math & Code |
| P11 | AI Article Authoring Studio & Export |
| P12 | Portable Host Integrations & User Progress |
| P13 | Hardening, Accessibility, Internationalization & Performance |
| P14 | Premium Intelligent UI Showcase & Visual QA |
| P15 | Release, Documentation & Final Acceptance |

## ماذا لو أوقف الـAgent التنفيذ؟
- `BLOCKED`: تحقق إن كان هناك تعارض حقيقي مع قرار المالك أو خطر حذف/بيانات/ترخيص؛ أجِب عن القرار فقط، ولا تأمره بترقيع. أما نقص أدوات المتصفح فقط فيمكن تسجيله UNVERIFIED والعمل غير المتعلق به.
- `PARTIALLY COMPLETE`: يُصلح نفس المرحلة، ولا تنقلها حتى تحقق بوابة الإغلاق.
- `COMPLETE`: يفترض وجود دليل محدد لكل ميزة في هذه المرحلة. اقرأ التقرير، ثم قدم ملف المرحلة التالية.

**الهدف:** محرك مستقل يعمل مع أي مشروع أو صفحة ويب متوافقة عبر واجهة تركيب عامة، ويحافظ على RichViz، ويقدم مقالات Intelligent UI حقيقية. لا يعتمد IntuiForge على InfoBank أو أي مضيف بعينه.
