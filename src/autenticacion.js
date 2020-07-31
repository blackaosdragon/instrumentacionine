import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Login from './components/controlDeUsuarios'

class Auth  extends Component{
    constructor(){
        super();
        this.state = {
            logeado: 1
        }
    }
    render(){
        return(
            <Route>
                {this.state.logeado ? <Redirect to="/panelDeControl" /> : <Login />}
            </Route>
        )
    }
}
export default Auth;