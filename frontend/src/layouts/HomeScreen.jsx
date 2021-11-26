import React, { Fragment } from 'react';
import products from '../products';
import ProductCard from '../components/ProductCard';
import { Container, Grid } from '@mui/material';
import MainHeader from './MainHeader';

const HomeScreen = () => {
  return (
    <Fragment>
      <MainHeader />
      <Container sx={{ marginTop: '7rem' }}>
        <Grid container rowSpacing={4} columnSpacing={4}>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
