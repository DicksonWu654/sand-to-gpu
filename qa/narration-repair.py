import io,sys,runpy,pathlib,json,time,hashlib,os
root=pathlib.Path(__file__).resolve().parents[1];home=pathlib.Path(os.environ.get('NARRATION_HOME',pathlib.Path.home()/'.cache/sand-to-gpu'))
key='bb6f9bfa6782b6e9262bbbc41b3a02f724cf8bf5a45b8d5b0153fd8b66b70f48'
inventory=json.loads((home/'narration-inventory.json').read_text());p=next(p for l in inventory['lessons'] for p in l['passages'] if p['key']==key)
sys.stdin=io.StringIO('');worker=runpy.run_path(str(root/'tools/narration/worker.py'))
tokens,locations=worker['prepare_tokens'](p['text']);original=[len(ph) for _,ph,_ in worker['pipeline'].en_tokenize(tokens)];batches=worker['speech_batches'](tokens);lengths=[len(ph) for batch in batches for _,ph,_ in worker['pipeline'].en_tokenize(batch)]
assert max(original)>510 and max(lengths)<=510
assert [id(t) for batch in batches for t in batch]==[id(t) for t in tokens]
start=time.monotonic();result=worker['render'](p['text'],'af_heart');elapsed=time.monotonic()-start
assert result['audioUrl'].endswith(key+'.wav') and result['words'];previous=-1
for word in result['words']:
 assert 0<=word['start']<word['end']<=result['duration'] and word['start']>=previous
 assert 0<=word['textOffset']<word['textOffset']+word['length']<=worker['utf16_len'](p['text'])
 previous=word['start']
assert worker['read_cache'](key,p['text'],'af_heart')['cached']
report={'status':'passed','timestamp':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'key':key,'lesson':'#/m/01','sourceCharacters':worker['utf16_len'](p['text']),'sourceTextSha256':hashlib.sha256(p['text'].encode()).hexdigest(),'originalPhonemeChunkLengths':original,'repairedPhonemeChunkLengths':lengths,'originalTokenIdentityAndOrderPreserved':True,'duration':result['duration'],'generationWallSeconds':round(elapsed,3),'wordTimings':len(result['words']),'cacheReadValidated':True,'device':'cpu','limitations':['Validates complete token batching and timestamp bounds; does not grade audible pronunciation.']}
(root/'qa/reports/narration-repair.json').write_text(json.dumps(report,indent=2)+'\n');sys.__stdout__.write(json.dumps(report)+'\n');sys.__stdout__.flush()
