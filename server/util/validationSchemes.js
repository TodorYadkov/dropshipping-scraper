import joi from 'joi';
import { USER_ROLES } from '../environments/userRoles.js';

const validateProductSchema = joi.object({
	name: joi.string().allow(null).trim().max(500).optional(),

	description: joi.string().allow(null).trim().optional(),

	price: joi.number().allow(null).optional(),

	currency: joi.string().allow(null).trim().optional(),

	imagesURL: joi.string().allow(null).trim().optional(),

	availability: joi.boolean().allow(null).optional(),

	amazonUrl: joi.string().trim().custom(amazonUrlValidator).required(),

	rating: joi.number().allow(null).optional(),

	error: joi.string().allow(null).trim().optional(),
});

// Schema for updating a product to skip unknown properties -> exclude the system properties from mongoDB
const updateProductSchema = validateProductSchema.options({ stripUnknown: true });

const validateRegisterSchema = joi.object({
	name: joi.string().required().trim().max(50),

	email: joi.string().required().trim().email().lowercase(),

	password: joi.string().required().trim().min(8).max(20),

	// This doesn't work - password: joi.string().required().trim().min(8).max(20).lowercase(1).uppercase(1),
	// TODO: If we want to add more complex password validation without any other library, we can use this regex
	// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
	// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

	role: joi.any().valid(...Object.values(USER_ROLES))
});

const validateLoginSchema = joi.object({
	email: joi.string().required().trim().email().lowercase(),

	password: joi.string().required().trim().min(8).max(20),
	// Same as above if we want complex password validation

	extensionName: joi.string().trim().min(5).max(100).optional(),

	isExtension: joi.boolean().optional()
});


function amazonUrlValidator(value, helpers) {
	// Regular expression to match Amazon URLs
	const amazonUrlRegex = /^https?:\/\/(www\.)?amazon\..*$/;

	if (amazonUrlRegex.test(value)) {
		// If the URL is from Amazon, return the value
		return value;
	} else {
		// If the URL is not from Amazon, throw an error
		throw new Error('Invalid Amazon URL');
	}
};

export {
	validateProductSchema,
	updateProductSchema,
	validateRegisterSchema,
	validateLoginSchema,
};
