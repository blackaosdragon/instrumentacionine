import React, { Component } from "react";
import Carrusel from "./carrusel.js";

import reparacionMesa1 from "../images/reparacionMesa1.jpeg"
import reparacionMesa2 from "../images/reparacionMesa2.jpeg"
import reparacionMesa3 from "../images/reparacionMesa3.jpeg"
import reparacionMesa4 from "../images/reparacionMesa4.jpeg"
import reparacionMesa5 from "../images/reparacionMesa5.jpeg"
import reparacionMesa6 from "../images/reparacionMesa6.jpeg"

import rentaMesas1 from "../images/rentaMesas1.jpeg"
import rentaMesas2 from "../images/rentaMesas2.jpeg"
import rentaMesas3 from "../images/rentaMesas3.jpeg"
import rentaMesas4 from "../images/rentaMesas4.jpeg"
import rentaMesas5 from "../images/rentaMesas5.jpeg"

class Mesas extends Component {
  constructor() {
    super();
    const dataMesas = simulateDataFromServer();
    this.state = {
      imagenReparacion: "reparacionMesa1.jpeg",
      imagenRenta: "rentaMesas1.jpg",
      renta: dataMesas[0].renta,
      reparacion: dataMesas[0].reparacion
    };
  }
  dataNavigator = () => {
    console.log(navigator.userAgent);
  };
  tamanio = () => {
    if (this.props.anchura > 970) {
    } else {
    }
  };

  render() {
    if (this.props.anchura > 970) {
      return (
        <div>
          <div className="contenedorCard">
            <h1 className="titulos">Mesas de cirugía o mesas quirúrgicas</h1>
          </div>
          <div className="contenedorCard">
            <h2 className="titulos"> Venta y renta de mesas quirúrgicas y camas eléctricas</h2>
            <p className="titulos">
              Ofrecemos el servicio de renta y venta de distintas camas de
              recuperación y mesas quirúrgicas
            </p>
          </div>
          <Carrusel
            name="renta"
            images={this.state.renta}
            anchura={this.props.anchura}
          />
          <div className="contenedorCard">
            <h2 className="titulos">
              {" "}
              Servicio de matenimiento preventivo y correctivo a mesas
              quirúrgicas.
            </h2>
            <p className="titulos">
              {" "}
              Nos encargamos de el sistema mecánico de las mesas, incluyendo las
              piezas removibles como los distintos tipos de aditamentos que se
              le pueden instalar{" "}
            </p>
          </div>
          <Carrusel
            name="Reparacion"
            images={this.state.reparacion}
            anchura={this.props.anchura}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="contenedorCardMovil">
            <h1 className="titulos">Mesas de cirugía o mesas quirúrgicas</h1>
          </div>
          <div className="contenedorCardMovilCentral">
            <h2 className="titulos"> Venta y renta de mesas quirúrgicas y camas eléctricas</h2>
            <p className="titulos">
              Ofrecemos el servicio de renta y venta de distintas camas de
              recuperación y mesas quirúrgicas
            </p>
          </div>
          <Carrusel
            name="renta"
            images={this.state.renta}
            anchura={this.props.anchura}
          />
          <div className="contenedorCardMovilCentral">
            <h2 className="titulos">
              {" "}
              Servicio de matenimiento preventivo y correctivo a mesas
              quirúrgicas.
            </h2>
            <p className="titulos">
              {" "}import reparacionMesa6 from "../images/reparacionMesa6.jpeg"ovibles como los distintos tipos de aditamentos que se
              le pueden instalar{" "}
            </p>
          </div>
          <Carrusel
            name="Reparacion"
            images={this.state.reparacion}
            anchura={this.props.anchura}
          />
        </div>
      );
    }
  }
}
function simulateDataFromServer() {
  return [
    {
      reparacion: [
        reparacionMesa1,
        reparacionMesa2,
        reparacionMesa3,
        reparacionMesa4,
        reparacionMesa5,
        reparacionMesa6
      ],
      renta: [
        rentaMesas1,
        rentaMesas2,
        rentaMesas3,
        rentaMesas4,
        rentaMesas5
      ]
    }
  ];
}
export default Mesas;
