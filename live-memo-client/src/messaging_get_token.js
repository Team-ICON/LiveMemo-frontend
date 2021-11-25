import { getMessaging, getToken } from "firebase/messaging";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
// messaging.getToken({vapidKey: "BEQA-GyE9tre2RN7z0CWpDpTU3q0sf-7xXZthInZhHfyNO0tg_tJEYy2mZMpPXTBl2749U7lZS9z36fhwA0UEmA"});

getToken(messaging, { vapidKey: 'AAAA4sQcU_I:APA91bEqamNYS8VueqCFncNdPGEQqEsRdTuKM3vyj7nJIlcVUfceWocALD-mQrxba6plVRkRJMCXwmc0rLqgfneJQpuIOIKnViwzq_xnmsbF_c2auVxq371NWL1S8OgsbOaW2iAxGGyo' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(`currentToken`, currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});