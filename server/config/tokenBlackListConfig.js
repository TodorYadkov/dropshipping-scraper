import { getBlackListTokens } from "../util/getBlackListTokens.js";

export default async () => {
    const blackListState = new Set();
    await getBlackListTokens(blackListState);

    setInterval(async () => {
        try {
            await getBlackListTokens(blackListState);
        } catch (error) {
            console.error('Error refreshing token blacklist:', error);
        }

    }, 1800000);

    return blackListState;
};