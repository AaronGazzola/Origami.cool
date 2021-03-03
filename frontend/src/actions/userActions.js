import axios from 'axios';
import {
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_ALERT,
	AUTH_LOGOUT
} from '../constants/userConstants';

export const signupAction = (name, email, password) => async dispatch => {
	try {
		dispatch({
			type: AUTH_REQUEST
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
			type: AUTH_SUCCESS,
			payload: data
		});

		dispatch({
			type: AUTH_ALERT,
			payload: 'Please Check your inbox to confirm your email address'
		});

		await axios.post('/api/v1/users/verify', { email }, config);
	} catch (error) {
		dispatch({
			type: AUTH_FAIL,
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
			type: AUTH_REQUEST
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

		dispatch({
			type: AUTH_SUCCESS,
			payload: data
		});

		if (data && !data.user.isValid) {
			dispatch({
				type: AUTH_ALERT,
				payload: 'Please check your email for a link to verify your account'
			});
		}

		if (data.user.isValid) {
			localStorage.setItem(
				'userData',
				JSON.stringify({ user: data.user, token: data.token })
			);
		}
	} catch (error) {
		dispatch({
			type: AUTH_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const logoutAction = () => dispatch => {
	localStorage.removeItem('userData');
	dispatch({ type: AUTH_LOGOUT });
};
