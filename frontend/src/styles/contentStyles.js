import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(1)
	},
	paper: {
		padding: theme.spacing(2)
	},
	text: {
		marginTop: theme.spacing(1),
		'&:last-of-type': {
			marginBottom: theme.spacing(1)
		}
	},
	button: {
		fontWeight: 700,
		color: theme.palette.secondary.main
	},
	error: {
		color: theme.palette.error.main
	}
}));

export default styles;
