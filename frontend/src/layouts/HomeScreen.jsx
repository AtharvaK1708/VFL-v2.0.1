import React, { Fragment, useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Grid } from '@mui/material';
import MainHeader from './MainHeader';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/api/products');

      setProducts(res.data);
    };

    getProducts();
  }, []);

  return (
    <Fragment>
      <MainHeader />
      <Container sx={{ marginTop: '7rem' }}>
        <Grid container rowSpacing={4} columnSpacing={4}>
          {products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
