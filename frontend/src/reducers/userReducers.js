import {
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT,
	AUTH_CLEAR,
	AUTH_ALERT
} from 'constants/userConstants';

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH_REQUEST:
			return { loading: true };
		case AUTH_SUCCESS:
			return {
				loading: false,
				user: action.payload.user,
				token: action.payload.token,
				isAuth: !!action.payload.token
			};
		case AUTH_FAIL:
			return { loading: false, error: action.payload };
		case AUTH_ALERT:
			return { ...state, alert: action.payload };
		case AUTH_CLEAR:
			return { ...state, error: null, alert: null };
		case AUTH_LOGOUT:
			return { error: state.error, alert: state.alert };
		default:
			return state;
	}
};
