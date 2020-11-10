import React, {Component} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableBody } from '@material-ui/core';
import socketIOClient from "socket.io-client"
import { Link } from "react-router-dom";

//const ioSocket="http://192.168.0.10:5000"
const ioSocket = "https://instrumentacionline.ddns.net:5002"
//const dominio = "192.168.0.10";
//const port = "5001";
const ubicaciones_endPoint = "ubicaciones";
const ubicaciones_endPoint2 = "ubicaciones2";
//let socket = new WebSocket(`ws://${dominio}:${port}`);

let cargando = 1;
const socket = socketIOClient(ioSocket);

class Temperature extends Component{
    constructor(){
        super();
        this.state = {
            estuctura_De_tabla: []
        }
    }
    componentWillUnmount(){
        cargando = 1;
        //socket.close();
        //socket.disconnect();
        //console.log("Cerrando conexion");
    }
    componentWillMount(){    
    }
    componentDidMount(){
        
        fetch(`${ioSocket}/${ubicaciones_endPoint2}`)
        .then( response => {return response.json()})
        .then ( data => {
            //console.log(data);
            data.forEach( element => {
                //console.log(element);
                this.setState({
                    ubicaciones: element.Ubicacion
                })
                this.setState({
                    ...this.state,
                    estuctura_De_tabla: [
                        ...this.state.estuctura_De_tabla,
                        element.lugar
                    ]
                })
                //console.log(this.state.estuctura_De_tabla)
                this.setState({
                    ...this.state,
                    [element.lugar]:{
                        lugar: element.lugar,
                        ubicacion: element.Ubicacion,
                        valor: "",
                        actualizacion: ""
                    }
                })
            })
            //console.log(this.state.estuctura_De_tabla);
            cargando=0;
        })
        .catch( error => {
            console.log(error);
        })
        fetch("https://instrumentacionline.ddns.net:5002/socket").then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data);
            console.log(data.sensor2.length);
            ///*
            this.setState({
                ...this.state,
                [this.state.estuctura_De_tabla[1]]:{
                    ...this.state.estuctura_De_tabla,
                    lugar: this.state.estuctura_De_tabla[0],
                    valor: data.sensor1[0].Temperatura,
                    actualizacion: `${data.sensor1[0].Hora}:${data.sensor1[0].Minuto}`
                }

            })
            
