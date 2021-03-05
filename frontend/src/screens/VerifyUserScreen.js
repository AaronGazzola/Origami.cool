import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyUserAction } from 'actions/userActions';
import { CircularProgress, Typography } from '@material-ui/core';
import { VERIFY_USER_CLEAR } from 'constants/userConstants';
import Message from 'components/Message';

const VerifyUserScreen = ({ match }) => {
	const dispatch = useDispatch();
	const verifyToken = match.params.token;

	const verifyUser = useSelector(state => state.verifyUser);
	const { error } = verifyUser;

	useEffect(() => {
		dispatch(verifyUserAction(verifyToken));
	}, [dispatch, verifyToken]);

	return (
		<>
			<Message
				error={error}
				reset={() => dispatch({ type: VERIFY_USER_CLEAR })}
			/>
			<Typography variant='h1'>Verifying your account </Typography>
			<CircularProgress
				style={{ marginTop: 20 }}
				color='secondary'
				thickness={2}
				size={50}
			/>
		</>
	);
};

export default VerifyUserScreen;
