import mongoose from 'mongoose';
import slugify from 'slugify';

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		title: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		name: {
			type: String,
			default: ''
		},
		images: [
			{
				path: {
					type: String,
					default: ''
				},
				label: {
					type: String,
					default: ''
				}
			}
		],
		description: {
			type: String,
			default: ''
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0
		},
		price: {
			type: Number,
			required: true,
			default: 0
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0
		},
		slug: {
			type: String,
			required: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
);

productSchema.pre('validate', function () {
	if (this.name) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
});

const Product = mongoose.model('Product', productSchema);

export default Product;
