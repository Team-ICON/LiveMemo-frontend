// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZmO_8FXsRmWTDjxOSAjEyyLhFAoAF2zU",
  authDomain: "livememo-frontend.firebaseapp.com",
  projectId: "livememo-frontend",
  storageBucket: "livememo-frontend.appspot.com",
  messagingSenderId: "973952799730",
  appId: "1:973952799730:web:240348ea1675df615b116b",
  measurementId: "G-BKD7HTN2N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);