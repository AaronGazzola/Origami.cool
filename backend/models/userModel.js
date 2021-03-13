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
		street1: String,
		street2: String,
		city: String,
		state: String,
		postCode: String,
		country: String
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
	isVerified: {
		type: Boolean,
		default: false
	},
	isBanned: {
		type: Boolean,
		default: false
	},
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
UserSchema.methods.getToken = function (type) {
	// Generate token
	const token = crypto.randomBytes(20).toString('hex');
	// Hash token
	const hash = crypto.createHash('sha256').update(token).digest('hex');
	// add token to document
	switch (type) {
		case 'RESET_PASSWORD':
			this.resetPasswordToken = hash;
			this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
			break;
		case 'VERIFY_USER':
			this.verifyUserToken = hash;
			break;
		case 'UPDATE_EMAIL':
			this.changeEmailToken = hash;
			break;
		default:
			break;
	}
	return token;
};

export default mongoose.model('User', UserSchema);
