import { Schema, Types, model } from 'mongoose';

const tokenBlackListSchema = new Schema({
    accessToken: {
        type: String,
        required: [true, 'Access token is required']
    },
    extensionName: {
        type: String,
        default: 'React Client'
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    }

}, { timestamps: true });

tokenBlackListSchema.index({ accessToken: 1 });

const TokenBlackList = model('TokenBlackList', tokenBlackListSchema);

export { TokenBlackList };