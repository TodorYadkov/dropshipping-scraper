import { getBlackListTokens } from '../util/getBlackListTokens.js';

let intervalId;

export async function tokenBlackListConfig() {
	const blackListState = new Set();
	await getBlackListTokens(blackListState);

	intervalId = setInterval(async () => {
		try {
			await getBlackListTokens(blackListState);
		} catch (error) {
			console.error('Error refreshing token blacklist: ', error);
		}
	}, 1800000);

	return blackListState;
}

export function stopBlackListInterval() {
	clearInterval(intervalId);
}