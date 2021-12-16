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

// ! Delete product
// ! DELETE api/products/:id
// ? PRIVATE && ADMIN

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// ! Create a product
// ! POST api/products
// ? PRIVATE && ADMIN

export const createAProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });

  const createdProduct = await product.save();
  res.status(201);
  res.json(createdProduct);
});

// ! update a product
// ! PUT api/products/:id
// ? PRIVATE && ADMIN

export const updateAProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
