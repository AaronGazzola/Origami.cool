import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	title: {
		margin: theme.spacing(2, 0)
	},
	dollarSign: {
		color: theme.palette.primary.main,
		fontSize: '1.2rem'
	},
	aud: {
		alignSelf: 'flex-end',
		color: theme.palette.primary.main,
		fontSize: '.8rem'
	},
	ratingCotnainer: {
		margin: theme.spacing(0, 1, 0, 0),
		[theme.breakpoints.up('sm')]: {
			flexGrow: 2
		},
		'& p': {
			margin: theme.spacing(0, 1)
		}
	},
	descriptionContainer: {
		padding: theme.spacing(2, 1)
	},
	actionContainer: {
		width: '100%'
	},
	sticky: {
		[theme.breakpoints.up('md')]: {
			position: 'sticky',
			top: theme.spacing(2),
			height: 'min-content'
		}
	},
	qty: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2),
		width: 60
	},
	qtyLabel: {
		color: theme.palette.text.primary,
		'&.Mui-focused': {
			color: theme.palette.secondary.main
		}
	},
	error: {
		color: theme.palette.error.main
	},
	cartButton: {
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(3)
		}
	},
	smallReviewSection: {
		borderTop: `2px solid ${theme.palette.grey[300]}`,
		order: 2
	}
}));

export default styles;
