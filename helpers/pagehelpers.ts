import { Locator } from "playwright";
import { expect } from "playwright/test";
import { productPageText } from "../testdata/page-text";

export function rgbToHex(rgb:string) {
  // Extract RGB values from the string (e.g., "rgb(255, 0, 0)")
  const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!parts) return null; // Handle invalid RGB format

  // Convert each RGB component to a two-digit hexadecimal string
  const hex = (x:string) => ("0" + parseInt(x).toString(16)).slice(-2);

  // Combine them into a full hex code
  return "#" + hex(parts[1]) + hex(parts[2]) + hex(parts[3]);
}

export async function fileUpload(filepath:string,filename:string, locator:Locator) {
  const path = require('path');
  let uploadPath = path.join(filepath,filename);
  console.log(uploadPath);
  await locator.setInputFiles(uploadPath);
}

export async function getTooltipMessage(locator:Locator): Promise<string> {
  return await locator.evaluate((el:HTMLInputElement) => el.validationMessage);
}

export async function countProducts(products:Locator[]): Promise<number> {
  let count = 0;
  for(const product of products) {
    if(await product.innerText()) {
      count++;
    }
  }
  return count;
}

export async function verifyProductVisibility(products:Locator[]): Promise<void> {
  for(const product of products) {
    if(await product.innerText()) {
      await expect(product).toBeVisible();
    }
  }
}

export async function verifyProductText(products:Locator[]): Promise<void> {
  for(const product of products) {
    if(await product.innerText()) {
      await expect(product).toContainText(productPageText.currencyText);
      await expect(product).toContainText(productPageText.addToCartText);
      await expect(product).toContainText(productPageText.viewProductText);
    }
  }
}