import { makeStyles } from '@material-ui/core/styles';

const appBarHeight = 100;
const footerHeight = 84;

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
		// backgroundColor: theme.palette.common.tan2
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
		// backgroundColor: theme.palette.common.tan2,
		background: 'transparent',
		boxShadow: '0 6px 9px 7px rgba(0,0,0,0.5)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		padding: theme.spacing(1)
	},
	footerText: {
		textAlign: 'center'
	},
	link: {
		color: theme.palette.secondary.main
	},
	logo: {
		width: 100,
		padding: theme.spacing(0.5),
		fill: theme.palette.primary.dark
	},
	navButton: {
		fontWeight: 700,
		marginLeft: theme.spacing(5),
		border: `1px solid transparent`,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		'&:first-of-type': {
			marginLeft: theme.spacing(6)
		}
	},
	selected: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`
	},
	drawer: {
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
			color: theme.palette.secondary.main
		}
	}
}));

export default styles;
