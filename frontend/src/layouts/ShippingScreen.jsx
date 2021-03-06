import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import MainHeader from './MainHeader';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
  mainPaper: {
    height: '70vh',
    width: '30rem',
    margin: '20px auto',
    padding: '20px',
  },
  checkoutSteps: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const myClasses = useStyles();

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Add shipping address</title>
      </Helmet>
      <MainHeader />
      <Container>
        <CheckoutSteps step1 step2 />
        <Paper className={myClasses.mainPaper} elevation={0}>
          <Grid align="center">
            <Avatar
              sx={{
                padding: '5px',
                marginBottom: '8px',
                backgroundColor: 'black',
              }}
            >
              <LocalShippingIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4">Shipping</Typography>
            {/* {message && (
              <Alert severity="error" sx={{ marginTop: '20px' }}>
                <AlertTitle>{message}</AlertTitle>
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ marginTop: '20px' }}>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )} */}
            <form onSubmit={submitHandler}>
              <TextField
                label="Address"
                variant="outlined"
                placeholder="Enter your Address"
                name="address"
                fullWidth
                required
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                label="City"
                variant="outlined"
                placeholder="Enter City"
                name="city"
                fullWidth
                required
                margin="normal"
                sx={{ margin: '30px 0' }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                label="Postal Code"
                variant="outlined"
                placeholder="Enter Postal Code"
                name="postalCode"
                value={postalCode}
                fullWidth
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <TextField
                label="Country"
                variant="outlined"
                placeholder="Enter Country"
                name="country"
                value={country}
                fullWidth
                sx={{ margin: '30px 0' }}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                fullWidth
                sx={{ marginTop: '30px' }}
              >
                Continue
              </Button>
            </form>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default ShippingScreen;
