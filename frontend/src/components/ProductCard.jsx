import React, { Fragment } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  // console.log(require('../images/airpods.jpg').default);
  // Object.keys(images).map((key, index) => console.log(images[key].default));
  console.log(product);

  return (
    <Fragment>
      <Card sx={{ width: '200px' }}>
        <CardMedia
          sx={{ height: 140 }}
          component="img"
          square
          image={product.image}
          alt="asi"
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
