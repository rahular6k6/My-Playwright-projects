# Sauce Demo Playwright POM

This project uses Playwright Test with JavaScript and the Page Object Model to test
https://www.saucedemo.com.

## Project structure

| Path | Purpose |
| --- | --- |
| `pages/` | Page classes with locators and user actions only; no assertions. |
| `tests/` | Test specs with scenarios, setup, and Playwright assertions. |
| `test-data/` | Shared credentials, customer details, product names, and expected messages. |
| `utils/` | Reusable page-object initialization and other test helpers. |
| `playwright.config.js` | Test discovery, browser, base URL, and run settings. |

Each spec initializes its page objects in `test.beforeEach`. Tests that require an
authenticated session log in during that setup; login tests initialize the login
page without logging in so they can exercise authentication scenarios. Reusable
credentials and test values live in `test-data/sauce-demo-data.js`.

## Run tests

```sh
npm test
npm run test:headed
```

Install the Chromium browser once if it is not already available:

```sh
npx playwright install chromium
```
