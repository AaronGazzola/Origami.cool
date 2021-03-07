import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from 'styles/formStyles';
import Message from 'components/Message';
import { useDispatch, useSelector } from 'react-redux';
import {
	CircularProgress,
	Button,
	TextField,
	Typography
} from '@material-ui/core';
import useAuthForm from 'hooks/authFormHook';
import { loginAction, signupAction } from 'actions/userActions';
import {
	SIGNUP_CLEAR,
	LOGIN_CLEAR,
	SEND_VERIFY_USER_CLEAR
} from 'constants/userConstants';
import { sendVerifyUserAction } from '../actions/userActions';
import SnackBar from 'components/SnackBar';

const useStyles = styles;

const AuthScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [formState, formDispatch] = useAuthForm();
	const { formIsValid, isLoginMode, inputs } = formState;

	const signup = useSelector(state => state.signup);
	const {
		loading: signupLoading,
		success: signupSuccess,
		error: signupError
	} = signup;

	const sendVerifyUser = useSelector(state => state.sendVerifyUser);
	const {
		success: sendVerifyUserSuccess,
		error: sendVerifyUserError
	} = sendVerifyUser;

	const login = useSelector(state => state.login);
	const { loading: loginLoading, alert: loginAlert, error: loginError } = login;

	const changeHandler = (e, validators) => {
		formDispatch({ type: 'CHANGE', payload: e.target, validators });
	};

	const touchHandler = e => {
		if (!formState.inputs[e.target.id].isTouched) {
			formDispatch({ type: 'TOUCH', payload: e.target });
		}
	};

	const switchModeHandler = () => {
		formDispatch({ type: 'SWITCH_MODE' });
	};

	const submitHandler = e => {
		e.preventDefault();
		if (isLoginMode) {
			dispatch(loginAction(inputs.email.value, inputs.password.value));
		} else {
			dispatch(
				signupAction(
					inputs.name.value,
					inputs.email.value,
					inputs.password.value
				)
			);
		}
	};

	return (
		<>
			<Message
				error={signupError || loginError || sendVerifyUserError}
				alert={loginAlert}
				success={signupSuccess}
				reset={
					signupError || signupSuccess
						? () => dispatch({ type: SIGNUP_CLEAR })
						: sendVerifyUserError
						? () => dispatch({ type: SEND_VERIFY_USER_CLEAR })
						: () => dispatch({ type: LOGIN_CLEAR })
				}
				funcText='Resend Email'
				func={
					loginAlert || sendVerifyUserError
						? () => dispatch(sendVerifyUserAction(inputs.email.value))
						: null
				}
			/>
			<SnackBar
				message={sendVerifyUserSuccess}
				clearType={SEND_VERIFY_USER_CLEAR}
			/>
			<form className={classes.form} onSubmit={submitHandler}>
				<Typography variant='h1'>
					{isLoginMode ? 'Log In' : 'Sign Up'}
				</Typography>
				{Object.keys(inputs).map(input => {
					const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
					if (
						isLoginMode &&
						(input === 'name' || input === 'confirmPassword')
					) {
						return <React.Fragment key={input}></React.Fragment>;
					} else {
						return (
							<TextField
								key={input}
								id={input}
								label={capitalized}
								type={
									input === 'name'
										? 'text'
										: input === 'email'
										? 'email'
										: 'password'
								}
								placeholder={capitalized}
								fullWidth
								color='secondary'
								className={
									inputs[input].isTouched && !inputs[input].isValid
										? clsx(classes.input, classes.error)
										: classes.input
								}
								onChange={e => changeHandler(e, inputs[input].validators)}
								onBlur={touchHandler}
								value={inputs[input].value}
								error={inputs[input].isTouched && !inputs[input].isValid}
								helperText={
									inputs[input].isTouched && !inputs[input].isValid
										? inputs[input].helperText
										: ' '
								}
							/>
						);
					}
				})}
				<Button
					className={classes.button}
					type='submit'
					disabled={!formIsValid}
					variant='contained'
					color='secondary'
					fullWidth
				>
					{signupLoading || loginLoading ? (
						<CircularProgress size={25} className={classes.submitProgress} />
					) : isLoginMode ? (
						'Log In'
					) : (
						'Sign Up'
					)}
				</Button>
				<Button
					size='small'
					variant='outlined'
					className={classes.button2}
					color='secondary'
					onClick={switchModeHandler}
				>
					Switch to {isLoginMode ? 'Sign Up' : 'Log In'}
				</Button>
				<Button
					size='small'
					className={classes.button3}
					component={Link}
					to='/forgotpassword'
				>
					Forgot Password?
				</Button>
			</form>
		</>
	);
};

export default AuthScreen;
