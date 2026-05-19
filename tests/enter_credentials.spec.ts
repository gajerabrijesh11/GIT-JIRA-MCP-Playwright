import { test, expect } from '../utils/fixtures';
import { loginData } from '../test-data/loginData';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  SCRUM-6 · User can enter email and password             ║
 * ║  Story: "As a user I want to fill the login form         ║
 * ║           with my credentials"                           ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * ✅ No selectors here — all in LoginPage.ts
 * ✅ Test data imported from test-data/loginData.ts
 * ✅ Assertions done inside LoginPage methods
 */

test.describe('SCRUM-6 | User can enter email and password', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('TC004 - Email field is visible and enabled', async ({ loginPage }) => {
    await loginPage.assertEmailFieldIsVisible();
    await loginPage.assertEmailFieldIsEnabled();
  });

  test('TC005 - User can type into the email field', async ({ loginPage }) => {
    await loginPage.enterEmail(loginData.validUser.email);
    await loginPage.assertEmailFieldHasValue(loginData.validUser.email);
  });

  test('TC006 - Password field is visible and enabled', async ({ loginPage }) => {
    await loginPage.assertPasswordFieldIsVisible();
    await loginPage.assertPasswordFieldIsEnabled();
  });

  test('TC007 - User can type into the password field', async ({ loginPage }) => {
    await loginPage.enterPassword(loginData.validUser.password);
    await loginPage.assertPasswordFieldHasValue(loginData.validUser.password);
  });

  test('TC008 - User can fill both email and password fields', async ({ loginPage }) => {
    await loginPage.enterEmail(loginData.validUser.email);
    await loginPage.enterPassword(loginData.validUser.password);
    await loginPage.assertEmailFieldHasValue(loginData.validUser.email);
    await loginPage.assertPasswordFieldHasValue(loginData.validUser.password);
  });

  test('TC009 - Empty email prevents form submission', async ({ loginPage }) => {
    await loginPage.enterPassword(loginData.validUser.password);
    await loginPage.clickLoginButton();
    await loginPage.assertUserStaysOnLoginPage();
  });

});