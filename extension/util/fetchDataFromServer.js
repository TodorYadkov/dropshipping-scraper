import { multiBrowser } from "../constants/constants.js";
import { getLink } from "../services/dataService.js";

export async function fetchDataFromServer() {
    try {
        const serverData = await getLink();
        
        multiBrowser.tabs.create({ url: serverData.url });

    } catch (error) {
        console.error('Error fetching data from server:', error);
    };
}