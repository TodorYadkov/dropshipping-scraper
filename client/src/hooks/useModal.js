import { useState } from 'react';

export const useModal = () => {
	const [isShownModal, setIsShownModal] = useState(false);
	const toggleModal = () => {
		setIsShownModal(!isShownModal);
	};

	return [isShownModal, toggleModal];
};
