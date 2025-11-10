import { Page } from "playwright";
import { homePageSelectors } from "../Selectors/Home-page";

export async function logoutUser(page:Page) {
    await page.locator(homePageSelectors.logoutButton).click();
}