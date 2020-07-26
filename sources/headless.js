const debug = require('debug')('app:puppeteerHeadless');
const puppeteer = require('puppeteer');

(async () => {
  debug('Launch puppeteer in headless mode');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.myntra.com/');
  await page.screenshot({ path: 'data/headless.png' });

  await browser.close();
})();
