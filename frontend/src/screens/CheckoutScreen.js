import React, { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useHistory } from 'react-router-dom';
import {
	List,
	ListItem,
	ListItemText,
	Grid,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	AccordionActions,
	Button,
	Paper,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	IconButton,
	MenuItem,
	useMediaQuery,
	Divider,
	Backdrop,
	CircularProgress,
	Collapse,
	TextField
} from '@material-ui/core';
import {
	ExpandMore as ExpandMoreIcon,
	LocalShipping as LocalShippingIcon,
	Payment as PaymentIcon,
	List as ListIcon,
	CheckCircleOutline as CheckCircleIcon,
	CheckCircle as FullCheckCircleIcon,
	Delete,
	ExpandLess,
	ExpandMore
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Message from 'components/Message';
import useStyles from 'styles/checkoutStyles';
import useFormStyles from 'styles/formStyles';
import { userUpdateProfileAction } from 'actions/userActions';
import { addToCartAction, removeFromCartAction } from 'actions/cartActions';
import { createOrderAction } from 'actions/orderActions';
import { Skeleton } from '@material-ui/lab';
import {
	UPDATE_ADDRESS_CLEAR,
	USER_DETAILS_CLEAR
} from 'constants/userConstants';
import {
	CREATE_ORDER_CLEAR,
	CREATE_ORDER_FAIL
} from 'constants/orderConstants';
import useCheckoutForm from 'hooks/checkoutFormHook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'utils/validators';

const CheckoutScreen = () => {
	const classes = useStyles();
	const formClasses = useFormStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
	const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
	const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
	const [sdkReady, setSdkReady] = useState(false);
	const [closeAddress, setCloseAddress] = useState(false);

	const {
		user: { address }
	} = useSelector(state => state.userData);
	const {
		loading: userUpdateProfileLoading,
		success: userUpdateProfileSuccess
	} = useSelector(state => state.userUpdateProfile);

	const { loading: createOrderLoading } = useSelector(
		state => state.createOrder
	);

	const [formState, formDispatch] = useCheckoutForm(address);
	const {
		expanded,
		step,
		payment,
		addressIsValid,
		addressFormIsValid,
		addressIsOpen,
		addressInputs: { street1, street2, city, state, postCode, country }
	} = formState;

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	// Calculat prices
	const addDecimals = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(9.97);

	cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));

	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	useEffect(() => {
		if (addressIsOpen && userUpdateProfileSuccess && closeAddress) {
			formDispatch({ type: 'TOGGLE' });
			setCloseAddress(false);
		}
	}, [closeAddress, addressIsOpen, userUpdateProfileSuccess]);

	useEffect(() => {
		formDispatch({ type: 'RESET', payload: address });
	}, [address]);

	useEffect(() => {
		if (!sdkReady) {
			const addPayPalScript = async () => {
				const { data: clientId } = await axios.get('/api/v1/config/paypal');
				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=AUD`;
				script.async = true;
				script.onload = () => {
					setSdkReady(true);
				};
				document.body.appendChild(script);
			};
			addPayPalScript();
		}
	});

	const setExpandedHandler = expandIndex => {
		formDispatch({
			type: 'EXPAND',
			payload: expandIndex
		});
	};

	const changeHandler = (e, validators) => {
		formDispatch({
			type: 'CHANGE',
			payload: e.target,
			validators
		});
	};

	const touchHandler = e => {
		if (!formState.addressInputs[e.target.id].isTouched) {
			formDispatch({ type: 'TOUCH', payload: e.target });
		}
	};

	const addressToggleHandler = () => {
		formDispatch({ type: 'TOGGLE' });
	};

	const updateAddressHandler = e => {
		e.preventDefault();
		setCloseAddress(true);
		dispatch(
			userUpdateProfileAction({
				address: {
					street1: street1.value,
					street2: street2.value,
					city: city.value,
					state: state.value,
					postCode: postCode.value,
					country: country.value
				}
			})
		);
	};

	const placeOrderHandler = paymentResult => {
		const orderInfo = {
			orderItems: cartItems,
			address,
			paymentMethod: payment,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice
		};
		dispatch(createOrderAction({ ...orderInfo, paymentResult }));
	};

	return (
		<>
			<Backdrop className={classes.backdrop} open={!!createOrderLoading}>
				<CircularProgress color='secondary' />
			</Backdrop>
			<Grid container className={classes.container} spacing={3}>
				<Typography variant='h1' className={classes.title}>
					Secure Checkout
				</Typography>
				<Grid item xs={12} md={8} lg={9} className={classes.sticky}>
					<Accordion
						expanded={expanded === 0}
						onChange={() => setExpandedHandler(0)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel1-content'
							id='panel1-header'
							className={classes.accordionSummary}
						>
							{!matchesXs && <LocalShippingIcon className={classes.icon1} />}
							<Typography variant='h5' className={classes.heading}>
								Shipping Info{!matchesXs && 'rmation'}
							</Typography>
							{step > 0 && (
								<>
									<CheckCircleIcon className={classes.icon2} />
									{!matchesXs && (
										<Typography className={classes.summaryText}>
											Delivery to {address?.street1}
										</Typography>
									)}
								</>
							)}
						</AccordionSummary>
						<AccordionDetails>
							<Grid container spacing={2} className={classes.shippingContainer}>
								<Grid item xs={12} sm={6}>
									<Paper variant='outlined' className={classes.deliveryPaper}>
										<Typography variant='h6'>Delivery Address:</Typography>
										{address &&
											Object.keys(address).map(key =>
												address[key] && key === 'state' ? (
													<Typography key={key} className={classes.address}>
														{address.state}&nbsp;&nbsp;&nbsp;
														{address.postCode}
													</Typography>
												) : address[key] && key !== 'postCode' ? (
													<Typography className={classes.address} key={key}>
														{address[key]}
													</Typography>
												) : null
											)}
									</Paper>
								</Grid>
								<Grid item xs={12} sm={6}>
									<List
										className={
											addressIsOpen
												? clsx(formClasses.outerList, formClasses.outerListOpen)
												: formClasses.outerList
										}
										style={{ margin: 0, width: '100%' }}
									>
										<ListItem button onClick={addressToggleHandler}>
											<ListItemText
												className={!addressIsOpen ? formClasses.greyText : null}
												primary='Edit Postal Address'
											/>

											{addressIsOpen ? <ExpandLess /> : <ExpandMore />}
										</ListItem>
										<Collapse in={addressIsOpen} timeout='auto' unmountOnExit>
											<form onSubmit={updateAddressHandler}>
												<List className={formClasses.innerList}>
													<TextField
														id='street1'
														label='Street Address Line 1'
														type='text'
														placeholder='Street Address Line 1'
														fullWidth
														color='secondary'
														value={street1.value}
														onChange={e =>
															changeHandler(e, [VALIDATOR_REQUIRE()])
														}
														className={
															street1.isTouched && !street1.isValid
																? clsx(formClasses.listInput, formClasses.error)
																: formClasses.listInput
														}
														onBlur={touchHandler}
														error={!street1.isValid && street1.isTouched}
														helperText={
															street1.isTouched && !street1.isValid
																? 'Street address is requried'
																: ' '
														}
													/>
													<TextField
														id='street2'
														label='Street Address Line 2'
														type='text'
														placeholder='Street Address Line 2'
														fullWidth
														color='secondary'
														value={street2.value}
														onChange={e => changeHandler(e, [])}
														className={
															street2.isTouched && !street2.isValid
																? clsx(formClasses.listInput, formClasses.error)
																: formClasses.listInput
														}
														onBlur={touchHandler}
														error={!street2.isValid && street2.isTouched}
														helperText=' '
													/>
													<TextField
														id='city'
														label='City'
														type='text'
														placeholder='City'
														fullWidth
														color='secondary'
														value={city.value}
														onChange={e =>
															changeHandler(e, [VALIDATOR_REQUIRE()])
														}
														className={
															city.isTouched && !city.isValid
																? clsx(formClasses.listInput, formClasses.error)
																: city.isChanged
																? clsx(
																		formClasses.listInput,
																		formClasses.changed
																  )
																: formClasses.listInput
														}
														onBlur={touchHandler}
														error={city.isTouched && !city.isValid}
														helperText={
															city.isTouched && !city.isValid
																? 'City is required'
																: ' '
														}
													/>
													<TextField
														id='state'
														label='State'
														type='text'
														placeholder='State'
														fullWidth
														color='secondary'
														value={state.value}
														onChange={e =>
															changeHandler(e, [VALIDATOR_REQUIRE()])
														}
														className={
															state.isTouched && !state.isValid
																? clsx(formClasses.listInput, formClasses.error)
																: state.isChanged
																? clsx(
																		formClasses.listInput,
																		formClasses.changed
																  )
																: formClasses.listInput
														}
														onBlur={touchHandler}
														error={state.isTouched && !state.isValid}
														helperText={
															state.isTouched && !state.isValid
																? 'State is required'
																: ' '
														}
													/>
													<TextField
														id='postCode'
														label='Post Code'
														type='number'
														placeholder='Post Code'
														fullWidth
														color='secondary'
														value={postCode.value}
														onChange={e =>
															changeHandler(e, [
																VALIDATOR_REQUIRE(),
																VALIDATOR_MINLENGTH(4)
															])
														}
														className={
															postCode.isTouched && !postCode.isValid
																? clsx(formClasses.listInput, formClasses.error)
																: postCode.isChanged
																? clsx(
																		formClasses.listInput,
																		formClasses.changed
																  )
																: formClasses.listInput
														}
														onBlur={touchHandler}
														error={postCode.isTouched && !postCode.isValid}
														helperText={
															postCode.isTouched && !postCode.isValid
																? 'Post Code is required'
																: ' '
														}
													/>
													<TextField
														id='country'
														label='Country'
														type='text'
														placeholder='Country'
														fullWidth
														color='secondary'
														value={country.value}
														onChange={e =>
															changeHandler(e, [VALIDATOR_REQUIRE()])
														}
														className={
															country.isTouched && !country.isValid
																? clsx(formClasses.listInput, formClasses.error)
																: country.isChanged
																? clsx(
																		formClasses.listInput,
																		formClasses.changed
																  )
																: formClasses.listInput
														}
														onBlur={touchHandler}
														error={country.isTouched && !country.isValid}
														helperText={
															country.isTouched && !country.isValid
																? 'Country is required'
																: ' '
														}
													/>
													<Button
														size='large'
														variant='contained'
														color='secondary'
														type='submit'
														className={classes.addressButton}
														disabled={!addressFormIsValid}
													>
														{userUpdateProfileLoading ? (
															<CircularProgress
																size={25}
																style={{
																	color: theme.palette.background.default
																}}
															/>
														) : (
															'Update Address'
														)}
													</Button>
												</List>
											</form>
										</Collapse>
									</List>
								</Grid>
							</Grid>
						</AccordionDetails>
						<AccordionActions>
							<Button
								size='large'
								onClick={() => setExpandedHandler(1)}
								variant='contained'
								color='secondary'
								disabled={!addressIsValid}
							>
								Next
							</Button>
						</AccordionActions>
					</Accordion>
					<Accordion
						expanded={expanded === 1}
						onChange={() => setExpandedHandler(1)}
						disabled={step === 0}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel2-content'
							id='panel2-header'
							className={classes.accordionSummary}
						>
							{!matchesXs && <PaymentIcon className={classes.icon1} />}
							<Typography variant='h5' className={classes.heading}>
								Payment Method
							</Typography>
							{step > 1 && (
								<>
									<CheckCircleIcon className={classes.icon2} />
									{!matchesXs && (
										<Typography className={classes.summaryText}>
											PayPal
										</Typography>
									)}
								</>
							)}
						</AccordionSummary>
						<AccordionDetails>
							<FormControl component='fieldset'>
								<RadioGroup
									className={classes.paymentOptions}
									aria-label='payment'
									name='payment'
									value={payment}
								>
									<FormControlLabel
										value='paypal'
										control={<Radio />}
										label={
											<Typography className={classes.payPalOption}>
												<span>PayPal</span> - Credit Card Available
											</Typography>
										}
									/>
								</RadioGroup>
							</FormControl>
						</AccordionDetails>
						<AccordionActions>
							<Button
								size='large'
								onClick={() => setExpandedHandler(0)}
								variant='outlined'
								color='primary'
							>
								Back
							</Button>
							<Button
								size='large'
								onClick={() => setExpandedHandler(2)}
								variant='contained'
								color='secondary'
							>
								Next
							</Button>
						</AccordionActions>
					</Accordion>
					<Accordion
						expanded={expanded === 2}
						onChange={() => setExpandedHandler(2)}
						disabled={step < 2}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel3-content'
							id='panel3-header'
							className={classes.accordionSummary}
						>
							{!matchesXs && <ListIcon className={classes.icon1} />}
							<Typography variant='h5' className={classes.heading}>
								Order Items
							</Typography>
							{step > 2 && (
								<>
									<CheckCircleIcon className={classes.icon2} />
									{!matchesXs && (
										<Typography className={classes.summaryText}>
											Items Confirmed
										</Typography>
									)}
								</>
							)}
						</AccordionSummary>
						<AccordionDetails>
							<Grid container direction='column' alignItems='center'>
								{cartItems?.map(item => (
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
											src={item?.image.path}
											alt={item?.image.label}
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
													addToCartAction(
														item.productSlug,
														Number(e.target.value)
													)
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
											onClick={() =>
												dispatch(removeFromCartAction(item.product))
											}
										>
											<Delete />
										</IconButton>
									</Paper>
								))}
							</Grid>
						</AccordionDetails>
						<AccordionActions>
							<Button
								size='large'
								onClick={() => setExpandedHandler(1)}
								variant='outlined'
								color='primary'
							>
								Back
							</Button>
							<Button
								size='large'
								onClick={() => setExpandedHandler(3)}
								variant={step === 3 ? 'outlined' : 'contained'}
								color='secondary'
								endIcon={step === 3 ? <FullCheckCircleIcon /> : null}
								disabled={step === 3}
							>
								{step === 3 ? 'Confirmed' : 'Confirm'}
							</Button>
						</AccordionActions>
					</Accordion>
				</Grid>
				<Grid item xs={12} md={4} lg={3} className={classes.sticky}>
					<Paper variant='outlined' className={classes.orderPaper}>
						<Typography variant='h5' className={classes.orderTitle}>
							Order Summary
						</Typography>
						<Typography variant='h6'>Shipping</Typography>
						<Divider />
						<Grid container justify='space-between' className={classes.mb1}>
							{step >= 0 && (
								<>
									<Typography>Delivery</Typography>
									<Typography>${cart.shippingPrice}</Typography>
								</>
							)}
						</Grid>
						<Typography variant='h6'>Payment</Typography>
						<Divider />

						{step >= 1 && (
							<>
								<Typography className={classes.mb1}>
									{payment === 'paypal'
										? 'PayPal / Credit Card'
										: 'Pay at Pick Up'}
								</Typography>
							</>
						)}

						<Typography variant='h6'>Items</Typography>
						<Divider />
						{step === 3 && (
							<>
								{cartItems.map(x => (
									<Grid key={x.product} container justify='space-between'>
										<Typography>
											{x.name.slice(0, 10)}
											{x.name.length > 10 && '...'} x {x.qty}
										</Typography>
										<Typography>${addDecimals(x.price * x.qty)}</Typography>
									</Grid>
								))}
								<Grid container className={classes.mb1} justify='space-between'>
									<Typography>GST</Typography>
									<Typography>${cart.taxPrice}</Typography>
								</Grid>
							</>
						)}
						<Typography variant='h6'>Total</Typography>
						<Divider />
						{step === 3 && (
							<Grid container justify='flex-end'>
								<Typography style={{ fontWeight: 700 }}>
									${cart.totalPrice}{' '}
									<span style={{ fontWeight: 500 }}>AUD</span>
								</Typography>
							</Grid>
						)}
						{step === 3 && sdkReady && (
							<div className={classes.orderButton}>
								<PayPalButton
									amount={cart.totalPrice}
									onSuccess={placeOrderHandler}
									currency='AUD'
									onError={() => dispatch({ type: CREATE_ORDER_FAIL })}
								/>
							</div>
						)}
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default CheckoutScreen;
