import React, { useEffect, useState } from 'react';
import useProductForm from 'hooks/productFormHook';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	TextField,
	Typography,
	Paper,
	MobileStepper
} from '@material-ui/core';
import {
	ArrowBack as ArrowBackIcon,
	ImageSearch as ImageIcon,
	KeyboardArrowRight,
	KeyboardArrowLeft,
	Delete
} from '@material-ui/icons';
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
import Message from 'components/Message';
import { UPLOAD_IMAGE_CLEAR } from 'constants/productConstants';

const EditProductScreen = ({ match, history }) => {
	const slug = match.params.slug;
	const classes = useStyles();
	const adminClasses = useAdminStyles();
	const dispatch = useDispatch();

	const [activeStep, setActiveStep] = useState(0);
	const [confirmDelete, setConfirmDelete] = useState('');

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

	const {
		loading: uploadImageLoading,
		success: uploadImageSuccess,
		image: uploadedImage
	} = useSelector(state => state.uploadImage);

	const [formState, formDispatch] = useProductForm(slug && product);
	const {
		formIsValid,
		images,
		inputs: { name, description, price, countInStock }
	} = formState;

	useEffect(() => {
		if (slug && slug !== product?.slug) {
			dispatch(getProductAction(slug));
		}
	}, [dispatch, slug, product]);

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

	useEffect(() => {
		if (uploadImageSuccess) {
			formDispatch({ type: 'UPLOAD_IMAGE', payload: uploadedImage });
			dispatch({ type: UPLOAD_IMAGE_CLEAR });
		}
	}, [uploadImageSuccess, uploadedImage, dispatch, formDispatch]);

	const submitHandler = e => {
		e.preventDefault();
		const newProduct = {
			images,
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
		if (e.target.id.startsWith('imageLabel')) {
			formDispatch({
				type: 'IMAGE_LABEL',
				payload: e.target,
				index: activeStep
			});
		} else {
			formDispatch({
				type: 'CHANGE',
				payload: e.target,
				validators
			});
		}
	};

	const touchHandler = e => {
		formDispatch({ type: 'TOUCH', payload: e.target });
	};

	const uploadFileHandler = e => {
		const file = e.target.files[0];
		dispatch(uploadImageAction(file));
	};

	return (
		<>
			<Message
				confirm={confirmDelete}
				setConfirm={setConfirmDelete}
				onConfirm={() => {
					formDispatch({ type: 'DELETE_IMAGE', payload: activeStep });
					setActiveStep(0);
				}}
			/>
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
							<Button variant='outlined' className={adminClasses.imageButton}>
								<Grid container direction='column' alignItems='center'>
									{uploadImageLoading ? (
										<CircularProgress thickness={1} />
									) : (
										<>
											<ImageIcon fontSize='large' />
											<Typography>Upload Image</Typography>
										</>
									)}
								</Grid>
								<input
									type='file'
									id='imageUpload'
									name='userImage'
									className={adminClasses.imageInput}
									value=''
									onChange={uploadFileHandler}
								/>
							</Button>
							{images?.length > 0 && (
								<Paper variant='outlined' className={adminClasses.imagePaper}>
									<>
										{images?.length > 1 && (
											<MobileStepper
												className={adminClasses.stepper}
												steps={images?.length}
												position='static'
												variant='text'
												activeStep={activeStep}
												nextButton={
													<Button
														size='small'
														onClick={() =>
															setActiveStep(
																prevActiveStep => prevActiveStep + 1
															)
														}
														disabled={activeStep === images?.length - 1}
														endIcon={<KeyboardArrowRight />}
													>
														Next
													</Button>
												}
												backButton={
													<Button
														size='small'
														onClick={() =>
															setActiveStep(
																prevActiveStep => prevActiveStep - 1
															)
														}
														disabled={activeStep === 0}
														startIcon={<KeyboardArrowLeft />}
													>
														Back
													</Button>
												}
											/>
										)}

										<img
											className={adminClasses.image}
											src={images[activeStep]?.path}
											alt={
												images[activeStep]?.label ||
												`Uploaded image ${activeStep + 1}`
											}
										/>

										<TextField
											id={`imageLabel${activeStep}`}
											label='Image label'
											type='text'
											placeholder='Image label'
											fullWidth
											color='secondary'
											value={images[activeStep]?.label}
											onChange={changeHandler}
											className={adminClasses.subtitleInput}
											helperText='Image label is not required'
										/>
										<Button
											variant='outlined'
											startIcon={<Delete />}
											className={adminClasses.deleteButton}
											onClick={() => {
												setConfirmDelete(
													'Are you sure you want to delete this image?'
												);
											}}
										>
											Delete
										</Button>
									</>
								</Paper>
							)}
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
								disabled={!formIsValid || !images.length}
								type='submit'
								variant='contained'
								color='secondary'
								style={{ minWidth: 180 }}
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
		</>
	);
};

export default EditProductScreen;
