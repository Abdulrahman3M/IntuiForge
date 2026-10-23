#!/usr/bin/env python3
"""Print a bounded, copy-ready phase instruction without pasting entire previous chat."""
import pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
if len(sys.argv)!=2 or not __import__('re').fullmatch(r'P(?:0[0-9]|1[0-5])',sys.argv[1]):
    print('Usage: python Scripts/Print-Phase-Prompt.py P00 ... P15');sys.exit(2)
phase=sys.argv[1]
paths=list((ROOT/'Handoffs').glob(f'IMPLEMENTATION-HANDOFF_IntuiForge_{phase}_*.md'))
if len(paths)!=1:sys.exit('Missing or ambiguous handoff')
prev=f'P{int(phase[1:])-1:02d}' if phase!='P00' else None
print(f"""ابدأ مرحلة {phase} من مشروع IntuiForge فقط.\n\nاقرأ قواعد AGENTS.md المتطبقة أولًا. استخدم ملف {paths[0].relative_to(ROOT).as_posix()} مع Agent-Execution-Protocol.md وArchitecture-Blueprint.md وArticle-Format-Contract.md وDesign-Quality-Contract.md وFeature-Traceability.csv؛ اطلب فقط أقسام/ملفات المصدر اللازمة.\n\n{'يجب أن تكون مرحلة '+prev+' COMPLETE بدليل تقريرها، وإلا توقف.' if prev else 'P00 تدقيق مصدر ZIP قراءة فقط ولا تعدّل الشيفرة.'}\n\nطبّق مهارة token-optimization (وكيل واحد)، وقواعد create-strict-implementation-handoff، وحصريًا مهارة browser-environment-manager لأي فحص Edge/CDP. لا تستخدم ملف Edge الشخصي ولا تعتبر ملف HTML القديم مرجعًا جماليًا. نفذ واختبر جميع Feature IDs للمرحلة، اكتب التقرير وفق Report-Template.md وسجّل أدلة PASS/FAIL/UNVERIFIED. توقف بعد المرحلة، ولا تنفذ المرحلة التالية تلقائيًا.""")
