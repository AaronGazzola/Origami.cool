import express from 'express';
import {
	getProducts,
	getProduct,
	createReview,
	updateReview,
	deleteProduct,
	setCountInStock
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/stock/:id').post(protect, admin, setCountInStock);
router
	.route('/review/:id')
	.post(protect, createReview)
	.put(protect, updateReview);
router.route('/:slug').get(getProduct);
router.route('/:id').delete(protect, admin, deleteProduct);
export default router;
