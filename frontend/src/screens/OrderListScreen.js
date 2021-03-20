// import React, { useEffect, useState } from 'react';
// import {
// 	Grid,
// 	Paper,
// 	Typography,
// 	CircularProgress,
// 	TableContainer,
// 	Table,
// 	TableHead,
// 	TableRow,
// 	TableCell,
// 	TableBody,
// 	Switch,
// 	useMediaQuery,
// 	IconButton,
// 	TablePagination,
// 	TextField,
// 	Collapse,
// 	FormControl,
// 	InputLabel,
// 	Select,
// 	MenuItem
// } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
// import { useSelector, useDispatch } from 'react-redux';
// import Message from 'components/Message';
// import styles from 'styles/orderListStyles';
// import { logoutAction } from 'actions/userActions';
// import {
// 	listOrdersAction,
// 	setDeliveredAction,
// 	setPaidAction,
// 	setCanceledAction
// } from 'actions/orderActions';
// import { LIST_ORDERS_CLEAR } from 'constants/orderConstants';
// import { Link } from 'react-router-dom';
// import {
// 	Cancel,
// 	ExpandMore as ExpandMoreIcon,
// 	ExpandLess as ExpandLessIcon,
// 	Search as SearchIcon
// } from '@material-ui/icons';
// import { Autocomplete } from '@material-ui/lab';

// const useStyles = styles;

// const OrderListScreen = ({ history, match }) => {
// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 	}, []);
// 	const keyword = match.params.keyword;
// 	const classes = useStyles();
// 	const dispatch = useDispatch();
// 	const theme = useTheme();

// 	const matchesXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
// 	const matchesMd = useMediaQuery(theme => theme.breakpoints.down('md'));

// 	const [confirmPaid, setConfirmPaid] = useState({});
// 	const [confirmDelivered, setConfirmDelivered] = useState({});
// 	const [confirmCancel, setConfirmCancel] = useState({});
// 	const [page, setPage] = useState(0);
// 	const [rowsPerPage, setRowsPerPage] = useState(5);
// 	const [autocompleteOptions, setAutocompleteOptions] = useState([]);
// 	const [autocompleteValue, setAutocompleteValue] = useState('');
// 	const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
// 	const [optionsOpen, setOptionsOpen] = useState(false);

// 	const mediaMdUp = useMediaQuery(theme.breakpoints.up('md'));
// 	const mediaXsDown = useMediaQuery(theme.breakpoints.down('xs'));

// 	const auth = useSelector(state => state.auth);
// 	const { user: authUser, isAuth } = auth;

// 	const listOrders = useSelector(state => state.listOrders);
// 	const {
// 		orders,
// 		success,
// 		loading: listOrdersLoading,
// 		error: listOrdersError,
// 		count
// 	} = listOrders;

// 	const [searchOptions, setSearchOptions] = useState({
// 		paid: orders ? 'Any' : '',
// 		delivered: orders ? 'Any' : '',
// 		cancelled: orders ? 'Any' : ''
// 	});

// 	useEffect(() => {
// 		if (!isAuth || !authUser?.isValid || authUser.isBanned) {
// 			dispatch(logoutAction());
// 			history.push('/login');
// 		} else if (!authUser.isAdmin) {
// 			history.push('/');
// 		}
// 	}, [dispatch, match, authUser, history, isAuth]);

// 	useEffect(() => {
// 		dispatch(listOrdersAction(keyword, page, rowsPerPage, searchOptions));
// 	}, [dispatch, keyword, page, rowsPerPage, searchOptions]);

// 	useEffect(() => {
// 		if (success) {
// 			setAutocompleteOptions([
// 				...new Set(orders.map(order => order.user.name))
// 			]);
// 			dispatch({ type: LIST_ORDERS_CLEAR });
// 		}
// 	}, [success, orders, dispatch]);

// 	const handleChangeRowsPerPage = e => {
// 		setRowsPerPage(parseInt(e.target.value, 10));
// 		setPage(0);
// 	};

// 	const handleChangePage = (e, newPage) => {
// 		setPage(newPage);
// 	};

// 	const handleAutocompleteChange = (e, newValue) => {
// 		setAutocompleteValue(newValue);
// 		if (newValue) {
// 			dispatch(listOrdersAction(newValue, page, rowsPerPage, searchOptions));
// 		}
// 	};

// 	const handleAutocompleteInputChange = (e, newInputValue) => {
// 		setAutocompleteInputValue(newInputValue);
// 	};

// 	const handleSearchButton = () => {
// 		dispatch(
// 			listOrdersAction(autocompleteInputValue, page, rowsPerPage, searchOptions)
// 		);
// 	};

