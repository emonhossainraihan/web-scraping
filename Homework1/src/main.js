//! by Emon Hossain

//* import packages
const readline = require('readline');
const puppeteer = require('puppeteer');
const colors = require('colors');
const fs = require('fs');

//* reading input from command line

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

console.log('How many pages do you want to crawling? '.red);
process.stdin.setEncoding('utf8');
rl.on('line', readLine);

async function readLine(line) {
  await scrap(parseInt(line, 10));
  process.exit();
}

const mainURL = 'https://www.psychologytoday.com/us/therapists/illinois/';

const scrap = async (n) => {
  var mainData = [];

  console.log(`printing page number ${n}`.blue);
  const browser = await puppeteer.launch({ headless: true });

  //* create mainpage
  const mainpage = await browser.newPage();

  console.log('goto main page'.green);
  await mainpage.goto(mainURL);

  for (let i = 0; i < n; i++) {
    var data = await mainFunction(browser, mainpage);

    mainData.push(data);

    const goNext = await mainpage.evaluate(
      () => document.querySelector('a.btn-next').href
    );
    console.log('start pagination'.red);
    await mainpage.goto(goNext);
  }

  //* close everything
  await mainpage.close();
  await browser.close();
  console.log('closing browser'.green);
  //* saving data

  // saveData(mainData);
  fs.writeFileSync('./data/output.json', JSON.stringify(mainData, null, 4));
};

//* subfunction

async function mainFunction(browser, page) {
  //* collecting URLS
  const URLS = await collectURL(page);

  //* collect data using a new page
  const collectDataPage = await browser.newPage();
  console.log('created new tab'.green);
  const data = await collectData(collectDataPage, URLS);

  return data;
}

async function collectURL(page) {
  console.log('collecting urls'.green);
  await page.waitForSelector('.result-actions a');
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
async function collectData(page, URLS) {
  var collections = [];

  for (let i = 0, totalUrls = URLS.length; i < totalUrls; i++) {
    //* reseting temp variable
    var foundWebsite = false;
    var address = null;
    var email = null;

    console.log(`navigating ${URLS[i]}`.green);

    await page.goto(URLS[i], { waitUntil: 'networkidle2' });

    await page.waitForSelector('a.btn.btn-md.btn-profile');
    //* collecting name and phone number
    const [name, phone] = await page.evaluate(() => [
      document.querySelector('.profile-middle .name-title-column h1').innerText,
      document.querySelector('.profile-phone-column span a').innerText,
    ]);

    //* collecting website address
    //? foundWebsite will decide "Is there any website button?"
    foundWebsite = await page.evaluate(() => window.find('Website'));

    //* create a container for temp url when website button clicked
    var websiteTempUrl = '';

    console.log(`is there any website button? ${foundWebsite}`.green);

    //* store the temp URL in WebsiteTempUrl variable
    if (foundWebsite) {
      websiteTempUrl = await page.evaluate(() => {
        return document.querySelector('.profile-buttons a.hidden-sm-down').href;
      });

      try {
        await page.goto(websiteTempUrl, {
          waitUntil: 'networkidle2',
          timeout: 70000,
        });

        address = await page.url();
        console.log('searching Email'.green);
        let emailList = [
          ...(await page.content()).match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g),
        ];
        email = emailList[emailList.length - 1];
        console.log(`found ${email}`.red);
      } catch (err) {
        address = 'dead link';
      }
    }

    //* push all data inside collections array
    collections.push({ name, phone, address, email });
  }

  //* close the new tab
  await page.close();
  return collections;
}

// function saveData(data) {
//   const jsonContent = JSON.stringify(data, null, 4);

//   console.log(jsonContent);

//   fs.writeFile('./data/output.json', jsonContent, 'utf8', function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('The file was saved!'.green);
//   });
// }
