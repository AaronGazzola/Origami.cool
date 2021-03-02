import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from 'styles/appStyles';

const useStyles = styles;

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<div>
				<Button component={Link} to='/about' size='small' color='secondary'>
					About
				</Button>
				<Button component={Link} to='/contact' size='small' color='secondary'>
					Contact
				</Button>
				<Button component={Link} to='/terms' size='small' color='secondary'>
					Terms &amp; Conditions
				</Button>
			</div>
			<Typography className={classes.footerText} variant='caption'>
				Copyright &copy; {new Date().getFullYear()}{' '}
				<a
					href='https://www.apexapps.dev'
					target='_blank'
					rel='noreferrer'
					className={classes.link}
				>
					Apex Apps
				</a>
			</Typography>
			<Typography className={classes.footerText} variant='caption'>
				Designed and Developed by&nbsp;
				<a
					href='https://www.apexapps.dev'
					target='_blank'
					rel='noreferrer'
					className={classes.link}
				>
					Apex Apps
				</a>
			</Typography>
		</footer>
	);
};

export default Footer;
