import { multiBrowser } from "../constants/constants.js";
import { getLink } from "../services/dataService.js";

export async function fetchDataFromServer() {
    try {
        const productFromServer = await getLink();

        // Create a new tab
        multiBrowser.tabs.create({ url: productFromServer.amazonUrl, active: false });

        return productFromServer;
    } catch (error) {
        console.error('Error fetching data from server:', error);
    };
}