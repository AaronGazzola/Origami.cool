import axios from 'axios';
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
} from '../constants/userConstants';

export const signupAction = (name, email, password) => async dispatch => {
	try {
		dispatch({
			type: SIGNUP_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(
			'/api/v1/users/signup',
			{ name, email, password },
			config
		);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: 'Please Check your inbox to confirm your email address'
		});

		await axios.post('/api/v1/users/verify', { email }, config);
	} catch (error) {
		dispatch({
			type: SIGNUP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const loginAction = (email, password) => async dispatch => {
	try {
		dispatch({
			type: LOGIN_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(
			'/api/v1/users/login',
			{ email, password },
			config
		);

		if (data && !data.user.isValid) {
			dispatch({
				type: LOGIN_ALERT,
				payload: 'Please check your email for a link to verify your account'
			});
		}

		if (data.user.isValid) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: `Welcome back ${data.user.name}!`
			});
			dispatch({
				type: USER_DATA_SUCCESS,
				payload: data
			});
			localStorage.setItem(
				'user',
				JSON.stringify({ user: data.user, token: data.token })
			);
		}
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const logoutAction = () => dispatch => {
	localStorage.removeItem('user');
	dispatch({ type: USER_DATA_CLEAR });
};
