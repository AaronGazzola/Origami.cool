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

const useStyles = makeStyles(theme => ({
	success: {
		color: theme.palette.success.main
	},
	error: {
		color: theme.palette.error.light
	},
	alert: {
		color: theme.palette.secondary.main
	},
	text: {
		color: theme.palette.text.primary
	},
	paper: {
		backgroundColor: theme.palette.grey[900]
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
	func,
	funcText,
	reset
}) => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<Dialog
			classes={{ paper: classes.paper }}
			open={!!success || !!error || !!alert}
			onClose={() => reset()}
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
						onClick={reset}
					>
						OK
					</Button>
				)}
				{!!link && (
					<Button
						className={classes.alert}
						onClick={() => {
							reset();
							history.push(link);
						}}
					>
						{linkText}
					</Button>
				)}
				{!!func && (
					<Button
						className={classes.alert}
						onClick={() => {
							func();
							reset();
						}}
					>
						{funcText}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default Message;
