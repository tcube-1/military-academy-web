import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');

  console.log('TITLE:', await page.title());
  console.log('TITLE TAG:', await page.locator('title').count());
});
