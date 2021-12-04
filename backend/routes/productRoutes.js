import express from 'express';

import {
  getProductById,
  getProducts,
} from '../controllers/productControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getProducts);
router.route('/:id').get(getProductById);

export default router;
