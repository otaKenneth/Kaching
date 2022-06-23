import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database'
import { Constants } from 'expo-constants';
import { setDoc, collection, doc, getFirestore, getDoc, updateDoc, arrayUnion, getDocs, addDoc } from 'firebase/firestore';
import { newUserData } from '../constants/defaults';

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyABwPv8A6uWy-Y09nwPNwShdgHk5ORPM4s",
    authDomain: "budget-manager-607c1.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://asia-southeast1.firebaseio.com",
    projectId: "budget-manager-607c1",
    storageBucket: "budget-manager-607c1.appspot.com",
    messagingSenderId: "816943890075",
    appId: "1:816943890075:android:a079c5b97a536732fdd03e",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
};
let firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export default firebase;

export async function setUser(uid) {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, uid), newUserData)
}

export async function getUserData(user) {
    let userData = {user: user};
    data = await getDoc(doc(db, `users/${user.uid}`));
    userData = {...userData, ...data.data()};
    userData.accounts = [];
    const snapshot1 = await getDocs(collection(db, `users/${user.uid}/accounts`));
    snapshot1.forEach( doc => {
        userData.accounts.push(doc.data());
    })
    userData.budgets = [];
    const snapshot2 = await getDocs(collection(db, `users/${user.uid}/budgets`));   
    snapshot2.forEach( doc => {
        const data = {...doc.data(), categories: [], transactions: []};
        getUserBudgetCategories(user, data.name).then(res => {
            data.categories = res;
        });
        userData.budgets.push(data)
    })
    return userData;
}

export async function getUserAccounts(user) {
    let accounts = [];
    const snapshot = await getDocs(collection(db, `users/${user.uid}/accounts`));   
    snapshot.forEach( doc => {
        accounts.push(doc.data())
    })
    return accounts;
}

export async function getUserBudgets(user) {
    const budgets = [];
    const snapshot = await getDocs(collection(db, `users/${user.uid}/budgets`));   
    snapshot.forEach( doc => {
        const data = {...doc.data(), categories: [], transactions: []};
        getUserBudgetCategories(user, data.name).then(res => {
            data.categories = res;
        });
        budgets.push(data)
    })
    return budgets;
}

export async function getUserBudgetCategories(user, budgetname) {
    let categories = [];
    const snapshot = await getDocs(collection(db, `users/${user.uid}/budgets/${budgetname}/categories`))
    snapshot.forEach( doc => {
        let categ = {...doc.data(), id: doc.id};
        categories.push(categ)
    })
    return categories;
}

export async function addUserAccount(user, data) {
    return await setDoc(doc(db, `users/${user.uid}/accounts/${data.name}`), data);
}

export async function addUserBudget(user, data) {
    return await setDoc(doc(db, `users/${user.uid}/budgets/${data.name}`), data);
}

export async function addUserBudgetCategory(user, budgetName, data) {
    return await addDoc(collection(db, `users/${user.uid}/budgets/${budgetName}/categories/`), data);
}

export async function updateUserAccount(user, data) {
    return await updateDoc(doc(db, 'users', user.uid), {
        accounts: arrayUnion(data)
    })
}

export async function updateUserBudget(user, data) {
    return await updateDoc(doc(db, 'users', user.uid), {
        budgets: arrayUnion(data)
    })
}

export async function updateUserBudgetCategory(user, budgetName, data) {
    return await updateDoc(doc(db, `users/${user.uid}/budgets/${budgetName}/categories/${data.id}`), data)
}