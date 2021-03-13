import React, { useEffect, useState } from 'react';
import useStyles from 'styles/contentStyles';
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
import ImageSlider from 'components/ImageSlider';
import ReviewSection from 'components/ReviewSection';

const ProductScreen = ({ match }) => {
	const slug = match.params.slug;
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
	const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
	const { loading, product } = useSelector(state => state.getProduct);
	const [qty, setQty] = useState(product?.countInStock === 0 ? 0 : 1);

	const addToCartHandler = () => {};

	useEffect(() => {
		dispatch(getProductAction(slug));
	}, []);

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
				{/* {!loading && !matchesXs && ReviewSection} */}
			</Grid>

			<Grid
				container
				item
				direction='column'
				alignItems='flex-start'
				justify='flex-start'
				// className={classes.container}
				// spacing={3}
				xs={12}
				md={6}
			>
				<Grid
					item
					style={
						matchesXs
							? null
							: matchesSm
							? { paddingTop: 0, paddingBottom: 0 }
							: null
					}
				>
					{loading ? (
						<Skeleton type='text' animation='wave' width={200} />
					) : (
						<Typography className={classes.title} variant='h1'>
							{product?.name}
						</Typography>
					)}
				</Grid>
				<Grid
					item
					container
					alignItems='center'
					justify={
						matchesXs ? 'space-between' : matchesSm ? 'center' : 'space-between'
					}
					direction={matchesXs ? 'row' : matchesSm ? 'column' : 'row'}
					style={matchesXs ? null : matchesSm ? { paddingBottom: 0 } : null}
				>
					<Grid
						xs
						item
						container
						alignItems='flex-start'
						justify={
							matchesXs ? 'flex-start' : matchesSm ? 'center' : 'flex-start'
						}
						direction='row'
					>
						<span className={classes.dollarSign}>$</span>
						{loading ? (
							<Skeleton type='text' animation='wave' width={50} />
						) : (
							<Typography variant='h4' className={classes.price}>
								{product?.price}
							</Typography>
						)}
					</Grid>
					<Grid
						xs
						item
						container
						alignItems='center'
						direction='row'
						justify={matchesXs ? 'flex-end' : matchesSm ? 'center' : 'flex-end'}
					>
						{loading ? (
							<Skeleton type='text' animation='wave' width={50} />
						) : (
							<Rating
								precision={0.5}
								name='product-rating'
								value={product?.rating}
								readOnly
							/>
						)}

						<span style={{ marginTop: 2, marginLeft: 4 }}>
							({product?.numReviews}) Reviews
						</span>
					</Grid>
				</Grid>

				<Grid item>
					{loading ? (
						<>
							<Skeleton type='text' animation='wave' width={100} />
							<Skeleton type='text' animation='wave' width={200} />
							<Skeleton type='text' animation='wave' width={150} />
						</>
					) : (
						<Typography
							style={
								matchesXs
									? { fontSize: '1rem' }
									: matchesSm
									? { fontSize: '.9rem' }
									: null
							}
							variant='body1'
						>
							{product?.description}
						</Typography>
					)}
				</Grid>
				<Grid
					item
					container
					direction='column'
					alignItems='center'
					justify='flex-start'
					className={matchesXs ? null : classes.sticky}
					style={{ width: '100%' }}
				>
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
								onChange={e => setQty(e.target.value)}
							>
								{[...Array(product?.countInStock).keys()].map(x => (
									<MenuItem key={x + 1} value={x + 1}>
										{x + 1}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Typography
							variant='body2'
							// style={
							// 	product?.countInStock === 0
							// 		? { color: theme.palette.error.dark }
							// 		: null
							// }
						>
							{product?.countInStock} available
						</Typography>
					</Grid>

					<Button
						fullWidth
						variant='contained'
						endIcon={<AddShoppingCart />}
						className={classes.cartButton}
						color='secondary'
						disabled={product?.countInStock === 0}
						onClick={addToCartHandler}
					>
						Add to Cart
					</Button>
				</Grid>

				{matchesXs && (
					<Grid
						// style={{ borderTop: `2px solid ${theme.palette.grey[300]}` }}
						container
						alignItems='center'
						direction='column'
					>
						{/* {!loading && ReviewSection} */}
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default ProductScreen;
