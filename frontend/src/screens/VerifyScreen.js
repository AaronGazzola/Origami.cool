import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyUserAction, verifyEmailUpdateAction } from 'actions/userActions';
import { CircularProgress, Typography } from '@material-ui/core';

const VerifyScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const verifyToken = match.params.token;

	const { error: verifyUserError, success: verifyUserSuccess } = useSelector(
		state => state.verifyUser
	);

	const { error: verifyEmailError, success: verifyEmailSuccess } = useSelector(
		state => state.verifyEmailUpdate
	);

	useEffect(() => {
		if (verifyUserSuccess || verifyEmailSuccess || verifyEmailError) {
			history.push('/profile');
		} else if (verifyUserError) {
			history.push('/login');
		} else if (location.pathname.startsWith('/verifyuser')) {
			dispatch(verifyUserAction(verifyToken));
		} else if (location.pathname.startsWith('/verifyemail')) {
			dispatch(verifyEmailUpdateAction(verifyToken));
		}
	}, [
		dispatch,
		verifyToken,
		verifyUserSuccess,
		verifyEmailSuccess,
		history,
		location.pathname,
		verifyEmailError,
		verifyUserError
	]);

	return (
		<>
			<Typography variant='h1'>Verifying</Typography>
			<CircularProgress
				style={{ marginTop: 20 }}
				color='secondary'
				thickness={2}
				size={50}
			/>
		</>
	);
};

export default VerifyScreen;
