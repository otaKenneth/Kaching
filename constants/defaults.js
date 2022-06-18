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
    msg: "",
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
    msg: "",
    isLoading: false,
}

export const newUserData = {
    accounts: [],
    budgets: [],
    payees: [],
    payers: [],
    categories: [
        {
            "name": "Balance",
            "budgetPlanned": {
                "percentage": 0,
                "amount": 0
            },
            "consumed": "",
            "comment": "This is the remaining balance to be budgeted."
        },
        {
            "name": "Daily Living",
            "budgetPlanned": {
                "percentage": 30,
                "amount": 0
            },
            "consumed": "",
            "comment": "Food & drinks."
        },
        {
            "name": "Financial Savings",
            "budgetPlanned": {
                "percentage": 20,
                "amount": 0
            },
            "consumed": "",
            "comment": "Important. Must be trafered to your savings imediately."
        },
        {
            "name": "Dues/Subscription",
            "budgetPlanned": {
                "percentage": 20,
                "amount": 0
            },
            "consumed": "",
            "comment": "Bills."
        },
        {
            "name": "Leisure",
            "budgetPlanned": {
                "percentage": 10,
                "amount": 0
            },
            "consumed": "",
            "comment": "Any thing you want to buy."
        },
        {
            "name": "Family",
            "budgetPlanned": {
                "percentage": 15,
                "amount": 0
            },
            "consumed": "",
            "comment": "For a family member you support."
        },
        {
            "name": "Misc",
            "budgetPlanned": {
                "percentage": 5,
                "amount": 0
            },
            "consumed": "",
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

export const newAccount = ({
    id: 0,
    type: "Select",
    name: "",
    initialBalance: "",
    currentBalance: "",
    initialDate: new Date(),
    note: "",
    transfers: []
})

export const initialAccountForm = () => ({
    type: {
        fieldName: "Account Type",
        validation: "required|selection",
        value: "Select"
    },
    name: {
        fieldName: "Name",
        validation: "required",
        value: ""
    },
    initialBalance: {
        fieldName: "Initial Balance",
        validation: "required|number",
        value: ""
    },
    initialDate: {
        fieldName: "Initial Date",
        validation: "required",
        value: new Date()
    },
    note: {
        fieldName: "Note",
        validation: "",
        value: ""
    },
})

export const newBudget = ({
    "id": null,
    "name": "",
    "initialBalance": "",
    "currentBalance": 0,
    "remaningBalance": 0,
    "consumed": 0,
    "totalBudgeted": 0,
    "from": new Date(),
    "to": new Date(),
    "categories": [],
    "transactions": []
})

export const initialBudgetForm = () => ({
    "from": {
        fieldName: "Start Date",
        validation: "required",
        value: new Date()
    },
    "to": {
        fieldName: "End Date",
        validation: "required",
        value: new Date(),
    },
    "initialBalance": {
        fieldName: "Initial Balance",
        validation: "required|number",
        value: ""
    },
    "name": {
        fieldName: "Budget Name",
        validation: "required",
        value: ""
    }
})

export const initialSaving = {
    isLoading: false,
    returnToast: false,
    loadingMsg: "",
    msg: "",
}

export function processBudgetCategories(budget, categories) {
    const state = categories;
    Object.keys(categories).map(key => {
        const percentage = categories[key].budgetPlanned.percentage;
        const defaultAmount = budget * (percentage / 100);
        state[key].budgetPlanned.amount = defaultAmount;
    })
    return state;
}

export const newCategory = ({
    "name": "",
    "budgetPlanned": {
        "percentage": "",
        "amount": ""
    },
    "consumed": "",
    "comment": ""
})

export const initialCategoryForm = () => ({
    "name": {
        fieldName: "Category Name",
        validation: "required",
        value: ""
    },
    "budgetPlanned": {
        fieldName: "Budget Planned",
        validation: "required|number",
        type: "percentage",
        value: ""
    },
    "comment": {
        fieldName: "Comment",
        validation: "required",
        value: ""
    }
})
