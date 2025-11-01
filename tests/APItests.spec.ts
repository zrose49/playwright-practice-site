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

const actualProductCount = 34;

test.describe('GetAllProductsList API tests',{tag:'@productlistapi'}, () =>{

test('Verify 1st product in response has correct data',{tag: '@api'}, async ({request}) => {
let response = await request.get("https://automationexercise.com/api/productsList");
expect(response).toBeOK();
expect(response.status()).toBe(200);
let data: productListResponse = await response.json();
//console.log(data);

expect(data.responseCode).toBe(200);
console.log(data.products[0]);
expect(data.products[0].id).toBe(1);
expect(data.products[0].name).toBe("Blue Top");
expect(data.products[0].price).toBe("Rs. 500");
expect(data.products[0].brand).toBe("Polo");
expect(data.products[0].category.usertype.usertype).toBe("Women");
expect(data.products[0].category.category).toBe("Tops");

});

test('Check number of products returned is correct',{tag:'@api'}, async({request}) =>{
const response = await request.get("https://automationexercise.com/api/productsList");
await expect(response).toBeOK();

const data:productListResponse = await response.json();
expect(data.responseCode).toBe(200);

let productCount = 0;
for(const obj of data.products){
expect(obj.brand).toBeTruthy();
expect(obj.category).toBeTruthy();
expect(obj.id).toBeTruthy();
expect(obj.name).toBeTruthy();
expect(obj.price).toBeTruthy();    
productCount++;
}
expect(productCount).toBeGreaterThanOrEqual(actualProductCount);
});

});