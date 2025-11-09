import { Page } from "playwright";
import { homePageLocators } from "../Locators/Home-page";

export async function logoutUser(page:Page) {
    await page.locator(homePageLocators.logoutButton).click();
}