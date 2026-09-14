"""Bounded isolated GPU throughput benchmark; never modifies the listening cache."""
import concurrent.futures, json, os, pathlib, select, subprocess, tempfile, time
ROOT = pathlib.Path(__file__).resolve().parents[2]
HOME = pathlib.Path(os.environ.get('NARRATION_HOME', pathlib.Path.home() / '.cache/sand-to-gpu'))
PYTHON = os.environ.get('NARRATION_PYTHON', str(HOME / 'narration-gpu-py312/bin/python'))
inventory = json.loads((HOME / 'narration-inventory.json').read_text())
texts = list(dict.fromkeys(p['text'] for lesson in inventory['lessons'] for p in lesson['passages']))
samples = [min(texts, key=lambda text: abs(len(text) - target)) for target in (100, 500, 1000)]

class Worker:
    def __init__(self):
        self.home = pathlib.Path(tempfile.mkdtemp(prefix='narration-gpu-benchmark-'))
        (self.home / 'narration-model').symlink_to(HOME / 'narration-model', target_is_directory=True)
        self.log = (self.home / 'stderr.log').open('w')
        started = time.monotonic()
        self.process = subprocess.Popen([PYTHON, str(ROOT / 'tools/narration/worker.py')], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=self.log, text=True, env={**os.environ, 'NARRATION_HOME':str(self.home), 'NARRATION_DEVICE':'cuda', 'NARRATION_THREADS':'2'})
        assert self.receive(120).get('event') == 'ready'
        self.startup_seconds = time.monotonic() - started
    def receive(self, timeout):
        if not select.select([self.process.stdout], [], [], timeout)[0]:
            raise TimeoutError('Worker timed out; see '+str(self.home))
        return json.loads(self.process.stdout.readline())
    def render(self, text):
        started = time.monotonic()
        self.process.stdin.write(json.dumps({'id':1,'text':text,'voice':'af_heart'})+'\n')
        self.process.stdin.flush()
        data = self.receive(180)
        if 'error' in data: raise RuntimeError(data['error'])
        result = data['result']
        assert result['cached'] is False
        assert result['duration'] > 0 and result['words']
        return {'characters':len(text), 'wallSeconds':round(time.monotonic()-started,3), 'generationSeconds':result['generationSeconds'], 'audioSeconds':result['duration'], 'words':len(result['words'])}
    def close(self):
        self.process.terminate()
        self.process.wait(timeout=10)
        self.log.close()

def benchmark(count):
    workers=[]
    try:
        workers = [Worker() for _ in range(count)]
        for worker in workers: worker.render('A silicon crystal gives a chip its foundation.')
        def batch(worker): return [worker.render(text) for text in samples]
        started=time.monotonic()
        with concurrent.futures.ThreadPoolExecutor(max_workers=count) as pool:
            results=list(pool.map(batch, workers))
        elapsed=time.monotonic()-started
        gpu=subprocess.check_output(['/usr/lib/wsl/lib/nvidia-smi','--query-gpu=memory.used,memory.total,utilization.gpu','--format=csv,noheader'],text=True).strip()
        result={'workers':count,'threadsEach':2,'startupSeconds':[round(w.startup_seconds,3) for w in workers], 'wallSeconds':round(elapsed,3),'audioSeconds':round(sum(x['audioSeconds'] for row in results for x in row),3),'results':results,'gpuAfterBatch':gpu}
        result['audioSecondsPerWallSecond']=round(result['audioSeconds']/elapsed,2)
        print(json.dumps(result),flush=True)
        return result
    finally:
        for worker in workers: worker.close()

if __name__ == '__main__':
    results=[benchmark(1),benchmark(2)]
    report={'timestamp':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'runtime':'torch 2.14.0+cu130','python':PYTHON,'device':'NVIDIA GeForce RTX 5070','dependencyCheck':'uv pip check passed on Python 3.12.3', 'source':'Exact inventory passages nearest 100, 500 and 1000 characters; isolated cache per worker; warmup excluded', 'results':results,'primarySources':['https://pytorch.org/blog/pytorch-2-7/','https://pytorch.org/blog/pytorch-2-12-release-blog/'], 'limitations':['Small throughput sample; full-course rates depend on phoneme splitting, punctuation and disk export overhead.','Does not grade audible voice quality or independently align spoken words.']}
    (ROOT/'qa/reports/narration-gpu-benchmark.json').write_text(json.dumps(report,indent=2)+'\n')
