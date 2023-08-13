import { createTheme, ThemeOptions } from '@mui/material/styles';
import { getHexColor } from './mapStyles'


const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: getHexColor("--primary-highlight-color"),      
    },
    secondary: {
      main: getHexColor("--secondary-highlight-color"),      
    },
  }
}


export const theme = createTheme(themeOptions);