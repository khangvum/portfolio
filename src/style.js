import { createTheme } from '@mui/material/styles';

const style = createTheme({
  palette: {
    primary: {
      main: '#006241',  // Bishop Green
      light: '#32916b',
      dark: '#00391b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B87F0D', // Gold accent
    },
    background: {
      default: '#f4f1ea', // Parchment/Off-white background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Lora', 'serif'", // Classic serif for body
    h1: {
      fontFamily: "'Cinzel', serif", // Stone-carved look for headers
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
    },
  },
});

export default style;