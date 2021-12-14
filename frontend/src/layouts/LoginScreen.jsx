import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';

const useStyles = makeStyles({
  mainPaper: {
    height: '70vh',
    width: '25rem',
    margin: '90px auto',
    padding: '20px',
  },
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const myClasses = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const location = useLocation();

  const { error, userInfo } = userLogin;
  console.log(location.search);

  useEffect(() => {
    if (userInfo && location.search !== '?redirect=shipping') {
      navigate('/products');
    } else if (userInfo && location.search === '?redirect=shipping') {
      navigate('/shipping');
    }
    //eslint-disable-next-line
  }, [dispatch, navigate, userInfo]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <Container>
        <Paper className={myClasses.mainPaper} elevation={10}>
          <Grid align="center">
            <Avatar
              sx={{
                padding: '5px',
                marginBottom: '8px',
                backgroundColor: 'black',
              }}
            >
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4">Sign In</Typography>
            {error && (
              <Alert severity="error" sx={{ marginTop: '20px' }}>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <form onSubmit={loginSubmitHandler}>
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Enter email"
                name="email"
                fullWidth
                required
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
                Sign In
              </Button>
            </form>
            <Typography sx={{ marginTop: '30px' }}>
              New customer?{' '}
              <Link
                style={{ textDecoration: '', color: 'black' }}
                to="/register"
              >
                Create an account!
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginScreen;
