import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	arrowCircle: {
		background: 'rgba(217,170,111,.5)',
		border: `1px solid ${theme.palette.background.default}`,
		height: 50,
		width: 50,
		position: 'fixed',
		borderRadius: '50%',
		position: 'fixed',
		bottom: 50,
		left: '50%',
		transform: 'translate(-50%, 0%)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		animation: '$pulse .8s ease infinite alternate'
	},
	arrow: {
		color: theme.palette.background.default
	},
	title: {
		marginBottom: theme.spacing(1)
	},
	subTitle: {
		margin: theme.spacing(1, 0, 3, 0),
		alignSelf: 'flex-start'
	},
	paper: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1)
	},
	adminPaper: {
		marginTop: theme.spacing(2)
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
	margin2: {
		margin: theme.spacing(2)
	},
	productListImage: {
		width: '100%'
	},
	productListItem: {
		color: theme.palette.text.primary,
		textDecoration: 'none',
		padding: theme.spacing(2),
		transition: 'all .3s ease',
		'&:hover': {
			transform: 'scale(1.08)',
			cursor: 'pointer'
		}
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
	},
	pointer: {
		'&:hover': {
			cursor: 'pointer'
		}
	},
	productContainer: {
		width: '100%',
		height: 'min-content',
		padding: theme.spacing(2),
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(1)
		}
	},
	hidden: {
		display: 'none'
	},
	profilePaperLoading: {
		width: '100%',
		height: '75px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	faintIcon: { color: theme.palette.grey[500] },
	headerRow: {
		'& th': {
			fontWeight: 700,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1)
			}
		}
	},
	tableRow: {
		'& td': {
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1)
			}
		}
	},
	aboutPaper: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(3),
		maxWidth: 700
	},
	shadow: {
		marginTop: theme.spacing(2),
		boxShadow: theme.shadows[5]
	},
	divider2: {
		padding: theme.spacing(1),
		marginTop: theme.spacing(1),
		width: '80%',
		maxWidth: 400,
		borderBottom: `1px solid ${theme.palette.grey[800]}`
	},
	icons: {
		marginTop: theme.spacing(2),
		maxWidth: 150,
		'& a': {
			color: theme.palette.text.primary,
			'&:hover': {
				color: theme.palette.secondary.main
			}
		}
	},
	email: {
		marginTop: theme.spacing(1),
		'& a': {
			color: theme.palette.secondary.main,
			textDecoration: 'none',
			'&:hover': {
				color: theme.palette.secondary.main
			}
		}
	},
	subTitle3: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.7rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	'@keyframes pulse': {
		'0%': {
			transform: 'translate(-50%, 40%)'
		},
		'100%': {
			transform: 'translate(-50%, 0%)'
		}
	}
}));

export default styles;
