**Web Scraping** (also termed Screen Scraping, Web Data Extraction, Web Harvesting etc.) is a technique employed to extract large amounts of data from websites whereby the data is extracted and saved to a local file in your computer or to a database in table (spreadsheet) format.

## Prerequisites

This repo is primarily aimed at developers who have some level of experience with Javascript. If you have a firm understanding of Web Scraping but have no experience with Javascript, this repo could still prove useful.

- ✅ A background in Javascript
- ✅ Experience using the DevTools to extract selectors of elements
- ✅ Some experience with ES6 Javascript (Optional)

## Outcomes

By reading this post will be able to:

- Utilize multiple modern libraries to scrape the web

## Libraries for craping

### Cheerio: Core JQuery for traversing the DOM

Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript.

So if the website or web application that you are trying to crawl is Javascript heavy (for example a Single Page Application) then Cheerio is not your best bet, you might have to rely on some of the other options that are talked about later on.

### Jsdom: The DOM for Node

jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js. In general, the goal of the project is to emulate enough of a subset of a web browser to be useful for testing and scraping real-world web applications.

Since a DOM is created, it is possible to interact with the web application or website you want to crawl programmatically, so something like clicking on a button is possible.

### Puppeteer: The headless browser

Puppeteer, as the name implies, allows you to manipulate the browser programmatically just like how a puppet would be manipulated by its puppeteer. It achieves this by providing a developer with a high-level API to control a headless version of Chrome by default and can be configured to run non-headless.

### Nightmare: An alternative to Puppeteer

## SET VARIABLE

For windows environments you need to use SET VARIABLE for example

```bash
"scripts" : {
   "start" : "SET DEBUG=app:* & node index.js"
}
```

That will help you with windows env but if you want to use cross platform I recommend to install this library cross-env that library will help you to set variables for windows and linux environments. And the json should look like this:

```bash
"scripts" : {
    "start" : "cross-env DEBUG=app:* & node index.js"
}
```

## Why dotenv-cli ?

Dotenv-cli is a simple package that provides the `dotenv` command. It reads the `.env` file from the current directory puts the contents in the environment and executes the given command.

I avoid this strategy and implcitly create npm scripts to set the variables. You can do the same this using `dotenv -e .env node <file_name_with_relative_path>`

## recaptcha and puppeteer

You need `puppeteer-extra` and `puppeteer-extra-plugin-recaptcha` package to solve reCAPTCHAs automatically.

- add recaptcha plugin and provide it your 2captcha token
- 2captcha is the builtin solution provider but others would work as well

**Please note**

> You need a provider configured for this plugin to do it's magic. If you decide to use the built-in 2captcha provider you need to add funds to your 2captcha account.

## Screenshot issue

As you expected those screenshots would be saved in `data/` dir but as I change the dir using scripts(`cd sources`) hence it was created at `sources/data` 🙃
