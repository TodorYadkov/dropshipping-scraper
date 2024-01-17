import { multiBrowser } from '../constants/constants.js';
import { getLink } from '../services/dataService.js';
import { getData, setData } from './storageActions.js';

export function fetchDataFromServerAndScrape() {
	return new Promise(async (resolve, reject) => {
		try {
			const productFromServer = await getLink();
			// Reset error on product
			productFromServer.error = null;

			// Check if there's no Amazon URL (early exit)
			if (!productFromServer['amazonUrl']) {
				// Clear the alarm when the product doesn't have the amazonUrl property
				multiBrowser.alarms.clear('fetchDataAlarm');
				await setData({ isScriptRunning: false, activeTabs: [] });

				reject({ message: 'No added products for scraping' });
				return;
			}

			// Array to store scraped data from different platforms
			const scrapedDataArray = [];

			// Helper function to handle each platform
			const handlePlatformWithDelay = async (url, platform, delay) => {
				let timeoutId;

				return new Promise((resolvePlatform) => {

					// Create a new tab after the specified delay
					timeoutId = setTimeout(() => {
						multiBrowser.tabs.create({
							url: url,
							active: false
						}, async (tab) => {
							const { activeTabs } = await getData(['activeTabs']);
							activeTabs.push(tab.id);
							await setData({ activeTabs });

							// Listen for messages from content script
							const listener = async (message, sender, sendResponse) => {
								switch (message.message) {
									case 'doneScraping': {
										// Combine the platform and product data
										scrapedDataArray.push({ [platform]: message.product });

										// Close tab
										const { activeTabs } = await getData(['activeTabs']);
										if (activeTabs.includes(sender.tab.id)) {
											multiBrowser.tabs.remove(sender.tab.id);

											activeTabs.splice(activeTabs.indexOf(sender.tab.id), 1);
											await setData({ activeTabs });
										}

										// Remove the listener for current product
										multiBrowser.runtime.onMessage.removeListener(listener);

										// Clear the timeout for current product
										clearTimeout(timeoutId);

										// Resolve the promise for this platform
										resolvePlatform();
										break;
									}

									case 'contentError': {
										// Handle content error
										if (productFromServer.error === null) {
											productFromServer.error = `Error scraping ${platform}: ${message.contentError}`;
										} else {
											// Concatenate errors for all platforms 
											productFromServer.error += ` Error scraping ${platform}: ${message.contentError}`;
										}


										// Close tab
										const { activeTabs } = await getData(['activeTabs']);
										if (activeTabs.includes(sender.tab.id)) {
											multiBrowser.tabs.remove(sender.tab.id);

											activeTabs.splice(activeTabs.indexOf(sender.tab.id), 1);
											await setData({ activeTabs });
										}

										// Remove the listener for current product
										multiBrowser.runtime.onMessage.removeListener(listener);

										// Clear the timeout for current product
										clearTimeout(timeoutId);

										// Resolve the promise for this platform
										resolvePlatform();
										break;
									}
								}
							};

							// Listen for messages from content script
							multiBrowser.runtime.onMessage.addListener(listener);
						});

					}, delay);
				});
			};

			// Fetch data for each platform
			const fetchedDataPromises = {
				amazonPromise: productFromServer['amazonUrl'] ? handlePlatformWithDelay(productFromServer['amazonUrl'], 'amazon', 500) : Promise.resolve(),
				ebayPromise: productFromServer['ebayUrl'] ? handlePlatformWithDelay(productFromServer['ebayUrl'], 'ebay', 5000) : Promise.resolve(),
			};

			// Wait for all promises to resolve
			await Promise.all(Object.values(fetchedDataPromises));

			// Combine the results for different platforms
			const combinedResults = scrapedDataArray.reduce((combined, result) => ({ ...combined, ...result }), {});

			// Combine combinedResults with productFromServer and updated needed values
			const dataToSendOnServer = { ...productFromServer, ...combinedResults['amazon'], ...combinedResults['ebay'] };

			// Resolve promise with updated product details
			resolve(dataToSendOnServer);

		} catch (error) {
			console.error('Error fetching data from server: ', error.message);
			reject({ message: error.message });
		}
	});
}