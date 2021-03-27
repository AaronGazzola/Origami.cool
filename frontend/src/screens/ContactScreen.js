import { Paper, Typography, Grid } from '@material-ui/core';
import { GitHub, Twitter, Email } from '@material-ui/icons';
import useStyles from 'styles/contentStyles';
import React from 'react';

const AboutScreen = () => {
	const classes = useStyles();
	return (
		<>
			<Typography variant='h1' className={classes.title}>
				Contact
			</Typography>
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
					This website is owned and opperated by Aaron Gazzola via{' '}
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

			<Grid container className={classes.divider2} justify='center'>
				<Typography
					variant='h4'
					className={classes.subTitle3}
					style={{ color: '#000' }}
				>
					Find Me Online:
				</Typography>
			</Grid>
			<Grid
				item
				container
				alignItems='center'
				justify='space-between'
				className={classes.icons}
			>
				<a
					href='https://github.com/AaronGazzola'
					target='_blank'
					rel='noreferrer'
				>
					<GitHub fontSize='large' />
				</a>
				<a
					href='https://twitter.com/aarongazzola'
					target='_blank'
					rel='noreferrer'
				>
					<Twitter fontSize='large' />
				</a>
				<a href='mailto: aaron@apexapps.dev'>
					<Email fontSize='large' />
				</a>
			</Grid>
			<Grid
				item
				container
				alignItems='center'
				justify='center'
				className={classes.email}
			>
				<a href='mailto: aaron@apexapps.dev'>
					<Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}>
						Aaron@ApexApps.dev
					</Typography>
				</a>
			</Grid>
		</>
	);
};

export default AboutScreen;
