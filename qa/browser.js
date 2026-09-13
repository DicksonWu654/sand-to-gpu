const fs = require('fs');
const puppeteer = require('puppeteer');
function launch() {
  const candidates = [process.env.PUPPETEER_EXECUTABLE_PATH, puppeteer.executablePath(), '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
  const executablePath = candidates.find(p => fs.existsSync(p));
  if (!executablePath) throw new Error('No browser found. Run npx puppeteer browsers install chrome or set PUPPETEER_EXECUTABLE_PATH.');
  return puppeteer.launch({ headless: true, executablePath, args: ['--force-device-scale-factor=1'] });
}
module.exports = { launch };
