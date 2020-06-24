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
const ioSocket = "https://instrumentacionline.ddns.net"
const dominio = "192.168.0.10";
const port = "5001";
//let socket = new WebSocket(`ws://${dominio}:${port}`);

let ubicaciones = ["Oficina","Estatico","Manual"];
let cargando = 1;

let data = [
    {
        name: ubicaciones[0],
        ubicacion: "Primer piso",
        valor: "",
        actualizacion: "",
    },
    {
        name: ubicaciones[1],
        ubicacion: "Taller",
        valor: "",
        actualizacion: "",
    },
    {
        name: ubicaciones[2],
        ubicacion: "Taller",
        valor: "",
        actualizacion: "",
    }
]

class Temperature extends Component{
    constructor(){
        super();
        this.state = {}
    }

    componentWillMount(){
        data.forEach( element =>{
            //console.log(element)
            this.setState({
                [element.name]: element
            })
        })
        fetch(`${ioSocket}/ubicaciones`)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            /*
            console.log(data);
            this.setState({
                ubicaciones: data
            })
            data.forEach( element => {
                this.setState({
                    ...this.state,
                    data: [{
                        name: element,
                        valor: "",
                        actualizacion: ""
                    }]
                    
                })                
            })
            console.log(this.state);*/

            cargando = 0;
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    componentDidMount(){
        let hora = new Date();
        const socket = socketIOClient(ioSocket);
        

        socket.on('temp', data => {
            let float_temp = 0;
            let string_temp = "";
            for( let i = 1 ; i < data.length ; i++){
                string_temp = string_temp+data[i];
            }
            if(parseFloat(string_temp)){
                float_temp = parseFloat(string_temp);
            } else {}
            //console.log(`id: ${data[0]} tamaño data: ${data.length}`);
            if(data[0]=='1'){
                this.setState({
                    ...this.state,
                    Oficina: {
                        ...this.state.Oficina,
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }
                })
            }
            if(data[0]=='2'){
                this.setState({
                    ...this.state,
                    Estatico: {
                        ...this.state.Estatico,
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }
                })
            }
            if(data[0]=='3'){
                this.setState({
                    
                    [ubicaciones[2]]: {
                        
                        valor: float_temp,
                        actualizacion: `${hora.getHours()} : ${hora.getMinutes()}`
                    }
                })
            }
        })

        socket.onopen = () => {
            console.log('Conection');
        }
    }

    render(){
        //console.log(this.state);
        let carga = '';
        if(cargando){
            carga = <div className="cargando"></div>
        } else {
            carga = data.map((element,id)=>(
                <TableRow key={element.name}>
                    <TableCell> <p className="tablaTitulos"> {element.name} </p></TableCell>
                    <TableCell> <p className="tablaTitulos">{this.state[element.name].valor}°C</p></TableCell>
                    <TableCell> <p className="tablaTitulos"> {element.ubicacion} </p></TableCell>
                </TableRow>
            ))            
        }
        return(
            <div>
                <div className="contenedorCard">
                    <h1 className="titulos">Monitor de temperaturas</h1>
                </div>
                <div className="contenedorCard">
                    <p className="subtitleCuadricula"> A continuación se muestran los sensores registrados, ubicacion y la ultima hora que se registró su lectura</p>                    
                </div>
                <div className="contenedorCardTabla">

                    <TableContainer>
                        <Table className="monitorTemperaturas">
                            <TableHead>
                                <TableRow className="tabla">
                                    <TableCell ><p className="tablaTitulos">Sensor</p></TableCell>                                
                                    <TableCell ><p className="tablaTitulos"> Temperatura</p></TableCell>                                
                                    <TableCell ><p className="tablaTitulos">Ubicacion</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carga}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>
                <Link to="./consulta" className="enlace"><div className="boton">Consultar Base</div> </Link>
            </div>
        );
    }
};
export default Temperature;