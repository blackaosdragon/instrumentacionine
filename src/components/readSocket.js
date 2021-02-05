import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableBody } from '@material-ui/core';
import socketIOClient from "socket.io-client"

const ioSocket = "https://instrumentacionline.ddns.net:5002"

const socket = socketIOClient(ioSocket);
let cargando = 1
let id;
let temp;
let body;
let recursos = 'https://instrumentacionline.ddns.net:5002/sensores'
let obtener_datos = 'https://instrumentacionline.ddns.net:5002/socket'

class Visor extends Component{
    constructor(props){
        super(props);
        this.state = {
            cargando: 0
        }
    }
    
    componentDidMount(){
        fetch(recursos).then( response => { return response.json()})
        .then( data => {
            console.log(data)
        }).catch( err => {
            console.log(err)
        })
        fetch(obtener_datos).then( response => { return response.json()})
        .then( data => {
            console.log(data)            
            let arreglo = [
                {
                    lugar: data.sensor1[0].Lugar,
                    temp: data.sensor1[0].Temperatura,
                    ubicacion: data.sensor1[0].Ubicacion,
                    id: data.sensor1[0].ID
                    
                },
                {
                    lugar: data.sensor2[0].Lugar,
                    temp: data.sensor2[0].Temperatura,
                    ubicacion: data.sensor2[0].Ubicacion,
                    id: data.sensor2[0].ID
                }
            ]
            this.setState({
                tabla: arreglo
            })
            arreglo.forEach( (element,i)=>{
                this.setState({
                    [element.lugar]: element
                })
            })
            
        }).catch( err => {
            console.log(err);
        })
        socket.on('temp', data => {
            let id_s
            let temp_s = '';
            let id_int;
            let temp_float
            for(let i=0;i<data.length;i++){
                if(i==0){
                    id_s = data[i];
                }
                if(i>0){
                    temp_s+=data[i]
                    
                }
            }
            if(Number.isNaN(id_s) && Number.isNaN(temp_s)){
                console.log("No se pueden trasnformar")
            } else {
                id_int = parseInt(id_s);
                temp_float = parseFloat(temp_s);
            }

            if(this.state.tabla == undefined){
                ///console.log("No esta entrando donde debería")                
            } else {

                this.state.tabla.map( element => {
                    if(element.id===id_int){
                        this.setState({
                            [element.lugar]: {
                                lugar: element.lugar,
                                temp: temp_float,
                                ubicacion: element.ubicacion,
                                id: element.id                                
                            }
                        })
                    } 
                    
                    
                })
            }
            
        })
        

    }
    lectura_data = (data) => {        
        let id_string;
        let temp_string ='';
        if(data===undefined){
            //console.log("no se ha recibido data")
        } else {
            for(let i=0;i<data.length;i++){
                if(i==0){
                    id_string = data[i];
                }
                if(i>0){
                    temp_string+=data[i]
                }
            }
            if(Number.isNaN(temp_string) || Number.isNaN(id_string)){
                //console.log("No se puede convertir a valor float")
            } else {
                id = parseInt(id_string);
                temp = parseFloat(temp_string);
            }
        }
        
    }
    render(){
        let reloj = new Date();
        body = '';
        cargando=0;
        if(this.state.tabla===undefined){
            body = <div className="cargando"></div>
        } else if(this.state.tabla) {
            body = this.state.tabla.map( (element,turno)=>{  
                if(this.state[element.lugar]){
                    console.log(this.state[element.lugar])
                } else {
                   console.log("aiñ estba al revez xDD")
                }
                
                if(this.state[element.lugar]){
                    let temp = 0;
                    let color = '#99ffff'
                    if(isNaN(this.state[element.lugar].temp)){
                    } else {
                        temp = parseFloat(this.state[element.lugar].temp)
                    }
                    if(temp<3.5){
                        color = '#99ffff'                        
                    } else if (temp >= 3.6 && temp<7){
                        color ='#000099'

                    } else if (temp>=7 && temp < 8){
                        color = '#ffd11a'
                    } else if (temp>=8){
                        color = '#ff3300'
                    }
                    
                    return(                    
                        <TableRow id={turno} style={{backgroundColor: `${color}`}} key={element.lugar}>
                            <TableCell> <p className="tablaDatos2"> {element.lugar} </p></TableCell>
                            <TableCell> <p className="tablaDatos2">{this.state[element.lugar].temp}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {element.ubicacion} </p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {reloj.getHours()} : {reloj.getMinutes()} </p></TableCell>
                        </TableRow>
                    )
                    
                } else {
                    //console.log("entra en state")
                    return(                    
                        <TableRow id={turno} style={{backgroundColor: "#00284d"}} key={element.lugar}>
                            <TableCell> <p className="tablaDatos2"> {element.lugar} </p></TableCell>
                            <TableCell> <p className="tablaDatos2">{element.temp}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {element.ubicacion} </p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {reloj.getHours()} : {reloj.getMinutes()} </p></TableCell>
                        </TableRow>
                    )
                }
                

            })
            /*
            body = this.state.lugares.map( (element,cuenta) => {

                if(this.state.tabla===undefined){

                } else {                    
                    return(                    
                        <TableRow id={cuenta} style={{backgroundColor: "#00284d"}} key={element}>
                            <TableCell> <p className="tablaDatos2"> {element} </p></TableCell>
                            <TableCell> <p className="tablaDatos2">{this.state.tabla[cuenta].temp}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {this.state.tabla[cuenta].ubicacion} </p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {reloj.getHours()} : {reloj.getMinutes()} </p></TableCell>
                        </TableRow>
                    )
                }
                
                
            })*/
        }
        return(
            <div>
                <div className="contenedorCardTabla">
    
    <TableContainer>
        <Table className="monitorTemperaturas">
            <TableHead>
                <TableRow className="tabla">
                    <TableCell ><p className="tablaTitulos">Sensor</p></TableCell>                                
                    <TableCell ><p className="tablaTitulos"> Temperatura</p></TableCell>                                
                    <TableCell ><p className="tablaTitulos">Ubicación</p></TableCell>
                    <TableCell ><p className="tablaTitulos">Última actualización</p></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {body}
            </TableBody>
        </Table>

    </TableContainer>
    
</div>
            </div>
        )
    }
} 
export default Visor;