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
	resetPasswordReducer
} from 'reducers/userReducers';

const reducer = combineReducers({
	signup: signupReducer,
	sendVerifyUser: sendVerifyUserReducer,
	login: loginReducer,
	userData: userDataReducer,
	verifyUser: verifyUserReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer
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
