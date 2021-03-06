import Order from '../models/orderModel.js';
import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ! Create New Order
// ! POST api/orders

export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('NO Order Items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    let productsToUpdate = [];

    orderItems.forEach(async (item) => {
      const item2 = await Product.findByIdAndUpdate(
        { _id: item.product },
        { countInStock: item.countInStock - item.quantity }
      );
      productsToUpdate.push(item2);
    });

    res.status(201).json(createdOrder);
  }
});

// ! Get Order By Id
// ! GET api/orders/:id

export const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

// ! Update Order to PAID
// ! PUT api/orders/:id/pay

export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = req.body.updateTime;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      emailAddress: req.body.emailAddress,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

// ! Update Order to Delivered
// ! PUT api/orders/:id/delivered
// ? PRIVATE && ADMIN

export const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

export const stripePaymentCheckout = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  const extraPrices = order.taxPrice + order.shippingPrice;

  let totalItems = [];
  order.orderItems.forEach((item) => totalItems.push(item.quantity));
  const finalTotalItems = totalItems.reduce(
    (partial_sum, a) => partial_sum + a,
    0
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    line_items: order.orderItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: ['https://www.fincradle.com/images/products-icon.png'],
          },

          unit_amount:
            Math.round(
              item.price +
                order.shippingPrice / finalTotalItems +
                order.taxPrice / finalTotalItems
            ) * 100,
        },
        quantity: item.quantity,
      };
    }),

    mode: 'payment',
    success_url: `${process.env.MAIN_URL}/order/${order._id}?paymentSuccess=true`,
    cancel_url: `${process.env.MAIN_URL}/order/${order._id}/pay`,
  });

  res.json(session);
});

export const getPaymentDetails = expressAsyncHandler(async (req, res) => {
  const paymentDetails = await stripe.checkout.sessions.retrieve(
    req.params.paymentId
  );
  res.json(paymentDetails);
});

// ! Get logged in user's orders
// ! GET /api/orders/myorders

export const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// ! Get all orders
// ! GET /api/orders
// ? PRIVATE && ADMIN
export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});
