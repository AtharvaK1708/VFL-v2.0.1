import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import PaymentIcon from '@mui/icons-material/Payment';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import MainHeader from './MainHeader';
import { Helmet } from 'react-helmet';

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const myClasses = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div>
      <Helmet>
        <title>Select Payment Method</title>
      </Helmet>
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
                  defaultValue="Stripe"
                  name="radio-buttons-group"
                >
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
