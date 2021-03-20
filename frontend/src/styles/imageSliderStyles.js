import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	container: {
		width: '100%',
		height: 'min-content',
		overflow: 'hidden',
		padding: theme.spacing(0, 4),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 3)
		}
	},
	active: {
		position: 'relative',
		paddingTop: '75%',
		width: '100%',
		margin: theme.spacing(1, 0),
		'& img': {
			maxWidth: '100%',
			maxHeight: '100%',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%,-50%)',
			backfaceVisibility: 'hidden'
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
		overflow: 'visible',
		position: 'relative'
	},
	listImage: {
		maxHeight: '100%',
		maxWidth: '100%',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%) scale(.9)',
		backfaceVisibility: 'hidden',
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
		// borderTop: `1px solid ${theme.palette.secondary.main}`
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
	},
	selector: {
		position: 'absolute',
		transition: 'transform 1s ease',
		backfaceVisibility: 'hidden',
		padding: theme.spacing(0, 1),
		'& div': {
			borderTop: `2px solid ${theme.palette.secondary.main}`
		}
	},
	firstImage: {
		zIndex: 2
	},
	progress: {
		zIndex: 4,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	hidden: {
		display: 'none'
	}
}));

export default styles;
