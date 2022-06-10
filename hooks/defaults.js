import { Timestamp } from "firebase/firestore";

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

export const initialLogin = {
    "email": {
        fieldName: "E-mail",
        validation: "required|email",
        value: "",
    },
    "passworrd": {
        fieldName: "Password",
        validation: 'required|password',
        value: ""
    },
    returnToast: false,
    isLoading: false,
}

export const newUserData = {
    accounts: [],
    budgets: [],
    payees: [],
    payer: [],
    categories: [
        {
            "name": "Balance",
            "budgetPlanned": {
                "percentage": 0,
                "amount": 0
            },
            "comment": "This is the remaining balance to be budgeted."
        },
        {
            "name": "Daily Living",
            "budgetPlanned": {
                "percentage": 30,
                "amount": 0
            },
            "comment": "Food & drinks."
        },
        {
            "name": "Financial Savings",
            "budgetPlanned": {
                "percentage": 20,
                "amount": 0
            },
            "comment": "Important. Must be trafered to your savings imediately."
        },
        {
            "name": "Dues/Subscription",
            "budgetPlanned": {
                "percentage": 20,
                "amount": 0
            },
            "comment": "Bills."
        },
        {
            "name": "Leisure",
            "budgetPlanned": {
                "percentage": 10,
                "amount": 0
            },
            "comment": "Any thing you want to buy."
        },
        {
            "name": "Family",
            "budgetPlanned": {
                "percentage": 15,
                "amount": 0
            },
            "comment": "For a family member you support."
        },
        {
            "name": "Misc",
            "budgetPlanned": {
                "percentage": 5,
                "amount": 0
            },
            "comment": "Transportation fare and miscelenous fines."
        }
    ],
    transactions: [
        "Bus Fare", "Train Fare", "Jeep Fare",
        "Netflix", "Micrsoft Office", "Hulu", "HBO", "Disney+", "Movie", "Theatre",
        "Interbank Service Charge",
        "Electric Bill", "Water Bill"
    ],
    dateCreated: Timestamp.fromDate(new Date()),
};