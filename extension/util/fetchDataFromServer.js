import { multiBrowser } from '../constants/constants.js';
import { getLink } from '../services/dataService.js';
import { getData, setData } from './storageActions.js';

export async function fetchDataFromServer() {
	try {
		const productFromServer = await getLink();

		if (!productFromServer['amazonUrl']) {
			// Clear the alarm when the script is stopped
			multiBrowser.alarms.clear('fetchDataAlarm');
			await setData({ isScriptRunning: false, activeTabs: [] });

			return {};
		}

		// Create a new tab
		multiBrowser.tabs.create({
			url: productFromServer.amazonUrl,
			active: false
		}, async (tab) => {
			const { activeTabs } = await getData(['activeTabs']);
			activeTabs.push(tab.id);

			await setData({ activeTabs });
		});

		return productFromServer;

	} catch (error) {
		console.error('Error fetching data from server: ', error);
	}
}