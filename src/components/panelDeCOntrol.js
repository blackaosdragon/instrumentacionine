import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Monitor from './temperatura.js';
import { FormControl, FormControlLabel,FormGroup,Switch } from '@material-ui/core';
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import Cargando from './carga.js';

const end_point = 'https://instrumentacionline.ddns.net/insertar_token';
const end_point_notifis = 'https://instrumentacionline.ddns.net/consultar_notifis';
const end_point_send_test_notifi = 'https://instrumentacionline.ddns.net/test_notificacion'

let messaging = null;
const inicializarFirebase = firebase.initializeApp({
    apiKey: "AIzaSyCT0s6Exqtbh5W9J-Aa5XJLXsQyepD4aUk",
    authDomain: "home-8bea3.firebaseapp.com",
    databaseURL: "https://home-8bea3.firebaseio.com",
    projectId: "home-8bea3",
    storageBucket: "home-8bea3.appspot.com",
    messagingSenderId: "441591788565",
    appId: "1:441591788565:web:c0d31b9846f53b3ccbca1c",
    measurementId: "G-10C166HQ2R"
});

if(firebase.messaging.isSupported()){
    messaging = inicializarFirebase.messaging();
    messaging.usePublicVapidKey('BCw81StElUUliyjpdiWSPTrGQw5L0Fq5tqMLHZWriMKYgN6abD-jy8tkhjnD2gdWj5mdeHE5UJcfyWhpaxzi-yo');
}


class PanelDeControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            notificaciones: false,
            cargando: true,
            visible: "collapse"
        }
    }
    obtener_token = () => {
        //console.log("token");
        messaging.getToken().then( token => {
            //alert(`El token es: ${token} solicitando a la base de datos`);
            let payload = {
                token: token,
                activo: this.state.notificaciones,
            }
            fetch(`${end_point}`,{
                method: 'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json' 
                },
            }).then( response => {
                return response.json();
            })
            .then( response => {
                if(response.actualizado === false){
                    this.setState({
                        cargando: false,
                        visible: "collapse"
                    });
                } else if (response.actualizado === true){
                    this.setState({
                        cargando: false,
                        visible: "visible"
                    });  
                } else {
                    //alert("Problema al conectarse con el servidor, intente más tarde");
                    this.setState({
                        cargando: false,
                        visible: "collapse"
                    })
                }
                console.log(response);
            }).catch( error => {
                this.setState({
                    cargando: false
                })
                console.log(error);
                alert("Problema al conectarse con el servidor, intente más tarde");
            })
        })
        .catch( error => {
            this.setState({
                cargando: false
            })
            alert("No se pudo obtener el token")
            console.log(error);
        })
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(prevState.notificaciones!=this.state.notificaciones){
            /*
            if(this.state.notificaciones==true){
                console.log("Mostrar");
                this.setState({
                    visible: "visible"
                })
            } else if(this.state.notificaciones==false){
                console.log("ocultar");
                this.setState({
                    visible: "collapse"
                })
            }
            */
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
                    alert("Error al comunicarse con la base de datos");
                    this.setState({
                        cargando: false,
                    })
                })
            } else if(Notification.permission==='granted' && this.state.notificaciones===false){
                //console.log("Se van a desactivar las notificaciones");
                this.obtener_token();
                this.setState({
                    cargando: false,
                    visible: "collapse"
                })
            } else if(Notification.permission==='granted' && this.state.notificaciones===true){
                this.obtener_token();
                this.setState({
                    cargando: false,
                    visible: "visible"
                })
                //console.log("Se van a activar las notificaciones");
            }
        }
    }
    componentDidMount = () => {
        
        this.setState({
            cargando: false
        })
        /*
        */
        //console.log(Notification.permission);
        /*
        if(this.state.notificaciones==true){
            this.setState({
                visible: "visible"
            })
        } else if (this.state.notificaciones==false){
            this.setState({
                visible: "collapse"
            })
        }
        */
        if(Notification.permission==='default'){
            this.setState({
                notificaciones: false,
                visible: "collapse"
            })
            this.setState({
                cargando: false
            })
        } else if(Notification.permission==='granted'){
            messaging.getToken().then( token => {
                //console.log(token);
                let payload = {
                    activo: 2,
                    token: token
                }
                fetch(`${end_point}`,{
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers:{
                        'Content-Type': 'application/json' 
                    },
                }).then( respuesta => {
                    return respuesta.json()
                })
                .then( respuesta => {
                    alert(`${respuesta}`);
                    console.log(respuesta);
                    
                    if(respuesta[0].activo===0){
                        this.setState({
                            visible: "collapse"
                        })
                    } else if(respuesta[0].activo===1){
                        this.setState({
                            visible: "visible"
                        })
                    } else if(respuesta===undefined){
                        console.log("porque?");
                    }
                    this.setState({
                        notificaciones: respuesta[0].activo,
                    })
                    //console.log(respuesta[0].activo);
                    this.setState({
                        cargando: false
                    })
                }).catch( err => {
                    alert("No se pudo comprobar el token, intente mas tarde");
                    alert(err);
                    this.setState({
                        cargando: false
                    })
                    console.log(err)
                });

            }).catch( error => {
                alert(`Error: ${error}`);
                    this.setState({
                        cargando: false
                    })
                    
                console.log(error);
            })
            /*
            let payload = {}
            
            */

            //alert(`Notificaciones: ${Notification.permission}, `)
            /*
            fetch(`${end_point_notifis}`).then( respuesta => { return respuesta.json()})
            .then( respuesta => {
               console.log(respuesta);
            }).catch( err => {
                console.log(err);
            })
            */
            /*
            this.setState({
                notificaciones: true
            })
            */
            //console.log("Respuesta granted")
            //this.obtener_token();

        } else if(Notification.permission==='denied'){
            this.setState({
                cargando: false,
                visible: "collapse"
            })
        }
    }
    session = () => {
        const { handleStatus } = this.props;
        handleStatus(0);
    }
    notifis = () => {
        const { handleNotifis,notifis } = this.props;
        handleNotifis(!notifis);
        
    }
    ultima_data = () => {
        fetch("https://instrumentacionline.ddns.net/socket").then((response)=>{
            return response.json()
        }).then((respuesta)=>{
            console.log(respuesta);
        }).catch( err => {
            console.log(err)
        })
    }
    test_notifi = () => {
        navigator.serviceWorker.ready.then( function(registration){
            registration.showNotification('Probando notificaciones',{
                body: 'Testeo de nofitificaciones satisfactorio',
                badge: '../../icono192x192.png',
                icon: '../../logo.png',
            })
        })
        fetch(`${end_point_send_test_notifi}`).then( response => {return response.json()})
        .then( response => {
            console.log(response)
        }).catch( err => {console.log(err)});
        
    }
    botonNotifis = () => {
        this.setState({
            cargando: true
        })
        this.setState({
            notificaciones: !this.state.notificaciones
        })
        
    }
    
    render(){
        
        
        let interruptor = ''
        if (Notification.permission==='denied'){
            interruptor = <FormControlLabel onClick={()=>{alert("Para activar las notificaciones borre el caché y los permisos de la página y al solicitar el permiso acepte el recibir notificaciones")}} disabled control={<Switch />} label="No se otorgo permiso" />
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
                <Cargando cargando={this.state.cargando}/>
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
                <div onClick={this.test_notifi} style={{visibility: this.state.visible}} className="boton-firebase">Probar notificaciones</div>
                
                </div>
            )
        } else {
            return(
                <div>
                    <Cargando cargando={this.state.cargando}/>
                    <div className="margenMovilSuperior">.</div>
                    <Monitor anchura={this.props.anchura}/>
                    <Link className="link" to="./panel"><div className="boton-movile" onClick={this.session}>Cerrar sesión</div></Link> 
                    <div className="boton-movile">
                      {/*<FormControlLabel 
                          value="bottom"
                          control={<Switch onClick={this.botonNotifis} color="primary" checked={this.props.notificaciones}/>}
                          label="Notificaciones"
                          labelPlacement="bottom"
                      />*/}
                      {interruptor}
                    </div>
                    <div onClick={this.test_notifi} style={{visibility: this.state.visible}} className="boton-firebase-movile" >
                        Probar notificaciones
                    </div>
                    
                </div>
            )
        }
        
    }
}
export default PanelDeControl;