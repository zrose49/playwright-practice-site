import { Page,webkit } from "playwright";
import { userInfo, countryDropDownOptions } from "../testdata/userdata";
import { signupPageLocators } from "../Locators/Signup-page";
import { pageurls } from "../testdata/urls";
import { accountCreatedLocators } from "../Locators/AccountCreated-page";

const password = userInfo.password;
const name = userInfo.firstName + userInfo.lastName;
const email = userInfo.email;
const firstName = userInfo.firstName;
const lastName = userInfo.lastName;
const address = userInfo.address1;
const state = userInfo.state;
const city = userInfo.city;
const zipcode = userInfo.zipcode;
const mobileNumber = userInfo.mobileNumber;

export async function registerUser(page:Page) {
    await page.goto(pageurls.loginPageURL);
    const nameSignupField = page.getByTestId("signup-name");
    await nameSignupField.fill(name);
    const emailEntryField = page.getByTestId("signup-email");
    await emailEntryField.fill(email);
    await page.getByTestId('signup-button').click();

    //Fill in User info on Register page
    await page.getByTestId(signupPageLocators.password).fill(password);
    await page.getByTestId(signupPageLocators.firstName).fill(firstName);
    await page.getByTestId(signupPageLocators.lastName).fill(lastName);
    await page.getByTestId(signupPageLocators.address).fill(address);
    await page.getByTestId(signupPageLocators.country).selectOption(countryDropDownOptions[0]);
    await page.getByTestId(signupPageLocators.state).fill(state);
    await page.getByTestId(signupPageLocators.city).fill(city);
    await page.getByTestId(signupPageLocators.zipcode).fill(zipcode);
    await page.getByTestId(signupPageLocators.mobileNumber).fill(mobileNumber);

    //Click Create Account button
    await page.getByTestId(signupPageLocators.createAccount).click();

    //Click Continue button
    await page.getByTestId(accountCreatedLocators.continueButton).click();
    

};