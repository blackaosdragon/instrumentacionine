import React, { Component } from 'react'

import Modal from '@material-ui/core/Modal';

class Loading extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen: this.props.cargando
        }
    }
    componentDidMount(){
        console.log("Componente cargado");
    }
    componentWillUpdate(prevProps){
        if(this.props.cargando!==prevProps.cargando){
            console.log("Props del modal cargando: ",this.props.cargando);
            if(this.props.cargando===false){
                this.setState({
                    modalOpen: false
                })
            } else if (this.props.cargando===true){
                this.setState({
                    modalOpen: false
                })
            }
        }
    }
    
    render(){
        //console.log("Props de cargando: ",this.props);
        //console.log("State de cargando: ",this.state);
        
        return (
            <Modal open={this.state.modalOpen} >
                <div className="cargaInvisible">
                    <div className="carga"></div>
                </div>
            </Modal>
        )
    }
}
export default Loading;