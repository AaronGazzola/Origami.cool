import { makeStyles } from '@material-ui/core/styles';

const appBarHeight = 100;
const footerHeight = 68;

const styles = makeStyles(theme => ({
	main: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		margin: '0 auto',
		padding: 0,
		paddingBottom: theme.spacing(3),
		marginTop: appBarHeight,
		minHeight: `calc(100vh - ${appBarHeight + footerHeight}px)`,
		width: '100%',
		overflow: 'visible',
		maxWidth: 1220,
		[theme.breakpoints.down('md')]: {
			maxWidth: 900
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: 600
		}
		// backgroundColor: '#fff'
	},
	appBar: {
		height: appBarHeight
	},
	toolBar: {
		margin: 'auto',
		display: 'flex',
		width: '100%',
		maxWidth: 1220,
		[theme.breakpoints.down('md')]: {
			maxWidth: 900
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: 600
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	footer: {
		height: 'min-content',
		width: '100%',
		// backgroundColor: theme.palette.secondary.light,
		// backgroundColor: theme.palette.common.tan3,
		background: 'transparent',
		boxShadow: '0 6px 9px 7px rgba(0,0,0,0.5)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	footerText: {
		textAlign: 'center'
	},
	link: {
		color: theme.palette.common.blue3
	},
	logo: {
		width: 100,
		padding: theme.spacing(0.5),
		fill: theme.palette.primary.dark
	},
	navButton: {
		fontWeight: 700,
		marginLeft: theme.spacing(5),
		borderColor: theme.palette.text.primary,
		color: theme.palette.text.primary
	},
	selected: {
		borderColor: theme.palette.secondary.main,
		color: theme.palette.secondary.main
	},
	drawer: {
		// backgroundColor: 'rgba(255,247,236,.9)',
		width: 150
	},
	drawerNavButton: {
		color: theme.palette.secondary.main,
		'&.Mui-selected': {
			backgroundColor: theme.palette.secondary.light,
			color: '#fff',
			'& .MuiListItemIcon-root': {
				color: theme.palette.common.white
			}
		},
		'& .MuiListItemIcon-root': {
			color: theme.palette.text.primary
		}
	}
}));

export default styles;
