import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
  Input,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MainHeader from './MainHeader';
import EditIcon from '@mui/icons-material/Edit';
import { listProductsDetails, updateProduct } from '../actions/productActions';
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants';

const useStyles = makeStyles({
  mainPaper: {
    height: '120vh',
    width: '32rem',
    margin: '100px auto',
    padding: '20px',
  },
});

const ProductEditScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/products');
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productList');
    } else {
      if (!product?.name || product?._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product?.name);
        setPrice(product?.price);
        setImage(product?.image);
        setBrand(product?.brand);
        setCategory(product?.category);
        setCountInStock(product?.countInStock);
        setDescription(product?.description);
      }
    }
  }, [
    product,
    productId,
    dispatch,
    successUpdate,
    navigate,
    userInfo?.isAdmin,
  ]);

  const myClasses = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name: name,
        price: price,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock,
        description: description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <MainHeader />
      <Container>
        <Paper className={myClasses.mainPaper} elevation={2}>
          {loading ? (
            <CircularProgress color="primary" size={40} />
          ) : error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{error}</strong>
            </Alert>
          ) : (
            <Grid align="center">
              <Avatar
                sx={{
                  padding: '5px',
                  marginBottom: '8px',
                  backgroundColor: 'black',
                }}
              >
                <EditIcon fontSize="large" />
              </Avatar>
              <Typography variant="h4">Edit Product </Typography>

              <form style={{ textAlign: 'left' }} onSubmit={submitHandler}>
                <TextField
                  label="Name"
                  variant="outlined"
                  placeholder="Enter the Product name"
                  name="name"
                  fullWidth
                  required
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  placeholder="Enter price"
                  name="price"
                  fullWidth
                  type="number"
                  required
                  margin="normal"
                  min="0"
                  sx={{ margin: '30px 0' }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  sx={{ width: '360px' }}
                  label="Image"
                  variant="outlined"
                  placeholder="Enter your Full Image Url"
                  name="Image"
                  fullWidth
                  required
                  margin="normal"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="contained-button-file">
                  {uploading ? (
                    <h2>loading..</h2>
                  ) : (
                    <div style={{ display: 'inline' }}>
                      <Input
                        sx={{ display: 'none' }}
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={uploadFileHandler}
                      />
                      <Button
                        sx={{ left: '11px', top: '25px' }}
                        variant="contained"
                        component="span"
                      >
                        Upload Image
                      </Button>
                    </div>
                  )}
                </label>

                <TextField
                  label="Brand"
                  variant="outlined"
                  placeholder="Enter your Brand Name"
                  name="Brand"
                  fullWidth
                  required
                  margin="normal"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <TextField
                  label="CountInStock"
                  variant="outlined"
                  placeholder="Enter the Count In Stock"
                  name="CountInStock"
                  fullWidth
                  type="number"
                  required
                  margin="normal"
                  sx={{ margin: '30px 0' }}
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
                <TextField
                  label="Category"
                  variant="outlined"
                  placeholder="Enter your Category "
                  name="Category"
                  fullWidth
                  required
                  margin="normal"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  placeholder="Enter your Description "
                  name="Description"
                  fullWidth
                  required
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: '30px' }}
                >
                  Update Details
                </Button>
              </form>
            </Grid>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default ProductEditScreen;
