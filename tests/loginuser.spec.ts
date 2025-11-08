import { test,expect } from "playwright/test";

const homepageURL = "https://www.automationexercise.com";
const homepageTitle = "Automation Exercise";
const loginURL = "https://www.automationexercise.com/login";
const loginAccountTitleText = "Login to your account";
const emailPlaceholderText = "Email Address";

test('Login with user with correct email and password',{tag:"@test2"}, async({page}) => {
await page.goto(homepageURL);
await expect(page).toHaveURL(homepageURL);
await expect(page).toHaveTitle(homepageTitle);

await expect(page).toHaveScreenshot('homepage.png', {maxDiffPixelRatio:.2});

//await page.getByText(" Signup / Login").click();
//await page.locator('#header > div > div > div > div.col-sm-8 > div > ul > li:nth-child(4) > a').click();
await page.locator("//a[normalize-space(text())='Signup / Login']").click();
await expect(page).toHaveURL(loginURL);

const loginAccountTitle = page.locator("#form > div > div > div.col-sm-4.col-sm-offset-1 > div > h2");
await expect(loginAccountTitle).toHaveText(loginAccountTitleText);

const emailInput = page.getByTestId("login-email");
const getEmailPlaceholderText = await emailInput.getAttribute('placeholder');
expect(getEmailPlaceholderText).toBe(emailPlaceholderText);

const passwordInput = page.getByTestId('login-password');
const passwordPlaceholderText = await passwordInput.getAttribute('placeholder');
expect(passwordPlaceholderText).toBe('Password');


});
