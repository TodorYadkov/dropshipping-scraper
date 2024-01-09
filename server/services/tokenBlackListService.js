import { TokenBlackList } from '../models/TokenBlacklist.js';

const getTokensBlackList = async () => TokenBlackList.find({}, 'accessToken');

const addTokenToBlackList = async (token) => TokenBlackList.create(token);

export {
    getTokensBlackList,
    addTokenToBlackList
};
