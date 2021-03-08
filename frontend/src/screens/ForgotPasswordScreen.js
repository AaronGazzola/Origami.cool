import React, { useState } from 'react';
import clsx from 'clsx';
import styles from 'styles/formStyles';
import {
	Button,
	CircularProgress,
	TextField,
	Typography
} from '@material-ui/core';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, validate } from 'utils/validators';
import { forgotPasswordAction } from 'actions/userActions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = styles;

const ForgotPasswordScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { loading } = useSelector(state => state.forgotPassword);

	const [email, setEmail] = useState({
		value: '',
		isValid: false,
		isTouched: false
	});

	const changeHandler = (e, validators) => {
		setEmail({
			...email,
			isValid: validate(e.target.value, validators),
			value: e.target.value
		});
	};

	const touchHandler = () => {
		setEmail({ ...email, isTouched: true });
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(forgotPasswordAction(email.value));
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Typography variant='h2' style={{ textAlign: 'center' }}>
				Forgot Password
			</Typography>
			<TextField
				id='email'
				label='Email'
				type='email'
				placeholder='Email'
				fullWidth
				color='secondary'
				className={
					email.isTouched && !email.isValid
						? clsx(classes.input, classes.error)
						: classes.input
				}
				onChange={e =>
					changeHandler(e, [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()])
				}
				onBlur={touchHandler}
				value={email.value}
				error={email.isTouched && !email.isValid}
				helperText={
					email.isTouched && !email.isValid
						? 'Please enter a valid email address'
						: ' '
				}
			/>
			<Button
				className={classes.button}
				type='submit'
				disabled={!email.isValid}
				variant='contained'
				color='secondary'
				fullWidth
			>
				{loading ? (
					<CircularProgress size={25} className={classes.submitProgress} />
				) : (
					'Send Email'
				)}
			</Button>
			<Button
				size='small'
				className={classes.button3}
				component={Link}
				to='/login'
			>
				Back to Log In
			</Button>
		</form>
	);
};

export default ForgotPasswordScreen;
