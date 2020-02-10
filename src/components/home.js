import React, {Component} from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core"
import { Link } from "react-router-dom";


/*resources*/
import Lampara from "../images/Lampara.jpg"
import LamparaLimpiesa from "../images/LamparaLimpiesa.jpg"

import Engranes from "../images/engranes.jpg"
import TarjetaLog from "../images/Tarjeta1.jpeg"
import TarjetaChec from "../images/tarjeta3.jpeg"

import Autoclave from "../images/Autoclave1.jpeg"
import Aire from "../images/aire.jpg"
import Congeladores from "../images/congeladores.jpeg"
import MesasNuevas from "../images/MesasNuevas.jpeg"
import ControlAutoclave from "../images/controlAuto.jpeg"



class Home extends Component{
  constructor(){
    super();
    this.state = {
      carrusel: LamparaLimpiesa
    }
  }

  render(){

/*
    let swRegistration = null;

    if('serviceWorker' in navigator && 'PushManager' in window){
      console.log('Service Worker y notificaciones push son soportadas');

      navigator.serviceWorker.register('sw.js')
      .then(function(swReg){
        console.log('Service Worker esta registrado',swReg);
        swRegistration = swReg;
        console.log(swRegistration);
      })
      .catch(function(error){
        console.log('Service Worker error',error);
      });
    }  else {
      console.warn('Mensajes Push no son p}soportados por tu navegador');
    }
    */
    if (this.props.anchura>970){
      return(
        <div>
          <div className="contenedorCard">
          <h1 className="titulos">Instrumentación y Electromecánica</h1>
          <h2 className="titulos">Reparación de equipo médico y de laboratorio</h2>
          </div>
          <div className="fondoBlanco">
            <h2 className="titulos">Estos son algunos de los equipos que nos dedicamos: </h2>
            <GridList  cellHeight={420}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
            <GridListTile className="cuadriculaImagen" key="Lampara limpiesa.jpg">
              <img
                className="carruseles"                  
                src={this.state.carrusel}
                alt="Lamparas"
                /*
                onMouseOver={this.conMouse}
                onMouseLeave={this.sinMouse}
                */
              />
              <Link to="/lamparas" >
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title"> Reparación de lámparas quirúrgicas </h1>}
                subtitle={
                  <h2 className="textosBlancos">Mantenimiento preventivo</h2>
                }
          />
          </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Lampara.jpg">
              <img src={Lampara} alt="Lamparas" />
              <Link to="/lamparas" >
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title"> Instalación de lámparas quirúrgicas </h1>}
                subtitle={<h2 className="textosBlancos" >Lámparas de led modernas y halógeno</h2>}
              />
              </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Reparacion.jpg">
              <img src={MesasNuevas} alt="Mesas" />
              <Link to="/mesas">
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title"> Cotización de mesas quirúrgicas </h1>}
                subtitle={<h2 className="textosBlancos"> y camas eléctricas</h2>}
              />
              </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Engranes.jpg">
              <img src={Engranes} alt="Mesas" />
              <Link to="/mesas">
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Mantenimiento de mesas quirúrgicas</h1>}
                subtitle={<h2 className="textosBlancos">Servicio correctivo</h2>}
              />
              </Link>
            </GridListTile>
            
            <GridListTile className="cuadriculaImagen" key="TarjetaLog.jpg">
              <img src={TarjetaLog} alt="Tarjetas" />
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Tarjetas electrónicas</h1>}
                subtitle={<h2 className="textosBlancos">Limpieza y mantemiento</h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="TarjetaChec.jpg">
              <img src={TarjetaChec} alt="Tarjetas" />
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Tarjetas electrónicas</h1>}
                subtitle={<h2 className="textosBlancos"> Correcto funcionamiento de equipos </h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Autoclave.jpg">
              <img src={Autoclave} alt="Autoclaves" />
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Instalación de autoclaves</h1>}
                subtitle={<h2 className="textosBlancos">Instalación y mantenimiento a equipos</h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="lcd.jpg">
              <img src={ControlAutoclave} alt="Autoclaves" />
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Autoclaves</h1>}
                subtitle={<h2 className="textosBlancos">Uso de microcontroladores programables y sensores</h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="lcd.jpg">
            <Link to="/aires" >
              <img className="contenedorImagen" src={Congeladores} alt="Ultracongeladores" />
              
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Ultracongeladores</h1>}
                subtitle={<h2 className="textosBlancos"> Mantenimiento e instalación </h2>}
              />
              </Link>
            </GridListTile>
            
            <GridListTile className="cuadriculaImagen" key="lcd.jpg">
            <Link to="/sensor" >
              <img className="contenedorImagen" src={Aire} alt="AiresAcondicionados" />
              <GridListTileBar
                className="letrasHome"
                title={<h1 className="title">Aires acondicionados</h1>}
                subtitle={<h2 className="textosBlancos">Instalacion y mantenimiento</h2>}
              />
              </Link>
            </GridListTile>
            


            </GridList>
            </div>
            
          </div>
      )

    } else {
      return(
        <div>
          <div className="contenedorCardMovil">
          <h1 className="titulos">Instrumentación y Electromecánica</h1>
          <h2 className="titulos">Reparación de equipo médico y de laboratorio</h2>
          </div>
          <div className="fondoBlanco">
            <h2 className="titulos">Estos son algunos de los equipos que nos dedicamos: </h2>
            <GridList  cellHeight={420}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
            <GridListTile className="cuadriculaImagen" key="Lampara limpiesa.jpg">
              <img
                className="carruseles"                  
                src={this.state.carrusel}
                alt="Lamparas"
                /*
                onMouseOver={this.conMouse}
                onMouseLeave={this.sinMouse}
                */
              />
              <Link to="/lamparas" >
              <GridListTileBar
                
                title={<h1 className="title"> Lámparas </h1>}
                subtitle={
                  <h2 className="textosBlancos"></h2>
                }
          />
          </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Lampara.jpg">
              <img src={Lampara} alt="Lamparas" />
              <Link to="/lamparas" >
              <GridListTileBar
                
                title={<h1 className="title">quirúrgicas </h1>}
                subtitle={<h2 className="textosBlancos" ></h2>}
              />
              </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Reparacion.jpg">
              <img src={MesasNuevas} alt="Mesas" />
              <Link to="/mesas">
              <GridListTileBar
                
                title={<h1 className="title"> Mesas </h1>}
                subtitle={<h2 className="textosBlancos"> </h2>}
              />
              </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Engranes.jpg">
              <img src={Engranes} alt="Mesas" />
              <Link to="/mesas">
              <GridListTileBar
                
                title={<h1 className="title">quirúrgicas</h1>}
                subtitle={<h2 className="textosBlancos"></h2>}
              />
              </Link>
            </GridListTile>
            
            <GridListTile className="cuadriculaImagen" key="TarjetaLog.jpg">
              <img src={TarjetaLog} alt="Tarjetas" />
              <GridListTileBar
                
                title={<h1 className="title">Tarjetas </h1>}
                subtitle={<h2 className="textosBlancos"></h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="TarjetaChec.jpg">
              <img src={TarjetaChec} alt="Tarjetas" />
              <GridListTileBar
                
                title={<h1 className="title"> electrónicas</h1>}
                subtitle={<h2 className="textosBlancos"> </h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="Autoclave.jpg">
              <img src={Autoclave} alt="Autoclaves" />
              <GridListTileBar
                
                title={<h1 className="title">Equipos de</h1>}
                subtitle={<h2 className="textosBlancos"></h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="lcd.jpg">
              <img src={ControlAutoclave} alt="Autoclaves" />
              <GridListTileBar
                
                title={<h1 className="title">Autoclaves</h1>}
                subtitle={<h2 className="textosBlancos"></h2>}
              />
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="lcd.jpg">
              
              <img src={Congeladores} alt="Autoclaves" />
              <Link to="/aires" >
              <GridListTileBar
                
                title={<h1 className="title">Red</h1>}
                subtitle={<h2 className="textosBlancos">  </h2>}
              />
              </Link>
            </GridListTile>
            <GridListTile className="cuadriculaImagen" key="lcd.jpg">
              
              <img className="contenedorImagen" src={Aire} alt="Autoclaves" />
              <Link to="/sensor" >
              <GridListTileBar
                
                title={<h1 className="title">fria</h1>}
                subtitle={<h2 className="textosBlancos"></h2>}
              />
              </Link>
            </GridListTile>


            </GridList>
            </div>
            
          </div>
      )
    }
      
    }
}
export default Home