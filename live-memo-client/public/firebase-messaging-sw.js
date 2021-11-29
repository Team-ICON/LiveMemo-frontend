
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object


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
    event.waitUntil(clients.openWindow("https://live-memo-610d4.firebaseapp.com/"));
});