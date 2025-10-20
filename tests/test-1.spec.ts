import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).first()).toBeVisible();
  await expect(page.locator('#recommended-item-carousel').getByRole('img', { name: 'ecommerce website products' }).nth(2)).toBeVisible();
  await expect(page.locator('#footer')).toBeVisible();
});