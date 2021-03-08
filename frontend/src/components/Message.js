import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
	success: {
		color: theme.palette.success.main,
		fontWeight: 700,
		'& .MuiTypography-root': {
			fontWeight: 700
		}
	},
	error: {
		'& .MuiTypography-root': {
			color: theme.palette.error.main,
			fontWeight: 700
		}
	},
	alert: {
		color: theme.palette.common.purple6,
		fontWeight: 700,
		'& .MuiTypography-root': {
			fontWeight: 700
		}
	},
	text: {
		color: theme.palette.text.primary
	},
	paper: {
		backgroundColor: theme.palette.common.tan2
	}
}));

const Message = ({
	error,
	success,
	alert,
	title,
	ok = true,
	link,
	linkText,
	action,
	actionText,
	clearType
}) => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	return (
		<Dialog
			classes={{ paper: classes.paper }}
			open={!!success || !!error || !!alert}
			onClose={() => dispatch({ type: clearType })}
			transitionDuration={{ exit: 0 }}
		>
			<DialogTitle
				className={
					success ? classes.success : error ? classes.error : classes.alert
				}
			>
				{title ? title : error ? 'Error' : success ? 'Success' : 'Alert'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText className={classes.text}>
					{error
						? error
						: success
						? success
						: alert
						? alert
						: 'Request could not be completed'}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{ok && (
					<Button
						className={!!success ? classes.success : classes.alert}
						onClick={() => dispatch({ type: clearType })}
					>
						OK
					</Button>
				)}
				{!!link && (
					<Button
						className={classes.alert}
						onClick={() => {
							dispatch({ type: clearType });
							history.push(link);
						}}
					>
						{linkText}
					</Button>
				)}
				{!!action && (
					<Button
						className={classes.alert}
						onClick={() => {
							dispatch(action);
							dispatch({ type: clearType });
						}}
					>
						{actionText}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default Message;
