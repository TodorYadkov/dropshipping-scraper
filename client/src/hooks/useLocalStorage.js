import { useState } from 'react';

import { TOKEN_NAME } from '../util/constants.js';

export const useLocalStorage = () => {
    const [currentUserData, setCurrentUserData] = useState(() => {
        try {
            const localStorageData = JSON.parse(localStorage.getItem(TOKEN_NAME));
            if (localStorageData) {
                return localStorageData;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
        return null;
    });

    function setUserState(userData) {
        if (userData) {
            localStorage.setItem(TOKEN_NAME, JSON.stringify(userData));
            setCurrentUserData(userData);
        }
    }

    function clearUserState() {
        localStorage.removeItem(TOKEN_NAME);
        setCurrentUserData(null);
    }

    return {
        currentUserData,
        setUserState,
        clearUserState
    };
}