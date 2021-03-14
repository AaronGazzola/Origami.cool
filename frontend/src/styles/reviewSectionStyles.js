import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	reviewPaper: {
		width: '100%',
		padding: theme.spacing(3),
		marginBottom: theme.spacing(2),
		'& h6': {
			fontWeight: 700,
			fontSize: '1.1rem'
		}
	},
	author: {
		fontStyle: 'italic'
	},
	date: {
		fontSize: '.8rem',
		marginLeft: theme.spacing(1)
	},
	reviewComment: {
		margin: theme.spacing(0, 2, 1, 2)
	},
	reviewFormPaper: {
		width: '100%',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		padding: theme.spacing(4, 6, 4, 6),
		[theme.breakpoints.down('md')]: {
			padding: theme.spacing(3, 2, 3, 2)
		}
	},
	reviewForm: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& h5': {
			textAlign: 'center',
			marginBottom: theme.spacing(2),
			fontWeight: 100
		}
	},
	input: {
		marginTop: theme.spacing(1),
		width: '90%'
	},
	error: {
		'& label.Mui-focused': {
			color: theme.palette.error.main
		},
		'& .MuiInputBase-root': {
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: theme.palette.error.light
			}
		}
	},
	button: {
		marginTop: theme.spacing(2),
		color: theme.palette.background.default
	},
	title: {
		textAlign: 'center',
		fontFamily: "'Nanum Gothic', sans-serif",
		fontStyle: 'italic',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(3)
	},
	paper: {
		padding: theme.spacing(2),
		width: '100%'
	}
}));

export default styles;
