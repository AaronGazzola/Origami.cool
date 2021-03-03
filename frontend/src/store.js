import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from 'reducers/userReducers';

const reducer = combineReducers({
	auth: authReducer
});

const userDataFromStorage = localStorage.getItem('userData')
	? JSON.parse(localStorage.getItem('userData'))
	: null;

const initialState = {
	auth: {
		user: userDataFromStorage?.user,
		token: userDataFromStorage?.token,
		isAuth: !!userDataFromStorage?.token
	}
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
