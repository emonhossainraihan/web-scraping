const debug = require('debug')('app:axios');
const axios = require('axios');
const { JSDOM } = require('jsdom');

async function main() {
  const res = await axios('https://bikroy.com');
  const data = await res.data;
  const dom = new JSDOM(data);
  const { document } = dom.window;
  debug(document.querySelector('h1').innerHTML);
}

main();
