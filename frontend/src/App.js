import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { getTheme } from 'styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'actions/userActions';
import Header from 'components/Header';
import Footer from 'components/Footer';
import useStyles from 'styles/appStyles';
import HomeScreen from 'screens/HomeScreen';
import AuthScreen from 'screens/AuthScreen';
import ProfileScreen from 'screens/ProfileScreen';
import PageNotFoundScreen from 'screens/PageNotFoundScreen';
import VerifyScreen from 'screens/VerifyScreen';
import ResetPasswordScreen from 'screens/ResetPasswordScreen';
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen';
import ProductScreen from 'screens/ProductScreen';
import CartScreen from 'screens/CartScreen';
import Message from 'components/Message';
import SnackBar from 'components/SnackBar';
import {
	SIGNUP_CLEAR,
	SEND_VERIFY_USER_CLEAR,
	LOGIN_CLEAR,
	VERIFY_USER_CLEAR,
	FORGOT_PASSWORD_CLEAR,
	RESET_PASSWORD_CLEAR,
	USER_UPDATE_PROFILE_CLEAR,
	CANCEL_EMAIL_UPDATE_CLEAR,
	VERIFY_EMAIL_UPDATE_CLEAR
} from 'constants/userConstants';
import {
	GET_PRODUCTS_CLEAR,
	GET_PRODUCT_CLEAR,
	CREATE_REVIEW_CLEAR
} from 'constants/productConstants';
import { CART_CLEAR } from 'constants/cartConstants';
import { sendVerifyUserAction } from 'actions/userActions';
import { getProductsAction } from 'actions/productActions';

