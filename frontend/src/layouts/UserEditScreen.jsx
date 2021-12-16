import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  FormControlLabel,
  FormGroup,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MainHeader from './MainHeader';
import EditIcon from '@mui/icons-material/Edit';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const useStyles = makeStyles({
  mainPaper: {
    height: '70vh',
    width: '25rem',
    margin: '100px auto',
    padding: '20px',
  },
});

const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.id;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user?.name);
        setEmail(user?.email);
        setIsAdmin(user?.isAdmin);
      }
    }
  }, [user, userId, dispatch, successUpdate, navigate]);

  const myClasses = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, isAdmin);
    dispatch(
      updateUser({ _id: userId, name: name, email: email, isAdmin: isAdmin })
    );
  };

  return (
    <div>
      <MainHeader />
      <Container>
        <Paper className={myClasses.mainPaper} elevation={2}>
          {loading ? (
            <CircularProgress color="primary" size={40} />
          ) : error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{error}</strong>
            </Alert>
          ) : (
            <Grid align="center">
              <Avatar
                sx={{
                  padding: '5px',
                  marginBottom: '8px',
                  backgroundColor: 'black',
                }}
              >
                <EditIcon fontSize="large" />
              </Avatar>
              <Typography variant="h4">Update User </Typography>

              <form style={{ textAlign: 'left' }} onSubmit={submitHandler}>
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

                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={isAdmin} />}
                    label="Give Admin Access"
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: '30px' }}
                >
                  Update Details
                </Button>
              </form>
            </Grid>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default UserEditScreen;
