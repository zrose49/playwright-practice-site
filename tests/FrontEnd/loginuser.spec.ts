import { test,expect } from "playwright/test";
import { incorrectUserInfo, userInfo } from "../../testdata/userdata";
import { registerUser } from "../../user-actions/registeruser";
import { logoutUser } from "../../user-actions/logoutuser";
import { loginAccountSelectors } from "../../Selectors/Login-page";
import { homePageSelectors } from "../../Selectors/Home-page";
import { pageurls } from "../../testdata/urls";
import { pageTitles } from "../../testdata/pagetitles";
import { loginPageErrorMessages } from "../../testdata/error-messages";
import { homepageScreenshots } from "../../testdata/file-data";
import { headerText } from "../../testdata/page-text";

test.describe('Login Tests', {tag:["@smoke","@LoginTests"]}, async() => {

    test.beforeEach('Block google ads', async({context}) => {
        await context.route('**/*', route => {
     const url = route.request().url();
    if (url.startsWith('https://googleads.') || url.includes('.doubleclick.net/')) {
      route.abort();
    } else {
      route.continue();
    }
  });
    });


test('Login with user with correct email and password',{tag:["@test2","@smoke"]}, async({page}) => {
await registerUser(page);
const email = userInfo.email;
const password = userInfo.password;

//Now logout so you can test the login
await logoutUser(page);
await expect(page).toHaveURL(pageurls.loginPageURL);

const loginAccountTitle = page.locator("#form > div > div > div.col-sm-4.col-sm-offset-1 > div > h2");
await expect(loginAccountTitle).toHaveText(loginAccountSelectors.loginAccountTitleText);

const emailInput = page.getByTestId("login-email");
const getEmailPlaceholderText = await emailInput.getAttribute('placeholder');
expect(getEmailPlaceholderText).toBe(loginAccountSelectors.emailPlaceholderText);

const passwordInput = page.getByTestId('login-password');
const passwordPlaceholderText = await passwordInput.getAttribute('placeholder');
expect(passwordPlaceholderText).toBe('Password');

await emailInput.fill(email);
await passwordInput.fill(password);
await page.getByTestId(loginAccountSelectors.loginButton).click();

//Verify user is on homepage and Logout and Delete Account buttons are now visible
await expect(page.locator(homePageSelectors.logoutButton)).toBeVisible();
await expect(page.locator(homePageSelectors.deleteAccountButton)).toBeVisible();

});

test('Login with non-existent email and password', {tag:"@test3"}, async ({page}) => {
    //Go to homepage
    await page.goto(pageurls.homePageURL);
    await expect(page).toHaveTitle(pageTitles.homePageTitle);

    //Click on Login button
    await page.locator(homePageSelectors.signUpLoginButton).click();
    await expect(page).toHaveTitle(pageTitles.loginPageTitle);

    //Fill in email and password with non-existent email
    await page.getByTestId(loginAccountSelectors.emailLoginField).fill(incorrectUserInfo.email);
    await page.getByTestId(loginAccountSelectors.passwordLoginField).fill(incorrectUserInfo.password);

    //Click Login button
    await page.getByTestId(loginAccountSelectors.loginButton).click();
    await expect(page.locator(loginAccountSelectors.emailPasswordErrorMessage)).toBeVisible();
    await expect(page.locator(loginAccountSelectors.emailPasswordErrorMessage)).toHaveText(loginPageErrorMessages.incorrectEmailorPasswordMessage);

});

test('Verify user logout flow', {tag:"@test4"}, async({page}) => {
    //First register a user to use
    await registerUser(page);

    const userName = userInfo.username;
    expect(page).toHaveTitle(pageTitles.homePageTitle);
    expect(page).toHaveScreenshot(homepageScreenshots.homepage,{maxDiffPixelRatio:.2});
    expect(await page.locator(homePageSelectors.loggedInAsText).innerText()).toContain(headerText.loggedInAsText);
    
    //Verify Logged in Icon is correct
    //page.locator("//i[@class='fa fa-user']").screenshot({path:'./testdata/screenshots/loggedInIcon.png'});
    await expect(page.locator(homePageSelectors.loggedInIcon)).toHaveScreenshot(homepageScreenshots.loggedInIcon,{maxDiffPixelRatio:.2});

    //Verify Logged Out icon and text
    expect((await page.locator("//li[contains(.,'Logout')]").innerText()).trim()).toBe("Logout");
    //await page.locator("//i[@class='fa fa-lock']").screenshot({path:'./testdata/screenshots/loginuser.spec.ts/logoutIcon.png'});
    await expect(page.locator("//i[@class='fa fa-lock']")).toHaveScreenshot("logoutIcon.png",{maxDiffPixelRatio:.3});

    await page.locator("//a[normalize-space(text())='Logout']").click();
    await expect(page).toHaveTitle(pageTitles.loginPageTitle);
});

});