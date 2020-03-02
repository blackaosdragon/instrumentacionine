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
        console.log(response);
        return response.json();
    }).then(respuesta=>{
        console.log(respuesta)
    })
    .catch(function(err){
      console.log(err);
    })
},5000)




self.addEventListener('load',()=>{
    console.log("!!!!!!!");
})

console.log("Service worwer listo");