const theme = getTheme();

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [authFormEmail, setAuthFormEmail] = useState('');

	const {
		signup: { error: signupError, success: signupSuccess },
		sendVerifyUser: {
			error: sendVerifyUserError,
			success: sendVerifyUserSuccess
		},
		login: { error: loginError },
		userData: { user, isAuth },
		verifyUser: { error: verifyUserError, success: verifyUserSuccess },
		forgotPassword: {
			error: forgotPasswordError,
			success: forgotPasswordSuccess
		},
		resetPassword: { error: resetPasswordError, success: resetPasswordSuccess },
		userUpdateProfile: {
			error: userUpdateProfileError,
			success: userUpdateProfileSuccess
		},
		cancelEmailUpdate: {
			error: cancelEmailUpdateError,
			success: cancelEmailUpdateSuccess
		},
		verifyEmailUpdate: {
			error: verifyEmailUpdateError,
			success: verifyEmailUpdateSuccess
		},
		getProducts: { error: getProductsError },
		getProduct: { error: getProductError },
		createReview: { error: createReviewError, success: createReviewSuccess },
		cart: { error: cartError, success: cartSuccess }
	} = useSelector(state => state);

	useEffect(() => {
		if (!user?.isVerified) {
			dispatch(logoutAction());
		}
	}, [user, dispatch]);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<main className={classes.main}>
					<Message
						error={
							signupError ||
							sendVerifyUserError ||
							loginError ||
							verifyUserError ||
							forgotPasswordError ||
							resetPasswordError ||
							userUpdateProfileError ||
							cancelEmailUpdateError ||
							verifyEmailUpdateError ||
							getProductsError ||
							getProductError ||
							createReviewError ||
							cartError
						}
						success={
							signupSuccess ||
							(userUpdateProfileSuccess &&
								userUpdateProfileSuccess !== 'Profile Updated')
						}
						clearType={
							signupError || signupSuccess
								? SIGNUP_CLEAR
								: sendVerifyUserError
								? SEND_VERIFY_USER_CLEAR
								: loginError
								? LOGIN_CLEAR
								: verifyUserError
								? VERIFY_USER_CLEAR
								: forgotPasswordError
								? FORGOT_PASSWORD_CLEAR
								: resetPasswordError
								? RESET_PASSWORD_CLEAR
								: userUpdateProfileError || userUpdateProfileSuccess
								? USER_UPDATE_PROFILE_CLEAR
								: cancelEmailUpdateError
								? CANCEL_EMAIL_UPDATE_CLEAR
								: verifyEmailUpdateError
								? VERIFY_EMAIL_UPDATE_CLEAR
								: getProductsError
								? GET_PRODUCTS_CLEAR
								: getProductError
								? GET_PRODUCT_CLEAR
								: createReviewError
								? CREATE_REVIEW_CLEAR
								: cartError
								? CART_CLEAR
								: null
						}
						actionText={
							loginError?.startsWith('Please check your email') ||
							sendVerifyUserError
								? 'Resend Email'
								: 'Retry'
						}
						action={
							loginError?.startsWith('Please check your email') ||
							sendVerifyUserError
								? sendVerifyUserAction(authFormEmail)
								: getProductsError
								? getProductsAction()
								: null
						}
					/>
					<SnackBar
						message={
							sendVerifyUserSuccess ||
							verifyUserSuccess ||
							verifyEmailUpdateSuccess ||
							userUpdateProfileSuccess ||
							forgotPasswordSuccess ||
							resetPasswordSuccess ||
							cancelEmailUpdateSuccess ||
							createReviewSuccess ||
							cartSuccess
						}
						clearType={
							sendVerifyUserSuccess
								? SEND_VERIFY_USER_CLEAR
								: verifyUserSuccess
								? VERIFY_USER_CLEAR
								: verifyEmailUpdateSuccess
								? VERIFY_EMAIL_UPDATE_CLEAR
								: forgotPasswordSuccess
								? FORGOT_PASSWORD_CLEAR
								: resetPasswordSuccess
								? RESET_PASSWORD_CLEAR
								: cancelEmailUpdateSuccess
								? CANCEL_EMAIL_UPDATE_CLEAR
								: createReviewSuccess
								? CREATE_REVIEW_CLEAR
								: userUpdateProfileSuccess
								? USER_UPDATE_PROFILE_CLEAR
								: cartSuccess
								? CART_CLEAR
								: null
						}
					/>
					{isAuth && user.isVerified && user.isAdmin ? (
						// Admin routes
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Redirect from='/login' exact to='/profile' />
							<Route path='/verifyuser/:token' component={VerifyScreen} />
							<Route path='/verifyemail/:token' component={VerifyScreen} />
							<Route path='/profile' exact component={ProfileScreen} />
							<Redirect from='/resetpassword' to='/profile' />
							<Redirect from='/forgotpassword' exact to='/profile' />
							<Route path='/product/:slug' component={ProductScreen} />
							<Route exact path='/cart' component={CartScreen} />
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					) : isAuth && user.isVerified ? (
						// Private routes
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Redirect from='/login' exact to='/profile' />
							<Route path='/verifyuser/:token' component={VerifyScreen} />
							<Route path='/verifyemail/:token' component={VerifyScreen} />
							<Route path='/profile' exact component={ProfileScreen} />
							<Redirect from='/resetpassword' to='/profile' />
							<Redirect from='/forgotpassword' exact to='/profile' />
							<Route path='/product/:slug' component={ProductScreen} />
							<Route exact path='/cart' component={CartScreen} />
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					) : (
						// Public routes
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Route path='/login' exact>
								<AuthScreen setEmail={setAuthFormEmail} />
							</Route>
							<Redirect from='/profile' exact to='/login' />
							<Route path='/verifyuser/:token' component={VerifyScreen} />
							<Route path='/verifyemail/:token' component={VerifyScreen} />
							<Route
								path='/resetpassword/:token'
								component={ResetPasswordScreen}
							/>
							<Route
								path='/forgotpassword'
								exact
								component={ForgotPasswordScreen}
							/>
							<Route path='/product/:slug' component={ProductScreen} />
							<Route exact path='/cart' component={CartScreen} />
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					)}
				</main>
				<Footer />
			</ThemeProvider>
		</Router>
	);
};

export default App;
