// import { initializeApp } from "firebase/app";
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({


//     apiKey: "AIzaSyC2XKZyh4QMPROuZXDneko-9X9MoGde-Lc",
//     authDomain: "live-memo-610d4.firebaseapp.com",
//     projectId: "live-memo-610d4",
//     storageBucket: "live-memo-610d4.appspot.com",
//     messagingSenderId: "874159596175",
//     appId: "1:874159596175:web:f2a1236ba6e24f5a9286fa"


// });
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// 이 아래 부분을 설정하는 곳이 종종 보이는데 이걸 하면 같은 알림이 2개 온다.
// messaging.onBackgroundMessage(function (payload) {
//     console.log('[firebase-messaging-sw.js] onBackgroundMessage ', payload)
//     const title = payload.notification.title
//     const options = {
//         body: payload.notification.body,
//         icon: payload.notification.image
//     }
//     return self.registration.showNotification(title, options)
// })

self.addEventListener('push', function (event) {
    console.log('event1111111111111111111111111111111111', event);
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    let text = event.data.text();
    let jsonText = JSON.parse(text);
    console.log(`typeof(text)`, typeof (text));
    console.log(`jsonText`, jsonText);
    console.log(`jsonText.notification`, jsonText.notification);
    console.log(`text.title`, text.title);

    const title = jsonText.notification.title;
    const options = {
        body: jsonText.notification.body,
        icon: 'icons/Live-Memo(192x192).png',
        badge: 'images/badge.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

self.addEventListener('notificationclick', function (event) {
    //푸시 노티피케이션 에서 클릭 리스너

    //   var data = event.notification.data;
    event.notification.close();
    event.waitUntil(clients.openWindow("https://live-memo-610d4.firebaseapp.com//"));
});
