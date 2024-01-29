import { Schema, Types, model } from 'mongoose';

const extensionSchema = new Schema({
    extensionName: {
        type: String,
        required: [true, 'Extension name is required']
    },
    isWork: {
        type: Boolean,
        default: false
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    isWorkBrowser: {
        type: Boolean,
        default: false
    },
    accessToken: {
        type: String,
        default: null
    },
    error: {
        type: String,
        default: null
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },

}, { timestamps: true });

// Create uniqueness product for each user
extensionSchema.index({ extensionName: 1, owner: 1 }, { unique: true });

const Extension = model('Extension', extensionSchema);

export { Extension };