import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_EMPTY,
	CART_REQUEST,
	CART_FAIL,
	CART_SUCCESS,
	CART_CLEAR,
	CART_REDIRECT,
	CART_CLEAR_REDIRECT
} from 'constants/cartConstants';

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_REQUEST:
			return { ...state, loading: true };
		case CART_SUCCESS:
			return { ...state, loading: false, success: action.payload };
		case CART_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false
			};
		case CART_CLEAR:
			return { ...state, error: null, loading: false, success: null };
		case CART_ADD_ITEM:
			const item = action.payload;

			const existItem = state.cartItems.find(x => x.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(x =>
						x.product === existItem.product ? item : x
					)
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item]
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(x => x.product !== action.payload)
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload
			};
		case CART_EMPTY:
			return { cartItems: [] };
		case CART_REDIRECT:
			return { ...state, redirect: true };
		case CART_CLEAR_REDIRECT:
			return { ...state, redirect: null };
		default:
			return state;
	}
};
