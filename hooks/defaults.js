export const initialSignup = {
    "email": {
        fieldName: "E-mail",
        validation: "required|email",
        value: "",
    },
    "password": {
        fieldName: "Password",
        validation: 'required|password',
        value: "",
    },
    "confirmPass": {
        fieldName: "Confirm Password",
        validation: "required|equalTo(password)",
        value: "",
    },
    returnToast: false,
    isLoading: false,
}