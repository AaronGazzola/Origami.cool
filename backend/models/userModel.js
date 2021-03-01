import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name']
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email'
		]
	},
	newEmail: {
		type: String,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email'
		]
	},
	address: {
		type: String,
		required: false
	},
	formattedAddress: {
		type: String,
		required: false
	},
	place_id: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false
	},
	resetPasswordToken: { type: String, select: false },
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	isValid: {
		type: Boolean,
		default: false
	},
	isBanned: {
		type: Boolean,
		default: false
	},
	subscribed: { type: Boolean, default: true },
	verifyUserToken: { type: String, select: false },
	changeEmailToken: { type: String, select: false }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};
// Generate and hash verify token
UserSchema.methods.getVerifyToken = function () {
	// Generate token
	const verifyToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set to verifyUserToken field
	this.verifyUserToken = crypto
		.createHash('sha256')
		.update(verifyToken)
		.digest('hex');

	return verifyToken;
};

// Generate and hash change email token
UserSchema.methods.getChangeEmailToken = function () {
	// Generate token
	const changeEmailToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set to verifyUserToken field
	this.changeEmailToken = crypto
		.createHash('sha256')
		.update(changeEmailToken)
		.digest('hex');

	return changeEmailToken;
};

export default mongoose.model('User', UserSchema);
