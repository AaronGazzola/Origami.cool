import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	SIGNUP_CLEAR,
	SEND_VERIFY_USER_REQUEST,
	SEND_VERIFY_USER_SUCCESS,
	SEND_VERIFY_USER_FAIL,
	SEND_VERIFY_USER_CLEAR,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_ALERT,
	LOGIN_CLEAR,
	USER_DATA_REQUEST,
	USER_DATA_SUCCESS,
	USER_DATA_FAIL,
	USER_DATA_CLEAR,
	USER_DATA_LOGOUT,
	VERIFY_USER_REQUEST,
	VERIFY_USER_SUCCESS,
	VERIFY_USER_FAIL,
	VERIFY_USER_CLEAR,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_CLEAR,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_CLEAR
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

export const sendVerifyUserReducer = (state = {}, action) => {
	switch (action.type) {
		case SEND_VERIFY_USER_REQUEST:
			return { loading: true };
		case SEND_VERIFY_USER_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case SEND_VERIFY_USER_FAIL:
			return { loading: false, error: action.payload };
		case SEND_VERIFY_USER_CLEAR:
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
			return { ...state, error: null, success: null };
		case USER_DATA_LOGOUT:
			return {};
		default:
			return state;
	}
};
export const verifyUserReducer = (state = {}, action) => {
	switch (action.type) {
		case VERIFY_USER_REQUEST:
			return { loading: true };
		case VERIFY_USER_SUCCESS:
			return {
				loading: false,
				success: true
			};
		case VERIFY_USER_FAIL:
			return { loading: false, error: action.payload };
		case VERIFY_USER_CLEAR:
			return { error: null, success: null };
		default:
			return state;
	}
};
export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return { loading: true };
		case FORGOT_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case FORGOT_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		case FORGOT_PASSWORD_CLEAR:
			return { error: null, success: null };
		default:
			return state;
	}
};
export const resetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return { loading: true };
		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: true
			};
		case RESET_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		case RESET_PASSWORD_CLEAR:
			return { error: null, success: null };
		default:
			return state;
	}
};
