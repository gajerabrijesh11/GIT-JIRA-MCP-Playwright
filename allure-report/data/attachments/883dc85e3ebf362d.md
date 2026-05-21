# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> SCRUM-5 | User can open login page >> Login page loads and title is correct
- Location: tests\login.spec.ts:46:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Automation Exercise - Signup \/ Login/i
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    14 × unexpected value ""

```

```yaml
- heading "This website is under heavy load (queue full)" [level=2]
- paragraph: We're sorry, too many people are accessing this website at the same time. We're working on this problem. Please try again later.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Login Tests for automationexercise.com
  5   |  *
  6   |  * Jira Project : Mission Impress HR (SCRUM)
  7   |  * Stories covered:
  8   |  *   SCRUM-5 – User can open login page
  9   |  *   SCRUM-6 – User can enter email and password
  10  |  *   SCRUM-7 – User can click login button
  11  |  *
  12  |  * Selectors verified against the live page:
  13  |  *   Email    → [data-qa="login-email"]
  14  |  *   Password → input[type="password"] / getByPlaceholder('Password')
  15  |  *   Button   → button[data-qa="login-button"] / getByRole('button', { name: 'Login' })
  16  |  */
  17  | 
  18  | const BASE_URL = 'https://www.automationexercise.com';
  19  | const LOGIN_URL = `${BASE_URL}/login`;
  20  | 
  21  | // ─── Test credentials ────────────────────────────────────────────────────────
  22  | // Replace these with a real registered account on automationexercise.com
  23  | const VALID_EMAIL    = 'testbg@gmail.com';
  24  | const VALID_PASSWORD = 'testbg';
  25  | const WRONG_EMAIL    = 'wrong@example.com';
  26  | const WRONG_PASSWORD = 'wrongpassword';
  27  | 
  28  | // ─── Helper: dismiss the cookie / consent banner if it appears ───────────────
  29  | async function dismissCookieBanner(page: import('@playwright/test').Page) {
  30  |   try {
  31  |     const consentBtn = page.locator('p.fc-button-label').first();
  32  |     if (await consentBtn.isVisible({ timeout: 3000 })) {
  33  |       await consentBtn.click();
  34  |     }
  35  |   } catch {
  36  |     // Banner not present – continue normally
  37  |   }
  38  | }
  39  | 
  40  | // ════════════════════════════════════════════════════════════════════════════
  41  | // SCRUM-5 · User can open login page
  42  | // "As a user I want to open the login page so I can sign in"
  43  | // ════════════════════════════════════════════════════════════════════════════
  44  | test.describe('SCRUM-5 | User can open login page', () => {
  45  | 
  46  |   test('Login page loads and title is correct', async ({ page }) => {
  47  |     // 1. Open the page
  48  |     await page.goto(LOGIN_URL);
  49  |     await dismissCookieBanner(page);
  50  | 
  51  |     // 2. Assert the page title contains the expected text
> 52  |     await expect(page).toHaveTitle(/Automation Exercise - Signup \/ Login/i);
      |                        ^ Error: expect(page).toHaveTitle(expected) failed
  53  |   });
  54  | 
  55  |   test('Login form section is visible on the page', async ({ page }) => {
  56  |     // 1. Open the page
  57  |     await page.goto(LOGIN_URL);
  58  |     await dismissCookieBanner(page);
  59  | 
  60  |     // 2. Find the "Login to your account" heading
  61  |     const loginHeading = page.getByRole('heading', { name: /Login to your account/i });
  62  | 
  63  |     // 3. Assert the login form section is visible
  64  |     await expect(loginHeading).toBeVisible();
  65  |   });
  66  | 
  67  |   test('Login URL is reachable (HTTP 200)', async ({ page }) => {
  68  |     // 1. Navigate and capture the response
  69  |     const response = await page.goto(LOGIN_URL);
  70  |     await dismissCookieBanner(page);
  71  | 
  72  |     // 2. Assert the server responded with 200 OK
  73  |     expect(response?.status()).toBe(200);
  74  |   });
  75  | 
  76  | });
  77  | 
  78  | // ════════════════════════════════════════════════════════════════════════════
  79  | // SCRUM-6 · User can enter email and password
  80  | // "As a user I want to fill the login form with my credentials"
  81  | // ════════════════════════════════════════════════════════════════════════════
  82  | test.describe('SCRUM-6 | User can enter email and password', () => {
  83  | 
  84  |   test.beforeEach(async ({ page }) => {
  85  |     await page.goto(LOGIN_URL);
  86  |     await dismissCookieBanner(page);
  87  |   });
  88  | 
  89  |   test('User can type into the email field', async ({ page }) => {
  90  |     // 1. Find the email input using its data-qa attribute
  91  |     const emailInput = page.locator('[data-qa="login-email"]');
  92  | 
  93  |     // 2. Verify the field is visible and enabled
  94  |     await expect(emailInput).toBeVisible();
  95  |     await expect(emailInput).toBeEnabled();
  96  | 
  97  |     // 3. Type a value into it
  98  |     await emailInput.fill(VALID_EMAIL);
  99  | 
  100 |     // 4. Assert the value was actually entered
  101 |     await expect(emailInput).toHaveValue(VALID_EMAIL);
  102 |   });
  103 | 
  104 |   test('User can type into the password field', async ({ page }) => {
  105 |     // 1. Find the password input
  106 |     const passwordInput = page.getByPlaceholder('Password');
  107 | 
  108 |     // 2. Verify the field is visible and enabled
  109 |     await expect(passwordInput).toBeVisible();
  110 |     await expect(passwordInput).toBeEnabled();
  111 | 
  112 |     // 3. Type a value into it
  113 |     await passwordInput.fill(VALID_PASSWORD);
  114 | 
  115 |     // 4. Assert the value was entered (value property, not visible text)
  116 |     await expect(passwordInput).toHaveValue(VALID_PASSWORD);
  117 |   });
  118 | 
  119 |   test('User can fill both email and password fields', async ({ page }) => {
  120 |     // 1. Locate both fields
  121 |     const emailInput    = page.locator('[data-qa="login-email"]');
  122 |     const passwordInput = page.getByPlaceholder('Password');
  123 | 
  124 |     // 2. Fill in credentials
  125 |     await emailInput.fill(VALID_EMAIL);
  126 |     await passwordInput.fill(VALID_PASSWORD);
  127 | 
  128 |     // 3. Assert both fields hold the correct values
  129 |     await expect(emailInput).toHaveValue(VALID_EMAIL);
  130 |     await expect(passwordInput).toHaveValue(VALID_PASSWORD);
  131 |   });
  132 | 
  133 |   test('Email field rejects empty value (HTML5 required validation)', async ({ page }) => {
  134 |     // 1. Leave email empty, fill password, click Login
  135 |     const passwordInput = page.getByPlaceholder('Password');
  136 |     await passwordInput.fill(VALID_PASSWORD);
  137 | 
  138 |     const loginButton = page.locator('[data-qa="login-button"]');
  139 |     await loginButton.click();
  140 | 
  141 |     // 2. The browser's native validation should prevent form submission
  142 |     //    Page URL should still be the login page
  143 |     await expect(page).toHaveURL(/\/login/);
  144 |   });
  145 | 
  146 | });
  147 | 
  148 | // ════════════════════════════════════════════════════════════════════════════
  149 | // SCRUM-7 · User can click login button
  150 | // "As a user I want to click login so I can access my account"
  151 | // ════════════════════════════════════════════════════════════════════════════
  152 | test.describe('SCRUM-7 | User can click login button', () => {
```