import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
	name: {
		type: String,
		default: null,
	},
	description: {
		type: String,
		default: null,
	},
	price: {
		type: Number,
		default: null,
	},
	currency: {
		type: String,
		default: null,
	},
	imageURL: {
		type: String,
		default: null,
		match: [/^https?:\/\//, 'Image URL must start with http or https!']
	},
	availability: { // TODO: This property is not included on scrapper make selector for this on scrapper
		type: Boolean,
		default: null,
	},
	amazonUrl: {
		type: String,
		required: [true, 'Amazon URL is required!'],
		match: [/^https?:\/\//, 'Amazon URL must start with http or https!']
	},
	rating: {
		type: Number,
		default: null,
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required']
	}
}, { timestamps: true });

// Create uniqueness product for each user
productSchema.index({ amazonUrl: 1, owner: 1 }, { unique: true });

const Product = model('Product', productSchema);

export { Product };