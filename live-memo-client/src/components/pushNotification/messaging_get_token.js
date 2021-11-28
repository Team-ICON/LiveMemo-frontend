import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { api } from "../../axios";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import dotenv from "dotenv";

dotenv.config();

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
const messaging = getMessaging();

function subscribe(){
  Notification.requestPermission().then(permission=>{
    console.log(permission)
    if(permission == "granted"){
      getToken(messaging, { vapidKey: `BEQA-GyE9tre2RN7z0CWpDpTU3q0sf-7xXZthInZhHfyNO0tg_tJEYy2mZMpPXTBl2749U7lZS9z36fhwA0UEmA` }).then(async (currentToken) => {
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
      // getToken(messaging, {vapidKey:"BEQA-GyE9tre2RN7z0CWpDpTU3q0sf-7xXZthInZhHfyNO0tg_tJEYy2mZMpPXTBl2749U7lZS9z36fhwA0UEmA"}).then(currentToken=>{
      //     console.log(currentToken)
      //     document.getElementById('showToken').innerHTML = currentToken

      // })
  }
    // if(permission == "granted"){
    //     messaging.getToken({vapidKey:"BEQA-GyE9tre2RN7z0CWpDpTU3q0sf-7xXZthInZhHfyNO0tg_tJEYy2mZMpPXTBl2749U7lZS9z36fhwA0UEmA"}).then(currentToken=>{
    //         console.log(currentToken)
    //         document.getElementById('showToken').innerHTML = currentToken

    //     })
    // }
  }).catch(e=>{
      console.log(e)
  })
}

subscribe();


// getToken(messaging, { vapidKey: `${process.env.REACT_APP_VAPID_KEY}` }).then(async (currentToken) => {
//   if (currentToken) {
//     // Send the token to your server and update the UI if necessary
//     console.log(`currentToken`, currentToken);

//     api.put('user/userFcmToken', {
//       fcmToken: currentToken
//     }).then((result) => {
//       if (result) {
//         console.log(`result`, result);
//         console.log('save fcm token');
//       }
//     }).catch((err) => {
//       console.log(`err at getToken(fcm)`, err);
//     })

//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
// });