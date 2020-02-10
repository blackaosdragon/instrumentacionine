import React, {Component} from "react"
//import KLSMartinArm from "../images/klsMartin.jpeg"
//import KLSMartinDes from "../images/KLSMartinDes.jpeg"


class Empresa extends Component{
    render(){
        if (this.props.anchura){
            return(
                <div>
                    <h1>Empresa</h1>
                    <p>En Instrumentación y Electromecánica nos dedicamos al mantenimiento preventivo y reparación lamparas quirúrgicas Felmex, Dewimed, KLSMartin entre otras marcas</p>
                    <p>Se realiza intalación de autoclaves</p>
                </div>
            )

        } else {
            return(
                <div>
                
            </div> 
            )
                       
        }
        
    }
}
export default Empresa