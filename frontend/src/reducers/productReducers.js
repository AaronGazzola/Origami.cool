import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_PRODUCTS_CLEAR,
	GET_PRODUCT_REQUEST,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_FAIL,
	GET_PRODUCT_CLEAR,
	CREATE_REVIEW_REQUEST,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAIL,
	CREATE_REVIEW_CLEAR
} from 'constants/productConstants';

export const getProductsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_PRODUCTS_REQUEST:
			return { loading: true };
		case GET_PRODUCTS_SUCCESS:
			return {
				loading: false,
				success: true,
				products: action.payload
			};
		case GET_PRODUCTS_FAIL:
			return { loading: false, error: action.payload };
		case GET_PRODUCTS_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const getProductReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_PRODUCT_REQUEST:
			return { loading: true };
		case GET_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: true,
				product: action.payload
			};
		case GET_PRODUCT_FAIL:
			return { loading: false, error: action.payload };
		case GET_PRODUCT_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const createReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_REVIEW_REQUEST:
			return { loading: true };
		case CREATE_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case CREATE_REVIEW_FAIL:
			return { loading: false, error: action.payload };
		case CREATE_REVIEW_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};
