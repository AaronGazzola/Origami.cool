import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	SIGNUP_CLEAR,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_ALERT,
	LOGIN_CLEAR,
	USER_DATA_REQUEST,
	USER_DATA_SUCCESS,
	USER_DATA_FAIL,
	USER_DATA_CLEAR
} from 'constants/userConstants';

export const signupReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return { loading: true };
		case SIGNUP_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case SIGNUP_FAIL:
			return { loading: false, error: action.payload };
		case SIGNUP_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { loading: true };
		case LOGIN_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case LOGIN_ALERT:
			return {
				loading: false,
				alert: action.payload
			};
		case LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case LOGIN_CLEAR:
			return { ...state, error: null, success: null, alert: null };
		default:
			return state;
	}
};

export const userDataReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DATA_REQUEST:
			return { loading: true };
		case USER_DATA_SUCCESS:
			return {
				loading: false,
				user: action.payload.user,
				token: action.payload.token,
				isAuth: !!action.payload.token
			};
		case USER_DATA_FAIL:
			return { loading: false, error: action.payload };
		case USER_DATA_CLEAR:
			return { error: null, success: null };
		default:
			return state;
	}
};
