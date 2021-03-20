import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import {
	CircularProgress,
	Grid,
	Paper,
	Typography,
	Stepper,
	Step,
	StepLabel,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	TableFooter,
	Divider,
	Button
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
	LocalShipping as LocalShippingIcon,
	Person as PersonIcon,
	Payment as PaymentIcon,
	Cancel as CancelIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'styles/orderStyles';
import useContentStyles from 'styles/contentStyles';
import { getOrderAction, cancelOrderAction } from 'actions/orderActions';
import Message from 'components/Message';

const OrderScreen = ({ match }) => {
	const classes = useStyles();
	const contentClasses = useContentStyles();
	const dispatch = useDispatch();
	const [activeStep, setActiveStep] = useState(1);
	const [confirmCancel, setConfirmCancel] = useState('');
	const { order, loading: getOrderLoading, error: getOrderError } = useSelector(
		state => state.getOrder
	);
	const { order: canceledOrder, loading: cancelOrderLoading } = useSelector(
		state => state.cancelOrder
	);

	useEffect(() => {
		dispatch(getOrderAction(match.params.id));
	}, [dispatch, canceledOrder, match.params.id]);

	useEffect(() => {
		if (order?.isDelivered) {
			setActiveStep(3);
		} else if (order?.isPaid) {
			setActiveStep(2);
		}
	}, [order]);

	const addDecimals = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	return (
		<>
			<Message
				confirm={confirmCancel}
				setConfirm={setConfirmCancel}
				title='Cancel Order?'
				onConfirm={() => dispatch(cancelOrderAction(order._id))}
			/>
			<Grid
				container
				spacing={3}
				className={classes.container}
				justify='center'
			>
				<Grid container justify='center'>
					<Typography variant='h1' className={classes.title}>
						Order #{order?._id}
					</Typography>
					{getOrderLoading && (
						<Skeleton
							className={classes.titleSkeleton}
							width={250}
							animation='wave'
						/>
					)}
				</Grid>
				{!getOrderLoading && order?.isCanceled && !getOrderError && (
					<Grid item xs={12} md={4}>
						<Paper className={classes.cancelPaper} variant='outlined'>
							<Grid
								container
								alignItems='center'
								justify='flex-start'
								className={classes.detailsTitleGrid}
							>
								<CancelIcon fontSize='large' className={classes.cancelIcon} />
								<Typography className={classes.canceled} variant='h5'>
									Order Canceled
								</Typography>
							</Grid>

							<Typography className={classes.content}>
								This order has been canceled, a refund will be processed if
								payment has been made and the order has not been sent.
							</Typography>
							<Typography className={classes.content}>
								Please{' '}
								<Link className={contentClasses.link} to='/contact'>
									Contact Us
								</Link>{' '}
								for more information.
							</Typography>
						</Paper>
					</Grid>
				)}
				<Grid item xs={12}>
					<Stepper
						className={classes.stepper}
						activeStep={activeStep}
						alternativeLabel
					>
						<Step>
							<StepLabel className={classes.stepLabel}>Confirmation</StepLabel>
						</Step>
						<Step>
							<StepLabel className={classes.stepLabel}>Payment</StepLabel>
						</Step>
						<Step>
							<StepLabel className={classes.stepLabel}>Postage</StepLabel>
						</Step>
					</Stepper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						className={clsx(classes.detailsPaper, classes.completedBorder)}
					>
						<Grid
							container
							alignItems='center'
							justify='flex-start'
							className={classes.detailsTitleGrid}
						>
							<PersonIcon
								fontSize='large'
								className={clsx(classes.detailsIcon, classes.completed)}
							/>
							<Typography className={classes.completed} variant='h5'>
								Customer
							</Typography>
						</Grid>
						{getOrderLoading ? (
							<Grid container justify='center' className={classes.loadingGrid}>
								<CircularProgress />
							</Grid>
						) : !getOrderError ? (
							<Grid
								container
								direction='column'
								className={classes.addressContent}
							>
								<Typography variant='h5' className={contentClasses.subTitle}>
									{order?.user.name}
								</Typography>
								<Typography className={contentClasses.text}>
									{order?.user.email}
								</Typography>
								<Divider className={contentClasses.divider} />
								{order?.address && (
									<Typography className={contentClasses.address}>
										{order?.user.name}
									</Typography>
								)}
								{order?.address &&
									Object.keys(order?.address).map(key =>
										order?.address[key] && key === 'state' ? (
											<Typography key={key} className={contentClasses.address}>
												{order?.address.state}&nbsp;&nbsp;&nbsp;
												{order?.address.postCode}
											</Typography>
										) : order?.address[key] && key !== 'postCode' ? (
											<Typography className={contentClasses.address} key={key}>
												{order?.address[key]}
											</Typography>
										) : null
									)}
							</Grid>
						) : (
							<> </>
						)}
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						className={
							activeStep === 1
								? clsx(classes.detailsPaper, classes.activeBorder)
								: clsx(classes.detailsPaper, classes.completedBorder)
						}
					>
						<Grid
							container
							alignItems='center'
							justify='flex-start'
							className={classes.detailsTitleGrid}
						>
							<PaymentIcon
								fontSize='large'
								className={
									activeStep === 1
										? clsx(classes.detailsIcon, classes.active)
										: clsx(classes.detailsIcon, classes.completed)
								}
							/>
							<Typography
								className={
									activeStep === 1 ? classes.active : classes.completed
								}
								variant='h5'
							>
								Payment
							</Typography>
						</Grid>
						{getOrderLoading ? (
							<Grid container justify='center' className={classes.loadingGrid}>
								<CircularProgress />
							</Grid>
						) : !getOrderError ? (
							<>
								<Typography className={classes.content}>
									Your order has been paid for in full
								</Typography>
								<Typography className={classes.content}>
									Total Paid: ${order?.totalPrice}
								</Typography>
								<Typography className={classes.content}>
									Date paid:{' '}
									{moment(order?.paidAt.substring(0, 10)).format('Do MMM YYYY')}
								</Typography>
							</>
						) : (
							<></>
						)}
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					{getOrderLoading ? (
						<Paper className={classes.detailsPaper}>
							<Grid
								container
								alignItems='center'
								justify='flex-start'
								className={classes.detailsTitleGrid}
							>
								<LocalShippingIcon
									fontSize='large'
									className={classes.detailsIcon}
								/>
								<Typography variant='h5'>Postage</Typography>
							</Grid>
							<Grid container justify='center' className={classes.loadingGrid}>
								<CircularProgress />
							</Grid>
						</Paper>
					) : !getOrderError ? (
						<Paper
							className={
								activeStep === 2
									? clsx(classes.detailsPaper, classes.activeBorder)
									: activeStep === 3
									? clsx(classes.detailsPaper, classes.completedBorder)
									: classes.detailsPaper
							}
						>
							<Grid
								container
								alignItems='center'
								justify='flex-start'
								className={classes.detailsTitleGrid}
							>
								<LocalShippingIcon
									fontSize='large'
									className={
										activeStep === 2
											? clsx(classes.detailsIcon, classes.active)
											: activeStep === 3
											? clsx(classes.detailsIcon, classes.completed)
											: classes.detailsIcon
									}
								/>
								<Typography
									className={
										activeStep === 2
											? classes.active
											: activeStep === 3
											? classes.completed
											: null
									}
									variant='h5'
								>
									Postage
								</Typography>
							</Grid>
							{order?.isDelivered ? (
								<>
									<Typography className={classes.content}>
										Your order has been sent by regular parcel post and should
										arrive within 3-10 business days.
									</Typography>
									<Typography className={classes.content}>
										Date sent:{' '}
										{moment(order?.deliveredAt.substring(0, 10)).format(
											'Do MMM YYYY'
										)}
									</Typography>
								</>
							) : (
								<>
									<Typography className={classes.content}>
										{order?.isCanceled
											? 'Your order has not been sent and will be refunded'
											: 'Your Order Will be sent within 2-3 Business Days.'}
									</Typography>
								</>
							)}
						</Paper>
					) : (
						<></>
					)}
				</Grid>
				<Typography variant='h1' className={classes.title2}>
					Order Items
				</Typography>
				{getOrderLoading ? (
					<Grid item xs className={classes.loadingGrid}>
						<Paper className={classes.detailsPaper}>
							<Grid container justify='center'>
								<CircularProgress />
							</Grid>
						</Paper>
					</Grid>
				) : !getOrderError ? (
					<Grid item container justify='center' xs>
						<TableContainer
							className={classes.tableContainer}
							component={Paper}
						>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow className={classes.headerRow}>
										<TableCell align='center'>Item</TableCell>
										<TableCell align='center'>Price</TableCell>
										<TableCell align='center'>Quantity</TableCell>
										<TableCell align='center'>Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order?.orderItems.map(item => (
										<TableRow key={item._id} className={classes.tableRow}>
											<TableCell align='center'>{item.name}</TableCell>
											<TableCell align='center'>
												${addDecimals(item.price)}
											</TableCell>
											<TableCell align='center'>{item.qty}</TableCell>
											<TableCell align='center'>
												${addDecimals(item.price * item.qty)}
											</TableCell>
										</TableRow>
									))}
									<TableRow className={classes.tableRow}>
										<TableCell align='center'></TableCell>
										<TableCell align='center'></TableCell>
										<TableCell align='right'>GST</TableCell>
										<TableCell align='center'>
											${addDecimals(order?.taxPrice)}
										</TableCell>
									</TableRow>
									<TableRow className={classes.tableRow}>
										<TableCell align='center'></TableCell>
										<TableCell align='center'></TableCell>
										<TableCell align='right'>Postage</TableCell>
										<TableCell align='center'>
											${addDecimals(order?.shippingPrice)}
										</TableCell>
									</TableRow>
								</TableBody>
								<TableFooter>
									<TableRow className={classes.headerRow}>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell align='center'>
											${addDecimals(order?.totalPrice)}
										</TableCell>
									</TableRow>
								</TableFooter>
							</Table>
						</TableContainer>
					</Grid>
				) : (
					<></>
				)}
			</Grid>
			{!order?.isCanceled && (
				<Button
					variant='outlined'
					className={classes.cancelButton}
					onClick={() =>
						setConfirmCancel(
							'Are you sure your want to cancel your order? A refund will be provided if the order has not yet been posted'
						)
					}
				>
					{cancelOrderLoading ? (
						<CircularProgress size={25} className={contentClasses.error} />
					) : (
						'Cancel Order'
					)}
				</Button>
			)}
		</>
	);
};

export default OrderScreen;
