import {test,expect, APIResponse} from "@playwright/test";
import { apiEndpoints } from "../../testdata/urls";
import { getAllbrandsListAPIData, getAllProductsListAPIData } from "../../testdata/apidata";
import { brandExists, countBrands } from "../../helpers/apihelpers";

type brandsListResponse = {
    responseCode: number,
    brands: {id: number, brand: string}[],
    message?: string
}

test.describe('getBrandsList APIs', {tag:"@getbrandsapitests"}, () => {
    let response: APIResponse;
    let data: brandsListResponse;

    test.beforeEach(async ({request}) => {
        response = await request.get(apiEndpoints.getAllbrandsList);
        expect(response.status()).toBe(200);
        data = await response.json();
    });

test('Verify getBrandsList returns the correct amount of brands', async() => {
    
    let brands = data.brands;
    let count = 0;
    for(let _brand of brands) {
        count++;
    }
    console.log(`Brand Count: ${count}`);
    expect(count).toBeGreaterThanOrEqual(getAllbrandsListAPIData.numberOfBrands);
});

test('Verify first and last product in getBrandsList API', async() => {
    
    
    // Verify first brand
    const firstBrand = data.brands[0].brand;
    const firstBrandID = data.brands[0].id;
    expect(firstBrandID).toBe(getAllbrandsListAPIData.firstBrandID);
    expect(firstBrand).toBe(getAllbrandsListAPIData.firstBrandName);

    //Verify last brand
    const lastBrand = data.brands[data.brands.length-1].brand;
    const lastBrandID = data.brands[data.brands.length-1].id;
    expect(lastBrand).toBe(getAllbrandsListAPIData.lastBrandName);
    expect(lastBrandID).toBe(getAllbrandsListAPIData.lastBrandID);
});

test('Verify number of specific brands in the getBrandsList is correct', async() => {
    let brands = data.brands;
    
    //Verify amount of Biba brands
    const bibaBrandCount = countBrands(getAllbrandsListAPIData.bibaBrandName,brands);
    expect(bibaBrandCount).toBe(getAllbrandsListAPIData.bibaBrandCount);

    //Verify number of H&M brands
    const HMBrandCount = countBrands(getAllbrandsListAPIData.hmBrandName,brands);
    expect(HMBrandCount).toBe(getAllbrandsListAPIData.hmBrandCount);

    //Verify number of Polo brands
    const poloBrandcount = countBrands(getAllbrandsListAPIData.poloBrandName,brands);
    expect(poloBrandcount).toBe(getAllbrandsListAPIData.poloBrandCount);

});

test('Verify each known brand exists in the getAllBrands response', async() => {
    let brands: brandsListResponse["brands"] = data.brands;
    let poloBrandExists = brandExists(getAllbrandsListAPIData.poloBrandName,brands);
    expect(poloBrandExists).toBe(true);
});


});
