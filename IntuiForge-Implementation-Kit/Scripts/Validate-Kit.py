#!/usr/bin/env python3
"""Validate the handoff kit's structural completeness; this is not implementation QA."""
import csv, json, pathlib, re, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'Kit-Manifest.json').read_text(encoding='utf-8'))
with (ROOT/'Feature-Traceability.csv').open(encoding='utf-8-sig',newline='') as f:
    records=list(csv.DictReader(f))
ids=[r['id'] for r in records];phases=manifest['phases']
errors=[]
if len(ids)!=len(set(ids)):errors.append('Duplicate feature IDs')
if set(x['phase'] for x in records)!=set(x['id'] for x in phases):errors.append('Feature/phase mismatch')
for p in phases:
    paths=list((ROOT/'Handoffs').glob(f'IMPLEMENTATION-HANDOFF_IntuiForge_{p["id"]}_*.md'))
    if len(paths)!=1:errors.append(f'{p["id"]}: expected one handoff')
    elif any(r['id'] not in paths[0].read_text(encoding='utf-8') for r in records if r['phase']==p['id']):errors.append(f'{p["id"]}: missing feature ID from handoff')
for name in manifest['requiredFiles']:
    if not (ROOT/name).is_file():errors.append(f'missing: {name}')
for f in (ROOT/'Examples').glob('*.json'):
    try:
        x=json.loads(f.read_text(encoding='utf-8'));assert x['kind']=='intui.article';assert x['schemaVersion']=='1.0.0'
    except Exception as e:errors.append(f'{f.name} invalid fixture: {e}')
print(f'IntuiForge kit: {len(phases)} phases, {len(records)} tracked features, {len(errors)} structural errors')
for x in errors:print('FAIL:',x)
if errors:sys.exit(2)
print('PASS: Handoff packaging structure only. No source was built, no UI was browser-tested.')
