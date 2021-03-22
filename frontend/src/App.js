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
import CheckoutScreen from 'screens/CheckoutScreen';
import OrderScreen from 'screens/OrderScreen';
import EditProductScreen from 'screens/EditProductScreen';
import OrderListScreen from 'screens/OrderListScreen';
import ProductListScreen from 'screens/ProductListScreen';
import UserListScreen from 'screens/UserListScreen';
import AboutScreen from 'screens/AboutScreen';
import ContactScreen from 'screens/ContactScreen';
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
	VERIFY_EMAIL_UPDATE_CLEAR,
	GET_USERS_CLEAR,
	SET_BAN_CLEAR,
	SET_ADMIN_CLEAR
} from 'constants/userConstants';
import {
	GET_PRODUCTS_CLEAR,
	GET_PRODUCT_CLEAR,
	CREATE_REVIEW_CLEAR,
	UPDATE_REVIEW_CLEAR,
	DELETE_PRODUCT_CLEAR,
	SET_PRODUCT_STOCK_CLEAR,
	CREATE_PRODUCT_CLEAR,
	UPDATE_PRODUCT_CLEAR,
	UPLOAD_IMAGE_CLEAR
} from 'constants/productConstants';
import { CART_CLEAR } from 'constants/cartConstants';
import {
	CREATE_ORDER_CLEAR,
	SEND_ORDER_EMAIL_CLEAR,
	GET_ORDER_CLEAR,
	CANCEL_ORDER_CLEAR,
	USER_LIST_ORDERS_CLEAR,
	LIST_ORDERS_CLEAR,
	SET_DELIVERED_CLEAR
} from 'constants/orderConstants';
import { sendVerifyUserAction } from 'actions/userActions';
import { getProductsAction } from 'actions/productActions';
import { SEND_CANCEL_ORDER_EMAIL_CLEAR } from './constants/orderConstants';

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
		updateReview: { error: updateReviewError, success: updateReviewSuccess },
		cart: { error: cartError, success: cartSuccess, cartItems },
		createOrder: { error: createOrderError, success: createOrderSuccess },
		sendOrderEmail: {
			error: sendOrderEmailError,
			success: sendOrderEmailSuccess
		},
		getOrder: { error: getOrderError },
		cancelOrder: { error: cancelOrderError, success: cancelOrderSuccess },
		sendCancelOrderEmail: {
			error: sendCancelOrderEmailError,
			success: sendCancelOrderEmailSuccess
		},
		userListOrders: { error: userListOrdersError },
		deleteProduct: { error: deleteProductError, success: deleteProductSuccess },
		setProductStock: {
			error: setProductStockError,
			success: setProductStockSuccess
		},
		createProduct: { error: createProductError, success: createProductSuccess },
		updateProduct: { error: updateProductError, success: updateProductSuccess },
		uploadImage: { error: uploadImageError },
		getUsers: { error: getUsersError },
		setBan: { error: setBanError, success: setBanSuccess },
		setAdmin: { error: setAdminError, success: setAdminSuccess },
		listOrders: { error: listOrdersError },
		setDelivered: { error: setDeliveredError, success: setDeliveredSuccess }
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
							updateReviewError ||
							cartError ||
							createOrderError ||
							sendOrderEmailError ||
							getOrderError ||
							cancelOrderError ||
							sendCancelOrderEmailError ||
							userListOrdersError ||
							setProductStockError ||
							deleteProductError ||
							createProductError ||
							updateProductError ||
							uploadImageError ||
							getUsersError ||
							setBanError ||
							setAdminError ||
							listOrdersError ||
							setDeliveredError
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
								: updateReviewError
								? UPDATE_REVIEW_CLEAR
								: cartError
								? CART_CLEAR
								: createOrderError
								? CREATE_ORDER_CLEAR
								: sendOrderEmailError
								? SEND_ORDER_EMAIL_CLEAR
								: getOrderError
								? GET_ORDER_CLEAR
								: cancelOrderError
								? CANCEL_ORDER_CLEAR
								: sendCancelOrderEmailError
								? SEND_CANCEL_ORDER_EMAIL_CLEAR
								: userListOrdersError
								? USER_LIST_ORDERS_CLEAR
								: deleteProductError
								? DELETE_PRODUCT_CLEAR
								: setProductStockError
								? SET_PRODUCT_STOCK_CLEAR
								: updateProductError
								? UPDATE_PRODUCT_CLEAR
								: createProductError
								? CREATE_PRODUCT_CLEAR
								: uploadImageError
								? UPLOAD_IMAGE_CLEAR
								: getUsersError
								? GET_USERS_CLEAR
								: setBanError
								? SET_BAN_CLEAR
								: setAdminError
								? SET_ADMIN_CLEAR
								: listOrdersError
								? LIST_ORDERS_CLEAR
								: setDeliveredError
								? SET_DELIVERED_CLEAR
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
							updateReviewSuccess ||
							cartSuccess ||
							createOrderSuccess ||
							sendOrderEmailSuccess ||
							cancelOrderSuccess ||
							sendCancelOrderEmailSuccess ||
							deleteProductSuccess ||
							setProductStockSuccess ||
							updateProductSuccess ||
							createProductSuccess ||
							setBanSuccess ||
							setAdminSuccess ||
							setDeliveredSuccess
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
								: updateReviewSuccess
								? UPDATE_REVIEW_CLEAR
								: userUpdateProfileSuccess
								? USER_UPDATE_PROFILE_CLEAR
								: cartSuccess
								? CART_CLEAR
								: createOrderSuccess
								? CREATE_ORDER_CLEAR
								: sendOrderEmailSuccess
								? SEND_ORDER_EMAIL_CLEAR
								: cancelOrderSuccess
								? CANCEL_ORDER_CLEAR
								: sendCancelOrderEmailSuccess
								? SEND_CANCEL_ORDER_EMAIL_CLEAR
								: deleteProductSuccess
								? DELETE_PRODUCT_CLEAR
								: setProductStockSuccess
								? SET_PRODUCT_STOCK_CLEAR
								: createProductSuccess
								? CREATE_PRODUCT_CLEAR
								: updateProductSuccess
								? UPDATE_PRODUCT_CLEAR
								: setBanSuccess
								? SET_BAN_CLEAR
								: setAdminSuccess
								? SET_ADMIN_CLEAR
								: setDeliveredSuccess
								? SET_DELIVERED_CLEAR
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
							<Route path='/order/:id' component={OrderScreen} />
							<Route
								path='/admin/products'
								exact
								component={ProductListScreen}
							/>
							<Route
								path='/admin/product/:slug'
								component={EditProductScreen}
							/>
							<Route
								path='/admin/product'
								exact
								component={EditProductScreen}
							/>
							<Route path='/admin/users' exact component={UserListScreen} />
							<Route path='/admin/orders' exact component={OrderListScreen} />
							{cartItems?.length === 0 ? (
								<Redirect from='/checkout' exact to='/cart' />
							) : (
								<Route exact path='/checkout' component={CheckoutScreen} />
							)}
							<Route path='/about' exact component={AboutScreen} />
							<Route path='/contact' exact component={ContactScreen} />
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
							<Route path='/order/:id' component={OrderScreen} />
							<Redirect from='/admin' to='/profile' />
							{cartItems?.length === 0 ? (
								<Redirect from='/checkout' exact to='/cart' />
							) : (
								<Route exact path='/checkout' component={CheckoutScreen} />
							)}
							<Route path='/about' exact component={AboutScreen} />
							<Route path='/contact' exact component={ContactScreen} />
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
							<Redirect from='/checkout' exact to='/login' />
							<Redirect from='/order/:id' to='/login' />
							<Redirect from='/admin' to='/login' />
							<Route path='/about' exact component={AboutScreen} />
							<Route path='/contact' exact component={ContactScreen} />
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
