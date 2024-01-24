import { memo } from 'react';

import { EditProductForm } from '../Forms/EditProductForm.jsx';
import { Modal } from './Modal.jsx';

export const EditProductModal = memo(({ toggleModal, product }) => {
	return (
		<Modal
			title={'Edit Product'}
			toggleModal={toggleModal}
			Content={() => (
				<EditProductForm
					product={product}
					toggleModal={toggleModal}
				/>)}
			backdrop={false}
		/>
	);
});

EditProductModal.displayName = 'EditProductModal';
