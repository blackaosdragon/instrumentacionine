import React, {Component} from 'react';
import "flexboxgrid";

class Footer extends Component{
    render(){
      if (this.props.anchura>970){
        return(
          <div class="row">
              <div class="col-xs">
                <p class="box" className="titulos">Nuestras oficinas se encuentran en la calle de Tamagno #43 en la Colonia Peralvillo </p>
              </div>
                <div class="col-xs">
                <p class="box" className="titulos">Si tiene alguna duda, sugerencia o tiene algún mal funcionamiento de la página favor de mandar un correo a contacto@intrumentaciononline.com.mx</p>
              </div>
          </div>                
          
      )

      } else {
        return(
          <div>
            <p className="titulos">Nuestras oficinas se encuentran en la calle Francisco Tamagno #32 en la Colonia Ex Hipódromo de Peralvillo, Ciudad de México </p>
            <p className="titulos">Si tiene alguna duda, sugerencia o tiene algún mal funcionamiento de la página favor de mandar un correo a contacto@intrumentaciononline.com.mx</p>

          </div>
        )

      }
        
    }
}
export default Footer;