import axios from 'axios';
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	SEND_ORDER_EMAIL_REQUEST,
	SEND_ORDER_EMAIL_SUCCESS,
	SEND_ORDER_EMAIL_FAIL,
	USER_LIST_ORDERS_REQUEST,
	USER_LIST_ORDERS_SUCCESS,
	USER_LIST_ORDERS_FAIL,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAIL,
	LIST_ORDERS_REQUEST,
	LIST_ORDERS_SUCCESS,
	LIST_ORDERS_FAIL,
	SET_PAID_REQUEST,
	SET_PAID_SUCCESS,
	SET_PAID_FAIL,
	SET_DELIVERED_REQUEST,
	SET_DELIVERED_SUCCESS,
	SET_DELIVERED_FAIL,
	CANCEL_ORDER_REQUEST,
	CANCEL_ORDER_SUCCESS,
	CANCEL_ORDER_FAIL
} from 'constants/orderConstants';
import { emptyCartAction } from 'actions/cartActions';

export const createOrderAction = order => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_ORDER_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.post(`/api/v1/orders`, order, config);

		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data
		});

		dispatch(emptyCartAction());
		dispatch(sendConfirmOrderEmailAction(data.order));
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const sendConfirmOrderEmailAction = order => async (
	dispatch,
	getState
) => {
	try {
		const {
			userData: { token }
		} = getState();

		dispatch({
			type: SEND_ORDER_EMAIL_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		};

		await axios.post('/api/v1/orders/sendemail', { order }, config);

		dispatch({
			type: SEND_ORDER_EMAIL_SUCCESS,
			payload: `Confirmation email sent`
		});
	} catch (error) {
		dispatch({
			type: SEND_ORDER_EMAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const userListOrdersAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_ORDERS_REQUEST
		});

		const {
			auth: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.get(`/api/v1/orders/userorders`, config);

		dispatch({
			type: USER_LIST_ORDERS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: USER_LIST_ORDERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const getOrderAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ORDER_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.get(`/api/v1/orders/${id}`, config);

		dispatch({
			type: GET_ORDER_SUCCESS,
			payload: data.order
		});
	} catch (error) {
		dispatch({
			type: GET_ORDER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const listOrdersAction = (
	keyword = '',
	pageNumber = '',
	pageSize = 10,
	searchOptions = { paid: '', delivered: '', cancelled: '' }
) => async (dispatch, getState) => {
	try {
		const { paid, delivered, cancelled } = searchOptions;

		dispatch({
			type: LIST_ORDERS_REQUEST
		});

		const {
			auth: { token }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.get(
			`/api/v1/orders?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&paid=${paid}&delivered=${delivered}&cancelled=${cancelled}`,
			config
		);

		dispatch({
			type: LIST_ORDERS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: LIST_ORDERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const setPaidAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: SET_PAID_REQUEST
		});

		const {
			auth: { token }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.put(
			`/api/v1/orders/${id}/setpaid`,
			{},
			config
		);

		dispatch(listOrdersAction());

		dispatch({
			type: SET_PAID_SUCCESS,
			payload: data.order
		});
	} catch (error) {
		dispatch({
			type: SET_PAID_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const setDeliveredAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: SET_DELIVERED_REQUEST
		});

		const {
			auth: { token }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.put(
			`/api/v1/orders/${id}/setdelivered`,
			{},
			config
		);

		dispatch(listOrdersAction());

		dispatch({
			type: SET_DELIVERED_SUCCESS,
			payload: data.order
		});
	} catch (error) {
		dispatch({
			type: SET_DELIVERED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const cancelOrderAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: CANCEL_ORDER_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};

		const { data } = await axios.put(`/api/v1/orders/${id}/cancel`, {}, config);

		dispatch({
			type: CANCEL_ORDER_SUCCESS,
			payload: data.order
		});
	} catch (error) {
		dispatch({
			type: CANCEL_ORDER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
