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
            console.warn("Alerta de notificacion");
            console.log(navigator.serviceWorker);
            Notification.requestPermission().then(()=>{})
            
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
