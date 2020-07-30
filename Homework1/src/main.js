const puppeteer = require('puppeteer');
const colors = require('colors');
const fs = require('fs');

const mainURL = 'https://www.psychologytoday.com/us/therapists/illinois/';

//* main function

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const mainpage = await browser.newPage();

  console.log('goto main page'.green);
  await mainpage.goto(mainURL);
  //* collecting URLS
  const URLS = await collectURL(mainpage);

  //* collect data
  const collectNamePage = await browser.newPage();
  console.log('created new tab'.green);
  const data = await collectNameAndPhone(collectNamePage, URLS);

  //* saving data
  saveData(data);

  //* close everything
  await mainpage.close();
  await browser.close();
  console.log('closing browser'.green);
})();

//* subfunction
async function collectURL(page) {
  console.log('collecting urls'.green);
  const URLS = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('.result-actions a'),
      (element) => element.href
    )
  );
  if (typeof URLS[0] === 'string') {
    console.log('urls collected successfully'.green);
  } else {
    console.log('failed to collect urls'.red);
    process.exit(1);
  }
  console.log('collection finished'.green);
  return URLS;
}
async function collectNameAndPhone(page, URLS) {
  var collections = [];

  for (let i = 0, totalUrls = URLS.length; i < totalUrls; i++) {
    await page.goto(URLS[i]);
    await page.waitForSelector('.profile-phone-column span a');

    console.log('navigate url'.green);

    //* collecting name and phone number
    const [name, phone, website] = await page.evaluate(() => [
      document.querySelector('.profile-middle .name-title-column h1').innerText,
      document.querySelector('.profile-phone-column span a').innerText,
      document.querySelector('.profile-buttons a.hidden-sm-down').href,
    ]);

    collections.push({ name, phone });
  }
  await page.close();
  return collections;
}

function saveData(data) {
  const jsonContent = JSON.stringify(data, null, 4);
  fs.writeFile('./data/output.json', jsonContent, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!'.green);
  });
}
