import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║                   Custom Fixtures                        ║
 * ║  Extend Playwright's base test with page object fixtures ║
 * ║  Usage in tests: import { test } from '../utils/fixtures'║
 * ╚══════════════════════════════════════════════════════════╝
 */

// Define the shape of our custom fixtures
type CustomFixtures = {
  loginPage: LoginPage;
};

// Extend base test with our custom fixtures
export const test = base.extend<CustomFixtures>({

  /**
   * loginPage fixture — auto-creates LoginPage instance for every test
   * No need to manually instantiate in each test file!
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

// Re-export expect so tests only need one import
export { expect } from '@playwright/test';