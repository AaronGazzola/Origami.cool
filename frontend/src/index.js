import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'styles/style.css';
if (/*@cc_on!@*/ false || !!document.documentMode) {
	ReactDOM.render(
		<p className='ie'>
			Internet Explorer is not supported by this web app, please use a modern
			browser such as{' '}
			<a href='https://www.google.com/chrome/' target='_blank' rel='noopener'>
				Google Chrome
			</a>{' '}
			or{' '}
			<a
				href='https://www.mozilla.org/en-US/firefox/download/'
				target='_blank'
				rel='noopener'
			>
				Firefox
			</a>
		</p>,
		document.getElementById('root')
	);
} else {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
}
