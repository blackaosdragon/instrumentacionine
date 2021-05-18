import React, {Component} from 'react';
import config from '../config.js';
import mesas from '../recursos.js';
import Imagen from './cargaImagen.js';
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Collapse,Box,Modal, TextField} from '@material-ui/core'
import mesa from "../images/mesa_pintada.jpg"
import mesa1 from '../images/mesas/mesa1.jpg'
import mesa2 from '../images/mesas/mesa2.jpg'
import mesa3 from '../images/mesas/mesa3.jpg'
import mesa4 from '../images/mesas/mesa4.jpg'
import mesa5 from '../images/mesas/mesa5.jpg'
import mesa6 from '../images/mesas/mesa6.jpg'

import {SkipPrevious,ArrowBackIos,ArrowForwardIos,SkipNext} from '@material-ui/icons';
import recursos from '../recursos.js';




const imagenes = [
    mesa1,mesa2,mesa3,mesa4,mesa5,mesa6
]
class Equipos extends Component{
    constructor(){
        super();
        this.state = {
            cargando: 1,
            galeria: false,
            foto: 0,
            movX: null,
            movY: null,
            mov: null,
            limiteSuperior: 2,
            datos: ""
        }
    }
    componentDidMount(){
        
        let data = {
            usuario: 'isaac',
            equipos: 'mesas',
            unidad: this.props.unidad
        }
        console.log(this.props)
        
        // fetch(`${config.API_URL}/ginecologia/3a/mesas`,{
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers:{
        //         'Content-Type': 'application/json' 
        //       },
        // }).then( response => {
        //     return response.json();
        // }).then( data => {
        //     console.log(data);
        // }).catch( err => {
        //     console.log(err)
        // })

        fetch(`${config.API_URL}/equipos/mesas`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then( response => {
            return response.json();
        }).then( info => {
            //console.log(info);
            console.log(info)
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
        /*       
        fetch(`${config.API_URL}/imagenes/mesas1`)
        .then(response => {
            response.arrayBuffer().then(buffer => )
        })*/
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.movX !== this.state.movX){
            //console.log("Se movio el touch");
            //console.log(this.props)
            if(prevState.movX < this.state.movX){
                //console.log("Se movio a la izquierda");
                //handleImages('left');
                this.setState({
                    mov: 'left'
                })
            } else {
                //handleImages('right');
                //console.log("Se movio a la derecha");
                this.setState({
                    mov: 'right'
                })
            }
        }        
    }
    manejadorClick = (e) => {  
        //console.log(e.currentTarget.id);
        //console.log(e.currentTarget);
        let id=parseInt(e.currentTarget.id) + 1;
        this.setState({
            [id]: !this.state[id]
        })
    }
    
    handleImages = (movimiento) => {
        
        if(movimiento==='right'){
            this.setState({
                foto: this.state.foto + 1
            })
        }
        if(movimiento==='left'){
            this.setState({
                foto: this.state.foto - 1
            })
        }
        this.setState({
            foto: this.state.foto+1
        })
        if(this.state.foto>this.state.limiteSuperior-2){
            this.setState({
                foto: 0
            })
        }
        
    }
    handleRetroceso = () => {
        this.setState({
            foto: this.state.foto -1
        })
        if(this.state.foto<=0){
            this.setState({
                foto: 3
            })
        }
    }
    hadlerMove = e => {
        //console.log(e.touches)
        if(e.touches===undefined){
            console.log("No se detecto movimiento")
        } else {
            this.setState({
                movX: e.touches[0].clientX,
                movY: e.touches[0].clientY
            })
        }
    }
    handlerEnd = () => {
        this.handleImages(this.state.mov)
    }
    
    galeriaClick = (e) => {
        


        //console.log(e.currentTarget);
        console.log(e.currentTarget.textContent);
        //console.log(e.currentTarget.data);
        this.setState({
            [e.currentTarget.textContent]: true
        })
    }
    cerrarGaleria = (nombre) => {
        this.setState({
            [nombre]: false
        })
        //console.log("Cerrar imagenes");
    }
    solicitarRecursos = (recursos) => {
        this.setState({
            limiteSuperior: recursos.length
        })
        //console.log(recursos.length)
    }
    capturarEnter = e => {
        
        if(e.keyCode === 13 ){
            // if(this.state.datos.length<1){
            //     alert("No puede hacer una busqueda vacía")
            // }
            this.setState({
                cargando: 1
            })
            //console.log("Enter captado");
            
            //console.log(this.props.unidad);
            //console.log(this.state.datos);
            //console.log(this.state.tabla);
            
            let payload = {
                payload: this.state.datos,
                unidad: this.props.unidad,
            }
            fetch(`${config.API_URL}/busqueda`,{
                method: 'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json' 
                  },
            }).then( response => {
                return response.json();
            }).then( info => {
                console.log(info.data)
                if(info.status===500){
                    alert('Error del servidor');
                } else {
                    this.setState({
                        tabla: info.data,
                    })
                    
                    info.data.map( element => {
                        this.setState({
                            [element.id]: false,
                            [`${element.equipo_abrev}${element.id}`]: false
                        })
                    })
                }
                
            }).then( ()=> {
                this.setState({
                    cargando: 0
                })
            }).catch(err => {
                alert("Su búsqueda no arrojo ningún resultado")
                console.log("Error en la búsqueda",err);

            })
        }
    }
    onChange = e => {
        
        this.setState({
            datos: [e.target.value]
        })
    }
    
    render(){
        //console.log(this.state);
        
        let data = '';
        if (this.state.cargando==1){
            data = <div className="cargando"></div>
        } else {
            if(this.props.anchura>970){
                data = this.state.tabla.map( (element,counter)=>{
                    //console.log(this.state[counter+1]);
                    if(counter%2==0){
                        if(mesas[`mesa${element.id}`] == undefined){
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
                                                <TableCell align="center" ><p className="noData">No disponible</p></TableCell>
                                                
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                
                            </React.Fragment>
                            )

                        } else {
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
                                                <TableCell align="center" onClick={()=>{this.solicitarRecursos(mesas[`mesa${element.id}`])}}> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{element.id}</p> </TableCell>
                                                
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                <Modal open={this.state[`${element.equipo_abrev}${element.id}`]} >
                                        <React.Fragment>
                                        <div className="botonFlotante" onClick={() => this.cerrarGaleria(`${element.equipo_abrev}${element.id}`)}> X </div>
                                        <div onClick={this.handleRetroceso} className="botonFlotanteAtras">Anterior </div>
                                        
                                        <Imagen direccion={mesas[`mesa${element.id}`][this.state.foto]} anchura={this.props.anchura}/>
                                             {/*<img src={mesas[`mesa${counter+1}`][this.state.foto]} className="vistaMesas"/>*/}
                                            <div onClick={()=>{this.handleImages()}} className="botonFlotanteAdelante">Siguiente</div>
                                        </React.Fragment>
                                    </Modal>
                            </React.Fragment>
                        )
                                        }
                    } else {
                        if(mesas[`mesa${element.id}`] == undefined){
                            return(
                                <React.Fragment >
                                    <TableRow id={counter} style={{backgroundColor: "#b3b3b3"}} key={element}  className="desplegable" onClick={this.manejadorClick}>
                                        
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
                                                    <TableCell align="center" ><p className="noData">No disponible</p></TableCell>
                                                    
                                                </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                    </TableRow>
                                    
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
                                                <TableCell align="center" onClick={()=>{this.solicitarRecursos(mesas[`mesa${element.id}`])}}> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{element.id}</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                <Modal open={this.state[`${element.equipo_abrev}${element.id}`]} >
                                        
                                        
                                        <React.Fragment>
                                        <div className="botonFlotante" onClick={() => this.cerrarGaleria(`${element.equipo_abrev}${element.id}`)}> X </div>
                                        <div onClick={this.handleRetroceso} className="botonFlotanteAtras">Anterior </div>
                                             {/*<img src={mesas[`mesa${counter+1}`][this.state.foto]} className="vistaMesas"/>*/}
                                             <Imagen direccion={mesas[`mesa${element.id}`][this.state.foto]} anchura={this.props.anchura}/>
                                             {<div onClick={this.handleImages} className="botonFlotanteAdelante">Siguiente</div>}
                                        </React.Fragment>
                                    </Modal>
                                
                        </React.Fragment>
                        )
                        }
                    }
                })                
            } else {
                data = this.state.tabla.map( (element,counter)=>{
                    if(counter%2==0){
                        if(mesas[`mesa${element.id}`] == undefined){
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
                                                <TableCell align="center"> <p className="noData">Sin imagenes</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow> 
                            </React.Fragment>
                            )
                        } else {
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
                                                <TableCell align="center" onClick={()=>{this.solicitarRecursos(mesas[`mesa${element.id}`])}}> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{element.id}</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow> 
                                <Modal open={this.state[`${element.equipo_abrev}${element.id}`]} >
                                    <React.Fragment>
                                        
                                        <div onClick={ () => this.cerrarGaleria(`${element.equipo_abrev}${element.id}`)} className="cerrar">Cerrar </div>
                                        <div onTouchMove={this.hadlerMove} onTouchEnd={this.handlerEnd}>
                                        <Imagen handleImages={this.handleImages} direccion={mesas[`mesa${element.id}`][this.state.foto]} anchura={this.props.anchura}/>
                                        </div>
                                        {/*<img onClick={this.handleImages} src={mesas[`mesa${counter+1}`][this.state.foto]} className="vistaMesasMovil"/>*/}
                                        
                                    </React.Fragment>
                                </Modal>                                
                                                              
                            </React.Fragment>
                        )
                        }
                    } else {
                        if(mesas[`mesa${element.id}`] == undefined){
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
                                                <TableCell align="center" > <p className="noData"> Sin imagenes</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
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
                                                <TableCell align="center" onClick={()=>{this.solicitarRecursos(mesas[`mesa${element.id}`])}}> <p className="tablaDatosTextoGaleria" data={`${element.equipo_abrev}${counter}`} name={`${element.equipo_abrev}${counter}`} onClick={this.galeriaClick}>{element.equipo_abrev}{element.id}</p> </TableCell>
                                            </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                                </TableRow>
                                {console.log("La mesa es")}
                                
                                {console.log(mesas[`mesa${element.id}`][this.state.foto])}
                                <Modal open={this.state[`${element.equipo_abrev}${element.id}`]} >
                                    <React.Fragment>
                                        
                                        <div onClick={ () => this.cerrarGaleria(`${element.equipo_abrev}${element.id}`)} className="cerrar">Cerrar </div>
                                        <div onTouchMove={this.hadlerMove} onTouchEnd={this.handlerEnd}>
                                            
                                        <Imagen direccion={mesas[`mesa${element.id}`][this.state.foto]} anchura={this.props.anchura}/>
                                        </div>
                                        
                                        {/*<img onClick={this.handleImages} src={mesas[`mesa${counter+1}`][this.state.foto]} className="vistaMesasMovil"/>*/}
                                        {/*<img onClick={()=>{this.setState({foto: this.state.foto+1})}} src={recursos[this.state.foto]} className="vistaMesasMovil"/>*/}
                                    </React.Fragment>
                                </Modal>
                            </React.Fragment>
                        )
                        }
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
                    <div className="contenedorCardBuscador">
                    <TextField variant="outlined" label="Buscar" onChange={this.onChange} onKeyUp={this.capturarEnter} value={this.state.datos}/>
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
                    <div className="contenedorCardBuscadorMovil">
                    <TextField variant="outlined" label="Buscar" onChange={this.onChange} onKeyUp={this.capturarEnter} value={this.state.datos}/>
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