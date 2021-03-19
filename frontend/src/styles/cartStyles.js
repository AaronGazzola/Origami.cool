import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		position: 'relative',
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(0, 3)
		}
	},
	cartTitle: {
		fontSize: '3rem',
		marginBottom: theme.spacing(1),
		padding: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem'
		}
	},
	emptyCart: {
		margin: theme.spacing(3),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	itemListGrid: {
		'&.MuiGrid-root': {
			paddingBottom: 0
		}
	},
	cartItem: {
		height: 200,
		marginBottom: theme.spacing(3),
		[theme.breakpoints.down('sm')]: {
			height: 100
		},
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.down('xs')]: {
			height: 'min-content',
			width: 'min-content'
		}
	},
	productImage: {
		height: '100%',
		justifySelf: 'start',
		[theme.breakpoints.down('xs')]: {
			width: 280,
			height: 'auto'
		}
	},
	itemName: {
		flex: 1,
		fontWeight: 100,
		fontSize: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			fontWeight: 700,
			fontSize: '1rem'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2)
		}
	},
	select: {
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2)
		}
	},
	itemPrice: {
		fontStyle: 'italic',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3)
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.9rem'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(3)
		}
	},
	subTotalGrid: {
		[theme.breakpoints.up('sm')]: {
			'&.MuiGrid-root': {
				padding: theme.spacing(0, 2, 2, 0)
			}
		},
		[theme.breakpoints.down('xs')]: {
			'&.MuiGrid-root': {
				padding: 0
			}
		}
	},
	subTotal: {
		padding: theme.spacing(2),
		'& span': {
			fontWeight: 700,
			marginLeft: theme.spacing(3)
		}
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary
	},
	loading: {
		margin: theme.spacing(3)
	},
	deleteIcon: {
		color: theme.palette.error.dark,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(3)
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(1)
		}
	},
	checkoutButton: {
		padding: theme.spacing(2),
		margin: theme.spacing(0, 0, 0, 2),
		width: 200,
		[theme.breakpoints.down('xs')]: {
			width: 'min-content',
			margin: theme.spacing(2, 0, 0, 0)
		}
	}
}));

export default styles;
