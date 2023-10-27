import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required!']
	},
	description: {
		type: String,
		required: [true, 'Description is required!']
	},
	price: {
		type: Number,
		required: [true, 'Price is required!']
	},
	imagesURL: {
		type: String,
		required: [true, 'ImageURL is required!'],
		match: [/^https?:\/\//, 'Image URL must start with http or https!']
	},
	availability: {
		type: Boolean,
		required: [true, 'Availability is required!']
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required']
	}
});

const Product = model('Product', productSchema);

export { Product } ;
