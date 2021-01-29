import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableBody } from '@material-ui/core';
let id;
let temp;
let body;
let lugares = ['Cámara dieto','Cámara farmacia','','','Taller']
let ubicaciones = ['Sótano','PB','1P','2P','3P','4P']

class Visor extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){

    }
    componentDidUpdate(prevState,prevPros){
        if(prevPros!=this.props){

        }
    }
    lectura_data = () => {
        let data = this.props.data
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
            console.log(`ID: ${id} Temp: ${temp}`)
        }
        
        
        
    }
    render(){
        let reloj = new Date()

        body = '';
        if(this.props.data===undefined){

        } else  {
            body = (
                <TableRow id={id} style={{backgroundColor: "#00284d"}} key={id}>
                    <TableCell> <p className="tablaDatos2"> {ubicaciones[id-1]} </p></TableCell>
                    <TableCell> <p className="tablaDatos2">{temp}°C</p></TableCell>
                    <TableCell> <p className="tablaDatos2"> {ubicaciones[id-1]} </p></TableCell>
                    <TableCell> <p className="tablaDatos2"> {reloj.getHours()} : {reloj.getMinutes()} </p></TableCell>
                </TableRow>
            )
        }
        
        this.lectura_data();
        return(
            <div>
                <div className="contenedorCardTabla">
    
    <TableContainer>
        <Table className="monitorTemperaturas">
            <TableHead>
                <TableRow className="tabla">
                    <TableCell ><p className="tablaTitulos">id</p></TableCell> 
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