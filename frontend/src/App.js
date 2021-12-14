import React, { Fragment } from 'react';
import LandingPage from './layouts/LandingPage';
import { ThemeProvider, createTheme } from '@mui/material';
import HomeScreen from './layouts/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './layouts/ProductScreen';
import CartScreen from './layouts/CartScreen';
import LoginScreen from './layouts/LoginScreen';
import RegisterScreen from './layouts/RegisterScreen';
import ProfileScreen from './layouts/ProfileScreen';
import ShippingScreen from './layouts/ShippingScreen';
import PaymentScreen from './layouts/PaymentScreen';
import PlaceOrderScreen from './layouts/PlaceOrderScreen';
import OrderScreen from './layouts/OrderScreen';
import SingleOrderScreen from './layouts/SingleOrderScreen';

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
    payButton: {
      main: '#fdd835',
      contrastText: '#000',
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
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id/pay" element={<OrderScreen />} />
            <Route path="/order/:id/" element={<SingleOrderScreen />} />
          </Routes>
        </ThemeProvider>
      </Fragment>
    </Router>
  );
};

export default App;
