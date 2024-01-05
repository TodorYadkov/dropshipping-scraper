import { useContext } from 'react';

import { AppStateContext } from '../contexts/AppStateContext.jsx';

export const useAppSateContext = () => {
	const context = useContext(AppStateContext);
	return context;
};