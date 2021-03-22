import React, { useEffect, useState } from 'react';
import {
	CircularProgress,
	Grid,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Typography,
	useMediaQuery
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'styles/adminStyles';
import {
	getUsersAction,
	setAdminAction,
	setBanAction
} from 'actions/userActions';
import Message from 'components/Message';

const UserListScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();
	const mediaMdUp = useMediaQuery(theme.breakpoints.up('md'));

	const [confirmAdmin, setConfirmAdmin] = useState('');
	const [adminUser, setAdminUser] = useState(null);
	const [confirmBan, setConfirmBan] = useState('');
	const [banUser, setBanUser] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { loading: getUsersLoading, users } = useSelector(
		state => state.getUsers
	);

	const { loading: setAdminLoading, success: setAdminSuccess } = useSelector(
		state => state.setAdmin
	);

	const { loading: setBanLoading, success: setBanSuccess } = useSelector(
		state => state.setBan
	);

	useEffect(() => {
		if (setAdminSuccess || setBanSuccess) {
			dispatch(getUsersAction());
		}
	}, [dispatch, setAdminSuccess, setBanSuccess]);

	useEffect(() => {
		dispatch(getUsersAction());
	}, [dispatch]);

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
				confirm={confirmAdmin || confirmBan}
				setConfirm={confirmAdmin ? setConfirmAdmin : setConfirmBan}
				onConfirm={
					confirmAdmin
						? () => dispatch(setAdminAction(adminUser))
						: () => dispatch(setBanAction(banUser))
				}
			/>
			<Grid container className={classes.container}>
				<Grid item container xs justify='space-between' alignItems='center'>
					<Typography variant='h1' className={classes.title}>
						Users
					</Typography>
				</Grid>
				{getUsersLoading || setAdminLoading || setBanLoading ? (
					<Paper className={classes.loadingPaper}>
						<CircularProgress />
					</Paper>
				) : (
					<TableContainer component={Paper} className={classes.table}>
						<Table aria-label='simple table'>
							<TableHead>
								<TableRow className={classes.tableRow}>
									<TableCell align='left'>Name</TableCell>
									{mediaMdUp && (
										<>
											<TableCell align='left'>Email</TableCell>
											<TableCell align='left'>Address</TableCell>
										</>
									)}
									<TableCell align='center'>Admin</TableCell>
									<TableCell
										align='center'
										style={{ color: theme.palette.error.main }}
									>
										Ban User
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users?.map(user => (
									<TableRow key={user._id}>
										<TableCell component='th' scope='row'>
											{user.name}
										</TableCell>
										{mediaMdUp && (
											<>
												<TableCell align='left'>{user.email}</TableCell>
												<TableCell align='left'>
													{user.address &&
														Object.keys(user.address).map(key =>
															user.address[key] && key === 'state' ? (
																<Typography
																	key={key}
																	className={classes.address}
																>
																	{user.address.state}&nbsp;&nbsp;&nbsp;
																	{user.address.postCode}
																</Typography>
															) : user.address[key] && key !== 'postCode' ? (
																<Typography
																	className={classes.address}
																	key={key}
																>
																	{user.address[key]}
																</Typography>
															) : null
														)}
												</TableCell>
											</>
										)}
										<TableCell align='center'>
											<Switch
												checked={user.isAdmin}
												onChange={() => {
													setConfirmAdmin(
														user.isAdmin
															? `Are you sure you want to remove ${user.name}'s admin privileges?`
															: `Are you sure you want to provide ${user.name} with admin privileges?`
													);
													setAdminUser(user._id);
												}}
												name='Admin'
												color='secondary'
												inputProps={{ 'aria-label': 'Admin Checkbox' }}
											/>
										</TableCell>
										<TableCell align='center'>
											<Switch
												checked={user.isBanned}
												onChange={() => {
													setConfirmBan(
														user.isBanned
															? `Are you sure you want to allow ${user.name} full user access?`
															: `Are you sure you want to ban ${user.name}?`
													);
													setBanUser(user._id);
												}}
												className={classes.banSwitch}
												name='Banned'
												inputProps={{ 'aria-label': 'Ban Checkbox' }}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{users && (
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component='div'
								count={users?.length}
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

export default UserListScreen;
