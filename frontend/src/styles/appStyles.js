import { makeStyles } from '@material-ui/core/styles';

const appBarHeight = 100;
const footerHeight = 84;

const styles = makeStyles(theme => ({
	main: {
		margin: '0 auto',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(4),
		minHeight: `calc(100vh - ${appBarHeight + footerHeight}px)`,
		width: '100%',
		maxWidth: 1220,
		[theme.breakpoints.down('md')]: {
			maxWidth: 900
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: 600
		}
	},
	appBar: {
		height: appBarHeight,
		boxShadow: 'none'
	},
	toolBar: {
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	footer: {
		height: footerHeight,
		width: '100%',
		// backgroundColor: theme.palette.common.tan2,
		background: 'transparent',
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
	footerButton: {
		fontWeight: 800,
		marginLeft: theme.spacing(1),
		'&:first-of-type': {
			marginLeft: 0
		}
	},
	link: {
		color: theme.palette.secondary.main
	},
	logo: {
		width: 100,
		padding: theme.spacing(0.5),
		fill: theme.palette.primary.dark,
		[theme.breakpoints.up('sm')]: {
			marginLeft: -100
		}
	},
	navButton: {
		fontWeight: 800,
		marginLeft: theme.spacing(5),
		border: `1px solid transparent`,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		letterSpacing: 1,
		'&:last-of-type': {
			marginRight: theme.spacing(5)
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
