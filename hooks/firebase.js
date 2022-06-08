import { initializeApp } from 'firebase/app';

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

const app = initializeApp(firebaseConfig);

export default app;