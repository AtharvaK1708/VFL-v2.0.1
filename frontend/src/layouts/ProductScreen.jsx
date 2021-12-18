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
  InputLabel,
  TextField,
} from '@mui/material';
import MainHeader from './MainHeader';
import { makeStyles } from '@mui/styles';
import Rating from '../components/Rating';
import { grey } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, listProductsDetails } from '../actions/productActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
  productImage: {
    width: '100%',
    height: '100%',
    marginTop: '6rem',
  },
  paper: {
    width: '25rem',
    height: '25rem',
    backgroundColor: 'rgb(224, 242, 241)',
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
  const myClasses = useStyles();

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  //eslint-disable-next-line
  const { userInfo } = userLogin;

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [greenAlert, setGreenAlert] = useState(false);

  useEffect(() => {
    if (successProductReview) {
      setGreenAlert(true);
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(params.id));
  }, [dispatch, params.id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?quantity=${quantity}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Helmet>
        <title>{product?.name}</title>
      </Helmet>
      <MainHeader />
      {loading ? (
        <Container sx={{ marginTop: '7rem' }}>
          <Grid align="center">
            <CircularProgress color="primary" size={20} />
          </Grid>
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
                  Price: &#8377;{product?.price}
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

          <Grid container spacing={2}>
            <Grid item lg={6} sx={{ marginTop: '60px', padding: '20px' }}>
              <Typography sx={{ marginBottom: '10px' }} variant="h5">
                Reviews
              </Typography>
              {product?.reviews.length === 0 ? (
                <Alert sx={{ marginTop: '20px' }} severity="info">
                  <AlertTitle>No Reviews for this Product</AlertTitle>
                </Alert>
              ) : (
                product?.reviews.map((review) => (
                  <Paper sx={{ margin: '20px 0', padding: '10px' }}>
                    <Container>
                      <Typography variant="subtitle1">{review.name}</Typography>
                      <Rating totalRating={review.rating} />
                      <Typography variant="subtitle2">
                        Reviewed On :{' '}
                        {moment(
                          new Date(review.createdAt),
                          'ddd DD-MMM-YYYY, hh:mm A'
                        ).format('ddd DD/MM/YYYY ')}
                      </Typography>
                      <Typography
                        sx={{ marginTop: '20px' }}
                        variant="subtitle1"
                      >
                        {review.comment}
                      </Typography>
                    </Container>
                  </Paper>
                ))
              )}
            </Grid>

            {/*REVIEW*/}
            <Grid item lg={6} sx={{ marginTop: '60px', padding: '20px' }}>
              <Typography sx={{ marginBottom: '10px' }} variant="h5">
                Write a customer review!
              </Typography>
              <form onSubmit={submitReviewHandler}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Rating
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    // sx={{ width: '109px' }}
                    defaultValue=""
                    id="demo-simple-select"
                    value={rating}
                    label="Select Rating"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <MenuItem value="9">Select..</MenuItem>
                    <MenuItem value="1">1 - Poor</MenuItem>
                    <MenuItem value="2">2 - Fair</MenuItem>
                    <MenuItem value="3">3 - Good</MenuItem>
                    <MenuItem value="4">4 - Very Good</MenuItem>
                    <MenuItem value="5">5 - Excellent</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  multiline
                  minRows={5}
                  fullWidth
                  value={comment}
                  sx={{ marginTop: '20px' }}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a Comment"
                ></TextField>
                {errorProductReview ? (
                  <Alert sx={{ marginTop: '20px' }} severity="error">
                    <AlertTitle>You can only review a product once!</AlertTitle>
                  </Alert>
                ) : (
                  greenAlert && (
                    <Alert sx={{ marginTop: '20px' }} severity="success">
                      <AlertTitle>Review Submitted successfully</AlertTitle>
                    </Alert>
                  )
                )}
                <Button
                  variant="contained"
                  sx={{ marginTop: '30px', width: '150px' }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default ProductScreen;
