import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(1)
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.common.tan0,
		padding: theme.spacing(2)
	},
	text: {
		marginTop: theme.spacing(1)
	},
	divider: {
		marginTop: theme.spacing(1)
	},
	logoutButton: {
		alignSelf: 'flex-end',
		fontWeight: 700,
		color: theme.palette.error.main
	}
}));

export default styles;
