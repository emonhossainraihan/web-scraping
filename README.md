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

I was having same issue and this help me!

## Recaptcha

- `npm i puppeteer-extra`
- `npm i puppeteer-extra-plugin-recaptcha`
