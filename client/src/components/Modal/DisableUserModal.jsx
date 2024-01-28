import { memo } from 'react';

import { AlertDisableUser } from '../Alerts/AlertDisableUser.jsx';
import { Modal } from './Modal.jsx';

export const DisableUserModal = memo(({ toggleModal, userDetails }) => {
	return (
		<Modal
			title={'Disable User'}
			toggleModal={toggleModal}
			Content={() => <AlertDisableUser userDetails={userDetails} toggleModal={toggleModal} />}
		/>
	);
});

DisableUserModal.displayName = 'DisableUserModal';
