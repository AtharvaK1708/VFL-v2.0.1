import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import MainHeader from './MainHeader';
import {
  getOrderDetails,
  getPaymentDetails,
  updateIsDelivered,
  updateIsPaid,
} from '../actions/orderActions';
import moment from 'moment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const SingleOrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const orderPay = useSelector((state) => state.orderPay);
  const { paymentDetailsUpdated } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paymentResult = {
    id: paymentDetailsUpdated?.id,
    status: paymentDetailsUpdated?.status,
    updateTime: Date.now(),
    emailAddress: paymentDetailsUpdated?.customer_details?.email,
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (!paymentResult?.updateTime) {
    }
    dispatch(updateIsPaid(orderId, paymentResult));

    const checkoutDetails = JSON.parse(localStorage.getItem('checkoutUrl'));
    dispatch(getPaymentDetails(checkoutDetails?.id));

    // eslint-disable-next-line
  }, [dispatch, orderId, order?.isPaid, order?.isDelivered]);

  // ! PRICES :
  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  if (order) {
    order.itemsPrice = addDecimals(
      order?.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );
  }

  // ! PAYMENT HANDLER

  //eslint-disable-next-line
  const [reload, setReload] = useState(true);
  if (!reload) {
    window.location.reload();
  }

  if (!userInfo?.token) {
    navigate('/');
  }

  const deliverHandler = () => {
    dispatch(updateIsDelivered(order));
    window.location.reload();
  };

  return (
    <div>
      <MainHeader />

      {loading ? (
        <Container sx={{ marginTop: '7rem' }}>
          <Grid align="center">
            <CircularProgress color="primary" size={20} />
          </Grid>
        </Container>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Container>
          <Typography
            sx={{ fontWeight: '100', margin: '100px 20px 0' }}
            variant="h4"
          >
            Order Number : {order?._id}
          </Typography>

          <Grid sx={{ marginTop: '10px' }} container spacing={2}>
            <Grid item lg={8}>
              <Paper sx={{ padding: '15px' }}>
                <Typography sx={{ margin: '10px 0' }} variant="h6">
                  Shipping Address
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Name: {order?.user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {order?.user.email}
                </Typography>
                <Typography variant="subtitle1">
                  Address : {order?.shippingAddress.address},{' '}
                  {order?.shippingAddress.city},{' '}
                  {order?.shippingAddress.postalCode},{' '}
                  {order?.shippingAddress.country}
                </Typography>

                {order?.isDelivered ? (
                  <Alert
                    sx={{ margin: '10px 0', padding: '15px' }}
                    severity="success"
                  >
                    <AlertTitle>
                      The order has been delivered to the address mentioned
                      above!
                    </AlertTitle>
                    Payment done on{' '}
                    <strong>
                      {moment(
                        new Date(order?.deliveredAt),
                        'ddd DD-MMM-YYYY, hh:mm A'
                      ).format('ddd DD/MM/YYYY hh:mm A')}
                    </strong>
                  </Alert>
                ) : (
                  <Alert
                    sx={{ margin: '10px 0', padding: '15px' }}
                    severity="error"
                  >
                    The order is not yet delivered!
                  </Alert>
                )}

                <hr />
                <Typography sx={{ margin: '10px 0' }} variant="h6">
                  Payment Method
                </Typography>
                <Typography variant="subtitle2">
                  Method : {order?.paymentMethod}{' '}
                </Typography>
                {order?.isPaid ? (
                  <Alert
                    sx={{ margin: '10px 0', padding: '15px' }}
                    severity="success"
                  >
                    <AlertTitle>Payment Completed Successfully!</AlertTitle>
                    Payment done on{' '}
                    <strong>
                      {moment(
                        new Date(order?.paidAt),
                        'ddd DD-MMM-YYYY, hh:mm A'
                      ).format('ddd DD/MM/YYYY hh:mm A')}
                    </strong>
                  </Alert>
                ) : (
                  <Alert
                    sx={{ margin: '10px 0', padding: '15px' }}
                    severity="error"
                  >
                    The order is not Paid yet!
                  </Alert>
                )}
                <hr />
                <Typography variant="h5">Order Items</Typography>
                {order?.orderItems.map((item) => (
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
                        {item.quantity} X &#8377;{item.price} = &#8377;{' '}
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
                      &#8377;{order?.itemsPrice}
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
                      &#8377;{order?.shippingPrice}
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
                      &#8377; {order?.taxPrice}{' '}
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
                      &#8377; {order?.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <hr />
              </Paper>

              {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered ? (
                <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                  <Button
                    variant="contained"
                    color="payButton"
                    endIcon={<AssignmentTurnedInIcon />}
                    onClick={deliverHandler}
                    sx={{
                      left: '4%',
                      height: '3rem',
                      width: '19rem',
                      fontWeight: '500',
                      fontSize: '20px',
                    }}
                  >
                    Mark Delivered
                  </Button>
                </Paper>
              ) : (
                <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                  <Link to="/products" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="payButton"
                      sx={{
                        left: '4%',
                        height: '3rem',
                        width: '19rem',
                        fontWeight: '500',
                        fontSize: '20px',
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default SingleOrderScreen;
