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

const EditProductScreen = ({ match, history }) => {
	const slug = match.params.slug;
	const classes = useStyles();
	const adminClasses = useAdminStyles();
	const dispatch = useDispatch();

	const {
		product,
		loading: getProductLoading,
		success: getProductSuccess
	} = useSelector(state => state.getProduct);

	const {
		loading: createProductLoading,
		redirect: createProductRedirect,
		product: createdProduct
	} = useSelector(state => state.createProduct);

	const {
		loading: updateProductLoading,
		redirect: updateProductRedirect,
		product: updatedProduct
	} = useSelector(state => state.updateProduct);

	const [formState, formDispatch] = useProductForm(product);
	const {
		formIsValid,
		inputs: { name, description, price, images, countInStock }
	} = formState;

	useEffect(() => {
		if (slug && slug !== product?.slug) {
			dispatch(getProductAction(slug));
		}
	}, [dispatch, slug]);

	useEffect(() => {
		if (getProductSuccess) {
			formDispatch({ type: 'RESET' });
		}
	}, [getProductSuccess, formDispatch]);

	useEffect(() => {
		if (createProductRedirect) {
			history.push(`/product/${createdProduct.slug}`);
		} else if (updateProductRedirect) {
			history.push(`/product/${updatedProduct.slug}`);
		}
	}, [
		createProductRedirect,
		updateProductRedirect,
		updatedProduct,
		createdProduct,
		history
	]);

	const submitHandler = e => {
		e.preventDefault();
		const newProduct = {
			// temporary image data
			images: [{ path: '/images/bull1.jpg', label: 'bull' }],
			name: name.value,
			description: description.value,
			price: price.value,
			countInStock: countInStock.value
		};
		if (slug) {
			dispatch(updateProductAction(newProduct, product?._id));
		} else {
			dispatch(createProductAction(newProduct));
		}
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
					{slug ? 'Edit Product' : 'Add Product'}
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
								changeHandler(e, [
									VALIDATOR_REQUIRE(),
									VALIDATOR_MAXLENGTH(100)
								])
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
									? 'Add a product name below 100 characters'
									: ' '
							}
						/>
						<TextField
							multiline
							rows={8}
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
									VALIDATOR_MAXLENGTH(1000)
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
									? 'Add a product description below 1000 characters'
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
								price.isTouched && !price.isValid ? 'Specify a price' : ' '
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
									? 'Specify the amount of stock available'
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
							) : slug ? (
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
