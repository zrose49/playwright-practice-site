import {test,expect, Locator} from "@playwright/test";
import {pageurls} from "../../testdata/urls";
import {pageTitles} from "../../testdata/pagetitles"
import { homePageSelectors } from "../../Selectors/Home-page";
import { productsPageSelectors } from "../../Selectors/Products-page";
import { productData } from "../../testdata/product-data";
import { countProducts, verifyProductText, verifyProductVisibility } from "../../helpers/pagehelpers";

test('Verify products page shows correct elements', {tag:["@smoke","@TestCase8"]}, async({page}) => {
    await page.goto(pageurls.homePageURL);
    await page.locator(homePageSelectors.productsPageLink).click();
    await expect(page).toHaveURL(pageurls.productsURL);
    await expect(page).toHaveTitle(pageTitles.productsPageTitle);

    const featuredItems:Locator[] = await page.locator(productsPageSelectors.featuredItemDiv).all();
    const count = await countProducts(featuredItems);
    for(let item of featuredItems){
        await expect(item).toBeVisible();
        //await expect(item).toBeInViewport();
        console.log(await item.allInnerTexts());
    }
    
    expect(count).toBe(productData.productCount);
    await verifyProductVisibility(featuredItems);
    await verifyProductText(featuredItems);

});