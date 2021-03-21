import express from 'express';
import {
	createOrder,
	sendConfirmEmail,
	getOrder,
	cancelOrder,
	sendCancelEmail,
	getUserOrders,
	listOrders,
	setDelivered
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, listOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/sendconfirm').post(protect, sendConfirmEmail);
router.route('/sendcancel').post(protect, sendCancelEmail);
router.route('/:id').get(protect, getOrder);
router.route('/:id/cancel').put(protect, cancelOrder);
router.route('/:id/setdelivered').put(protect, admin, setDelivered);
export default router;
