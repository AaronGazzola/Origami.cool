import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(0, 2)
		}
	},
	loadingPaper: {
		width: '100%',
		height: 200,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		margin: theme.spacing(2, 0)
	},
	button: {
		marginRight: theme.spacing(1),
		[theme.breakpoints.down('xs')]: {
			marginTop: 0,
			margin: theme.spacing(2),
			marginBottom: theme.spacing(3)
		}
	},
	tableRow: {
		'& th': {
			fontWeight: 700
		}
	},
	table: {
		padding: theme.spacing(1, 2)
	},
	error: {
		color: theme.palette.error.main
	},
	collapse: {
		marginTop: -theme.spacing(2),
		[theme.breakpoints.down('md')]: {
			marginTop: -theme.spacing(1),
			marginBottom: theme.spacing(2)
		},
		width: '100%'
	},
	link: {
		color: theme.palette.secondary.main,
		textDecoration: 'none',
		fontWeight: 700,
		fontSize: '1.2rem'
	},
	backButton: {
		marginTop: theme.spacing(2)
	},
	form: {
		width: 500,
		[theme.breakpoints.down('xs')]: {
			width: 320
		},
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
	}
}));

export default styles;
