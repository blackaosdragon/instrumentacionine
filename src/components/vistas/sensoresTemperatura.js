import React, { Component } from 'react';



export class Nivel0 extends Component{
    render(){
        if(this.props.anchura>970){
            return(
                <div>Vista normal</div>
            )
        } else {
            return(
                <div>
                    Vista Movil
                </div>
            )
               
        }
    }
}