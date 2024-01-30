import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext.jsx';

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	return context;
};