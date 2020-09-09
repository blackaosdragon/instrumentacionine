

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
        apiKey: "AIzaSyCT0s6Exqtbh5W9J-Aa5XJLXsQyepD4aUk",
        authDomain: "home-8bea3.firebaseapp.com",
        databaseURL: "https://home-8bea3.firebaseio.com",
        projectId: "home-8bea3",
        storageBucket: "home-8bea3.appspot.com",
        messagingSenderId: "441591788565",
        appId: "1:441591788565:web:c0d31b9846f53b3ccbca1c",
        measurementId: "G-10C166HQ2R"
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload){
    console.log(payload);
    if(payload.data.tipo==="Bienvenida"){
        self.registration.showNotification(payload.data.titulo,{
            body: payload.data.contenido,
            vibrate: [500,200,500],
            requireInteraction: true,
            badge: '/instr192.png',
            icon: '/logo.png',
        })
    } 
})


