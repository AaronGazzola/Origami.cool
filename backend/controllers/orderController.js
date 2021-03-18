import sendEmail from '../utils/sendEmail.js';
import asyncHandler from '../middleware/async.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Create new order
// @route   POST /api/orders
// @access    Private
const createOrder = asyncHandler(async (req, res, next) => {
	const {
		orderItems,
		address,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentResult
	} = req.body;

	if (orderItems?.length === 0) {
		res.status(400);
		return next(new ErrorResponse('No order items', 400));
	}

	// check count in stock for product, reduce by order amount
	orderItems.forEach(async item => {
		const product = await Product.findById(item.product);
		if (product.countInStock < item.qty) {
			res.status(400);
			return next(
				new ErrorResponse(
					`Not enough ${item.name} in stock to fill order. Please reduce the quantity to continue`,
					400
				)
			);
		} else {
			product.countInStock = product.countInStock - item.qty;
			await product.save();
		}
	});

	const order = new Order({
		orderItems,
		user: req.user._id,
		address,
		paymentMethod,
		paymentResult,
		isPaid: true,
		paidAt: Date.now(),
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	});

	await order.save();

	res.status(201).json({ success: true, order });
});

// @desc    Send order confirmation email
// @route   POST /api/orders/sendconfirm
// @access    Private
const sendConfirmEmail = asyncHandler(async (req, res, next) => {
	const order = req.body.order;
	// get base URL from request protocol and host domain
	const baseUrl = `${req.protocol}://${
		process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000'
	}`;
	const actionLink = `${baseUrl}/order/${order._id}`;

	// send verification email
	try {
		await sendEmail({
			type: 'ORDER_USER',
			actionLink,
			order,
			user: req.user,
			baseUrl,
			reason: `You have recieved this email because an account with your email address was used to place an order at Origami.cool, this is not a promotional email.`
		});
		await sendEmail({
			type: 'ORDER_ADMIN',
			actionLink,
			order,
			user: req.user,
			baseUrl
		});
	} catch (error) {
		console.log(error);
		user.verifyUserToken = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Confirmation email could not be sent', 500));
	}
	res.status(201).json({ success: true });
});

export { createOrder, sendConfirmEmail };
