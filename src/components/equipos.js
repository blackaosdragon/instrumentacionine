import React, {Component} from 'react';

class Equipos extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        console.log(this.props);
        if(this.props.anchura>970){
            return(
                <div>
                    <div className="contenedorCardPrincipal">
                    <h1 className="titulos">Equipos</h1>
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
                   
                    
                </div>
            )

        }
        
    }
}
export default Equipos;