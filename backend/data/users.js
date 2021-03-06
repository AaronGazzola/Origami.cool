import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
		isAdmin: true,
		isVerified: true,
		address: {
			street1: 'street 1',
			street2: 'street 2',
			city: 'city',
			state: 'state',
			postCode: 'post code'
		}
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
		isVerified: true
	},
	{
		name: 'Jane Doe',
		email: 'jane@example.com',
		password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
		isVerified: true
	}
];

export default users;
