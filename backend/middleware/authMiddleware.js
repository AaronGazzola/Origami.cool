import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/async.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		// Check if bearer token is sent in authorization header
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
	}

	// Check if token exists
	if (!token) {
		return next(new ErrorResponse('Please login to view this content', 401));
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Find user from token and add to request
		req.user = await User.findById(decoded.id);
		if (!req.user) {
			return next(new ErrorResponse('Please login to view this content', 401));
		}
		if (req.user.isBanned) {
			return next(
				new ErrorResponse(
					'You have been banned from accessing this content',
					401
				)
			);
		}
		next();
	} catch (error) {
		return next(new ErrorResponse('Please login to view this content', 401));
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		return next(new ErrorResponse('Not authorized to access content', 401));
	}
};

export { protect, admin };
