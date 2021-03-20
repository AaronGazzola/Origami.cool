import express from 'express';
import {
	getProducts,
	getProduct,
	createReview,
	updateReview,
	deleteProduct,
	setCountInStock,
	createProduct,
	updateProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/stock/:id').post(protect, admin, setCountInStock);
router
	.route('/review/:id')
	.post(protect, createReview)
	.put(protect, updateReview);
router
	.route('/:id')
	.delete(protect, admin, deleteProduct)
	.post(protect, admin, updateProduct);
router.route('/:slug').get(getProduct);
export default router;
