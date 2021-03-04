import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	signupReducer,
	loginReducer,
	userDataReducer
} from 'reducers/userReducers';

const reducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	userData: userDataReducer
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
