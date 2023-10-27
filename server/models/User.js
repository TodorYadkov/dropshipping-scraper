import { Schema, model } from 'mongoose';
import { USER_ROLES } from '../environments/userRoles.js';

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required!']
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
        unique: true,
        match: [/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,20}$/, 'Email is not valid!']
	},
	password: {
		type: String,
		required: [true, 'Password is required!']
	},
    role: {
        type: String,
        required: [true, 'Role is required!'],
        enum: {
            values: [...Object.values(USER_ROLES)],
            message: '{VALUE} is not supported!'
        },
        default: USER_ROLES.USER
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

export { User };