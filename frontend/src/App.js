import React, { Fragment } from 'react';
import LandingPage from './layouts/LandingPage';
import { ThemeProvider, createTheme } from '@mui/material';
import HomeScreen from './layouts/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './layouts/ProductScreen';
import CartScreen from './layouts/CartScreen';

const theme = createTheme({
  palette: {
    buttonColor: {
      main: '#009688',
      contrastText: '#fff',
    },
    darkNav: {
      main: '#212121',
    },
    darkButton: {
      main: '#212121',
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
    <Router>
      <Fragment>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />
            <Route path="/products" element={<HomeScreen />} exact />
            <Route path="/products/:id" element={<ProductScreen />} exact />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </ThemeProvider>
      </Fragment>
    </Router>
  );
};

export default App;
