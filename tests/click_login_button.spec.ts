import { test, expect } from '../utils/fixtures';
import { loginData } from '../test-data/loginData';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  SCRUM-7 · User can click login button                   ║
 * ║  Story: "As a user I want to click login so I can        ║
 * ║           access my account"                             ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * ✅ No selectors here — all in LoginPage.ts
 * ✅ Test data imported from test-data/loginData.ts
 * ✅ Assertions done inside LoginPage methods
 */

test.describe('SCRUM-7 | User can click login button', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('TC010 - Login button is visible and enabled', async ({ loginPage }) => {
    await loginPage.assertLoginButtonIsVisible();
    await loginPage.assertLoginButtonIsEnabled();
  });

  test('TC011 - Valid credentials navigate away from login page', async ({ loginPage }) => {
    await loginPage.loginWith(
      loginData.validUser.email,
      loginData.validUser.password
    );
    await loginPage.assertUserIsLoggedIn();
  });

  test('TC012 - Invalid credentials show error message', async ({ loginPage }) => {
    await loginPage.loginWith(
      loginData.invalidUser.email,
      loginData.invalidUser.password
    );
    await loginPage.assertInvalidCredentialsErrorIsVisible();
  });

  test('TC013 - Pressing Enter on password field submits the form', async ({ loginPage }) => {
    await loginPage.enterEmail(loginData.invalidUser.email);
    await loginPage.enterPassword(loginData.invalidUser.password);
    await loginPage.pressEnterOnPasswordField();
    await loginPage.assertInvalidCredentialsErrorIsVisible();
  });

});