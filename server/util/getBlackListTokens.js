import { getTokensBlackList } from '../services/tokenBlackListService.js';

export async function getBlackListTokens(blackListState) {
	try {
		const rawTokens = await getTokensBlackList();

		rawTokens.forEach((t) => {
			const accessToken = t.accessToken;
			if (!blackListState.has(accessToken)) {
				blackListState.add(accessToken);
			}
		});

		return blackListState;
	} catch (error) {
		console.error('Error from token black list config: ', error);
	}
}
