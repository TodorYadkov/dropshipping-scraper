import joi from 'joi';

const validateProductSchema = joi.object({
	name: joi.string().allow(null).trim().max(500).optional(),

	description: joi.string().allow(null).trim().optional(),

	priceAmazon: joi.number().allow(null).optional(),

	priceEbay: joi.number().allow(null).optional(),

	currencyAmazon: joi.string().allow(null).trim().optional(),

	currencyEbay: joi.string().allow(null).trim().optional(),

	imagesURL: joi.string().allow(null).trim().optional(),

	availability: joi.string().allow(null).trim().optional(),

	amazonUrl: joi.string().trim().custom(amazonUrlValidator).required(),

	ebayUrl: joi.string().allow(null).trim().custom(ebayUrlValidator).optional(),

	rating: joi.number().allow(null).optional(),

	error: joi.string().allow(null).trim().optional(),
});

// Schema for updating a product to skip unknown properties -> exclude the system properties from mongoDB
const updateProductSchema = validateProductSchema.options({ stripUnknown: true });

const validateRegisterSchema = joi.object({
	name: joi.string().required().trim().max(50),

	email: joi.string().required().trim().email().lowercase(),

	password: joi.string().required().trim().min(8).max(20),

	extensionName: joi.string().required().trim().max(100),
});

const validateLoginSchema = joi.object({
	email: joi.string().required().trim().email().lowercase(),

	password: joi.string().required().trim().min(8).max(20),

	extensionName: joi.string().allow(null).trim().max(100).optional(),

	isExtension: joi.boolean().optional()
});

const validateResetPasswordSchema = joi.object({
	password: joi.string().required().trim().min(8).max(20),

	resetToken: joi.string().required().trim()
});

const validateUpdateProfileSchema = joi.object({
	name: joi.string().required().trim().max(50),

	email: joi.string().required().trim().email().lowercase(),

	uploadAvatar: joi.allow(null).optional()
});

const validateExtensionSchema = joi.object({
	extensionName: joi.string().required().trim().max(100),
});


function amazonUrlValidator(value) {
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

function ebayUrlValidator(value) {
	if (value) {
		// Regular expression to match eBay URLs
		const ebayUrlRegex = /^https?:\/\/(www\.)?ebay\..*$/;

		if (ebayUrlRegex.test(value)) {
			// If the URL is from eBay, return the value
			return value;
		} else {
			// If the URL is not from eBay, throw an error
			throw new Error('Invalid eBay URL');
		}
	}

	return value;
};

export {
	validateProductSchema,
	updateProductSchema,
	validateRegisterSchema,
	validateLoginSchema,
	validateResetPasswordSchema,
	validateUpdateProfileSchema,
	validateExtensionSchema,
};