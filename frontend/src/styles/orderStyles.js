import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(3)
	},
	titleSkeleton: {
		marginTop: -5,
		marginLeft: theme.spacing(1)
	},
	title: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		fontSize: '2.5rem',
		width: 'min-content',
		textAlign: 'center',
		whiteSpace: 'nowrap',
		[theme.breakpoints.down('sm')]: {
			whiteSpace: 'normal',
			fontSize: '2rem',
			margin: theme.spacing(1)
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem',
			whiteSpace: 'normal'
		}
	},
	title2: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
		fontSize: '2.5rem',
		width: '100%',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
			margin: theme.spacing(1)
		}
	},
	detailsPaper: {
		width: '100%',
		padding: theme.spacing(2)
	},
	cancelPaper: {
		width: '100%',
		padding: theme.spacing(2),
		borderColor: theme.palette.error.main
	},
	link: {
		color: theme.palette.primary.main,
		'&:active': {
			color: theme.palette.primary.main
		}
	},
	canceled: {
		color: theme.palette.error.main
	},
	detailsIcon: {
		marginRight: theme.spacing(1)
	},
	cancelIcon: {
		marginRight: theme.spacing(1),
		color: theme.palette.error.main
	},
	detailsTitleGrid: {
		marginBottom: theme.spacing(1),
		paddingLeft: theme.spacing(1)
	},
	innerPaper: {
		width: 'min-content',
		margin: 'auto',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
		padding: theme.spacing(2),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		'& p': {
			whiteSpace: 'nowrap'
		}
	},
	loadingGrid: {
		margin: theme.spacing(2)
	},
	name: {
		paddingTop: theme.spacing(1),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		paddingLeft: 0,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		borderBottom: `2px solid ${theme.palette.grey[400]}`,
		fontSize: '1.2rem'
	},
	content: {
		padding: theme.spacing(1),
		marginLeft: theme.spacing(1)
	},
	payList: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(5),
		paddingLeft: 0,
		'& li': { fontSize: '.9rem' }
	},
	stepper: {
		background: 'none',
		paddingTop: theme.spacing(1),
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0
	},
	stepLabel: {
		'& span': {
			[theme.breakpoints.up('sm')]: {
				fontSize: '1.2rem'
			},
			'& .MuiStepIcon-completed': {
				color: theme.palette.common.green1
			}
		}
	},
	completed: {
		color: theme.palette.common.green4
	},
	active: {
		color: theme.palette.primary.main
	},
	completedBorder: {
		border: `2px solid ${theme.palette.common.green1}`
	},
	activeBorder: {
		border: `2px solid ${theme.palette.primary.main}`
	},
	tableContainer: {
		maxWidth: 900
	},
	headerRow: {
		'& th': {
			fontWeight: 700,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1)
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '.8rem'
			}
		},
		'& td': {
			fontWeight: 700,
			fontSize: '.9rem',
			color: theme.palette.text.primary,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1)
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '.8rem'
			}
		}
	},
	tableRow: {
		'& td': {
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1)
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '.8rem'
			}
		}
	},
	tableFooter: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	addressContent: {
		padding: theme.spacing(1, 2, 2, 2)
	},
	cancelButton: {
		color: theme.palette.error.main,
		borderColor: theme.palette.error.main
	}
}));

export default styles;
