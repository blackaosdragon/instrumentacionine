import React, {Component} from "react";
//import socketIOClient from "socket.io-client";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from "../theme/theme.js";
import { Container,/*, Avatar, Typography, Grid, Button*/ 
         Button} from '@material-ui/core'
//import TextField from '@material-ui/core/TextField';
//import Crono from "@material-ui/icons/Storage";

import Data from '../api.js';



//let mysql = require('mysql');

const style = {
    titulo : {
        marginTop: 100
    },
    paper: {
        marginTop : 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "#000000"
    },
    form: {
        width: "100%",
        marginTop: 10
    }
}

class Sensor extends Component{
    constructor(){
        super();
        this.state = {
            
        }
        //let activador = new Event('lectura');
    }
    
    componentDidMount = () => {
        /*
        //window notification pregunta si las notificaciones son compatibles en este navegador
        if(window.Notification){ 
            // va a retornar una promesa resuelta o rechazada
            return new Promise ((resolve,reject)=>{
                //permiso va a guardar "result" de la funcion requestPermision que es el
                //permiso de las notificaciones
                const permiso = Notification.requestPermission((result)=>{
                    //la promesa resuelve con el resulado del permiso
                    resolve(result);
                });
                //si existe permiso enteonces...
                if (permiso){
                    // dependiendo del resultado resuelve o rechaza, siemprey cuando exista
                    // será resolve, si por alguna razon no existe o es null reject es la respuesta
                    permiso.then(resolve,reject);
                }
            // na vez resuelta la promesa lo que haya en permiso osea la respuesta de la promesa
            }).then((permiso)=>{
                //si es diferente a que acepto manda un alert de que no se otorgaron permisos
                if (permiso !== 'granted'){
                    alert("No hay permiso para notificaciones");
                }
            });            
        }
        else {
            alert("No estan disponibles las notificaciones en este dispositivo");
        }*/
        Notification.requestPermission();
        
    }
    notificacion = () => {

        new Notification("Notificacion en IOs")
        /*
        console.log("Lanza una notificacion");
        console.log(navigator);
        navigator.serviceWorker.ready.then(regis=>{
            regis.showNotification(
                'Cellphone notify',{
                    body: 'Ya acepta notificaciones por celular!',
                    icon: '../images/iconos.png',
                    vibrate: [500,200,500],
                    requireInteraction: true,
                    silent: false,
                }
            )
        })
    }*/
    /*
    comparar = () => {
        navigator.serviceWorker.ready.then(data, () => {
            
        })
    }
    */
}
    render(){
               //this.pintar();
        return (
            <MuiThemeProvider theme={theme} >
            <Container maxWidth="sm">
                <div style={style.paper}>
                    <h1 style={style.titulo}> Monitor de temperaturas </h1>
                    <Data />
                    <Button onClick={this.notificacion} variant="contained" color="primary">
                        Enviar notificación
                    </Button>  
                </div>
            </Container>
            </MuiThemeProvider>
            
        )
    }

}
export default Sensor;
/*
<Avatar style={style.avatar}>
                        <Crono />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Base de datos
                    </Typography>
                    <form style={style.form}>
                        <Grid constainer spacing={2}>
                            <Grid item md={12} xs={12}>
                                <TextField name="Nombre" fullWidth onChange={this.onChange} value={this.state.usuario.nombre} label="Ingrese nombre" />
                                <TextField name="Apellido" fullWidth  label="Ingrese apellido" />
                                <TextField name="Ubicacion" fullWidth  label="Ingrese la ubicacion del equipo" />
                                <TextField name="Equipo" fullWidth  label="Ingrese el nombre del equipo" />
                                <TextField name="Falla" fullWidth  label="Ingrese la falla del equipo" /> 
                                <TextField name="Serie" fullWidth  label="Ingrese el numero de serie" />
                            </Grid>
                            <Grid container justify="center">
                                <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    */