import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { api } from "../../axios";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyDF1Fl1YdCAddX6ToplB4LC58dEYKhMqls",
  authDomain: "apppush-3b5aa.firebaseapp.com",
  projectId: "apppush-3b5aa",
  storageBucket: "apppush-3b5aa.appspot.com",
  messagingSenderId: "150342264977",
  appId: "1:150342264977:web:27b62b14eadbc0af167730",
  measurementId: "G-SZ4VFV0T6H"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();


getToken(messaging, { vapidKey: 'BHlhjOwtc7AzNvzguw-_aWnUTPR0xXOND8Mi8IjxnbVZZEkCbj2L4fNiUKsruorbzSHLYDtzoxfjR2zVOfdYz9I' }).then(async (currentToken) => {
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