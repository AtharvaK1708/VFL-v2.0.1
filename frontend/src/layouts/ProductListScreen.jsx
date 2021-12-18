import {
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from './MainHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { Helmet } from 'react-helmet';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, product: createdProduct } = productCreate;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/products');
    }

    if (successCreate) {
      navigate(`/admin/products/${createdProduct?._id}/edit`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    } else {
      dispatch(listProducts());
    }

    //eslint-disable-next-line
  }, [dispatch, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (
      window.confirm('Are you sure you want to delete the selected product?')
    ) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Fragment>
      <Helmet>
        <title>Admin Access | Product List</title>
      </Helmet>
      <MainHeader />
      <Container sx={{ marginTop: '100px' }}>
        {loading ? (
          <CircularProgress color="primary" size={40} />
        ) : error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        ) : (
          <div>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '100',
                marginBottom: '30px',
                display: 'inline-block',
                marginRight: '64.9%',
              }}
            >
              Products
            </Typography>
            <Button
              startIcon={<AddOutlinedIcon fontSize="large" />}
              size="large"
              variant="contained"
              color="darkButton"
              onClick={createProductHandler}
              sx={{ marginBottom: '5px' }}
            >
              Add a New Product
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name of Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product._id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>&#8377; {product.price}</TableCell>
                      <TableCell> {product.category}</TableCell>
                      <TableCell> {product.brand}</TableCell>

                      <TableCell>
                        <Link to={`/admin/products/${product._id}/edit`}>
                          <Button
                            sx={{ marginRight: '10px' }}
                            variant="outlined"
                          >
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          color="redButton"
                          variant="outlined"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <DeleteForeverIcon sx={{ color: 'red' }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default ProductListScreen;
