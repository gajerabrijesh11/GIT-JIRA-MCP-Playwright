import { test, expect } from '@playwright/test';

/**
 * Login Tests for automationexercise.com
 *
 * Jira Project : Mission Impress HR (SCRUM)
 * Stories covered:
 *   SCRUM-5 – User can open login page
 *   SCRUM-6 – User can enter email and password
 *   SCRUM-7 – User can click login button
 *
 * Selectors verified against the live page:
 *   Email    → [data-qa="login-email"]
 *   Password → input[type="password"] / getByPlaceholder('Password')
 *   Button   → button[data-qa="login-button"] / getByRole('button', { name: 'Login' })
 */

const BASE_URL = 'https://www.automationexercise.com';
const LOGIN_URL = `${BASE_URL}/login`;

// ─── Test credentials ────────────────────────────────────────────────────────
// Replace these with a real registered account on automationexercise.com
const VALID_EMAIL    = 'testbg@gmail.com';
const VALID_PASSWORD = 'testbg';
const WRONG_EMAIL    = 'wrong@example.com';
const WRONG_PASSWORD = 'wrongpassword';

// ─── Helper: dismiss the cookie / consent banner if it appears ───────────────
async function dismissCookieBanner(page: import('@playwright/test').Page) {
  try {
    const consentBtn = page.locator('p.fc-button-label').first();
    if (await consentBtn.isVisible({ timeout: 3000 })) {
      await consentBtn.click();
    }
  } catch {
    // Banner not present – continue normally
  }
}

// ════════════════════════════════════════════════════════════════════════════
// SCRUM-5 · User can open login page
// "As a user I want to open the login page so I can sign in"
// ════════════════════════════════════════════════════════════════════════════
test.describe('SCRUM-5 | User can open login page', () => {

  test('Login page loads and title is correct', async ({ page }) => {
    // 1. Open the page
    await page.goto(LOGIN_URL);
    await dismissCookieBanner(page);

    // 2. Assert the page title contains the expected text
    await expect(page).toHaveTitle(/Automation Exercise - Signup \/ Login/i);
  });

  test('Login form section is visible on the page', async ({ page }) => {
    // 1. Open the page
    await page.goto(LOGIN_URL);
    await dismissCookieBanner(page);

    // 2. Find the "Login to your account" heading
    const loginHeading = page.getByRole('heading', { name: /Login to your account/i });

    // 3. Assert the login form section is visible
    await expect(loginHeading).toBeVisible();
  });

  test('Login URL is reachable (HTTP 200)', async ({ page }) => {
    // 1. Navigate and capture the response
    const response = await page.goto(LOGIN_URL);
    await dismissCookieBanner(page);

    // 2. Assert the server responded with 200 OK
    expect(response?.status()).toBe(200);
  });

});

// ════════════════════════════════════════════════════════════════════════════
// SCRUM-6 · User can enter email and password
// "As a user I want to fill the login form with my credentials"
// ════════════════════════════════════════════════════════════════════════════
test.describe('SCRUM-6 | User can enter email and password', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await dismissCookieBanner(page);
  });

  test('User can type into the email field', async ({ page }) => {
    // 1. Find the email input using its data-qa attribute
    const emailInput = page.locator('[data-qa="login-email"]');

    // 2. Verify the field is visible and enabled
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();

    // 3. Type a value into it
    await emailInput.fill(VALID_EMAIL);

    // 4. Assert the value was actually entered
    await expect(emailInput).toHaveValue(VALID_EMAIL);
  });

  test('User can type into the password field', async ({ page }) => {
    // 1. Find the password input
    const passwordInput = page.getByPlaceholder('Password');

    // 2. Verify the field is visible and enabled
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();

    // 3. Type a value into it
    await passwordInput.fill(VALID_PASSWORD);

    // 4. Assert the value was entered (value property, not visible text)
    await expect(passwordInput).toHaveValue(VALID_PASSWORD);
  });

  test('User can fill both email and password fields', async ({ page }) => {
    // 1. Locate both fields
    const emailInput    = page.locator('[data-qa="login-email"]');
    const passwordInput = page.getByPlaceholder('Password');

    // 2. Fill in credentials
    await emailInput.fill(VALID_EMAIL);
    await passwordInput.fill(VALID_PASSWORD);

    // 3. Assert both fields hold the correct values
    await expect(emailInput).toHaveValue(VALID_EMAIL);
    await expect(passwordInput).toHaveValue(VALID_PASSWORD);
  });

  test('Email field rejects empty value (HTML5 required validation)', async ({ page }) => {
    // 1. Leave email empty, fill password, click Login
    const passwordInput = page.getByPlaceholder('Password');
    await passwordInput.fill(VALID_PASSWORD);

    const loginButton = page.locator('[data-qa="login-button"]');
    await loginButton.click();

    // 2. The browser's native validation should prevent form submission
    //    Page URL should still be the login page
    await expect(page).toHaveURL(/\/login/);
  });

});

// ════════════════════════════════════════════════════════════════════════════
// SCRUM-7 · User can click login button
// "As a user I want to click login so I can access my account"
// ════════════════════════════════════════════════════════════════════════════
test.describe('SCRUM-7 | User can click login button', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await dismissCookieBanner(page);
  });

  test('Login button is visible and clickable', async ({ page }) => {
    // 1. Find the button
    const loginButton = page.locator('[data-qa="login-button"]');

    // 2. Assert it is visible and enabled before clicking
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test('Clicking login with valid credentials navigates away from login page', async ({ page }) => {
    // NOTE: Replace VALID_EMAIL / VALID_PASSWORD with a real registered account.
    // 1. Fill credentials
    await page.locator('[data-qa="login-email"]').fill(VALID_EMAIL);
    await page.getByPlaceholder('Password').fill(VALID_PASSWORD);

    // 2. Click the Login button
    await page.locator('[data-qa="login-button"]').click();

    // 3. Assert the user is no longer on the /login page
    await expect(page).not.toHaveURL(/\/login/);
  });

  test('Clicking login with invalid credentials shows an error message', async ({ page }) => {
    // 1. Fill wrong credentials
    await page.locator('[data-qa="login-email"]').fill(WRONG_EMAIL);
    await page.getByPlaceholder('Password').fill(WRONG_PASSWORD);

    // 2. Click the Login button
    await page.locator('[data-qa="login-button"]').click();

    // 3. Assert an error message appears
    const errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
    await expect(errorMessage).toBeVisible();
  });

  test('Login button submits with keyboard Enter key as well', async ({ page }) => {
    // 1. Fill credentials
    await page.locator('[data-qa="login-email"]').fill(WRONG_EMAIL);
    const passwordInput = page.getByPlaceholder('Password');
    await passwordInput.fill(WRONG_PASSWORD);

    // 2. Press Enter instead of clicking the button
    await passwordInput.press('Enter');

    // 3. Assert form was submitted (error shown for wrong creds, or redirect for valid)
    const errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
    await expect(errorMessage).toBeVisible();
  });

});
