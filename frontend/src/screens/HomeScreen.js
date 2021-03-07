import React, { useEffect } from 'react';
import styles from 'styles/contentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from 'actions/productActions';
import { Grid, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { GET_PRODUCTS_CLEAR } from 'constants/productConstants';
import Message from 'components/Message';

const useStyles = styles;

const HomeScreen = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const getProducts = useSelector(state => state.getProducts);
	const { loading, error, products } = getProducts;
	useEffect(() => {
		dispatch(getProductsAction());
	}, []);
	return (
		<>
			<Message
				error={error}
				reset={() => dispatch({ type: GET_PRODUCTS_CLEAR })}
				func={() => dispatch(getProductsAction())}
				funcText='Retry'
			/>
			<Grid container spacing={3}>
				{loading
					? [...Array(3).keys()].map(key => (
							<Grid key={key} item xs sm={2} md={3}>
								<Skeleton className={classes.full} variant='rect' />
							</Grid>
					  ))
					: products?.map(product => (
							<Grid key={product._id} item xs sm={2} md={3}>
								<Paper>{product.name}</Paper>
							</Grid>
					  ))}
			</Grid>
		</>
	);
};

export default HomeScreen;
