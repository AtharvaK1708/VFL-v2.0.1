import React, { Fragment } from 'react';
import LandingPage from './layouts/LandingPage';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    buttonColor: {
      main: '#009688',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: 400,
    fontWeightRegular: 500,
  },
});

const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <LandingPage className="landing" />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
