import React, { Component,Fragment} from 'react';

class CargaImagen extends Component{
    render(){
        console.log(this.props.direccion)
        if(this.props.anchura>970){
            return(
                <Fragment>
                    <img src={`${this.props.direccion}`} className="vistaMesas"/>
                </Fragment>
            )

        } else {
            return(
                <Fragment>
                    <img src={`${this.props.direccion}`} className="vistaMesas"/>
                </Fragment>
            )

        }
    }
}
export default CargaImagen;