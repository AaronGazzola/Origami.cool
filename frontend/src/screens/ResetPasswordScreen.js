import React, { useReducer } from 'react';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	CircularProgress,
	TextField,
	Typography
} from '@material-ui/core';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
	validate
} from 'utils/validators';
import useStyles from 'styles/formStyles';
import clsx from 'clsx';
import { resetPasswordAction } from 'actions/userActions';
import { Link } from 'react-router-dom';

const initialFormState = {
	password: {
		value: '',
		isValid: false,
		isTouched: false
	},
	confirmPassword: {
		value: '',
		isValid: false,
		isTouched: false
	}
};

const formReducer = (formState, action) =>
	produce(formState, draft => {
		switch (action.type) {
			case 'CHANGE':
				if (action.payload.id === 'password') {
					draft.password.isValid = validate(
						action.payload.value,
						action.validators
					);
					draft.password.value = action.payload.value;
					draft.confirmPassword.isValid =
						action.payload.value === formState.confirmPassword.value;
				} else if (action.payload.id === 'confirmPassword') {
					draft.confirmPassword.isValid =
						action.payload.value === formState.password.value;
					draft.confirmPassword.value = action.payload.value;
				}
				break;
			case 'TOUCH':
				draft[action.payload].isTouched = true;
				break;
			default:
				break;
		}
	});

const ResetPasswordScreen = ({ match, history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const passwordToken = match.params.token;

	const { loading } = useSelector(state => state.resetPassword);

	const [formState, formDispatch] = useReducer(formReducer, initialFormState);
	const { password, confirmPassword } = formState;

	const changeHandler = (e, validators) => {
		formDispatch({ type: 'CHANGE', payload: e.target, validators });
	};

	const touchHandler = e => {
		if (!formState[e.target.id].isTouched) {
			formDispatch({ type: 'TOUCH', payload: e.target.id });
		}
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(resetPasswordAction(password.value, passwordToken));
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Typography variant='h2' style={{ textAlign: 'center' }}>
				Reset Password
			</Typography>
			<TextField
				id='password'
				label='Password'
				type='password'
				placeholder='Password'
				fullWidth
				color='secondary'
				className={
					password.isTouched && !password.isValid
						? clsx(classes.input, classes.error)
						: classes.input
				}
				onChange={e =>
					changeHandler(e, [
						VALIDATOR_REQUIRE(),
						VALIDATOR_MINLENGTH(6),
						VALIDATOR_MAXLENGTH(30)
					])
				}
				onBlur={touchHandler}
				value={password.value}
				error={password.isTouched && !password.isValid}
				helperText={
					password.isTouched && !password.isValid
						? 'Password must be between 6 and 30 characters'
						: ' '
				}
			/>
			<TextField
				id='confirmPassword'
				label='Confirm Password'
				type='password'
				placeholder='Confirm Password'
				fullWidth
				color='secondary'
				className={
					confirmPassword.isTouched && !confirmPassword.isValid
						? clsx(classes.input, classes.error)
						: classes.input
				}
				onChange={e => changeHandler(e, [])}
				onBlur={touchHandler}
				value={confirmPassword.value}
				error={confirmPassword.isTouched && !confirmPassword.isValid}
				helperText={
					confirmPassword.isTouched && !confirmPassword.isValid
						? 'Passwords must match'
						: ' '
				}
			/>
			<Button
				className={classes.button}
				type='submit'
				disabled={!password.isValid || !confirmPassword.isValid}
				variant='contained'
				color='secondary'
				fullWidth
			>
				{loading ? (
					<CircularProgress size={25} className={classes.submitProgress} />
				) : (
					'Reset Password'
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

export default ResetPasswordScreen;
