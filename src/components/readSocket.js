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

function coincidir(dato){
    //console.log(id);
    //console.log(`Dato: ${dato.id} id:${id}`)
    return dato.id === id
}

class Visor extends Component{
    constructor(props){
        super(props);
        this.state = {
            cargando: 0
        }
    }
    
    componentDidMount(){
        fetch(obtener_datos).then( response => { return response.json()})
        .then( data => {
            
            let arreglo = [
                {
                    lugar: data.sensor1[0].Lugar,
                    temp: data.sensor1[0].Temperatura,
                    ubicacion: data.sensor1[0].Ubicacion
                },
                {
                    lugar: data.sensor2[0].Lugar,
                    temp: data.sensor2[0].Temperatura,
                    ubicacion: data.sensor1[0].Ubicacion
                }
            ]
            this.setState({
                tabla: arreglo
            })
            arreglo.forEach( (element,i)=>{
                console.log(element)
                this.setState({
                    [element.lugar]: element
                })
            })
        }).catch( err => {
            console.log(err);
        })
        socket.on('temp', data => {
            let id_s
            let temp_s;
            for(let i=0;i<data.length;i++){
                if(i==0){
                    id_s = data[i];
                }
                if(i>0){
                    id_s+=data[i]
                }
            }
            console.log(this.state.tabla)
            if(id===1){
                

                // let arreglo = [
                //     {
                //         lugar: data.sensor1[0].Lugar,
                //         temp: data.sensor1[0].Temperatura,
                //         ubicacion: data.sensor1[0].Ubicacion
                //     },
                //     {
                //         lugar: data.sensor2[0].Lugar,
                //         temp: data.sensor2[0].Temperatura,
                //         ubicacion: data.sensor1[0].Ubicacion
                //     }
                // ]
                this.setState({
                    ...this.state,
                    tabla: []
                })
            } else if(id===2){

            } else if(id===5){

            }
            
            
            //this.lectura_data(data);
            console.log(this.state)
        })
        

    }
    lectura_data = (data) => {        
        let id_string;
        let temp_string ='';
        //let id = 0;
        //let temp = 0.0;
        if(data===undefined){
            console.log("no se ha recibido data")
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
                console.log("No se puede convertir a valor float")
            } else {
                id = parseInt(id_string);
                temp = parseFloat(temp_string);
            }
        }
        cargando=0;
    }
    render(){
        let reloj = new Date();
        body = '';
        if(cargando==1){
            body = <div className="cargando"></div>
        } else  {
            body = this.state.tabla.map( (element,turno)=>{
                console.log(this.state)
                
                return(                    
                    <TableRow id={turno} style={{backgroundColor: "#00284d"}} key={element}>
                        <TableCell> <p className="tablaDatos2"> {element.lugar} </p></TableCell>
                        <TableCell> <p className="tablaDatos2">{element.temp}°C</p></TableCell>
                        <TableCell> <p className="tablaDatos2"> {element.ubicacion} </p></TableCell>
                        <TableCell> <p className="tablaDatos2"> {reloj.getHours()} : {reloj.getMinutes()} </p></TableCell>
                    </TableRow>
                )

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