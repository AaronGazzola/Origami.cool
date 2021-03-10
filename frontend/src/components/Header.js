import React, { useState, useEffect } from 'react';
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
import useStyles from 'styles/appStyles';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
	const classes = useStyles();
	const location = useLocation();
	const matchesXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
	const userData = useSelector(state => state.userData);
	const { isAuth, user } = userData;

	const navItems = [
		{
			name: 'Shop',
			link: '/',
			icon: <Storefront />,
			pages: ['/product']
		},
		{
			name: 'Cart',
			link: '/cart',
			pages: ['/cart', '/checkout'],
			icon: <ShoppingCart />
		},
		{
			name: isAuth ? 'Profile' : 'Log In',
			link: isAuth ? '/profile' : '/login',
			icon: <Person />
		}
	];

	// scroll to top on navigation
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {}, [user]);

	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	return (
		<>
			<AppBar className={classes.appBar} color='transparent' position='static'>
				<Toolbar className={classes.toolBar}>
					<Link to='/'>
						<Logo />
					</Link>
					{!matchesXs && (
						<div>
							{navItems.map(item => (
								<Button
									key={item.name}
									color='secondary'
									component={Link}
									to={item.link}
									className={
										item.pages?.filter(page =>
											location.pathname.startsWith(page)
										).length > 0 || location.pathname === item.link
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
