import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database'
import { Constants } from 'expo-constants';
import { setDoc, collection, doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { newUserData } from './defaults';

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

export async function getUser(user) {
    return await getDoc(doc(db, `users/${user.uid}`));
}

export async function updateUserAccount(user, data) {
    return await updateDoc(doc(db, 'users', user.uid), {
        accounts: data
    })
}