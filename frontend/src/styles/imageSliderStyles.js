import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		width: '100%',
		height: 'min-content',
		padding: theme.spacing(0, 4),
		overflow: 'hidden'
	},
	active: {
		position: 'relative',
		paddingTop: '75%',
		width: '100%',
		'& img': {
			maxWidth: '100%',
			maxHeight: '100%',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%,-50%)'
		}
	},
	listWindowFrame: {
		position: 'relative'
	},
	listWindow: {
		position: 'relative',
		width: '100%',
		paddingTop: '25%',
		overflow: 'hidden'
	},
	listRow: {
		display: 'flex',
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		transition: 'transform 1s ease',
		backfaceVisibility: 'hidden'
	},
	listImageContainer: {
		padding: theme.spacing(1),
		height: '100%',
		overflow: 'visible'
	},
	listImage: {
		position: 'relative',
		height: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	activeButton: {
		zIndex: 3,
		position: 'absolute',
		top: '50%',
		background: 'rgba(43,83, 112,.3)',
		color: theme.palette.background.default,
		'&:hover': {
			background: 'rgba(43,83, 112,.5)',
			color: theme.palette.background.default
		}
	},
	back: {
		transform: 'translate(-50%, -50%)',
		left: 0
	},
	next: {
		transform: 'translate(50%, -50%)',
		right: 0
	},
	border: {
		borderTop: `1px solid ${theme.palette.secondary.main}`
	},
	slideLeft: {
		zIndex: 2,
		animation: '$slideLeft 1s ease forwards'
	},
	slideRight: {
		zIndex: 2,
		animation: '$slideRight 1s ease forwards'
	},
	fadeOut: {
		animation: '$fadeOut 1s ease-out forwards'
	},
	'@keyframes slideLeft': {
		'0%': {
			transform: 'translate(50%, -50%)'
		},
		'100%': {
			transform: 'translate(-50%, -50%)'
		}
	},
	'@keyframes slideRight': {
		'0%': {
			transform: 'translate(-150%, -50%)'
		},
		'100%': {
			transform: 'translateX(-50%, -50%)'
		}
	},
	'@keyframes fadeOut': {
		'0%': {
			opacity: 1
		},
		'100%': {
			opacity: 0
		}
	}
}));

export default styles;
