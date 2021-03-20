// import React, { useEffect, useReducer } from 'react';
// import { Link } from 'react-router-dom';
// import { produce } from 'immer';
// import clsx from 'clsx';
// import {
// 	Button,
// 	CircularProgress,
// 	Grid,
// 	InputAdornment,
// 	MenuItem,
// 	TextField,
// 	Typography
// } from '@material-ui/core';
// import {
// 	ImageSearchRounded as ImageIcon,
// 	ArrowBack as ArrowBackIcon
// } from '@material-ui/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import Message from 'components/Message';
// import styles from 'styles/editProductStyles';
// import { logoutAction } from 'actions/userActions';
// import {
// 	getProductAction,
// 	newProductAction,
// 	uploadImageAction,
// 	publishProductAction
// } from 'actions/productActions';
// import {
// 	NEW_PRODUCT_CLEAR,
// 	GET_PRODUCT_CLEAR,
// 	UPLOAD_IMAGE_CLEAR,
// 	PUBLISH_PRODUCT_CLEAR
// } from 'constants/productConstants';

// const useStyles = styles;

// const initialFormState = {
// 	inputs: {
// 		name: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		image: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		make: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		model: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		year: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		category: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		description: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		price: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		},
// 		countInStock: {
// 			value: '',
// 			isValid: false,
// 			isTouched: false,
// 			isChanged: false
// 		}
// 	},
// 	formIsValid: false,
// 	formIsChanged: false
// };

// const init = product => {
// 	return {
// 		...initialFormState,
// 		formIsValid: !!product.name,
// 		inputs: {
// 			...initialFormState.inputs,
// 			name: {
// 				...initialFormState.inputs.name,
// 				value: product?.name,
// 				isValid: !!product?.name
// 			},
// 			image: {
// 				...initialFormState.inputs.image,
// 				value: product?.image,
// 				isValid: !!product?.image
// 			},
// 			make: {
// 				...initialFormState.inputs.make,
// 				value: product?.make,
// 				isValid: !!product?.make
// 			},
// 			model: {
// 				...initialFormState.inputs.model,
// 				value: product?.model,
// 				isValid: !!product?.model
// 			},
// 			year: {
// 				...initialFormState.inputs.year,
// 				value: product?.year,
// 				isValid: !!product?.year
// 			},
// 			category: {
// 				...initialFormState.inputs.category,
// 				value: product?.category,
// 				isValid: !!product?.category
// 			},
// 			description: {
// 				...initialFormState.inputs.description,
// 				value: product?.description,
// 				isValid: !!product?.description
// 			},
// 			price: {
// 				...initialFormState.inputs.price,
// 				value: product?.price,
// 				isValid: !!product?.price
// 			},
// 			countInStock: {
// 				...initialFormState.inputs.countInStock,
// 				value: product?.countInStock,
// 				isValid: !!product?.countInStock
// 			}
// 		}
// 	};
// };

// const formReducer = (formState, action) =>
// 	produce(formState, draft => {
// 		switch (action.type) {
// 			case 'CHANGE':
// 				let formIsValid = true;
// 				let formIsChanged = false;
// 				const inputIsChanged =
// 					action.payload.value !== action.product[action.payload.id];
// 				let inputIsValid = !!action.payload.value;
// 				if (action.payload.id === 'price') {
// 					inputIsValid = inputIsValid && !isNaN(action.payload.value);
// 				}
// 				for (const input in formState.inputs) {
// 					if (input === action.payload.id) {
// 						formIsValid = formIsValid && inputIsValid;
// 						formIsChanged = formIsChanged || inputIsChanged;
// 					} else {
// 						formIsValid = formIsValid && formState.inputs[input].isValid;
// 						formIsChanged = formIsChanged || formState.inputs[input].isChanged;
// 					}
// 				}
// 				draft.formIsValid = formIsValid;
// 				draft.formIsChanged = formIsChanged;
// 				draft.inputs[action.payload.id].isValid = inputIsValid;
// 				draft.inputs[action.payload.id].isChanged = inputIsChanged;
// 				draft.inputs[action.payload.id].value = action.payload.value;
// 				break;
// 			case 'TOUCH':
// 				draft.inputs[action.payload.id].isTouched = true;
// 				break;
// 			case 'RESET':
// 				return init(action.payload);
// 			default:
// 				break;
// 		}
// 	});

