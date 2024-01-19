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
    avatarURL: {
        type: String,
        match: [/^https?:\/\//, 'Image URL must start with http or https!'],
        default: null
    },
    avatarId: {
        type: String,
        default: null
    },
    role: {
        type: String,
        required: [true, 'Role is required!'],
        enum: {
            values: [...Object.values(USER_ROLES)],
            message: '{VALUE} is not supported!'
        },
        default: USER_ROLES.USER
    },
    isExtension: {
        type: Boolean,
        default: false
    },
    extensionsName: [{
        type: String,
        minlength: [5, 'Extension name must be at least 5 characters!'],
        maxlength: [100, 'Extension name must be less than 100 characters!'],
        default: null,
        validator: async function (value) {
            // Custom validator to check for unique names within the array
            const user = this.parent(); // Access the parent document (User document)
            const existingExtensions = user.extensionsName || [];

            // Check if the new name does not already exist in the array
            return !existingExtensions.includes(value);
        },
        message: 'Extension name must be unique within the array!'
    }]

}, { timestamps: true });

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

export { User };