            if(data.sensor2.length<=0){
                console.log("Sensor farmacia esta vacio")
            } else {
                this.setState({
                    ...this.state,
                    [this.state.estuctura_De_tabla[0]]:{
                        ...this.state.estuctura_De_tabla,
                        lugar: this.state.estuctura_De_tabla[1],
                        valor: data.sensor2[0].Temperatura,
                        actualizacion: `${data.sensor2[0].Hora}:${data.sensor2[0].Minuto}`
                    }
    
                })
            }
            
            
            //*/
        }).catch( err => {
            console.log(err)
        })        
        
        
        socket.on('temp', data => {
            console.log(data);
            console.log(this.state.estuctura_De_tabla)
            if(this.state.estuctura_De_tabla[0]==='Cámara dieto'){
                console.log("Primer dato recibido cámara dieto")
            } else {
                console.log("El primer elemento recibido fue: ",this.state.estuctura_De_tabla[0]);
            }
            
            let hora = new Date();
            let float_temp = 0;
            let string_temp = "";
            
            for( let i = 1 ; i < data.length ; i++){
                string_temp = string_temp+data[i];
            }
            if(parseFloat(string_temp)){
                float_temp = parseFloat(string_temp);
            } else {}
            if(data[0]=='1'){ 
                //console.log(this.state.estuctura_De_tabla[1]);
                
                this.setState({
                    ...this.state,
                    [this.state.estuctura_De_tabla[0]]:{
                        ...this.state.estuctura_De_tabla,
                        lugar: this.state.estuctura_De_tabla[0],
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }

                })/*
                this.setState({
                    ...this.state,
                    [this.state.estuctura_De_tabla[1]]:{
                        ...[this.state.estuctura_De_tabla[1]],
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }
                })*/
            }
            //console.log(this.state.estuctura_De_tabla);
            if(data[0]=='2'){
                this.setState({
                    ...this.state,
                    [this.state.estuctura_De_tabla[1]]:{
                        ...[this.state.estuctura_De_tabla[1]],
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }

                })
            }
            if(data[0]=='3'){
                this.setState({
                    ...this.state,
                    [this.state.estuctura_De_tabla[2]]:{
                        ...[this.state.estuctura_De_tabla[2]],
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }
                })
            }
            
        })
        //console.log('ComponentDidMount:');
        //console.log(this.state);
    }

    render(){
        //console.log("Estado: ")
        //console.log(this.state);        
        let carga = '';
        if(cargando){
            carga = <div className="cargando"></div>
        } else {
            carga = this.state.estuctura_De_tabla.map((element,id)=>{
                //console.log(element);
                //console.log(this.state);
                let temp = parseFloat(this.state[element].valor);
                if(temp>=0 && temp<=5.9){
                    return (
                        <TableRow id={id} style={{backgroundColor: "#00284d"}} key={element}>
                            <TableCell> <p className="tablaDatos2"> {element} </p></TableCell>
                            <TableCell> <p className="tablaDatos2">{this.state[element].valor}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {this.state.ubicaciones} </p></TableCell>
                            <TableCell> <p className="tablaDatos2"> {this.state[element].actualizacion} </p></TableCell>
                        </TableRow>
                    )
                } else if(temp>=6.0 && temp<=7.9){
                    return (
                        <TableRow style={{backgroundColor: "#ffff1a"}} key={element}>
                            <TableCell> <p className="tablaDatos"> {element} </p></TableCell>
                            <TableCell> <p className="tablaDatos">{this.state[element].valor}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state.ubicaciones} </p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state[element].actualizacion} </p></TableCell>
                        </TableRow>
                    )
                } else if(temp>=8.0){
                    return (
                        <TableRow style={{backgroundColor: "#ff3300"}} key={element}>
                            <TableCell> <p className="tablaDatos"> {element} </p></TableCell>
                            <TableCell> <p className="tablaDatos">{this.state[element].valor}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state.ubicaciones} </p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state[element].actualizacion} </p></TableCell>
                        </TableRow>
                    )
                } else if (temp<0 && temp >-10){
                    return (
                        <TableRow style={{backgroundColor: "#80e5ff"}} key={element}>
                            <TableCell> <p className="tablaDatos"> {element} </p></TableCell>
                            <TableCell> <p className="tablaDatos">{this.state[element].valor}°C</p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state.ubicaciones} </p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state[element].actualizacion} </p></TableCell>
                        </TableRow>
                    )                    
                } else if(temp===-127){
                    return(
                        <TableRow className="Alert" key={element}>
                            <TableCell> <p className="tablaDatos"> {element} </p></TableCell>
                            <TableCell > <p className="tablaDatos"> ¡Error! Revisar el sensor</p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state.ubicaciones} </p></TableCell>
                            <TableCell> <p className="tablaDatos"> {this.state[element].actualizacion} </p></TableCell>
                        </TableRow> 
                    )                                       
                }

            })            
        }
        //console.log(this.props.anchura);
        if(this.props.anchura>970){
            return(
                <div className="contenedorCard2">
                    <div className="contenedorCard">
                        <h1 className="titulos">Monitor de temperaturas</h1>
                    </div>
                    <div className="contenedorCard">
                        <p className="subtitleCuadricula"> A continuación se muestran los sensores registrados, ubicación y la última hora que se registró su lectura</p>                    
                    </div>
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
                                    {carga}
                                </TableBody>
                            </Table>
    
                        </TableContainer>
                    </div>
                    <Link to="./consulta" className="enlace"><div className="boton-movile">Consultar Base</div> </Link>
                </div>
            );

        } else {
            return(
                <div>
                    
                    <div className="contenedorCardMovil">
                        <h1 className="titulos">Monitor de temperaturas</h1>
                        <p className="subtitleCuadricula"> A continuación se muestran los sensores registrados, ubicación y la última hora que se registró su lectura</p>                    
                    </div>
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
                                    {carga}
                                </TableBody>
                            </Table>
    
                        </TableContainer>
                    </div>
                    <Link to="./consulta" className="enlace"><div className="boton-movile">Consultar Base</div> </Link>
                </div>
            )
        }
        
    }
};
export default Temperature;