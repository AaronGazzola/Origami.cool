import express from 'express';
import {
	getProducts,
	getProduct,
	createReview
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/review/:id').post(protect, createReview);
router.route('/:slug').get(getProduct);
export default router;
