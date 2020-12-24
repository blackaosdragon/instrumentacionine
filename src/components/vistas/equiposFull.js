import React from 'react';
import { Table,TableCell, TableRow,TableHead,Collapse,TableBody, TableContainer } from '@material-ui/core'

class TablaDatos extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="contornoStandart">
                <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell>
                            <p>Item 1</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>

                    </TableRow>
                </Table>
                </TableContainer>
                
                {/*props.data.map( equipo => {
                    console.log(equipo.Nombre)
                    console.log(equipo)
                })*/}
                
            </div>
        )
    }    
}
export default TablaDatos;