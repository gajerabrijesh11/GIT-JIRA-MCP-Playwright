import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  workers: process.env.CI ? 4 : 2,
  fullyParallel: true,
  testDir: './tests',

  /* Run tests in files in parallel */


  /* Fail the build on CI if you accidentally left test.only in source */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests once on CI */
  retries: process.env.CI ? 2 : 0,

  /* Reporter */
  reporter: [
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
    }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    /* ✅ BASE URL set centrally — just use page.goto('/login') in tests */
    baseURL: 'https://www.automationexercise.com',

    /* Collect trace, screenshot, video on failure */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',

    /* Default timeout for actions */
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  /* Default test timeout */
  timeout: 30_000,
  expect: { timeout: 5_000 },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment below to run cross-browser
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
  ],
});