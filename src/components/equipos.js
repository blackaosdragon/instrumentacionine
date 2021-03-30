import React, {Component} from 'react';
import config from '../config.js'
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core'

class Equipos extends Component{
    constructor(){
        super();
        this.state = {
            cargando: 1
        }
    }
    componentDidMount(){
        let data = {
            usuario: 'isaac',
            equipos: 'mesas'
        }
        fetch(`${config.API_URL}/ginecologia/3a/mesas`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then( response => {
            return response.json();
        }).then( info => {
            console.log(info);
            this.setState({
                tabla: info.data
            })            
        }).then( () => {
            this.setState({
                cargando: 0
            })

        })
        .catch( err => {
            console.log(err);
            alert("Error del servidor intente mas tarde");
        })
    }
    render(){
        console.log(this.state);

        let data = '';
        if (this.state.cargando==1){
            data = <div className="cargando"></div>
        } else {
            if(this.props.anchura>970){
                data = this.state.tabla.map( (element,counter)=>{
                    if(counter%2==0){
                        return(
                            <TableRow id={counter} style={{backgroundColor: "#ffffff"}} key={element}>
                                <TableCell> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.equipo} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.unidad} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                        )
                    } else {
                        return(
                            <TableRow id={counter} style={{backgroundColor: "#b3b3b3"}} key={element}>
                                <TableCell> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.equipo} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.unidad} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                        )
                    }
                })                
            } else {
                data = this.state.tabla.map( (element,counter)=>{
                    if(counter%2==0){
                        return(
                            <TableRow id={counter} style={{backgroundColor: "#ffffff"}} key={element}>
                                <TableCell> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.equipo_abrev} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.unidad_abrev} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                        )
                    } else {
                        return(
                            <TableRow id={counter} style={{backgroundColor: "#b3b3b3"}} key={element}>
                                <TableCell> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.equipo_abrev} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.unidad_abrev} </p></TableCell>
                                <TableCell> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                        )
                    }
                })
            }
            
        }
        if(this.props.anchura>970){
            return(
                <div>
                    <div className="contenedorCardPrincipal">
                    <h1 className="titulos">Equipos</h1>
                    </div>
                    <div className="contenedorCardTabla">
                    <TableContainer>
                            <Table className="monitorTemperaturas">
                                <TableHead>
                                    <TableRow className="tabla">
                                    <TableCell ><p className="tablaTitulos">ID </p></TableCell>
                                        <TableCell ><p className="tablaTitulos">Equipo</p></TableCell>                                
                                        <TableCell ><p className="tablaTitulos"> Inventario</p></TableCell>                                
                                        <TableCell ><p className="tablaTitulos">Unidad</p></TableCell>
                                        <TableCell ><p className="tablaTitulos">Estado</p></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {data}
                                </TableBody>
                            </Table>
    
                        </TableContainer>
                        </div>
                    
                    
                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenSup">.</div>
                    <div className="contenedorCardMovil">
                    <h1 className="titulos">Equipos</h1>
                    </div>
                    <div className="contenedorCardTabla">
                    
                    <TableContainer>
                            <Table className="monitorTemperaturas">
                                <TableHead>
                                    <TableRow className="tabla">
                                        <TableCell ><p className="tablaTitulos">ID </p></TableCell>
                                        <TableCell ><p className="tablaTitulos">Equipo </p></TableCell>
                                        <TableCell ><p className="tablaTitulos"> Inventario</p></TableCell>                                
                                        <TableCell ><p className="tablaTitulos">Unidad  </p></TableCell>
                                        <TableCell ><p className="tablaTitulos">Estado</p></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data}
                                </TableBody>
                            </Table>
    
                        </TableContainer>
                        </div>
                    
                   
                    
                </div>
            )

        }
        
    }
}
export default Equipos;