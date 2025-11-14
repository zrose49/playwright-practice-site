import { Page } from "playwright";
import { userInfo, countryDropDownOptions } from "../testdata/userdata";
import { signupPageSelectors } from "../Selectors/Signup-page";
import { pageurls } from "../testdata/urls";
import { accountCreatedSelectors } from "../Selectors/AccountCreated-page";

const password = userInfo.password;
const name = userInfo.username;
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
    await page.getByTestId(signupPageSelectors.password).fill(password);
    await page.getByTestId(signupPageSelectors.firstName).fill(firstName);
    await page.getByTestId(signupPageSelectors.lastName).fill(lastName);
    await page.getByTestId(signupPageSelectors.address).fill(address);
    await page.getByTestId(signupPageSelectors.country).selectOption(countryDropDownOptions[0]);
    await page.getByTestId(signupPageSelectors.state).fill(state);
    await page.getByTestId(signupPageSelectors.city).fill(city);
    await page.getByTestId(signupPageSelectors.zipcode).fill(zipcode);
    await page.getByTestId(signupPageSelectors.mobileNumber).fill(mobileNumber);

    //Click Create Account button
    await page.getByTestId(signupPageSelectors.createAccount).click();

    //Click Continue button
    await page.getByTestId(accountCreatedSelectors.continueButton).click();
    

};