import { TokenBlackListSchema } from '../models/TokenBlacklist.js';

const getTokensBlackList = async () => TokenBlackListSchema.find({}, 'accessToken');

const addTokenToBlackList = async (token) => TokenBlackListSchema.create(token);

export { getTokensBlackList, addTokenToBlackList };
