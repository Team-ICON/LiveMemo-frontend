import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { api } from "../../axios";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();


getToken(messaging, { vapidKey: `${process.env.REACT_APP_VAPID_KEY}` }).then(async (currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log(`currentToken`, currentToken);

    api.put('user/userFcmToken', {
      fcmToken: currentToken
    }).then((result) => {
      if (result) {
        console.log(`result`, result);
        console.log('save fcm token');
      }
    }).catch((err) => {
      console.log(`err at getToken(fcm)`, err);
    })

  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});