import express from 'express';

import {
  authUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserById,
  registerUser,
  updateUserById,
  updateUserProfile,
} from '../controllers/userControllers.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/').get(protect, isAdmin, getAllUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUser).put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserById);

export default router;
