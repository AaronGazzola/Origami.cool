import React, { useState } from 'react';
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
import { createReviewAction } from 'actions/productActions';
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
	const { isAuth } = useSelector(state => state.userData);
	const { loading: createReviewLoading } = useSelector(
		state => state.createReview
	);
	const [rating, setRating] = useState(5);
	const [hover, setHover] = useState(-1);
	const initialDisplayCount = 3;
	const [displayCount, setDisplayCount] = useState(initialDisplayCount);
	const [reviewForm, setReviewForm] = useState({
		reviewTitle: {
			value: '',
			isValid: false,
			isTouched: false
		},
		reviewComment: {
			value: '',
			isValid: false,
			isTouched: false
		}
	});
	const { reviewTitle, reviewComment } = reviewForm;

	const changeHandler = e => {
		setReviewForm({
			...reviewForm,
			[e.target.id]: {
				...reviewForm[e.target.id],
				value: e.target.value,
				isValid: validate(e.target.value, [
					VALIDATOR_REQUIRE(),
					VALIDATOR_MAXLENGTH(e.target.id === 'reviewTitle' ? 75 : 300)
				])
			}
		});
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(
			createReviewAction(product, {
				rating,
				title: reviewTitle.value,
				comment: reviewComment.value
			})
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
					isAuth
						? classes.reviewFormPaper
						: clsx(classes.reviewFormPaper, classes.disabled)
				}
				elevation={5}
			>
				{!isAuth && (
					<Paper className={classes.disabledMessage} variant='outlined'>
						<Typography>
							Please log in and make a purchase to leave a review
						</Typography>
					</Paper>
				)}
				<form className={classes.reviewForm} onSubmit={submitHandler}>
					<Typography variant='h5'>Write a Customer Review:</Typography>
					<Rating
						disabled={!isAuth}
						name='user-rating'
						size='large'
						value={rating}
						precision={0.5}
						onChange={(event, newValue) => {
							setRating(newValue);
						}}
						onChangeActive={(event, newHover) => {
							setHover(newHover);
						}}
					/>
					{rating !== null && (
						<Box mt={1}>{labels[hover !== -1 ? hover : rating]}</Box>
					)}

					<TextField
						disabled={!isAuth}
						id='reviewTitle'
						label='Review Title'
						type='text'
						placeholder='Review Title'
						color='secondary'
						fullWidth
						onChange={changeHandler}
						onBlur={touchHandler}
						value={reviewTitle.value}
						error={reviewTitle.isTouched && !reviewTitle.isValid}
						helperText={
							reviewTitle.isTouched && !reviewTitle.isValid
								? 'Please enter a title under 75 characters'
								: ' '
						}
						className={
							reviewTitle.isTouched && !reviewTitle.isValid
								? clsx(classes.input, classes.error)
								: classes.input
						}
					/>

					<TextField
						disabled={!isAuth}
						id='reviewComment'
						label='Review Comment'
						type='text'
						placeholder='Review Comment'
						color='secondary'
						variant='outlined'
						multiline
						fullWidth
						onChange={changeHandler}
						onBlur={touchHandler}
						value={reviewComment.value}
						error={reviewComment.isTouched && !reviewComment.isValid}
						helperText={
							reviewComment.isTouched && !reviewComment.isValid
								? 'Please leave a comment under 300 characters'
								: ' '
						}
						className={
							reviewComment.isTouched && !reviewComment.isValid
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
						disabled={!isAuth || !reviewTitle.isValid || !reviewComment.isValid}
					>
						{createReviewLoading ? (
							<CircularProgress
								size={25}
								style={{ color: theme.palette.background.default }}
							/>
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
