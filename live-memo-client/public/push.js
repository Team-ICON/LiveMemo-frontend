

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);




// 실시간 푸시 알림 받기
messaging.onMessage(res => {
    console.log(res)
})

