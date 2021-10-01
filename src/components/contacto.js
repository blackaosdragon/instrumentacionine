import React, {Component} from "react";
import {Card, CardContent,ListItem,Avatar,ListItemAvatar,ListItemText} from "@material-ui/core"
import Call from "@material-ui/icons/Call";
import Mail from "@material-ui/icons/Mail";
import Whats from "@material-ui/icons/WhatsApp";


class Contacto extends Component{

  copiar = (event) => {
    this.textArea.select();
    document.execCommand('copy');
    event.target.focus();
    //event.preventDefault();
    //event.clipboardData.setData('text/plain','hola mundo')
    console.log("copiado")

  }
    render(){
      if (this.props.anchura>970){
        return(
          <div>
              <Card className="contacto">
                <div class="row center-xs">
                <CardContent>
                <div>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                        <Call />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    
                      primary="Teléfono oficina"
                      secondary="(55) 55-83-91-82"

                    />
                  </ListItem>
                </div>
                <div>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                        <Whats />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    
                      primary="WhatsApp"
                      secondary="55-55-83-91-82"

                    />
                  </ListItem>
                </div>

                <div >
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                        <Mail />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                   
                      primary="Correo electrónico"
                      secondary="instrumentacion_@hotmail.com"
                      value="instrumentacion_@hotmail.com"
                    />
                  </ListItem>
                </div>
                <div >
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                        <Mail />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                   
                      primary="Correo electrónico"
                      secondary="contacto@instrumentaciononline.com.mx"                      
                    />
                  </ListItem>
                </div>
              </CardContent>
            </div>
          </Card>
      
      <div stye={{ margin: " 100px 0px 100px 0px" }}>.</div>
          </div>
      )

      } else {
        return(
          <div>
            <div className="margenSup">.</div>
            <div className="contenedorCardMovil">
              <h1 className="titulos">Datos de contacto</h1>                    
            </div>
            <div className="contenedorCardMovilContacto">
            <div>
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <Call />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              primary="Teléfono oficina"
              secondary="(55)55-83-91-82"
              />
            </ListItem>
            </div>
            <div>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar>
                        <Whats />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    
                      primary="WhatsApp"
                      secondary="(+52) 55-55-83-91-82"

                    />
                  </ListItem>
                </div>
            <div >
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <Mail />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              primary="Correo electrónico"
              secondary="instrumentacion_@hotmail.com"
              />
            </ListItem>
            </div>
            <div>
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <Mail />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              primary="Correo electrónico"
              secondary="contacto@instrumentaciononline.com.mx"
              />
            </ListItem>
            </div>


          </div>

        </div>

        )
        
      }
        
    }
}
export default Contacto