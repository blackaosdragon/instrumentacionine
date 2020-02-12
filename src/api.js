import React, { Component } from 'react'
import serverSocket from 'socket.io-client'
const endPoint = 'http://201.124.147.98:4000'

const localEndPoint = 'http://192.168.1.92:4000'


const muestreo = 10000;
let muestreo1 = "";



class Data extends Component{
    constructor(){
        super();
        this.state = {
            data: "",
            sensor1: "",
            sensor2: ""
        }
    }
    componentDidMount(){
        const socket = serverSocket(endPoint);
        socket.on('temp',(temp)=>{
            //console.log(temp);
            this.handleData(temp);
            this.setState({
                data: temp
            })           
        })
    }
    handleData = (id) => {
        let temp = "";
        if (id[4]==='1'){
            for(let i = 15; i <= 19; i++){
                temp = temp + id[i];
            }
            this.setState({sensor1: temp})
            
        } else if (id[4]==='2'){
            for(let i = 15; i <= 19; i++){
                temp = temp + id[i];
            }
            this.setState({sensor2: temp});
            //console.log(temp);
        }
        //console.log(id);
    }
    
    takeData = () => {
        
        clearInterval(this.intervalo);
    }
    lectura = () => {
        this.intervalo = setInterval(this.takeData,10000);
    }
    
    render(){
        /*
        socket.on('temp',temp=>{
            //muestreo1.innerHTML = `${temp}`
        })
        */
       
        return(
            <div>
                <h1>Cocina. Temperatura: {this.state.sensor2}°C</h1>
                <h1>Taller. Temperatura:  {this.state.sensor1}°C</h1>
            </div>
        )
    }
}
export default Data