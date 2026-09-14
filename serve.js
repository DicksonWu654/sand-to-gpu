const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.env.SITE_ROOT || path.join(__dirname, 'site'));
const narration = process.env.NARRATION_STATIC_ONLY === '1' ? null : require('./tools/narration/backend').createNarrationBackend();
const port = Number(process.env.PORT || 8790);
const host = process.env.HOST || '127.0.0.1';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.wav':'audio/wav', '.mp3':'audio/mpeg', '.opus':'audio/ogg' };
const server = http.createServer(async (req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('bad request'); }
  if (narration && await narration.handle(req, res, pathname)) return;
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  if (pathname.includes('\0')) { res.writeHead(400); return res.end('bad request'); }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep)) { res.writeHead(404); return res.end('not found'); }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); return res.end('not found'); }
    const audio=/\.(wav|mp3|opus)$/.test(file);
    const headers={ 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': audio?'public, max-age=31536000, immutable':'no-store', 'X-Content-Type-Options': 'nosniff' };
    let start=0,end=stat.size-1,status=200;
    if(audio)headers['Accept-Ranges']='bytes';
    if(audio && req.headers.range) {
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match || (!match[1] && !match[2])) {res.writeHead(416,{'Content-Range':'bytes */'+stat.size});return res.end();}
      if(!match[1])start=Math.max(0,stat.size-Number(match[2]));
      else {start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}
      if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=stat.size){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});return res.end();}
      status=206;headers['Content-Range']='bytes '+start+'-'+end+'/'+stat.size;
    }
    headers['Content-Length']=stat.size===0?0:end-start+1;
    res.writeHead(status,headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file,stat.size?{start,end}:{}).on('error', () => res.destroy()).pipe(res);
  });
}).listen(port, host, () => console.log(`serving ${root} on http://${host}:${port}`));

for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => { narration?.close(); server.close(() => process.exit(0)); setTimeout(() => process.exit(0),2000).unref(); });
