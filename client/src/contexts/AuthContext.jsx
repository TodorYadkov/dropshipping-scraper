import { createContext } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { USER_ROLES } from '../util/constants.js';

export const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
	const { currentUserData, setUserState, clearUserState } = useLocalStorage();

	const values = {
		clearUserState,
		setUserState,
		currentUserData,
		isAuthenticated: !!currentUserData?.accessToken,
		accessToken: currentUserData ? currentUserData.accessToken : null,
		isAdmin: currentUserData?.userDetails?.role === USER_ROLES.ADMIN,
	};

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
};
