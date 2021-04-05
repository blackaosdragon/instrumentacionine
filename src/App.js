import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route,
  PrivateRoute} from "react-router-dom";

import MainBar from "./components/mainBar.js"
import Home from "./components/home.js"
import Empresa from "./components/empresa"
import Contacto from "./components/contacto"
import Footer from "./components/footer.js"
import Lamparas from "./components/lamparas.js";
import Mesas from "./components/mesas.js";
import Aires from "./components/aires.js";
import Sensor from './components/sensor.js';
import Temperature from './components/temperatura.js';
import Consulta from './components/consultaBase.js';
import Login from './components/controlDeUsuarios.js';
import ConsolaDeControl from './components/panelDeCOntrol.js';
import Panel from './autenticacion.js';
import Control from './authentication2.js'
import Registro from './components/registro.js';
import Equipos from './components/equipos.js';
import Prohibido from './components/vistas/prohibido.js';

class App extends Component{
  constructor(){
    super();
    this.state = {
      width: 1,
      name: "",
      logeado: 0,
      notificaciones: 1,
      nivel: 5
      //cada vez que la altura cambia(width) en la ventana (window) va a actualizarse el estado
      //para mandarlo a los componentes que lo necesiten
      //token: ""
    }
    //this.handleListener = this.handleListener.bind(this); 
  }
  /*
  handleListener(){
    this.setState({width: window.innerWidth});
    //actualiza el tamaño de la ventana
  }*/
  
  componentDidUpdate(prevProps, prevState){
    //console.log("Movido")
    if(this.state.width!==prevState.width){
      //console.log("Cambio de dimensiones");
      //console.log(this.state);
    }

  }
  handleName = (name) => {
    localStorage.setItem('userName',name);
    this.setState({
      name: name
    })
    
  }
  handleLevel = level => {
    this.setState({
      nivel: level
    })
    console.log(`Nivel actualizado a ${level}`)
  }
  handleStatus = (status) => {
    localStorage.setItem('SessionActiva',status);
    this.setState({
      logeado: status
    })
    console.log("Status: ");
    console.log(status)
  }
  handleNotifis = (active) => {
    this.setState({
      notificaciones: active
    })
  }
  componentDidMount(){
    
    this.setState(
      {
        width: window.innerWidth
      }
    );
  }
  
  
  render(){
    return(
      <div className="App">
        <Router>
        <div>
          <div>
            <MainBar className="MainBar" anchura={this.state.width}/>
          </div>
          <Switch>
          <Route exact path="/" component={()=> <Home anchura={this.state.width} />} />
          <Route path="/empresa" component={() => <Empresa anchura={this.state.width} />} />
          <Route path="/contacto" component={() => <Contacto anchura={this.state.width} />} />
          <Route path="/lamparas" component={()=> <Lamparas anchura={this.state.width} />} />
          <Route path="/mesas" component={()=> <Mesas anchura={this.state.width} />} />
          <Route path="/aires" component={() => <Aires anchura={this.state.width} />} />
          <Route path="/sensor" component={() => <Sensor anchura={this.state.width} />} />
          <Route path="/monitor" component={()=> <Temperature anchura={this.state.width}/> }/>
          <Route path="/consulta" component={()=> <Consulta anchura={this.state.width} />} />
          <Route path="/panelDeControl" component={()=> <ConsolaDeControl notifis={this.state.notificaciones}handleNotifis={this.handleNotifis} handleStatus={this.handleStatus} name={this.state.name} anchura={this.state.width} />} />
          <Route path="/panel" component={()=> <Panel logeado={this.state.logeado} handleLevel={this.handleLevel} handleLogin={this.handleStatus} handleName={this.handleName} anchura={this.state.width} level={this.state.nivel}/>} />
          <Route path="/control" component={()=> <Control logeado={this.state.logeado} handleLevel={this.handleLevel} handleLogin={this.handleStatus} handleName={this.handleName} anchura={this.state.width} level={this.state.nivel} />} />
          <Route path="/login" component={()=> <Login  anchura={this.state.width} />} />
          <Route path="/registro" component={()=> <Registro  anchura={this.state.width} />} />
          <Route path="/equipos" component={()=><Equipos anchura={this.state.width} />} />
          <Route path='/prohibido' component={()=><Prohibido anchura={this.state.width} />} />

          

                    
          </Switch>
          <Footer anchura={this.state.width} />
        </div>
      </Router>
      
    </div>
    )    
  }
}

export default App;
