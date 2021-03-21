import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
	Grid,
	TableContainer,
	Paper,
	Table,
	TableCell,
	TableHead,
	TableRow,
	TableBody,
	IconButton,
	Typography,
	Button,
	CircularProgress,
	Select,
	MenuItem,
	TablePagination,
	useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
	Edit as EditIcon,
	AddCircleOutline as AddCircleOutlineIcon,
	Delete as DeleteIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'styles/adminStyles';
import {
	getProductsAction,
	deleteProductAction,
	setProductStockAction
} from 'actions/productActions';
import Message from 'components/Message';

const ProductListScreen = ({ history, match }) => {
	const theme = useTheme();
	const classes = useStyles();
	const dispatch = useDispatch();
	const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

	const [confirmDelete, setConfirmDelete] = useState('');
	const [productToDelete, setProductToDelete] = useState('');
	const [page, setPage] = useState(match.params.pageNumber || 0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { loading: getProductsLoading, products } = useSelector(
		state => state.getProducts
	);
	const {
		loading: deleteProductLoading,
		success: deleteProductSuccess
	} = useSelector(state => state.deleteProduct);
	const {
		loading: setProductStockLoading,
		success: setProductStockSuccess
	} = useSelector(state => state.setProductStock);

	useEffect(() => {
		dispatch(getProductsAction());
	}, [dispatch]);

	useEffect(() => {
		if (deleteProductSuccess || setProductStockSuccess) {
			dispatch(getProductsAction());
		}
	}, [dispatch, deleteProductSuccess, setProductStockSuccess]);

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const setCountInStockHandler = (e, product) => {
		dispatch(setProductStockAction(product._id, Number(e.target.value)));
	};

	return (
		<>
			<Message
				confirm={confirmDelete}
				setConfirm={setConfirmDelete}
				onConfirm={() => {
					dispatch(deleteProductAction(productToDelete));
					setProductToDelete(null);
				}}
			/>
			<Grid container className={classes.container}>
				<Grid
					item
					container
					xs
					justify='space-between'
					alignItems='center'
					direction={!matchesXs ? 'row' : 'column'}
				>
					<Typography variant='h1' className={classes.title}>
						Products
					</Typography>
					<Button
						className={classes.button}
						color='secondary'
						variant='contained'
						startIcon={<AddCircleOutlineIcon />}
						component={Link}
						to='/admin/product'
					>
						Add Product
					</Button>
				</Grid>

				{getProductsLoading ||
				deleteProductLoading ||
				setProductStockLoading ? (
					<Paper className={classes.loadingPaper}>
						<CircularProgress />
					</Paper>
				) : products?.length === 0 ? (
					<TableContainer component={Paper} className={classes.table}>
						<Table aria-label='simple table'>
							<TableHead>
								<TableRow className={classes.tableRow}>
									<TableCell align='center'>Name</TableCell>
									{!matchesXs && (
										<>
											<TableCell align='center'>Price</TableCell>
											<TableCell align='center'>Stock</TableCell>
										</>
									)}
									<TableCell align='center'></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell component='th' scope='row'>
										No products yet, click 'Add Product' to create one
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<TableContainer component={Paper} className={classes.table}>
						<Table aria-label='simple table'>
							<TableHead>
								<TableRow className={classes.tableRow}>
									<TableCell align='left'>Name</TableCell>
									{!matchesXs && (
										<>
											<TableCell align='center'>Price</TableCell>
											<TableCell align='center'>Stock</TableCell>
										</>
									)}
									<TableCell align='center'></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products
									?.sort(
										(a, b) =>
											moment(b.createdAt.substring(0, 19)).valueOf() -
											moment(a.createdAt.substring(0, 19)).valueOf()
									)
									.map(product => (
										<TableRow key={product._id}>
											<TableCell align='left'>
												<Typography
													component={Link}
													to={`/product/${product.slug}`}
													className={classes.link}
												>
													{product.name}
												</Typography>
											</TableCell>
											{!matchesXs && (
												<>
													<TableCell align='center'>${product.price}</TableCell>
													<TableCell align='center'>
														<Select
															labelId='item-count-select-label'
															id={`${product._id}-count-select`}
															value={product.countInStock}
															onChange={e => setCountInStockHandler(e, product)}
														>
															{[...Array(1000).keys()].map(x => (
																<MenuItem key={x + 1} value={x + 1}>
																	{x + 1}
																</MenuItem>
															))}
														</Select>
													</TableCell>
												</>
											)}

											<TableCell align='right'>
												<Grid
													container
													justify={!matchesXs ? 'flex-end' : 'flex-start'}
													direction={!matchesXs ? 'row' : 'column'}
													style={{ flexWrap: 'nowrap' }}
												>
													<IconButton
														component={Link}
														to={`/admin/product/${product.slug}`}
														color='secondary'
													>
														<EditIcon />
													</IconButton>
													<IconButton
														className={classes.error}
														onClick={() => {
															setConfirmDelete(
																`Are you sure you want to delete ${product.name}?`
															);
															setProductToDelete(product._id);
														}}
													>
														<DeleteIcon />
													</IconButton>
												</Grid>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
						{products && (
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component='div'
								count={products?.length}
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

export default ProductListScreen;
