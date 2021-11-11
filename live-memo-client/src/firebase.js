// Import the functions you need from the SDKs you need
import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzvRd4Rr7I_6f7teg20yNkPGdrt6ZZVHc",
    authDomain: "live-memo-fb7fa.firebaseapp.com",
    projectId: "live-memo-fb7fa",
    storageBucket: "live-memo-fb7fa.appspot.com",
    messagingSenderId: "610451654728",
    appId: "1:610451654728:web:c91d2a397ca1b2d5c6307d"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
export { db, auth, provider };