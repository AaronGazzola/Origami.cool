import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	CircularProgress,
	Grid,
	IconButton,
	Paper,
	Typography,
	useTheme,
	useMediaQuery,
	Select,
	MenuItem,
	Button
} from '@material-ui/core';
import { ArrowForward, Delete } from '@material-ui/icons';
import useStyles from 'styles/cartStyles';
import { CART_CLEAR_REDIRECT } from 'constants/cartConstants';
import { Link } from 'react-router-dom';
import { addToCartAction, removeFromCartAction } from 'actions/cartActions';

const CartScreen = ({ history }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const classes = useStyles();
	const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
	const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
	const { cartItems, loading } = useSelector(state => state.cart);

	useEffect(() => {
		dispatch({ type: CART_CLEAR_REDIRECT });
	}, [dispatch]);
	return (
		<>
			<Grid
				container
				align='center'
				justify='flex-start'
				spacing={matchesXs ? 1 : 3}
				className={classes.container}
			>
				<Grid
					item
					xs={12}
					md={9}
					container
					direction='column'
					alignItems='flex-start'
				>
					<Typography variant='h1' className={classes.cartTitle}>
						Your Shopping Cart
					</Typography>
					{loading ? (
						<CircularProgress className={classes.loading} />
					) : cartItems?.length === 0 ? (
						<Typography className={classes.emptyCart}>
							Your cart is currently empty...
						</Typography>
					) : (
						cartItems?.map(item => (
							<Paper
								elevation={2}
								key={item.product}
								className={classes.cartItem}
							>
								{!matchesXs && (
									<Link
										to={`/product/${item.productSlug}`}
										className={classes.productImage}
									>
										<img
											src={item?.image.path}
											alt='product'
											className={classes.productImage}
										/>
									</Link>
								)}
								<Grid
									container
									justify='space-around'
									alignItems='center'
									style={{ height: '100%', width: '100%' }}
								>
									<Grid item xs={6} className={classes.productTitle}>
										<Link
											className={classes.link}
											to={`/product/${item.productSlug}`}
										>
											<Typography className={classes.itemName}>
												{item.name}
											</Typography>
										</Link>
									</Grid>
									<Grid item xs={2}>
										<Select
											labelId='item-quantity-select-label'
											id={`item-${item.product}-quantity-select`}
											value={item.qty}
											onChange={e =>
												dispatch(
													addToCartAction(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map(x => (
												<MenuItem key={x + 1} value={x + 1}>
													{x + 1}
												</MenuItem>
											))}
										</Select>
									</Grid>
									<Grid
										item
										xs={2}
										container
										direction='column'
										alignItems='center'
									>
										<Typography className={classes.itemPrice}>
											${item.price} {!matchesSm && `x ${item.qty}`}
										</Typography>
										<Typography className={classes.itemSubTotal}>
											{!matchesXs && '='} $
											{Number(item.price * item.qty).toFixed(2)}
										</Typography>
									</Grid>

									<Grid item xs={2}>
										<IconButton
											onClick={() =>
												dispatch(removeFromCartAction(item.product))
											}
										>
											<Delete className={classes.deleteIcon} />
										</IconButton>
									</Grid>
								</Grid>
							</Paper>
						))
					)}
				</Grid>
				<Grid
					item
					xs={12}
					md={3}
					container
					justify='center'
					alignItems='center'
					className={classes.checkoutGrid}
				>
					<Paper variant='outlined' className={classes.checkoutPaper}>
						<Typography variant='h6' className={classes.checkoutTotalTitle}>
							SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
							items:
						</Typography>
						<Typography className={classes.checkoutTotal}>
							$
							{cartItems
								.reduce((acc, item) => acc + item.price * item.qty, 0)
								.toFixed(2)}
						</Typography>
						<Button
							size='large'
							variant='contained'
							color='secondary'
							className={classes.checkoutButton}
							endIcon={<ArrowForward />}
							disabled={cartItems.length === 0}
							onClick={() => history.push('/checkout')}
						>
							Checkout
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default CartScreen;
