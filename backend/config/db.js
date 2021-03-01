import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			process.env.NODE_ENV === 'production'
				? process.env.MONGO_URI_PROD
				: process.env.MONGO_URI_DEV,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true
			}
		);
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (err) {
		console.error(`Error: ${err.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDB;
