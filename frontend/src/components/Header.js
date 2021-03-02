import React, { useState } from 'react';
import clsx from 'clsx';
import {
	AppBar,
	Toolbar,
	Button,
	useMediaQuery,
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemText,
	Drawer,
	ListItemIcon
} from '@material-ui/core';
import {
	ShoppingCart,
	Person,
	Storefront,
	Menu,
	ChevronRight
} from '@material-ui/icons';
import styles from 'styles/appStyles';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const useStyles = styles;

const navItems = [
	{
		name: 'Shop',
		link: '/',
		icon: <Storefront />
	},
	{
		name: 'Cart',
		link: '/cart',
		icon: <ShoppingCart />
	},
	{
		name: 'Login',
		link: '/login',
		icon: <Person />
	}
];

const Header = () => {
	const classes = useStyles();
	const location = useLocation();
	const matchesXs = useMediaQuery(theme => theme.breakpoints.down('xs'));

	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	return (
		<>
			<AppBar className={classes.appBar} position='fixed' color='transparent'>
				<Toolbar className={classes.toolBar}>
					<Logo />
					{!matchesXs && (
						<div>
							{navItems.map(item => (
								<Button
									key={item.name}
									color='secondary'
									component={Link}
									to={item.link}
									className={
										location.pathname === item.link
											? clsx(classes.selected, classes.navButton)
											: classes.navButton
									}
									startIcon={item.icon}
								>
									{item.name}
								</Button>
							))}
						</div>
					)}
					{matchesXs && (
						<IconButton
							color='secondary'
							aria-label='open drawer'
							onClick={() => setDrawerIsOpen(true)}
						>
							<Menu fontSize='large' />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			{matchesXs && (
				<Drawer
					classes={{ paper: classes.drawer }}
					variant='temporary'
					anchor='right'
					open={drawerIsOpen}
					onClose={() => setDrawerIsOpen(false)}
				>
					<div>
						<IconButton onClick={() => setDrawerIsOpen(false)}>
							<ChevronRight color='primary' />
						</IconButton>
					</div>
					<Divider />
					<List disablePadding>
						{navItems.map(item => (
							<React.Fragment key={item.name}>
								<ListItem
									key={item.name}
									button
									component={Link}
									to={item.link}
									selected={location.pathname === item.link}
									onClick={() => setDrawerIsOpen(false)}
									className={classes.drawerNavButton}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.name} />
								</ListItem>
								<Divider />
							</React.Fragment>
						))}
					</List>
				</Drawer>
			)}
		</>
	);
};

export default Header;
