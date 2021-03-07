import express from 'express';
import {
	login,
	signup,
	sendVerifyUser,
	verifyUser,
	forgotPassword,
	resetPassword,
	userUpdateProfile,
	cancelEmailUpdate,
	verifyEmailUpdate
	// getUserProfile,
	// userUpdateAddress,
	// getUsers,
	// setAdmin,
	// setBan
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', protect, admin, getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/sendverifyuser', sendVerifyUser);
router.post('/verifyuser/:token', verifyUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router
	.route('/profile')
	// 	.get(protect, getUserProfile)
	.put(protect, userUpdateProfile);
// router.put('/address', protect, userUpdateAddress);
router.delete('/cancelemail', protect, cancelEmailUpdate);
router.post('/verifyemail/:token', verifyEmailUpdate);
// router.put('/setadmin/:id', protect, admin, setAdmin);
// router.put('/setban/:id', protect, admin, setBan);

export default router;
