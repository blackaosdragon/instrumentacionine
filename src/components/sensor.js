import React, {Component} from "react";
//import socketIOClient from "socket.io-client";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from "../theme/theme.js";
import { Container,/*, Avatar, Typography, Grid, Button*/ 
Button} from '@material-ui/core'
//import TextField from '@material-ui/core/TextField';
//import Crono from "@material-ui/icons/Storage";



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
            endPoint: "http://201.103.130.28:4000",
            value: 0,
        }
    }
    componentDidMount = () => {
        if(window.Notification)        {
            console.log("Soporta notificaciones");
            if(Notification.permission==='default'){
                Notification.requestPermission((permission)=>{
                    new Notification('Paso semi completo');
                })
            }
        }
    }
    onChange
   onChange = e =>{
        
    } 
    registrarUsuario = e => {
        e.preventDefault();
        console.log('imprimir: ', this.state.usuario)
    }
    notificacion = () => {
        const notifi = {
            body: 'Instrumentacion y electromecanica',
            icon: '../../public/favicon.ico'
        }             
        new Notification('Sensor 1', notifi);        
    }
    detener = () => {
        this.tiempo = setInterval(this.notificacion,3000);
        clearInterval(this.tiempo);
    }
    /*
    pintar  = () => {
        const {endPoint} = this.state
        const socket = socketIOClient(endPoint);
        socket.on('temp', data => {
            //console.log(data);
            setInterval(()=>{
                this.setState({value: data})
            },1000);
            
        }) 
    }*/
    
    render(){
               //this.pintar();

        return (
            <MuiThemeProvider theme={theme} >
                
            <Container maxWidth="sm">
                <div style={style.paper}>
                    <h1 style={style.titulo}> LM35 </h1>
                    <h3>{this.state.value}</h3>
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