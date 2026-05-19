import { test, expect } from '../utils/fixtures';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  SCRUM-5 · User can open login page                      ║
 * ║  Story: "As a user I want to open the login page         ║
 * ║           so I can sign in"                              ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * ✅ No selectors here — all in LoginPage.ts
 * ✅ No base URL here — set in playwright.config.ts
 * ✅ No assertions here — all in LoginPage.ts
 */

test.describe('SCRUM-5 | User can open login page', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('TC001 - Login page loads with correct title', async ({ loginPage }) => {
    await loginPage.assertLoginPageTitleIsCorrect();
  });

  test('TC002 - Login form heading is visible on the page', async ({ loginPage }) => {
    await loginPage.assertLoginHeadingIsVisible();
  });

  test('TC003 - Login page returns HTTP 200 status', async ({ loginPage }) => {
    await loginPage.assertLoginPageHttpStatus();
  });

});