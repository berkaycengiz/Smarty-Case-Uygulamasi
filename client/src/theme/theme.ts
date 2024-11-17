import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733',
    },
    secondary: {
      main: '#FF7043',
    },
    error: {
      main: '#F44336',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  }
});

export default theme;
