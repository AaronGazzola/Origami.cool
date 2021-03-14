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
	UPDATE_REVIEW_FAIL
} from 'constants/productConstants';

export const getProductsAction = (name, email, password) => async dispatch => {
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

export const getProductAction = slug => async dispatch => {
	try {
		dispatch({
			type: GET_PRODUCT_REQUEST
		});

		const config = {
			headers: {}
		};

		const { data } = await axios.get(`/api/v1/products/${slug}`, config);

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

		dispatch(getProductAction(product.slug));

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

		dispatch(getProductAction(product.slug));

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
