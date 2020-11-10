import React, {Component} from "react";
import Boton from "./boton-importante.js";
//import KLSMartinArm from "../images/klsMartin.jpeg"
//import KLSMartinDes from "../images/KLSMartinDes.jpeg"
const protocolo = "https"
const server = "instrumentacionline"
//const puerto = "443"
const puerto = "5002"
const objetivo = "login"
const meta = "registro"
const end_point_login = `${protocolo}://${server}:${puerto}/${objetivo}`
const end_point_registro = `${protocolo}://${server}:${puerto}/${objetivo}`
const link_ingresar = "/panel";
const link_registro = "/registro"

class Empresa extends Component{
    render(){
        if (this.props.anchura>970){
            return(
                <div>
                    <div className="contenedorCard">
                        <h1 className="titulos">Empresa</h1>
                    </div>
                    <div className="contenedorCard">
                        <p className="subtitleCuadricula">En Instrumentación y Electromecánica nos dedicamos a la instalacion, mantenimiento preventivo y reparación de lamparas quirúrgicas, equipos de esterilizacion, equipos de red fria, microscopios y mas equipos medicos y de laboratorio</p>
                    </div>
                    <div>
                        
                    </div>
                    <Boton name="Ingresa" endPoint={end_point_login} link={link_ingresar} anchura={this.props.anchura}></Boton>
                    
                    <Boton name="Registrate" endPoint={end_point_registro} link={link_registro} anchura={this.props.anchura}></Boton>
                    
                    
                </div>
            )

        } else {
            return(
                <div>
                    <div className="margenSup">.</div>
                    <div className="contenedorCardMovil">
                        <h1 className="titulos">Empresa</h1>                    
                    </div>
                    <div className="contenedorCardMovil">
                        <p className="subtitleCuadricula">En Instrumentación y Electromecánica nos dedicamos a la instalacion, mantenimiento preventivo y reparación de lamparas quirúrgicas, equipos de esterilizacion, equipos de red fria, microscopios y mas equipos medicos y de laboratorio</p>
                    </div>
                    <Boton name="Ingresa" endPoint={end_point_login} link={link_ingresar} anchura={this.props.anchura}/>
                    <Boton name="Registrate" endPoint={end_point_registro} link={link_registro} anchura={this.props.anchura}/>
                
                </div> 
            )
                       
        }
        
    }
}
export default Empresa