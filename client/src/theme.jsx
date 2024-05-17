import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Pinyon Script',
      'Julius Sans One',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h6: {
      fontFamily: 'Pinyon Script, cursive',
      fontSize: '4rem', // Increase the font size
      color: 'maroon', // Set the color to maroon
    },
    button: {
      fontFamily: 'Julius Sans One, sans-serif',
      color: 'black', // Set the button text color to black
    },
  },
});

export default theme;