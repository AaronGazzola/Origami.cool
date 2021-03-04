import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'actions/userActions';

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const userData = useSelector(state => state.userData);
	const { user } = userData;
	return (
		<>
			{user?.name && <Typography>{user.name}</Typography>}
			<Button onClick={() => dispatch(logoutAction())}>Log out</Button>
		</>
	);
};

export default ProfileScreen;
