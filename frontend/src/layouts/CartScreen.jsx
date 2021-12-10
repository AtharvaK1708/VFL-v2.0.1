import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { addCartItem } from '../actions/cartActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import MainHeader from './MainHeader';
import { removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  // console.log(quantity, productId);

  useEffect(() => {
    if (productId) {
      dispatch(addCartItem(productId, quantity));
      // console.log(dispatch(addCartItem(productId, quantity)));
    }
  }, [dispatch, productId, quantity]);

  const checkoutHandler = () => {
    if (localStorage.getItem('userInfo') !== null) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=shipping');
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Fragment>
      <MainHeader />
      <Container sx={{ marginTop: '7rem' }}>
        <Grid container>
          <Typography variant="h3">Shopping Cart</Typography>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{ marginTop: '5rem', marginBottom: '1rem', right: '22rem' }}
            >
              View all products
            </Button>
          </Link>
          {cartItems.length === 0 ? (
            <Alert sx={{ marginTop: '20px' }} severity="info">
              <AlertTitle>No Items</AlertTitle>
              <strong>
                It looks like your cart is empty! 😕 Add some items in the cart.
              </strong>
            </Alert>
          ) : (
            cartItems.map((item) => (
              <Grid item lg={8} key={item.product}>
                <Card
                  sx={{
                    display: 'flex',
                    marginBottom: '10px',
                    marginTop: '15px',
                  }}
                  elevation={4}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.image}
                    alt="Live from space album cover"
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', maxWidth: '300px' }}>
                      <Link
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                        }}
                        to={`/products/${item.product}`}
                      >
                        <Typography component="div" variant="h5" gutterBottom>
                          {item.name}
                        </Typography>
                      </Link>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        component="div"
                      >
                        ${item.price}
                      </Typography>
                    </CardContent>
                  </Box>
                  <FormControl>
                    <InputLabel
                      sx={{ top: '14px', left: '27px' }}
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Quantity
                    </InputLabel>
                    <Select
                      variant="filled"
                      sx={{
                        width: '109px',
                        marginTop: '10px',
                        marginLeft: '20px',
                      }}
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addCartItem(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    sx={{
                      width: '20px',
                      alignItems: 'baseline',
                      color: 'black',
                      left: '20px',
                      top: '10px',
                      maxHeight: '50px',
                    }}
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <DeleteIcon
                      sx={{ top: '20px', left: '10px' }}
                      fontSize="large"
                    ></DeleteIcon>
                  </Button>
                </Card>
              </Grid>
            ))
          )}
          {cartItems.length > 0 && (
            <Grid item lg={4}>
              <TableContainer
                sx={{
                  width: '500px',
                  marginLeft: '2rem',
                  display: 'inline-block',
                  position: 'absolute',
                  top: '16rem',
                }}
                // className={myClasses.addToCartPaper}
                component={Paper}
                elevation={4}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Subtotal (
                          {cartItems.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}
                          ) items
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Total Price</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h5">
                          ${' '}
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.quantity * item.price,
                              0
                            )
                            .toFixed(2)}{' '}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="large"
                          fullwidth
                          color="darkButton"
                          sx={{ left: '30%', width: '16rem' }}
                          onClick={checkoutHandler}
                        >
                          Proceed to Checkout
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default CartScreen;
