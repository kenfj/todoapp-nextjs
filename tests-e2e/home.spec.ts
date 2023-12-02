import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle("My Page Title");
  await expect(page.getByRole("heading").first()).toHaveText(/Todo App/);
});

test('Todos link', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Todos' }).click();

  await expect(page.getByRole('button', { name: 'Add Todo' })).toBeVisible();
});
