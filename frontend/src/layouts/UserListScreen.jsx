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
import { listUsers } from '../actions/userActions';
import MainHeader from './MainHeader';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../actions/userActions';
import { Helmet } from 'react-helmet';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/products');
    }
    //eslint-disable-next-line
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Admin Access | User List</title>
      </Helmet>
      <MainHeader />
      <Container sx={{ marginTop: '100px' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: '100', marginBottom: '30px' }}
        >
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Admin Access</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <DoneIcon sx={{ color: 'green' }} />
                    ) : (
                      <CloseIcon sx={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/users/${user._id}/edit`}>
                      <Button sx={{ marginRight: '10px' }} variant="outlined">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="redButton"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <DeleteForeverIcon sx={{ color: 'red' }} />
                    </Button>
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

export default UserListScreen;
