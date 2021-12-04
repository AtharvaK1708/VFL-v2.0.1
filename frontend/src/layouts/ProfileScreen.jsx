import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import MainHeader from './MainHeader';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

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
            Orders
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfileScreen;
