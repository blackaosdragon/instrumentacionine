import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core'
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
        console.log(this.props);
        this.setState((state,props)=>{
            return{data: props.data}
        })
        this.setState({
            data: this.props.data
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.data!==prevProps.data){
            console.log("Las props de dato han cambiado");
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
        datos = this.props.data.map( element => 
            (
                
            <TableRow >
                <TableCell><p className="tablaTitulos">{element.ubicacion}</p></TableCell>
                <TableCell><p className="tablaTitulos">{element.temperatura}°C</p></TableCell>
                <TableCell><p className="tablaTitulos">
                    {element.fecha[11]}{element.fecha[12]}:
                    {element.fecha[14]}{element.fecha[15]} hrs {"  "}
                    {element.fecha[8]}{element.fecha[9]}/
                    {element.fecha[5]}{element.fecha[6]}/
                    {element.fecha[0]}{element.fecha[1]}{element.fecha[2]}{element.fecha[3]}
                </p></TableCell>
            </TableRow>                    
            ))  

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