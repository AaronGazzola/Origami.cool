import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button, Grid, Paper, Typography, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'actions/userActions';
import styles from 'styles/contentStyles';
import ProfileModal from '../components/ProfileModal';
import Message from 'components/Message';
import SnackBar from 'components/SnackBar';
import {
	USER_UPDATE_PROFILE_CLEAR,
	VERIFY_USER_CLEAR,
	VERIFY_EMAIL_UPDATE_CLEAR
} from 'constants/userConstants';

const useStyles = styles;

const ProfileScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.userData);
	const {
		user: { address },
		user
	} = userData;
	const userUpdateProfile = useSelector(state => state.userUpdateProfile);
	const { success, error } = userUpdateProfile;
	const verifyUser = useSelector(state => state.verifyUser);
	const { success: verifyUserSuccess } = verifyUser;

	const verifyEmailUpdate = useSelector(state => state.verifyEmailUpdate);
	const { success: verifyEmailSuccess } = verifyEmailUpdate;
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		if (success || error) {
			setModalIsOpen(false);
		}
	}, [success, error]);

	return (
		<>
			<Message
				error={error}
				success={success !== 'Profile Updated' && success}
				reset={() => dispatch({ type: USER_UPDATE_PROFILE_CLEAR })}
			/>
			<SnackBar
				message={
					(success && success === 'Profile Updated' && success) ||
					verifyUserSuccess ||
					verifyEmailSuccess
				}
				clearType={
					verifyUserSuccess
						? VERIFY_USER_CLEAR
						: verifyEmailSuccess
						? VERIFY_EMAIL_UPDATE_CLEAR
						: USER_UPDATE_PROFILE_CLEAR
				}
			/>
			<ProfileModal open={modalIsOpen} setOpen={setModalIsOpen} user={user} />
			<Grid container spacing={5} className={classes.container}>
				<Grid item xs={12} md={5} lg={4}>
					<Typography variant='h1' className={classes.title}>
						Profile
					</Typography>
					<Paper className={classes.paper}>
						<Typography variant='h5' className={classes.subTitle}>
							{user.name}
						</Typography>
						<Typography className={classes.text}>{user.email}</Typography>
						<Divider className={classes.divider} />
						{address &&
							Object.keys(address).map(key =>
								address[key] && key === 'state' ? (
									<Typography key={key} className={classes.address}>
										{address.state}&nbsp;&nbsp;&nbsp;{address.postCode}
									</Typography>
								) : address[key] && key !== 'postCode' ? (
									<Typography className={classes.address} key={key}>
										{address[key]}
									</Typography>
								) : null
							)}
						<Grid
							container
							justify='flex-end'
							spacing={2}
							className={classes.buttonContainer}
						>
							<Grid item>
								<Button
									className={classes.button}
									onClick={() => setModalIsOpen(true)}
								>
									Edit Profile
								</Button>
							</Grid>
							<Grid item>
								<Button
									className={clsx(classes.button, classes.error)}
									onClick={() => dispatch(logoutAction())}
								>
									Log Out
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={8}>
					<Typography variant='h1' className={classes.title}>
						Orders
					</Typography>
					<Paper className={classes.paper}></Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileScreen;
