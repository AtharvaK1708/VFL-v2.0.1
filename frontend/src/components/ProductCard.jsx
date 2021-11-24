import React, { Fragment } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Item,
} from '@mui/material';
import Rating from './Rating';
import { grey } from '@mui/material/colors';

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card elevation={2}>
        <a href={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            square
            image={product.image}
            alt="product-img"
          ></CardMedia>
        </a>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color={grey[400]} gutterBottom>
            <Rating
              totalRating={product.rating}
              numReviews={product.numReviews}
            />
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            $ {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
