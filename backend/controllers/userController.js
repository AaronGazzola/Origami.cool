import crypto from 'crypto';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc      Sign Up user
// @route     POST /api/v1/users/signup
// @access    Public
const signup = asyncHandler(async (req, res, next) => {
	const { name, password } = req.body;
	const email = re.body.email?.toLowerCase();

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

	const returnUser = await User.findById(user._id);

	sendTokenResponse(returnUser, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/users/login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
	const { password } = req.body;
	const email = re.body.email?.toLowerCase();

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

	const returnUser = await User.findById(user._id);

	sendTokenResponse(returnUser, 200, res);
});

// @desc      Send verification email
// @route     POST /api/v1/users/sendverify
// @access    Public
const sendVerifyUser = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email?.toLowerCase() });

	if (!user) {
		return next(new ErrorResponse('Could not send verification email', 404));
	}

	if (user.isAuth) {
		return next(new ErrorResponse('User is already verified', 400));
	}

	// Get token
	const token = user.getToken('VERIFY_USER');

	await user.save({ validateBeforeSave: false });

	const baseUrl = `${req.protocol}://${
		process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000'
	}`;
	const actionLink = `${baseUrl}/verifyuser/${token}`;

	try {
		await sendEmail({
			type: 'VERIFY',
			actionLink,
			user,
			baseUrl,
			message1: `Thank you for creating an account at <a class="link a" href="${baseUrl}" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">Origami.cool</span></a>`,
			message2: `Please click the link below to verify your email address.`,
			reason: `You have recieved this email because your email address was used to create an account at Origami.cool, this is not a promotional email. `,
			buttonText: 'Verify Email'
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

	// Verify user
	user.isVerified = true;
	user.verifyUserToken = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/users/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email?.toLowerCase() });

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	// Get reset token
	const token = user.getToken('RESET_PASSWORD');

	await user.save({ validateBeforeSave: false });

	// get base URL from request protocol and host domain
	const baseUrl = `${req.protocol}://${
		process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000'
	}`;
	const actionLink = `${baseUrl}/resetpassword/${token}`;

	try {
		await sendEmail({
			type: 'VERIFY',
			actionLink,
			user,
			baseUrl,
			message1: `Please follow the link below to reset your password.`,
			message2: `If you did not request to reset your password, please ignore this email.`,
			reason: `You have recieved this email because a request was made to reset your password at Origami.cool, this is not a promotional email.`,
			buttonText: 'Reset Password'
		});
		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (error) {
		console.log(error);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

// @desc      Reset password
// @route     PUT /api/v1/users/resetpassword/:token
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: {
			$gt: Date.now()
		}
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	user.isVerified = true;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc      Update logged in user's profile
// @route     PUT /api/v1/users/profile
// @access    Private
const userUpdateProfile = asyncHandler(async (req, res, next) => {
	// select password from user
	const user = await User.findOne({ email: req.user.email }).select(
		'+password'
	);

	// update name
	if (req.body.name) {
		user.name = req.body.name;
	}

	// if email is updated
	if (req.body.email && req.body.email?.toLowerCase() !== user.email) {
		//check for user with email
		const foundUser = await User.findOne({
			email: req.body.email.toLowerCase()
		});
		if (foundUser) {
			return next(
				new ErrorResponse('A user with that email address already exists', 400)
			);
		}
		// get update email token
		const token = user.getToken('UPDATE_EMAIL');

		// add email to user
		user.newEmail = req.body.email.toLowerCase();

		// get base URL from request protocol and host domain
		const baseUrl = `${req.protocol}://${
			process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000'
		}`;
		const actionLink = `${baseUrl}/verifyemail/${token}`;

		// send verification email
		try {
			await sendEmail({
				type: 'VERIFY',
				actionLink,
				user,
				baseUrl,
				message1: `Please follow the link below to verify your updated email address`,
				message2: `If you did not request to change your email at <a class="link a" href="${baseUrl}" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">Origami.cool</span></a>, please ignore this email.`,
				reason: `You have recieved this email because a request was made to update the email address associated with your account, this is not a promotional email.`,
				buttonText: 'Update Email'
			});
		} catch (error) {
			console.log(error);
			user.verifyUserToken = undefined;

			await user.save({ validateBeforeSave: false });

			return next(new ErrorResponse('Email could not be sent', 500));
		}
	}

	// update password
	if (req.body.newPassword) {
		try {
			const isMatch = await user.matchPassword(req.body.currentPassword);

			if (!isMatch) {
				return next(new ErrorResponse('Password incorrect', 401));
			}

			user.password = req.body.newPassword;
		} catch (error) {
			console.log(error);
			return next(new ErrorResponse('Profile could not be updated', 500));
		}
	}

	// update address
	if (req.body.address) {
		user.address = req.body.address;
	}

	// save user
	await user.save();

	const returnUser = await User.findById(user._id);

	sendTokenResponse(returnUser, 201, res);
});

// @desc      Cancel email update
// @route     DELETE /api/v1/users/cancelemail
// @access    Private
const cancelEmailUpdate = asyncHandler(async (req, res, next) => {
	// remove newEmail and token
	req.user.newEmail = undefined;
	req.user.changeEmailToken = undefined;
	await req.user.save();

	sendTokenResponse(req.user, 200, res);
});

// @desc      Verify email update
// @route     GET /api/v1/users/verifyemail/:token
// @access    Public
const verifyEmailUpdate = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const changeEmailToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		changeEmailToken
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// change email
	user.email = user.newEmail;
	user.newEmail = undefined;
	user.changeEmailToken = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();
	res.status(statusCode).json({
		success: true,
		token,
		user
	});
};

// @desc      Get users
// @route     GET /api/v1/users/
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({ success: true, users });
});

// @desc      Toggle user ban status
// @route     POST /api/v1/users/ban
// @access    Private/Admin
const setBan = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorResponse('Could not find user', 404));
	}
	user.isBanned = !user.isBanned;

	await user.save();

	res.status(200).json({
		success: true
	});
});

// @desc      Toggle user admin status
// @route     POST /api/v1/users/admin
// @access    Private/Admin
const setAdmin = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorResponse('Could not find user', 404));
	}
	user.isAdmin = !user.isAdmin;

	await user.save();

	res.status(200).json({
		success: true
	});
});

export {
	login,
	signup,
	sendVerifyUser,
	verifyUser,
	forgotPassword,
	resetPassword,
	userUpdateProfile,
	cancelEmailUpdate,
	verifyEmailUpdate,
	setBan,
	setAdmin,
	getUsers
};
