import { memo } from 'react';

import { EditProductForm } from '../Forms/EditProductForm.jsx';
import { Modal } from './Modal.jsx';

export const EditProductModal = memo(({ toggleModal, product }) => {
	return (
		<Modal
			title={'Edit product'}
			toggleModal={toggleModal}
			backdrop={false}
			Content={() => <EditProductForm product={product} toggleModal={toggleModal} />}
		/>
	);
});

EditProductModal.displayName = 'EditProductModal';
