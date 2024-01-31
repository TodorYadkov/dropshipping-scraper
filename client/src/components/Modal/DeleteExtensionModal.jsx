import { memo } from 'react';

import { DeleteExtensionForm } from '../Forms/DeleteExtensionForm.jsx';
import { Modal } from './Modal.jsx';

export const DeleteExtensionModal = memo(({ toggleModal, extension }) => {
	return (
		<Modal
			title={'Delete Extension'}
			toggleModal={toggleModal}
			Content={() => <DeleteExtensionForm extension={extension} toggleModal={toggleModal} />}
		/>
	);
});

DeleteExtensionModal.displayName = 'DeleteExtensionModal';