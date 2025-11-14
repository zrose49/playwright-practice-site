import {test,expect,request} from "playwright/test";
import { apiEndpoints } from "../../testdata/urls";

type SearchResponse = {
    responseCode: number,
    message?: string
}


test.describe('Search API Tests', {tag:["@APITests","@smoke","@searchAPI"]}, () => {

test('Verify Search API without search_product parameter throws error', async ({request}) => {
const response = await request.post(apiEndpoints.searchProducts);

expect(response.status()).toBe(200);
const data:SearchResponse = await response.json();
expect(data.responseCode).toBe(400);
expect(data.message).toBe("Bad request, search_product parameter is missing in POST request.");
console.log(data);

});



});