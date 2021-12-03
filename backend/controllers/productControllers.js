import Product from '../models/productModel.js';

import expressAsyncHandler from 'express-async-handler';

// ! Fetch all products
// ! GET api/products

export const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ! Fetch products by id
// ! GET api/products

export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
