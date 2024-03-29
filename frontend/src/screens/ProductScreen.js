import React, { useEffect, useState, useRef } from 'react';
import useStyles from 'styles/productStyles';
import {
	Typography,
	Grid,
	FormControl,
	Button,
	Select,
	useMediaQuery,
	CircularProgress,
	InputLabel,
	MenuItem,
	useTheme
} from '@material-ui/core';
import { Skeleton, Rating } from '@material-ui/lab';
import { AddShoppingCart } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getProductAction } from 'actions/productActions';
import { addToCartAction } from 'actions/cartActions';
import ImageSlider from 'components/ImageSlider';
import ReviewSection from 'components/ReviewSection';
import {
	CREATE_PRODUCT_CLEAR_REDIRECT,
	UPDATE_PRODUCT_CLEAR_REDIRECT
} from 'constants/productConstants';

const ProductScreen = ({ match, history }) => {
	const slug = match.params.slug;
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
	const { loading, product } = useSelector(state => state.getProduct);
	const { loading: cartLoading, redirect: cartRedirect } = useSelector(
		state => state.cart
	);
	const { redirect: createProductRedirect } = useSelector(
		state => state.createProduct
	);

	const { redirect: updateProductRedirect } = useSelector(
		state => state.updateProduct
	);
	const [qty, setQty] = useState(product?.countInStock === 0 ? 0 : 1);
	const action = useRef(null);

	const addToCartHandler = () => {
		dispatch(addToCartAction(slug, qty));
	};

	useEffect(() => {
		dispatch(getProductAction(slug));
	}, [dispatch, slug]);

	useEffect(() => {
		if (cartRedirect) {
			history.push('/cart');
		} else if (createProductRedirect) {
			dispatch({ type: CREATE_PRODUCT_CLEAR_REDIRECT });
		} else if (updateProductRedirect) {
			dispatch({ type: UPDATE_PRODUCT_CLEAR_REDIRECT });
		}
	}, [
		cartRedirect,
		history,
		updateProductRedirect,
		createProductRedirect,
		dispatch
	]);

	const [sticky, setSticky] = useState(false);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		setSticky(action.current?.offsetHeight < window.innerHeight);
	}, [product, loading]);

	const handleResize = () => {
		setSticky(action.current?.offsetHeight < window.innerHeight);
	};

	return (
		<Grid
			container
			spacing={matchesSm ? 2 : 5}
			justify='flex-start'
			alignItems='stretch'
			className={classes.productContainer}
		>
			<Grid
				container
				direction='column'
				alignItems='center'
				justify='center'
				item
				xs={12}
				md={6}
			>
				{loading ? (
					<CircularProgress />
				) : (
					<ImageSlider images={product?.images} />
				)}
				{!loading && !matchesSm && product && (
					<ReviewSection product={product} />
				)}
			</Grid>

			<Grid
				container
				item
				direction='column'
				alignItems='flex-start'
				justify='flex-start'
				xs={12}
				md={6}
				className={sticky ? classes.sticky : null}
				ref={action}
				style={{ height: 'min-content' }}
			>
				<Grid item>
					{loading ? (
						<Skeleton type='text' animation='wave' width={200} height={100} />
					) : (
						<Typography className={classes.title} variant='h1'>
							{product?.name}
						</Typography>
					)}
				</Grid>
				<Grid item container alignItems='center' direction='row'>
					<Grid xs item container alignItems='center' justify='flex-start'>
						<Typography className={classes.dollarSign}>$</Typography>
						{loading ? (
							<Skeleton type='text' animation='wave' width={60} height={40} />
						) : (
							<Typography variant='h4' className={classes.price}>
								{product?.price}
							</Typography>
						)}
						<Typography className={classes.aud}>AUD</Typography>
					</Grid>
					<Grid
						xs
						item
						container
						alignItems='center'
						direction='row'
						justify='flex-end'
						className={classes.ratingCotnainer}
					>
						{loading ? (
							<Skeleton type='text' animation='wave' width={140} height={30} />
						) : (
							<Rating
								precision={0.5}
								name='product-rating'
								value={product?.rating}
								readOnly
							/>
						)}
						<Typography variant='body2'>
							({product?.numReviews}) Reviews
						</Typography>
					</Grid>
				</Grid>

				<Grid item className={classes.descriptionContainer}>
					{loading ? (
						<>
							<Skeleton type='text' animation='wave' width={150} />
							<Skeleton type='text' animation='wave' width={250} />
							<Skeleton type='text' animation='wave' width={200} />
							<Skeleton type='text' animation='wave' width={150} />
						</>
					) : (
						<Typography>{product?.description}</Typography>
					)}
				</Grid>
				<Grid
					item
					container
					direction='column'
					alignItems='center'
					justify='flex-start'
					className={classes.action}
				>
					{!loading && (
						<Grid
							item
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<FormControl className={classes.qty}>
								<InputLabel
									className={classes.qtyLabel}
									id='item-quantity-select-label'
								>
									Quantity
								</InputLabel>
								<Select
									labelId='item-quantity-select-label'
									id='item-quantity-select'
									value={qty}
									color='secondary'
									onChange={e => setQty(e.target.value)}
								>
									{product?.countInStock === 0 ? (
										<MenuItem value={0}>-</MenuItem>
									) : (
										[...Array(product?.countInStock).keys()].map(x => (
											<MenuItem key={x + 1} value={x + 1}>
												{x + 1}
											</MenuItem>
										))
									)}
								</Select>
							</FormControl>
							<Typography
								variant='body2'
								className={product?.countInStock === 0 ? classes.error : null}
							>
								{product?.countInStock} available
							</Typography>
						</Grid>
					)}

					<Button
						fullWidth
						size='large'
						variant='contained'
						endIcon={<AddShoppingCart />}
						className={classes.cartButton}
						color='secondary'
						disabled={product?.countInStock === 0}
						onClick={addToCartHandler}
					>
						{cartLoading ? (
							<CircularProgress
								size={25}
								style={{ color: theme.palette.background.default }}
							/>
						) : (
							'Add to Cart'
						)}
					</Button>
				</Grid>
				{matchesSm && (
					<Grid
						className={classes.smallReviewSection}
						container
						alignItems='center'
						direction='column'
					>
						{!loading && product && <ReviewSection product={product} />}
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default ProductScreen;
