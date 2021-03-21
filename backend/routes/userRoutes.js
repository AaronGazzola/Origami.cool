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
	verifyEmailUpdate,
	getUsers,
	setBan,
	setAdmin
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.post('/ban/:id', protect, admin, setBan);
router.post('/admin/:id', protect, admin, setAdmin);
router.post('/signup', signup);
router.post('/login', login);
router.post('/sendverifyuser', sendVerifyUser);
router.post('/verifyuser/:token', verifyUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.route('/profile').put(protect, userUpdateProfile);
router.delete('/cancelemail', protect, cancelEmailUpdate);
router.post('/verifyemail/:token', verifyEmailUpdate);

export default router;
