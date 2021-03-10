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

// @desc    get product by slug
// @route   GET /api/products/product/:slug
// @access    Public
const getProduct = asyncHandler(async (req, res, next) => {
	const slug = req.params.slug;
	const product = await Product.findOne({ slug });

	if (!product) {
		return next(new ErrorResponse('Could not find product', 404));
	}

	res.json({
		product
	});
});

export { getProducts, getProduct };
