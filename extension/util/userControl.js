import { multiBrowser, timeToFetchExtensionStatus, tokenName } from "../constants/constants.js";
import { login, logout } from "../services/authService.js";
import { serverStopExtension } from "../services/dataService.js";
import { closeAllOpenTabs } from "./autoCloseTabs.js";
import { removeData, setData } from "./storageActions.js";

// Login function
export const userLogin = async (userData) => {
    try {
        const loggedUserData = await login(userData);
        await setData({ [tokenName]: loggedUserData });

        // Set up the alarm to trigger extensionStatusAlarm
        multiBrowser.alarms.create('extensionStatusAlarm', { periodInMinutes: timeToFetchExtensionStatus });

        // After successful login send the user information to popup so the HTML can be updated with user information
        multiBrowser.runtime.sendMessage({ message: 'successfulLogin', userData: loggedUserData });

    } catch (error) {
        multiBrowser.runtime.sendMessage({ message: 'errorServerLogin', error: error.message });
    }
};

// Logout function
export const userLogout = async () => {
    try {
        // Clear all alarms
        multiBrowser.alarms.clear('fetchDataAlarm');
        multiBrowser.alarms.clear('extensionStatusAlarm');

        await setData({ isScriptRunning: false });

        await Promise.allSettled([logout(), serverStopExtension()]);

        await removeData([tokenName]);

        multiBrowser.runtime.sendMessage({ message: 'successfulLogout' });

        await closeAllOpenTabs();
    } catch (error) {
        await removeData([tokenName]);
    }
};