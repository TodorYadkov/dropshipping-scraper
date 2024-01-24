import { memo } from 'react';

import { AlertStartExtension } from '../Alerts/AlertStartExtension.jsx';
import { Modal } from './Modal.jsx';

export const StartExtensionModal = memo(({ toggleModal, extension }) => {
	return (
		<Modal
			title={'Start Extension'}
			toggleModal={toggleModal}
			Content={() => (
				<AlertStartExtension
					extension={extension}
					toggleModal={toggleModal}
				/>
			)}
		/>
	);
});

StartExtensionModal.displayName = 'StartExtensionModal';
