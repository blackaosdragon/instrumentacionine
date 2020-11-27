import React, { Component } from 'react';
import Monitor from '../temperatura.js';
import { FormControl, FormControlLabel,FormGroup,Switch } from '@material-ui/core';
import {Nivel0,Nivel1, Nivel2, Nivel3} from './nivel0.js';
import {Link} from 'react-router-dom';
import Loading from '../modalCarga.js';


export class MonitorTemp extends Component{
    constructor(){
        super();
        this.state = {
            notificaciones: false,
            cargando: true
        }
    }
    componentDidMount(){
        console.log("Componente cargado");
        this.setState({
            cargando: false
        })
    }
    handleStatus = () => {
        const { status } = this.props;
        status(0,3);
    }
    componentWillUpdate(prevProps,prevState){
    }
    render(){
        console.log(this.props)
        if(this.props.level===0){
            if(this.props.anchura>970){
                return(
                    <div>
                        <Nivel0 anchura={this.props.anchura}/>
                        <Link className="link" onClick={this.handleStatus} to="/panel"><h3 className="titulos"><div className="boton" onClick={this.session}>Cerrar sesión</div></h3></Link> 
                    </div>
                )   
            } else {
                return(
                    <div>
                        <Nivel0 anchura={this.props.anchura}/>
                        <Link className="link" onClick={this.handleStatus} to="/panel"><h3 className="titulos"><div className="boton" onClick={this.session}>Cerrar sesión</div></h3></Link> 
                    </div>
                )
                
            }
                     
    } else if (this.props.level===1){
        return(
            <div>
                <Nivel1 anchura={this.props.anchura}/>
                <Link className="link" onClick={this.handleStatus} to="/panel"><h3 className="titulos"><div className="boton" onClick={this.session}>Cerrar sesión</div></h3></Link> 
            </div>
        )
    } else if (this.props.level === 2){
        if(this.props.anchura>970){
            return(
                <div> 
                    <Nivel2 anchura={this.props.anchura}/> 
                    <Link className="link" onClick={this.handleStatus} to="/panel"><h3 className="titulos"><div className="boton" onClick={this.session}>Cerrar sesión</div></h3></Link> 
                </div>
            )
        } else {
            return(
                <div>
                    <Nivel2 anchura={this.props.anchura}/> 
                    <Link className="link" onClick={this.handleStatus} to="/panel"><h3 className="titulos"><div className="boton-movile" onClick={this.session}>Cerrar sesión</div></h3></Link> 
                </div>
            )

        }
    } else if(this.props.level===3){
        return(
            <div> 
                <Nivel3 anchura={this.props.anchura}/> 
                <Link className="link" onClick={this.handleStatus} to="/panel"><h3 className="titulos"><div className="boton" onClick={this.session}>Cerrar sesión</div></h3></Link>                     
            </div>
        )
    }
    else {
        return(
            
            <div>
                <Loading cargando={this.props.cargando} />
                Algo malo ocurrio
            </div>
        )
    }
    }
}