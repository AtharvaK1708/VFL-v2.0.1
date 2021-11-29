import express from 'express';
import Product from '../models/productModel.js';

import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

// ! Fetch all products
// ! GET api/products

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// ! Fetch products by id
// ! GET api/products

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
