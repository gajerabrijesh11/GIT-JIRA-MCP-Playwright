import { test, expect } from '@playwright/test';

test('Mission Automation Demo - First Test', async ({ page }) => {
  
  // Step 1: Open Google
  await page.goto('https://www.google.com');
  
  // Step 2: Check the title contains "Google"
  await expect(page).toHaveTitle(/Google/);
  
  // Step 3: Type in the search box
  await page.locator('textarea[name="q"]').fill('Playwright MCP automation');
  
  // Step 4: Press Enter
  await page.keyboard.press('Enter');
  
  // Step 5: Wait for results and check URL changed
  await page.waitForURL('**/search**');
  await expect(page).toHaveURL(/search/);
  
  console.log('✅ Mission Automation Demo - First test PASSED!');
});