// 	const handleChangePaid = e => {
// 		const newSearchOptions = {
// 			...searchOptions,
// 			paid: e.target.value
// 		};
// 		setSearchOptions(newSearchOptions);
// 		dispatch(
// 			listOrdersAction(
// 				autocompleteInputValue,
// 				page,
// 				rowsPerPage,
// 				newSearchOptions
// 			)
// 		);
// 	};
// 	const handleChangeDelivered = e => {
// 		const newSearchOptions = {
// 			...searchOptions,
// 			delivered: e.target.value
// 		};
// 		setSearchOptions(newSearchOptions);
// 		dispatch(
// 			listOrdersAction(
// 				autocompleteInputValue,
// 				page,
// 				rowsPerPage,
// 				newSearchOptions
// 			)
// 		);
// 	};
// 	const handleChangeCancelled = e => {
// 		const newSearchOptions = {
// 			...searchOptions,
// 			cancelled: e.target.value
// 		};
// 		setSearchOptions(newSearchOptions);
// 		dispatch(
// 			listOrdersAction(
// 				autocompleteInputValue,
// 				page,
// 				rowsPerPage,
// 				newSearchOptions
// 			)
// 		);
// 	};

// 	return (
// 		<>
// 			<Message
// 				error={listOrdersError}
// 				alert={
// 					confirmDelivered.message ||
// 					confirmPaid.message ||
// 					confirmCancel.message
// 				}
// 				reset={
// 					listOrdersError
// 						? () => dispatch({ type: LIST_ORDERS_CLEAR })
// 						: confirmDelivered.message
// 						? () => setConfirmDelivered({ ...confirmDelivered, message: null })
// 						: confirmPaid.message
// 						? () => setConfirmPaid({ ...confirmPaid, message: null })
// 						: confirmCancel.message
// 						? () => setConfirmCancel({ ...confirmCancel, message: null })
// 						: null
// 				}
// 				ok={
// 					!confirmDelivered.message &&
// 					!confirmPaid.message &&
// 					!confirmCancel.message
// 				}
// 				func={
// 					listOrdersError
// 						? () => dispatch(listOrdersAction())
// 						: confirmDelivered.message
// 						? () => dispatch(setDeliveredAction(confirmDelivered.id))
// 						: confirmPaid.message
// 						? () => dispatch(setPaidAction(confirmPaid.id))
// 						: confirmCancel.message
// 						? () => dispatch(setCanceledAction(confirmCancel.id))
// 						: null
// 				}
// 				funcText={
// 					confirmDelivered.message ||
// 					confirmPaid.message ||
// 					confirmCancel.message
// 						? 'Confirm'
// 						: listOrdersError
// 						? 'Retry'
// 						: null
// 				}
// 			/>
// 			<Grid container className={classes.container}>
// 				<Grid item container xs justify='space-between' alignItems='center'>
// 					<Typography variant='h1' className={classes.title}>
// 						Orders
// 					</Typography>
// 				</Grid>
// 				<Grid item container direction='row' alignItems='center'>
// 					<Grid
// 						item
// 						xs
// 						container
// 						direction='row'
// 						spacing={2}
// 						className={classes.searchGrid}
// 					>
// 						<Autocomplete
// 							freeSolo
// 							className={classes.searchBox}
// 							id='search-orders-autocomplete'
// 							options={autocompleteOptions}
// 							value={autocompleteValue}
// 							onChange={handleAutocompleteChange}
// 							inputValue={autocompleteInputValue}
// 							onInputChange={handleAutocompleteInputChange}
// 							renderInput={params => (
// 								<TextField {...params} label='Search' variant='outlined' />
// 							)}
// 						/>
// 					</Grid>
// 					<IconButton
// 						className={classes.SearchButton}
// 						onClick={handleSearchButton}
// 					>
// 						<SearchIcon />
// 					</IconButton>
// 					{matchesXs && (
// 						<IconButton onClick={() => setOptionsOpen(!optionsOpen)}>
// 							{optionsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// 						</IconButton>
// 					)}
// 					<Grid item xs={!matchesMd ? true : 12}>
// 						<Collapse
// 							in={!matchesXs || optionsOpen}
// 							className={classes.collapse}
// 						>
// 							<Grid
// 								item
// 								container
// 								direction={matchesXs ? 'column' : 'row'}
// 								xs={!matchesMd}
// 								spacing={2}
// 							>
// 								<Grid item xs>
// 									<FormControl className={classes.select}>
// 										<InputLabel>Show Paid</InputLabel>
// 										<Select
// 											value={searchOptions.paid}
// 											onChange={handleChangePaid}
// 										>
// 											{['Any', 'Paid', 'UnPaid'].map(x => (
// 												<MenuItem key={x} value={x}>
// 													{x}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								</Grid>
// 								<Grid item xs>
// 									<FormControl className={classes.select}>
// 										<InputLabel>Show Delivered</InputLabel>
// 										<Select
// 											value={searchOptions.delivered}
// 											onChange={handleChangeDelivered}
// 										>
// 											{['Any', 'Delivered', 'UnDelivered'].map(x => (
// 												<MenuItem key={x} value={x}>
// 													{x}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								</Grid>
// 								<Grid item xs>
// 									<FormControl className={classes.select}>
// 										<InputLabel>Show Cancelled</InputLabel>
// 										<Select
// 											value={searchOptions.cancelled}
// 											onChange={handleChangeCancelled}
// 										>
// 											{['Any', 'Cancelled', 'UnCancelled'].map(x => (
// 												<MenuItem key={x} value={x}>
// 													{x}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								</Grid>
// 							</Grid>
// 						</Collapse>
// 					</Grid>
// 				</Grid>
// 				{listOrdersLoading ? (
// 					<Paper className={classes.loadingPaper}>
// 						<CircularProgress thickness={1} />
// 					</Paper>
// 				) : orders?.length === 0 ? (
// 					<TableContainer component={Paper}>
// 						<Table className={classes.table} aria-label='simple table'>
// 							<TableHead>
// 								<TableRow className={classes.headerRow}>
// 									{mediaMdUp && (
// 										<>
// 											<TableCell align='left'>User Name</TableCell>
// 											<TableCell align='left'>Date Ordered</TableCell>
// 										</>
// 									)}
// 									<TableCell align='left'>Order ID</TableCell>

