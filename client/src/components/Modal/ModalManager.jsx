import { AddEbayProductModal } from './AddEbayProductModal.jsx';
import { AddProductModal } from './AddProductModal.jsx';
import { DeleteExtensionModal } from './DeleteExtensionModal.jsx';
import { DeleteProductModal } from './DeleteProductModal.jsx';
import { EditExtensionModal } from './EditExtensionModal.jsx';
import { EditProductModal } from './EditProductModal.jsx';

export const ModalManager = ({ useModal, data, closeModal }) => {

    return (
        <>
            {useModal === 'AddProductModal' && <AddProductModal toggleModal={closeModal} />}
            {useModal === 'AddEbayProductModal' && <AddEbayProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'EditProductModal' && <EditProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'DeleteProductModal' && <DeleteProductModal toggleModal={closeModal} product={data} />}
            {useModal === 'DeleteExtensionModal' && <DeleteExtensionModal toggleModal={closeModal} extension={data} />}
            {useModal === 'EditExtensionModal' && <EditExtensionModal toggleModal={closeModal} extension={data} />}
        </>
    );
};