import React, {Component} from "react";
import {Card, CardContent,ListItem,Avatar,ListItemAvatar,ListItemText} from "@material-ui/core"
import Call from "@material-ui/icons/Call"
import Mail from "@material-ui/icons/Mail"


class Contacto extends Component{
    render(){
      if (this.props.anchura>970){
        return(
          <div>
              <Card className="contacto">
                <div class="row center-xs">
                <CardContent>
                <div>
                  <ListItem button>
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
                  <ListItem button>
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
              </CardContent>
            </div>
          </Card>
      
      <div stye={{ margin: " 100px 0px 100px 0px" }}>.</div>
          </div>
      )

      } else {
        return(
          <div>
          <div className="contenedorCardMovilContacto">
            <div>Datos de contacto</div>
            <div>
            <ListItem button>
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
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Call />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              primary="Correo electrónico"
              secondary="instrumentacion_@hotmail.com"
              />
            </ListItem>
            </div>
            <div>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Call />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              primary="Correo electrónico"
              secondary="instrumentaciononline.com.mx"
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