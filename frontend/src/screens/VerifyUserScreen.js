import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyUserAction, verifyEmailUpdateAction } from 'actions/userActions';
import { CircularProgress, Typography } from '@material-ui/core';
import {
	VERIFY_USER_CLEAR,
	VERIFY_EMAIL_UPDATE_CLEAR
} from 'constants/userConstants';
import Message from 'components/Message';

const VerifyScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const verifyToken = match.params.token;

	const verifyUser = useSelector(state => state.verifyUser);
	const { error: verifyUserError, success: verifyUserSuccess } = verifyUser;

	const verifyEmailUpdate = useSelector(state => state.verifyEmailUpdate);
	const {
		error: verifyEmailError,
		success: verifyEmailSuccess
	} = verifyEmailUpdate;

	useEffect(() => {
		if (location.pathname.startsWith('/verifyuser') && !verifyUserSuccess) {
			dispatch(verifyUserAction(verifyToken));
		} else if (
			location.pathname.startsWith('/verifyemail') &&
			!verifyEmailSuccess
		) {
			dispatch(verifyEmailUpdateAction(verifyToken));
		}

		if (verifyUserSuccess || verifyEmailSuccess) {
			history.push('/profile');
		}
	}, [dispatch, verifyToken, verifyUserSuccess, verifyEmailSuccess, history]);

	return (
		<>
			<Message
				error={verifyEmailError || verifyUserError}
				reset={
					verifyUserError
						? () => dispatch({ type: VERIFY_USER_CLEAR })
						: () => dispatch({ type: VERIFY_EMAIL_UPDATE_CLEAR })
				}
			/>
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
