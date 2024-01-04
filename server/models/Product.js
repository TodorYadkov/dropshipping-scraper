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
	availability: {
		type: String,
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
	error: {
		type: String,
		default: null
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required']
	}
}, { timestamps: true });

// Create uniqueness product for each user
productSchema.index({ amazonUrl: 1, owner: 1 }, { unique: true });

// Define a pre-save middleware to modify the updatedAt field
productSchema.pre('save', function (next) {
	// Check if the document is newly created
	if (this.isNew) {
		// Set updatedAt to default timestamp
		this.updatedAt = new Date(null);
	}

	next();
});

const Product = model('Product', productSchema);

export { Product };