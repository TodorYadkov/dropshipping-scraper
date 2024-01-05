import { Schema, Types, model } from 'mongoose';

const extensionStatus = new Schema({
    extensionName: {
        type: String,
        required: [true, 'Extension Name is required!']
    },
    isWork: {
        type: Boolean,
        default: false
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required!']
    }

}, { timestamps: true });

const ExtensionStatus = model('ExtensionStatus', extensionStatus);

export { ExtensionStatus };