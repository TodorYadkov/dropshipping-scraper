import { memo } from 'react';

import { AlertStopExtension } from '../Alerts/AlertStopExtension.jsx';
import { Modal } from './Modal.jsx';

export const StopExtensionModal = memo(({ toggleModal, extension }) => {
	return (
		<Modal
			title={'Stop Extension'}
			toggleModal={toggleModal}
			Content={() => <AlertStopExtension extension={extension} toggleModal={toggleModal} />}
		/>
	);
});

StopExtensionModal.displayName = 'StopExtensionModal';