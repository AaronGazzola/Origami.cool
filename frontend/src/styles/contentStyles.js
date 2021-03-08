import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(1)
	},
	paper: {
		padding: theme.spacing(2)
	},
	text: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		'&:last-of-type': {
			marginBottom: theme.spacing(1)
		}
	},
	button: {
		fontWeight: 700,
		color: theme.palette.secondary.main
	},
	error: {
		color: theme.palette.error.main
	},
	divider: {
		margin: theme.spacing(1, 0)
	},
	address: {
		marginBottom: -theme.spacing(0.7),
		marginLeft: theme.spacing(1)
	},
	buttonContainer: {
		marginTop: theme.spacing(1)
	},
	full: {
		width: '100%',
		height: '100%'
	},
	hero: {
		position: 'relative',
		overflow: 'hidden',
		width: '100vw',
		height: '40vw',
		backgroundImage: 'url(/images/bull1.jpg)',
		backgroundPosition: '0 38%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		'& div': {
			width: '100%',
			height: '100%',
			background:
				'linear-gradient(0deg, rgba(255,250,240,1) 0%,rgba(255,250,240,0) 15%, rgba(255,250,240,0) 75%, rgba(255,250,240,.5)  85%, rgba(255,250,240,1) 100%)'
		},
		'& h1': {
			color: 'rgba(255,250,240,1)',
			fontSize: '8vw',
			position: 'absolute',
			top: '0%',
			left: '50%',
			transform: 'translateX(-50%)'
		}
	}
}));

export default styles;
