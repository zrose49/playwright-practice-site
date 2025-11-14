import {test,expect, request} from "@playwright/test";
import { registerUser } from "../../user-actions/registeruser";
import { incorrectUserInfo, userInfo } from "../../testdata/userdata";
import { apiEndpoints } from "../../testdata/urls";
import { verifyLoginAPIErrors } from "../../testdata/error-messages";

type VerifyLoginResponse = {
    responseCode: number,
    message?: string
}

test.describe('Tests for login API', {tag:["@smoke","@loginAPI"]}, async () => {

    test.beforeEach('Create user', async ({page}) => {
        await registerUser(page);
    });

    test('Verify Login API with valid email and password', async({request}) => {
        const response = await request.post(apiEndpoints.searchProducts,
            {
                params: {
                    email: userInfo.email,
                    password: userInfo.password
                }
            }
        );
        expect(response.status()).toBe(200);
        const headers = response.headers();
        expect(headers.server).toBe('cloudflare');
        
        const data:VerifyLoginResponse = await response.json();
        expect(data.responseCode).toBe(400);
        expect(data.message).toBe(verifyLoginAPIErrors.missingParamsErrorMessage);
        
    });

    test('Verify DELETE method cannot be used on Verify Login API', async({request}) => {
        const response = await request.delete(apiEndpoints.searchProducts,
            {
                params: {
                    email: userInfo.email,
                    password: userInfo.password
                }
            }
        );
        expect(response.status()).toBe(200);
        
        const data:VerifyLoginResponse = await response.json();
        expect(data.responseCode).toBe(405);
        expect(data.message).toBe(verifyLoginAPIErrors.methodNotAllowedErrorMessage);
        
    });

    test('Verify User not found message with invalid email and password', async({request}) => {
        const response = await request.post(apiEndpoints.searchProducts,
            {
                params: {
                    email: incorrectUserInfo.email,
                    password: incorrectUserInfo.password
                }
            }
        );
        expect(response.status()).toBe(200);
        
        const data:VerifyLoginResponse = await response.json();
        expect(data.responseCode).toBe(404);
        expect(data.message).toBe(verifyLoginAPIErrors.userNotFoundErrorMessage);
        
    });
});