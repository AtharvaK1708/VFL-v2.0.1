import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
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
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
  mainPaper: {
    height: '90vh',
    width: '25rem',
    margin: '20px auto',
    padding: '20px',
  },
});

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const myClasses = useStyles();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const navigate = useNavigate();

  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate('/products');
    }
  }, [dispatch, navigate, userInfo]);

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Create an account</title>
      </Helmet>
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
            <Typography variant="h4">Sign Up</Typography>
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
            <form onSubmit={registerSubmitHandler}>
              <TextField
                label="Name"
                variant="outlined"
                placeholder="Enter your Full Name"
                name="name"
                fullWidth
                required
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
                Create account
              </Button>
            </form>
            <Typography sx={{ marginTop: '30px' }}>
              Already have an account?{' '}
              <Link style={{ textDecoration: '', color: 'black' }} to="/login">
                Login now!
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterScreen;
