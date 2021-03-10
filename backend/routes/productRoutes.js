import express from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/product/:slug').get(getProduct);
export default router;
