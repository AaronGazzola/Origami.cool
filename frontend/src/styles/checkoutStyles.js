import { makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(2)
	},
	title: {
		fontSize: '3rem',
		margin: theme.spacing(1),
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem'
		}
	},
	accordionSummary: {
		'& .MuiAccordionSummary-content': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-start',
			overflow: 'hidden'
		}
	},
	heading: {
		whiteSpace: 'nowrap',
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem'
		}
	},
	icon1: {
		marginRight: theme.spacing(2)
	},
	icon2: {
		marginLeft: theme.spacing(2),
		color: theme.palette.common.green1
	},
	summaryText: {
		marginLeft: theme.spacing(1),
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'clip'
	},
	sticky: {
		[theme.breakpoints.up('md')]: {
			position: 'sticky',
			top: 0,
			height: 'min-content'
		}
	},
	orderTitle: {
		marginBottom: theme.spacing(1)
	},
	orderPaper: {
		height: '100%',
		width: '100%',
		padding: theme.spacing(2)
	},
	mb1: {
		marginBottom: theme.spacing(1)
	},
	shippingContainer: {
		width: '100%'
	},
	deliveryPaper: {
		padding: theme.spacing(2),
		border: `1px solid ${theme.palette.grey[500]}`,
		'& h6': {
			marginBottom: theme.spacing(1)
		},
		'& p': {
			marginLeft: theme.spacing(1)
		}
	},
	error: {
		color: theme.palette.error.main
	},
	paymentOptions: {
		marginLeft: theme.spacing(2)
	},
	payPalOption: {
		'& span': {
			fontStyle: 'italic',
			fontWeight: 700,
			fontSize: '1.1rem'
		}
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
	productImage: {
		height: '100%'
	},
	productTitle: {
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(1)
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
	deleteIcon: {
		color: theme.palette.grey[800]
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary
	},
	orderButton: {
		marginTop: theme.spacing(2)
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	},
	addressButton: {
		margin: theme.spacing(1),
		minWidth: 160
	}
}));

export default styles;
