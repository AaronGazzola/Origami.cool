import { makeStyles } from '@material-ui/core/styles';
import { defaults } from 'sanitize-html';

const styles = makeStyles(theme => ({
	reviewPaper: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
		'& h6': {
			fontWeight: 700,
			fontSize: '1.1rem',
			marginBottom: theme.spacing(1)
		}
	},
	reviewName: {
		marginLeft: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			fontSize: '.9rem'
		},
		'& span': {
			fontStyle: 'italic',
			fontSize: '.9rem',
			marginLeft: theme.spacing(1),
			[theme.breakpoints.down('sm')]: {
				fontSize: '.8rem'
			}
		}
	},
	reviewComment: {
		color: theme.palette.grey[800],
		paddingLeft: theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			paddingLeft: theme.spacing(1)
		}
	},
	reviewFormPaper: {
		width: '100%',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('md')]: {
			padding: theme.spacing(2)
		},
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(2),
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3)
		},
		[theme.breakpoints.up('lg')]: {
			padding: theme.spacing(4),
			paddingLeft: theme.spacing(6),
			paddingRight: theme.spacing(6)
		}
	},
	reviewForm: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	cartButton: {
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(3)
		}
	},
	input: {
		marginTop: theme.spacing(1),
		width: '90%'
	},
	error: {
		'& label.Mui-focused': {
			color: theme.palette.error.main
		}
	},
	button: {
		marginTop: theme.spacing(2),
		color: theme.palette.background.default
	}
}));

export default styles;
