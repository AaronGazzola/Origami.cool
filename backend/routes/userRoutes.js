import express from 'express';
import {
	login,
	signup,
	sendVerifyUser
	// verifyUser,
	// forgotPassword,
	// resetPassword,
	// getUserProfile,
	// userUpdateProfile,
	// cancelNewEmail,
	// verifyNewEmail,
	// userUpdateAddress,
	// getUsers,
	// setAdmin,
	// setBan
} from '../controllers/userController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', protect, admin, getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', sendVerifyUser);
// router.post('/verify/:token', verifyUser);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:token', resetPassword);
// router
// 	.route('/profile')
// 	.get(protect, getUserProfile)
// 	.put(protect, userUpdateProfile);
// router.put('/address', protect, userUpdateAddress);
// router.put('/cancelemail', protect, cancelNewEmail);
// router.post('/verifyemail/:token', verifyNewEmail);
// router.put('/setadmin/:id', protect, admin, setAdmin);
// router.put('/setban/:id', protect, admin, setBan);

export default router;
