import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { api } from "./axios";

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
const messaging = getMessaging();

getToken(messaging, { vapidKey: `BEqPyH6fNMq7qKa5Sn81R3VeI5Nw0kjR3gea79SkfJpzEocFro5ljOubelpLcn7QX7JiQAksBWT1VudTQklyfWQ` }).then(async (currentToken) => {
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
        Notification.requestPermission().then(permission => {
            if (permission == "granted") {
                console.log('permission granted');
                // 여기서 reload 해줘야하나?
            }
        })
            .catch((err) => {
                console.log(`err At Notification`, err);
            })
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

// function subscribe() {
//     Notification.requestPermission().then(permission => {
//         console.log(permission)
//         if (permission == "granted") {
//             getToken(messaging, { vapidKey: `BEQA-GyE9tre2RN7z0CWpDpTU3q0sf-7xXZthInZhHfyNO0tg_tJEYy2mZMpPXTBl2749U7lZS9z36fhwA0UEmA` }).then(async (currentToken) => {
//                 if (currentToken) {
//                     // Send the token to your server and update the UI if necessary
//                     console.log(`currentToken`, currentToken);

//                     api.put('user/userFcmToken', {
//                         fcmToken: currentToken
//                     }).then((result) => {
//                         if (result) {
//                             console.log(`result`, result);
//                             console.log('save fcm token');
//                         }
//                     }).catch((err) => {
//                         console.log(`err at getToken(fcm)`, err);
//                     })

//                 } else {
//                     // Show permission request UI
//                     console.log('No registration token available. Request permission to generate one.');
//                 }
//             }).catch((err) => {
//                 console.log('An error occurred while retrieving token. ', err);
//             });

//         }

//     }).catch(e => {
//         console.log(e)
//     })
// }

// if (messaging !== null)
//     subscribe();

export { messaging, getToken, onMessage, app }