// 									<TableCell align='center'>Paid</TableCell>
// 									<TableCell align='center'>Delivered</TableCell>
// 									<TableCell
// 										align='center'
// 										style={{ color: theme.palette.error.main }}
// 									>
// 										Cancel
// 									</TableCell>
// 								</TableRow>
// 							</TableHead>
// 							<TableBody>
// 								<TableRow>
// 									<TableCell component='th' scope='row'>
// 										No products found with those search parameters...
// 									</TableCell>
// 								</TableRow>
// 							</TableBody>
// 						</Table>
// 					</TableContainer>
// 				) : (
// 					<TableContainer component={Paper}>
// 						<Table className={classes.table} aria-label='simple table'>
// 							<TableHead>
// 								<TableRow className={classes.headerRow}>
// 									{mediaMdUp && (
// 										<>
// 											<TableCell align='left'>User Name</TableCell>
// 											<TableCell align='left'>Date Ordered</TableCell>
// 										</>
// 									)}
// 									<TableCell align='left'>Order ID</TableCell>

// 									<TableCell align='center'>Paid</TableCell>
// 									<TableCell align='center'>Delivered</TableCell>
// 									<TableCell
// 										align='center'
// 										style={{ color: theme.palette.error.main }}
// 									>
// 										Cancel
// 									</TableCell>
// 								</TableRow>
// 							</TableHead>
// 							<TableBody>
// 								{orders?.map(order => (
// 									<TableRow className={classes.tableRow} key={order._id}>
// 										{mediaMdUp && (
// 											<>
// 												<TableCell align='left'>{order.user.name}</TableCell>
// 												<TableCell align='left'>
// 													{order.createdAt.substring(0, 10)}
// 												</TableCell>
// 											</>
// 										)}

// 										<TableCell align='left'>
// 											<Link className={classes.link} to={`/order/${order._id}`}>
// 												{mediaXsDown
// 													? `${order._id.slice(0, 5)}...`
// 													: order._id}
// 											</Link>
// 										</TableCell>

// 										<TableCell align='center'>
// 											<Switch
// 												checked={order.isPaid}
// 												onChange={() =>
// 													setConfirmPaid({
// 														message: `Are you sure you want to mark this order as ${
// 															order.isPaid ? 'unpaid' : 'paid'
// 														}?`,
// 														id: order._id
// 													})
// 												}
// 												name='Paid'
// 												color='secondary'
// 												inputProps={{ 'aria-label': 'Paid Checkbox' }}
// 											/>
// 										</TableCell>
// 										<TableCell align='center'>
// 											<Switch
// 												checked={order.isDelivered}
// 												onChange={() =>
// 													setConfirmDelivered({
// 														message: `Are you sure you want to mark this order as ${
// 															order.isDelivered ? 'undelivered' : 'delivered'
// 														}?`,
// 														id: order._id
// 													})
// 												}
// 												color='secondary'
// 												name='Delivered'
// 												inputProps={{ 'aria-label': 'Delivered Checkbox' }}
// 											/>
// 										</TableCell>
// 										<TableCell
// 											align='center'
// 											style={{ color: theme.palette.error.main }}
// 										>
// 											{order.isCanceled ? (
// 												'Cancelled'
// 											) : (
// 												<IconButton
// 													onClick={() =>
// 														setConfirmCancel({
// 															message: `Are you sure you want to cancel order #${order._id}?`,
// 															id: order._id
// 														})
// 													}
// 													style={{ color: theme.palette.error.main }}
// 												>
// 													<Cancel />
// 												</IconButton>
// 											)}
// 										</TableCell>
// 									</TableRow>
// 								))}
// 							</TableBody>
// 						</Table>
// 						{orders && (
// 							<TablePagination
// 								rowsPerPageOptions={[5, 10, 25]}
// 								component='div'
// 								count={count}
// 								rowsPerPage={rowsPerPage}
// 								page={page}
// 								onChangePage={handleChangePage}
// 								onChangeRowsPerPage={handleChangeRowsPerPage}
// 							/>
// 						)}
// 					</TableContainer>
// 				)}
// 			</Grid>
// 		</>
// 	);
// };

// export default OrderListScreen;

import React from 'react';

const OrderListScreen = () => {
	return <div></div>;
};

export default OrderListScreen;
