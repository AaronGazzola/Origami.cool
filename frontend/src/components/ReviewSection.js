import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {
	Paper,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Box,
	useTheme,
	Divider
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import useStyles from 'styles/reviewSectionStyles';
import { useSelector, useDispatch } from 'react-redux';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MAXLENGTH,
	validate
} from 'utils/validators';
import { createReviewAction, updateReviewAction } from 'actions/productActions';
import { userListOrdersAction } from 'actions/orderActions';
import { ExpandMore } from '@material-ui/icons';

const labels = {
	0.5: 'Useless',
	1: 'Useless +',
	1.5: 'Poor',
	2: 'Poor +',
	2.5: 'Ok',
	3: 'Ok +',
	3.5: 'Good',
	4: 'Good +',
	4.5: 'Excellent',
	5: 'Excellent +'
};

const ReviewSection = ({ product }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const classes = useStyles();
	const { isAuth, user } = useSelector(state => state.userData);
	const { loading: createReviewLoading } = useSelector(
		state => state.createReview
	);
	const { loading: updateReviewLoading } = useSelector(
		state => state.updateReview
	);
	const { orders } = useSelector(state => state.userListOrders);
	const [hover, setHover] = useState(-1);
	const initialDisplayCount = 3;
	const [displayCount, setDisplayCount] = useState(initialDisplayCount);
	const [reviewEnabled, setReviewEnabled] = useState(false);
	const userReview = product.reviews.filter(
		review => review.user === user._id
	)[0];
	const [rating, setRating] = useState(userReview?.rating || 5);

	useEffect(() => {
		if (isAuth) dispatch(userListOrdersAction());
	}, [dispatch, isAuth]);

	useEffect(() => {
		if (
			isAuth &&
			orders?.find(
				order => !!order.orderItems.find(item => item.product === product._id)
			)
		) {
			setReviewEnabled(true);
		}
	}, [orders, product, isAuth]);

	const [reviewForm, setReviewForm] = useState({
		title: {
			value: userReview?.title || '',
			isValid: !!userReview,
			isTouched: false
		},
		comment: {
			value: userReview?.comment || '',
			isValid: !!userReview,
			isTouched: false
		},
		isChanged: false
	});
	const { title, comment, isChanged } = reviewForm;

	const changeHandler = (e, newRating) => {
		const isChanged =
			userReview && newRating
				? newRating !== userReview.rating
				: userReview
				? e.target.value !== userReview[e.target.id]
				: !!e.target.value;
		setReviewForm({
			...reviewForm,
			isChanged,
			[e.target.id]: {
				...reviewForm[e.target.id],
				value: e.target.value,
				isValid: validate(e.target.value, [
					VALIDATOR_REQUIRE(),
					VALIDATOR_MAXLENGTH(e.target.id === 'title' ? 75 : 300)
				])
			}
		});
	};

	const submitHandler = e => {
		e.preventDefault();
		const review = {
			rating,
			title: title.value,
			comment: comment.value
		};
		dispatch(
			userReview
				? updateReviewAction(product, review)
				: createReviewAction(product, review)
		);
	};

	const touchHandler = e => {
		setReviewForm({
			...reviewForm,
			[e.target.id]: { ...reviewForm[e.target.id], isTouched: true }
		});
	};

	const showMoreHandler = () => {
		setDisplayCount(displayCount + initialDisplayCount);
	};

	return (
		<>
			<Divider className={classes.divider} />
			<Typography variant='h4' className={classes.title}>
				Reviews:
			</Typography>
			{product.reviews.length === 0 ? (
				<Paper
					variant='outlined'
					style={{ padding: theme.spacing(2), width: '100%' }}
				>
					<Typography variant='h6' style={{ fontSize: '1.1rem' }}>
						No Reviews yet...
					</Typography>
				</Paper>
			) : (
				<>
					{product.reviews
						.sort(
							(a, b) =>
								moment(b.createdAt.substring(0, 19)).valueOf() -
								moment(a.createdAt.substring(0, 19)).valueOf()
						)
						.slice(0, displayCount)
						.map(review => (
							<Paper
								key={review._id}
								variant='outlined'
								className={classes.reviewPaper}
							>
								<Typography variant='h6'>{review.title}</Typography>
								<Rating readOnly value={review.rating} />

								<Typography variant='body1' className={classes.reviewComment}>
									{review.comment}
								</Typography>
								<Typography varaint='body2' className={classes.author}>
									By {review.name}
								</Typography>
								<Typography className={classes.date}>
									{moment(review.createdAt.substring(0, 10)).format(
										'Do MMM YYYY'
									)}
								</Typography>
							</Paper>
						))}
					{product?.reviews.length > initialDisplayCount &&
						product?.reviews.length > displayCount && (
							<Button
								variant='outlined'
								color='secondary'
								onClick={showMoreHandler}
								endIcon={<ExpandMore />}
							>
								Showmore
							</Button>
						)}
				</>
			)}

			<Paper
				className={
					reviewEnabled
						? classes.reviewFormPaper
						: clsx(classes.reviewFormPaper, classes.disabled)
				}
				elevation={2}
			>
				{!reviewEnabled && (
					<Paper className={classes.disabledMessage} variant='outlined'>
						<Typography>
							Please log in and make a purchase to leave a review
						</Typography>
					</Paper>
				)}
				<form className={classes.reviewForm} onSubmit={submitHandler}>
					<Typography variant='h5'>Write a Customer Review:</Typography>
					<Rating
						disabled={!reviewEnabled}
						name='user-rating'
						size='large'
						value={rating}
						precision={0.5}
						onChange={(e, newValue) => {
							setRating(newValue);
							changeHandler(e, newValue);
						}}
						onChangeActive={(e, newHover) => {
							setHover(newHover);
						}}
					/>
					{rating !== null && (
						<Box mt={1}>{labels[hover !== -1 ? hover : rating]}</Box>
					)}

					<TextField
						disabled={!reviewEnabled}
						id='title'
						label='Review Title'
						type='text'
						placeholder='Review Title'
						color='secondary'
						fullWidth
						onChange={changeHandler}
						onBlur={touchHandler}
						value={title.value}
						error={title.isTouched && !title.isValid}
						helperText={
							title.isTouched && !title.isValid
								? 'Please enter a title under 75 characters'
								: ' '
						}
						className={
							title.isTouched && !title.isValid
								? clsx(classes.input, classes.error)
								: classes.input
						}
					/>

					<TextField
						disabled={!reviewEnabled}
						id='comment'
						label='Review Comment'
						type='text'
						placeholder='Review Comment'
						color='secondary'
						variant='outlined'
						multiline
						fullWidth
						onChange={changeHandler}
						onBlur={touchHandler}
						value={comment.value}
						error={comment.isTouched && !comment.isValid}
						helperText={
							comment.isTouched && !comment.isValid
								? 'Please leave a comment under 300 characters'
								: ' '
						}
						className={
							comment.isTouched && !comment.isValid
								? clsx(classes.input, classes.error)
								: classes.input
						}
					/>
					<Button
						color='secondary'
						type='submit'
						variant='contained'
						fullWidth
						className={classes.button}
						disabled={
							!reviewEnabled || !title.isValid || !comment.isValid || !isChanged
						}
					>
						{createReviewLoading || updateReviewLoading ? (
							<CircularProgress
								size={25}
								style={{ color: theme.palette.background.default }}
							/>
						) : userReview ? (
							'Update Review'
						) : (
							'Submit Review'
						)}
					</Button>
				</form>
			</Paper>
		</>
	);
};

export default ReviewSection;
