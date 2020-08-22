## Extract data from psychologytoday.com

1. Open [main page](https://www.psychologytoday.com/us/therapists/illinois)
2. Go inside each of the therapist page
3. Extract name and email
4. See if page have website
5. Get real website URL
6. Extract email from the website if available on that page
7. paginate all the pages from the main page

## Output

A list of therapist information in an array

- name
- phone number
- real website url (if exist)
- email address from the website (if exist)

## Some Error which I faced during complete this homework

### Error: Protocol error (Runtime.callFunctionOn): Target closed

When you launch a browser via puppeteer.launch it will start a browser and connect to it. From there on any function you execute on your opened browser (like page.goto) will be send via the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) to the browser. A target means a tab in this context.

The Target closed exception is thrown when you are trying to run a function, but the target (tab) was already closed.

## Interest things

- [selecting](https://learn.shayhowe.com/advanced-html-css/complex-selectors/)
- [similar-question](https://stackoverflow.com/questions/55877263/puppeteer-execution-context-was-destroyed-most-likely-because-of-a-navigation)
- [flavio](https://flaviocopes.com/puppeteer/)
- [tweet](https://rafaelquintanilha.com/counting-presidential-tweets/)
- [stack-question](https://stackoverflow.com/questions/51706494/using-puppeteer-how-can-i-open-a-page-get-the-data-then-go-back-to-the-previo)
- [stack-question2](https://stackoverflow.com/questions/52325114/overcoming-pagination-when-using-puppeteer-library-for-web-scraping)
- [advanced-web-spidering](https://blog.kowalczyk.info/article/ea07db1b9bff415ab180b0525f3898f6/advanced-web-spidering-with-puppeteer.html)
- In page search in puppeteer
- [practical-example](https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/)
- []()
- dynamic way to target an element
