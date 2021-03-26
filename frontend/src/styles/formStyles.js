import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	form: {
		width: 320,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	input: {
		'&:first-of-type': {
			marginTop: theme.spacing(2)
		},
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
		marginTop: theme.spacing(3),
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
	},
	submitProgress: {
		color: theme.palette.background.default
	},
	modalPaper: {
		padding: theme.spacing(4, 2, 3, 2),
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		overflowY: 'scroll',
		'&:focus': {
			outline: 'none'
		},
		width: 500,
		maxWidth: '100%',
		maxHeight: '85%',
		[theme.breakpoints.down('xs')]: {
			top: 0,
			left: 0,
			width: '100%',
			maxHeight: '100%',
			transform: 'none'
		}
	},
	modalForm: {
		maxWidth: 400,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	close: {
		position: 'absolute',
		top: 0,
		left: 0
	},
	outerList: {
		width: '90%',
		marginTop: theme.spacing(2),
		padding: 0,
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 5
	},
	outerListOpen: {
		borderColor: theme.palette.primary.main
	},
	innerList: {
		padding: theme.spacing(1, 2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	greyText: {
		color: theme.palette.grey[600]
	}
}));

export default styles;
