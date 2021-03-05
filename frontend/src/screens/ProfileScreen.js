import React from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'actions/userActions';
import styles from 'styles/contentStyles';

const useStyles = styles;

const ProfileScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.userData);
	const { user } = userData;
	return (
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
					<Button
						className={classes.logoutButton}
						onClick={() => dispatch(logoutAction())}
					>
						Log Out
					</Button>
				</Paper>
			</Grid>
			<Grid item xs={12} md={8}>
				<Typography variant='h1' className={classes.title}>
					Orders
				</Typography>
				<Paper className={classes.paper}></Paper>
			</Grid>
		</Grid>
	);
};

export default ProfileScreen;
