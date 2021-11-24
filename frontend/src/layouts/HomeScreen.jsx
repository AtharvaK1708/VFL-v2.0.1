import React from 'react';
import LandingHeader from './LandingHeader';
import products from '../products';
import ProductCard from '../components/ProductCard';
import { Container, Grid } from '@mui/material';

const HomeScreen = () => {
  return (
    <Container>
      <Grid container rowSpacing={4} columnSpacing={4}>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default HomeScreen;
