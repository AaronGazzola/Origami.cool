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
	CREATE_REVIEW_CLEAR,
	UPDATE_REVIEW_REQUEST,
	UPDATE_REVIEW_SUCCESS,
	UPDATE_REVIEW_FAIL,
	UPDATE_REVIEW_CLEAR,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_CLEAR,
	SET_PRODUCT_STOCK_REQUEST,
	SET_PRODUCT_STOCK_SUCCESS,
	SET_PRODUCT_STOCK_FAIL,
	SET_PRODUCT_STOCK_CLEAR,
	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAIL,
	CREATE_PRODUCT_CLEAR,
	CREATE_PRODUCT_CLEAR_REDIRECT,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_CLEAR,
	UPDATE_PRODUCT_CLEAR_REDIRECT
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

export const updateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_REVIEW_REQUEST:
			return { loading: true };
		case UPDATE_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case UPDATE_REVIEW_FAIL:
			return { loading: false, error: action.payload };
		case UPDATE_REVIEW_CLEAR:
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

export const deleteProductReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return { loading: true };
		case DELETE_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case DELETE_PRODUCT_FAIL:
			return { loading: false, error: action.payload };
		case DELETE_PRODUCT_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const setProductStockReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_PRODUCT_STOCK_REQUEST:
			return { loading: true };
		case SET_PRODUCT_STOCK_SUCCESS:
			return {
				loading: false,
				success: action.payload
			};
		case SET_PRODUCT_STOCK_FAIL:
			return { loading: false, error: action.payload };
		case SET_PRODUCT_STOCK_CLEAR:
			return { ...state, error: null, success: null };
		default:
			return state;
	}
};

export const createProductReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_REQUEST:
			return { loading: true };
		case CREATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload,
				product: action.product,
				redirect: true
			};
		case CREATE_PRODUCT_FAIL:
			return { loading: false, error: action.payload };
		case CREATE_PRODUCT_CLEAR:
			return { ...state, error: null, success: null };
		case CREATE_PRODUCT_CLEAR_REDIRECT:
			return { ...state, redirect: null };
		default:
			return state;
	}
};

export const updateProductReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PRODUCT_REQUEST:
			return { loading: true };
		case UPDATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload,
				product: action.product,
				redirect: true
			};
		case UPDATE_PRODUCT_FAIL:
			return { loading: false, error: action.payload };
		case UPDATE_PRODUCT_CLEAR:
			return { ...state, error: null, success: null };
		case UPDATE_PRODUCT_CLEAR_REDIRECT:
			return { ...state, redirect: null };
		default:
			return state;
	}
};
