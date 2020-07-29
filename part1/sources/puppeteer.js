const debug = require('debug')('app:puppeteer');
const puppeteer = require('puppeteer');

(async () => {
  debug('launch puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  debug('opening browser');
  await page.goto('https://react-redux.realworld.io/#/?_k=xiy6dr');

  debug('waiting for article preview');
  await page.waitForSelector('.article-preview h1');

  debug('collecting data');
  const title = await page.title();
  const preview = await page.evaluate(
    () => document.querySelector('.article-preview h1').innerHTML
  );

  debug({ title, preview });

  await browser.close();
})();
