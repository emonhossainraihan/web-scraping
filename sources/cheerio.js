// require('dotenv').config();

// const debug1 = require('debug')('app:1');
// debug1(process.env.API_KEY);

// const debug2 = require('debug')('app:2');
// debug2('onno kono kichu');

const debug = require('debug')('app:axios');
const axios = require('axios');
const cheerio = require('cheerio');

//! jQuery style

async function main() {
  const res = await axios('https://bikroy.com');
  const data = await res.data;
  const $ = cheerio.load(data);
  debug($('h1').text());
}

main();
