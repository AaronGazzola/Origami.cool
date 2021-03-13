import React, { useState } from 'react';
import clsx from 'clsx';
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Box,
	useTheme
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import useStyles from 'styles/reviewSectionStyles';
import { useSelector } from 'react-redux';
import { VALIDATOR_REQUIRE, validate } from 'utils/validators';

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

const ReviewSection = ({ reviews }) => {
	const theme = useTheme();
	const classes = useStyles();
	const { isAuth } = useSelector(state => state.userData);
	const [rating, setRating] = useState(5);
	const [hover, setHover] = useState(-1);
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
	const [createReviewLoading, setCreateReviewLoading] = useState(false);
	const { reviewTitle, reviewComment } = reviewForm;

	const changeHandler = e => {
		setReviewForm({
			...reviewForm,
			[e.target.id]: {
				...reviewForm[e.target.id],
				value: e.target.value,
				isValid: validate(e.target.value, [VALIDATOR_REQUIRE()])
			}
		});
	};

	const submitHandler = e => {
		e.preventDefault();
		// dispatch(
		// 	createReviewAction(
		// 		product._id,
		// 		rating,
		// 		reviewTitle.value,
		// 		reviewComment.value
		// 	)
		// );
	};

	const touchHandler = e => {
		setReviewForm({
			...reviewForm,
			[e.target.id]: { ...reviewForm[e.target.id], isTouched: true }
		});
	};
	return (
		<>
			<Typography
				variant='h4'
				style={{
					textAlign: 'center',
					marginBottom: theme.spacing(2),
					marginTop: theme.spacing(3)
				}}
			>
				Reviews
			</Typography>
			<>
				{reviews?.length === 0 ? (
					<Paper
						variant='outlined'
						style={{ padding: theme.spacing(2), width: '100%' }}
					>
						<Typography variant='h6' style={{ fontSize: '1.1rem' }}>
							No Reviews yet...
						</Typography>
					</Paper>
				) : (
					reviews?.map(review => (
						<Paper
							key={review._id}
							variant='outlined'
							className={classes.reviewPaper}
						>
							<Typography variant='h6'>{review.title}</Typography>
							<Grid
								container
								alignItems='center'
								style={{ marginBottom: theme.spacing(1) }}
							>
								<Rating readOnly name={review.name} value={review.rating} />
								<Typography variant='body1' className={classes.reviewName}>
									{review.name}
									<span>{review.createdAt.substring(0, 10)}</span>
								</Typography>
							</Grid>
							<Typography variant='body1' className={classes.reviewComment}>
								{review.comment}
							</Typography>
						</Paper>
					))
				)}
			</>
			{isAuth ? (
				<Paper className={classes.reviewFormPaper} elevation={5}>
					<form className={classes.reviewForm} onSubmit={submitHandler}>
						<Typography
							variant='h5'
							style={{
								textAlign: 'center',
								marginBottom: theme.spacing(2),
								fontWeight: 100
							}}
						>
							Write a Customer Review:
						</Typography>
						<Rating
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
									? 'Please enter a title'
									: ' '
							}
							className={
								reviewTitle.isTouched && !reviewTitle.isValid
									? clsx(classes.input, classes.error)
									: classes.input
							}
						/>

						<TextField
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
									? 'Please leave some feedback'
									: ' '
							}
							className={
								reviewComment.isTouched && !reviewComment.isValid
									? clsx(classes.input, classes.error)
									: classes.input
							}
						/>
						<Button
							color='primary'
							type='submit'
							variant='contained'
							fullWidth
							style={{
								marginTop: theme.spacing(2)
							}}
							disabled={!reviewTitle.isValid || !reviewComment.isValid}
						>
							{createReviewLoading ? (
								<CircularProgress
									size={25}
									style={{ color: '#fff' }}
									className={classes.submitProgress}
								/>
							) : (
								'Submit Review'
							)}
						</Button>
					</form>
				</Paper>
			) : (
				<Paper className={classes.reviewFormPaper}>
					<Typography variant='h6' style={{ fontSize: '1.1rem' }}>
						Please log in to write a review
					</Typography>
				</Paper>
			)}
		</>
	);
};

export default ReviewSection;
