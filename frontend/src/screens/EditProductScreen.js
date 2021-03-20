import React, { useEffect } from 'react';
import useProductForm from 'hooks/productFormHook';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	TextField,
	Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'styles/formStyles';
import useAdminStyles from 'styles/adminStyles';
import {
	getProductAction,
	uploadImageAction,
	createProductAction,
	updateProductAction
} from 'actions/productActions';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from 'utils/validators';

const EditProductScreen = ({ match }) => {
	const classes = useStyles();
	const adminClasses = useAdminStyles();
	const dispatch = useDispatch();

	const {
		product,
		loading: getProductLoading,
		success: getProductSuccess,
		error: getProductError
	} = useSelector(state => state.getProduct);

	const {
		loading: createProductLoading,
		success: createProductSuccess,
		error: createProductError
	} = useSelector(state => state.createProduct);

	const {
		loading: updateProductLoading,
		success: updateProductSuccess,
		error: updateProductError
	} = useSelector(state => state.updateProduct);

	const [formState, formDispatch] = useProductForm(product);
	const {
		formIsValid,
		inputs: { name, description, price, images, countInStock }
	} = formState;
	console.log(formState);

	useEffect(() => {
		if (match.params.id !== product?._id) {
			// dispatch(getProductAction(match.params.id));
		}
	}, [dispatch, match]);

	const submitHandler = e => {
		e.preventDefault();
	};

	const changeHandler = (e, validators) => {
		formDispatch({
			type: 'CHANGE',
			payload: e.target,
			validators
		});
	};

	const touchHandler = e => {
		formDispatch({ type: 'TOUCH', payload: e.target });
	};

	return (
		<Grid container className={classes.container}>
			<Grid
				className={classes.titleGrid}
				container
				direction='column'
				alignItems='center'
			>
				<Typography className={classes.title} variant='h1'>
					{match.params.id ? 'Edit Product' : 'Add Product'}
				</Typography>
				{getProductLoading ? (
					<CircularProgress className={classes.loading} />
				) : (
					<form onSubmit={submitHandler} className={adminClasses.form}>
						<TextField
							multiline
							id='name'
							label='Name'
							type='text'
							placeholder='Name'
							fullWidth
							color='secondary'
							value={name.value}
							onChange={e =>
								changeHandler(e, [VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)])
							}
							className={
								name.isTouched && !name.isValid
									? clsx(adminClasses.input, classes.error)
									: name.isChanged
									? clsx(adminClasses.input, classes.changed)
									: adminClasses.input
							}
							onBlur={touchHandler}
							error={name.isTouched && !name.isValid}
							helperText={
								name.isTouched && !name.isValid
									? 'Please add a product name'
									: ' '
							}
						/>
						<TextField
							multiline
							rows={4}
							id='description'
							label='Description'
							type='text'
							placeholder='Description'
							fullWidth
							variant='outlined'
							color='secondary'
							value={description.value}
							onChange={e =>
								changeHandler(e, [
									VALIDATOR_REQUIRE(),
									VALIDATOR_MAXLENGTH(250)
								])
							}
							className={
								description.isTouched && !description.isValid
									? clsx(adminClasses.input, classes.error)
									: description.isChanged
									? clsx(adminClasses.input, classes.changed)
									: adminClasses.input
							}
							onBlur={touchHandler}
							error={description.isTouched && !description.isValid}
							helperText={
								description.isTouched && !description.isValid
									? 'Please add a product description'
									: ' '
							}
						/>
						<TextField
							id='price'
							label='Price'
							type='number'
							placeholder='Price'
							color='secondary'
							value={price.value}
							onChange={e => changeHandler(e, [VALIDATOR_REQUIRE()])}
							className={
								price.isTouched && !price.isValid
									? clsx(adminClasses.input, classes.error)
									: price.isChanged
									? clsx(adminClasses.input, classes.changed)
									: adminClasses.input
							}
							onBlur={touchHandler}
							error={price.isTouched && !price.isValid}
							helperText={
								price.isTouched && !price.isValid
									? 'Please specify a price'
									: ' '
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>$</InputAdornment>
								)
							}}
						/>
						<TextField
							id='countInStock'
							label='Count In Stock'
							type='number'
							placeholder='Count In Stock'
							color='secondary'
							value={countInStock.value}
							onChange={e => changeHandler(e, [VALIDATOR_REQUIRE()])}
							style={{ width: 150 }}
							className={
								countInStock.isTouched && !countInStock.isValid
									? clsx(adminClasses.input, classes.error)
									: countInStock.isChanged
									? clsx(adminClasses.input, classes.changed)
									: adminClasses.input
							}
							onBlur={touchHandler}
							error={countInStock.isTouched && !countInStock.isValid}
							helperText={
								countInStock.isTouched && !countInStock.isValid
									? 'Please include the amount of stock available'
									: ' '
							}
						/>

						<Button
							disabled={!formIsValid}
							type='submit'
							variant='contained'
							color='secondary'
							className={classes.button}
						>
							{createProductLoading || updateProductLoading ? (
								<CircularProgress style={{ color: '#fff' }} size={25} />
							) : match.params.id ? (
								'Update Product'
							) : (
								'Add Product'
							)}
						</Button>
					</form>
				)}
				<Button
					className={adminClasses.backButton}
					variant='outlined'
					component={Link}
					to='/admin/products'
					startIcon={<ArrowBackIcon />}
				>
					Back
				</Button>
			</Grid>
		</Grid>
	);
};

export default EditProductScreen;
