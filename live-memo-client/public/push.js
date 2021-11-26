
const firebaseConfig = {
    apiKey: "AIzaSyDF1Fl1YdCAddX6ToplB4LC58dEYKhMqls",
    authDomain: "apppush-3b5aa.firebaseapp.com",
    projectId: "apppush-3b5aa",
    storageBucket: "apppush-3b5aa.appspot.com",
    messagingSenderId: "150342264977",
    appId: "1:150342264977:web:27b62b14eadbc0af167730",
    measurementId: "G-SZ4VFV0T6H"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  
  function SubscribeUser() {
      Notification.requestPermission().then(permission => {
          console.log(permission);
          if(permission === "granted") {
              messaging.getToken({vapidKey : "BHlhjOwtc7AzNvzguw-_aWnUTPR0xXOND8Mi8IjxnbVZZEkCbj"
              +"2L4fNiUKsruorbzSHLYDtzoxfjR2zVOfdYz9I"}).then(currentToken => {
                  console.log(currentToken);
                  // 토큰 값(currentToken) 서버로 보내기
                    // method : PUT
                    // api.PUT('/user/userFcmToken')
              })
          }
      })
  }
  
  // 실시간 푸시 알림 받기
  messaging.onMessage(res=>{
      console.log(res)
  })
  
  
  function sendNotification() {
      const token = document.getElementById('token').value
      const title = document.getElementById('title').value
      const msg = document.getElementById('msg').value

      // api서버로부터 해당 메모의 userlist에 있는 유저들의 토큰 요청하기(본인 제외)
      // method : POST
      // api.POST('/push/fcmTokenList')

      // 각 유저마다 push 보내기
      let targetFcmTokenList = 
      ['fVIdgJJNeGX9G0SqmEVuQZ:APA91bE2lWvKD0WbKU-IY0QMQHNlHcRlE87uNQKfCkmEgs29HdXwV5SABDx4vVVnOuKReG3zbOW-CLxATBB0NkNRU0UXZ4j4su0wnKGqnX7Xz4agGMKKTAyZdqvgt2R_56rrXf4dW6Y2',
        
    ];
      targetFcmTokenList.forEach(fcmToken => {
        let body = {
            to: fcmToken,
            notification : {
                title : title,
                body : msg,
                icon : "ori.jpg",
                // click_action : "https://livememoshop.shop"
            }
        }
    
        let options = {
            method : "POST",
            headers : new Headers({ 
                Authorization : "AAAAIwEY6JE:APA91bGbj3Z6HuZqZxFvKcbuyEhjWeU24g4kGRjiLLH-kMhQzubFoXLiQe8EvaOKTt0ZFl2sxLWHw3nYNZiIReEUnN0phUaiD-T-Xbi2Fnd4L0Lcpn89JtaUANDk0s7vrzxj5p7fDVWO",
                "Content-Type": "application/json"
            }),
            body : JSON.stringify(body)
        }
    
        fetch("https://fcm.googleapis.com/fcm/send", options).then(res => {
            console.log(res)
            console.log('SENT')
        }).catch(e=> console.log(e))
      })
  }

  sendNotification();