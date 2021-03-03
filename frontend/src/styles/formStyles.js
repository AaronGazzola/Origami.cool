import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	form: {
		width: '320px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	input: {
		marginTop: theme.spacing(2),
		width: '90%',
		'& .MuiInputLabel-shrink, p': {
			fontWeight: 700
		}
	},
	error: {
		'& label.Mui-focused': {
			color: theme.palette.error.main
		}
	},
	button: {
		marginTop: theme.spacing(4),
		fontWeight: 700
	},
	button2: {
		marginTop: theme.spacing(2),
		fontWeight: 700
	},
	button3: {
		marginTop: theme.spacing(1),
		color: theme.palette.secondary.main,
		textTransform: 'none',
		fontWeight: 700,
		'&:hover': {
			// color: theme.palette.primary.main
		}
	}
}));

export default styles;
