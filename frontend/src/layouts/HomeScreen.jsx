import React, { Fragment, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Grid } from '@mui/material';
import MainHeader from './MainHeader';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from 'react-helmet';

import { useNavigate, useParams } from 'react-router';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const keyword = params.keyword;
  const pageNumber = params.pageNumber;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, redirect, page, pages } = productList;

  if (redirect) {
    navigate('/login');
  }

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, false));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Helmet>
        <title>Welcome To VFL | Home</title>
      </Helmet>
      <MainHeader />
      {/* {isMatch && <DrawerComponent userInfo={userInfo} />} */}
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
      <Paginate
        pages={pages}
        page={page && page}
        keyword={keyword ? keyword : ''}
      />
    </Fragment>
  );
};

export default HomeScreen;
