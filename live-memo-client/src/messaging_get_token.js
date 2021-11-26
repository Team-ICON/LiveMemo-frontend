import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onBackgroundMessage } from "firebase/messaging/sw";
import dotenv from 'dotenv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "livememo-frontend.firebaseapp.com",
  projectId: "livememo-frontend",
  storageBucket: "livememo-frontend.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();


getToken(messaging, { vapidKey: 'BEQA-GyE9tre2RN7z0CWpDpTU3q0sf-7xXZthInZhHfyNO0tg_tJEYy2mZMpPXTBl2749U7lZS9z36fhwA0UEmA' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(`currentToken`, currentToken);

    let body = {
      to: currentToken,
      notification: {
        title: '전 자러갑니다~',
        body: '퇴근합니다~'
      }
    }

    let options = {
      method : "POST",
      headers: new Headers({
        Authorization:"key=AAAA4sQcU_I:APA91bEqamNYS8VueqCFncNdPGEQqEsRdTuKM3vyj7nJIlcVUfceWocALD-mQrxba6plVRkRJMCXwmc0rLqgfneJQpuIOIKnViwzq_xnmsbF_c2auVxq371NWL1S8OgsbOaW2iAxGGyo",
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    }

    fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>{
      console.log(`SENT`);
      console.log(res);
    })    

  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
