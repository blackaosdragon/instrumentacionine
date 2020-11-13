import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Modal from '@material-ui/core/Modal';
import Consulta from './consultaBase';
import Tabla from './tabladeDatos.js';

import {Link} from 'react-router-dom'

import ModalDeCarga from "./carga.js";
//const server = "192.168.1.65"; server para probar desde red local
const server = "instrumentacionline.ddns.net"
//const puerto = "5000"; puerto de prueba
//const puerto = "443";
const puerto = "5002"; //puerto para probar local
const protocolo = "https";
const end_point_años = 'years';
const end_point_meses = 'mes';
const end_point_dias = 'days';
const end_point_consulta = 'buscar';
const end_point_consulta_mes = 'consulta_mes';
const end_point_descarga = 'descarga_consulta'
const end_point_consulta_y_descarga = 'csv'
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
            boton_descarga: "collapse",
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
    componentDidUpdate = (prevProps, prevState) => {
        if(this.state!==prevState){
        }
    }
    handleChange = (event) =>{
       this.setState({
           [event.target.name]: event.target.value,
           año: "",
           mes:"",
           dia:"",
           month: "collapse",
           days: "collapse",
           boton: "collapse",
           boton_descarga: "collapse",
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
            mes: "",
            dia:"",
            month: "collapse",
            days: "collapse",
            boton: "collapse",
            boton_descarga: "collapse", 
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
            dia: "",
            days: "collapse",
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
            boton: "visible"
        })
        
    }
    consulta_General = () => {
        let payload = {
            lugar: this.state.ubicacion,
            yearInicio: this.state.years,
            yearFin: "",
            

        }
    }
    consultar_datos = () => {
        //console.log(`Ubicacion ${this.state.ubicacion} Año: ${this.state.año}, Mes: ${this.state.mes}, Dia: ${this.state.dia}, Desde: ${this.state.horaInicio}:${this.state.minutoInicio}, hasta: ${this.state.horaFinal}:${this.state.minutoFinal}`)
        this.setState({
            cargando: true
        })
        //console.log(`Lugar: ${this.state.ubicacion} ${this.state.dia}/${this.state.mes}/${this.state.año} ${this.state.horaInicio}:${this.state.minutoInicio} - ${this.state.horaFinal}:${this.state.minutoInicio}`)
        let payload = {
            year: this.state.año,
            mes: this.state.mes,
            dia: this.state.dia,
            lugar: this.state.ubicacion
        }
        
        if(
            this.state.año === "" ||
            this.state.mes === ""||
            //this.state.dia === ""||
            this.state.ubicacion === ""
        ) {
            alert("Falta completar algunos datos");
            this.setState({
                cargando: false
            })
        } else{
            if(this.state.dia===""){
                fetch(`${protocolo}://${server}:${puerto}/${end_point_consulta_mes}`,{
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers:{
                        'Content-Type': 'application/json' 
                    }
                }).then( response => { return response.json()})
                .then( data => {
                    this.setState({
                        consulta: data,
                        cargando: false,
                        boton_descarga: true
                    })
                    console.log(data)
                }).catch( err => {
                    console.log(err);
                    this.setState({
                        cargando: false
                    })
                })
            } else {
                fetch(`${protocolo}://${server}:${puerto}/${end_point_consulta}`,{
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
                    cargando: false,
                    boton_descarga: true
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
    }
    descargar_consulta = (e) =>{
        
        this.setState({
            cargando: true
        })
        //console.log(e);
        this.setState({
            cargando: false
        })

    }
    descargar_csv = async () => {
        let payload = {
            year: this.state.año,
            mes: this.state.mes,
            dia: this.state.dia,
            lugar: this.state.ubicacion
        }
        if(
            this.state.año === "" ||
            this.state.mes === ""||
            this.state.dia === ""||
            this.state.ubicacion === ""
        ) {
            alert("Falta completar algunos datos");
        } else (
            fetch(`${protocolo}://${server}:${puerto}/${end_point_consulta_y_descarga}`,{
              method: 'POST',
                  body: JSON.stringify(payload),
                  headers:{
                      'Content-Type': 'application/json' 
                    }            
            }).then( response => {return response.json()})
            .then( data => {
                this.setState({
                    cargando: false,
                    boton_descarga: true
                })
            }).catch(error=>{
                alert('Problema con el servidor, intente más tarde o contacte a soporte técnico')
            })
          )
    }
    decarga = e => {
        //console.log(e)
    }
    ocultar = () => {
        this.setState({
            boton_descarga: "collapse"
        })
    }
    
    
    handleDownload = () => {
        window.open('https://instrumentacionline.ddns.net/descarga_archivo_csv');
        let payload = {
            year: this.state.año,
            mes: this.state.mes,
            dia: this.state.dia,
            lugar: this.state.ubicacion
        }
        console.log(payload);
        fetch(`${protocolo}://${server}/descarga_archivo_csv`,{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json' 
            }              
        }).then( response => {
            return response.json();
        }).then( data => {
            console.log(data)
        }).catch( err => {
            console.log(err);
        })
    }
    render(){
        
        if(this.props.anchura>970){
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
            
            
            
            <div className="boton"><Link to="/panelDeControl" className="enlace"> <h3 className="titulos">Volver al monitor de temperaturas  </h3></Link></div>   
            
            
            
        <div style={{visibility: this.state.boton}}>
            <h4 className="titulos">
            <div className="boton" onClick={this.consultar_datos}> Realizar consulta </div>
            </h4>
            </div>
            {/*
              <div style={{visibility: this.state.boton_descarga}}>
                   {/*<div className="boton" onClick={this.handleDownload}>Download</div>}
                  <a href="https://instrumentacionline.ddns.net/descarga_consulta/" className="boton" onClick={this.ocultar}>Descargar Resultado</a>
                  
                  {/*<a href="https://instrumentacionline.ddns.net/descarga_archivo_csv/" className="boton" onClick={this.handleDownload}>Descargar Resultado</a>}
              </div>
              */}
              <div style={{visibility: this.state.boton_descarga}}>
              <a href="https://instrumentacionline.ddns.net:5002/descarga/" className="boton" onClick={this.ocultar}> Descargar Recurso</a>                  
              </div>
            
            <Tabla anchura={this.props.anchura} data={this.state.consulta} />
        </div>
    )} else {
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
            <br />

            <FormControl style={{visibility: this.state.years,margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.año} name="año" onChange={this.seleccionYear}>
                    {this.state.años.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el año</FormHelperText>
            </FormControl>
            <br />
            <FormControl style={{visibility: this.state.month, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.mes} name="mes" onChange={this.selection_month}>
                    {this.state.meses.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el mes</FormHelperText>
            </FormControl>
            <br />
            <FormControl style={{visibility: this.state.days, margin: "0% 1% 0% 1%"}}>
                <Select value={this.state.dia} name="dia" onChange={this.slection_day}>
                    {this.state.dias.map( option => (
                        <MenuItem key={option} value={option}> {option}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Seleccione el dia</FormHelperText>
            </FormControl>
            <Link to="/panelDeControl" className="enlace">
                <h3 className="titulos">
            <div className="boton-movile" > Volver al monitor de temperaturas </div>  
            </h3>
            </Link>  
        <div style={{visibility: this.state.boton}}>
            <div className="boton-movile" onClick={this.consultar_datos}> Realizar consulta </div>
            </div>
              <Tabla anchura={this.props.anchura} data={this.state.consulta} />
              <div className="boton-movile" style={{visibility: this.state.boton_descarga}}>
                  {/*<div className="boton-movile" onClick={this.handleDownload}>Download</div>*/}
                  <a href="https://instrumentacionline.ddns.net/descarga_consulta/" onClick={this.ocultar} className="noSub">Descargar consulta</a>
              </div>
        </div>
        )

    }
}
}

export default Opciones;