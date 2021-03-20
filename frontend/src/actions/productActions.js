import axios from 'axios';
import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_PRODUCT_REQUEST,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_FAIL,
	CREATE_REVIEW_REQUEST,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAIL,
	UPDATE_REVIEW_REQUEST,
	UPDATE_REVIEW_SUCCESS,
	UPDATE_REVIEW_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	SET_PRODUCT_STOCK_REQUEST,
	SET_PRODUCT_STOCK_SUCCESS,
	SET_PRODUCT_STOCK_FAIL,
	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL
} from 'constants/productConstants';

export const getProductsAction = () => async dispatch => {
	try {
		dispatch({
			type: GET_PRODUCTS_REQUEST
		});

		const config = {
			headers: {}
		};

		const { data } = await axios.get('/api/v1/products/', config);

		dispatch({
			type: GET_PRODUCTS_SUCCESS,
			payload: data.products
		});
	} catch (error) {
		dispatch({
			type: GET_PRODUCTS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const getProductAction = id => async dispatch => {
	try {
		dispatch({
			type: GET_PRODUCT_REQUEST
		});

		const config = {
			headers: {}
		};

		const { data } = await axios.get(`/api/v1/products/${id}`, config);

		dispatch({
			type: GET_PRODUCT_SUCCESS,
			payload: data.product
		});
	} catch (error) {
		dispatch({
			type: GET_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const createReviewAction = (product, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: CREATE_REVIEW_REQUEST
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

		await axios.post(`/api/v1/products/review/${product._id}`, review, config);

		dispatch(getProductAction(product._id));

		dispatch({
			type: CREATE_REVIEW_SUCCESS,
			payload: 'Review posted'
		});
	} catch (error) {
		dispatch({
			type: CREATE_REVIEW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const updateReviewAction = (product, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: UPDATE_REVIEW_REQUEST
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

		await axios.put(`/api/v1/products/review/${product._id}`, review, config);

		dispatch(getProductAction(product._id));

		dispatch({
			type: UPDATE_REVIEW_SUCCESS,
			payload: 'Review updated'
		});
	} catch (error) {
		dispatch({
			type: UPDATE_REVIEW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const deleteProductAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELETE_PRODUCT_REQUEST
		});

		const {
			userData: { token }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};

		await axios.delete(`/api/v1/products/${id}`, config);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: 'Product deleted'
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const setProductStockAction = (id, countInStock) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: SET_PRODUCT_STOCK_REQUEST
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

		await axios.post(`/api/v1/products/stock/${id}`, { countInStock }, config);

		dispatch({
			type: SET_PRODUCT_STOCK_SUCCESS,
			payload: 'Stock count updated'
		});
	} catch (error) {
		dispatch({
			type: SET_PRODUCT_STOCK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const createProductAction = product => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_PRODUCT_REQUEST
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

		await axios.post(`/api/v1/products/`, { ...product }, config);

		dispatch({
			type: CREATE_PRODUCT_SUCCESS,
			payload: 'Product created'
		});
	} catch (error) {
		dispatch({
			type: CREATE_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const updateProductAction = (product, id) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: UPDATE_PRODUCT_REQUEST
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

		await axios.post(`/api/v1/products/${id}`, { ...product }, config);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: 'Product updated'
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
