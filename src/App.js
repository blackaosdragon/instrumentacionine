import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import MainBar from "./components/mainBar.js"
import Home from "./components/home.js"
import Empresa from "./components/empresa"
import Contacto from "./components/contacto"
import Footer from "./components/footer.js"
import Lamparas from "./components/lamparas.js";
import Mesas from "./components/mesas.js";
import Aires from "./components/aires.js";

import Sensor from './components/sensor.js';


class App extends Component{
  constructor(){
    super();
    this.state = {
      width: window.innerWidth
      //cada vez que la altura cambia(width) en la ventana (window) va a actualizarse el estado
      //para mandarlo a los componentes que lo necesiten
    }
    this.handleListener = this.handleListener.bind(this);

    
  }

  handleListener(){
    this.setState({width: window.innerWidth});
    //actualiza el tamaño de la ventana
  }
  componentDidMount(){
    //let deferredPromt;
    window.addEventListener("resize",this.handleListener);
    /*
    window.addEventListener('beforeinstallprompt', event => {
      deferredPromt = e;
      showInstallPromotion();

    })
    */
    //este es elevento que "escucha" el cambio del tamaño de la ventana
    if (window.Notification){
      return new Promise((resolve,reject)=>{
          const permiso = Notification.requestPermission(result=>{
              resolve(result);
          });
          if (permiso){
            permiso.then(resolve,reject);
          }
      }).then(permiso=>{
        if (permiso !== 'granted'){
          alert("no hay permiso para lanzar las notificaciones");
        }
      })
  } else {
    alert("No se pueden utilizar notificaciones en este dispositivo");
  }
  }
  
  render(){
    
    
    return(
      <div className="App">
        <Router>
        <div >
          <div >.</div>
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

                    
          </Switch>
          <Footer anchura={this.state.width} />
        </div>
      </Router>
      
    </div>
    )    
  }
}

export default App;
