import express from 'express';

import dotenv from 'dotenv';

import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import Stripe from 'stripe';
import expressAsyncHandler from 'express-async-handler';
import path from 'path';
import morgan from 'morgan';

dotenv.config();

connectDb();

const app = express();

if (process.env.NODE_ENV === 'DEVELOPEMENT') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use(express.json()); // ! to take in POST data
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/upload', uploadRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} 😀`
  );
});
