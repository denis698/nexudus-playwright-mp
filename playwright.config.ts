import { PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const configDotenv = require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e/test',
  //testMatch: ["login.test.ts"],
  grep: [new RegExp('@smoke')],
  //grepInvert: [new RegExp("@smoke"), new RegExp("@invoice")],
  /* Maximum time one test can run for is 90 sec */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html'],
    [
      'monocart-reporter',
      {
        name: 'My Test Report',
        outputFile: './monocart-results/report.html',
      },
    ],
  ],
  //reporter: 'html',
  //reporter: [ ['html', { outputFolder: 'playwright-report/' }] ],
  //reporter: [ ['line'], ['allure-playwright']],
  //reporter: [ ['html', { open: 'never' }] ],
  //reporter: [["list"], ["json", { outputFile: "test-result.json" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: {
      mode: 'retain-on-failure',
      //https://help.nexudus.com/docs/system-requirements
      size: { width: 1920, height: 1080 },
    },
    viewport: { width: 1920, height: 1080 },
    launchOptions: { slowMo: 10 },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
        ignoreHTTPSErrors: true,
        headless: true,
        contextOptions: { recordVideo: { dir: 'monocart-results/videos/' } },
        //Enable File Downloads
        acceptDownloads: true,
        //Artifacts
        testIdAttribute: 'data-test-subj',
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        launchOptions: { slowMo: 0, args: ['--deny-permission-prompts'] },
      },
    },
    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        testIdAttribute: 'data-test-subj',
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        launchOptions: { slowMo: 0, args: ['--deny-permission-prompts'] },
      },
    },
    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        ignoreHTTPSErrors: true,
        headless: true,
        contextOptions: { recordVideo: { dir: 'monocart-results/videos/' } },
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
        //Enable File Downloads
        acceptDownloads: true,
        //Artifacts
        testIdAttribute: 'data-test-subj',
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        launchOptions: { slowMo: 0, args: ['--deny-permission-prompts'] },
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
        headless: false,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        //Artifacts
        testIdAttribute: 'data-test-subj',
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        launchOptions: { slowMo: 0, args: ['--deny-permission-prompts'] },
      },
    },
    {
      name: `Mobile`,
      use: {
        ...devices[`Pixel 4a (5G)`],
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        launchOptions: { slowMo: 0 },
      },
    },
    {
      name: `DB`,
    },
    {
      name: `API`,
      use: {
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
      },
    },
    {
      name: 'Chrome',
      use: {
        channel: 'chrome',
        ignoreHTTPSErrors: true,
        headless: false,
        contextOptions: { recordVideo: { dir: 'monocart-results/videos/' } },
        baseURL: process.env.MP_TEST_MARKETING_PAGE_URL || 'http://localhost:3000',
        //Enable File Downloads in Chrome
        acceptDownloads: true,
        //Artifacts
        testIdAttribute: 'data-test-subj',
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        launchOptions: { slowMo: 0, args: ['--deny-permission-prompts'] },
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'monocart-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
