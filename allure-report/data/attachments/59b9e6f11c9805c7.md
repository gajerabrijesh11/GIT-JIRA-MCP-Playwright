# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> SCRUM-7 | User can click login button >> Clicking login with invalid credentials shows an error message
- Location: tests\login.spec.ts:181:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('p:has-text("Your email or password is incorrect!")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('p:has-text("Your email or password is incorrect!")')

```

```yaml
- heading "This website is under heavy load (queue full)" [level=2]
- paragraph: We're sorry, too many people are accessing this website at the same time. We're working on this problem. Please try again later.
```

# Test source

```ts
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
  153 | 
  154 |   test.beforeEach(async ({ page }) => {
  155 |     await page.goto(LOGIN_URL);
  156 |     await dismissCookieBanner(page);
  157 |   });
  158 | 
  159 |   test('Login button is visible and clickable', async ({ page }) => {
  160 |     // 1. Find the button
  161 |     const loginButton = page.locator('[data-qa="login-button"]');
  162 | 
  163 |     // 2. Assert it is visible and enabled before clicking
  164 |     await expect(loginButton).toBeVisible();
  165 |     await expect(loginButton).toBeEnabled();
  166 |   });
  167 | 
  168 |   test('Clicking login with valid credentials navigates away from login page', async ({ page }) => {
  169 |     // NOTE: Replace VALID_EMAIL / VALID_PASSWORD with a real registered account.
  170 |     // 1. Fill credentials
  171 |     await page.locator('[data-qa="login-email"]').fill(VALID_EMAIL);
  172 |     await page.getByPlaceholder('Password').fill(VALID_PASSWORD);
  173 | 
  174 |     // 2. Click the Login button
  175 |     await page.locator('[data-qa="login-button"]').click();
  176 | 
  177 |     // 3. Assert the user is no longer on the /login page
  178 |     await expect(page).not.toHaveURL(/\/login/);
  179 |   });
  180 | 
  181 |   test('Clicking login with invalid credentials shows an error message', async ({ page }) => {
  182 |     // 1. Fill wrong credentials
  183 |     await page.locator('[data-qa="login-email"]').fill(WRONG_EMAIL);
  184 |     await page.getByPlaceholder('Password').fill(WRONG_PASSWORD);
  185 | 
  186 |     // 2. Click the Login button
  187 |     await page.locator('[data-qa="login-button"]').click();
  188 | 
  189 |     // 3. Assert an error message appears
  190 |     const errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
> 191 |     await expect(errorMessage).toBeVisible();
      |                                ^ Error: expect(locator).toBeVisible() failed
  192 |   });
  193 | 
  194 |   test('Login button submits with keyboard Enter key as well', async ({ page }) => {
  195 |     // 1. Fill credentials
  196 |     await page.locator('[data-qa="login-email"]').fill(WRONG_EMAIL);
  197 |     const passwordInput = page.getByPlaceholder('Password');
  198 |     await passwordInput.fill(WRONG_PASSWORD);
  199 | 
  200 |     // 2. Press Enter instead of clicking the button
  201 |     await passwordInput.press('Enter');
  202 | 
  203 |     // 3. Assert form was submitted (error shown for wrong creds, or redirect for valid)
  204 |     const errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
  205 |     await expect(errorMessage).toBeVisible();
  206 |   });
  207 | 
  208 | });
  209 | 
```