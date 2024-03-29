import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REDIRECT_CLEAR,
	CREATE_ORDER_CLEAR,
	SEND_ORDER_EMAIL_REQUEST,
	SEND_ORDER_EMAIL_SUCCESS,
	SEND_ORDER_EMAIL_FAIL,
	SEND_ORDER_EMAIL_CLEAR,
	USER_LIST_ORDERS_REQUEST,
	USER_LIST_ORDERS_SUCCESS,
	USER_LIST_ORDERS_FAIL,
	USER_LIST_ORDERS_CLEAR,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAIL,
	GET_ORDER_CLEAR,
	LIST_ORDERS_REQUEST,
	LIST_ORDERS_SUCCESS,
	LIST_ORDERS_FAIL,
	LIST_ORDERS_CLEAR,
	SET_DELIVERED_REQUEST,
	SET_DELIVERED_SUCCESS,
	SET_DELIVERED_FAIL,
	SET_DELIVERED_CLEAR,
	CANCEL_ORDER_REQUEST,
	CANCEL_ORDER_SUCCESS,
	CANCEL_ORDER_FAIL,
	CANCEL_ORDER_CLEAR,
	SEND_CANCEL_ORDER_EMAIL_REQUEST,
	SEND_CANCEL_ORDER_EMAIL_SUCCESS,
	SEND_CANCEL_ORDER_EMAIL_FAIL,
	SEND_CANCEL_ORDER_EMAIL_CLEAR
} from 'constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return { loading: true };
		case CREATE_ORDER_SUCCESS:
			return {
				loading: false,
				success: 'Order confirmed',
				order: action.payload.order,
				redirect: true
			};
		case CREATE_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload
					? action.payload
					: 'Could not create order, please try again.'
			};
		case CREATE_ORDER_REDIRECT_CLEAR:
			return { ...state, redirect: false };
		case CREATE_ORDER_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const sendOrderEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case SEND_ORDER_EMAIL_REQUEST:
			return { loading: true };
		case SEND_ORDER_EMAIL_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case SEND_ORDER_EMAIL_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		case SEND_ORDER_EMAIL_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const userListOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case USER_LIST_ORDERS_REQUEST:
			return { loading: true };
		case USER_LIST_ORDERS_SUCCESS:
			return {
				loading: false,
				success: true,
				orders: action.payload
			};
		case USER_LIST_ORDERS_FAIL:
			return { loading: false, error: action.payload };
		case USER_LIST_ORDERS_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const getOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ORDER_REQUEST:
			return { loading: true };
		case GET_ORDER_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload
			};
		case GET_ORDER_FAIL:
			return { loading: false, error: action.payload };
		case GET_ORDER_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const listOrdersReducer = (state = {}, action) => {
	switch (action.type) {
		case LIST_ORDERS_REQUEST:
			return { loading: true };
		case LIST_ORDERS_SUCCESS:
			return {
				loading: false,
				success: true,
				orders: action.payload
			};
		case LIST_ORDERS_FAIL:
			return { loading: false, error: action.payload };
		case LIST_ORDERS_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const setDeliveredReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_DELIVERED_REQUEST:
			return { loading: true };
		case SET_DELIVERED_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case SET_DELIVERED_FAIL:
			return { loading: false, error: action.payload };
		case SET_DELIVERED_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const cancelOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case CANCEL_ORDER_REQUEST:
			return { loading: true };
		case CANCEL_ORDER_SUCCESS:
			return {
				loading: false,
				order: action.payload,
				success: action.success
			};
		case CANCEL_ORDER_FAIL:
			return { loading: false, error: action.payload };
		case CANCEL_ORDER_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const sendCancelOrderEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case SEND_CANCEL_ORDER_EMAIL_REQUEST:
			return { loading: true };
		case SEND_CANCEL_ORDER_EMAIL_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case SEND_CANCEL_ORDER_EMAIL_FAIL:
			return { loading: false, error: action.payload };
		case SEND_CANCEL_ORDER_EMAIL_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};
