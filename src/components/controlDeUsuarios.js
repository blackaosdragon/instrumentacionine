import React, {Component} from 'react';
import { TextField, Link } from '@material-ui/core';
import CryptoJS from 'crypto-js';
import styled from 'styled-components'
import {withStyles,createMuiTheme} from '@material-ui/core/styles';
import { Route,Redirect } from 'react-router-dom';


let estado_campo = 'blue'

const login = 'https://instrumentacionline.ddns.net/login'

const theme = createMuiTheme({
    palette: {
        primary: {
             main: '#003366'

        },
        secondary: {
            main: '#ff0000'
        }
    }
})
const TextPersonal = styled(TextField)`
  label.Mui-focused{
      color: blue;
  }
  & .MuiInput-underline: {
      borderBotomColor: yellow
  }
`;

const PersonalTextoField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: estado_campo,
        },
        '.MuiInput-underline:after': {
            borderBottomColor: estado_campo
        },
        '& .label' : {
            color: 'yellow'
        }
    }
})(TextField);



class ControlUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            cargando: 0,
            usuario: '',
            oirausu: '',
            contraseña: '',
            hasch: '',
            error_usuario: false,
            error_password: false,
            error_personal: false,
            key: 0,
            leyenda_usuario: "Ingresa tu usuario",
            campA: {
                error: false,
                value: '',
                helper: 'Ingresa el usuario'
            }
            
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const {onChange} = this.props;
//        console.log(handleName)
        ///console.log(onChange);
        //console.log(anchura);
        if(prevState.key!==this.state.key){
            onChange(this.state.key);
            //handleName(this.state.name);
            //console.log(this.state.usuario);
        }
    }
    // componentWillUnmount = () => {
    //     this.setState({
    //         key: 0
    //     })
    // }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        //console.log(event.target.name);
        //console.log(event.target.value.length);
    }
    onBlur = (event) => {    
        //console.log(this.props);    
        let cadena = [];
        for(let i = 0; event.target.value.length>i;i++){
            cadena[i] = event.target.value[event.target.value.length-(i+1)]
            //console.log(event.target.value.length)
        }
        let segundaCadena = cadena.join('');
        if(event.target.name==="usuario"){
            this.setState({
                oirausu: CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Base64)
            })
            //console.log(this.state);
        }
        if(event.target.name==="contraseña"){
            this.setState({
                hasch: CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Base64)
            })
            //console.log(this.state);
        }
        
        //console.log(segundaCadena);
        //console.log(CryptoJS.SHA3(event.target.value).toString(CryptoJS.enc.Hex));
        //console.log(CryptoJS.SHA3(event.target.value).toString(CryptoJS.enc.Base64));
        //console.log(CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Hex));
        //console.log(CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Base64));
        /*
        let autenticacion = {
            data: CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Base64),
            requisito: 
        }
        */

        

        //console.log(cadena);
        
    }
    onBlurHandle = (event) => {
        //console.log(this.props);
        //console.log(event.target.value.length);
        if (event.target.value.length<=6){
            //console.log(estado_campo);
            this.setState({
                leyenda_usuario: 'Usuario muy corto',
                error_personal: true
            })
            estado_campo = 'red';
            //console.log(estado_campo);
        } else if (event.target.value.length>6){
            //console.log("Usuario correcto");
            this.setState({
                leyenda_usuario: 'Campo correcto',
                error_personal: false
            })
            
        }
    }
    test = () => {
        let datos = {
            temperatura: 25.5,
            id: 2.0,
        }
        /*
        fetch('https://instrumentacionline.ddns.net/test')
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            console.log(data);
        })
        .catch( error => {
            console.log("Error: ");
            console.log(error);
        })
        fetch('https://instrumentacionline.ddns.net/temperatura',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json' 
              },            
        }).then(response => {
            return response.json();
        }).then( data => {
            console.log(data);
        }).catch( error => {
            console.log(error);
        })
        */
        console.log("Fetch hacia socket");
        fetch('https://instrumentacionline.ddns.net/socket')
        .then( response => {
            return response.json();
        }).then( data=> {
            console.log(data);
        }).catch( err => {
            console.log(err);
        })
        console.log("Terminado el fetch a socket");

    }
    enviar = () => {
        const { handleLogin, handleName } = this.props;  
            
        //console.log(this.state.oirausu);
        //console.log(this.state.hasch);
        //console.log(this.state.oirausu.length);
        //console.log(this.state.hasch.length);
        let data = {
            user: this.state.oirausu,
            pass: this.state.hasch
        
        }
        handleName(this.state.usuario);        
        fetch(`${login}`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then(response=>{
                      
            return response.json();
        }).then(data=>{
            //console.log("La respuesta es: ");            
            //console.log(data);
            if(data.data==1){
                
                handleLogin(1);
                

                this.setState({
                    key: 1                    
                })
            } else if (data.data==0){
                alert("Verifique su usuario y contraseña");
            }

        }).catch((err)=>{
            console.log("Error:");
            console.log(err);
        })
        this.setState({
            usuario: '',
            contraseña: '',
            cargando: 1
        })
    }

    

    render(){
        //this.props.onChange();

        let carga = ''
        if (this.state.cargando){
            carga = <div className="cargando"></div>
        } else {

        }

        if(this.props.anchura>970){
            return(
                <div>                        
                    <div className="contenedorCard">
                        <div className="grid-login">
                        Login
                        <div className="textos">
                          <TextField                                                     
                           name="usuario"
                           label="Usuario"
                           helperText="Ingrese su e-mail/usuario"
                           value={this.state.usuario}
                           onChange={this.onChange}
                           onBlur={this.onBlur}
                           fullWidth
                           //error={this.state.error_usuario}
                           />
                           
                           <TextField
                           onBlur={this.onBlur}
                            name="contraseña"
                             label="Contraseña"
                             helperText="Ingrese su contraseña"
                             value={this.state.contraseña}
                             onChange={this.onChange}
                             
                             type='password'
                             fullWidth
                           />
                        </div>
                        
                         </div>
                         
                    </div>
                    
                    <div className="boton" onClick={this.enviar}>Enviar</div>
                    <div className="boton" onClick={this.test}>Enviar</div>
                    
                </div>
            )
        } else {
            return(
                <div>
                    <div className="margenMovilSuperior">.</div>
                    <div className="contenedorCardMovil">
                        <p className="titulos"> Login </p>
                        <TextField                                                     
                           name="usuario"
                           label="Usuario"
                           helperText="Ingrese su e-mail/usuario"
                           value={this.state.usuario}
                           onChange={this.onChange}
                           onBlur={this.onBlur}
                           
                           />
                           <TextField
                           onBlur={this.onBlur}
                            name="contraseña"
                             label="Contraseña"
                             helperText="Ingrese su contraseña"
                             value={this.state.contraseña}
                             onChange={this.onChange}
                             type='password'
                           />
                           
                    </div>
                    <div className="boton" onClick={this.enviar}> Entrar </div>
                </div>
            )
        }
        
    }
}
export default ControlUsers;