import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Login from './components/controlDeUsuarios'

class Auth  extends Component{
    constructor(props){
        super(props);
        this.state = {
            logeado: 0
        }
    }

    change = data => {
        this.setState({
            logeado: data
        })
    }
    componentDidUpdate = (prevProps,prevState) => {
        console.log(this.props.handleName);
    }
    
    render(){
        //console.log(this.props.logeado);
        return(
            <Route>
                {this.props.logeado ? <Redirect to="/panelDeControl" /> : <Login handleLogin={this.props.handleLogin} handleName={this.props.handleName} onChange={this.change} anchura={this.props.anchura} />}
            </Route>
        )
    }
}
export default Auth;