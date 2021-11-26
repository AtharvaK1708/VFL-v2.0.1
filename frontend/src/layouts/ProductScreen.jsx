import React from 'react';
import products from '../products';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from '@mui/material';
import MainHeader from './MainHeader';
import { makeStyles } from '@mui/styles';
import Rating from '../components/Rating';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles({
  productImage: {
    width: '100%',
    height: '100%',
    marginTop: '6rem',
  },
  paper: {
    width: '25rem',
    height: '25rem',
  },
  link: {
    textDecoration: 'none',
  },
  detailsPaper: {
    padding: '2.2rem',
    marginLeft: '2rem',
    width: '20rem',
    marginTop: '5.5rem',
  },
  addToCartButton: {
    marginLeft: '3rem',
    borderRadius: '0',
  },

  addToCartPaper: {
    marginTop: '9rem',
    marginLeft: '7rem',
  },
});

const ProductScreen = () => {
  const params = useParams();
  const product = products.find((p) => p._id === params.id);
  const myClasses = useStyles();

  return (
    <div>
      <MainHeader />
      <Container>
        <Link to="/products" className={myClasses.link}>
          <Button variant="contained" sx={{ marginTop: '5rem' }}>
            Go back
          </Button>
        </Link>

        <Grid container spacing={2}>
          <Grid item lg={4}>
            <Paper className={myClasses.paper} elevation={0}>
              <img
                src={product.image}
                alt="product-img"
                className={myClasses.productImage}
              />
            </Paper>
          </Grid>

          <Grid item lg={4}>
            <Paper elevation={0} className={myClasses.detailsPaper}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <hr></hr>
              <Typography variant="subtitle2" color={grey[400]} gutterBottom>
                <Rating
                  totalRating={product.rating}
                  numReviews={product.numReviews}
                />
              </Typography>
              <hr></hr>
              <Typography variant="h6" gutterBottom>
                Price: ${product.price}
              </Typography>

              <hr></hr>
              <Typography variant="subtitle1">
                Description: {product.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid item lg={4}>
            <TableContainer
              className={myClasses.addToCartPaper}
              component={Paper}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        className={myClasses.addToCartButton}
                        disabled={product.countInStock === 0}
                        variant="contained"
                        size="large"
                        fullwidth
                        color="darkButton"
                      >
                        Add to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductScreen;
