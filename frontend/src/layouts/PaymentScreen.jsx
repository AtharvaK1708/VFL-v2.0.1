import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import MainHeader from './MainHeader';

const useStyles = makeStyles({
  mainPaper: {
    height: '50vh',
    width: '30rem',
    margin: '50px auto',
    padding: '50px',
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
      <MainHeader />
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

            <form style={{ textAlign: 'left' }} onSubmit={submitHandler}>
              <FormControl component="fieldset">
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
                sx={{ marginTop: '50px' }}
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

export default PaymentScreen;
