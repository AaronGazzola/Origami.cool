import nodemailer from 'nodemailer';
import useHtmlTemplate from './useHtmlTemplate.js';

const sendEmail = async options => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST_DEV,
		port: process.env.SMTP_PORT_DEV,
		auth: {
			user: process.env.SMTP_EMAIL_DEV,
			pass: process.env.SMTP_PASSWORD_DEV
		}
	});

	const [subject, html] = useHtmlTemplate(options);

	const message = {
		from: `${process.env.FROM_NAME_DEV} <aaron@origami.cool>`,
		to: options.user.email,
		subject,
		html
	};

	const info = await transporter.sendMail(message);

	console.log('Message sent: %s', info.messageId);
};

export default sendEmail;

// 	// create reset url
// 	const verifyUrl = `${req.protocol}://${
// 		process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:3000'
// 	}/verify/${verifyToken}`;

// 	const message = `
// 	<!DOCTYPE html>
// <html lang="en">
// 	<p>Please follow the link below to verify your account</p></br> <a href='${verifyUrl}'>Verify Account</a></html>`;
