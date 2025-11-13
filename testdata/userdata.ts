import { generateRandomString } from "../helpers/testdatageneration";

let randomString = generateRandomString(10);

export const userInfo = {
    username: `User${randomString}`,
    password: `Pass${randomString}`,
    email: `test${randomString}@test.com`,
    firstName: "Johnny",
    lastName: "Appleseed Jr.",
    company: "StoneRock Industries",
    address1: "1234 Rock Emerald Road",
    address2: "5678 Platinum Drive",
    state: "NY",
    city: "New York",
    zipcode: "10079",
    mobileNumber: "973-909-1234"
} as const;

export const incorrectUserInfo = {
    email: "baddata@test.com",
    password: "incorrectPass",
    emailMissingSymbol: "test.com",
    incorrectEmailformat: "test@"
}

export const countryDropDownOptions = ["India","United States","Canada","Australia","Israel","New Zealand","Singapore"];

export const contactUsInfo = {
    subjectLine: "This is a test header for the subject line",
    subjectMessage: "This is a test header for the subject line, This is a test header for the subject line, This is a test header for the subject line, This is a test header for the subject line.",
    
}