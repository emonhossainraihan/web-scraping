require('dotenv').config();
const debug = require('debug')('app:puppeteerProxy');
const puppeteer = require('puppeteer');

(async () => {
  debug('Launch puppeteer');
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--proxy-server=socks5://173.44.37.82:1080'],
  });
  const page = await browser.newPage();
  debug('go to the page');
  await page.goto('https://www.nationalgeographic.com/', {
    waitUntil: 'load',
    timeout: 0,
  });
  debug('taking screenshot');
  await page.screenshot({
    path: 'data/nationalgeographic.png',
    fullPage: true,
  }); //fullpage screenshot

  await browser.close();
})();
