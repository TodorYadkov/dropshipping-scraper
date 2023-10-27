import { Schema, model } from 'mongoose';

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
	}
	//  TODO.. Add owner ID;
});

const Product = model('Product', productSchema);

export { Product } ;
