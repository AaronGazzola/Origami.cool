import React, { useState, useEffect } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
	Button,
	Grid,
	Paper,
	Typography,
	Divider,
	CircularProgress,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	useMediaQuery
} from '@material-ui/core';
import {
	Block,
	HourglassEmpty,
	BusinessCenter,
	People,
	ListAlt
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'actions/userActions';
import useStyles from 'styles/contentStyles';
import ProfileModal from 'components/ProfileModal';
import { userListOrdersAction } from 'actions/orderActions';

const ProfileScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const matchesXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
	const {
		user: { address },
		user
	} = useSelector(state => state.userData);

	const {
		error: userUpdateProfileError,
		success: userUpdateProfileSuccess
	} = useSelector(state => state.userUpdateProfile);

	const { orders, loading: userListOrdersLoading } = useSelector(
		state => state.userListOrders
	);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		dispatch(userListOrdersAction());
	}, [dispatch]);

	useEffect(() => {
		if (userUpdateProfileSuccess || userUpdateProfileError) {
			setModalIsOpen(false);
		}
	}, [userUpdateProfileSuccess, userUpdateProfileError]);

	return (
		<>
			<ProfileModal open={modalIsOpen} setOpen={setModalIsOpen} user={user} />
			<Grid container spacing={5} className={classes.container}>
				<Grid item xs={12} md={4}>
					<Typography variant='h1' className={classes.title}>
						Profile
					</Typography>
					<Paper className={classes.paper}>
						<Typography variant='h5' className={classes.subTitle}>
							{user.name}
						</Typography>
						<Typography className={classes.text}>{user.email}</Typography>
						<Divider className={classes.divider} />
						{address && (
							<Typography className={classes.address}>{user.name}</Typography>
						)}
						{address &&
							Object.keys(address).map(key =>
								address[key] && key === 'state' ? (
									<Typography key={key} className={classes.address}>
										{address.state}&nbsp;&nbsp;&nbsp;{address.postCode}
									</Typography>
								) : address[key] && key !== 'postCode' ? (
									<Typography className={classes.address} key={key}>
										{address[key]}
									</Typography>
								) : null
							)}
						<Grid
							container
							justify='flex-end'
							spacing={2}
							className={classes.buttonContainer}
						>
							<Grid item>
								<Button
									className={classes.button}
									onClick={() => setModalIsOpen(true)}
								>
									Edit Profile
								</Button>
							</Grid>
							<Grid item>
								<Button
									className={clsx(classes.button, classes.error)}
									onClick={() => dispatch(logoutAction())}
								>
									Log Out
								</Button>
							</Grid>
						</Grid>
					</Paper>
					{user?.isAdmin && (
						<>
							<Paper
								className={clsx(classes.paper, classes.adminPaper)}
								component={Grid}
								container
								direction='column'
								alignItems='center'
							>
								<Typography variant='h5' className={classes.subTitle}>
									Admin Menu
								</Typography>
								<Button
									className={classes.button}
									startIcon={<BusinessCenter />}
									color='primary'
									component={Link}
									to='/admin/products'
									fullWidth
								>
									Products
								</Button>
								<Button
									className={classes.button}
									startIcon={<People />}
									color='primary'
									component={Link}
									to='/admin/users'
									fullWidth
								>
									Users
								</Button>
								<Button
									className={classes.button}
									startIcon={<ListAlt />}
									color='primary'
									component={Link}
									to='/admin/orders'
									fullWidth
								>
									Orders
								</Button>
							</Paper>
						</>
					)}
				</Grid>
				<Grid item xs={12} md={8}>
					<Typography variant='h1' className={classes.title}>
						Orders
					</Typography>
					{userListOrdersLoading ? (
						<Paper className={classes.profilePaperLoading}>
							<CircularProgress />
						</Paper>
					) : orders?.length === 0 ? (
						<Paper className={classes.profilePaperLoading}>
							<Typography>No orders to display...</Typography>
						</Paper>
					) : (
						<TableContainer component={Paper}>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow className={classes.headerRow}>
										{matchesXs ? (
											<>
												<TableCell align='center'>Paid</TableCell>
												<TableCell align='center'>Sent</TableCell>
												<TableCell align='center'></TableCell>
											</>
										) : (
											<>
												<TableCell align='center'>#</TableCell>
												<TableCell align='center'>Order Date</TableCell>
												<TableCell align='center'>Total</TableCell>
												<TableCell align='center'>Paid</TableCell>
												<TableCell align='center'>Sent</TableCell>
												<TableCell align='center'></TableCell>
											</>
										)}
									</TableRow>
								</TableHead>
								<TableBody>
									{matchesXs
										? orders
												?.sort(
													(a, b) =>
														moment(b.createdAt.substring(0, 19)).valueOf() -
														moment(a.createdAt.substring(0, 19)).valueOf()
												)
												.map(order => (
													<TableRow
														key={order._id}
														className={classes.tableRow}
													>
														<TableCell align='center'>
															{order.isPaid ? (
																moment(order.paidAt.substring(0, 10)).format(
																	'Do MMM'
																)
															) : (
																<HourglassEmpty className={classes.faintIcon} />
															)}
														</TableCell>
														<TableCell align='center'>
															{order.isDelivered ? (
																moment(
																	order.deliveredAt.substring(0, 10)
																).format('Do MMM')
															) : order.isCanceled && !order.isDelivered ? (
																<Block className={classes.faintIcon} />
															) : (
																<HourglassEmpty className={classes.faintIcon} />
															)}
														</TableCell>
														<TableCell>
															<Button
																color='secondary'
																component={Link}
																to={`/order/${order._id}`}
																className={classes.link}
																style={{ fontWeight: 700 }}
															>
																Details
															</Button>
														</TableCell>
													</TableRow>
												))
										: orders
												?.sort(
													(a, b) =>
														moment(b.createdAt.substring(0, 19)).valueOf() -
														moment(a.createdAt.substring(0, 19)).valueOf()
												)
												.map((order, i) => (
													<TableRow
														key={order._id}
														className={classes.tableRow}
													>
														<TableCell align='center' scope='order'>
															{i + 1}
														</TableCell>
														<TableCell align='center'>
															{moment(order.createdAt.substring(0, 10)).format(
																'Do MMM'
															)}
														</TableCell>
														<TableCell align='center'>
															${order.totalPrice}
														</TableCell>
														<TableCell align='center'>
															{order.isPaid ? (
																moment(order.paidAt.substring(0, 10)).format(
																	'Do MMM'
																)
															) : (
																<HourglassEmpty className={classes.faintIcon} />
															)}
														</TableCell>
														<TableCell align='center'>
															{order.isDelivered ? (
																moment(
																	order.deliveredAt.substring(0, 10)
																).format('Do MMM')
															) : order.isCanceled && !order.isDelivered ? (
																<Block className={classes.faintIcon} />
															) : (
																<HourglassEmpty className={classes.faintIcon} />
															)}
														</TableCell>
														<TableCell>
															<Grid
																container
																direction='column'
																alignItems='center'
																justify='center'
															>
																<Button
																	color='secondary'
																	component={Link}
																	to={`/order/${order._id}`}
																	className={classes.link}
																	style={{ fontWeight: 700 }}
																>
																	Details
																</Button>
															</Grid>
														</TableCell>
													</TableRow>
												))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileScreen;
