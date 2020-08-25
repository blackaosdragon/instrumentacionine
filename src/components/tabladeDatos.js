import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core'
import { green } from '@material-ui/core/colors';
let datos = ''
let fecha = ''

class TableFromDataBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible : "collapse",
            data: []
        }
    }
    componentDidMount(){
        //console.log(this.props);
        this.setState((state,props)=>{
            return{data: props.data}
        })
        this.setState({
            data: this.props.data
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.data!==prevProps.data){
            //console.log("Las props de dato han cambiado");
            this.setState({
                visible: "visible"
            })
        }
    }
    asignarFecha = (data) => {
        console.log(data);
        for(let i=0; data.length>i;i++){
            fecha = fecha + data[i];
        }
    }

    render(){
        datos = this.props.data.map( (element,id) => {
            if(id%2==0){
                return(
                    <TableRow >
                        <TableCell><p className="tablaDatos">{element.ubicacion}</p></TableCell>
                        <TableCell><p className="tablaDatos">{element.temperatura}°C</p></TableCell>
                        <TableCell><p className="tablaDatos">
                            {element.dia} / {element.mes} / {element.año} - {element.hora} : {element.minuto} hrs
                        </p></TableCell>
                    </TableRow>
                )
            } else{
                return(
                    <TableRow style={{backgroundColor: '#cccccc'}}>
                        <TableCell><p className="tablaDatos">{element.ubicacion}</p></TableCell>
                        <TableCell><p className="tablaDatos">{element.temperatura}°C</p></TableCell>
                        <TableCell><p className="tablaDatos">
                            {element.dia} / {element.mes} / {element.año} - {element.hora} : {element.minuto} hrs
                        </p></TableCell>
                    </TableRow> 
                )
            }
        })  

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
                        {datos}
                    </TableBody>
                </Table>
                
            </TableContainer>
        </div>
        )
    }
}
export default TableFromDataBase