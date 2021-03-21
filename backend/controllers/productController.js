import fs from 'fs';
import path from 'path';
import ErrorResponse from '../utils/errorResponse.js';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import asyncHandler from '../middleware/async.js';
import moment from 'moment';

// @desc    Fetch all products
// @route   GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find().populate('reviews');

	res.json({
		products
	});
});

// @desc    get product by id
// @route   GET /api/products/:id
// @access    Public
const getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findOne({ slug: req.params.slug }).populate(
		'reviews'
	);

	if (!product) {
		return next(new ErrorResponse('Could not find product', 404));
	}

	res.status(200).json({
		product
	});
});

// @desc    create review for product
// @route   POST /api/products/review/:id
// @access    Private
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

	const review = await Review.create({
		name: req.user.name,
		rating: Number(rating),
		title,
		comment,
		user: req.user._id,
		product: product._id
	});

	product.reviews.push(review);

	product.numReviews = product.reviews.length;

	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save();
	res.status(201).json({ success: true });
});

// @desc    update review for product
// @route   PUT /api/products/review/:id
// @access    Private
const updateReview = asyncHandler(async (req, res, next) => {
	const { rating, title, comment } = req.body;
	const productId = req.params.id;
	const product = await Product.findById(productId).populate('reviews');
	if (!product) {
		return next(new ErrorResponse('Product not found', 404));
	}
	const review = await Review.findOne({
		user: req.user._id,
		product: productId
	});

	if (!review) {
		return next(new ErrorResponse('Cannot edit review', 400));
	}

	review.name = req.user.name;
	review.rating = Number(rating);
	review.title = title;
	review.comment = comment;
	review.user = req.user._id;

	await review.save();

	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save();
	res.status(201).json({ success: true });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access    Private/admin
const deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorResponse('Could not find product', 404));
	}
	// delete images
	if (product.images.length > 0) {
		product.images.forEach(image => {
			// change absolute path to relative path
			const relativeImagePath = `.${image.path}`;
			fs.stat(relativeImagePath, (err, stat) => {
				if (err == null) {
					// file exists
					// delete file
					fs.unlink(relativeImagePath, async err => {
						if (err) {
							console.error(err);
							return next(new ErrorResponse(`Problem with file upload`, 500));
						}
					});
				} else if (err.code !== 'ENOENT') {
					// error other than file does not exist
					console.error(err);
					return next(new ErrorResponse(`Problem with file upload`, 500));
				}
			});
		});
	}
	await product.deleteOne();

	res.status(200).json({ success: true });
});

// @desc    Set count in stock for product by id
// @route   POST /api/products/stock/:id
// @access    Private/admin
const setCountInStock = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	product.countInStock = req.body.countInStock;
	await product.save();
	res.status(201).json({ success: true });
});

// @desc    Create new product
// @route   POST /api/products/
// @access    Private/admin
const createProduct = asyncHandler(async (req, res, next) => {
	const images = req.body.product.images;
	// check for images
	if (!images) {
		return next(new ErrorResponse('Please include images', 400));
	}
	// move images from uploads to images
	let movedImages = [];
	images.forEach(image => {
		const oldPath = image.path;
		const newPath = oldPath.replace('uploads', 'images');
		fs.rename(`.${oldPath}`, `.${newPath}`, err => {
			if (err) {
				return next(new ErrorResponse('Could not create product', 500));
			}
		});
		movedImages.push({ path: newPath, label: image.label });
	});

	// delete remaining images in uploads folder
	const directory = './uploads';
	fs.readdir(directory, (err, files) => {
		if (err) {
			return next(new ErrorResponse('Could not create product', 500));
		} else if (files.length) {
			for (const file of files) {
				fs.unlink(path.join(directory, file), err => {
					if (err && err.code !== 'ENOENT') {
						return next(new ErrorResponse('Could not create product', 500));
					}
				});
			}
		}
	});

	const product = await Product.create({
		...req.body.product,
		images: movedImages,
		user: req.user
	});

	res.status(201).json({
		product,
		success: true
	});
});

// @desc    Update product
// @route   POST /api/products/:id
// @access    Private/admin
const updateProduct = asyncHandler(async (req, res, next) => {
	const images = req.body.product.images;
	// check for images
	if (!images) {
		return next(new ErrorResponse('Please include images', 400));
	}
	// move images from uploads to images
	let newImages = [];
	images.forEach(image => {
		if (image.path.startsWith('/uploads')) {
			const oldPath = image.path;
			const newPath = oldPath.replace('uploads', 'images');
			fs.rename(`.${oldPath}`, `.${newPath}`, err => {
				if (err) {
					return next(new ErrorResponse('Could not create product', 500));
				}
			});
			newImages.push({ path: newPath, label: image.label });
		} else {
			newImages.push(image);
		}
	});

	// delete remaining images in uploads folder
	const directory = './uploads';
	fs.readdir(directory, (err, files) => {
		if (err) {
			return next(new ErrorResponse('Could not create product', 500));
		} else if (files.length) {
			for (const file of files) {
				fs.unlink(path.join(directory, file), err => {
					if (err && err.code !== 'ENOENT') {
						return next(new ErrorResponse('Could not create product', 500));
					}
				});
			}
		}
	});

	const product = await Product.findByIdAndUpdate(req.params.id, {
		...req.body.product,
		images: newImages
	});
	if (!product) {
		return next(new ErrorResponse('Could not find product to update', 404));
	}
	res.status(201).json({
		product,
		success: true
	});
});

// @desc    Upload Image
// @route   POST /api/products/image
// @access    Private/admin
const uploadImage = asyncHandler(async (req, res, next) => {
	// check for uploaded file
	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = Object.values(req.files)[0];

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	// Check filesize
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload an image smaller than ${
					process.env.MAX_FILE_UPLOAD / 1000000
				} Mb`,
				400
			)
		);
	}

	// Create new custom filename
	file.name = `${moment().valueOf()}${path.parse(file.name).ext}`;
	//Create new image path
	const newImagePath = `${process.env.FILE_UPLOAD_PATH}/${file.name}`;
	// upload file
	file.mv(newImagePath, async err => {
		if (err) {
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}

		const absoluteImagePath = newImagePath.slice(1);

		res.status(200).json({
			success: true,
			image: absoluteImagePath
		});
	});
});

export {
	getProducts,
	getProduct,
	createReview,
	updateReview,
	deleteProduct,
	setCountInStock,
	createProduct,
	updateProduct,
	uploadImage
};
