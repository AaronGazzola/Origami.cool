import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { getTheme } from 'styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'actions/userActions';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from 'styles/appStyles';
import HomeScreen from 'screens/HomeScreen';
import AuthScreen from 'screens/AuthScreen';
import ProfileScreen from 'screens/ProfileScreen';
import PageNotFoundScreen from 'screens/PageNotFoundScreen';
import VerifyUserScreen from 'screens/VerifyUserScreen';
import ResetPasswordScreen from 'screens/ResetPasswordScreen';
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen';

const useStyles = styles;

const theme = getTheme();

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.userData);
	const { user, isAuth } = userData;

	useEffect(() => {
		if (!user?.isVerified) {
			dispatch(logoutAction());
		}
	}, [user, dispatch]);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<main className={classes.main}>
					{isAuth && user.isVerified && user.isAdmin ? (
						// Admin routes
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Redirect from='/login' exact to='/profile' />
							<Redirect from='/verify' to='/profile' />
							<Route path='/profile' exact component={ProfileScreen} />
							<Redirect from='/resetpassword' to='/profile' />
							<Redirect from='/forgotpassword' exact to='/profile' />
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					) : isAuth && user.isVerified ? (
						// Private routes
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Redirect from='/login' exact to='/profile' />
							<Redirect from='/verify' to='/profile' />
							<Route path='/profile' exact component={ProfileScreen} />
							<Redirect from='/resetpassword' to='/profile' />
							<Redirect from='/forgotpassword' exact to='/profile' />
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					) : (
						// Public routes
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Route path='/login' exact component={AuthScreen} />
							<Redirect from='/profile' exact to='/login' />
							<Route path='/verify/:token' component={VerifyUserScreen} />
							<Route
								path='/resetpassword/:token'
								component={ResetPasswordScreen}
							/>
							<Route
								path='/forgotpassword'
								exact
								component={ForgotPasswordScreen}
							/>
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					)}
				</main>
				<Footer />
			</ThemeProvider>
		</Router>
	);
};

export default App;
