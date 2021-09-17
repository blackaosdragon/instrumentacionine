import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase/app';
import Cargando from './carga.js';
import 'firebase/messaging'
import { FormControlLabel,FormGroup,Switch } from '@material-ui/core'
import config from '../config.js'

const end_point = `${config.API_URL}/insertar_token`;

var mensajeria = null;
if(firebase.messaging.isSupported()){
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
    mensajeria = inicializarFirebase.messaging();
    mensajeria.usePublicVapidKey('BCw81StElUUliyjpdiWSPTrGQw5L0Fq5tqMLHZWriMKYgN6abD-jy8tkhjnD2gdWj5mdeHE5UJcfyWhpaxzi-yo');
}


class Notifications extends Component {
    state = {
        notifications: 0,
        cargando: true,
        token: ''
    }
    obtener_token = () => {
        
        if(firebase.messaging.isSupported()){
            
        }
        this.setState({
            cargando: true
        })
        mensajeria.getToken().then( token => {
            this.setState({
                token: token
            })
            let payload = {
                token: token,
                activo: 2,
            }            
            fetch(`${end_point}`,{
                method: 'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json' 
                },
            }).then( response => {
                return response.json();
            }).then( data => {
                console.log("data respondida");
                console.log(data);
            }).catch( err => {
                console.log(err);
            })
            console.log("token");
            console.log(token);
            this.setState({
                notifications: 1,
                cargando: false
            })
        }).catch( err => {
            console.log(err);
        })        
    }
    handleNotifis = () => {
        this.setState({
            cargando: true            
        })
        mensajeria.getToken().then( token => {
            let payload = {
                token: token,
                activo: this.state.notifications,
            }            
                fetch(`${end_point}`,{
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers:{
                        'Content-Type': 'application/json' 
                    },
                }).then( response => {
                    return response.json();
                }).then( data => {
                    console.log(data)
                }).catch( err => {
                    console.log(err);
                })


            }).catch( err => {
                console.log(err);
            })
        
        this.setState({
            notifications: !this.state.notifications
        })        
        this.setState({
            cargando: false
        })
    }
    componentDidMount(){
        this.setState({
            cargando: false
        })
        if(Notification.permission==='granted'){
            mensajeria.getToken().then( token => {
                let payload = {
                    token: token,
                    activo: 2
                }
                fetch(`${end_point}`,{
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers:{
                        'Content-Type': 'application/json' 
                    },
                }).then( response => {
                    return response.json();
                }).then( data => {
                    //console.log(data[0].activo)
                    this.setState({
                        notifications: data[0].activo
                    })
                }).catch( err => {
                    console.log(err);
                })
            })
        }
    }
    render(){ 
        let braker = '';
        if(Notification.permission==='denied'){
            braker = <FormControlLabel disabled control={<Switch />} label="Notificaciones" />            
        } else if(Notification.permission === 'default'){
            if(this.props.anchura>970){
                braker = <div className="boton" onClick={this.obtener_token}> <h1>Notifis</h1> </div>
            } else {
                braker = <div className="boton-movile" onClick={this.obtener_token}> <h1>Notifis movil</h1> </div>
            }            
        } else {
            braker = <FormControlLabel control={<Switch color="primary" onClick={this.handleNotifis} checked={this.state.notifications}/>} label="Notificaciones" />                                              
        }        
        if(this.props.anchura>970){
            return(
                <Fragment>
                    <Cargando cargando={this.state.cargando} />
                    <div>  
                    {braker}                        
                    </div>
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <Cargando cargando={this.state.cargando} />
                    <div>
                    {braker}                        
                    </div>
                </Fragment>
            )
        }
        
    }
}
export default Notifications;