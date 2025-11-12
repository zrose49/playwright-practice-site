import {test, expect} from '@playwright/test';
import { countryDropDownOptions, userInfo } from '../testdata/userdata';
import { pageurls } from '../testdata/urls';
import { loginPageText, menuOptionsText} from '../testdata/page-text'
import { registerUser } from '../user-actions/registeruser';
import { signUpUserSelectors } from '../Selectors/Login-page';
import { logoutUser } from '../user-actions/logoutuser';


test ('Test Case 1: Verify entire Register User flow',{tag:["@test1","@regression"]}, async ({page}) => {
    
    //Land on Homepage and verify expected sections and images exist
    await page.goto('https://www.automationexercise.com/');
    await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).first()).toBeVisible();
    await expect(page.getByRole('img', { name: 'ecommerce website products' }).nth(2)).toBeVisible();
    await expect(page.locator('#footer')).toBeVisible();

    //Click on Sign up/login button
    await page.getByText(" Signup / Login").click();

    //Verify Sign up page was landed on
    await expect(page).toHaveURL("https://www.automationexercise.com/login");
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

    //Verify different sections of the sign up page are visible and show correct data
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
    await signupNameBox.fill(userInfo.username);
    await expect(signupNameBox).toHaveValue(userInfo.username);

    const signupEmailBox = page.getByTestId("signup-email");
    await signupEmailBox.fill(userInfo.email);

    const signUpButton = page.getByTestId("signup-button");
    await signUpButton.click();

    //Verify Sign up page
    await expect(page).toHaveURL("https://www.automationexercise.com/signup");
    await expect(page).toHaveTitle("Automation Exercise - Signup");

    //Verify top text
    await expect(page.locator("//h2[contains(.,'Enter Account Information')]")).toHaveText("Enter Account Information");
    
    //Verify Title radio button
    const titleButtonMr = page.locator("#id_gender1");
    await titleButtonMr.click();
    await expect(titleButtonMr).toBeEnabled();

    //Verify user info was pre filled and password was filled
    const nameField = page.getByTestId("name");
    await expect(nameField).toHaveValue(userInfo.username);

    const emailField = page.getByTestId("email");
    await expect(emailField).toHaveValue(userInfo.email);

    const passwordField = page.getByTestId("password");
    await passwordField.fill(userInfo.password);
    await expect(passwordField).toHaveValue(userInfo.password);

    //Check sign up for newsletter and special offer checkboxes
    const newsLetterCheckbox = page.locator("#newsletter");
    await newsLetterCheckbox.check();
    await expect(newsLetterCheckbox).toBeChecked();

    const specialOfferCheckbox = page.locator("#optin");
    await specialOfferCheckbox.check();
    await expect(specialOfferCheckbox).toBeChecked();

    //Verify Address Information title text
    const addressInfoText = page.locator("//b[normalize-space(text())='Address Information']");
    await expect(addressInfoText).toHaveText("Address Information");

    //Fill in Address Information
    const firstNameField = page.getByTestId("first_name");
    await firstNameField.fill(userInfo.firstName);
    await expect(firstNameField).toHaveValue(userInfo.firstName);

    const lastNameField = page.getByTestId("last_name");
    await lastNameField.fill(userInfo.lastName);
    await expect(lastNameField).toHaveValue(userInfo.lastName);

    const companyField = page.getByTestId("company");
    await companyField.fill(userInfo.company);
    await expect(companyField).toHaveValue(userInfo.company);

    const addressField = page.getByTestId("address");
    await addressField.fill(userInfo.address1);
    await expect(addressField).toHaveValue(userInfo.address1);

    const addressField2 = page.getByTestId("address2");
    await addressField2.fill(userInfo.address2);
    await expect(addressField2).toHaveValue(userInfo.address2);

    const countryDropDown = page.getByTestId("country");
    
    const countryDropDownValues = await page.locator('#country > option').all();
    const countryArray = [];
    for(const value of countryDropDownValues) {
       let countryText = await value.innerText();
       countryArray.push(countryText);
    }

    //Alternate way to get dropdown values
    /* const countryDropDownValues = await page.$$('#country > option');
    const countryArray = [];
    for (const option of countryDropDownValues) {
        let text = await option.textContent();
        countryArray.push(text);
    } */
    
    expect(countryArray).toEqual(countryDropDownOptions);

    await countryDropDown.selectOption("Australia");
    await expect(countryDropDown).toHaveValue("Australia");

    await countryDropDown.selectOption("United States");
    await expect(countryDropDown).toHaveValue("United States");

    const stateTextField = page.getByTestId("state");
    await stateTextField.fill(userInfo.state);
    await expect(stateTextField).toHaveValue(userInfo.state);

    const cityTextField = page.getByTestId("city");
    await cityTextField.fill(userInfo.city);
    await expect(cityTextField).toHaveValue(userInfo.city);

    const zipcodeTextField = page.getByTestId("zipcode");
    await zipcodeTextField.fill(userInfo.zipcode);
    await expect(zipcodeTextField).toHaveValue(userInfo.zipcode);

    const mobileNumberTextField = page.getByTestId("mobile_number");
    await mobileNumberTextField.fill(userInfo.mobileNumber);
    await expect(mobileNumberTextField).toHaveValue(userInfo.mobileNumber);

    const createAccountButton = page.getByTestId("create-account");
    await createAccountButton.click();
    await expect(page).toHaveURL("https://www.automationexercise.com/account_created");
    await expect(page.getByTestId("account-created")).toHaveText("Account Created!");
    await expect(page.locator("#form > div > div > div > p:nth-child(2)")).toHaveText("Congratulations! Your new account has been successfully created!");
    await expect(page.locator("#form > div > div > div > p:nth-child(3)")).toHaveText("You can now take advantage of member privileges to enhance your online shopping experience with us.");
    
    const continueButton = page.getByTestId("continue-button");
    await continueButton.click();
    await expect(page).toHaveURL("https://www.automationexercise.com/");

    const topNavButtons = await page.locator(`#header > div > div > div > div.col-sm-8 > div > ul`).locator("li").all();
    let menuTextArray: string[] = [];
    for(const button of topNavButtons) {
        let text = (await button.innerText()).trim();
        menuTextArray.push(text);
    }
   
    expect(menuTextArray).toEqual(menuOptionsText);
    
    const loggedInText = page.locator('#header > div > div > div > div.col-sm-8 > div > ul > li:nth-child(10) > a');
    await expect(loggedInText).toContainText(`Logged in as ${userInfo.username}`);

});

test('Test Case 5: Register user with existing email, verify error message', {tag:["@test5","@smoke"]}, async({page}) => {
  //First register a new user to use
  await registerUser(page);
  const name = userInfo.firstName + userInfo.lastName;
  const email = userInfo.email;
  await logoutUser(page);

  //Try to register with the newly created user/email
  await page.goto(pageurls.loginPageURL);
  await page.getByTestId(signUpUserSelectors.nameTextField).fill(name);
  await page.getByTestId(signUpUserSelectors.emailTextField).fill(email);
  await page.getByTestId(signUpUserSelectors.signUpbutton).click();

  expect(page.locator(signUpUserSelectors.existingEmailErrorMessage)).toHaveText(loginPageText.existingEmailErrorMessage);
});