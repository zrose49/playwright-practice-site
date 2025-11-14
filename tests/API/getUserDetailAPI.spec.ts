import {test,expect} from "@playwright/test";
import { apiEndpoints } from "../../testdata/urls";
import { incorrectUserInfo, userInfo } from "../../testdata/userdata";
import { registerUser } from "../../user-actions/registeruser";
import { getUserAccountAPIErrors } from "../../testdata/error-messages";

type UserAccountInfoResponse = {
    responseCode: number,
    message?: string,
    user: {
        id: number,
        name: string,
        email: string,
        title?: string,
        birth_day?: string,
        birth_month?: string,
        birth_year?: string,
        first_name: string,
        last_name: string,
        company?: string,
        address1: string,
        address2?: string,
        country: string,
        state: string,
        city: string,
        zipcode: string
    }
}

test.beforeEach('Create user to use for each test', async({page}) => {
    await registerUser(page);
});

test('Verify user account info is returned correctly wth getUserAccountInfo API', {tag:"@getUserAPI"}, async({request}) => {
        const response = await request.get(apiEndpoints.getUserDetail, {
            params: {
                email: userInfo.email
            }
        });

        expect(response.status()).toBe(200);

        const responseBody:UserAccountInfoResponse = await response.json();
        console.log(responseBody);

        
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.user.id).toBeTruthy();
        expect(responseBody.user.name).toBe(userInfo.username);
        expect(responseBody.user.email).toBe(userInfo.email);
        expect(responseBody.user.first_name).toBe(userInfo.firstName);
        expect(responseBody.user.last_name).toBe(userInfo.lastName);
        expect(responseBody.user.address1).toBe(userInfo.address1);
        expect(responseBody.user.state).toBe(userInfo.state);
        expect(responseBody.user.city).toBe(userInfo.city);
        expect(responseBody.user.zipcode).toBe(userInfo.zipcode);
        expect(responseBody.user.title).toBeFalsy();
        expect(responseBody.user.company).toBeFalsy();
        expect(responseBody.user.address2).toBeFalsy();

    });

    test('Verify User not found message appears when given non-existent email', async({request}) => {
            const response = await request.get(apiEndpoints.getUserDetail, {
                params: {
                    email: incorrectUserInfo.email
                }
            });

            expect(response.status).toBe(200);
            
            const responseBody:UserAccountInfoResponse = await response.json();
            expect(responseBody.responseCode).toBe(404);
            expect(responseBody.message).toBe(getUserAccountAPIErrors.accountNotFoundMessage);
            
    });