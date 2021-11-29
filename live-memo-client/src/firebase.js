import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyC2XKZyh4QMPROuZXDneko-9X9MoGde-Lc",
    authDomain: "live-memo-610d4.firebaseapp.com",
    projectId: "live-memo-610d4",
    storageBucket: "live-memo-610d4.appspot.com",
    messagingSenderId: "874159596175",
    appId: "1:874159596175:web:f2a1236ba6e24f5a9286fa"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = isSupported() ? getMessaging() : null


export { messaging, getToken, onMessage, app }