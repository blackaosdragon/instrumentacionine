import React, {Component} from 'react';
import "flexboxgrid";

class Footer extends Component{
    render(){
      if (this.props.anchura>970){
        return(
          <div class="row">
              <div class="col-xs">
                <p class="box" className="titulos">Nuestras oficinas se encuentran en la calle de Bethonven #173 esquina con Eje Central Lázaro Cárdenas en la colonia Peralvillo </p>
              </div>
                <div class="col-xs">
                <p class="box" className="titulos">Si tiene alguna duda, sugerencia o tiene algún mal funcionamiento de la página favor de mandar un correo a contacto@intrumentaciononline.com.mx</p>
              </div>
          </div>                
          
      )

      } else {
        return(
          <div>
            <p className="titulos">Nuestras oficinas se encuentran en la calle de Bethonven #173 esquina con Eje Central Lázaro Cárdenas en la colonia Peralvillo </p>
            <p className="titulos">Si tiene alguna duda, sugerencia o tiene algún mal funcionamiento de la página favor de mandar un correo a contacto@intrumentaciononline.com.mx</p>

          </div>
        )

      }
        
    }
}
export default Footer;