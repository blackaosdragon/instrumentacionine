importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.57151917f87a4f1f6973d601d6714d94.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});


/*
import serverSocket from '../node_modules/socket.io-client'
//const serverSocket = 
//const serverSocket = require('../node_modules/socket.io-client');
const endPoint = 'https://instrumentacionline.ddns.net/';
const socket = serverSocket(endPoint);
socket.on('temp',(temp)=>{
    console.log(temp);
})
*/

setInterval(()=>{
    fetch('https://instrumentacionline.ddns.net/sensor',{mode: 'cors'}).then(function(response){
      //el response es que si respodndio pero la pagina    
      //console.log(response);
        return response.json();
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
            Notification.requestPermission((result)=>{
                if (result === 'granted'){
                    navigator.serviceWorker.ready.then((alerta)=>{
                        alerta.showNotification(
                            'Alerta! Temperatura muy alta',{
                                body: `${respuesta.temperatura} ${respuesta.info.sensor} ${respuesta.info.ubicacion}`,
                                vibrate: [500,200,500],
                                requireInteraction: true,
                            }
                        )
                    })
                }
            })/*
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
            })*/
        }
    })
    .catch(function(err){
      console.log(err);
    })
},10000)




self.addEventListener('load',()=>{
    console.log("!!!!!!!");
})
self.addEventListener('lectura',()=>{
    console.log('Evento disparado');
})

console.log("Service worwer listo");
