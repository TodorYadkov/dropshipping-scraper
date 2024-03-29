import { AddExtensionForm } from '../Forms/AddExtensionForm.jsx';
import { Modal } from './Modal.jsx';

export const AddExtensionModal = ({ toggleModal }) => {
	return (
		<Modal
			title={'Add Extension'}
			toggleModal={toggleModal}
			backdrop={false}
			Content={AddExtensionForm}
		/>
	);
};