import React, { useEffect } from 'react';
import styles from 'styles/contentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from 'actions/productActions';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = styles;

const HomeScreen = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { loading, products } = useSelector(state => state.getProducts);
	useEffect(() => {
		dispatch(getProductsAction());
	}, []);

	return (
		<>
			<div className={classes.hero}>
				<Typography variant='h1'>Origami.cool</Typography>
				<div></div>
			</div>

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
		</>
	);
};

export default HomeScreen;
