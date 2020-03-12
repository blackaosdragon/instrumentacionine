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

self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open('instrumentacion')
        .then((cache)=>{
            return cache.addAll(offlineSoporte)
        }).then(()=>{
            return self.skipWaiting();
        })
    )

})

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
