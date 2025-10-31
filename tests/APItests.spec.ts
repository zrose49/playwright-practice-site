import {test, expect} from '@playwright/test'

type productListResponse = {
    responseCode: number,
    products: {
        id: number,
        name: string,
        price: string,
        brand: string,
        category: {
            usertype:{usertype:string},
            category: string
        }
    }[]
}

test('API test Get All Products List', async ({request}) => {
let response = await request.get("https://automationexercise.com/api/productsList");
expect(response).toBeOK();
expect(response.status()).toBe(200);
let data: productListResponse = await response.json();
//console.log(data);

expect(data.responseCode).toBe(200);
console.log(data.products[0]);


});