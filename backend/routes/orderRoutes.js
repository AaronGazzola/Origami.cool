import express from 'express';
import {
	createOrder,
	sendConfirmEmail,
	getOrder,
	cancelOrder,
	sendCancelEmail
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/sendconfirm').post(protect, sendConfirmEmail);
router.route('/sendcancel').post(protect, sendCancelEmail);
router.route('/:id').get(protect, getOrder);
router.route('/:id/cancel').put(protect, cancelOrder);
export default router;
