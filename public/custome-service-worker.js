
import serverSocket from '../node_modules/socket.io-client'
//const serverSocket = 
//const serverSocket = require('../node_modules/socket.io-client');
const endPoint = 'https://instrumentacionline.ddns.net/';
const socket = serverSocket(endPoint);
socket.on('temp',(temp)=>{
    console.log(temp);
})


self.addEventListener('load',()=>{
    console.log("!!!!!!!");
})

console.log("Service worwer listo");
