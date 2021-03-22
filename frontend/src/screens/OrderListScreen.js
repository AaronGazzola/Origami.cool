import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
	Grid,
	Paper,
	Typography,
	CircularProgress,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Switch,
	useMediaQuery,
	IconButton,
	TablePagination
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Message from 'components/Message';
import useStyles from 'styles/adminStyles';
import {
	listOrdersAction,
	setDeliveredAction,
	cancelOrderAction
} from 'actions/orderActions';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';

const OrderListScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();

	const mediaMdUp = useMediaQuery(theme.breakpoints.up('md'));
	const mediaXsDown = useMediaQuery(theme.breakpoints.down('xs'));

	const [confirmDelivered, setConfirmDelivered] = useState('');
	const [confirmDeliveredOrder, setConfirmDeliveredOrder] = useState(null);
	const [confirmCancel, setConfirmCancel] = useState('');
	const [confirmCancelOrder, setConfirmCancelOrder] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { orders, loading: listOrdersLoading } = useSelector(
		state => state.listOrders
	);
	const {
		success: cancelOrderSuccess,
		loading: cancelOrderLoading
	} = useSelector(state => state.cancelOrder);
	const {
		success: setDeliveredSuccess,
		loading: setDeliveredLoading
	} = useSelector(state => state.setDelivered);

	useEffect(() => {
		dispatch(listOrdersAction());
	}, [dispatch]);

	useEffect(() => {
		if (cancelOrderSuccess || setDeliveredSuccess) dispatch(listOrdersAction());
	}, [dispatch, setDeliveredSuccess, cancelOrderSuccess]);

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	return (
		<>
			<Message
				confirm={confirmDelivered || confirmCancel}
				setConfirm={confirmDelivered ? setConfirmDelivered : setConfirmCancel}
				onConfirm={
					confirmDelivered
						? () => dispatch(setDeliveredAction(confirmDeliveredOrder))
						: () => dispatch(cancelOrderAction(confirmCancelOrder))
				}
			/>
			<Grid container className={classes.container}>
				<Grid item container xs justify='space-between' alignItems='center'>
					<Typography variant='h1' className={classes.title}>
						Orders
					</Typography>
				</Grid>
				{listOrdersLoading || setDeliveredLoading || cancelOrderLoading ? (
					<Paper className={classes.loadingPaper}>
						<CircularProgress />
					</Paper>
				) : orders?.length === 0 ? (
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label='simple table'>
							<TableHead>
								<TableRow className={classes.headerRow}>
									{mediaMdUp && (
										<>
											<TableCell align='left'>User Name</TableCell>
											<TableCell align='left'>Date Ordered</TableCell>
										</>
									)}
									<TableCell align='left'>Order ID</TableCell>

									<TableCell align='center'>Paid</TableCell>
									<TableCell align='center'>Delivered</TableCell>
									<TableCell
										align='center'
										style={{ color: theme.palette.error.main }}
									>
										Cancel
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell component='th' scope='row'>
										No orders
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<TableContainer component={Paper} className={classes.table}>
						<Table aria-label='simple table'>
							<TableHead>
								<TableRow className={classes.headerRow}>
									{mediaMdUp && (
										<>
											<TableCell align='left'>User Name</TableCell>
											<TableCell align='left'>Date Ordered</TableCell>
											<TableCell align='center'>Paid</TableCell>
										</>
									)}
									<TableCell align='left'>Order ID</TableCell>

									<TableCell align='center'>Delivered</TableCell>
									<TableCell
										align='center'
										style={{ color: theme.palette.error.main }}
									>
										Cancel
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders
									?.sort(
										(a, b) =>
											moment(b.createdAt.substring(0, 19)).valueOf() -
											moment(a.createdAt.substring(0, 19)).valueOf()
									)
									.map(order => (
										<TableRow className={classes.tableRow} key={order._id}>
											{mediaMdUp && (
												<>
													<TableCell align='left'>{order.user.name}</TableCell>
													<TableCell align='left'>
														{moment(order.createdAt.substring(0, 10)).format(
															'Do MMM'
														)}
													</TableCell>
													<TableCell align='center'>
														{moment(order.paidAt.substring(0, 10)).format(
															'Do MMM'
														)}
													</TableCell>
												</>
											)}

											<TableCell align='left'>
												<Link
													className={classes.link}
													to={`/order/${order._id}`}
												>
													{mediaXsDown
														? `${order._id.slice(0, 5)}...`
														: order._id}
												</Link>
											</TableCell>

											<TableCell align='center'>
												<Switch
													checked={order.isDelivered}
													onChange={() => {
														setConfirmDelivered(
															`Are you sure you want to mark this order as ${
																order.isDelivered ? 'undelivered' : 'delivered'
															}?`
														);
														setConfirmDeliveredOrder(order._id);
													}}
													color='secondary'
													name='Delivered'
													inputProps={{ 'aria-label': 'Delivered Checkbox' }}
												/>
											</TableCell>
											<TableCell
												align='center'
												style={{ color: theme.palette.error.main }}
											>
												{order.isCanceled ? (
													'Cancelled'
												) : (
													<IconButton
														onClick={() => {
															setConfirmCancel(
																`Are you sure you want to cancel order #${order._id}?`
															);
															setConfirmCancelOrder(order._id);
														}}
														style={{ color: theme.palette.error.main }}
													>
														<Cancel />
													</IconButton>
												)}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
						{orders && (
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component='div'
								count={orders.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						)}
					</TableContainer>
				)}
			</Grid>
		</>
	);
};

export default OrderListScreen;
