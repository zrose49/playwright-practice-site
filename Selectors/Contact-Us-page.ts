export const contactUsPageSelectors = {
    contactTopTitle: "(//h2[@class='title text-center'])[1]",
    contactNote: "(//div[@class='contact-form']//div)[1]",
    getInTouchTitle: "//h2[normalize-space(text())='Get In Touch']",
    nameTextField: "name",
    emailTextField: "email",
    subjectTextField: "subject",
    messageField: "message",
    fileUpload: "//input[@type='file']",
    submitButton: "submit-button",
    feedBackTitle: "//h2[normalize-space(text())='Feedback For Us']",
    feedbackText: "address",
    chooseFileButton: "upload_file"
}