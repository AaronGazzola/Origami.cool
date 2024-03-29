import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useStyles from 'styles/contentStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from 'actions/productActions';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { loading, products } = useSelector(state => state.getProducts);
	const [animation, setAnimation] = useState(true);
	const messageRef = useRef(null);

	useEffect(() => {
		dispatch(getProductsAction());
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	const handleScroll = e => {
		const messageHeight =
			messageRef.current?.offsetTop +
			messageRef.current?.offsetHeight * 2 -
			window.innerHeight;
		if (window.scrollY >= messageHeight) setAnimation(false);
	};

	return (
		<>
			{animation && (
				<div className={classes.arrowCircle}>
					<ArrowDownward fontSize='large' className={classes.arrow} />
				</div>
			)}
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
			<Paper className={classes.paper} ref={messageRef}>
				<Typography className={classes.text}>
					Hi, I'm Aaron. I fold origami and develop web applications.
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
			<Grid container justify='center' className={classes.margin2}>
				{products?.map(product => (
					<Grid
						key={product._id}
						item
						xs={12}
						md={4}
						container
						direction='column'
						alignItems='center'
						className={classes.productListItem}
						component={Link}
						to={`/product/${product.slug}`}
					>
						<img
							className={classes.productListImage}
							src={product.images[0].path}
							alt={product.images[0].label || `${product.name} product image`}
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
