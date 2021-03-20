// import React, { useEffect, useState } from 'react';
// import {
// 	CircularProgress,
// 	Grid,
// 	Paper,
// 	Switch,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableHead,
// 	TableRow,
// 	TablePagination,
// 	Typography,
// 	useMediaQuery,
// 	TextField,
// 	IconButton
// } from '@material-ui/core';
// import { Search as SearchIcon } from '@material-ui/icons';
// import { useTheme } from '@material-ui/core/styles';
// import { useSelector, useDispatch } from 'react-redux';
// import Message from 'components/Message';
// import styles from 'styles/userListStyles';
// import {
// 	logoutAction,
// 	getUsersAction,
// 	setAdminAction,
// 	setBanAction
// } from 'actions/userActions';
// import {
// 	GET_USERS_CLEAR,
// 	SET_ADMIN_CLEAR,
// 	SET_BAN_CLEAR
// } from 'constants/userConstants';
// import { Autocomplete } from '@material-ui/lab';

// const useStyles = styles;

// const UserListScreen = ({ history, match }) => {
// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 	}, []);
// 	const keyword = match.params.keyword;
// 	const classes = useStyles();
// 	const auth = useSelector(state => state.auth);
// 	const { user: authUser, isAuth } = auth;
// 	const dispatch = useDispatch();
// 	const theme = useTheme();

// 	const mediaMdUp = useMediaQuery(theme.breakpoints.up('md'));

// 	const [confirmChangeAdmin, setConfirmChangeAdmin] = useState({});
// 	const [confirmBan, setConfirmBan] = useState({});
// 	const [page, setPage] = useState(0);
// 	const [rowsPerPage, setRowsPerPage] = useState(5);
// 	const [autocompleteOptions, setAutocompleteOptions] = useState([]);
// 	const [autocompleteValue, setAutocompleteValue] = useState('');
// 	const [autocompleteInputValue, setAutocompleteInputValue] = useState('');

// 	const getUsers = useSelector(state => state.getUsers);
// 	const {
// 		loading: getUsersLoading,
// 		users,
// 		allUsers,
// 		error: getUsersError,
// 		count,
// 		success
// 	} = getUsers;

// 	const setAdmin = useSelector(state => state.setAdmin);
// 	const {
// 		loading: setAdminLoading,
// 		error: setAdminError,
// 		success: setAdminSuccess
// 	} = setAdmin;

// 	const setBan = useSelector(state => state.setBan);
// 	const { error: setBanError, success: setBanSuccess } = setBan;

// 	useEffect(() => {
// 		if (!isAuth || !authUser?.isValid || authUser.isBanned) {
// 			dispatch(logoutAction());
// 			history.push('/login');
// 		} else if (!authUser.isAdmin) {
// 			history.push('/');
// 		}
// 	}, [dispatch, authUser, history, isAuth]);

// 	useEffect(() => {
// 		dispatch(getUsersAction(keyword, page, rowsPerPage));
// 	}, [dispatch, page, rowsPerPage, keyword]);

// 	useEffect(() => {
// 		if (success) {
// 			setAutocompleteOptions([...new Set(allUsers.map(user => user.name))]);
// 			dispatch({ type: GET_USERS_CLEAR });
// 		}
// 	}, [success, allUsers, dispatch]);

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
// 			dispatch(getUsersAction(newValue, page, rowsPerPage));
// 		}
// 	};

// 	const handleAutocompleteInputChange = (e, newInputValue) => {
// 		setAutocompleteInputValue(newInputValue);
// 	};

// 	const handleSearchButton = () => {
// 		dispatch(getUsersAction(autocompleteInputValue, page, rowsPerPage));
// 	};

