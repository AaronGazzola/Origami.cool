import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_PRODUCTS_CLEAR
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
