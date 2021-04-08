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
        // if(this.state.cargando===1){
        //     //console.log("ESta cargando")
        //     setTimeout(()=>{
        //         this.setState({
        //             cargando: 0
        //         })
        //     },2500)
        // }
        // fetch('https://instrumentacionline.ddns.net:5002/imagenes/mesas1.jpg',
        // {
        //     method: 'GET',
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     headers:{
        //         'Content-Type': 'image/jpeg' 
        //     }
        // }
        // )
        // .then( response => {
        //     console.log(response)
        //     //response.blob()            
        // }).catch( err => {
        //     console.log(err.message)
        // })
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
        /*
        let imagen = ''
        console.log(this.props)
        console.log(this.state)
        
       
        if(this.props.anchura>970){
            {
                this.state.cargando ? 1 :
                <Carga cargando={this.state.cargando} />
            }
            imagen = <img onLoad={()=>{this.setState({cargando: 0})}} src={`${this.props.direccion}`} className="vistaMesas"/>
            // if(this.state.cargando===1){
            //     imagen = <Carga cargando={this.state.cargando}/>
            // } else {
            //     imagen = <img onLoad={()=>{console.log("Entendiendo que carga")}} src={`${this.props.direccion}`} className="vistaMesas"/>
            // }
             
            
        } else {
            if(this.state.cargando===1){
                imagen = <Carga cargando={this.state.cargando}/>
            } else {
                imagen = <img onLoad={()=>{console.log("Entendiendo que carga")}} src={`${this.props.direccion}`} className="vistaMesas"/>
            }
            
            
        }  
        */
        
        return(
            <Fragment>

                {
                    this.state.cargando ? 1 :
                    <Carga cargando={this.state.cargando} />
                }
                <img onLoad={()=>{this.setState({cargando: 1})}} src={`${this.props.direccion}`} className="vistaMesas"/>
                {/* {imagen} */}
            </Fragment>
            
        )
    }
}
export default CargaImagen;