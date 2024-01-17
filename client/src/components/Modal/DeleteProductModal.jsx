import { memo } from 'react';

import { DeleteProductForm } from '../Forms/DeleteProductForm.jsx';
import { Modal } from './Modal.jsx';

export const DeleteProductModal = memo(({ toggleModal, product }) => {
	return (
		<Modal
			title={'Delete product'}
            toggleModal={toggleModal}
			Content={() => (
				<DeleteProductForm
					product={product}
					toggleModal={toggleModal}
				/>
			)}
		/>
	);
});

DeleteProductModal.displayName = 'DeleteProductModal';
