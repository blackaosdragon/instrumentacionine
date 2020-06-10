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
//import * as firebase from 'firebase/app'
//import 'firebase/messaging'
import Sensor from './components/sensor.js';
import Temperature from './components/temperatura.js';

class App extends Component{
  constructor(){
    super();
    this.state = {
      width: window.innerWidth,
      //cada vez que la altura cambia(width) en la ventana (window) va a actualizarse el estado
      //para mandarlo a los componentes que lo necesiten
      token: ""
    }
    this.handleListener = this.handleListener.bind(this); 
  }
  handleListener(){
    this.setState({width: window.innerWidth});
    //actualiza el tamaño de la ventana
  }
  componentDidMount(){
    /*
    if('chrome' in window){
      console.log("Usando Chrome");
      /*
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
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey('BCw81StElUUliyjpdiWSPTrGQw5L0Fq5tqMLHZWriMKYgN6abD-jy8tkhjnD2gdWj5mdeHE5UJcfyWhpaxzi-yo');
      messaging.getToken().then( token => {
        this.setState({token: token});
      })
      
      //alert("Usando Safari como navegador")
    }  else if ('safari' in window){
      if ('safari' in window && 'pushNotification' in window.safari){
        //alert('Soporta notificaciones');
        //window.safari.pushNotification.permision()
      }
      //window.safari.pushNotification
    }
    else {
      console.log("Se está usando otro navegador que no es safari")
      //alert("No se esta usando safari como navegador")
    }*/
    window.addEventListener("resize",this.handleListener);

/*
    navigator.serviceWorker.addEventListener("message", data => {
      console.log("Datos recibidos: ",data);

      /*navigator.serviceWorker.ready.then( mensaje => {
        mensaje.showNotification(
          'Alerta',{
            body: 'Notificacion en primer plano',
            badge: '/termometro192x192.png',
            icon: '/logo.png',
          }
        )
      })
    })*/
    /*
    window.addEventListener('beforeinstallprompt', e => {
      e.userChoice.then((eleccion)=>{
        console.log(eleccion);
      })
    })
    */
    
    //este es elevento que "escucha" el cambio del tamaño de la ventana
    //let url = "https://instrumentacionline.ddns.net/token";
    
    //let center = UNUserNotificationCenter.current()
    //console.log(navigator.appName);
    /*messaging.requestPermission().then(()=>{

    })*/
/*
    if (window.Notification){
      messaging.requestPermission().then(()=>{
        console.log("Tenemos permiso");
        messaging.getToken().then( token => {
          //let data = {token: "123456"};
          let data = {token: `${token}`}
          if (token){
            fetch(url,{
              method: 'POST',
              body: JSON.stringify(data),
              headers:{
                'Content-Type': 'application/json' 
              }
            }).then(res => res.json()).catch( err => {
              console.warn("Error: ",err);
            }).then( respuesta => {
              console.log('Terminado',respuesta);
            });
            
          }
          
        })
        return messaging.getToken();
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
    })//
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
  }*/
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

                    
          </Switch>
          <Footer anchura={this.state.width} />
        </div>
      </Router>
      
    </div>
    )    
  }
}

export default App;
