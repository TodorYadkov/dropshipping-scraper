import joi from 'joi';
import { USER_ROLES } from '../environments/userRoles.js';

const validateProductSchema = joi.object({
	name: joi.string().required().trim().max(500),

	description: joi.string().required().trim(),

	price: joi.number().required(),

	imagesURL: joi.string().required().trim(),

	availability: joi.boolean().required(),

	owner: joi.string().required()
});

const validateRegisterSchema = joi.object({
	name: joi.string().required().trim().max(50),

	email: joi.string().required().trim().email(),

	password: joi.string().required().trim().min(8).max(20).lowercase(1).uppercase(1),

	role: joi.any().valid(...Object.values(USER_ROLES))
});

const validateLoginSchema = joi.object({
	email: joi.string().required().trim().email(),

	password: joi.string().required().trim().min(8).max(20).lowercase(1).uppercase(1),
});

export { validateProductSchema, validateRegisterSchema, validateLoginSchema };
