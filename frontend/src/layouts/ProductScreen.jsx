import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import MainHeader from './MainHeader';
import { makeStyles } from '@mui/styles';
import Rating from '../components/Rating';
import { grey } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsDetails } from '../actions/productActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';

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
    left: '30%',
    width: '200px',
  },

  addToCartPaper: {
    marginTop: '9rem',
    marginLeft: '7rem',
  },
});

const ProductScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  // const product = products.find((p) => p._id === params.id);
  const myClasses = useStyles();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(listProductsDetails(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?quantity=${quantity}`);
  };

  return (
    <div>
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
                  src={product?.image}
                  alt="product-img"
                  className={myClasses.productImage}
                />
              </Paper>
            </Grid>

            <Grid item lg={4}>
              <Paper elevation={0} className={myClasses.detailsPaper}>
                <Typography variant="h5" gutterBottom>
                  {product?.name}
                </Typography>
                <hr></hr>
                <Typography variant="subtitle2" color={grey[400]} gutterBottom>
                  <Rating
                    totalRating={product?.rating}
                    numReviews={product?.numReviews}
                  />
                </Typography>
                <hr></hr>
                <Typography variant="h6" gutterBottom>
                  Price: ${product?.price}
                </Typography>

                <hr></hr>
                <Typography variant="subtitle1">
                  Description: {product?.description}
                </Typography>
              </Paper>
            </Grid>

            <Grid item lg={4}>
              <TableContainer
                className={myClasses.addToCartPaper}
                component={Paper}
                elevation={4}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>${product?.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        {product?.countInStock > 0
                          ? 'In Stock'
                          : 'Out Of Stock'}
                      </TableCell>
                    </TableRow>
                    {product?.countInStock > 0 && (
                      <TableRow>
                        <TableCell>Select Quantity</TableCell>
                        <TableCell>
                          <FormControl>
                            <Select
                              sx={{ width: '109px' }}
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(product?.countInStock).keys()].map(
                                (x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell>
                        <Button
                          className={myClasses.addToCartButton}
                          disabled={product?.countInStock === 0}
                          variant="contained"
                          size="large"
                          fullwidth
                          color="darkButton"
                          onClick={addToCartHandler}
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
      )}
    </div>
  );
};

export default ProductScreen;
