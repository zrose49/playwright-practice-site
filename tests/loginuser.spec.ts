import { test,expect } from "playwright/test";
import { userInfo } from "../testdata/userdata";
import { registerUser } from "../user-actions/registeruser";
import { logoutUser } from "../user-actions/logoutuser";
import { loginPageLocators } from "../Locators/Login-page";
import { homePageLocators } from "../Locators/Home-page";
import { pageurls } from "../testdata/urls";

test('Login with user with correct email and password',{tag:"@test2"}, async({page}) => {
//First Register a user and get the username and password
await registerUser(page);
const email = userInfo.email;
const password = userInfo.password;

//Now logout so you can test the login
await logoutUser(page);
await expect(page).toHaveURL(pageurls.loginPageURL);

const loginAccountTitle = page.locator("#form > div > div > div.col-sm-4.col-sm-offset-1 > div > h2");
await expect(loginAccountTitle).toHaveText(loginPageLocators.loginAccountTitleText);

const emailInput = page.getByTestId("login-email");
const getEmailPlaceholderText = await emailInput.getAttribute('placeholder');
expect(getEmailPlaceholderText).toBe(loginPageLocators.emailPlaceholderText);

const passwordInput = page.getByTestId('login-password');
const passwordPlaceholderText = await passwordInput.getAttribute('placeholder');
expect(passwordPlaceholderText).toBe('Password');

await emailInput.fill(email);
await passwordInput.fill(password);
await page.getByTestId(loginPageLocators.loginButton).click();

//Verify user is on homepage and Logout and Delete Account buttons are now visible
await expect(page.locator(homePageLocators.logoutButton)).toBeVisible();
await expect(page.locator(homePageLocators.deleteAccountButton)).toBeVisible();

});
