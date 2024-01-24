import { memo } from 'react';

import { AlertResetError } from '../Alerts/AlertResetError.jsx';
import { Modal } from './Modal.jsx';

export const ResetErrorExtensionModal = memo(({ toggleModal, extension }) => {
	return (
		<Modal
			title={'Clear Error'}
			toggleModal={toggleModal}
			Content={() => (
				<AlertResetError
					extension={extension}
					toggleModal={toggleModal}
				/>
			)}
		/>
	);
});

ResetErrorExtensionModal.displayName = 'ResetErrorExtensionModal';
