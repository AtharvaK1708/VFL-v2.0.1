import React, { useState, useEffect } from 'react';
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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const useStyles = makeStyles({
  mainPaper: {
    height: '60vh',
    width: '30rem',
    margin: '50px auto',
    padding: '30px',
  },
  checkoutSteps: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const myClasses = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div>
      <Container>
        <CheckoutSteps step1 step2 step3 />
        <Paper className={myClasses.mainPaper} elevation={0}>
          <Grid align="center">
            <Avatar
              sx={{
                padding: '5px',
                marginBottom: '8px',
                backgroundColor: 'black',
              }}
            >
              <PaymentIcon fontSize="large" />
            </Avatar>
            <Typography sx={{ marginBottom: '20px' }} variant="h4">
              Select a Payment Method
            </Typography>

            <form onSubmit={submitHandler}>
              <FormControl sx={{ textAlign: 'left' }} component="fieldset">
                <RadioGroup
                  aria-label="payment-method"
                  defaultValue="PayPal"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="PayPal"
                    control={<Radio />}
                    label="PayPal or Credit Card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FormControlLabel
                    value="Stripe"
                    control={<Radio />}
                    label="Stripe"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
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
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: '30px' }}
                  endIcon={<ArrowBackIcon />}
                >
                  Back to cart
                </Button>
              </Link>
            </form>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentScreen;