// 	return (
// 		<>
// 			<Message
// 				error={getUsersError || setAdminError || setBanError}
// 				alert={confirmChangeAdmin.message || confirmBan.message}
// 				success={setAdminSuccess || setBanSuccess}
// 				reset={
// 					getUsersError
// 						? () => dispatch({ type: GET_USERS_CLEAR })
// 						: confirmChangeAdmin.message
// 						? () =>
// 								setConfirmChangeAdmin({ ...confirmChangeAdmin, message: null })
// 						: confirmBan.message
// 						? () => setConfirmBan({ ...confirmBan, message: null })
// 						: setAdminError || setAdminSuccess
// 						? () => dispatch({ type: SET_ADMIN_CLEAR })
// 						: setBanError || setBanSuccess
// 						? () => dispatch({ type: SET_BAN_CLEAR })
// 						: null
// 				}
// 				ok={!confirmChangeAdmin.message && !confirmBan.message}
// 				funcText={
// 					confirmChangeAdmin.message || confirmBan.message
// 						? 'Confirm Change'
// 						: 'Retry'
// 				}
// 				func={
// 					getUsersError
// 						? () => dispatch(getUsersAction())
// 						: confirmChangeAdmin.message
// 						? () => dispatch(setAdminAction(confirmChangeAdmin.id))
// 						: confirmBan.message
// 						? () => dispatch(setBanAction(confirmBan.id))
// 						: null
// 				}
// 			/>
// 			<Grid container className={classes.container}>
// 				<Grid item container xs justify='space-between' alignItems='center'>
// 					<Typography variant='h1' className={classes.title}>
// 						Users
// 					</Typography>
// 				</Grid>
// 				<Grid
// 					container
// 					alignItems='center'
// 					item
// 					xs={12}
// 					className={classes.searchGrid}
// 				>
// 					<Autocomplete
// 						freeSolo
// 						className={classes.searchBox}
// 						id='search-products-autocomplete'
// 						options={autocompleteOptions}
// 						value={autocompleteValue}
// 						onChange={handleAutocompleteChange}
// 						inputValue={autocompleteInputValue}
// 						onInputChange={handleAutocompleteInputChange}
// 						renderInput={params => (
// 							<TextField {...params} label='Search' variant='outlined' />
// 						)}
// 					/>

// 					<IconButton
// 						className={classes.SearchButton}
// 						onClick={handleSearchButton}
// 					>
// 						<SearchIcon />
// 					</IconButton>
// 				</Grid>
// 				{getUsersLoading || setAdminLoading ? (
// 					<Paper className={classes.loadingPaper}>
// 						<CircularProgress thickness={1} />
// 					</Paper>
// 				) : (
// 					<TableContainer component={Paper}>
// 						<Table className={classes.table} aria-label='simple table'>
// 							<TableHead>
// 								<TableRow className={classes.tableRow}>
// 									<TableCell align='left'>Name</TableCell>
// 									{mediaMdUp && (
// 										<>
// 											<TableCell align='left'>Email</TableCell>
// 											<TableCell align='left'>Address</TableCell>
// 										</>
// 									)}
// 									<TableCell align='center'>Admin</TableCell>
// 									<TableCell
// 										align='center'
// 										style={{ color: theme.palette.error.main }}
// 									>
// 										Ban User
// 									</TableCell>
// 								</TableRow>
// 							</TableHead>
// 							<TableBody>
// 								{users?.map(user => (
// 									<TableRow key={user._id}>
// 										<TableCell component='th' scope='row'>
// 											{user.name}
// 										</TableCell>
// 										{mediaMdUp && (
// 											<>
// 												<TableCell align='left'>{user.email}</TableCell>
// 												<TableCell align='left'>
// 													{user.address?.split(',').map(x => (
// 														<Typography key={x}> {x}</Typography>
// 													))}
// 												</TableCell>
// 											</>
// 										)}
// 										<TableCell align='center'>
// 											<Switch
// 												checked={user.isAdmin}
// 												onChange={() =>
// 													setConfirmChangeAdmin({
// 														message: user.isAdmin
// 															? `Are you sure you want to remove ${user.name}'s admin privileges?`
// 															: `Are you sure you want to provide ${user.name} with admin privileges?`,
// 														id: user._id
// 													})
// 												}
// 												name='Admin'
// 												color='primary'
// 												inputProps={{ 'aria-label': 'Admin Checkbox' }}
// 											/>
// 										</TableCell>
// 										<TableCell align='center'>
// 											<Switch
// 												checked={user.isBanned}
// 												onChange={() =>
// 													setConfirmBan({
// 														message: user.isBanned
// 															? `Are you sure you want to allow ${user.name} full user access?`
// 															: `Are you sure you want to ban ${user.name}?`,
// 														id: user._id
// 													})
// 												}
// 												className={classes.banSwitch}
// 												name='Banned'
// 												inputProps={{ 'aria-label': 'Ban Checkbox' }}
// 											/>
// 										</TableCell>
// 									</TableRow>
// 								))}
// 							</TableBody>
// 						</Table>
// 						{users && (
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

// export default UserListScreen;

import React from 'react';

const UserListScreen = () => {
	return <div></div>;
};

export default UserListScreen;
