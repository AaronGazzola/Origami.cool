import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	signupReducer,
	sendVerifyUserReducer,
	loginReducer,
	userDataReducer,
	verifyUserReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
	userUpdateProfileReducer,
	cancelEmailUpdateReducer,
	verifyEmailUpdateReducer,
	getUsersReducer,
	setBanReducer,
	setAdminReducer
} from 'reducers/userReducers';
import {
	getProductsReducer,
	getProductReducer,
	createReviewReducer,
	updateReviewReducer,
	setProductStockReducer,
	deleteProductReducer,
	updateProductReducer,
	createProductReducer,
	uploadImageReducer
} from 'reducers/productReducers';
import { cartReducer } from 'reducers/cartReducers';
import {
	createOrderReducer,
	sendOrderEmailReducer,
	getOrderReducer,
	cancelOrderReducer,
	sendCancelOrderEmailReducer,
	userListOrdersReducer,
	listOrdersReducer,
	setDeliveredReducer
} from 'reducers/orderReducers';

const reducer = combineReducers({
	signup: signupReducer,
	sendVerifyUser: sendVerifyUserReducer,
	login: loginReducer,
	userData: userDataReducer,
	verifyUser: verifyUserReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	userUpdateProfile: userUpdateProfileReducer,
	cancelEmailUpdate: cancelEmailUpdateReducer,
	verifyEmailUpdate: verifyEmailUpdateReducer,
	getProducts: getProductsReducer,
	getProduct: getProductReducer,
	createReview: createReviewReducer,
	updateReview: updateReviewReducer,
	cart: cartReducer,
	createOrder: createOrderReducer,
	sendOrderEmail: sendOrderEmailReducer,
	getOrder: getOrderReducer,
	cancelOrder: cancelOrderReducer,
	sendCancelOrderEmail: sendCancelOrderEmailReducer,
	userListOrders: userListOrdersReducer,
	setProductStock: setProductStockReducer,
	deleteProduct: deleteProductReducer,
	createProduct: createProductReducer,
	updateProduct: updateProductReducer,
	uploadImage: uploadImageReducer,
	getUsers: getUsersReducer,
	setBan: setBanReducer,
	setAdmin: setAdminReducer,
	listOrders: listOrdersReducer,
	setDelivered: setDeliveredReducer
});

const userFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = {
	userData: {
		user: userFromStorage?.user,
		token: userFromStorage?.token,
		isAuth: !!userFromStorage?.token
	},
	cart: {
		cartItems: cartItemsFromStorage
	}
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
