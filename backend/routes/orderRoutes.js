import express from 'express';
import {
	createOrder,
	sendConfirmEmail
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/sendemail').post(protect, sendConfirmEmail);
export default router;
