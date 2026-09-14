const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'site');
const narration = require('./tools/narration/backend').createNarrationBackend();
const port = Number(process.env.PORT || 8790);
const host = process.env.HOST || '127.0.0.1';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('bad request'); }
  if (await narration.handle(req, res, pathname)) return;
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  if (pathname.includes('\0')) { res.writeHead(400); return res.end('bad request'); }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep)) { res.writeHead(404); return res.end('not found'); }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
}).listen(port, host, () => console.log(`serving site/ on http://${host}:${port}`));

for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => { narration.close(); server.close(() => process.exit(0)); setTimeout(() => process.exit(0),2000).unref(); });
