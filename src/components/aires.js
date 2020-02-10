import React, { Component } from "react";
import Carrusel from "./carrusel.js";

import congeladores from "../images/congeladores.jpeg"
import congeladores2 from "../images/congeladores2.jpeg"
import congeladores3 from "../images/congeladores3.jpeg"
import congeladores4 from "../images/congeladores4.jpeg"
import congeladores6 from "../images/congeladores6.jpeg"
import congeladores7 from "../images/congeladores7.jpeg"
import congeladores8 from "../images/congeladores8.jpeg"
import congeladores9 from "../images/congeladores9.jpeg"
import congeladores10 from "../images/congeladores10.jpeg"
import congeladores11 from "../images/congeladores11.jpeg"
import congeladores12 from "../images/congeladores12.jpeg"
import congeladores13 from "../images/congeladores13.jpeg"
import congeladores14 from "../images/congeladores14.jpeg"
import congeladores15 from "../images/congeladores15.jpeg"
import congeladores16 from "../images/congeladores16.jpeg"



class Aires extends Component {
  constructor() {
    super();
    const data = dataFake();
    this.state = {
      data: data[0].images
    };
  }
  render() {
    if (this.props.anchura > 970) {
      return (
        <div>
          <div className="contenedorCard">
            <h1>Aires acondicionados y Ultracongeladores</h1>
            <h2>Instalación de equipos de aire acondicionado </h2>
            <h2> Mantenimiento preventivo y correctivo a equipos</h2>
          </div>
          <Carrusel
            name="congeladores"
            anchura={this.props.anchura}
            images={this.state.data}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="contenedorCardMovil">
            <h1>Aires acondicionados y Ultracongeladores</h1>
            <h2>Instalación de equipos de aire acondicionado </h2>
          </div>
          <div className="contenedorCard">
            <h2> Mantenimiento preventivo y correctivo a equipos</h2>
          </div>
          <Carrusel
            name="congeladores"
            anchura={this.props.anchura}
            images={this.state.data}
          />
        </div>
      );
    }
  }
}
function dataFake() {
  return [
    {
      images: [
        congeladores,
        congeladores2,
        congeladores3,
        congeladores4,
        congeladores6,
        congeladores7,
        congeladores8,
        congeladores9,
        congeladores10,
        congeladores11,
        congeladores12,
        congeladores13,
        congeladores14,
        congeladores15,
        congeladores16
      ]
    }
  ];
}
export default Aires;
