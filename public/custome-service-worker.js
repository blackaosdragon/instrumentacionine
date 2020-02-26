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
fetch('https://instrumentacionline.ddns.net',{mode: 'cors'}).then(function(response){
    console.log(response);
}).catch(function(err){
    console.log(err);
})


self.addEventListener('load',()=>{
    console.log("!!!!!!!");
})

console.log("Service worwer listo");
