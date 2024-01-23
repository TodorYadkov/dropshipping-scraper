import { setData } from "./storageActions.js";
import { multiBrowser, timeToFetchProduct } from "../constants/constants.js";
import { serverStartExtension, serverStopExtension } from "../services/dataService.js";
import { closeAllOpenTabs } from "./autoCloseTabs.js";

// Start extension
export const startExtension = async () => {
    await setData({ isScriptRunning: true, activeTabs: [] });

    await serverStartExtension();

    // Set up the alarm to trigger fetchDataFromServer
    multiBrowser.alarms.create('fetchDataAlarm', { periodInMinutes: timeToFetchProduct });
};

// Stop extension
export const stopExtension = async () => {
    // Clear the alarm when the script is stopped
    multiBrowser.alarms.clear('fetchDataAlarm');

    // Stop extension on server
    await serverStopExtension();

    // Change button state
    await setData({ isScriptRunning: false });

    await closeAllOpenTabs();
};