// const EditProductScreen = ({ history, match }) => {
// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 	}, []);
// 	const classes = useStyles();

// 	const auth = useSelector(state => state.auth);
// 	const { user: authUser, isAuth } = auth;

// 	const getProduct = useSelector(state => state.getProduct);
// 	const {
// 		product,
// 		loading: getProductLoading,
// 		success: getProductSuccess,
// 		error: getProductError
// 	} = getProduct;

// 	const newProductSelector = useSelector(state => state.newProduct);
// 	const {
// 		newProduct,
// 		loading: newProductLoading,
// 		error: newProductError,
// 		success: newProductSuccess
// 	} = newProductSelector;

// 	const uploadImage = useSelector(state => state.uploadImage);
// 	const {
// 		image: uploadedImage,
// 		loading: uploadImageLoading,
// 		success: uploadImageSuccess,
// 		error: uploadImageError
// 	} = uploadImage;

// 	const publishProduct = useSelector(state => state.publishProduct);
// 	const {
// 		loading: publishProductLoading,
// 		success: publishProductSuccess,
// 		error: publishProductError,
// 		product: publishedProduct
// 	} = publishProduct;

// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		if (!isAuth || !authUser?.isValid || authUser.isBanned) {
// 			dispatch(logoutAction());
// 			history.push('/login');
// 		} else if (!authUser.isAdmin) {
// 			history.push('/');
// 		} else {
// 			if (newProductSuccess) {
// 				formDispatch({ type: 'RESET', payload: newProduct });
// 				dispatch({ type: NEW_PRODUCT_CLEAR });
// 			} else if (getProductSuccess) {
// 				formDispatch({ type: 'RESET', payload: product });
// 				dispatch({ type: GET_PRODUCT_CLEAR });
// 			}
// 			if (uploadImageSuccess) {
// 				formDispatch({
// 					type: 'CHANGE',
// 					payload: { id: 'image', value: uploadedImage },
// 					product: match.params.id ? product : newProduct
// 				});
// 				dispatch({ type: UPLOAD_IMAGE_CLEAR });
// 			}
// 			if (publishProductSuccess) {
// 				dispatch({ type: PUBLISH_PRODUCT_CLEAR });
// 				history.push(`/product/${publishedProduct._id}`);
// 			}
// 		}
// 	}, [
// 		dispatch,
// 		match,
// 		isAuth,
// 		authUser,
// 		history,
// 		newProduct,
// 		product,
// 		getProductSuccess,
// 		newProductSuccess,
// 		uploadImageSuccess,
// 		publishProductSuccess,
// 		publishedProduct,
// 		uploadedImage
// 	]);

// 	const [formState, formDispatch] = useReducer(formReducer, initialFormState);
// 	const {
// 		inputs: {
// 			name,
// 			image,
// 			price,
// 			make,
// 			model,
// 			year,
// 			category,
// 			description,
// 			countInStock
// 		},
// 		formIsValid,
// 		formIsChanged
// 	} = formState;

// 	useEffect(() => {
// 		if (match.params.id) {
// 			dispatch(getProductAction(match.params.id));
// 		} else {
// 			dispatch(newProductAction());
// 		}
// 	}, [dispatch, match]);

// 	const submitHandler = e => {
// 		e.preventDefault();

// 		dispatch(
// 			publishProductAction(
// 				{
// 					name: name.value,
// 					image: image.value,
// 					make: make.value,
// 					model: model.value,
// 					year: year.value,
// 					category: category.value,
// 					description: description.value,
// 					price: price.value,
// 					countInStock: countInStock.value
// 				},
// 				match.params.id ? product._id : newProduct._id
// 			)
// 		);
// 	};

// 	const changeHandler = e => {
// 		formDispatch({
// 			type: 'CHANGE',
// 			payload: e.target,
// 			product: match.params.id ? product : newProduct
// 		});
// 	};

// 	const touchHandler = e => {
// 		if (!formState.inputs[e.target.id].isTouched) {
// 			formDispatch({ type: 'TOUCH', payload: e.target });
// 		}
// 	};

