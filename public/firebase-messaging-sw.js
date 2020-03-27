
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

/*
messaging.setBackgroundMessageHandler( payload => {
    console.log(payload);
})
messaging.setBackgroundMessageHandler( function(payload){
    console.log("Service worker recibio un mensaje", payload);
})
*/
messaging.setBackgroundMessageHandler(function(payload){
    console.log(payload);
    if(payload.data.tipo==="Bienvenida"){
        self.registration.showNotification(payload.data.titulo,{
            body: payload.data.contenido,
            vibrate: [500,200,500],
            requireInteraction: true                
        })
    }else{
        self.registration.showNotification(payload.notification.title,{
            body: payload.notification.body,
            badge: `${process.env.PUBLIC_URL}/termometro192.png`
        })
    }
    /*
    const title = 'Iniciado el servidor';
    const options = {
        body: 'Notificaciones funcionando'
    }
    return self.registration.showNotification(title,options);*/
})
/*
messaging.onMessage(function(payload){
    console.log('onMessage: ',payload);
})
*/
/*
messaging.onMessage( payload => {
    console.log(payload);
})
*/

//messaging.usePublicVapidKey("BCw81StElUUliyjpdiWSPTrGQw5L0Fq5tqMLHZWriMKYgN6abD-jy8tkhjnD2gdWj5mdeHE5UJcfyWhpaxzi-yo");
/*messaging.requestPermission().then(()=>{
    console.log("Hay permiso para las notificaciones");
    return messaging.getToken()
}).then( myToken => {
    console.log(myToken);
})
.catch(err => {
    console.log("Ocurrio un error");
    alert("No concedio u ocurrio un errar al autorizar las notificaciones");
})

messaging.onMessage( payload => {
    console.log('onMessage: ',payload);
})
*/
/*
Notification.requestPermission().then(result=>{
    if(result==='granted'){
        console.log("Notificaciones aceptadas");
    } else {
        alert("No ha aceptado notificaciones");
    }
})
*/




/*messaging.getToken().then(actualToken => {
    if (actualToken){
        console.log(actualToken);
        sendTokenToServer(actualToken);
        updateUIForPushEnabled(actualToken);
    } else {
        console.log("No hay id de un token disponible, Se requiere pedir permiso para generar uno");
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
        console.log("No existe token")
    }
}).catch( err =>{
    console.log("Ha ocurrido un error al recibir/leer el token",err);
    showToken("Error de token", err);
    setTokenSentToServer(false);
})*/

/*


    let result = false;

if (Notification.permission !== 'granted'){
    messaging.requestPermission();
}
if (localStorage.getItem(INSTANCE_TOKEN)!== null){
    result = true;
} else {
    const token = messaging.getToken();
    console.log(token);
    localStorage.setItem(INSTANCE_TOKEN, token);

}
*/



