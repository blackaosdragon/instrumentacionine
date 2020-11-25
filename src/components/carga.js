import React, { Component } from 'react'

import Modal from '@material-ui/core/Modal';

class ModalDeCarga extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen: true
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.cargando !== this.props.cargando){
            if(this.props.cargando === false){
                this.setState({
                    modalOpen: false
                })          
            }
            if(this.props.cargando === true){
                this.setState({
                    modalOpen: true
                })
            }
        
        }
    }
    render(){
        //console.log(this.props);
        console.log(this.state);
        
        return (
            <Modal open={this.state.modalOpen} >
                <div className="cargaInvisible">
                    <div className="carga"></div>
                </div>
            </Modal>
        )
    }
}
export default ModalDeCarga;