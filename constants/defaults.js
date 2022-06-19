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
            id: 1,
            "name": "Balance",
            "budgetPlanned": {
                "percentage": 0,
                "amount": 0
            },
            "comment": "This is the remaining balance to be budgeted."
        },
        {
            id: 2,
            "name": "Daily Living",
            "budgetPlanned": {
                "percentage": 30,
                "amount": 0
            },
            "consumed": "",
            "comment": "Food & drinks."
        },
        {
            id: 3,
            "name": "Financial Savings",
            "budgetPlanned": {
                "percentage": 20,
                "amount": 0
            },
            "consumed": "",
            "comment": "Important. Must be trafered to your savings imediately."
        },
        {
            id: 4,
            "name": "Dues/Subscription",
            "budgetPlanned": {
                "percentage": 20,
                "amount": 0
            },
            "consumed": "",
            "comment": "Bills."
        },
        {
            id: 5,
            "name": "Leisure",
            "budgetPlanned": {
                "percentage": 10,
                "amount": 0
            },
            "consumed": "",
            "comment": "Any thing you want to buy."
        },
        {
            id: 6,
            "name": "Family",
            "budgetPlanned": {
                "percentage": 15,
                "amount": 0
            },
            "consumed": "",
            "comment": "For a family member you support."
        },
        {
            id: 7,
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

export const newCategory = () => {
    return {
        id: null,
        "name": "",
        "budgetPlanned": {
            "percentage": "",
            "amount": ""
        },
        "consumed": "",
        "comment": ""
    };
}

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
        validation: "",
        value: ""
    }
})
