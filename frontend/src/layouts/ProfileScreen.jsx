import React, { Fragment, useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import MainHeader from './MainHeader';
import moment from 'moment';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getMyOrders } from '../actions/orderActions';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles({
  mainPaper: {
    height: '70vh',
    width: '25rem',
    margin: '100px auto',
    padding: '20px',
  },
  secondaryPaper: {
    height: '70vh',
    width: '57rem',
    margin: '100px auto',
    padding: '20px',
  },
});

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const myClasses = useStyles();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.myOrders);
  const { loading, myOrderError, orders } = myOrders;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'));
        dispatch(getMyOrders());
      } else {
        setName(user?.name);
        setEmail(user?.email);
      }
    }
  }, [dispatch, navigate, user, userInfo]);

  return (
    <Fragment>
      <MainHeader />
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <Paper className={myClasses.mainPaper} elevation={2}>
            <Grid align="center">
              <Typography textAlign="left" variant="h4">
                Update Profile
              </Typography>
              {message && (
                <Alert severity="error" sx={{ marginTop: '20px' }}>
                  <AlertTitle>{message}</AlertTitle>
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ marginTop: '20px' }}>
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ marginTop: '20px' }}>
                  <AlertTitle>Profile Updated Successfully</AlertTitle>
                </Alert>
              )}

              <form onSubmit={submitHandler}>
                <TextField
                  label="Name"
                  variant="outlined"
                  placeholder="Enter your Full Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  placeholder="Enter email"
                  name="email"
                  fullWidth
                  margin="normal"
                  sx={{ margin: '30px 0' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  placeholder="Enter password"
                  name="password"
                  type="password"
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  placeholder="Repeat password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  fullWidth
                  sx={{ margin: '30px 0' }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: '30px' }}
                >
                  Update
                </Button>
              </form>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={8}>
          <Paper className={myClasses.secondaryPaper} elevation={0}>
            {loading ? (
              <h2>loading</h2>
            ) : myOrderError ? (
              <Alert severity="error" sx={{ marginTop: '20px' }}>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Date of Order</TableCell>
                    <TableCell align="left">Total Price</TableCell>
                    <TableCell align="left">Paid</TableCell>
                    <TableCell align="left">Delivered</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>
                        {moment(
                          new Date(order?.createdAt),
                          'ddd DD-MMM-YYYY, hh:mm A'
                        ).format('ddd DD/MM/YYYY hh:mm A')}
                      </TableCell>
                      <TableCell>&#8377;{order.totalPrice}</TableCell>
                      <TableCell>
                        {moment(
                          new Date(order?.paidAt),
                          'ddd DD-MMM-YYYY, hh:mm A'
                        ).format('ddd DD/MM/YYYY hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {order.isDelivered ? <DoneIcon /> : <CloseIcon />}
                      </TableCell>
                      <TableCell>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/order/${order._id}`}
                        >
                          <Button size="small" variant="contained">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfileScreen;
