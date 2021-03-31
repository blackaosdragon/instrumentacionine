import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableBody, Collapse, Box } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import TablaDatos from './equiposFull.js';
import config from '../../config.js'

import Cargando from "../carga.js";

const consulta_equipos = config.API_URL;
//const consulta_equipos = "https://instrumentacionline.ddns.net:5002/insertar_token"

const styles = {
    root: {
        minWidth: 480
    }
};

class VistaEquipos extends Component{
    constructor(props){
        super(props)
        this.state = {
            nivel: this.props.level,
            cargando: true,
            llave: 99,
            mostrar: false
        }
    }
    
    
    componentDidUpdate(prevProps, prevState){
        if(prevState.llave!==this.state.llave){
            console.log("Cambia la llave a: ",this.state.llave);
            this.peticion_de_equipos(this.state.llave);
        }
        
    }
    manejadorClick = (e) => {
        
        let palabra = e.target.textContent
        let asignar = "";
        //console.log(palabra)
        for(let i = 0; i<palabra.length; i++){
            //console.log(palabra[i]);
            if(palabra[i]==" " && i>=5 && i<=12){
                //console.log("Espacio");
                asignar+=palabra[i]
            } else if(palabra[i]==" "){
                //console.log("Espacio en blanco inecesario")
            } else {
                //console.log("Se agregará: ",palabra[i]);
                asignar+=palabra[i]
            }
            
        }
        //console.log(asignar);
        //console.log(asignar.length);
        
        this.setState({
            [asignar]: !this.state[asignar]
        })
        console.log(palabra)
        console.log(this.state[asignar])
        console.log(this.state);
        //console.log(this.state);
        
        /*
        this.setState({
            mostrar: !this.state.mostrar
        })
        */

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
            console.log(data);
            data.map( (equipo) => {
                console.log(equipo);
                //console.log(equipo.Nombre.length);
                this.setState({
                    [equipo.Nombre]: false
                })
            })
            //console.log(this.state);
            this.setState({
                equipos: data
            })
            console.log(this.state);
            
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
        this.setState({

        })
    }
    render(){
        const {classes} = this.props;
        
        let equipos = ''
        if(this.state.equipos===undefined){

        } else {
            equipos = this.state.equipos.map( (data,id)=>{
                return(
                    <React.Fragment>
                        <Table >
                        <TableRow className="campo" onClick={this.manejadorClick} >
                            {/*<TableCell align="center"><KeyboardArrowDownIcon className="desplegable" /></TableCell>*/}
                            <TableCell align="center" name={data.Nombre}> <p className="tablaDatos" name={data.Nombre}> {data.Nombre} </p></TableCell>
                            {/*<TableCell > <p className="tablaDatos"> {data.Unidad} </p></TableCell>*/}
                            {/*<TableCell align="center"> <p className="tablaDatos"> {data.Ubicacion} </p></TableCell>*/}
                        </TableRow>     
                            <div >
                            <Collapse in={this.state[data.Nombre]}>
                                <Table>
                                <TableHead className="tablaDetalles">
                                    <TableCell > <p className="BarraTitulo">Ubicacion</p></TableCell>
                                    <TableCell > <p className="BarraTitulo"> Unidad </p> </TableCell>
                                    <TableCell> <p className="BarraTitulo"> Equipo </p></TableCell>
                                </TableHead>
                                <TableRow>
                                    <TableCell> <p className="descripciones"> {data.Ubicacion} </p> </TableCell>
                                    <TableCell> <p className="descripciones"> {data.Unidad} </p></TableCell>
                                    <TableCell> <p className="descripciones"> {data.General} </p></TableCell>
                                </TableRow>
                                </Table>
                            </Collapse>
                            </div>
                                        
                            </Table>              
                    </React.Fragment>
                    
                )
                
            })
        }
        //console.log(this.props)
        if(this.props.anchura>970){
            return(
                <div> 
                    <Cargando cargando={this.state.cargando} />
                    
                    <div className="tablaEquipos">
                    <TableContainer >
                        <Table >
                        <TableHead>
                            <TableRow className="tabla">
                                {/*<TableCell />*/}
                                <TableCell  align="center" ><p className="tablaTitulos">Equipo</p></TableCell>
                                {/*<TableCell align="center"><p className="tablaTitulos">Unidad</p></TableCell>*/}
                                {/*<TableCell align="center"><p className="tablaTitulos">Ubicacion</p></TableCell>*/}
                            </TableRow>
                        </TableHead>
                            <TableBody>
                                    {equipos}
                                    
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                    
                    <TablaDatos data={this.state.equipos} />
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
export default withStyles(styles)(VistaEquipos);