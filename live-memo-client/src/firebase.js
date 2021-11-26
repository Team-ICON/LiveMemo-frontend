// // Import the functions you need from the SDKs you need
// import firebase from 'firebase'


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // const firebaseConfig = {
// //     apiKey: "AIzaSyCRJ2vmzI2lIniKVEywfd8xeGsb-p7tP3U",
// //     authDomain: "live-memo-e4ba7.firebaseapp.com",
// //     projectId: "live-memo-e4ba7",
// //     storageBucket: "live-memo-e4ba7.appspot.com",
// //     messagingSenderId: "749530565265",
// //     appId: "1:749530565265:web:7c40c35fce17a864f94d30",
// //     measurementId: "G-BTB12XZLWX"
// // };

// const firebaseConfig = {
//     apiKey: "AIzaSyDF1Fl1YdCAddX6ToplB4LC58dEYKhMqls",
//     authDomain: "apppush-3b5aa.firebaseapp.com",
//     projectId: "apppush-3b5aa",
//     storageBucket: "apppush-3b5aa.appspot.com",
//     messagingSenderId: "150342264977",
//     appId: "1:150342264977:web:27b62b14eadbc0af167730",
//     measurementId: "G-SZ4VFV0T6H"
// };

// const messaging = firebase.messaging();

// function SubscribeUser() {
//     Notification.requestPermission().then(permission => {
//         console.log(permission);
//         if (permission === "granted") {
//             messaging.getToken({
//                 vapidKey: "BHlhjOwtc7AzNvzguw-_aWnUTPR0xXOND8Mi8IjxnbVZZEkCbj"
//                     + "2L4fNiUKsruorbzSHLYDtzoxfjR2zVOfdYz9I"
//             }).then(currentToken => {
//                 console.log(currentToken);
//                 // 토큰 값(currentToken) 서버로 보내기
//                 // method : PUT
//                 // api.PUT('/user/userFcmToken')
//             })
//         }
//     })
// }



// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
