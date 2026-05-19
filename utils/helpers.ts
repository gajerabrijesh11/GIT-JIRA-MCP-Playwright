import { Page } from '@playwright/test';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║                   Helper Utilities                       ║
 * ║  Generic reusable functions used across the framework.   ║
 * ╚══════════════════════════════════════════════════════════╝
 */

/**
 * Wait for a specific number of milliseconds.
 * Use sparingly — prefer Playwright auto-waiting instead.
 */
export async function waitFor(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random email address for test data.
 * Useful for registration tests.
 */
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `testuser_${timestamp}@example.com`;
}

/**
 * Generate a random string of given length.
 */
export function generateRandomString(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Take a named screenshot — saves to test-results folder.
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({
    path: `test-results/screenshots/${name}-${Date.now()}.png`,
    fullPage: true,
  });
}

/**
 * Scroll to bottom of page — useful for lazy-loaded content.
 */
export async function scrollToBottom(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

/**
 * Format a date to YYYY-MM-DD string.
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}