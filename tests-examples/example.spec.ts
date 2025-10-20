import { test, expect } from '@playwright/test';
import { request } from 'http';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.describe('API testomat requests', () => {
    const USER = {
        email: "jolir86609@ikanid.com",
        pwd: "password",
        token: "",
        prj_token: ""
    }
    const PRJ = "second-project-cd17c";

    test('API Post Request', async ({request}) => {
        const res = await request.post('https://app.testomat.io/api/login',{
            data:{
                "email": USER.email,
                "password": USER.pwd
            }
        });
        expect(res.status()).not.toBe(200);
        const body = await res.json();
        USER.token = body.jwt;
        console.log("TOKEN", USER.token);
    });

});