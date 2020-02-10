import React, { Component } from "react";
import "flexboxgrid";
import Grid from "@material-ui/core/Grid";

class Carrusel extends Component {
  constructor() {
    super();
    const data = Clases()
    this.state = {
      cuenta: 0,
      clase: data[0].clases,
      seleccion: 0,
      boton: data[0].botones,
      button: 0
    };
  }
  clickDerecha = () => {
    this.setState({ cuenta: this.state.cuenta + 1 });
    if (this.state.cuenta > this.props.images.length - 2) {
      this.setState({ cuenta: 0 });
    }
    this.setState({seleccion: 0});
    this.setState({button: 0})
    clearInterval(this.transition);
  };
  clickIzquierda = () => {
    this.setState({ cuenta: this.state.cuenta - 1 });
    if (this.state.cuenta < 1) {
      this.setState({ cuenta: this.props.images.length - 1 });
    }
    this.setState({seleccion: 3});
    this.setState({button: 0})
    clearInterval(this.transition);
  };
  siguiente = () => {
    this.setState({seleccion: 1})
    this.setState({button: 1})
    this.transition = setInterval(this.clickDerecha,2000)
  }
  anterior = () => {
    this.setState({seleccion: 2})
    this.setState({button: 1})
    this.transition = setInterval(this.clickIzquierda,2000)
    

  }
  render() {
    if (this.props.anchura > 970) {
      return (
        <div>
          <div class="row middle-xs around-xs">
            <div className={this.state.boton[this.state.button]} onClick={this.anterior}>
              Átras
            </div>
            <img
              className={this.state.clase[this.state.seleccion]}
              src={this.props.images[this.state.cuenta]}
              alt={this.props.images[this.state.cuenta]}
            />
            <div className={this.state.boton[this.state.button]} onClick={this.siguiente}>
              {" "}
              Siguiente{" "}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="carrusel">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                onClick={this.clickDerecha}
                className="Lampara2Movil"
                src={this.props.images[this.state.cuenta]}
                alt={this.props.images[this.state.cuenta]}
              />
            </Grid>
            <Grid item xs={4} />
            <Grid
              className="contenedorCardMovil"
              item
              xs={4}
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              Toca la imagen para ver más
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </div>
      );
    }
  }
}
function Clases(){
  return[
    {
      clases: ["claseInicial","claseSiguiente","claseAtras","claseLlegada"],
      botones: ["butonCarrusel","botonTemporal"]
    }
  ]
}
export default Carrusel;
