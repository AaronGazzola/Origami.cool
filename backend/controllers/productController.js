import ErrorResponse from '../utils/errorResponse.js';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/async.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();

	res.json({
		products
	});
});

export { getProducts };
