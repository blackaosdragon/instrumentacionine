import React, { Component } from "react";
import {Link} from "react-router-dom";

class BotonImportante extends Component{
    link = () => {
        console.log(this.props.endPoint)
    }
    render(){
        if(this.props.anchura>970){
            return(
                <Link className="enlace" to={this.props.link}>
                    <div className="boton" >
                        {this.props.name}
                    </div>
                </Link>
            )
        } else {
            return(
            <Link className="enlace" to={this.props.link}>
                <div className="boton-movile" onClick={this.link}>
                    {this.props.name}
                </div>
            </Link>
            )            
        }
    }
}
export default BotonImportante  