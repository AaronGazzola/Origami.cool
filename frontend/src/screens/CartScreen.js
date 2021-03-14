import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CART_CLEAR_REDIRECT } from 'constants/cartConstants';

const CartScreen = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: CART_CLEAR_REDIRECT });
	}, [dispatch]);
	return <div>test</div>;
};

export default CartScreen;
