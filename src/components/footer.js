import React, {Component} from 'react';
import Whats from "@material-ui/icons/WhatsApp";
import Mail from "@material-ui/icons/Mail";
import { Avatar, ListItemAvatar, ListItem } from '@material-ui/core';
import "flexboxgrid";

class Footer extends Component{
    render(){
      if (this.props.anchura>970){
        return(
          <div class="row">
              <div class="col-xs">
                <p class="box" className="titulos">Nuestras oficinas se encuentran en la calle de Tamagno #32 en la Colonia Peralvillo, Ciudad de México.</p>
              </div>
                <div class="col-xs">
                <p class="box" className="titulos">Si tiene alguna duda, sugerencia o tiene algún mal funcionamiento de la página favor de mandar un correo a contacto@intrumentaciononline.com.mx</p>
              </div>
              <div class="col-xs" >
                <p class="box" className="titulos">
                  <div className="footerIcons"> 
                    <ListItem >
                      <Whats /> WhatsApp: (52) 55 55 83 91 82
                    </ListItem >
                    <ListItem >              
                      <Mail />Correo: instrumentacion_@hotmail.com
                    </ListItem >
                    </div>
                
                </p>
              </div>
              
          </div>                
          
      )

      } else {
        return(
          <div>
            <p className="titulos">Nuestras oficinas se encuentran en la calle Francisco Tamagno #32 en la Colonia Ex Hipódromo de Peralvillo, Ciudad de México </p>
            <p className="titulos">Si tiene alguna duda, sugerencia o tiene algún mal funcionamiento de la página favor de mandar un correo a contacto@intrumentaciononline.com.mx</p>
            <p className="titulos" ><Whats /> (52) 55 55 83 91 82</p>
            <p className="titulos" ><Mail /> instrumentacion_@hotmail.com</p>
            
            
          </div>
        )

      }
        
    }
}
export default Footer;