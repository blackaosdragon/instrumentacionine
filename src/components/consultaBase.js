import React, {Component} from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Opciones from './opcionesDeDB.js';

const serverName = "192.168.1.65";
const puerto = "5000";
const end_point_ubicaciones = "ubicaciones"

let formulario = ''

class Consulta extends Component{
    constructor(){
        super();
        this.state = {
            visibleUbicacion: 'collapse',
            ubicaciones: [],
            value: "",
            estilos: "opciones"
        }
    }
    componentDidMount(){/*
        fetch('http://192.168.0.13:5000/ubicaciones')
        .then( response => {return response.json()})
        .then( data => {
            this.setState({
                visibleUbicacion: 'true',
                ubicaciones: data,
            })
        })
        */
    }
    handleChange = e => {
        console.log(e.target);
        this.setState({
            value: e.target.value
        })
        console.log(this.state);
    }
    render(){

        //console.log(this.state);
        return(
            <div>
                <div className="contenedorCard">
                    <h1 className="Titulos"> Consultas </h1>
                </div>
                <div className="contenedorCard">
                    <h6 className="subtitleCuadricula"> Porfavor seleccione los datos que se solicitan a continuacion </h6>
                </div>
                <Opciones ubicaciones={end_point_ubicaciones}/>
            </div>
        )
    }
}
export default Consulta