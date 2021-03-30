import React, {Component} from 'react';
import config from '../config.js'

class Equipos extends Component{
    constructor(){
        super();
        this.state = {

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
        })
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