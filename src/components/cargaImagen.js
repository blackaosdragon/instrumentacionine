import React, { Component,Fragment} from 'react';

class CargaImagen extends Component{
    render(){
        if(this.props.anchura>970){
            return(
                <Fragment>
                    Imagen escritorio
                </Fragment>
            )

        } else {
            return(
                <Fragment>
                    Imagen movil
                </Fragment>
            )

        }
    return(
        
        <React.Fragment>
            {console.log(direccion)}
            <div>
                Imagen
            </div>
        </React.Fragment>
    )
    }
}
export default CargaImagen;