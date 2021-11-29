'use strict';

let swRegistration = null;

if ('serviceWorker' in navigator) {
  console.log('Service Worker and Push is supported');
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(function (swReg) {
        console.log('Service Worker is registered', swReg);
        swRegistration = swReg;
        // initializeUI();
      })
      .catch(function (error) {
        console.error('Service Worker Error', error);
      });
  })
} else {
  console.warn('Seems PushManager or serviceWorker in navigator is not supported');
}
