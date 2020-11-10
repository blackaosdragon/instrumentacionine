import React, { Component,useState } from "react"
import {TextField,FormControl} from "@material-ui/core"
import ModalDeCarga from './carga.js'

let expresion_regular = /[@]{1}/

const end_point = "https://instrumentacionline.ddns.net:5002/registro";

class Registro extends Component{
    state = {
        nombre: '',
        correo: '',
        cargo: '',
        ubicacion: '',
        cargando: true

    }
    componentDidMount = () => {
        this.setState({
            cargando: false
        })
    }
    componentDidUpdate = (prevProps, prevState) =>{

    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onClick = () => {
        this.setState({
            cargando: true
        })
        if( this.state.nombre==='' ||
            this.state.correo === ''
        ){
            alert("Los campos olbigatorios no estan llenos")
        } else {
            let data = {
                nombre: this.state.nombre,
                correo: this.state.correo,
                cargo: this.state.cargo,
                ubicacion: this.state.ubicacion
            }
            console.log(data);
            fetch(`${end_point}`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then( response => {return response.json()})
            .then( respuesta => {
                this.setState({
                    cargando: false
                })
                console.log(respuesta);
            })
            .catch( err => {
                this.setState({
                    cargando: false
                })
                console.log(err);
            })
        }
        
    }
    render(){
        if(this.props.anchura>970){

        
        return(
            <div>
            {/*
            
                <h1 className="contenedorCard">Registrate</h1>
                <div className="contenedorCard">
                <div >
                    <TextField 
                    name="nombre"
                    helperText="Nombre completo*"
                    label="Nombre completo"
                    value={this.state.name}
                    onChange={this.onChange}
                    size='medium'
                    
                    
                    />
                </div>
                <div>

                    <TextField 
                    name="correo"
                    helperText="e-mail*"
                    label="e-mail"
                    value={this.state.name}
                    onChange={this.onChange}
                    />
                </div>
                </div>
            */}
            <ModalDeCarga cargando={this.state.cargando}/>
            <div className="contenedorCard">
            <h1 className="titulos">Registro</h1>
            <h3 className="titulos"> Ingrese los datos que se le solicitan a continuación</h3>
            </div>
            <div className="contenedorCard">
                        <div className="grid-login">
                        <div className="textos">
                          <TextField                                                     
                           name="nombre"
                           label="Nombre completo"
                           helperText="Ingrese su nombre completo*"
                           value={this.state.usuario}
                           onChange={this.onChange}
                           
                           fullWidth
                           //error={this.state.error_usuario}
                           />
                           
                           <TextField
                          
                            name="correo"
                             label="e-mail"
                             helperText="Ingrese su e-mail*"
                             value={this.state.contraseña}
                             onChange={this.onChange}
                             
                             //type='password'
                             fullWidth
                           />
                           <TextField                           
                            name="cargo"
                             label="Cargo en su unidad de salud"
                             helperText="Ingrese su cargo que desempeña en su unidad"
                             value={this.state.contraseña}
                             onChange={this.onChange}                             
                             //type='password'
                             fullWidth
                           />
                           <TextField                           
                            name="ubicacion"
                             label="Unidad a la que pertenece"
                             helperText="Ingrese el nombre y número a la unidad que pertenece"
                             value={this.state.contraseña}
                             onChange={this.onChange}                             
                             //type='password'
                             fullWidth
                           />
                           <h6>El nombre y el correo son obligatorios, los demas datos facilitan y agilizan el registro y envío de contraseña</h6>
                        </div>
                         </div>
                    </div>
                    <div onClick={this.onClick} className="boton">Registrarse</div>
            </div>
        )
        } else {
            return(
                <div>
                    <ModalDeCarga cargando={this.state.cargando}/>
                    <div className="margenMovilSuperior">.</div>
                <div className="contenedorCardMovil">
                    <h1 className="titulos">Registro</h1>
                    <h3 className="titulos"> Ingrese los datos que se le solicitan a continuación</h3>                    
                </div>
                <div className="contenedorCardMovil">
                    <TextField                                                     
                        name="nombre"
                        label="Nombre completo"
                        helperText="Ingrese su nombre completo*"
                        value={this.state.usuario}
                        onChange={this.onChange}
                        />
                        <TextField                                                     
                        name="correo"
                        label="Correo electrónico"
                        helperText="Ingrese su correo electronico*"
                        value={this.state.usuario}
                        onChange={this.onChange}
                        />
                        <TextField                                                     
                        name="cargo"
                        label="Cargo"
                        helperText="Cargo que desempeña"
                        value={this.state.usuario}
                        onChange={this.onChange}
                        />
                        <TextField                                                     
                        name="ubicacion"
                        label="Unidad a la que pertenece"
                        helperText="Nombre de la unidad"
                        value={this.state.usuario}
                        onChange={this.onChange}
                        />
                        <h6>El nombre y el correo son obligatorios, los demas datos facilitan y agilizan el registro y envío de contraseña</h6>
                </div>
                <div className="boton-movile"  onClick={this.onClick} name="Registrarse" >Registrarse </div>
            </div>
            )            
        }
    }
} 
export default Registro;