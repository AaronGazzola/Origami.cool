import axios from 'axios';
import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	SEND_VERIFY_USER_REQUEST,
	SEND_VERIFY_USER_SUCCESS,
	SEND_VERIFY_USER_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_DATA_SUCCESS,
	USER_DATA_LOGOUT,
	VERIFY_USER_REQUEST,
	VERIFY_USER_SUCCESS,
	VERIFY_USER_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	CANCEL_EMAIL_UPDATE_REQUEST,
	CANCEL_EMAIL_UPDATE_SUCCESS,
	CANCEL_EMAIL_UPDATE_FAIL,
	VERIFY_EMAIL_UPDATE_REQUEST,
	VERIFY_EMAIL_UPDATE_SUCCESS,
	VERIFY_EMAIL_UPDATE_FAIL,
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	SET_BAN_REQUEST,
	SET_BAN_SUCCESS,
	SET_BAN_FAIL,
	SET_ADMIN_REQUEST,
	SET_ADMIN_SUCCESS,
	SET_ADMIN_FAIL
} from 'constants/userConstants';

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

		await axios.post('/api/v1/users/signup', { name, email, password }, config);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: 'Please Check your inbox to confirm your email address'
		});

		dispatch(sendVerifyUserAction(email));
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

export const sendVerifyUserAction = email => async dispatch => {
	try {
		dispatch({
			type: SEND_VERIFY_USER_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		await axios.post('/api/v1/users/sendverifyuser', { email }, config);

		dispatch({
			type: SEND_VERIFY_USER_SUCCESS,
			payload: `Email sent to ${email}`
		});
	} catch (error) {
		dispatch({
			type: SEND_VERIFY_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const getUsersAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_USERS_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		};
		const { data } = await axios.get('/api/v1/users/', config);

		dispatch({
			type: GET_USERS_SUCCESS,
			payload: data.users
		});
	} catch (error) {
		dispatch({
			type: GET_USERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const setBanAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: SET_BAN_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		};
		await axios.post(`/api/v1/users/ban/${id}`, {}, config);

		dispatch({
			type: SET_BAN_SUCCESS,
			payload: 'User privilages updated'
		});
	} catch (error) {
		dispatch({
			type: SET_BAN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const setAdminAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: SET_ADMIN_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		};
		await axios.post(`/api/v1/users/admin/${id}`, {}, config);

		dispatch({
			type: SET_ADMIN_SUCCESS,
			payload: 'User privilages updated'
		});
	} catch (error) {
		dispatch({
			type: SET_ADMIN_FAIL,
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

		if (data && !data.user.isVerified) {
			dispatch({
				type: LOGIN_FAIL,
				payload: 'Please check your email for a link to verify your account'
			});
		}

		if (data.user.isVerified) {
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
	dispatch({ type: USER_DATA_LOGOUT });
};

export const verifyUserAction = token => async dispatch => {
	try {
		dispatch({
			type: VERIFY_USER_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(
			`/api/v1/users/verifyuser/${token}`,
			{},
			config
		);

		dispatch({
			type: VERIFY_USER_SUCCESS,
			payload: 'Account verified'
		});

		dispatch({
			type: USER_DATA_SUCCESS,
			payload: data
		});

		localStorage.setItem(
			'user',
			JSON.stringify({ user: data.user, token: data.token })
		);
	} catch (error) {
		dispatch({
			type: VERIFY_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
export const forgotPasswordAction = email => async dispatch => {
	try {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		await axios.post(`/api/v1/users/forgotpassword/`, { email }, config);

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: 'Please Check your email for a link to reset your password'
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const resetPasswordAction = (password, token) => async dispatch => {
	try {
		dispatch({
			type: RESET_PASSWORD_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.put(
			`/api/v1/users/resetpassword/${token}`,
			{ password },
			config
		);

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: 'Password Reset'
		});

		dispatch({
			type: USER_DATA_SUCCESS,
			payload: data
		});

		localStorage.setItem(
			'user',
			JSON.stringify({ user: data.user, token: data.token })
		);
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const userUpdateProfileAction = updateFields => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		};

		const { data } = await axios.put(
			`/api/v1/users/profile/`,
			updateFields,
			config
		);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data.user.newEmail
				? 'Please check your inbox to confirm your new email address'
				: 'Profile Updated'
		});

		dispatch({
			type: USER_DATA_SUCCESS,
			payload: data
		});

		localStorage.setItem(
			'user',
			JSON.stringify({ user: data.user, token: data.token })
		);
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const cancelEmailUpdateAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CANCEL_EMAIL_UPDATE_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		};

		const { data } = await axios.delete(`/api/v1/users/cancelemail/`, config);

		dispatch({
			type: CANCEL_EMAIL_UPDATE_SUCCESS,
			payload: 'Email Update Cancelled'
		});

		dispatch({
			type: USER_DATA_SUCCESS,
			payload: data
		});

		localStorage.setItem(
			'user',
			JSON.stringify({ user: data.user, token: data.token })
		);
	} catch (error) {
		dispatch({
			type: CANCEL_EMAIL_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const verifyEmailUpdateAction = token => async dispatch => {
	try {
		dispatch({
			type: VERIFY_EMAIL_UPDATE_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(
			`/api/v1/users/verifyemail/${token}`,
			{},
			config
		);

		dispatch({
			type: VERIFY_EMAIL_UPDATE_SUCCESS,
			payload: 'Email address updated'
		});

		dispatch({
			type: USER_DATA_SUCCESS,
			payload: data
		});

		localStorage.setItem(
			'user',
			JSON.stringify({ user: data.user, token: data.token })
		);
	} catch (error) {
		dispatch({
			type: VERIFY_EMAIL_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
