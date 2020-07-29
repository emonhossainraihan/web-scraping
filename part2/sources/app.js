const axios = require('axios').default;
const fs = require('fs');
const cheerio = require('cheerio');
const glob = require('glob');
const colors = require('colors');
const json2csv = require('json2csv').Parser;

// get data from member list page
(async () => {
  for (let i = 1; i < 2; i++) {
    const id = i * 10;
    const res = await axios(`http://www.bgmea.com.bd/member/memberlist/${i}`);

    // extract the data
    const data = await res.data;

    console.log('Saving html files...'.green);
    // save
    const save = await fs.writeFileSync(`data/info/${id}.html`, data);
  }
  getDetails();
})();

// get the details from the page
async function getDetails() {
  // enter to the saved files and extract the links
  let files = glob.sync('data/info/*.html');

  const allLinks = [];

  console.log('reading data file..'.inverse.green);
  for (file of files) {
    fs.readFile(file, 'utf8', async function (err, data) {
      if (err) throw err;

      const $ = await cheerio.load(data);
      const links = await $('td')
        .find('a')
        .each(function () {
          allLinks.push($(this).attr('href'));
        });

      for (let url of allLinks) {
        //extract id from url
        const id = url.split('/').slice(-1)[0];
        const res = await axios(url);
        // extract the data
        const data = await res.data;
        // save
        const save = await fs.writeFileSync(`data/details/${id}.html`, data);
      }
      extractData();
    });
  }
}

async function extractData() {
  // enter to every file and extract data
  let dataFiles = glob.sync('data/details/*.html');
  // console.log(dataFiles)
  for (file of dataFiles) {
    fs.readFile(file, 'utf8', async function (err, data) {
      if (err) throw err;

      const $ = await cheerio.load(data);
      const details = await $('#tabs-2 tr#director_row0').text().trim();

      console.log('retriving data...'.cyan);
      // write to csv file
      fs.appendFileSync('data/out/data.txt', details);
    });
  }
}
