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
        console.log(respuesta.temperatura);
        console.log(respuesta.info.sensor);
        let temperatura = respuesta.temperatura;
        if (temperatura > 20){
            console.warn("Alerta de notificacion");
            /*
            navigator.serviceWorker.ready.then( alerta => {
                alerta.showNotification(
                                        
                )
            })
            */
        }
    })
    .catch(function(err){
      console.log(err);
    })
},5000)




self.addEventListener('load',()=>{
    console.log("!!!!!!!");
})
self.addEventListener('lectura',()=>{
    console.log('Evento disparado');
})

console.log("Service worwer listo");
