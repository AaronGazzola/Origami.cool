import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(1)
	},
	paper: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1)
	},
	text: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		'&:last-of-type': {
			marginBottom: theme.spacing(1)
		}
	},
	button: {
		fontWeight: 700,
		color: theme.palette.secondary.main
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.main
	},
	error: {
		color: theme.palette.error.main
	},
	divider: {
		margin: theme.spacing(1, 0)
	},
	address: {
		marginBottom: -theme.spacing(0.7),
		marginLeft: theme.spacing(1)
	},
	buttonContainer: {
		marginTop: theme.spacing(1)
	},
	full: {
		width: '100%',
		height: '100%'
	},
	hero: {
		zIndex: -1,
		position: 'absolute',
		top: -100,
		overflow: 'hidden',
		width: '100vw',
		height: '50vw',
		backgroundImage: 'url(/images/bull1.jpg)',
		backgroundPosition: '0 20%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		'& div': {
			width: '100%',
			height: '100%',
			background:
				'linear-gradient(0deg, rgba(255,250,240,1) 0%,rgba(255,250,240,0) 15%, rgba(255,250,240,0) 85%, rgba(255,250,240,1) 100%)'
		},
		'& h1': {
			color: 'rgba(255,250,240,1)',
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			fontSize: '10vw',
			top: 80,
			[theme.breakpoints.down('sm')]: {
				fontSize: '8vw',
				top: 75
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '2rem',
				top: 30
			}
		}
	},
	heroMargin: {
		marginTop: 'calc(50vw - 100px)'
	},
	productListImage: {
		width: '100%'
	},
	productListItem: {
		padding: theme.spacing(2)
	},
	margin2: {
		margin: theme.spacing(2)
	},
	productListTitle: {
		fontSize: '1.1rem',
		fontWeight: 700,
		marginTop: theme.spacing(1)
	},
	productListNumReviews: {
		fontSize: '.8rem'
	},
	productListPrice: {
		marginTop: theme.spacing(0.5),
		fontStyle: 'italic'
	}
}));

export default styles;
