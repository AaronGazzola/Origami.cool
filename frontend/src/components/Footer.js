import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from 'styles/appStyles';

const useStyles = styles;

const links = [
	{
		name: 'About',
		path: '/about'
	},
	{
		name: 'Contact',
		path: '/contact'
	},
	{
		name: 'Terms & Conditions',
		path: '/terms'
	}
];

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<div>
				{links.map(link => (
					<Button
						component={Link}
						to={link.path}
						size='small'
						color='secondary'
						key={link.name}
						className={classes.footerButton}
					>
						{link.name}
					</Button>
				))}
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
