import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Stack,
  Item,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import MainHeader from './MainHeader';

const useStyles = makeStyles({
  mainPaper: {
    height: '90vh',
    width: '30rem',
    margin: '20px auto',
    padding: '20px',
  },
  checkoutSteps: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const PlaceOrderScreen = () => {
  const placeOrderHandler = () => {
    console.log('order placed');
  };

  const myClasses = useStyles();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  // ! PRICES :

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  cart.shippingPrice = addDecimals(cart.cartItems > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  return (
    <div>
      <MainHeader />
      <Container>
        <CheckoutSteps step1 step2 step3 step4 />
        <Grid sx={{ marginTop: '10px' }} container spacing={2}>
          <Grid item lg={8}>
            <Paper sx={{ padding: '15px' }}>
              <Typography sx={{ margin: '10px 0' }} variant="h6">
                Shipping Address
              </Typography>
              <Typography variant="subtitle2">
                Address : {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </Typography>

              <hr />
              <Typography sx={{ margin: '10px 0' }} variant="h6">
                Payment Method
              </Typography>
              <Typography variant="subtitle2">
                Method : {paymentMethod}{' '}
              </Typography>
              <hr />
              <Typography variant="h5">Order Items</Typography>
              {cartItems.map((item) => (
                <Grid
                  sx={{ margin: '12px 0px' }}
                  key={item.product}
                  container
                  spacing={2}
                >
                  <Grid item lg={1}>
                    <Avatar
                      sx={{ borderRadius: '0' }}
                      alt="cartImage"
                      src={item.image}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle1">
                      {item.quantity} X ${item.price} = ${' '}
                      {item.quantity * item.price}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>
          <Grid item lg={4}>
            <Paper sx={{ padding: '20px' }}>
              <Typography variant="h4" sx={{ fontWeight: '100' }}>
                Order Summary
              </Typography>
              <hr />
              <Grid sx={{ marginBottom: '15px' }} container spacing={2}>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">Items : </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">
                    {cartItems.length}
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid sx={{ marginBottom: '15px' }} container spacing={2}>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">Shipping :</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">
                    $ {cart.shippingPrice}
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid sx={{ marginBottom: '15px' }} container spacing={2}>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">Tax : </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">
                    $ {cart.taxPrice}{' '}
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid sx={{ marginBottom: '15px' }} container spacing={2}>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">Total : </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography variant="subtitle1">
                    $ {cart.totalPrice}
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Button
                variant="contained"
                size="large"
                sx={{ margin: '10px 7px', width: '20rem' }}
                color="darkButton"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PlaceOrderScreen;
