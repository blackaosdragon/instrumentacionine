import React, {Component} from 'react'

class Prohibido extends Component{
    
    render(){
        if(this.props.anchura>970){
            return(
                <React.Fragment>
                    <div className="contenedorCardPrincipal">
                        <h1 className="titulos">Prohibido</h1>
                    </div>
                </React.Fragment>
            )
        } else {
            return(
            <React.Fragment>
                <div className="margenSup">.</div>
                    <div className="contenedorCardMovil">
                        <h1 className="titulos">Prohibido</h1>
                    </div>
                </React.Fragment>
                )

        }
        
    }
}
export default Prohibido;