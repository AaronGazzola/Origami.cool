import { createMuiTheme } from '@material-ui/core/styles';

const origamiPrimary = 'rgba(175,125, 60,1)';
const origamiSecondary = 'rgba(43,83, 112,1)';

export const getTheme = () =>
	createMuiTheme({
		palette: {
			primary: {
				main: origamiPrimary,
				contrastText: 'rgba(255,250,240,1)'
			},
			secondary: {
				main: origamiSecondary,
				contrastText: 'rgba(255,250,240,1)'
			},
			success: {
				main: 'rgba(38,153,118,1)'
			},
			error: {
				main: '#af433b'
			},
			common: {
				orange1: 'rgba(203, 84, 20,1)',
				orange2: 'rgba(254,155,103,1)',
				orange3: 'rgba(231,118, 58,1)',
				orange4: 'rgba(166, 61,  4,1)',
				orange5: 'rgba(126, 44,  0,1)',
				yellow1: 'rgba(203,131, 20,1)',
				yellow2: 'rgba(254,194,103,1)',
				yellow3: 'rgba(231,163, 58,1)',
				yellow4: 'rgba(166,102,  4,1)',
				yellow5: 'rgba(126, 76,  0,1)',
				blue1: 'rgba(23,75,133,1)',
				blue2: 'rgba(75,118,166,1)',
				blue3: 'rgba(47,96,151,1)',
				blue4: 'rgba(11,57,108,1)',
				blue5: 'rgba(5,41, 82,1)',
				blue6: 'rgba(43,83, 112,1)',
				green1: 'rgba(13,134,98,1)',
				green2: 'rgba(68,168,138,1)',
				green3: 'rgba(38,153,118,1)',
				green4: 'rgba(3,110,77,1)',
				green5: 'rgba(0,83,58,1)',
				tan0: 'rgba(255,250,250,1)',
				tan1: 'rgba(228,198,159,1)',
				tan2: 'rgba(255,247,236,1)',
				tan3: 'rgba(255,235,210,1)',
				tan4: 'rgba(192,155,106,1)',
				tan5: 'rgba(158,118, 66,1)',
				tan6: 'rgba(174,125, 60,1)',
				tan7: 'rgba(255,219,173,1)',
				tan8: 'rgba(217,170,111,1)',
				tan9: 'rgba(133, 86, 24,1)',
				tan10: 'rgba(90, 51,  1,1)',
				purple1: 'rgba(118,119,159,1)',
				purple2: 'rgba(206,206,220,1)',
				purple3: 'rgba(159,160,187,1)',
				purple4: 'rgba(83, 84,134,1)',
				purple5: 'rgba(56, 57,110,1)',
				purple6: 'rgba(54, 55,122,1)',
				purple7: 'rgba(131,132,181,1)',
				purple8: 'rgba(88, 90,151,1)',
				purple9: 'rgba(28, 30, 93,1)',
				purple10: 'rgba(10, 11, 63,1)',
				teal1: 'rgba(110,158,136,1)',
				teal2: 'rgba(203,220,212,1)',
				teal3: 'rgba(153,186,171,1)',
				teal4: 'rgba(73,133,106,1)',
				teal5: 'rgba(46,109, 80,1)',
				teal6: 'rgba(42,120, 85,1)',
				teal7: 'rgba(122,180,153,1)',
				teal8: 'rgba(76,150,116,1)',
				teal9: 'rgba(17, 92, 58,1)',
				teal10: 'rgba(1, 62, 34,1)'
			},
			contrastThreshold: 3,
			tonalOffset: 0.2,
			background: {
				default: 'rgba(255,250,240,1)',
				paper: 'rgba(255,250,250,1)'
			},
			text: {
				primary: 'rgba(40,40,40,1)',
				secondary: 'rgba(150,150,150,1)'
			}
		},
		typography: {
			fontFamily: "'Nanum Gothic', sans-serif",
			h1: {
				fontFamily: "'Nixie One', sans-serif",
				fontSize: '3.5rem',
				color: 'rgba(90, 51,  1,1)'
			},
			h2: {
				fontFamily: "'Nixie One', sans-serif",
				fontSize: '3rem',
				color: 'rgba(90, 51,  1,1)'
			},
			h3: {
				fontFamily: "'Nixie One', sans-serif",
				fontSize: '2.5rem',
				color: 'rgba(90, 51,  1,1)'
			},
			h4: {
				fontFamily: "'Nixie One', sans-serif",
				fontSize: '2rem',
				color: 'rgba(90, 51,  1,1)'
			},
			h5: {
				fontWeight: 100,
				fontStyle: 'italic'
			}
		}
	});
