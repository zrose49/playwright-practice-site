import {test, expect} from "@playwright/test";
import {pageurls}  from "../testdata/urls";
import { pageTitles } from "../testdata/pagetitles";
import { headerSelectors } from "../Selectors/Header";
import { contactUsPageSelectors } from "../Selectors/Contact-Us-page";
import { contactUsPageText } from "../testdata/page-text";

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

    await page.locator(contactUsPageSelectors.fileUpload).click();
    
});