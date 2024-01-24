import { multiBrowser, timeToFetchExtensionStatus, tokenName } from "../constants/constants.js";
import { login, logout } from "../services/authService.js";
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
export const userLogout = async (isExtensionLogout) => {
    try {
        // Clear all alarms
        multiBrowser.alarms.clear('fetchDataAlarm');
        multiBrowser.alarms.clear('extensionStatusAlarm');

        await setData({ isScriptRunning: false });

        await logout();

        await removeData([tokenName]);

        await closeAllOpenTabs();

        // Only if the logout is from extension to send message to popup
        if (isExtensionLogout) {
            multiBrowser.runtime.sendMessage({ message: 'successfulLogout' });
        }

    } catch (error) {
        await removeData([tokenName]);
    }
};