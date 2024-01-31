import { memo } from 'react';

import { AddEbayUrlForm } from '../Forms/AddEbayUrlForm.jsx';
import { Modal } from './Modal.jsx';

export const AddEbayProductModal = memo(({ toggleModal, product }) => {
	return (
		<Modal
			title={'Add eBay URL'}
			toggleModal={toggleModal}
			backdrop={false}
			Content={() => <AddEbayUrlForm product={product} toggleModal={toggleModal} />}
		/>
	);
});

AddEbayProductModal.displayName = 'AddEbayProductModal';