import React, {Component} from 'react';
import { TextField } from '@material-ui/core';
import CryptoJS from 'crypto-js';
import styled from 'styled-components'
import {withStyles,createMuiTheme} from '@material-ui/core/styles';

let estado_campo = 'blue'

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
            usuario: '',
            oirausu: '',
            contraseña: '',
            hasch: '',
            error_usuario: false,
            error_password: false,
            error_personal: false,
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
        console.log(event.target.value.length);
    }
    onBlur = (event) => {
        //console.log(this.state);
        console.log(event.target);
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(CryptoJS.SHA3(event.target.value).toString(CryptoJS.enc.Hex));
        console.log(CryptoJS.SHA3(event.target.value).toString(CryptoJS.enc.Base64));
        if(event.target.value.length>=4){
            this.setState({
                //error_usuario: true
            })
        } else {
            this.setState({
                //error_usuario: false
            })
        }
        let cadena = [];
        for(let i = 0; event.target.value.length>=i;i++){
            //console.log(event.target.value.length);
            cadena[i] = event.target.value[event.target.value.length-i]
            console.log(event.target.value[event.target.value.length-(i+1)])
            
            /*this.setState({

            })*/
        }
        console.log(cadena)
        
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
         
        console.log(this.state.usuario);
        console.log(this.state.contraseña);
    }

    render(){
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