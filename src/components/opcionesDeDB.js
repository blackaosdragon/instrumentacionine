import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Modal from '@material-ui/core/Modal';
import Consulta from './consultaBase';
import Tabla from './tabladeDatos.js';

import ModalDeCarga from "./carga.js";
//const server = "192.168.1.65"; server para probar desde red local
const server = "instrumentacionline.ddns.net"
//const puerto = "5000"; puerto de prueba
const puerto = "443";
const protocolo = "https";
const end_point_años = 'years';
const end_point_meses = 'mes';
const end_point_dias = 'days';
const end_point_consulta = 'buscar';
let estilos = ["carga","cargaInvisible"];


const horas_dia = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const arreglo_0_60 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];

class Opciones extends Component{
    constructor(props){
        super(props);
        this.state = {
            localizaciones: [],
            años: [],
            meses: [],
            dias: [],
            consulta: [],
            value:"",
            ubicaciones: "collapse",
            cargando: true,
            years: "collapse",
            month: "collapse",
            days: "collapse",
            boton: "collapse",
            ubicacion: "",
            año: "",
            mes:"",
            dia:"",
            horaInicio: "",
            minutoInicio: "",
            horaFinal: "",
            minutoFinal: "",

        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(this.state!==prevState){
        }
    }
    handleChange = (event) =>{
       this.setState({
           [event.target.name]: event.target.value,
           cargando: true,
       })
        //console.log(this.state);
        let consulta = {
            ubicacion: event.target.value,
        }
        //console.log(consulta);
        
        fetch(`https://${server}:${puerto}/${end_point_años}`,{
            method: 'POST',
            body: JSON.stringify(consulta),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then( response => {return response.json()})
        .then( data => {
            //console.log(data);
            this.setState({
                años: data,
                years: "visible",
                cargando: false,
            })
            //console.log(this.state);
        })
        .catch( err => {
            console.log(err);
            this.setState({
                cargando: false
            })
            alert("Error al comunicarse a la base de datos")
        })
        
        
    }
    seleccionYear = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            cargando: true,
        })
        let meses = {
            year: event.target.value
        }
        fetch(`${protocolo}://${server}:${puerto}/${end_point_meses}`,{
            method: 'POST',
            body: JSON.stringify(meses),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then( response => {return response.json()})
        .then( data => {
            //console.log(data);
            this.setState({
                meses: data,
                month: "visible",
                cargando: false,
            })
        })
        .catch( err => {
            console.log(err);
            this.setState({
                cargando: false
            })
            alert("Error al comunicarse a la base de datos")
        })

        //console.log(meses);
    }
    selection_month = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            cargando: true,
        })
        let dias = {
            year: this.state.año,
            mes: event.target.value,
            ubicacion: this.state.ubicacion
        }
        fetch(`${protocolo}://${server}:${puerto}/${end_point_dias}`,{
            method: 'POST',
            body: JSON.stringify(dias),
            headers:{
                'Content-Type': 'application/json' 
              },
        }).then( response => {return response.json()})
        .then( data => {
            //console.log(data);
            this.setState({
                dias: data,
                days: "visible",
                cargando: false,
                boton: "visible"
            })
        })
        .catch( err => {
            console.log(err);
            this.setState({
                cargando: false
            })
            alert("Error al comunicarse a la base de datos")
        })
        //console.log(dias);
    }
    slection_day = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    consultar_datos = () => {
        //console.log(`Ubicacion ${this.state.ubicacion} Año: ${this.state.año}, Mes: ${this.state.mes}, Dia: ${this.state.dia}, Desde: ${this.state.horaInicio}:${this.state.minutoInicio}, hasta: ${this.state.horaFinal}:${this.state.minutoFinal}`)
        this.setState({
            cargando: true
        })
        let payload = {
            minutos: this.state.minutoInicio,
            horas: this.state.horaInicio,
            minutoFinal: this.state.minutoFinal,
            horaFinal: this.state.horaFinal,
            year: this.state.año,
            mes: this.state.mes,
            dia: this.state.dia,
            lugar: this.state.ubicacion
        }
        
        if(
            this.state.minutoInicio ==="" || 
            this.state.horaInicio === "" ||
            this.state.minutoFinal === "" ||
            this.state.horaFinal === "" ||
            this.state.año === "" ||
            this.state.mes === ""||
            this.state.dia === ""||
            this.state.ubicacion === ""
        ) {
            alert("Falta completar algunos datos");
        } else{
            //console.log(payload);
            fetch(`${protocolo}://${server}/${end_point_consulta}`,{
                method: 'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json' 
                  }
            }).then( response => {
                return response.json();
            }).then( data => {
                //console.log(data);
                this.setState({
                    consulta: data,
                    cargando: false
                })
            }).catch( err => {
                alert("Error al comunicarse ocn la base de datos");
                console.log(err);
                this.setState({
                   cargando: false
                })
            })
        }
    }
    
    componentDidMount(){
        fetch(`${protocolo}://${server}:${puerto}/${this.props.ubicaciones}`)
        .then( response => {
            this.setState({
                cargando: false
            })
            return response.json();

        })
        .then( data => {
            this.setState({
                localizaciones: data,
                ubicaciones: "visible",
                cargando: false,

            })
        })
        .catch( err => {
            console.log(err);
            this.setState({
                cargando: false
            })
            alert("Error al comunicarse a la base de datos")
        })
    }
    render(){
        return(
        <div>

            <ModalDeCarga cargando={this.state.cargando}/>
            <FormControl style={{visibility: this.state.ubicaciones, margin: "0% 1% 0% 2%"}}>
            
            <Select value={this.state.ubicacion} name="ubicacion" onChange={this.handleChange}>
            {this.state.localizaciones.map( option => (
                <MenuItem key={option} value={option}> {option}</MenuItem>
            ))}
            </Select>
            <FormHelperText>Seleccione la ubicacion</FormHelperText>
            </FormControl>
            

            <FormControl style={{visibility: this.state.years,margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.año} name="año" onChange={this.seleccionYear}>
                    {this.state.años.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el año</FormHelperText>
            </FormControl>

            <FormControl style={{visibility: this.state.month, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.mes} name="mes" onChange={this.selection_month}>
                    {this.state.meses.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el mes</FormHelperText>
            </FormControl>

            <FormControl style={{visibility: this.state.days, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.dia} name="dia" onChange={this.slection_day}>
                    {this.state.dias.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el dia</FormHelperText>
            </FormControl>

            <FormControl style={{visibility: this.state.days, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.horaInicio} name="horaInicio" onChange={this.slection_day}>
                    {horas_dia.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione la hora inicial</FormHelperText>
            </FormControl>

            <FormControl style={{visibility: this.state.days, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.minutoInicio} name="minutoInicio" onChange={this.slection_day}>
                    {arreglo_0_60.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el minuto</FormHelperText>
            </FormControl>

            <FormControl style={{visibility: this.state.days, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.horaFinal} name="horaFinal" onChange={this.slection_day}>
                    {horas_dia.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione la hora final</FormHelperText>
            </FormControl>

            <FormControl style={{visibility: this.state.days, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.minutoFinal} name="minutoFinal" onChange={this.slection_day}>
                    {arreglo_0_60.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el minuto</FormHelperText>
            </FormControl>
            <div style={{visibility: this.state.boton}}>
            <div className="boton" onClick={this.consultar_datos}> Realizar consulta </div>
            </div>
            <Tabla data={this.state.consulta} />
            
        </div>
    )
}
}

export default Opciones;