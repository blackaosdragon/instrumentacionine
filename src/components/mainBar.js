import React, { Component } from "react";
import "flexboxgrid";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Popover from "@material-ui/core/Popover";

import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";

import "../App.css";


class MainBar extends Component {
  constructor(){
    super();
    this.state = {
      menuOpen: false    
    }
  }
  handleClick = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }
  render() {
    if (this.props.anchura>970){
      return (
        <AppBar className="BarraPrincipal" position="static" color="#f2f2f2">
          <div class="row betwen-xs middle-xs">
            <div class="col-xs-6">
              {" "}
              <div class="box">
                <Link to="/">
                  <img
                    className="logo"
                    src={Logo}
                    alt="instrumentacion"
                  />
                </Link>
              </div>
            </div>
            <div class="col-xs-6">
              <div class="row center-xs">
                <div class="col-xs-2" className="boton-link">
                  <Link className="enlace" to="/empresa">
                      <p className="principalButton">Empresa</p>                  
                  </Link>
                </div>
                <div class="col-xs-2" className="boton-link">
                  <Link className="enlace" to="/contacto">          
                    <p className="principalButton">Contacto</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AppBar>
      );
    } else {
      return (
        <div className="mainBar">
          <div class="row betwen-xs middle-xs">
            <div class="col-xs-6">
              {" "}
              <div class="box">
                <Link to="/">
                  <img
                    className="logoMovil"
                    src={Logo}
                    alt="instrumentacion"
                  />
                </Link>
              </div>
            </div>
            <div class="col-xs-6">
            <MenuIcon 
              onClick={this.handleClick}
              className="botonIcono" 
            />
            <Popover 
            anchorReference="anchorPosition"
            anchorPosition={{ top: 80, left: 700 }}
              open={this.state.menuOpen}
              onClose={this.handleClick}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "right"
              }}
              >
                <Link
                    className="link"
                    onClick={this.handleClick}
                    to="./empresa"
                  >
                    <div className="principalButton">Empresa</div>
                  </Link>
                  <Link
                    className="link"
                    onClick={this.handleClick}
                    to="./contacto"
                  >
                    <div className="principalButton">Contacto</div>
                  </Link>
              </Popover>
            
              
            </div>
          </div>
        </div>
      );            
    }
    
  }
}
export default MainBar;