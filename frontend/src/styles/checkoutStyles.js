import { makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(2)
	},
	title: {
		fontSize: '3rem',
		margin: theme.spacing(1),
		[theme.breakpoints.down('xs')]: {
			fontSize: '2.5rem',
			textAlign: 'center'
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
	},
	cartItem: {
		height: 100,
		marginBottom: theme.spacing(3),
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.down('xs')]: {
			height: 'min-content',
			width: 'min-content'
		},
		'&:last-of-type': {
			margin: 0
		}
	},
	productImage: {
		height: '100%',
		// justifySelf: 'start',
		[theme.breakpoints.down('xs')]: {
			width: 200,
			height: 'auto'
		}
	},
	itemName: {
		flex: 1,
		fontWeight: 100,
		fontSize: '1.5rem',
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontWeight: 700,
			fontSize: '1rem'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2)
		}
	},
	select: {
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(1)
		}
	},
	itemPrice: {
		fontStyle: 'italic',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(2)
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.9rem'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2)
		}
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary
	},
	deleteIcon: {
		color: theme.palette.error.dark,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(3)
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1)
		}
	}
}));

export default styles;
