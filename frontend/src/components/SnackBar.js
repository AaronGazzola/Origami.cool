import React from 'react';
import { Snackbar, IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
	snackbar: {
		'& .MuiPaper-root': {
			backgroundColor: theme.palette.success.main
		},
		'& .MuiSnackbarContent-message': {
			color: theme.palette.common.background,
			fontSize: '1rem'
		},
		'& .MuiSvgIcon-root': {
			color: theme.palette.common.green5
		}
	}
}));

const SnackBar = ({ message, clearType }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={!!message}
			autoHideDuration={3000}
			onClose={() => dispatch({ type: clearType })}
			message={message}
			className={classes.snackbar}
			action={
				<IconButton onClick={() => dispatch({ type: clearType })}>
					<Close />
				</IconButton>
			}
		/>
	);
};

export default SnackBar;
