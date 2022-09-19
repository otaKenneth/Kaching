import { db } from "@app/api/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export async function setUser(uid) {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, uid), {});
}

export async function getuserData(user) {
    let userData = {user: user};
    const data = await getDoc(doc(db, `users/${user.id}`));
    userData = {...userData, ...data.data()};
    userData.accounts = [];
    const accounts = await getDocs(collection(db, `users/${user.uid}/accounts`));
    accounts.forEach( doc => {
        userData.accounts.push(doc.data());
    })
    userData.budgets = [];
    const budgets = await getDocs(collection(db, `users/${user.uid}/budgets`));   
    budgets.forEach( async doc => {
        const budget = {...doc.data(), categories: []};
        const categories = await getDocs(collection(db, `users/${user.uid}/budgets/${budget.id}/categories`))
        categories.forEach( cdoc => {
            let categ = {...cdoc.data(), cid: cdoc.id};
            budget.categories.push(categ)
        })
        userData.budgets.push(budget)
    })
    userData.payees = [];
    userData.payers = [];
    return userData;
}