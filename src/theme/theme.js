import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
        primary : {
            main: '#0059b3'
        },
        common : {
            white: 'white'
        },
        secondary : {
            main: '#002b80'
        }        
    },
    spacing : 10
});

export default theme