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

## Recaptcha

You need `puppeteer-extra` and `puppeteer-extra-plugin-recaptcha` library

- add recaptcha plugin and provide it your 2captcha token
- 2captcha is the builtin solution provider but others would work as well

## Screenshot issue

As you expected those screenshots would be saved in `data/` dir but as I change the dir using scripts(`cd sources`) hence it was created at `sources/data` 🙃
