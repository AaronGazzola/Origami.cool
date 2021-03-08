import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from 'styles/contentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from 'actions/productActions';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

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
			<Typography
				variant='h1'
				className={clsx(classes.heroMargin, classes.title)}
			>
				Welcome
			</Typography>
			<Paper className={classes.paper}>
				<Typography className={classes.text}>
					Hi, my name's Aaron. I folded these models developed this eCommerce
					web application.
				</Typography>
				<Typography className={classes.text}>
					Like this web app? Want one just as awesome? Visit{' '}
					<a className={classes.link} href='https://apexapps.dev'>
						Apex Apps
					</a>
					!
				</Typography>
			</Paper>
			{loading && (
				<CircularProgress className={classes.margin2} thickness={2} />
			)}
			<Grid container>
				{products?.map(product => (
					<Grid
						key={product._id}
						item
						xs
						sm={12}
						md={4}
						container
						direction='column'
						alignItems='center'
						className={classes.productListItem}
					>
						<img
							className={classes.productListImage}
							src={product.images[0].path}
							alt={product.images[0].label}
						/>
						<Typography className={classes.productListTitle}>
							{product.name}
						</Typography>
						<Rating readOnly size='small' value={product.rating} />
						<Typography
							variant='body2'
							className={classes.productListNumReviews}
						>
							({product.numReviews} Reviews)
						</Typography>
						<Typography className={classes.productListPrice}>
							${product.price}
						</Typography>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default HomeScreen;
