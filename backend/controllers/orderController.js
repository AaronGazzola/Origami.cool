import sendEmail from '../utils/sendEmail.js';
import asyncHandler from '../middleware/async.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
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

	// // get base URL from request protocol and host domain
	// const baseUrl = `${req.protocol}://${
	// 	process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000'
	// }`;
	// const actionLink = `${baseUrl}/verifyemail/${token}`;

	// // send verification email
	// try {
	// 	await sendEmail({
	// 		type: 'ORDER',
	// 		actionLink,
	// 		order,
	// 		user,
	// 		baseUrl,
	// 		reason: `You have recieved this email because an account with your email address was used to place an order at Origami.cool, this is not a promotional email.`
	// 	});
	// } catch (error) {
	// 	console.log(error);
	// 	user.verifyUserToken = undefined;

	// 	await user.save({ validateBeforeSave: false });

	// 	return next(
	// 		new ErrorResponse(
	// 			'Order confirmed, but email could not be sent. Please contact us for details',
	// 			500
	// 		)
	// 	);
	// }

	res.status(201).json({ success: true, order });
});

export { createOrder };
