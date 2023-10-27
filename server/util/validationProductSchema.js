import joi from 'joi';

const validateProductSchema = joi.object({
	name: joi.string().max(500).required().trim(),

	description: joi.string().required().trim(),

	price: joi.number().required(),

	imagesURL: joi.string().required().trim(),

	availability: joi.boolean()
});

export { validateProductSchema };
