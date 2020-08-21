import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBiB48Nn02CeAWqazXkdTtd362fXRBIXHs",
    authDomain: "restaurant-advisor-8bcc1.firebaseapp.com",
    databaseURL: "https://restaurant-advisor-8bcc1.firebaseio.com",
    projectId: "restaurant-advisor-8bcc1",
    storageBucket: "restaurant-advisor-8bcc1.appspot.com",
    messagingSenderId: "754807818018",
    appId: "1:754807818018:web:3447688ea39b709aa9077b",
    measurementId: "G-SN8Y5HLP2F"
}
export const firebaseApp = firebase.initializeApp(firebaseConfig);
