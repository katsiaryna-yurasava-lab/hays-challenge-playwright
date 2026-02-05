import { test, expect } from '@playwright/test';

test('create user', async ({ page }) => {
  await page.goto('https://automationexercise.com/login ');

  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/);
});

