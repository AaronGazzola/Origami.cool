import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
import { getProductsAction } from 'actions/productActions';

const CartScreen = ({ history }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const classes = useStyles();
	const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
	const [stockChecked, setStockChecked] = useState(false);
	const { cartItems, loading } = useSelector(state => state.cart);
	const { products } = useSelector(state => state.getProducts);

	useEffect(() => {
		dispatch({ type: CART_CLEAR_REDIRECT });
		dispatch(getProductsAction());
	}, [dispatch]);

	// update cart if insufficient stock
	useEffect(() => {
		if (products?.length > 0 && cartItems?.length > 0 && !stockChecked) {
			cartItems.forEach(item => {
				products.forEach(product => {
					if (product._id === item.product) {
						if (product.countInStock === 0) {
							dispatch(removeFromCartAction(product._id));
						} else if (product.countInStock < item.qty) {
							dispatch(addToCartAction(product.slug, product.countInStock));
						}
					}
				});
			});
			setStockChecked(true);
		}
	}, [products, cartItems, stockChecked, dispatch]);

	return (
		<>
			<Grid
				container
				align='center'
				justify='flex-start'
				spacing={matchesXs ? 1 : 3}
				className={classes.container}
			>
				<Typography variant='h1' className={classes.cartTitle}>
					Your Shopping Cart
				</Typography>
				<Grid
					item
					container
					justify='center'
					alignItems='center'
					className={classes.itemListGrid}
				>
					{loading ? (
						<CircularProgress className={classes.loading} />
					) : cartItems?.length === 0 ? (
						<Typography className={classes.emptyCart}>
							Your cart is currently empty...
						</Typography>
					) : (
						cartItems?.map(item => (
							<Paper
								variant='outlined'
								key={item.product}
								className={classes.cartItem}
								component={Grid}
								container
								alignItems='center'
								justify='space-between'
								direction={matchesXs ? 'column' : 'row'}
							>
								<img
									to={`/product/${item.productSlug}`}
									component={Link}
									src={item?.imagePath}
									alt={item?.imageLabel}
									className={classes.productImage}
								/>

								<Typography
									className={clsx(classes.itemName, classes.link)}
									component={Link}
									to={`/product/${item.productSlug}`}
								>
									{item.name}
								</Typography>

								<Select
									className={classes.select}
									labelId='item-quantity-select-label'
									id={`${item.productSlug}-quantity-select`}
									value={item.qty}
									onChange={e =>
										dispatch(
											addToCartAction(item.productSlug, Number(e.target.value))
										)
									}
								>
									{[...Array(item.countInStock).keys()].map(x => (
										<MenuItem key={x + 1} value={x + 1}>
											{x + 1}
										</MenuItem>
									))}
								</Select>

								<Typography className={classes.itemPrice}>
									${item.price * item.qty}
								</Typography>

								<IconButton
									className={classes.deleteIcon}
									onClick={() => dispatch(removeFromCartAction(item.product))}
								>
									<Delete />
								</IconButton>
							</Paper>
						))
					)}
				</Grid>
				<Grid
					item
					xs
					container
					direction={matchesXs ? 'column' : 'row'}
					alignItems={matchesXs ? 'center' : 'center'}
					justify={matchesXs ? 'flex-start' : 'flex-end'}
					className={classes.subTotalGrid}
				>
					{cartItems.length !== 0 && (
						<Paper variant='outlined' className={classes.subTotal}>
							<Typography>
								Subtotal:{' '}
								<span>
									$
									{cartItems
										.reduce((acc, item) => acc + item.price * item.qty, 0)
										.toFixed(2)}
								</span>
							</Typography>
						</Paper>
					)}
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
				</Grid>
			</Grid>
		</>
	);
};

export default CartScreen;
