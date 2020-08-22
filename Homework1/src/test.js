const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('goto page');
  await page.goto('https://www.xeonbd.com/', {
    waitUntil: 'networkidle2',
    timeout: 70000,
  });
  console.log('searching Email');
  var emailAdd = (await page.content()).match(
    /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g
  );
  console.log(emailAdd);
  await page.close();
  await browser.close();
  console.log('program end');
})();
