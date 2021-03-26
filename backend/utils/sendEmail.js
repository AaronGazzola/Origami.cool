import nodemailer from 'nodemailer';
import useHtmlTemplate from './useHtmlTemplate.js';

const sendEmail = async options => {
	const transporter = nodemailer.createTransport(
		process.env.NODE_ENV === 'production'
			? {
					service: process.env.SMTP_SERVICE_PROD,
					auth: {
						user: process.env.SMTP_USER_PROD,
						pass: process.env.SMTP_PASSWORD_PROD
					}
			  }
			: {
					host: process.env.SMTP_HOST_DEV,
					port: process.env.SMTP_PORT_DEV,
					auth: {
						user: process.env.SMTP_EMAIL_DEV,
						pass: process.env.SMTP_PASSWORD_DEV
					}
			  }
	);

	const [mailList, subject, html] = useHtmlTemplate(options);

	const message = {
		from: `${process.env.FROM_NAME_DEV} <${process.env.FROM_EMAIL_PROD}>`,
		to: mailList,
		subject,
		html
	};

	const info = await transporter.sendMail(message);

	console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
