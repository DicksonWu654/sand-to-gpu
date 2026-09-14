const fs = require('fs');
const puppeteer = require('puppeteer');
async function launch() {
  const candidates = [process.env.PUPPETEER_EXECUTABLE_PATH, await puppeteer.executablePath(), '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(p => typeof p === 'string' && p.length > 0);
  const executablePath = candidates.find(p => fs.existsSync(p));
  if (!executablePath) throw new Error('No browser found. Run npx puppeteer browsers install chrome or set PUPPETEER_EXECUTABLE_PATH.');
  return puppeteer.launch({ headless: true, executablePath, args: ['--force-device-scale-factor=1'] });
}
module.exports = { launch };
