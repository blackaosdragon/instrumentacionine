import React, {Component} from 'react';
import config from '../config.js'
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Collapse,Box,Modal} from '@material-ui/core'
import mesa from "../images/mesa_pintada.jpg"
import mesa1 from '../images/mesas/mesa1.jpg'
//import mesa2 from '../images/mesas/mesa2.jpg'
//import mesa3 from '../images/mesas/mesa3.jpg'
//import mesa4 from '../images/mesas/mesa4.jpg'
//import mesa5 from '../images/mesas/mesa5.jpg'
//import mesa6 from '../images/mesas/mesa6.jpg'
//import mesa7 from '../images/mesas/mesa7.jpg'
import {SkipPreviousIcon,ArrowBackIosIcon,ArrowForwardIosIcon,SkipNextIcon} from '@material-ui/icons/';



const imagenes = [
    mesa1
]

class Equipos extends Component{
    constructor(){
        super();
        this.state = {
            cargando: 1,
            galeria: false,
            foto: 0
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
            //console.log(info);
            this.setState({
                tabla: info.data,
            })
            info.data.map( element => {
                this.setState({
                    [element.id]: false,
                    [`${element.equipo_abrev}${element.id}`]: false
                })
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
    manejadorClick = (e) => {  
        console.log(e.currentTarget.id);
        console.log(e.currentTarget);
        let id=parseInt(e.currentTarget.id) + 1;
        this.setState({
            [id]: !this.state[id]
        })
    }
    galeriaClick = (e) => {
        console.log(e.currentTarget);
        console.log(e.currentTarget.textContent);
        console.log(e.currentTarget.data);
        this.setState({
            [e.currentTarget.textContent]: true
        })
    }
    cerrarGaleria = (nombre) => {
        this.setState({
            [nombre]: false
        })
        console.log("Cerrar imagenes");
    }
    render(){
        console.log(this.state);
        
        
        let data = '';
        if (this.state.cargando==1){
            data = <div className="cargando"></div>
        } else {
            if(this.props.anchura>970){
                data = this.state.tabla.map( (element,counter)=>{
                    //console.log(this.state[counter+1]);
                    if(counter%2==0){
                        return(
                            <React.Fragment >
                                <TableRow id={counter} style={{backgroundColor: "#ffffff"}} key={element}  className="desplegable" onClick={this.manejadorClick}>
                                    <TableCell align="center" > <p className="tablaDatos"> {element.id} </p></TableCell>
                                    <TableCell align="center"> <p className="tablaDatos"> {element.equipo} </p></TableCell>
                                    <TableCell align="center"> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                    <TableCell align="center"> <p className="tablaDatos"> {element.unidad} </p></TableCell>
                                    <TableCell align="center"> <p className="tablaDatos"> {element.estado} </p></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={this.state[counter+1]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            {/*<Table size="small" aria-label="purchases">
                                            <TableRow align="center">
                                            <p className="tablaDatos">{element.inventario}</p>
                                            </TableRow>
                                            </Table>*/}
                                            <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow className="tabla">
                                                        <TableCell align="center"><p className="tablaTitulos">Marca</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Modelo</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Ubicacion</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">No Serie</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Fotos</p></TableCell>
                                                        
                                                    </TableRow>
                                                </TableHead>
                                            <TableBody>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.marca}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.modelo} </p></TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.ubicacion}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.serie}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{counter}</p> </TableCell>
                                                
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                <Modal open={this.state[`${element.equipo_abrev}${counter}`]} >
                                        
                                        
                                        <React.Fragment>
                                        <div className="botonFlotante" onClick={() => this.cerrarGaleria(`${element.equipo_abrev}${counter}`)}> X </div>
                                        <div className="botonFlotanteAtras"></div>
                                             <img src={imagenes[counter]} className="vistaMesas"/>
                                            <div className="botonFlotanteAdelante"></div>
                                        </React.Fragment>
                                    </Modal>
                            </React.Fragment>
                        )
                    } else {
                        return(
                            <React.Fragment>
                            <TableRow id={counter} style={{backgroundColor: "#b3b3b3"}} key={element} className="desplegable" onClick={this.manejadorClick}>
                                <TableCell align="center"> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.equipo} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.unidad} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                            <TableRow style={{backgroundColor: "#b3b3b3"}}>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={this.state[counter+1]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead className="tabla">
                                                    <TableRow>
                                                        <TableCell align="center"><p className="tablaTitulos">Marca</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Modelo</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Ubicacion</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">No Serie</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Fotos</p></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            <TableBody>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.marca}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.modelo} </p></TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.ubicacion}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.serie}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{counter}</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                <Modal open={this.state[`${element.equipo_abrev}${counter}`]} >
                                        
                                        
                                        <React.Fragment>
                                        <div className="botonFlotante" onClick={() => this.cerrarGaleria(`${element.equipo_abrev}${counter}`)}> X </div>
                                        <div className="botonFlotanteAtras"></div>
                                             <img src={imagenes[counter]} className="vistaMesas"/>
                                            <div className="botonFlotanteAdelante"></div>
                                        </React.Fragment>
                                    </Modal>
                                
                        </React.Fragment>
                        )
                    }
                })                
            } else {
                data = this.state.tabla.map( (element,counter)=>{
                    if(counter%2==0){
                        return(
                            <React.Fragment>
                            <TableRow id={counter} style={{backgroundColor: "#ffffff"}} key={element} className="desplegable" onClick={this.manejadorClick}>
                                <TableCell align="center"> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.equipo_abrev} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.unidad_abrev} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={this.state[counter+1]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead >
                                                    <TableRow className="tabla">
                                                        <TableCell align="center"><p className="tablaTitulos">Marca</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Modelo</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Ubicacion</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">No Serie</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos" >Fotos</p></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            <TableBody>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.marca}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.modelo} </p></TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.ubicacion}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.serie}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{counter}</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow> 
                                <Modal open={this.state[`${element.equipo_abrev}${counter}`]} onClick={ () => this.cerrarGaleria(`${element.equipo_abrev}${counter}`)}>
                                    <React.Fragment>
                                        <img src={imagenes[counter]} className="vistaMesasMovil"/>
                                    </React.Fragment>
                                </Modal>                                
                                                              
                            </React.Fragment>
                        )
                    } else {
                        return(
                            <React.Fragment>
                            <TableRow id={counter} style={{backgroundColor: "#b3b3b3"}} key={element} className="desplegable" onClick={this.manejadorClick}>
                                <TableCell align="center"> <p className="tablaDatos"> {element.id} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.equipo_abrev} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.inventario} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.unidad_abrev} </p></TableCell>
                                <TableCell align="center"> <p className="tablaDatos"> {element.estado} </p></TableCell>
                            </TableRow>
                            <TableRow style={{backgroundColor: "#b3b3b3"}}>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={this.state[counter+1]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead >
                                                    <TableRow className="tabla">
                                                        <TableCell align="center"><p className="tablaTitulos">Marca</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Modelo</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Ubicacion</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">No Serie</p></TableCell>
                                                        <TableCell align="center"><p className="tablaTitulos">Fotos</p></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            <TableBody>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.marca}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.modelo} </p></TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.ubicacion}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTexto">{element.serie}</p> </TableCell>
                                                <TableCell align="center"> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{counter}</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                <Modal open={this.state[`${element.equipo_abrev}${counter}`]} onClick={ () => this.cerrarGaleria(`${element.equipo_abrev}${counter}`)}>
                                    <React.Fragment>
                                        <img src={imagenes[counter]} className="vistaMesasMovil"/>
                                    </React.Fragment>
                                </Modal>
                            </React.Fragment>
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
                                        <TableCell align="center"><p className="tablaTitulos">Equipo</p></TableCell>                                
                                        <TableCell align="center"><p className="tablaTitulos"> Inventario</p></TableCell>                                
                                        <TableCell align="center"><p className="tablaTitulos">Unidad</p></TableCell>
                                        <TableCell align="center"><p className="tablaTitulos">Estado</p></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
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