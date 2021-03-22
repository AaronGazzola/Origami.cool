import { Paper, Typography } from '@material-ui/core';
import useStyles from 'styles/contentStyles';
import React from 'react';

const AboutScreen = () => {
	const classes = useStyles();
	return (
		<>
			<Typography variant='h1' className={classes.title}>
				About
			</Typography>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					The Mission
				</Typography>
				<Typography className={classes.text}>
					Origami.cool is an elegant, powerful, and <strong>functional</strong>{' '}
					eCommerce web application intended to demonstrate my skill as a full
					stack javascript web app developer.
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Not your average app!
				</Typography>
				<Typography className={classes.text}>
					This website was not created using Shopify, SquareSpace or any other
					website-builder. I wrote this web app with custom code, front to back.
				</Typography>
				<Typography className={classes.text}>
					This means that anything can be modified or added without limitation.
				</Typography>
				<Typography className={classes.text}>
					If you've seen it online, I can make it happen.
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<a
					href='https://www.apexapps.dev'
					target='_blank'
					rel='noreferrer'
					className={classes.link}
				>
					<Typography variant='h5' className={classes.subTitle}>
						Apex Apps
					</Typography>
				</a>
				<Typography className={classes.text}>
					If you need any kind of web application (not just eCommerce), visit{' '}
					<a
						href='https://www.apexapps.dev'
						target='_blank'
						rel='noreferrer'
						className={classes.link}
					>
						Apex Apps
					</a>
				</Typography>
			</Paper>
			<a
				href='https://www.apexapps.dev'
				target='_blank'
				rel='noreferrer'
				className={classes.link}
			>
				<img
					className={classes.shadow}
					src='./images/apex-apps-logo.png'
					alt='Apex Apps logo'
				/>
			</a>
		</>
	);
};

export default AboutScreen;
