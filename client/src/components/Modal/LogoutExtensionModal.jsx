import { memo } from 'react';

import { AlertLogoutExtension } from '../Alerts/AlertLogoutExtension.jsx';
import { Modal } from './Modal.jsx';

export const LogoutExtensionModal = memo(({ toggleModal, extension }) => {
	return (
		<Modal
			title={'Logout Extension'}
			toggleModal={toggleModal}
			Content={() => (
				<AlertLogoutExtension
					extension={extension}
					toggleModal={toggleModal}
				/>
			)}
		/>
	);
});

LogoutExtensionModal.displayName = 'LogoutExtensionModal';
