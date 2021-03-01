import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
		isAdmin: true,
		isValid: true
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
		isValid: true
	},
	{
		name: 'Jane Doe',
		email: 'jane@example.com',
		password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
		isValid: true
	}
];

export default users;
