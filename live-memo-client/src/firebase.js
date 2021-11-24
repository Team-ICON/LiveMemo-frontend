// Import the functions you need from the SDKs you need
import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2XKZyh4QMPROuZXDneko-9X9MoGde-Lc",
    authDomain: "live-memo-610d4.firebaseapp.com",
    projectId: "live-memo-610d4",
    storageBucket: "live-memo-610d4.appspot.com",
    messagingSenderId: "874159596175",
    appId: "1:874159596175:web:4d4f2d7bff1500d59286fa"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
export { db, auth, provider };
