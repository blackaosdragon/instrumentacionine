import React, { Component } from 'react';

import termometro from '../../images/sensores.jpeg'
import equipos from '../../images/equipos.jpeg'
import { Link } from "react-router-dom";


export class Nivel0 extends Component{
    render(){
        if(this.props.anchura>970){
            return(
                <div>
                    <div className="grid-container">
                        <div className="contenedorCard-boton">
                            <img src={termometro} alt="sensor" className="imagenCard"/>
                            <h1>Sensores</h1>  
                        </div>
                        <div className="contenedorCard-boton"> 
                            <img src={equipos} alt="sensor" className="imagenExperimento"/>
                            <h1>Equipos </h1>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenSup">.</div>
                    <div>
                        <div className="contenedorCardMovil">
                        <img src={termometro} alt="sensor" className="imagenCard"/>
                            <h1>Sensores</h1>
                        </div>
                        <div className="contenedorCardMovil"> 
                            <h1>Equipos </h1>
                        </div>
                    </div>
                </div>
            )
            
        }
        
    }
}
export class Nivel1 extends Component{
    render(){
        if(this.props.anchura>970){
            return(
                <div>
                    <div className="grid-container">
                        <div className="contenedorCard-boton">
                            <img src={termometro} alt="sensor" className="imagenCard"/>
                            <h1>Sensores</h1>  
                        </div>
                        <div className="contenedorCard-boton"> 
                            <h1>Equipos </h1>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenSup">.</div>
                    Vista movil nivel 1
                </div>
            )
        }
        
    }
}
export  class Nivel2 extends Component{
    render(){
        if(this.props.anchura>970){
            return(
                <div>
                    <div className="contenedor-grid-2">
                        <div className="grid-item-1"><Link to="./temperatura" className="enlace"><p className="centrar-parrafo">Sensores</p></Link></div>
                        <div className="grid-item-2"><Link to="./equipos" className="enlace"><div><p className="centrar-parrafo">Equipos</p></div></Link></div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenMovilSuperior">.</div>
                    
                        <div className="contenedorCardMovil-otro"><Link to="/temperatura" className="enlace"><p className="parrafo-movil">Sensores</p></Link></div>
                        <div className="contenedorCardMovil-otro"><Link to="/equipos" className="enlace"><p className="parrafo-movil">Equipos</p></Link></div>
                                      
                </div>
            )
        }

        
    }
}
export class Nivel3 extends Component{
    render(){
        if(this.props.anchura>970){
            return(
                <div>
                    <div className="contenedor-grid">
                        <div className="contorno">
                            <img src={termometro} alt="sensor" className="imagen"/>
                            <p className="parrafo">Sensores</p>
                        </div>
                    </div>                                        
                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenSup">.</div>

                    Vista movil nivel 3 Usuario
                </div>
            )
        }
        
    }
}