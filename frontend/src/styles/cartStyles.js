import { makeStyles } from '@material-ui/core/styles';

const appBarHeight = 100;

const styles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(3),
		position: 'relative'
	},
	cartTitle: {
		fontSize: '3rem',
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem'
		}
	},
	emptyCart: {
		margin: theme.spacing(3),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	cartItem: {
		width: '100%',
		height: 100,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			height: 80
		}
	},
	itemPrice: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '.8rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.9rem'
		}
	},
	itemSubTotal: {
		borderTop: `1px solid ${theme.palette.grey[500]}`,
		marginTop: 3,
		fontStyle: 'italic',
		[theme.breakpoints.down('xs')]: {
			fontSize: '.8rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.9rem'
		}
	},
	itemName: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '.9rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '.8rem'
		}
	},
	checkoutGrid: {
		[theme.breakpoints.up('md')]: {
			position: 'sticky',
			top: `calc( ${appBarHeight}px + ${theme.spacing(2)}px)`,
			height: 'min-content'
		}
	},
	checkoutPaper: {
		width: '100%',
		height: '100%',
		padding: theme.spacing(2)
	},
	checkoutTotalTitle: {
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem'
		}
	},
	checkoutTotal: {
		fontSize: '1.2rem',
		fontStyle: 'italic',
		margin: theme.spacing(1),
		marginBottom: theme.spacing(2)
	},
	checkoutButton: {
		width: '100%'
	},
	productImage: {
		height: '100%'
	},
	productTitle: {
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(1)
		}
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary
	},
	loading: {
		alignSelf: 'center',
		marginTop: theme.spacing(2)
	},
	deleteIcon: {
		color: theme.palette.grey[800]
	}
}));

export default styles;
