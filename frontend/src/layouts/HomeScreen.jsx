import React, { Fragment, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Grid } from '@mui/material';
import MainHeader from './MainHeader';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserDetails } from '../actions/userActions';
import { useNavigate } from 'react-router';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, redirect } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const infoFromLocalStorage = localStorage.getItem('userInfo');
  if (redirect) {
    navigate('/login');
  }

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MainHeader />
      {loading ? (
        <Container sx={{ marginTop: '7rem' }}>
          <CircularProgress color="primary" size={40} />
        </Container>
      ) : error ? (
        <Container sx={{ marginTop: '7rem' }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        </Container>
      ) : (
        <Container sx={{ marginTop: '7rem' }}>
          <Grid container rowSpacing={4} columnSpacing={4}>
            {products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default HomeScreen;
