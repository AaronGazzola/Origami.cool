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
// @route   GET /api/products/:slug
// @access    Public
const getProduct = asyncHandler(async (req, res, next) => {
	const slug = req.params.slug;
	const product = await Product.findOne({ slug });

	if (!product) {
		return next(new ErrorResponse('Could not find product', 404));
	}

	res.status(200).json({
		product
	});
});

// @desc    create review for product
// @route   GET /api/products/review/:id
// @access    Public
const createReview = asyncHandler(async (req, res, next) => {
	const { rating, title, comment } = req.body;
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorResponse('Product not found', 404));
	}
	const alreadyReviewed = product.reviews.find(
		review => review.user.toString() === req.user._id.toString()
	);
	if (alreadyReviewed) {
		return next(new ErrorResponse('Product already reviewed', 400));
	}
	const review = {
		name: req.user.name,
		rating: Number(rating),
		title,
		comment,
		user: req.user._id
	};

	product.reviews.push(review);

	product.numReviews = product.reviews.length;

	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save();
	res.status(201).json({ success: true });
});

export { getProducts, getProduct, createReview };
