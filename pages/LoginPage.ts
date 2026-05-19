import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║                    LoginPage                             ║
 * ║  All selectors, methods, and assertions for login page.  ║
 * ║  Tests ONLY call these methods — no selectors in tests!  ║
 * ╚══════════════════════════════════════════════════════════╝
 */
export class LoginPage extends BasePage {

  // ─── Selectors (private — tests never touch these) ─────────
  private readonly selectors = {
    emailInput    : '[data-qa="login-email"]',
    passwordInput : '[placeholder="Password"]',
    loginButton   : '[data-qa="login-button"]',
    loginHeading  : 'h2:has-text("Login to your account")',
    errorMessage  : 'p:has-text("Your email or password is incorrect!")',
  };

  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ────────────────────────────────────────────
  async navigateToLoginPage() {
    await this.goto('/login');
    await this.dismissCookieBanner();
  }

  // ─── Actions ───────────────────────────────────────────────
  async enterEmail(email: string) {
    await this.page.locator(this.selectors.emailInput).fill(email);
  }

  async enterPassword(password: string) {
    await this.page.locator(this.selectors.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(this.selectors.loginButton).click();
  }

  async pressEnterOnPasswordField() {
    await this.page.locator(this.selectors.passwordInput).press('Enter');
  }

  /**
   * Reusable: fill credentials + click login in one call
   */
  async loginWith(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // ─── Assertions (ALL assertions live here, not in tests) ───

  async assertLoginPageTitleIsCorrect() {
    await this.assertTitle(/Automation Exercise - Signup \/ Login/i);
  }

  async assertLoginHeadingIsVisible() {
    await expect(
      this.page.locator(this.selectors.loginHeading)
    ).toBeVisible();
  }

  async assertLoginPageHttpStatus() {
    await this.assertHttpStatus('/login', 200);
  }

  async assertEmailFieldIsVisible() {
    await expect(
      this.page.locator(this.selectors.emailInput)
    ).toBeVisible();
  }

  async assertEmailFieldIsEnabled() {
    await expect(
      this.page.locator(this.selectors.emailInput)
    ).toBeEnabled();
  }

  async assertEmailFieldHasValue(email: string) {
    await expect(
      this.page.locator(this.selectors.emailInput)
    ).toHaveValue(email);
  }

  async assertPasswordFieldIsVisible() {
    await expect(
      this.page.locator(this.selectors.passwordInput)
    ).toBeVisible();
  }

  async assertPasswordFieldIsEnabled() {
    await expect(
      this.page.locator(this.selectors.passwordInput)
    ).toBeEnabled();
  }

  async assertPasswordFieldHasValue(password: string) {
    await expect(
      this.page.locator(this.selectors.passwordInput)
    ).toHaveValue(password);
  }

  async assertLoginButtonIsVisible() {
    await expect(
      this.page.locator(this.selectors.loginButton)
    ).toBeVisible();
  }

  async assertLoginButtonIsEnabled() {
    await expect(
      this.page.locator(this.selectors.loginButton)
    ).toBeEnabled();
  }

  async assertUserIsLoggedIn() {
    await this.assertUrlNotContains('/login');
  }

  async assertUserStaysOnLoginPage() {
    await this.assertUrlContains('/login');
  }

  async assertInvalidCredentialsErrorIsVisible() {
    await expect(
      this.page.locator(this.selectors.errorMessage)
    ).toBeVisible();
  }
}