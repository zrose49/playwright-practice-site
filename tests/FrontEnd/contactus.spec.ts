import {test, expect} from "@playwright/test";
import {pageurls}  from "../../testdata/urls";
import { pageTitles } from "../../testdata/pagetitles";
import { headerSelectors } from "../../Selectors/Header";
import { contactUsPageSelectors } from "../../Selectors/Contact-Us-page";
import { contactUsPageAlert, contactUsPageText, contactUsTooltipText } from "../../testdata/page-text";
import { uploadFiles } from "../../testdata/file-data";
import { fileUpload, getTooltipMessage } from "../../helpers/pagehelpers";
import { contactUsInfo, incorrectUserInfo, userInfo } from "../../testdata/userdata";

test.describe('Contact Us tests', {tag:"@ContactUsPage"}, () => {

test('Verify Contact form page elements', {tag:["@test6","@smoke","@desktop"]}, async({page}) => { 
    await page.goto(pageurls.contactUsURL);
    await expect(page).toHaveTitle(pageTitles.contactUsTitle);

    await expect(page).toHaveScreenshot("contactus.png",{maxDiffPixelRatio:.1});

    //Verify 'Contact Us' text in header is orange while on the contact us page
    await expect(page.locator(headerSelectors.contactUsText)).toHaveCSS('color','rgb(255, 165, 0)');
    //Verify 'Contact Us' icon is orange
    await expect(page.locator(headerSelectors.contactUsImage)).toHaveScreenshot('contactusactive.png',{maxDiffPixelRatio:.1});

    //Verify text and titles are correct on page
    await expect(page.locator(contactUsPageSelectors.contactTopTitle)).toHaveText(contactUsPageText.contactUsTopTitleText);
    await expect(page.locator(contactUsPageSelectors.contactNote)).toContainText(contactUsPageText.contactUsNoteText);
    await expect(page.locator(contactUsPageSelectors.getInTouchTitle)).toHaveText(contactUsPageText.getInTouchText);
    
    await expect(page.getByTestId(contactUsPageSelectors.nameTextField)).toBeVisible();
    await expect(page.getByTestId(contactUsPageSelectors.nameTextField)).toHaveAttribute('placeholder',contactUsPageText.namePlaceholderText);

    await expect(page.getByTestId(contactUsPageSelectors.emailTextField)).toBeVisible();
    await expect(page.getByTestId(contactUsPageSelectors.emailTextField)).toHaveAttribute('placeholder',contactUsPageText.emailPlaceholderText);

    await expect(page.getByTestId(contactUsPageSelectors.subjectTextField)).toBeVisible();
    await expect(page.getByTestId(contactUsPageSelectors.subjectTextField)).toHaveAttribute('placeholder',contactUsPageText.subjectPlaceholderText);

    await expect(page.getByTestId(contactUsPageSelectors.messageField)).toBeVisible();
    await expect(page.getByTestId(contactUsPageSelectors.messageField)).toHaveAttribute('placeholder',contactUsPageText.yourMessageHerePlaceholderText);

    await expect(page.locator(contactUsPageSelectors.fileUpload)).toBeVisible();

    await expect(page.getByTestId(contactUsPageSelectors.submitButton)).toBeVisible();
    await expect(page.getByTestId(contactUsPageSelectors.submitButton)).toHaveText(contactUsPageText.submitButtonText);

    await expect(page.locator(contactUsPageSelectors.feedBackTitle)).toHaveText(contactUsPageText.feedBackTitleText);
    await expect(page.locator(contactUsPageSelectors.feedbackText)).toHaveText(contactUsPageText.feedbackParagraph);

});

test('File Upload test on Contact Us page', {tag:"@smoke"}, async({page}) => {
    await page.goto(pageurls.contactUsURL);

    const fileUploadButton = page.locator(contactUsPageSelectors.chooseFileButton);
    await fileUpload(uploadFiles.contactUploadFilePath,uploadFiles.file1Name,fileUploadButton);

    await expect(page).toHaveScreenshot('uploadTest1.png',{maxDiffPixelRatio:.1});

});

test('Fill out all fields and submit the contact form', {tag:"@smoke"}, async({page}) => {
    await page.goto(pageurls.contactUsURL);
    
    await page.getByTestId(contactUsPageSelectors.nameTextField).fill(userInfo.username);
    await expect(page.getByTestId(contactUsPageSelectors.nameTextField)).toHaveValue(userInfo.username);

    await(page.getByTestId(contactUsPageSelectors.emailTextField)).fill(userInfo.email);
    await expect(page.getByTestId(contactUsPageSelectors.emailTextField)).toHaveValue(userInfo.email);

    await(page.getByTestId(contactUsPageSelectors.subjectTextField)).fill(contactUsInfo.subjectLine);
    await expect(page.getByTestId(contactUsPageSelectors.subjectTextField)).toHaveValue(contactUsInfo.subjectLine);

    await(page.getByTestId(contactUsPageSelectors.messageField)).fill(contactUsInfo.subjectMessage);
    await expect(page.getByTestId(contactUsPageSelectors.messageField)).toHaveValue(contactUsInfo.subjectMessage);

    const fileUploadButton = page.locator(contactUsPageSelectors.chooseFileButton);
    await fileUpload(uploadFiles.contactUploadFilePath,uploadFiles.file1Name,fileUploadButton);

    //handle alert before the submit button is clicked with this listener
    page.on('dialog', async (dialog) => {
        // Assert the type of dialog
        expect(dialog.type()).toBe(contactUsPageAlert.dialogType);
        // Assert the message of the alert
        expect(dialog.message()).toBe(contactUsPageAlert.dialogText);
        // Accept the alert to dismiss it
        await dialog.accept();
  });

    await page.getByTestId(contactUsPageSelectors.submitButton).click();

    //Verify contact us page after successfully submitting
    await expect(page).toHaveURL(pageurls.contactUsURL);
    await expect(page.locator(contactUsPageSelectors.successMessage)).toBeVisible();
    await expect(page.locator(contactUsPageSelectors.successMessage)).toHaveText(contactUsPageText.successMessageText);
    
    await page.locator(contactUsPageSelectors.homeButton).click();
    await expect(page).toHaveURL(pageurls.homePageURL);

});

test('Verify tooltip messages for required email field', async({page}) => {
    await page.goto(pageurls.contactUsURL);

    await expect(page.getByTestId(contactUsPageSelectors.emailTextField)).toHaveAttribute('required','required');
    
    const emailTextField = page.getByTestId(contactUsPageSelectors.emailTextField);

    // Trigger tooltip message for required email field
    await page.getByTestId(contactUsPageSelectors.submitButton).click();

    // Get the browser's native validation message
    let message = await getTooltipMessage(emailTextField);
    console.log(message);
    expect(message).toBe(contactUsTooltipText.emailFieldRequiredText);

    
    //Verify tooltip message with missing @ symbol in email
    await emailTextField.fill(incorrectUserInfo.emailMissingSymbol);
    await page.getByTestId(contactUsPageSelectors.submitButton).click();
    message = await getTooltipMessage(emailTextField);
    console.log(message);
    expect(message).toBe(contactUsTooltipText.symbolRequiredText);

    //Veriify tooltip message with incorrect email format
    await emailTextField.fill(incorrectUserInfo.incorrectEmailformat);
    await page.getByTestId(contactUsPageSelectors.submitButton).click();
    message = await getTooltipMessage(emailTextField);
    console.log(message);
    expect(message).toBe(contactUsTooltipText.formatIncorrectText);

});

});