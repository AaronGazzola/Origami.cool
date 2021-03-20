import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	loadingPaper: {
		width: '100%',
		height: 200,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		margin: theme.spacing(2)
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
	}
}));

export default styles;
