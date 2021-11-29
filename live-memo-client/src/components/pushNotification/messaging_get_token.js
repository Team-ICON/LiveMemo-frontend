// // import { getMessaging, getToken, onMessage } from "firebase/messaging";
// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { api } from "../../axios";
// // // import { onBackgroundMessage } from "firebase/messaging/sw";
// // import dotenv from "dotenv";

// // dotenv.config();


// import { messaging, getToken, onMessage } from "../../firebase"
// import { api } from "../../axios";

// function subscribe() {
//   Notification.requestPermission().then(permission => {
//     console.log(permission)
//     if (permission == "granted") {
//       getToken(messaging, { vapidKey: `BEqPyH6fNMq7qKa5Sn81R3VeI5Nw0kjR3gea79SkfJpzEocFro5ljOubelpLcn7QX7JiQAksBWT1VudTQklyfWQ` }).then(async (currentToken) => {
//         if (currentToken) {
//           // Send the token to your server and update the UI if necessary
//           console.log(`currentToken`, currentToken);

//           api.put('user/userFcmToken', {
//             fcmToken: currentToken
//           }).then((result) => {
//             if (result) {
//               console.log(`result`, result);
//               console.log('save fcm token');
//             }
//           }).catch((err) => {
//             console.log(`err at getToken(fcm)`, err);
//           })

//         } else {
//           // Show permission request UI
//           console.log('No registration token available. Request permission to generate one.');
//         }
//       }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//       });

//     }

//   }).catch(e => {
//     console.log(e)
//   })
// }

// subscribe();

