import React, { Component,Fragment} from 'react';
import Carga from './carga.js'


class CargaImagen extends Component{
    constructor(){
        super();
        this.state = {
            cargando: 0
        }
    }
    componentDidMount(){
        
    }
    componentDidUpdate(prevProps,prevState){
        //console.log(this.props)
        //console.log(this.state)
        if(this.props.direccion!==prevProps.direccion){
            console.log("Cambio")
             this.setState({
                 cargando: 0
             })
        }
    }
    
    render(){
        const { anchura } = this.props
        if(anchura>970){
            return(
                <Fragment>
                    {
                        this.state.cargando ? 1 :
                        <Carga cargando={this.state.cargando} />
                    }
                    <img onLoad={()=>{this.setState({cargando: 1})}} src={`${this.props.direccion}`} className="vistaMesasDesktop"/>
                    {console.log(this.props.direccion)}
                </Fragment>
            )
        } else {
            return(
                <Fragment>
    
                    {
                        this.state.cargando ? 1 :
                        <Carga cargando={this.state.cargando} />
                    }
                    <img onLoad={()=>{this.setState({cargando: 1})}} src={`${this.props.direccion}`} className="vistaMesas"/>
                    {console.log(this.props.direccion)}
                    
                </Fragment>
                
            )
        }
        
    }
}
export default CargaImagen;