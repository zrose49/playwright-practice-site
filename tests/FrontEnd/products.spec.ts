import {test,expect} from "@playwright/test";
import {pageurls} from "../../testdata/urls";
import {pageTitles} from "../../testdata/pagetitles"
import { homePageSelectors } from "../../Selectors/Home-page";
import { productsPageSelectors } from "../../Selectors/Products-page";
import { productData } from "../../testdata/product-data";

test('Verify products page shows correct elements', {tag:["@smoke","@TestCase8"]}, async({page}) => {
    await page.goto(pageurls.homePageURL);
    await page.locator(homePageSelectors.productsPageLink).click();
    await expect(page).toHaveURL(pageurls.productsURL);
    await expect(page).toHaveTitle(pageTitles.productsPageTitle);

    let featuredItems = await page.locator(productsPageSelectors.featuredItemDiv).all();
    let count = 0;
    for(let item of featuredItems){
        await expect(item).toBeVisible();
        await expect(item).toBeInViewport();
        console.log(await item.allInnerTexts());
        count++;
    }
    
    expect(count).toBeGreaterThanOrEqual(productData.productCount);

});