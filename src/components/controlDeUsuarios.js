import React, {Component} from 'react';
import { TextField } from '@material-ui/core';
import CryptoJS from 'crypto-js';
import styled from 'styled-components'
import {withStyles,createMuiTheme} from '@material-ui/core/styles';

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
    componentDidMount(){
        console.log(this.props);
        window.addEventListener("keyup",this.handleListener)
    }
    componentWillUnmount(){
        window.removeEventListener("keyup",this.handleListener);
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        //console.log(event.target.name);
        //console.log(event.target.value.length);
    }
    onBlur = (event) => {        
        let cadena = [];
        for(let i = 0; event.target.value.length>i;i++){
            cadena[i] = event.target.value[event.target.value.length-(i+1)]
            console.log(event.target.value.length)
        }
        let segundaCadena = cadena.join('');
        if(event.target.name==="usuario"){
            this.setState({
                oirausu: CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Base64)
            })
            console.log(this.state);
        }
        if(event.target.name==="contraseña"){
            this.setState({
                hasch: CryptoJS.SHA3(segundaCadena).toString(CryptoJS.enc.Base64)
            })
            console.log(this.state);
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
        console.log(event.target.value.length);
        if (event.target.value.length<=6){
            console.log(estado_campo);
            this.setState({
                leyenda_usuario: 'Usuario muy corto',
                error_personal: true
            })
            estado_campo = 'red';
            console.log(estado_campo);
        } else if (event.target.value.length>6){
            console.log("Usuario correcto");
            this.setState({
                leyenda_usuario: 'Campo correcto',
                error_personal: false
            })
            
        }
    }
    enviar = () => {
        this.setState({
            usuario: '',
            contraseña: '',
            cargando: 1
        })
        console.log(this.state.oirausu);
        console.log(this.state.hasch);
        //console.log(this.state.oirausu.length);
        //console.log(this.state.hasch.length);
        let data = {
            user: this.state.oirausu,
            pass: this.state.hasch
        }        
        fetch(`${login}`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then(response=>{
            return response.json();
        }).then(data=>{
            console.log("La respuesta es: ");            
            console.log(data);
            if(data==1){
                alert("Loggin exitoso");
            } else if (data==0){
                alert("Verifique su usuario y contraseña");
            }

        }).catch((err)=>{
            console.log("Error:");
            console.log(err);
        })
    }

    

    render(){

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
                           {/*
                           <PersonalTextoField
                             fullWidth
                             label="Prueba"
                             helperText={this.state.leyenda_usuario}
                             onBlur={this.onBlurHandle}
                             error={this.state.error_personal}
                             />
                             <TextPersonal
                             fullWidth
                             label="Segunda prueba"
                             helperText={this.state.leyenda_usuario}
                             onBlur={this.onBlurHandle}
                             
                             //error={this.state.error_personal}
                             />
                             */}
                        </div>
                        
                         </div>
                         
                    </div>
                    <div className="boton" onClick={this.enviar}>Enviar</div>
                    
                </div>
            )
        } else {
            return(
                <div>Control de ususarios movil</div>
            )
        }
        
    }
}
export default ControlUsers;