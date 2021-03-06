import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'actions/userActions';
import styles from 'styles/contentStyles';
import ProfileModal from '../components/ProfileModal';

const useStyles = styles;

const ProfileScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.userData);
	const { user } = userData;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	return (
		<>
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
						<Grid container justify='flex-end' spacing={2}>
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
