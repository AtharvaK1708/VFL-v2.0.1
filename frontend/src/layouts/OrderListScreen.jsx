import {
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Button,
} from '@mui/material';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from './MainHeader';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { getAllOrders } from '../actions/orderActions';
import moment from 'moment';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate('/products');
    }
    //eslint-disable-next-line
  }, [dispatch]);

  return (
    <Fragment>
      <MainHeader />
      <Container sx={{ marginTop: '100px' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: '100', marginBottom: '30px' }}
        >
          All Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Done</TableCell>
                <TableCell>Delivery Done</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user && order.user.name}</TableCell>
                  <TableCell>
                    {moment(
                      new Date(order?.createdAt),
                      'ddd DD-MMM-YYYY, hh:mm A'
                    ).format('ddd DD/MM/YYYY hh:mm A')}
                  </TableCell>
                  <TableCell>&#8377;{order.totalPrice}</TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      moment(
                        new Date(order?.paidAt),
                        'ddd DD-MMM-YYYY, hh:mm A'
                      ).format('ddd DD/MM/YYYY hh:mm A')
                    ) : (
                      <CloseIcon sx={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered ? (
                      moment(
                        new Date(order?.deliveredAt),
                        'ddd DD-MMM-YYYY, hh:mm A'
                      ).format('ddd DD/MM/YYYY hh:mm A')
                    ) : (
                      <CloseIcon sx={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/order/${order._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button sx={{ marginRight: '10px' }} variant="outlined">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
};

export default OrderListScreen;
