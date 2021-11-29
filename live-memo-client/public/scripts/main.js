'use strict';

// const applicationServerPublicKey = `${process.env.REACT_APP_APPLICATION_SERVER_PUBLIC_KEY}`;

// let isSubscribed = false;
// let swRegistration = null;

// function urlB64ToUint8Array(base64String) {
//   console.log(`base64String`, base64String);
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   console.log(`outputArray`, outputArray);
//   return outputArray;
// }


// function subscribeUser() {
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
//   })
//     .then(function (subscription) {
//       console.log('User is subscribed.');
//       console.log(`subscription`, subscription);

//       isSubscribed = true;

//     })
//     .catch(function (err) {
//       console.log('Failed to subscribe the user: ', err);
//     });
// }


// function initializeUI() {
//   // Set the initial subscription value
//   swRegistration.pushManager.getSubscription()
//     .then(function (subscription) {
//       isSubscribed = !(subscription === null);

//       if (isSubscribed) {
//         console.log('User IS subscribed.');
//         console.log(`subscription`, subscription);
//       } else {
//         console.log('User is NOT subscribed.');
//         subscribeUser();
//       }

//     });
// }
let swRegistration = null;

if ('serviceWorker' in navigator) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function (swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      // initializeUI();
    })
    .catch(function (error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Seems PushManager or serviceWorker in navigator is not supported');
}
