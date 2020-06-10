import React, {Component} from 'react';

const dominio = "192.168.0.7";
const port = "5001";
let socket = new WebSocket(`ws://${dominio}:${port}`);

class Temperature extends Component{
    constructor(){

        super();
        this.state = {
            mensaje: "",
            sensor1: {
                name: "Oficina",
                value: 0.0,
                status: 0
            },
            sensor2: {
                name: "Taller",
                value: 0.0,
                status: 0
            },
            sensor3: {
                name: "Variable",
                value: 0.0,
                status: 0
            },
        }
    }
    componentDidMount(){
        socket.onopen = () => {
            console.log('Conection');
        }
        socket.onmessage = (mensaje) => {
            console.log(mensaje.data);
            this.setState({
                mensaje: mensaje.data
            })
        }
    }

    render(){
        return(
            <div>
                <div className="contenedorCard">
                    <h1 className="titulos">Monitor de temperaturas</h1>
                </div>
                <div className="contenedorCard">
                    <p className="subtitleCuadricula"> A continuación se muestran los sensores registrados, ubicacion y la ultima hora que se registró su lectura</p>                    
                </div>
                <div className="contenedorCard">
                    <p>{this.state.mensaje}</p>
                </div>
            </div>
        );
    }
};
export default Temperature;