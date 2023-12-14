import { getLink } from "../services/dataService.js";

export async function fetchDataFromServer() {
    try {
        // Make a GET request to your RESTful API
        const serverData = await getLink();
        chrome.tabs.create({ url: serverData.url }, (tab) => {
            chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['contentScript.js'] })
                .catch(err => console.log(err));
        });
    } catch (error) {
        console.error('Error fetching data from server:', error);
    };

}