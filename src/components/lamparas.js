import React, { Component } from "react";
import Carrusel from "./carrusel";
import "flexboxgrid";

import funcionando1 from "../images/funcionando1.jpeg"
import funcionando2 from "../images/funcionando2.jpeg"
import funcionando3 from "../images/funcionando3.jpeg"
import funcionando4 from "../images/funcionando4.jpeg"
import funcionando5 from "../images/funcionando5.jpeg"
import funcionando6 from "../images/funcionando6.jpeg"
import funcionando7 from "../images/funcionando7.jpeg"

import instalacion1 from "../images/instalacion1.jpeg"
import instalacion2 from "../images/instalacion2.jpeg"
import instalacion3 from "../images/instalacion3.jpeg"
import equilibrio from "../images/equilibrio.jpg"
import instalacion4 from "../images/instalacion4.jpeg"

import reparacion1 from "../images/reparacion1.jpeg"
import reparacion2 from "../images/reparacion2.jpeg"
import reparacion3 from "../images/reparacion3.jpeg"
import reparacion4 from "../images/reparacion4.jpeg"
import reparacion5 from "../images/reparacion5.jpeg"
import reparacion6 from "../images/reparacion6.jpeg"
import reparacion7 from "../images/reparacion7.jpeg"
import reparacion8 from "../images/reparacion8.jpeg"
import reparacion10 from "../images/reparacion10.jpeg"
import reparacion11 from "../images/reparacion11.jpeg"
import reparacion13 from "../images/reparacion13.jpeg"
import reparacion15 from "../images/reparacion15.jpeg"
import Reparacion16 from "../images/Reparacion16.jpeg"
import reparacion17 from "../images/reparacion17.jpeg"
import reparacion18 from "../images/reparacion18.jpeg"

class Lamparas extends Component{
    constructor() {
        super();
        const dataLamparas = simulationFetch();
        this.state = {
          counter: 0,
          funcionando: dataLamparas[0].funcionando,
          instalacion: dataLamparas[0].instalacion,
          reparacion: dataLamparas[0].reparacion,
        };
      }
      render() {
        if (this.props.anchura > 970) {
          return (
            <div>
              <div className="inicio">
                <div className="contenedorCard">
                  <h1 className="titulos"> Lámparas quirúrgicas </h1>
                  <h2 className="titulos"> Equipos quirúrgicos en excelentes condiciones </h2>
                  <p className="titulos">
                    {" "}
                    Nos dedicamos a la instalación y mantenimiento de equipos
                    quirúrgicos para su perfecto funcionamiento{" "}
                  </p>
                </div>
                <div class="row middle-xs around-xs">
                  <Carrusel
                    anchura={this.props.anchura}
                    images={this.state.funcionando}
                    name="funcionando"
                  />
                </div>
              </div>
              <div className="separacion">
                <div className="contenedorCard">
                  <h1 className="titulos"> Instalación de lamparas qurúrgicas </h1>
                  <p className="titulos">
                    Todos nuestros equipos son instalados por el personal
                    capacitado, se comprueba que estos quedan con el correcto ajuste
                    y funcionamiento para que puedan ser operados inmediatamente
                  </p>
                </div>
                <div class="row middle-xs around-xs">
                  <Carrusel
                  anchura={this.props.anchura}
                  images={this.state.instalacion}
                  name="instalacion"
                  />
                </div>
              </div>
              <div>
                <div className="contenedorCard">
                  <h1 className="titulos">Reparación de lámparas quirúrgicas</h1>
                  <p className="titulos">
                    {" "}
                    Ya sea de cualquier marca o modelo nuestros técnicos están
                    capacitados para resolver cualquier tipo de problema{" "}
                  </p>
                </div>
                <div class="row middle-xs around-xs">
                  <Carrusel
                  anchura={this.props.anchura}
                  images={this.state.reparacion}
                  name="reparacion"
                  />
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className="inicio">
                <div className="contenedorCardMovil">
                  <h1 className="titulos"> Lámparas quirúrgicas </h1>
                  <h2 className="titulos"> Equipos quirúrgicos en excelentes condiciones </h2>
                  <p className="titulos">
                    {" "}
                    Nos dedicamos a la instalación y mantenimiento de equipos
                    quirúrgicos para su perfecto funcionamiento{" "}
                  </p>
                </div>
                <div class="row middle-xs around-xs">
                  <Carrusel
                    anchura={this.props.anchura}
                    images={this.state.funcionando}
                    name="funcionando"
                  />
                </div>
                <div className="contenedorCardMovilCentral">
                  <h1 className="titulos"> Instalación de lamparas qurúrgicas </h1>
                  <p className="titulos">
                    Todos nuestros equipos son instalados por el personal
                    capacitado, se comprueba que estos quedan con el correcto ajuste
                    y funcionamiento para que puedan ser operados inmediatamente
                  </p>
                </div>
                <Carrusel
                  anchura={this.props.anchura}
                  images={this.state.instalacion}
                  name="reparacion"
                />
                <div className="contenedorCardMovilCentral">
                  <h1 className="titulos">Reparación de lámparas quirúrgicas</h1>
                  <p className="titulos">
                    {" "}
                    Ya sea de cualquier marca o modelo nuestros técnicos están
                    capacitados para resolver cualquier tipo de problema{" "}
                  </p>
                </div>
                <Carrusel
                  anchura={this.props.anchura}
                  images={this.state.reparacion}
                  name="reparacion"
                />
              </div>
            </div>
          );
        }
      }

}
function simulationFetch() {
    return [
      {
        funcionando: [
          funcionando1,
          funcionando2,
          funcionando3,
          funcionando4,
          funcionando5,
          funcionando6,
          funcionando7
        ],
        instalacion: [
          instalacion1,
          instalacion2,
          instalacion3,
          equilibrio,
          instalacion4
        ],
        reparacion: [
          reparacion1,
          reparacion2,
          reparacion3,
          reparacion4,
          reparacion5,
          reparacion6,
          reparacion7,
          reparacion8,
          reparacion10,
          reparacion11,
          reparacion13,
          Reparacion16,
          reparacion15,
          reparacion17,
          reparacion18
        ]
      }
    ];
  }
export default Lamparas;