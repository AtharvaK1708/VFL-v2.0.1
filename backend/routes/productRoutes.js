import express from 'express';

import {
  createAProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAProduct,
} from '../controllers/productControllers.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getProducts)
  .post(protect, isAdmin, createAProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateAProduct);

export default router;
