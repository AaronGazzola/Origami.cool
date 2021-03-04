import crypto from 'crypto';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc      Sign Up user
// @route     POST /api/v1/users/signup
// @access    Public
const signup = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	// Check for required fields
	if (!name || !email || !password) {
		return next(
			new ErrorResponse('Please provide a name, email and password', 400)
		);
	}
	// check if user with email exists
	const foundUser = await User.findOne({ email });
	if (foundUser) {
		return next(
			new ErrorResponse(
				'A user with that email already exists, please log in instead',
				400
			)
		);
	}

	//Create User
	const user = await User.create({
		name,
		email,
		password
	});

	sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/users/login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Check for email and password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('No user found with that email', 401));
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Password incorrect', 401));
	}

	sendTokenResponse(user, 200, res);
});

// @desc      Send verification email
// @route     POST /api/v1/users/sendverify
// @access    Public
const sendVerifyUser = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('Could not send verification email', 404));
	}

	if (user.isAuth) {
		return next(new ErrorResponse('User is already verified', 400));
	}

	// Get token
	const token = user.getToken('VERIFY');

	await user.save({ validateBeforeSave: false });

	const baseUrl = `${req.protocol}://${req.get('host')}`;

	try {
		await sendEmail({
			type: 'VERIFY_EMAIL',
			token,
			user,
			baseUrl
		});
		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (error) {
		console.log(error);
		user.verifyUserToken = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

// @desc      Verify user
// @route     GET /api/v1/users/verify/:token
// @access    Public
const verifyUser = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const verifyUserToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		verifyUserToken
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// Validate user
	user.isValid = true;
	user.verifyUserToken = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// // @desc      Forgot password
// // @route     POST /api/v1/users/forgotpassword
// // @access    Public
// const forgotPassword = asyncHandler(async (req, res, next) => {
// 	const user = await User.findOne({ email: req.body.email });

// 	if (!user) {
// 		return next(new ErrorResponse('There is no user with that email', 404));
// 	}

// 	// Get reset token
// 	const token = user.getResetPasswordToken();

// 	await user.save({ validateBeforeSave: false });

// 	// get base URL from request protocol and host domain
// 	const protocol = req.protocol;
// 	const host =
// 		process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000';
// 	const baseUrl = `${protocol}://${host}`;

// 	try {
// 		await sendEmail({
// 			type: 'FORGOT_PASSWORD',
// 			token,
// 			user,
// 			baseUrl
// 		});
// 		res.status(200).json({ success: true, data: 'Email sent' });
// 	} catch (error) {
// 		console.log(error);
// 		user.resetPasswordToken = undefined;
// 		user.resetPasswordExpire = undefined;

// 		await user.save({ validateBeforeSave: false });

// 		return next(new ErrorResponse('Email could not be sent', 500));
// 	}
// });

// // @desc      Reset password
// // @route     PUT /api/v1/users/resetpassword/:resettoken
// // @access    Public
// const resetPassword = asyncHandler(async (req, res, next) => {
// 	// Get hashed token
// 	const resetPasswordToken = crypto
// 		.createHash('sha256')
// 		.update(req.params.token)
// 		.digest('hex');

// 	const user = await User.findOne({
// 		resetPasswordToken,
// 		resetPasswordExpire: {
// 			$gt: Date.now()
// 		}
// 	});

// 	if (!user) {
// 		return next(new ErrorResponse('Invalid token', 400));
// 	}

// 	// Set new password
// 	user.password = req.body.password;
// 	user.resetPasswordToken = undefined;
// 	user.resetPasswordExpire = undefined;
// 	user.isValid = true;
// 	await user.save();

// 	sendTokenResponse(user, 200, res);
// });

// // @desc      Get current logged in user
// // @route     GET /api/v1/users/profile
// // @access    Private
// const getUserProfile = asyncHandler(async (req, res, next) => {
// 	res.status(200).json({
// 		success: true,
// 		user: req.user
// 	});
// });

// // @desc      Update logged in user's profile
// // @route     PUT /api/v1/users/profile
// // @access    Private
// const userUpdateProfile = asyncHandler(async (req, res, next) => {
// 	const user = await User.findOne({ email: req.user.email }).select(
// 		'+password'
// 	);

// 	// if email is updated
// 	if (req.body.email) {
// 		//check for user with email
// 		const foundUser = await User.findOne({ email: req.body.email });
// 		if (foundUser) {
// 			return next(
// 				new ErrorResponse('A user with that email address already exists', 400)
// 			);
// 		}
// 		// get change email token
// 		const token = req.user.getChangeEmailToken();

// 		// add email to user
// 		req.user.newEmail = req.body.email;

// 		// get base URL from request protocol and host domain
// 		const protocol = req.protocol;
// 		const host =
// 			process.env.NODE_ENV === 'production'
// 				? req.get('host')
// 				: 'localhost:3000';
// 		const baseUrl = `${protocol}://${host}`;

// 		try {
// 			await sendEmail({
// 				type: 'CHANGE_EMAIL',
// 				token,
// 				user: req.user,
// 				baseUrl
// 			});
// 		} catch (error) {
// 			console.log(error);
// 			user.verifyUserToken = undefined;

// 			await user.save({ validateBeforeSave: false });

// 			return next(new ErrorResponse('Email could not be sent', 500));
// 		}
// 	}

// 	// update other fields depending on whether password is sent
// 	if (req.body.newPassword) {
// 		try {
// 			const isMatch = await user.matchPassword(req.body.currentPassword);

// 			if (!isMatch) {
// 				return next(new ErrorResponse('Password incorrect', 401));
// 			}
// 		} catch (error) {
// 			console.log(error);
// 			return next(new ErrorResponse('Profile could not be updated', 500));
// 		}

// 		req.user.name = req.body.name;
// 		req.user.password = req.body.newPassword;
// 	} else {
// 		req.user.name = req.body.name;
// 	}

// 	// check if address has changed, get formatted address from place_id
// 	if (req.user.address !== req.body.address && req.body.place_id) {
// 		try {
// 			const { data } = await axios.get(
// 				`https://aqueous-fortress-38882.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${
// 					process.env.NODE_ENV === 'production'
// 						? process.env.GOOGLE_MAPS_API_KEY_PROD
// 						: process.env.GOOGLE_MAPS_API_KEY_DEV
// 				}&place_id=${req.body.place_id}`,
// 				{
// 					headers: {
// 						origin: `${req.protocol}://${
// 							process.env.NODE_ENV === 'production'
// 								? req.get('host')
// 								: 'localhost:3000'
// 						}`
// 					}
// 				}
// 			);

// 			req.user.formattedAddress = data.result.formatted_address;
// 			req.user.address = req.body.address;
// 			req.user.place_id = req.body.place_id;
// 		} catch (error) {
// 			console.log(error);
// 			return next(new ErrorResponse('Profile could not be updated', 500));
// 		}
// 	} else {
// 		req.user.address = req.body.address;
// 	}

// 	// save user
// 	await req.user.save();

// 	// find user to return user details without change email token
// 	// === this could be done better, review on refactor === //
// 	const newUser = await User.findOne({ _id: req.user._id });

// 	res.status(201).json({
// 		success: req.body.email
// 			? `Please check your inbox to update your email address to ${req.body.email}`
// 			: 'Profile updated',
// 		user: newUser
// 	});
// });

// // @desc      Update logged in user's address
// // @route     PUT /api/v1/users/address
// // @access    Private
// const userUpdateAddress = asyncHandler(async (req, res, next) => {
// 	if (req.body.place_id) {
// 		try {
// 			const { data } = await axios.get(
// 				`https://aqueous-fortress-38882.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${
// 					process.env.NODE_ENV === 'production'
// 						? process.env.GOOGLE_MAPS_API_KEY_PROD
// 						: process.env.GOOGLE_MAPS_API_KEY_DEV
// 				}&place_id=${req.body.place_id}`,
// 				{
// 					headers: {
// 						origin: `${req.protocol}://${
// 							process.env.NODE_ENV === 'production'
// 								? req.get('host')
// 								: 'localhost:3000'
// 						}`
// 					}
// 				}
// 			);

// 			req.user.formattedAddress = data.result.formatted_address;
// 			req.user.address = req.body.address;
// 			req.user.place_id = req.body.place_id;
// 		} catch (error) {
// 			console.log(error);
// 			return next(new ErrorResponse('Profile could not be updated', 500));
// 		}
// 	} else {
// 		req.user.address = req.body.address;
// 	}

// 	await req.user.save();

// 	res.status(201).json({
// 		success: 'Address updated',
// 		user: req.user
// 	});
// });

// // @desc      Cancel email update
// // @route     DELETE /api/v1/users/cancelemail
// // @access    Private
// const cancelNewEmail = asyncHandler(async (req, res, next) => {
// 	const user = await User.findOne({
// 		newEmail: req.body.newEmail
// 	});

// 	if (!user) {
// 		return next(
// 			new ErrorResponse('Could not cancel email update, please try again', 400)
// 		);
// 	}

// 	if (user.isBanned) {
// 		return next(
// 			new ErrorResponse(
// 				'You have been banned from accessing this content by the administrator(s)',
// 				401
// 			)
// 		);
// 	}

// 	// remove newEmail and token
// 	user.newEmail = undefined;
// 	user.changeEmailToken = undefined;
// 	await user.save();

// 	sendTokenResponse(user, 200, res);
// });

// // @desc      Verify email change
// // @route     GET /api/v1/users/verifyemail/:token
// // @access    Public
// const verifyNewEmail = asyncHandler(async (req, res, next) => {
// 	// Get hashed token
// 	const changeEmailToken = crypto
// 		.createHash('sha256')
// 		.update(req.params.token)
// 		.digest('hex');

// 	const user = await User.findOne({
// 		changeEmailToken
// 	});

// 	if (!user) {
// 		return next(new ErrorResponse('Invalid token', 400));
// 	}

// 	if (user.isBanned) {
// 		return next(
// 			new ErrorResponse(
// 				'You have been banned from accessing this content by the administrator(s)',
// 				401
// 			)
// 		);
// 	}

// 	// change email
// 	user.email = user.newEmail;
// 	user.newEmail = undefined;
// 	user.changeEmailToken = undefined;
// 	await user.save();

// 	sendTokenResponse(user, 200, res);
// });

// // @desc    Get all users
// // @route   GET /api/users
// // @access    Private/admin
// const getUsers = asyncHandler(async (req, res) => {
// 	const pageSize = Number(req.query.pageSize) || 10;
// 	const page = Number(req.query.pageNumber) || 1;
// 	const keyword = req.query.keyword
// 		? {
// 				name: {
// 					$regex: req.query.keyword,
// 					$options: 'i'
// 				}
// 		  }
// 		: {};
// 	const count = await User.countDocuments({ ...keyword });
// 	const users = await User.find({ ...keyword })
// 		.limit(pageSize)
// 		.skip(pageSize * (page - 1));
// 	const allUsers = await User.find({});
// 	// check if users are found
// 	if (!users) {
// 		return next(new ErrorResponse('Users not found', 404));
// 	}
// 	res.json({
// 		success: true,
// 		users,
// 		allUsers,
// 		page,
// 		pages: Math.ceil(count / pageSize),
// 		count
// 	});
// });

// // @desc    Change admin role
// // @route   PUT /api/users/setadmin/:id
// // @access    Private/admin
// const setAdmin = asyncHandler(async (req, res, next) => {
// 	// find user
// 	const user = await User.findById(req.params.id);
// 	//check for user
// 	if (!user) {
// 		return next(new ErrorResponse('User not found, ID may be incorrect', 400));
// 	}
// 	// set admin role
// 	user.isAdmin = !user.isAdmin;

// 	await user.save();

// 	res.json({
// 		success: true,
// 		user
// 	});
// });

// // @desc    Change user ban
// // @route   PUT /api/users/setban/:id
// // @access    Private/admin
// const setBan = asyncHandler(async (req, res, next) => {
// 	// find user
// 	const user = await User.findById(req.params.id);
// 	//check for user
// 	if (!user) {
// 		return next(new ErrorResponse('User not found, ID may be incorrect', 400));
// 	}
// 	// set ban
// 	user.isBanned = !user.isBanned;

// 	await user.save();

// 	res.json({
// 		success: true,
// 		user
// 	});
// });

const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();
	res.status(statusCode).json({
		success: true,
		token,
		user
	});
};

export {
	login,
	signup,
	sendVerifyUser,
	verifyUser
	// forgotPassword,
	// resetPassword,
	// getUserProfile,
	// userUpdateProfile,
	// userUpdateAddress,
	// cancelNewEmail,
	// verifyNewEmail,
	// getUsers,
	// setAdmin,
	// setBan
};
