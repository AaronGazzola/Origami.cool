import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_REQUEST,
	CART_SUCCESS,
	CART_FAIL,
	CART_EMPTY,
	CART_REDIRECT
} from 'constants/cartConstants';

export const addToCartAction = (slug, qty) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_REQUEST
		});

		const { data } = await axios.get(`/api/v1/products/${slug}`);
		const { name, images, price, countInStock, _id } = data.product;
		const image = images[0];

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				productId: _id,
				productSlug: slug,
				name,
				image,
				price,
				countInStock,
				qty
			}
		});
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);

		dispatch({ type: CART_SUCCESS, payload: 'Item added to cart' });
		dispatch({ type: CART_REDIRECT });
	} catch (error) {
		dispatch({
			type: CART_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const removeFromCartAction = id => (dispatch, getState) => {
	dispatch({ type: CART_REQUEST });

	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

	dispatch({ type: CART_SUCCESS });
};

export const emptyCartAction = () => (dispatch, getState) => {
	dispatch({ type: CART_REQUEST });

	dispatch({
		type: CART_EMPTY
	});

	localStorage.setItem('cartItems', JSON.stringify([]));

	dispatch({ type: CART_SUCCESS });
};