// 	const uploadFileHandler = e => {
// 		const file = e.target.files[0];
// 		if (match.params.id) {
// 			dispatch(uploadImageAction(file, product._id));
// 		} else {
// 			dispatch(uploadImageAction(file, newProduct._id));
// 		}
// 	};

// 	return (
// 		<>
// 			<Message
// 				error={
// 					getProductError ||
// 					newProductError ||
// 					uploadImageError ||
// 					publishProductError
// 				}
// 				reset={
// 					getProductError
// 						? () => dispatch({ type: GET_PRODUCT_CLEAR })
// 						: newProductError
// 						? () => dispatch({ type: NEW_PRODUCT_CLEAR })
// 						: uploadImageError
// 						? () => dispatch({ type: UPLOAD_IMAGE_CLEAR })
// 						: publishProductError
// 						? () => dispatch({ type: PUBLISH_PRODUCT_CLEAR })
// 						: null
// 				}
// 			/>
// 			<Grid container className={classes.container}>
// 				<Grid
// 					className={classes.titleGrid}
// 					container
// 					direction='column'
// 					alignItems='center'
// 				>
// 					<Typography className={classes.title} variant='h1'>
// 						{match.params.id ? 'Edit Product' : 'Add Product'}
// 					</Typography>
// 					<Button
// 						className={classes.backButton}
// 						variant='outlined'
// 						component={Link}
// 						to='/admin/products'
// 						startIcon={<ArrowBackIcon />}
// 					>
// 						Back
// 					</Button>
// 					{getProductLoading || newProductLoading ? (
// 						<CircularProgress className={classes.loading} thickness={1} />
// 					) : (
// 						<form onSubmit={submitHandler} className={classes.form}>
// 							<Button variant='outlined' className={classes.imageButton}>
// 								<Grid container direction='column' alignItems='center'>
// 									{uploadImageLoading ? (
// 										<CircularProgress thickness={1} />
// 									) : image.value ? (
// 										<>
// 											<img
// 												className={classes.image}
// 												src={image.value}
// 												alt='product'
// 											/>
// 											<Typography>Change Image</Typography>
// 										</>
// 									) : (
// 										<>
// 											<ImageIcon fontSize='large' />
// 											<Typography>Upload Image</Typography>
// 										</>
// 									)}
// 								</Grid>
// 								<input
// 									type='file'
// 									id='imageUpload'
// 									name='userImage'
// 									className={classes.imageInput}
// 									onChange={uploadFileHandler}
// 								/>
// 							</Button>
// 							<TextField
// 								multiline
// 								id='name'
// 								label='Name'
// 								type='text'
// 								placeholder='Name'
// 								fullWidth
// 								color='secondary'
// 								value={name.value}
// 								onChange={changeHandler}
// 								className={
// 									name.isTouched && !name.isValid
// 										? clsx(classes.input, classes.error)
// 										: name.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={name.isTouched && !name.isValid}
// 								helperText={
// 									name.isTouched && !name.isValid
// 										? 'Please add a product name'
// 										: ' '
// 								}
// 							/>
// 							<TextField
// 								multiline
// 								id='make'
// 								label='Make'
// 								type='text'
// 								placeholder='Make'
// 								fullWidth
// 								color='secondary'
// 								value={make.value}
// 								onChange={changeHandler}
// 								className={
// 									make.isTouched && !make.isValid
// 										? clsx(classes.input, classes.error)
// 										: make.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={make.isTouched && !make.isValid}
// 								helperText={
// 									make.isTouched && !make.isValid
// 										? 'Please include the make of vehicle'
// 										: ' '
// 								}
// 							/>
// 							<TextField
// 								multiline
// 								id='model'
// 								label='Model'
// 								type='text'
// 								placeholder='Model'
// 								fullWidth
// 								color='secondary'
// 								value={model.value}
// 								onChange={changeHandler}
// 								className={
// 									model.isTouched && !model.isValid
// 										? clsx(classes.input, classes.error)
// 										: model.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={model.isTouched && !model.isValid}
// 								helperText={
// 									model.isTouched && !model.isValid
// 										? 'Please include the vehicle model'
// 										: ' '
// 								}
// 							/>
// 							<TextField
// 								multiline
// 								id='year'
// 								label='Year'
// 								type='text'
// 								placeholder='Year'
// 								fullWidth
// 								color='secondary'
// 								value={year.value}
// 								onChange={changeHandler}
// 								className={
// 									year.isTouched && !year.isValid
// 										? clsx(classes.input, classes.error)
// 										: year.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={year.isTouched && !year.isValid}
// 								helperText={
// 									year.isTouched && !year.isValid
// 										? 'Please include the compatible year range'
// 										: ' '
// 								}
// 							/>
// 							<TextField
// 								multiline
// 								id='category'
// 								label='Category'
// 								type='text'
// 								placeholder='Category'
// 								fullWidth
// 								color='secondary'
// 								value={category.value}
// 								onChange={changeHandler}
// 								className={
// 									category.isTouched && !category.isValid
// 										? clsx(classes.input, classes.error)
// 										: category.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={category.isTouched && !category.isValid}
// 								helperText={
// 									category.isTouched && !category.isValid
// 										? 'Please add a product category'
// 										: ' '
// 								}
// 							/>
// 							<TextField
// 								multiline
// 								id='description'
// 								label='Description'
// 								type='text'
// 								placeholder='Description'
// 								fullWidth
// 								variant='outlined'
// 								color='secondary'
// 								value={description.value}
// 								onChange={changeHandler}
// 								className={
// 									description.isTouched && !description.isValid
// 										? clsx(classes.input, classes.error)
// 										: description.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={description.isTouched && !description.isValid}
// 								helperText={
// 									description.isTouched && !description.isValid
// 										? 'Please add a product description'
// 										: ' '
// 								}
// 							/>
// 							<TextField
// 								multiline
// 								id='price'
// 								label='Price'
// 								type='number'
// 								placeholder='Price'
// 								color='secondary'
// 								value={price.value}
// 								onChange={changeHandler}
// 								className={
// 									price.isTouched && !price.isValid
// 										? clsx(classes.input, classes.error)
// 										: price.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={touchHandler}
// 								error={price.isTouched && !price.isValid}
// 								helperText={
// 									price.isTouched && !price.isValid
// 										? 'Please specify a price'
// 										: ' '
// 								}
// 								InputProps={{
// 									startAdornment: (
// 										<InputAdornment position='start'>$</InputAdornment>
// 									)
// 								}}
// 							/>
// 							<TextField
// 								select
// 								id='countInStock'
// 								label='Count In Stock'
// 								type='text'
// 								placeholder='Count In Stock'
// 								color='secondary'
// 								value={countInStock.value}
// 								onChange={e =>
// 									changeHandler({
// 										...e,
// 										target: { ...e.target, id: 'countInStock' }
// 									})
// 								}
// 								style={{ width: 150 }}
// 								className={
// 									countInStock.isTouched && !countInStock.isValid
// 										? clsx(classes.input, classes.error)
// 										: countInStock.isChanged
// 										? clsx(classes.input, classes.changed)
// 										: classes.input
// 								}
// 								onBlur={e =>
// 									touchHandler({
// 										...e,
// 										target: { ...e.target, id: 'countInStock' }
// 									})
// 								}
// 								error={countInStock.isTouched && !countInStock.isValid}
// 								helperText={
// 									countInStock.isTouched && !countInStock.isValid
// 										? 'Please include the amount of stock available'
// 										: ' '
// 								}
// 							>
// 								{[...Array(100).keys()].map(x => (
// 									<MenuItem key={x} value={x}>
// 										{x}
// 									</MenuItem>
// 								))}
// 							</TextField>
// 							<Button
// 								disabled={
// 									match.params.id
// 										? !formIsValid || !formIsChanged
// 										: !formIsValid
// 								}
// 								type='submit'
// 								variant='contained'
// 								color='secondary'
// 								className={classes.button}
// 							>
// 								{publishProductLoading ? (
// 									<CircularProgress style={{ color: '#fff' }} size={25} />
// 								) : match.params.id ? (
// 									'Update Product'
// 								) : (
// 									'Add Product'
// 								)}
// 							</Button>
// 						</form>
// 					)}
// 				</Grid>
// 			</Grid>
// 		</>
// 	);
// };

// export default EditProductScreen;

import React from 'react';

const EditProductScreen = () => {
	return <div></div>;
};

export default EditProductScreen;
