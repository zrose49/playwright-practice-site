import {test, expect} from '@playwright/test'

test ('Test Case 1: Register User', async ({page}) => {

    //Land on Homepage and verify expected sections and images exist
    await page.goto('https://www.automationexercise.com/');
    await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).first()).toBeVisible();
    await expect(page.locator('#recommended-item-carousel').getByRole('img', { name: 'ecommerce website products' }).nth(2)).toBeVisible();
    await expect(page.locator('#footer')).toBeVisible();

    //Click on Sign up/login button
    await page.locator("//*[@id='header']/div/div/div/div[2]/div/ul/li[4]/a").click();
    //Verify Sign up page was landed on
    await expect(page).toHaveURL("https://www.automationexercise.com/login");
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
    //Verify different sections of the page are visible and show correct data
    await expect(page.locator("div.login-form")).toBeVisible();
    await expect(page.getByTestId("login-email")).toBeVisible();
    await expect(page.getByTestId("login-email")).toHaveAttribute('placeholder','Email Address');
    await expect(page.getByTestId("login-password")).toBeVisible();
    await expect(page.getByTestId("login-password")).toHaveAttribute('placeholder','Password');

    //Verify Sign up section
    await expect(page.locator("//div[@class='signup-form']//h2[1]")).toHaveText("New User Signup!");
    await expect(page.getByTestId("signup-name")).toBeVisible();
    await expect(page.getByTestId("signup-name")).toHaveAttribute('placeholder','Name');
    await expect(page.getByTestId("signup-email")).toBeVisible();
    await expect(page.getByTestId("signup-email")).toHaveAttribute('placeholder','Email Address');

    //Fill Sign up forms
    const signupNameBox = page.getByTestId("signup-name");
    signupNameBox.pressSequentially("Zunit");
});