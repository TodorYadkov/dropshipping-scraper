import { memo } from 'react';

import { AlertEnableUser } from '../Alerts/AlertEnableUser.jsx';
import { Modal } from './Modal.jsx';

export const EnableUserModal = memo(({ toggleModal, userDetails }) => {
	return (
		<Modal
			title={'Enable User'}
			toggleModal={toggleModal}
			Content={() => <AlertEnableUser userDetails={userDetails} toggleModal={toggleModal} />}
		/>
	);
});

EnableUserModal.displayName = 'EnableUserModal';
