import express from 'express';
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  getPaymentDetails,
  stripePaymentCheckout,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';

import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, isAdmin, getAllOrders);
router.route('/myOrders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/updateIsPaid').put(protect, updateOrderToPaid);
router
  .route('/:id/updateIsDelivered')
  .put(protect, isAdmin, updateOrderToDelivered);
router.route('/stripe-checkout/:id').post(stripePaymentCheckout);
router.route('/payment-details/:paymentId').get(protect, getPaymentDetails);

export default router;
