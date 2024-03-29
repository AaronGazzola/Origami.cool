import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		title: { type: String, required: true, maxlength: 75 },
		rating: { type: Number, required: true },
		comment: { type: String, required: true, maxlength: 300 },
		product: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Product'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
