import {test,expect} from "@playwright/test";
import {pageurls} from "../../testdata/urls";
import {pageTitles} from "../../testdata/pagetitles"
import { homePageSelectors } from "../../Selectors/Home-page";

test('Verify products page shows correct elements', {tag:["@smoke","@TestCase8"]}, async({page}) => {
    await page.goto(pageurls.homePageURL);
    await page.locator(homePageSelectors.productsPageLink).click();
    await expect(page).toHaveURL(pageurls.productsURL);
    await expect(page).toHaveTitle(pageTitles.productsPageTitle);
});