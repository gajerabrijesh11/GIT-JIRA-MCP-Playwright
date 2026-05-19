import { Page, expect } from '@playwright/test';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║                     BasePage                             ║
 * ║  All common reusable methods shared across all pages.    ║
 * ║  Every page class extends this.                          ║
 * ╚══════════════════════════════════════════════════════════╝
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ────────────────────────────────────────────
  /**
   * Navigate to a path — baseURL is set in playwright.config.ts
   * Usage: await this.goto('/login');
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  // ─── Cookie / Consent Banner ───────────────────────────────
  /**
   * Dismisses the cookie consent banner if it appears.
   * Safe to call on every page — silently skips if not present.
   */
  async dismissCookieBanner() {
    try {
      const consentBtn = this.page.locator('p.fc-button-label').first();
      if (await consentBtn.isVisible({ timeout: 3_000 })) {
        await consentBtn.click();
      }
    } catch {
      // Banner not present — continue
    }
  }

  // ─── Wait Helpers ──────────────────────────────────────────
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  // ─── URL Assertions ────────────────────────────────────────
  async assertUrlContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async assertUrlNotContains(path: string) {
    await expect(this.page).not.toHaveURL(new RegExp(path));
  }

  // ─── Title Assertion ───────────────────────────────────────
  async assertTitle(titlePattern: RegExp) {
    await expect(this.page).toHaveTitle(titlePattern);
  }

  // ─── HTTP Status Assertion ─────────────────────────────────
  async assertHttpStatus(path: string, expectedStatus: number) {
    const response = await this.page.goto(path);
    expect(response?.status()).toBe(expectedStatus);
  }

  // ─── Element Helpers ───────────────────────────────────────
  async assertVisible(locatorStr: string) {
    await expect(this.page.locator(locatorStr)).toBeVisible();
  }

  async assertHidden(locatorStr: string) {
    await expect(this.page.locator(locatorStr)).toBeHidden();
  }
}