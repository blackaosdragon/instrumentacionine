import React, {Component} from 'react';
import { TextField } from '@material-ui/core';

class ControlUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            contraseña: '',
            hasch: ''
        }
        this.handleListener = this.handleListener.bind(this);
    }
    handleListener = () => {
        if(this.state.contraseña.length>5){
            let salt = crypto.randomBytes(128).toString('base64');
            this.setState({
                ...this.state,
                hasch: ""
            })
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
        console.log(event.target)
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
                           fullWidth
                           />
                           <TextField
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