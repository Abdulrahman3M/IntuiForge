#!/usr/bin/env python3
"""Read-only ZIP inventory and risk scanner: does NOT extract or modify the archive."""
import argparse, hashlib, json, os, pathlib, posixpath, re, stat, sys, zipfile

def sha256(path):
    h=hashlib.sha256()
    with open(path,'rb') as f:
        for chunk in iter(lambda: f.read(1024*1024),b''):
            h.update(chunk)
    return h.hexdigest()

def audit(path):
    result={'source':str(path),'sha256':sha256(path),'errors':[],'warnings':[],'entries':[]}
    max_entries=250000; max_total=5*1024**3; max_single=2*1024**3
    seen=set(); total=0
    with zipfile.ZipFile(path) as z:
        infos=z.infolist()
        if len(infos)>max_entries:result['errors'].append('Too many ZIP entries')
        for info in infos:
            name=info.filename; norm=name.replace('\\','/')
            parts=norm.split('/')
            mode=(info.external_attr >> 16) & 0xffff
            issues=[]
            if name.startswith(('/', '\\')) or re.match(r'^[A-Za-z]:',name) or norm.startswith('//'):
                issues.append('absolute path')
            if '..' in parts: issues.append('parent traversal')
            if '\x00' in name: issues.append('NUL')
            if re.match(r'^[A-Za-z]:',norm):issues.append('drive path')
            if stat.S_ISLNK(mode): issues.append('symlink')
            if norm.casefold() in seen: issues.append('duplicate casefolded path')
            if info.file_size>max_single:issues.append('single file too large')
            if info.compress_size and info.file_size>10*1024*1024 and info.file_size/info.compress_size>250:
                issues.append('suspicious compression ratio')
            seen.add(norm.casefold());total+=info.file_size
            if issues:result['errors'].append({'path':name,'issues':issues})
            if len(result['entries'])<20000:result['entries'].append({'name':name,'bytes':info.file_size,'compressed':info.compress_size})
        if total>max_total:result['errors'].append('Uncompressed total exceeds configured review limit')
    result.update(entryCount=len(infos),uncompressedBytes=total,truncatedEntryList=len(infos)>20000)
    return result

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--zip',required=True,type=pathlib.Path);ap.add_argument('--json',type=pathlib.Path)
    args=ap.parse_args();d=audit(args.zip)
    if args.json:
        args.json.parent.mkdir(parents=True,exist_ok=True)
        args.json.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
    print('ZIP SHA256:',d['sha256'],'Entries:',d['entryCount'],'Errors:',len(d['errors']),'Warnings:',len(d['warnings']))
    if d['errors']:print(json.dumps(d['errors'][:30],ensure_ascii=False,indent=2));sys.exit(2)
    print('PASS: read-only metadata scan; this does not guarantee safe extraction or correctness of ZIP source code.')
if __name__=='__main__':main()
