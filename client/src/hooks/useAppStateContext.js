import { useContext } from 'react';

import { AppStateContext } from '../contexts/AppStateContext.jsx';

export const useAppStateContext = () => {
	const context = useContext(AppStateContext);
	return context;
};