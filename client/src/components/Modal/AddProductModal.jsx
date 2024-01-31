import { AddProductForm } from '../Forms/AddProductForm.jsx';
import { Modal } from './Modal.jsx';

export const AddProductModal = ({ toggleModal }) => {
	return (
		<Modal
			title={'Add Product'}
			toggleModal={toggleModal}
			backdrop={false}
			Content={AddProductForm}
		/>
	);
};