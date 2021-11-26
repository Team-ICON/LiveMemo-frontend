
import { firebaseConfig, messaging, firebase } from './firebase-messaging-sw'
import { api } from "./axios";

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);


const SubscribeUser = () => {
    Notification.requestPermission().then(permission => {
        console.log(permission);
        if (permission === "granted") {
            messaging.getToken({
                vapidKey: "BHlhjOwtc7AzNvzguw-_aWnUTPR0xXOND8Mi8IjxnbVZZEkCbj"
                    + "2L4fNiUKsruorbzSHLYDtzoxfjR2zVOfdYz9I"
            }).then(currentToken => {
                console.log(currentToken);
                api.put('/user/userFcmToken', {
                    fcmToken: currentToken
                })
            })
        }
    })
}

// 실시간 푸시 알림 받기
messaging.onMessage(res => {
    console.log(res)
})

export { SubscribeUser }