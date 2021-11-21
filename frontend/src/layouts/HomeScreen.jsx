import React from 'react';
import LandingHeader from './LandingHeader';
import products from '../products';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default HomeScreen;
