import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core'
let datos = ''
let fecha = ''
let por_meses = ''

class TableFromDataBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible : "collapse",
        }
    }
    componentDidMount(){
        
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.data!==prevProps.data){
            //console.log("Las props de dato han cambiado");
            this.setState({
                visible: "visible"
            })
        }
    }

    render(){
        
        por_meses = this.props.data.map( (element,id) => {
            if(this.props.anchura>970){
                if(id%2==0){
                    return(                        
                        <TableRow >
                            {console.log(element.Lugar)}
                            <TableCell><p className="tablaDatos">{element.Lugar}</p></TableCell>
                            <TableCell><p className="tablaDatos">{element.Temperatura}°C</p></TableCell>
                            <TableCell><p className="tablaDatos">
                                {element.Dia} / {element.Mes} / {element.Año} - {element.Hora} : {element.Minuto} hrs
                            </p></TableCell>
                        </TableRow>
                    )
                } else {
                    return(
                        <TableRow tyle={{backgroundColor: '#cccccc'}}>
                            <TableCell><p className="tablaDatos">{element.Lugar}</p></TableCell>
                            <TableCell><p className="tablaDatos">{element.Temperatura}°C</p></TableCell>
                            <TableCell><p className="tablaDatos">
                                {element.Dia} / {element.Mes} / {element.Año} - {element.Hora} : {element.Minuto} hrs
                            </p></TableCell>
                        </TableRow>
                    )
                }
            } else {
                if(id%2==0){
                    return(
                        <TableRow>
                            <TableCell><p className="tablaDatos">{element.temperatura}°C</p></TableCell>
                            <TableCell><p className="tablaDatos">
                                {element.hora} : {element.minuto} hrs
                            </p></TableCell>
                        </TableRow>
                    )
                } else {
                    return(
                        <TableRow style={{backgroundColor: '#cccccc'}}>
                            <TableCell><p className="tablaDatos">{element.temperatura}°C</p></TableCell>
                            <TableCell><p className="tablaDatos">
                                {element.hora} : {element.minuto} hrs
                            </p></TableCell>
                        </TableRow> 
                    )
                }
            }
        })
        if(this.props.anchura>970){
            return (
                <div style={{visibility: this.state.visible}} className="contenedorCardTabla">
                    
                    
                    <TableContainer>
                        <Table>
                            <TableHead>
                            <TableRow className="tabla">
                                <TableCell><p className="tablaTitulos">Sensor</p></TableCell>
                                <TableCell><p className="tablaTitulos">Temperatura</p></TableCell>
                                <TableCell><p className="tablaTitulos">Fecha</p></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {por_meses}
                                {/*datos*/}
                            </TableBody>
                        </Table>
                        
                    </TableContainer>
                </div>
                )
        } else {
            return (
                <div style={{visibility: this.state.visible}} className="contenedorCardTabla">
                    
                    <TableContainer>
                        <Table>
                            <TableHead>
                            <TableRow className="tabla">
                                
                                <TableCell><p className="tablaTitulos">Temperatura</p></TableCell>
                                <TableCell><p className="tablaTitulos">Fecha</p></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {datos}
                            </TableBody>
                        </Table>
                        
                    </TableContainer>
                </div>
                )            
        }
        
    }
}
export default TableFromDataBase