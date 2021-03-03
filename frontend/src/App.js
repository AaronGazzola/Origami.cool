import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { getTheme } from 'styles/theme';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from 'styles/appStyles';
import HomeScreen from 'screens/HomeScreen';
import AuthScreen from 'screens/AuthScreen';
import PageNotFoundScreen from 'screens/PageNotFoundScreen';

const useStyles = styles;

const theme = getTheme();

const App = () => {
	const classes = useStyles();
	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Header />
					<main className={classes.main}>
						<Switch>
							<Route path='/' exact component={HomeScreen} />
							<Route path='/login' exact component={AuthScreen} />
							<Route path='/' component={PageNotFoundScreen} />
						</Switch>
					</main>
					<Footer />
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

export default App;
