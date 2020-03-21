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
import * as firebase from 'firebase/app'
import 'firebase/messaging'

import Sensor from './components/sensor.js';

firebase.initializeApp({
  apiKey: "AIzaSyCT0s6Exqtbh5W9J-Aa5XJLXsQyepD4aUk",
  authDomain: "home-8bea3.firebaseapp.com",
  databaseURL: "https://home-8bea3.firebaseio.com",
  projectId: "home-8bea3",
  storageBucket: "home-8bea3.appspot.com",
  messagingSenderId: "441591788565",
  appId: "1:441591788565:web:c0d31b9846f53b3ccbca1c",
  measurementId: "G-10C166HQ2R"
});

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
    //const messaging
    window.addEventListener("resize",this.handleListener);
    window.addEventListener('beforeinstallprompt', e => {
      e.userChoice.then((eleccion)=>{
        console.log(eleccion);
      })
    })
    const messaging = firebase.messaging();
    messaging.onMessage( payload => {
      console.log(payload);
    })
    //este es elevento que "escucha" el cambio del tamaño de la ventana
    if (window.Notification){
      messaging.requestPermission().then(()=>{
        console.log("Tenemos permiso");
        return messaging.getToken()
      }).then( token => {
        console.log(token);
      }).catch( err => {
        console.log("Error: ",err);
      })
      /*
      Notification.requestPermission().then(permiso=>{
        //if (permiso)
        console.log(permiso)
        return messaging.getToken();
    })/*.then((myToken)=>{
        console.log(myToken); 
    }).catch(err=>{
        console.log(err);
    })*/
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
  /*
  window.onload = (e) => { 
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
    });
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  }
  */
 
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
