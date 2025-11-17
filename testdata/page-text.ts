import { contactUsInfo, incorrectUserInfo, userInfo } from "./userdata";

export const headerText = {
    loggedInAsText: `Logged in as ${userInfo.username}`
}

export const menuOptionsText = ["Home"," Products","Cart","Logout","Delete Account","Test Cases","API Testing","Video Tutorials","Contact us",`Logged in as ${userInfo.username}`]

export const loginPageText = {
    existingEmailErrorMessage: 'Email Address already exist!'
}

export const contactUsPageText = {
    contactUsTopTitleText: "Contact Us",
    contactUsNoteText: "Note: Below contact form is for testing purpose.",
    getInTouchText: "Get In Touch",
    namePlaceholderText: "Name",
    emailPlaceholderText: "Email",
    subjectPlaceholderText: "Subject",
    yourMessageHerePlaceholderText: "Your Message Here",
    submitButtonText: "Submit",
    feedBackTitleText: "Feedback For Us",
    feedbackParagraph: "We really appreciate your response to our website. Kindly share your feedback with us at feedback@automationexercise.com. If you have any suggestion areas or improvements, do let us know. We will definitely work on it. Thank you",
    successMessageText: "Success! Your details have been submitted successfully."
}

export const contactUsPageAlert = {
    dialogType: "confirm",
    dialogText: "Press OK to proceed!"
}

export const contactUsTooltipText = {
    emailFieldRequiredText: "Please fill out this field.",
    symbolRequiredText: `Please include an '@' in the email address. '${incorrectUserInfo.emailMissingSymbol}' is missing an '@'.`,
    formatIncorrectText: `Please enter a part following '@'. '${incorrectUserInfo.incorrectEmailformat}' is incomplete.`

}

export const productPageText = {
    currencyText: "Rs.",
    addToCartText: "Add to cart",
    viewProductText: "View Product"
}