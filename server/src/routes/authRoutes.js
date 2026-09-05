import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);

export default router;
