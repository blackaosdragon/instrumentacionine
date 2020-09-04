import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Monitor from './temperatura.js';
import { FormControl, FormControlLabel,FormGroup,Switch } from '@material-ui/core';

class PanelDeControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            notificaciones: 0
        }
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(prevState.notificaciones!=this.state.notificaciones){
            
        }
    }
    componentDidMount = () => {
        console.log(Notification.permission);
        if(Notification.permission==='default'){
            this.setState({
                notificaciones: false
            })
        } else if(Notification.permission==='granted'){
            this.setState({
                notificaciones: true
            })
        }
        this.setState({
            notifis: this.props.notifis
        })
    }
    session = () => {
        const { handleStatus } = this.props;
        handleStatus(0);
    }
    notifis = () => {
        const { handleNotifis,notifis } = this.props;
        handleNotifis(!notifis);
        
    }
    handleNotificaciones = () => {

    }
    botonNotifis = () => {
        this.setState({
            notificaciones: !this.state.notificaciones
        })
    }
    render(){
        
        //console.log("Panel");
        if(this.props.anchura>970){
            return(
                <div>{/*
                <div className="contenedor">
                    <div className="contenedor-item item1">{this.props.name}</div>
                    
                    <div className="contenedor-item item2">
                    2
                    </div>
                    <div className="contenedor-item item3"> 3 </div>
                    <div className="contenedor-item item4"> 4 </div>
                    <div className="contenedor-item item5"> 5 </div>
                    
                </div> */}
                <FormControl className="contenedorCard">
                    {/*
                    <FormGroup>
                        <FormControlLabel 
                          value="top"
                          control={<Switch onClick={this.notifis} color="primary" checked={this.props.notificaciones}/>}
                          label="Notificaciones"
                          labelPlacement="top"
                        />
                        
                    </FormGroup>
                    */}
                    
                </FormControl>
                <Monitor anchura={this.props.anchura} />
                
                <Link className="link" to="./panel"><div className="boton" onClick={this.session}>Cerrar sesión</div></Link> 
                {/*
                <FormGroup className="switchFirebase">
                        <FormControlLabel 
                          value="bottom"
                          control={<Switch onClick={this.botonNotifis} color="primary" checked={this.state.notificaciones}/>}
                          label="Notificaciones"
                          labelPlacement="bottom"

                        />
                        
                    </FormGroup>
                */}
                

                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenMovilSuperior">.</div>
                    <Monitor anchura={this.props.anchura}/>
                    <Link className="link" to="./panel"><div className="boton-movile" onClick={this.session}>Cerrar sesión</div></Link> 
                    <div className="boton-movile">
                      <FormControlLabel 
                          value="bottom"
                          control={<Switch onClick={this.botonNotifis} color="primary" checked={this.props.notificaciones}/>}
                          label="Notificaciones"
                          labelPlacement="bottom"
                      />
                    </div>
                </div>
            )
        }
        
    }
}
export default PanelDeControl;