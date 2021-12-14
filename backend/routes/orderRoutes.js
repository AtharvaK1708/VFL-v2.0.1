import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getPaymentDetails,
  stripePaymentCheckout,
  updateOrderToPaid,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/updateIsPaid').put(protect, updateOrderToPaid);
router.route('/stripe-checkout/:id').post(stripePaymentCheckout);
router.route('/payment-details/:paymentId').get(protect, getPaymentDetails);

export default router;
