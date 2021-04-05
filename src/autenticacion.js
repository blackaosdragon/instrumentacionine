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
        //console.log(this.props.handleName);
    }
    
    render(){
        console.log(this.props);
        if(this.props.logeado===1 && (this.props.level<=1 || this.props.level===2)){
            console.log("Se muestran equipos");
            return(
            <Redirect to="/panelDeControl" />
            )
            
        } else if(this.props.logeado===1 && (this.props.level===4 || this.props.level===3)){
            console.log("Prohibido");
            return(
                <Redirect to="/prohibido" />
            )
        } else if(this.props.logeado===0){
            console.log("Necesita autenticarse")
            return(
            <Login handleLevel={this.props.handleLevel} handleLogin={this.props.handleLogin} handleName={this.props.handleName} onChange={this.change} anchura={this.props.anchura} />
            )
            
        } else {
            console.log("NO encontrado");
            return(
                <React.Fragment>
                    Error
                </React.Fragment>
            )
        }
    }
}
export default Auth;