/*
self.addEventListener('notificationclick',(e)=>{
    if (e.action){
        clients.openWindow(e.action);
    }
    e.notification.close();
})

const inst_cache = 'cache-instrumentacion';
const offlineSoporte = [
    './index.html',
    '/static/css/2.18f57b05.chunk.css',
    '/static/css/main.4fef6e22.chunk.css',
    '/static/css/main.4fef6e22.chunk.css',
    '/static/js/2.baef486d.chunk.js',
    "/static/js/main.0bdbeaed.chunk.js",
    "/static/js/runtime-main.f0a957c3.js",
    "/static/media/Autoclave1.a0954ec8.jpeg",
    "/static/media/KLSMartinDes.3640bd73.jpeg",
    "/static/media/Lampara.31d1cd07.jpg",
    "/static/media/LamparaLimpiesa.0a452079.jpg",
    "/static/media/Logo.3f0a4bef.jpg",
    "/static/media/MesasNuevas.088a5a6e.jpeg",
    "/static/media/Reparacion16.1311e547.jpeg",
    "/static/media/Tarjeta1.eeca857a.jpeg",
    "/static/media/aire.4881b893.jpg",
    "/static/media/congeladores.8d18cfe8.jpeg",
    "/static/media/congeladores10.89738539.jpeg",
    "/static/media/congeladores11.b7822ec8.jpeg",
    "/static/media/congeladores12.b3026b8e.jpeg",
    "/static/media/congeladores13.151523c3.jpeg",
    "/static/media/congeladores14.2f6de21c.jpeg",
    "/static/media/congeladores15.531de3a4.jpeg",
    "/static/media/congeladores16.90541af4.jpeg",
    "/static/media/congeladores2.f7477089.jpeg",
    "/static/media/congeladores3.220c3b9d.jpeg",
    "/static/media/congeladores4.68e7407b.jpeg",
    "/static/media/congeladores6.db00c9a8.jpeg",
    "/static/media/congeladores7.f9ee7fea.jpeg",
    "/static/media/congeladores8.5b8f722f.jpeg",
    "/static/media/congeladores9.cb8e9e33.jpeg",
    "/static/media/controlAuto.38746bce.jpeg",
    "/static/media/engranes.d8c66388.jpg",
    "/static/media/equilibrio.f76cc2d7.jpg",
    "/static/media/funcionando1.8105e1c3.jpeg",
    "/static/media/funcionando2.0181524f.jpeg",
    "/static/media/funcionando3.35bba5e8.jpeg",
    "/static/media/funcionando4.cd3daebe.jpeg",
    "/static/media/funcionando5.c42e2a93.jpeg",
    "/static/media/funcionando6.3372ed15.jpeg",
    "/static/media/funcionando7.fda7c3d2.jpeg",
    "/static/media/instalacion1.61cc6bcd.jpeg",
    "/static/media/instalacion2.3148714e.jpeg",
    "/static/media/instalacion3.868b3fe8.jpeg",
    "/static/media/instalacion4.fe3ea3bf.jpeg",
    "/static/media/rentaMesas1.08c012ea.jpeg",
    "/static/media/rentaMesas2.134c7e5e.jpeg",
    "/static/media/rentaMesas3.edf1654c.jpeg",
    "/static/media/rentaMesas4.4bd38260.jpeg",
    "/static/media/rentaMesas5.1c27b874.jpeg",
    "/static/media/reparacion1.0c324e6e.jpeg",
    "/static/media/reparacion10.2d2b1c8c.jpeg",
    "/static/media/reparacion11.e1271acb.jpeg",
    "/static/media/reparacion13.9caca5ae.jpeg",
    "/static/media/reparacion15.46befa66.jpeg",
    "/static/media/reparacion17.a0489d68.jpeg",
    "/static/media/reparacion18.13f1f1a1.jpeg",
    "/static/media/reparacion2.7ffb2e75.jpeg",
    "/static/media/reparacion3.626f6eaa.jpeg",
    "/static/media/reparacion4.145e3981.jpeg",
    "/static/media/reparacion5.67bdd99c.jpeg",
    "/static/media/reparacion6.9a3c7c80.jpeg",
    "/static/media/reparacion7.d8bcd847.jpeg",
    "/static/media/reparacion8.d407d829.jpeg",
    "/static/media/reparacionMesa1.129a18b7.jpeg",
    "/static/media/reparacionMesa2.4ac9b6fe.jpeg",
    "/static/media/reparacionMesa3.f50a3b48.jpeg",
    "/static/media/reparacionMesa4.a1cd3f76.jpeg",
    "/static/media/reparacionMesa5.fc518047.jpeg",
    "/static/media/reparacionMesa6.2b777f9e.jpeg",
    "/static/media/tarjeta3.1e3b04c4.jpeg",
    '/static/media/zrnic.f2c56e62.woff'

];
*/
/*
self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(inst_cache)
        .then((cache)=>{
            return cache.addAll(offlineSoporte)
        }).then(()=>{
            return self.skipWaiting();
        })
    )

})
*/
/*
self.addEventListener('activate', e => {
    e.waitUntil(self.clients.claim());
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (inst_cache !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});
*/
/*
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.open(inst_cache).then( cache => {
            return fetch(e.request).then(fetchResponse => {
                if (e.request.method === 'GET'){
                    cache.put(e.request, fetchResponse.clone());
                }
                return fetchResponse;
            }).catch( () => {
                return cache.match(e.request).then(cacheResponse => cacheResponse)

            })

        })
    )
})
*/

/*
setInterval(()=>{
    fetch('https://instrumentacionline.ddns.net/sensor').then((response)=>{
        console.log(response);
        return response.json();
    }).catch(err=>{
        console.log(err);
    })
},60000)


setInterval(()=>{
    /*
    fetch('https://instrumentacionline.ddns.net/sensor',{mode: 'cors'}).then(function(response){
      //el response es que si respodndio pero la pagina    
      console.log(response);
      return response.json();
      /*
      if(response.json().status == "200"){
        return response.json();
      } else if(){
          console.warn()
      }
      */
        
      /*  
        // esta si manda la respuesta 
    }).then(respuesta=>{
        console.log(`Sensor: ${respuesta.info.sensor} Temperatura: ${respuesta.temperatura}°C Ubicación: ${respuesta.info.ubicacion}`);
        //console.log(respuesta.temperatura);
        //console.log(respuesta.info.sensor);
        let temperatura = respuesta.temperatura;
        if (temperatura > 25){
            //console.warn("Alerta de notificacion");
            //console.log(navigator);
            //console.log(self);
            //Notification.requestPermission().then(()=>{})
            self.registration.showNotification('Alerta',{
                body: `${respuesta.temperatura}°C ${respuesta.info.sensor} ${respuesta.info.ubicacion}`,
                vibrate: [500,200,500],
                requireInteraction: true                
            })
            
            /*
            /*
            /*
            navigator.serviceWorker.ready.then(alerta => {
                console.warn("Serviceworker ready")
            })
            */
            /*
            navigator.serviceWorker.ready.then( alerta => {
                alerta.showNotification(
                    'Alerta! Temperatura muy alta',{
                        body: `${respuesta.temperatura} ${respuesta.info.sensor} ${respuesta.info.ubicacion}`,
                        vibrate: [500,200,500],
                        requireInteraction: true,
                    }
                )
            })*//*
        }
    })
    .catch(function(err){
      console.log(err);
    })
},10000)


*/
/////////////////////


self.addEventListener('load',()=>{
    console.log("!!!!!!!");
})
self.addEventListener('lectura',()=>{
    console.log('Evento disparado');
})

console.log("Service worwer listo");
