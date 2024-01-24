import { memo } from 'react';

import { EditExtensionForm } from '../Forms/EditExtensionForm.jsx';
import { Modal } from './Modal.jsx';

export const EditExtensionModal = memo(({ toggleModal, extension }) => {
	return (
		<Modal
			title={'Edit Extension'}
			toggleModal={toggleModal}
			Content={() => (
				<EditExtensionForm
					extension={extension}
					toggleModal={toggleModal}
				/>
			)}
			backdrop={false}
		/>
	);
});

EditExtensionModal.displayName = 'EditExtensionModal';
