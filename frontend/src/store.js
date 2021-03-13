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
	verifyEmailUpdateReducer
} from 'reducers/userReducers';
import {
	getProductsReducer,
	getProductReducer,
	createReviewReducer
} from 'reducers/productReducers';
import { cartReducer } from 'reducers/cartReducers';

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
	cart: cartReducer
});

const userFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

const initialState = {
	userData: {
		user: userFromStorage?.user,
		token: userFromStorage?.token,
		isAuth: !!userFromStorage?.token
	}
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
