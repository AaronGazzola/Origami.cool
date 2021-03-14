import express from 'express';
import {
	getProducts,
	getProduct,
	createReview,
	updateReview
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router
	.route('/review/:id')
	.post(protect, createReview)
	.put(protect, updateReview);
router.route('/:slug').get(getProduct);
export default router;
