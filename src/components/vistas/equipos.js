import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableBody } from '@material-ui/core';

import Cargando from "../carga.js";

const consulta_equipos = 'https://instrumentacionline.ddns.net:5002/equipos'
//const consulta_equipos = "https://instrumentacionline.ddns.net:5002/insertar_token"

class VistaEquipos extends Component{
    constructor(props){
        super(props)
        this.state = {
            nivel: this.props.level,
            cargando: true,
            llave: 99,
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.llave!==this.state.llave){
            console.log("Cambia la llave a: ",this.state.llave);
            this.peticion_de_equipos(this.state.llave);
        }
    }
    peticion_de_equipos = (llave) => {
        let payload = {
            llave: llave
        }
        fetch(`${consulta_equipos}`,{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type':'application/json'
            },
        }).then( response => {
            return response.json()
        })
        .then( data => {
            this.setState({
                equipos: data
            })
        }).catch( err => {
            console.log(err);
        })        
    }
    componentDidMount(){
        this.setState({
            cargando: false
        })
        if(this.props.level== 1 || this.props.level == 0){
            //console.log("Cambio de llave a 0")
            this.setState({
                llave: 0
            })
                       
        } else if (this.props.level==2){
            //console.log("Cambio de llave a 1")
            this.setState({
                llave: 1
            })
            
        } else if (this.props.level==3){
            //console.log("No puede ver equipos")
        }
        
        console.log("State: ",this.state);
    }
    render(){
        let equipos = ''
        if(this.state.equipos===undefined){

        } else {
            equipos = this.state.equipos.map( (data,id)=>{
                console.log(data)
                return(
                        <TableRow>
                            <TableCell align="left"> <p className="tablaDatos"> {data.Nombre} </p></TableCell>
                            <TableCell > <p className="tablaDatos"> {data.Unidad} </p></TableCell>
                            <TableCell align="center"> <p className="tablaDatos"> {data.Ubicacion} </p></TableCell>
                        </TableRow>
                    
                )
                
            })
        }
        console.log(this.props)
        if(this.props.anchura>970){
            return(
                <div> 
                    <Cargando cargando={this.state.cargando} />
                    
                    <div className="tablaEquipos">
                    <TableContainer >
                        <Table >
                        <TableHead>
                            <TableRow className="tabla">
                                <TableCell ><p className="tablaTitulos">Equipo</p></TableCell>
                                <TableCell align="center"><p className="tablaTitulos">Unidad</p></TableCell>
                                <TableCell align="center"><p className="tablaTitulos">Ubicacion</p></TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>
                                    {equipos}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                    
                    
                    
                </div>
            )
            
        } else {
            return(
                <div> 
                    <Cargando cargando={this.state.cargando} />
                    <div className="margenSup">.</div> 
                    Vista Movil
                </div>
            )
        }
    }
}
export default VistaEquipos;