import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Monitor from './temperatura.js';
import { FormControl, FormControlLabel,FormGroup,Switch } from '@material-ui/core';
import * as firebase from 'firebase/app'
import 'firebase/messaging'
firebase.initializeApp({
    apiKey: "AIzaSyCT0s6Exqtbh5W9J-Aa5XJLXsQyepD4aUk",
    authDomain: "home-8bea3.firebaseapp.com",
    databaseURL: "https://home-8bea3.firebaseio.com",
    projectId: "home-8bea3",
    storageBucket: "home-8bea3.appspot.com",
    messagingSenderId: "441591788565",
    appId: "1:441591788565:web:c0d31b9846f53b3ccbca1c",
    measurementId: "G-10C166HQ2R"
});
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BCw81StElUUliyjpdiWSPTrGQw5L0Fq5tqMLHZWriMKYgN6abD-jy8tkhjnD2gdWj5mdeHE5UJcfyWhpaxzi-yo');

class PanelDeControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            notificaciones: false
        }
    }
    obtener_token = () => {
        //console.log("token");
        messaging.getToken().then( token => {
            let payload = {
                token: token,
                activo: this.state.notificaciones
            }
            fetch('https://instrumentacionline.ddns.net/insertar_token',{
                method: 'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json' 
                },
            }).then( response => {response.json();})
            .then( response => {
                console.log(response);
            }).catch( error => {
                console.log(error);
            })
        })
        .catch( error => {
            console.log(error);
        })
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(prevState.notificaciones!=this.state.notificaciones){
            if( Notification.permission === 'default' && this.state.notificaciones===true){
                //console.log("Se pedira permiso de notificaciones");
                Notification.requestPermission().then( respuesta => {
                    if(respuesta=='denied'){
                        alert('No se ha otorgado notificaciones, contacte con el administrador');
                    } else if ( respuesta == 'granted'){
                        this.obtener_token();
                        //console.log("Respuesta granted")
                    }
                })
                .catch( error => {
                    console.log(error);
                })
            }
        }
    }
    componentDidMount = () => {
        //console.log(Notification.permission);
        if(Notification.permission=='default'){
            this.setState({
                notificaciones: false
            })
        } else if(Notification.permission=='granted'){
            this.setState({
                notificaciones: true
            })
            //console.log("Respuesta granted")
            this.obtener_token();

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
        //console.log(this.state.notificaciones)
        if(Notification.permission==='granted'){
        } else if( Notification.permission === 'default' && this.state.notificaciones===true){
        } else {
        }
    }
    
    render(){
        let interruptor = ''
        if (Notification.permission==='denied'){
            interruptor = <FormControlLabel disabled control={<Switch />} label="No se otorgo permiso" />
        } else if( Notification.permission === 'granted' ){
            interruptor = <FormControlLabel control={<Switch onClick={this.botonNotifis} color="primary" checked={this.state.notificaciones}/>} label="Notificaciones" />
        } else if ( Notification.permission === 'default'){
            interruptor = <FormControlLabel control={<Switch onClick={this.botonNotifis} color="primary" checked={this.state.notificaciones}/>} label="Notificaciones" />            
        }
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
                
                <FormGroup className="switchFirebase">
                        {/*<FormControlLabel 
                          value="bottom"
                          control={<Switch onClick={this.botonNotifis} color="primary" checked={this.state.notificaciones}/>}
                          label="Notificaciones"
                          labelPlacement="bottom"
                        />*/}
                        {interruptor}
                    </FormGroup>
                
                

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